#!/usr/bin/env node

import {
  CRYPTO_KEY
} from '#config/crypto'
import {
  encrypt
} from '#utils/crypto'

const {
  stdout,
  openStdin
} = process

let collector = Buffer.from('')

openStdin()
  .on('data', (data) => {
    collector = Buffer.concat([collector, data])
  })
  .on('end', () => {
    stdout.write(encrypt(collector, CRYPTO_KEY))
  })
