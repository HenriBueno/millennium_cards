import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/store";
import { getCards } from "../Store/models/CardListSlice";
import { getSearchCard } from "../Store/models/CardSearchSlice";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import CategoryFilters from "../components/CategoryFilters/CategoryFilters";
import Bag from "../components/Bag/Bag";

const PAGE_SIZE = 20;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(1);
  const [, setHasMorePages] = useState(true);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      let resultAction;

      if (searchProduct.length > 2) {
        resultAction = await dispatch(
          getSearchCard({
            search: searchProduct,
            limit: PAGE_SIZE,
            offset: (currentPage - 1) * PAGE_SIZE,
          })
        );
      } else {
        resultAction = await dispatch(
          getCards({ limit: PAGE_SIZE, offset: (currentPage - 1) * PAGE_SIZE })
        );
      }

      if (Array.isArray(resultAction.payload)) {
        setHasMorePages(resultAction.payload.length === PAGE_SIZE);
      } else {
        setHasMorePages(false);
      }
    };

    fetchCards();
  }, [dispatch, searchProduct, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchProduct]);

  return (
    <>
      <Navigation
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
      />

      <Bag />
      <CategoryFilters
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
      />
      <Footer />
    </>
  );
};
export default Home;
