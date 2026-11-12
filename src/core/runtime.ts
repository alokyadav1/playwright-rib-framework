import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { decryptDeep } from './crypto.js';

const DEFAULT_LOCALE = 'en-in';
const ROOT = resolve(process.cwd(), 'src');

export type Labels = Record<string, string>;
export type BankData = Record<string, unknown>;
export type EnvConfig = { baseURL: string; apiBaseURL?: string };
export type RuntimeContext = { env: string; bank: string; locale: string; browserLocale: string };

type Json = Record<string, unknown>;
const isObject = (v: unknown): v is Json => v !== null && typeof v === 'object' && !Array.isArray(v);

// 'en-in' -> 'en-IN', 'ar' -> 'ar' (Playwright's `locale` option expects BCP-47 casing)
const toBrowserLocale = (l: string): string => {
  return new Intl.Locale(l).toString();
};

export function getRuntimeContext(): RuntimeContext {
  // lowercase everything: Windows paths are case-insensitive, Linux/CI paths are not
  const env = (process.env.TEST_ENV ?? 'dev').toLowerCase();
  const bank = (process.env.BANK ?? 'demo').toLowerCase();
  const locale = (process.env.LOCALE ?? DEFAULT_LOCALE).toLowerCase();
  for (const [name, value] of Object.entries({ TEST_ENV: env, BANK: bank, LOCALE: locale })) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) throw new Error(`Invalid ${name}`);
  }
  return { env, bank, locale, browserLocale: toBrowserLocale(locale) };
}

// ---- cached JSON reader ----
const fileCache = new Map<string, unknown>();

function readJson<T extends object>(file: string, optional = false): T {
  if (fileCache.has(file)) return fileCache.get(file) as T;
  if (!existsSync(file)) {
    if (optional) return {} as T;
    const { env, bank, locale } = getRuntimeContext();
    throw new Error(`Missing file: ${file} (TEST_ENV=${env}, BANK=${bank}, LOCALE=${locale})`);
  }
  const parsed = JSON.parse(readFileSync(file, 'utf8')) as T;
  fileCache.set(file, parsed);
  return parsed;
}

function deepMerge(base: Json, over: Json): Json {
  const out: Json = { ...base };
  for (const [k, v] of Object.entries(over)) {
    const b = out[k];
    out[k] = isObject(v) && isObject(b) ? deepMerge(b, v) : v; // arrays and primitives are replaced
  }
  return out;
}

// ---- public readers ----
const dataCache = new Map<string, BankData>();

export function readBankData(options: { decrypt?: boolean } = {}): BankData {
  const { env, bank, locale } = getRuntimeContext();
  const cacheKey = `${env}/${bank}/${locale}`;

  if (!dataCache.has(cacheKey)) {
    const dir = resolve(ROOT, 'data', env, bank);
    const common = readJson<Json>(resolve(dir, 'common.json'));
    const localized = readJson<Json>(resolve(dir, `${locale}.json`), true);
    dataCache.set(cacheKey, deepMerge(common, localized));
  }
  const merged = structuredClone(dataCache.get(cacheKey) as BankData);
  return options.decrypt === false ? merged : (decryptDeep(merged) as BankData);
}

const labelCache = new Map<string, Labels>();

export function readBankLabels(): Labels {
  const { bank, locale } = getRuntimeContext();
  const cacheKey = `${bank}/${locale}`;
  const cached = labelCache.get(cacheKey);
  if (cached) return { ...cached };

  const dir = resolve(ROOT, 'labels', bank);
  const fallback = readJson<Labels>(resolve(dir, `${DEFAULT_LOCALE}.json`));
  let labels = fallback;

  if (locale !== DEFAULT_LOCALE) {
    const localized = readJson<Labels>(resolve(dir, `${locale}.json`), true);
    const missing = Object.keys(fallback).filter((k) => !(k in localized));
    if (missing.length) console.warn(`[labels] ${bank}/${locale} missing keys: ${missing.join(', ')}`);
    labels = { ...fallback, ...localized };
  }
  labelCache.set(cacheKey, labels);
  return { ...labels };
}

export function readEnvConfig(): EnvConfig {
  const { env, bank } = getRuntimeContext();
  const all = readJson<Record<string, EnvConfig>>(resolve(ROOT, 'config', 'environments', `${env}.json`));
  const cfg = all[bank];
  if (!cfg) throw new Error(`No config for bank "${bank}" in environments/${env}.json`);

  const apiBaseURL = process.env.API_BASE_URL?.trim() || cfg.apiBaseURL?.trim();
  const merged: EnvConfig = {
    baseURL: process.env.BASE_URL ?? cfg.baseURL, // CI can override
    ...(apiBaseURL ? { apiBaseURL } : {}),
  };
  for (const [name, value] of Object.entries(merged)) {
    if (value === undefined) continue;
    if (!URL.canParse(value) || !/^https?:\/\//i.test(value)) {
      throw new Error(`${name} must be an absolute HTTP(S) URL`);
    }
  }
  return merged;
}

/**
 * Checks the bank's explicit switch before a state-changing page action.
 * @param action - The security-change or funds-movement permission to check.
 * @returns Nothing when the requested permission is enabled.
 * @throws When the switch is absent or disabled in the current bank's settings.
 */
export function assertMutationAllowed(action: 'securityChange' | 'fundsMovement'): void {
  const { bank } = getRuntimeContext();
  const settings = readJson<{ mutationPermissions?: Record<string, boolean> }>(
    resolve(ROOT, 'config', 'banks', `${bank}.json`),
  );
  if (settings.mutationPermissions?.[action] !== true) {
    throw new Error(`Enable mutationPermissions.${action} only when this action is authorized`);
  }
}
