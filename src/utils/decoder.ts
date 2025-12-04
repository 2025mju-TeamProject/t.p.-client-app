import { Buffer } from 'buffer';

function padBase64(base64: string) {
  return base64 + '='.repeat((4 - (base64.length % 4)) % 4);
}

function decodeBase64UrlToJson<T = any>(base64Url: string): T {
  const base64 = padBase64(
    base64Url.replace(/-/g, '+').replace(/_/g, '/')
  );
  const jsonString = Buffer.from(base64, 'base64').toString('utf8');
  return JSON.parse(jsonString);
}

export function decodeJwt(token: string) {
  try {
    const [headerB64, payloadB64] = token.split('.');

    const header = decodeBase64UrlToJson(headerB64);
    const payload = decodeBase64UrlToJson(payloadB64);

    return { header, payload };
  } catch (e) {
    console.error('JWT decode error', e);
    return null;
  }
}