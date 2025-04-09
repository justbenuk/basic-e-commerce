"use server";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { db } from "../../prisma/prisma";

export async function getLatestProducts() {
  try {
    const data = await db.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    throw new Error(`could not fetch results ${error}`);
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const result = await db.product.findFirst({
      where: {
        slug,
      },
    });

    if (!result) throw new Error(`Product Not Found`);
    return result;
  } catch (error) {
    throw new Error(`Something went wrong: ${error} `);
  }
}
