import {hashSync} from 'bcrypt-ts-edge'
export const users = [
  {
    name: 'john',
    email: 'admin@example.com',
    password: hashSync('123456', 10),
    role: 'admin'
  },
  {
    name: 'jayne',
    email: 'user@example.com',
    password: hashSync('123456', 10),
    role: 'user' 
  }
]