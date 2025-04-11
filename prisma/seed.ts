import sampleData from '@/data/sample-data';
import {users} from '@/data/user-data'
import { db } from './prisma';

async function main() {
  //delete any products that may be in the db
  await db.product.deleteMany()

  //delete any user related tables
  await db.account.deleteMany()
  await db.session.deleteMany()
  await db.verificationToken.deleteMany()
  await db.user.deleteMany()

  //add the sample data to the database
  await db.product.createMany({ data: sampleData })

  //add the default users to the tables
  await db.user.createMany({data: users})
  console.log('Database seeded successfully')
}

main()