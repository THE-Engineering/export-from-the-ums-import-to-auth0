#!/bin/bash

mkdir /root/.ssh 2> /dev/null
ssh-keyscan "ssh.eu-4.platform.sh" >> /root/.ssh/known_hosts
ssh-keyscan "git.eu-4.platform.sh" >> /root/.ssh/known_hosts
platform ssh-cert:load --no-interaction
npm run start:by-date-changed
