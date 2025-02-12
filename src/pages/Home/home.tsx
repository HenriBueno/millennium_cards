import { useEffect, useState } from "react";
import { fetchCards } from "../../services/CardService";
import { CardType } from "../../@types/types";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import { Cards } from "../../components/Cards/Cards";

const CardList = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [offset, setOffset] = useState(0);
  const num = 10;

  useEffect(() => {
    fetchCards(num, offset).then(setCards).catch(console.error);
  }, [offset]);

  return (
    <>
      <Navigation />
      <Cards />
    </>
  );
};

export default CardList;
