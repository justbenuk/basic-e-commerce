'use client'
import React from 'react'
import { CartItem } from '@/lib/types'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { addItemToCart } from '@/actions/cart-actions'
import { toast } from 'sonner'

export default function AddToCart({ item }: { item: CartItem }) {

  const router = useRouter()

  async function handleAddToCart() {
    const response = await addItemToCart(item)
    if (!response.success) {
      toast('Product added to cart', {
        description: response.message
      })
      return
    }
    //handle success
    toast('Product Added', {
      description: response.message,
      action: {
        label: 'Go to Cart',
        onClick: () => router.push('/cart')
      }
    })
  }

  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}><Plus /> AddToCart</Button>
  )
}

