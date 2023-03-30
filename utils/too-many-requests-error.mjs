export const TOO_MANY_REQUESTS = 429

export default class TooManyRequestsError extends Error {
  constructor (message = 'Too Many Requests', code = TOO_MANY_REQUESTS) {
    super(message)
    this.code = code
  }
}
