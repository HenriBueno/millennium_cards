import {
  CheckBadgeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { CardsProps } from "../Cards/Cards";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { useEffect, useState } from "react";
import { bagCard } from "../../Store/models/BagSlice";

export default function CardDescription({ card }: CardsProps) {
  const dispatch = useAppDispatch();
  const bagSelector = useAppSelector((state) => state.bag);

  const alreadyBag = bagSelector.card.find((item) => item.id === card?.id);
  const [bag, setBag] = useState<boolean>(!!alreadyBag);
  const isInBag = bagSelector.card.some((item) => item.id === card.id);

  useEffect(() => {
    setBag(!!alreadyBag);
  }, [alreadyBag]);

  function handleLike() {
    if (card) {
      dispatch(bagCard(card));
      setBag(!bag);
      console.log("Adicionado ao carrinho", card.name);
    }
  }

  return (
    <section className="py-8 bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="dark:hidden w-110 rounded-lg shadow-lg "
              src={card.card_images[0].image_url}
              alt="iMac"
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {card.name}
            </h1>
            <div className="flex items-center justify-between mt-4 sm:mt-6">
              {/* Preço */}
              <div className="flex items-center gap-4">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  R$
                  {(
                    parseFloat(
                      card.card_prices[0].cardmarket_price === "0.00"
                        ? card.card_prices[0].amazon_price
                        : card.card_prices[0].cardmarket_price
                    ) * 6
                  ).toFixed(2)}
                </p>
              </div>

              {/* Ícones */}
              <div
                className="flex items-center justify-center ml-4 lg:ml-6 
      w-12 h-12 rounded-full bg-transparent hover:bg-gray-200 transition-colors duration-200"
              >
                {isInBag ? (
                  <CheckBadgeIcon
                    className="size-6 shrink-0 text-green-500 hover:scale-150 transition-transform duration-200"
                    onClick={handleLike}
                  />
                ) : (
                  <ShoppingBagIcon
                    className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500 hover:scale-150 transition-transform duration-200"
                    onClick={handleLike}
                  />
                )}
              </div>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Atributo
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Nome</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {card.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Tipo</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {card.type}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Atributo
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {card.attribute}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Nível</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {card.level}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Ataque</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {card.atk}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Defesa</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {card.def}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Descrição
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {card.desc}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Raça</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {card.race}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Preço</td>
                    <td className="border border-gray-300 px-4 py-2">
                      R$
                      {(
                        parseFloat(
                          card.card_prices[0].cardmarket_price === "0.00"
                            ? card.card_prices[0].amazon_price
                            : card.card_prices[0].cardmarket_price
                        ) * 6
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
