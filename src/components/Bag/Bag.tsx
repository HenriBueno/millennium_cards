'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface BagProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
]

export default function Bag({ open, setOpen }: BagProps) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      {/* Fundo escuro com transição suave */}
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Painel lateral deslizante */}
      <div className="fixed inset-0 flex justify-end">
        <DialogPanel className="w-screen max-w-md bg-white shadow-xl transform transition-all duration-500 ease-in-out translate-x-0">
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between p-4 border-b">
              <DialogTitle className="text-lg font-semibold text-gray-900">Shopping Cart</DialogTitle>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Lista de produtos */}
            <div className="p-4">
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-4">
                    <img src={product.imageSrc} alt={product.imageAlt} className="w-24 h-24 rounded-md border" />
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3><a href={product.href}>{product.name}</a></h3>
                        <p>{product.price}</p>
                      </div>
                      <p className="text-sm text-gray-500">{product.color}</p>
                      <div className="flex justify-between text-sm mt-2">
                        <p className="text-gray-500">Qty {product.quantity}</p>
                        <button className="text-indigo-600 hover:text-indigo-500">Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resumo e botão de checkout */}
            <div className="border-t p-4">
              <div className="flex justify-between text-lg font-medium">
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">Shipping and taxes calculated at checkout.</p>
              <a href="#" className="mt-4 block bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700">
                Checkout
              </a>
              <div className="text-center text-sm text-gray-500 mt-4">
                <button onClick={() => setOpen(false)} className="text-indigo-600 hover:text-indigo-500">
                  Continue Shopping &rarr;
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
