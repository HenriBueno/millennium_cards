"use client";

import {
 
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { closeModal } from "../../Store/models/ModalBagSlice";
import { CardType } from "../../@types/types";
import { bagCard } from "../../Store/models/BagSlice";
import { useNavigate } from "react-router-dom";

export default function Bag() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const cards = useSelector((state: RootState) => state.bag.card);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleToggleBag = (card: CardType) => {
    dispatch(bagCard(card));
  };

  const priceTotal = cards.reduce((total, card) => {
    const price = parseFloat(
      card.card_prices[0].cardmarket_price === "0.00"
        ? card.card_prices[0].amazon_price
        : card.card_prices[0].cardmarket_price
    );
    return total + price * 6; // Multiplicando por 6 como no seu código
  }, 0);

  return (

    <Dialog open={isOpen}
      onClose={() => dispatch(closeModal())} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Sacola de compras</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => dispatch(closeModal())}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Fechar Sacola</span>
                        <XMarkIcon aria-hidden="true" className="size-6 " />
                      </button>
                    </div>
                  </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cards.map((card) => (
                    <li key={card.id} className="flex py-6">
                      <div className="size-30 shrink-0 overflow-hidden border border-gray-200 cursor-pointer flex justify-center items-center" onClick={() => navigate(`/produto/${card.id}`) &&  dispatch(closeModal())}>
                        <img
                          alt={card.name}
                          src={card.card_images[0].image_url_small}
                          className=" h-28" 
                        />
                      </div>


                      <div className="ml-4 flex flex-1 flex-col justify-beetwen " >
                        <div className="cursor-pointer" onClick={() => navigate(`/produto/${card.id}`) &&  dispatch(closeModal())} >
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <div
                                
                              >
                                {card.name}
                              </div>
                            </h3>
                            <p className="ml-4">
                              {" "}
                              R$
                              {(
                                parseFloat(
                                  card.card_prices[0].cardmarket_price ===
                                    "0.00"
                                    ? card.card_prices[0].amazon_price
                                    : card.card_prices[0].cardmarket_price
                                ) * 6
                              ).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                          {card.card_sets?.[0]?.set_rarity}
                              
                          </p>
                        </div>
                        <div className="flex flex-1 items-center justify-between text-sm">
                          {/* <p className="text-gray-500">Qty {card.quantity}</p> */}

                          <div className="flex">
                            <button
                              type="button"
                              className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => handleToggleBag(card)}
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    ))}
                    </ul>
                  </div>
                </div>
              </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>R$ {priceTotal.toFixed(2)} </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Frete e impostos calculados na finalização da compra.</p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Finalizar a compra
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      ou{' '}
                      <button
                        type="button"
                        onClick={() => dispatch(closeModal())}
                        className="font-medium text-indigo-600 hover:text-indigo-500 "
                      >
                        Continue comprando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
