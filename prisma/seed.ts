import sampleData from '@/data/sample-data';
import { db } from './prisma';

async function main() {
  //delete any products that may be in the db
  await db.product.deleteMany()

  //add the sample data to the database
  await db.product.createMany({ data: sampleData })
  console.log('Database seeded successfully')
}

main()