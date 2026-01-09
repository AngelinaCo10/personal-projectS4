export function eurosToCents(euros: number) {
  return Math.round(euros * 100);
}

export function isValidAmount(euros: number) {
  return Number.isFinite(euros) && euros > 0 && euros <= 500;
}

export function isValidMessage(msg: string) {
  const t = msg.trim();
  return t.length >= 3 && t.length <= 500;
}

export function makeToken() {
  return crypto.randomUUID().replaceAll("-", "");
}
