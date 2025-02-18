import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../Store/store";
import { getCards } from "../Store/models/CardListSlice";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import CardDescription from "../components/CardDescription/CardDescription";


const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { cards, status, error } = useSelector((state: RootState) => state.card);
  const [product, setProduct] = useState<any | null>(null);
  

  useEffect(() => {

    const foundProduct = cards.find((card) => card.id.toString() === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else if (id) {

      const fetchCard = async () => {
        const resultAction = await dispatch(getCards({ limit: 1, offset: 0 })); 
        if (getCards.fulfilled.match(resultAction)) {
          const fetchedProduct = resultAction.payload.find((card: any) => card.id.toString() === id);
          setProduct(fetchedProduct || null);
        }
      };

      fetchCard();
    }
  }, [dispatch, id, cards]);

  return (
    <>
      <Navigation />
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
