import transformUser from './transform-user.mjs'

export default function transformUsers (users = []) {
  return (
    users.map(transformUser)
  )
}
