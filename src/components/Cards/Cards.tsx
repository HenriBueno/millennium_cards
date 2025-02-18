import { CardType } from "../../@types/types";
import { CheckBadgeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { useEffect, useState } from "react";
import { bagCard } from "../../Store/models/BagSlice";
import { useNavigate } from "react-router-dom";

export interface CardsProps {
  card: CardType;
  onClick?: () => void;
}

export default function Cards({ card, onClick }: CardsProps) {
  const dispatch = useAppDispatch();
  const bagSelector = useAppSelector((state) => state.bag);

  const alreadyBag = bagSelector.card.find((item) => item.id === card?.id);
  const [bag, setBag] = useState<boolean>(!!alreadyBag);
  const isInBag = bagSelector.card.some((item) => item.id === card.id);
  const navigate = useNavigate();

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
    <>
      <div
        onClick={onClick}
        className="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
      >
        <div
          className="flex justify-center"
          onClick={() => navigate(`/produto/${card.id}`)}
        >
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
      </div>
    </>
  );
}
