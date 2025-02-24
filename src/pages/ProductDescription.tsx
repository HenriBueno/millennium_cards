import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../Store/store";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import CardDescription from "../components/CardDescription/CardDescription";
import Bag from "../components/Bag/Bag";
import { getSearchCard } from "../Store/models/CardSearchSlice";
import { CardType } from "../@types/types";

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { status, error } = useSelector((state: RootState) => state.card);
  const allCards = useSelector((state: RootState) => state.card.cards);
  const filteredCards = useSelector(
    (state: RootState) => state.searchCard.cards
  );
  const [product, setProduct] = useState<any | null>(null);
  const [searchProdutc, setSearchProdutc] = useState("");

  useEffect(() => {
    if (!id) return;

    let foundProduct =
      filteredCards.find((card) => card.id.toString() === id) ||
      allCards.find((card) => card.id.toString() === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Se não encontrou, busca via API
      const fetchCard = async () => {
        const resultAction = await dispatch(
          getSearchCard({ search: id, limit: 1, offset: 0 })
        );
        if (getSearchCard.fulfilled.match(resultAction)) {
          const fetchedProduct = resultAction.payload.find(
            (card: CardType) => card.id.toString() === id
          );
          setProduct(fetchedProduct || null);
        }
      };

      fetchCard();
    }
  }, [dispatch, id, filteredCards, allCards]);

  if (!product) return <p>Carregando...</p>;
  

  return (
    <>
      <Navigation
        searchProduct={searchProdutc}
        setSearchProduct={setSearchProdutc}
      />

      <Bag />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {status === "loading" && <p>Carregando...</p>}
          {status === "failed" && <p>Erro: {error}</p>}
          {!product && status === "succeeded" && <p>Produto não encontrado.</p>}
          {product && <CardDescription card={product} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
