import { useEffect, useState } from "react";
import { fetchCards } from "../../services/CardService";
import { CardType } from "../../@types/types";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export const Cards = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const data = await fetchCards(20, 0);
        setCards(data);
      } catch (err) {
        Error("Erro ao buscar cartas");
      }
    };

    getCards();
  }, []);

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Cards</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
          {cards.map((card) => (
            <a key={card.id} className="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
              <div className="flex justify-center">
                <img
                  alt={card.name}
                  src={card.card_images[0].image_url_small}
                  className=" bg-gray-200 w-40 group-hover:scale-[1.01] xl:aspect-7/8"
                />
              </div>
              <div className="flex justify-around p-2 items-center">
                <div>
                
              <h3 className="mt-4 text-sm text-gray-700">{card.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
              R$ {(parseFloat(card.card_prices[0]?.cardmarket_price ?? "0") * 5).toFixed(2)}

              </p>
              </div>
              <div className="ml-4 flow-root lg:ml-6 ">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>

            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

