import crypto from 'crypto'

export function hashKey (key) {
  if (!key) throw new Error('A key is required')

  return crypto.createHash('sha256').update(key).digest('base64').substring(0, 32)
}

export function encrypt (buffer, key, bytes = 16, algorithm = 'aes-256-ctr') {
  const iv = crypto.randomBytes(bytes)
  const cipher = crypto.createCipheriv(algorithm, hashKey(key), iv)
  return Buffer.concat([iv, cipher.update(buffer), cipher.final()])
}

export function decrypt (buffer, key, bytes = 16, algorithm = 'aes-256-ctr') {
  const iv = buffer.slice(0, bytes)
  const decipher = crypto.createDecipheriv(algorithm, hashKey(key), iv)
  return Buffer.concat([decipher.update(buffer.slice(bytes)), decipher.final()])
}
