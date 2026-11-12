/**
 * Converts a plain INR decimal string to integer paise without floating-point rounding.
 * @param value - Signed or unsigned decimal amount with at most two fraction digits.
 * @returns The equivalent amount in paise as a bigint.
 * @throws When the input contains currency symbols, grouping, exponents or excess precision.
 */
export function rupeesToPaise(value: string): bigint {
  if (!/^-?\d+(?:\.\d{1,2})?$/.test(value)) {
    throw new Error('Amount must be a plain decimal with at most two fraction digits');
  }
  const negative = value.startsWith('-');
  const [whole, fraction = ''] = value.replace(/^-/, '').split('.');
  const paise = BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'));
  return negative ? -paise : paise;
}
