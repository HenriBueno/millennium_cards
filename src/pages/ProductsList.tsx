import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { getCards } from "../Store/models/CardListSlice";
// import Navigation from "../components/Navigation/Navigation";
// import Cards from "../components/Cards/Cards";
// import Footer from "../components/Footer/Footer";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import Bag from "../components/Bag/Bag";
// import CategoryFilters from "../components/CategoryFilters/CategoryFilters";
import { getSearchCard } from "../Store/models/CardSearchSlice";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";
import CategoryFilters from "../components/CategoryFilters/CategoryFilters";
import Bag from "../components/Bag/Bag";

const PAGE_SIZE = 20;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  // const { cards, status, error } = useSelector(
  //   (state: RootState) => state.card
  // );
  // const cardsfilters = useSelector(
  //   (state: RootState) => state.searchCard.cards
  // );

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

  // const filteredCards =
  //   searchProduct.length >= 3 ? cardsfilters ?? [] : cards ?? [];

  // const handlePageChange = (newPage: number) => {
  //   if (newPage >= 1 && (hasMorePages || newPage < currentPage)) {
  //     setCurrentPage(newPage);
  //   }
  // };
  return (
    <>
      <Navigation
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
      />

      <Bag />
      <CategoryFilters searchProduct={searchProduct} setSearchProduct={setSearchProduct}/>
      {/* <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-10">
            Lista de Produtos
          </h2>
          {status === "loading" && <p>Carregando...</p>}
          {status === "failed" && <p>Erro: {error}</p>}

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => {
                return <Cards key={card.id} card={card} />;
              })
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>

          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <ChevronLeftIcon className="size-5" />
            </button>

            {[...Array(5)].map((_, i) => {
              const pageNum = currentPage - 2 + i;
              if (pageNum > 0 && (hasMorePages || pageNum <= currentPage)) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      pageNum === currentPage
                        ? "bg-indigo-600 text-white"
                        : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    } focus:z-20 focus:outline-offset-0`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasMorePages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
};
export default Home;
