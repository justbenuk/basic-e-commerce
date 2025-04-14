'use server'
import { auth } from "@/lib/auth"
import { CartItem } from "@/lib/types"
import { convertToPlainObject, formatError, round2 } from "@/lib/utils"
import { cookies } from "next/headers"
import { db } from "../../prisma/prisma"
import { cartItemSchema, insertCartSchema } from "@/lib/validators"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

//calculate the cart prices 
function calcPrice(items: CartItem[]) {

  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.20 * itemsPrice),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice)

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }

}

export async function addItemToCart(data: CartItem) {
  try {

    //get the cart session id 
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('Cart session not found')

    //get the user if one is available - otherwise guest checkout
    const session = await auth()
    const userid = session?.user?.id ? (session.user.id as string) : undefined


    //get the cart
    const cart = await getMyCart()
    const item = cartItemSchema.parse(data)
    //find the product in the db 
    const product = await db.product.findFirst({
      where: { id: item.productId }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    if (!cart) {
      //create new cart 
      const newCart = insertCartSchema.parse({
        userid: userid,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item])
      })

      //add to db 
      await db.cart.create({
        data: newCart
      })

      revalidatePath(`/product/${product.slug}`)

      return {
        success: true,
        message: `${product.name} added to cart`
      }
    } else {
      //check if item is already in the cart 
      const existItem = (cart.items as CartItem[]).find((x) => x.productId === item.productId)

      if (existItem) {
        //check the stock 
        if (product.stock < existItem.qty + 1) {
          throw new Error('Not enough stock')
        }

        (cart.items as CartItem[]).find((x) => x.productId === item.productId)!.qty = existItem.qty + 1
      } else {
        if (product.stock < 1) throw new Error('Not enought stock')
        cart.items.push(item)
      }

      await db.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[])
        }
      })
      revalidatePath(`/product/${product.slug}`)
      return { success: true, message: `${product.name} ${existItem ? 'Updated in' : 'added to'} cart` }
    }

  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function getMyCart() {
  //get the cart session id 
  const sessionCartId = (await cookies()).get('sessionCartId')?.value
  if (!sessionCartId) throw new Error('Cart session not found')

  //get the user if one is available - otherwise guest checkout
  const session = await auth()
  const userid = session?.user?.id ? (session.user.id as string) : undefined

  //get user cart from db 
  const cart = await db.cart.findFirst({
    where: userid ? { userId: userid } : { sessionCartId: sessionCartId }
  })

  if (!cart) return undefined

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  })


}
