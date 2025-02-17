import { CardType } from "../../@types/types";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export interface CardsProps {
  card: CardType;
  onClick?: () => void;
}

export default function Cards({ card, onClick }: CardsProps) {
  return (
    <>
      <div
        onClick={onClick}
        className="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
      >
        <div className="flex justify-center">
          <img
            alt={card.name}
            src={card.card_images[0].image_url_small}
            className="bg-gray-200 w-40 group-hover:scale-[1.01]"
          />
        </div>
        <div className="flex p-2 items-center justify-around">
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-sm text-gray-700">{card.name}</h3>
            <p className="text-lg font-medium text-gray-900">
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

          <div className="flex items-center justify-center ml-4 lg:ml-6">
            <ShoppingBagIcon className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
          </div>
        </div>
      </div>
    </>
  );
}
