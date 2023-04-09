import validateUser from './validate-user.mjs'

function reduce (accumulator, user) {
  if (!validateUser(user)) accumulator.push(user)

  return accumulator
}

export default function validateUsers (users = []) {
  return (
    users.reduce(reduce, [])
  )
}
