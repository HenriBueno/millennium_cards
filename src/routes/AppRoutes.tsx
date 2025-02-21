import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/ProductsList";
import ProductPage from "../pages/ProductDescription";
import Error404 from "../pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/produto/:id",
    element: <ProductPage />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
