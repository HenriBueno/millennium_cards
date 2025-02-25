"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import Cards from "../Cards/Cards";
import { getSearchCard } from "../../Store/models/CardSearchSlice";
import { getCards } from "../../Store/models/CardListSlice";

const optionsOrdered = [
  { name: "Mais Popular", href: "#", current: true },
  { name: "Melhor Avaliação", href: "#", current: false },
  { name: "Mais Recentes", href: "#", current: false },
  { name: "Preço: Menor para Maior", href: "#", current: false },
  { name: "Preço: Maior para Menor", href: "#", current: false },
  { name: "Maior ATK", href: "#", current: false },
  { name: "Maior DEF", href: "#", current: false },
  { name: "Nível: Maior para Menor", href: "#", current: false },
];

const filters = [
  {
    id: "race",
    name: "Tipo de Monstro",
    options: [
      { value: "Aqua", label: "Água", checked: false },
      { value: "Beast", label: "Besta", checked: false },
      { value: "Beast-Warrior", label: "Besta-Guerreira", checked: false },
      { value: "Creator-God", label: "Deus-Criador", checked: false },
      { value: "Cyberse", label: "Cibernético", checked: false },
      { value: "Dinosaur", label: "Dinossauro", checked: false },
      { value: "Divine-Beast", label: "Besta Divina", checked: false },
      { value: "Dragon", label: "Dragão", checked: false },
      { value: "Fairy", label: "Fada", checked: false },
      { value: "Fiend", label: "Demônio", checked: false },
      { value: "Fish", label: "Peixe", checked: false },
      { value: "Insect", label: "Inseto", checked: false },
      { value: "Machine", label: "Máquina", checked: false },
      { value: "Plant", label: "Planta", checked: false },
      { value: "Psychic", label: "Psíquico", checked: false },
      { value: "Pyro", label: "Piro", checked: false },
      { value: "Reptile", label: "Réptil", checked: false },
      { value: "Rock", label: "Pedra", checked: false },
      { value: "Sea Serpent", label: "Serpente Marinha", checked: false },
      { value: "Spellcaster", label: "Conjurador", checked: false },
      { value: "Thunder", label: "Trovão", checked: false },
      { value: "Warrior", label: "Guerreiro", checked: false },
      { value: "Winged Beast", label: "Besta Alada", checked: false },
      { value: "Wyrm", label: "Wyrm", checked: false },
      { value: "Zombie", label: "Zumbi", checked: false },
    ],
  },
  {
    id: "type",
    name: "Tipo de Carta",
    options: [
      { value: "Spell Card", label: "Feitiço", checked: false },
      { value: "Trap Card", label: "Armadilha", checked: false },
      { value: "Normal Monster", label: "Monstro Normal", checked: false },
      { value: "Effect Monster", label: "Monstro de Efeito", checked: false },
      { value: "Ritual Monster", label: "Monstro Ritual", checked: false },
      { value: "Fusion Monster", label: "Monstro de Fusão", checked: false },
      { value: "Synchro Monster", label: "Monstro Sincro", checked: false },
      { value: "XYZ Monster", label: "Monstro XYZ", checked: false },
      { value: "Link Monster", label: "Monstro Link", checked: false },
      {
        value: "Pendulum Normal Monster",
        label: "Pêndulo Normal",
        checked: false,
      },
      {
        value: "Pendulum Effect Monster",
        label: "Pêndulo de Efeito",
        checked: false,
      },
      {
        value: "Pendulum Ritual Monster",
        label: "Pêndulo Ritual",
        checked: false,
      },
      {
        value: "Pendulum Fusion Monster",
        label: "Pêndulo Fusão",
        checked: false,
      },
      {
        value: "Pendulum Synchro Monster",
        label: "Pêndulo Sincro",
        checked: false,
      },
      { value: "Pendulum XYZ Monster", label: "Pêndulo XYZ", checked: false },
      { value: "Token", label: "Token", checked: false },
      { value: "Skill Card", label: "Habilidade", checked: false },
    ],
  },
  {
    id: "level",
    name: "Nível/Postura/Link",
    options: Array.from({ length: 12 }, (_, i) => ({
      value: (i + 1).toString(),
      label: `Nível ${i + 1}`,
      checked: false,
    })),
  },
  {
    id: "atk",
    name: "Ataque",
    options: [
      { value: "0", label: "0 ATK", checked: false },
      { value: "1000", label: "1000 ATK+", checked: false },
      { value: "2000", label: "2000 ATK+", checked: false },
      { value: "3000", label: "3000 ATK+", checked: false },
      { value: "4000", label: "4000 ATK+", checked: false },
    ],
  },
  {
    id: "def",
    name: "Defesa",
    options: [
      { value: "0", label: "0 DEF", checked: false },
      { value: "1000", label: "1000 DEF+", checked: false },
      { value: "2000", label: "2000 DEF+", checked: false },
      { value: "3000", label: "3000 DEF+", checked: false },
      { value: "4000", label: "4000 DEF+", checked: false },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const PAGE_SIZE = 20;

interface SearchProp {
  searchProduct: string;
  setSearchProduct: (value: string) => void;
}

export default function CategoryFilters({ searchProduct }: SearchProp) {
  const dispatch = useDispatch<AppDispatch>();

  const { cards, status, error } = useSelector(
    (state: RootState) => state.card
  );
  const cardsfilters = useSelector(
    (state: RootState) => state.searchCard.cards
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredCards =
    searchProduct.length >= 3 ? cardsfilters ?? [] : cards ?? [];

  const fetchCards = async () => {
    const action =
      searchProduct.length > 2
        ? getSearchCard({
            search: searchProduct,
            limit: PAGE_SIZE,
            offset: (currentPage - 1) * PAGE_SIZE,
          })
        : getCards({ limit: PAGE_SIZE, offset: (currentPage - 1) * PAGE_SIZE });

    const resultAction = await dispatch(action);

    if (Array.isArray(resultAction.payload)) {
      setHasMorePages(resultAction.payload.length === PAGE_SIZE);
    } else {
      setHasMorePages(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [dispatch, searchProduct, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchProduct]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && (hasMorePages || newPage < currentPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white">
      <div>
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Fechar menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Lista de Cards
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {optionsOrdered.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
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

                    <div className="flex justify-center items-center mt-8 mb-10 space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <ChevronLeftIcon className="size-5" />
                      </button>

                      {[...Array(5)].map((_, i) => {
                        const pageNum = currentPage - 2 + i;
                        if (
                          pageNum > 0 &&
                          (hasMorePages || pageNum <= currentPage)
                        ) {
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
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
