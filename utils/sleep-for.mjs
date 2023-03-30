export const ONE_SECOND = 1000
export const TWO_SECONDS = ONE_SECOND * 2
export const HALF_SECOND = ONE_SECOND / 2
export const QUARTER_SECOND = HALF_SECOND / 2
export const ONE_MINUTE = ONE_SECOND * 60
export const TWO_MINUTES = ONE_MINUTE * 2
export const HALF_MINUTE = ONE_MINUTE / 2
export const QUARTER_MINUTE = HALF_MINUTE / 2
export const ONE_HOUR = ONE_MINUTE * 60
export const TWO_HOURS = ONE_HOUR * 2
export const HALF_HOUR = ONE_HOUR / 2
export const QUARTER_HOUR = HALF_HOUR / 2
export const ONE_DAY = ONE_HOUR * 24
export const TWO_DAYS = ONE_DAY * 2
export const HALF_DAY = ONE_DAY / 2
export const QUARTER_DAY = HALF_DAY / 2

export default function sleepFor (duration = ONE_MINUTE) {
  return (
    new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
  )
}
