import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { persistor, store } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}
