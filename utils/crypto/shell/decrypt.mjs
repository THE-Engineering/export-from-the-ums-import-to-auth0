#!/usr/bin/env node

import {
  CRYPTO_KEY
} from '#config/crypto'
import {
  decrypt
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
    stdout.write(decrypt(collector, CRYPTO_KEY))
  })
