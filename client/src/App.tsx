import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import OurMission from "./components/OurMission";
import LandingPage from "./pages/LandingPage";
import MenuList from "./pages/MenuList";
import ReservationForm from "./components/ReservationForm";
import { ShoppingCartContextProvider } from "./contexts/ShoppingCartContextProvider";
import { ShoppingCart } from "./pages/ShoppingCart";
import { CheckoutComponent } from "./components/CheckoutComponent";

function App() {
  return (
    <>
      <ShoppingCartContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mission" element={<OurMission />} />
          <Route path="/menu" element={<MenuList />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/checkout" element={<CheckoutComponent />}></Route>
        </Routes>
      </ShoppingCartContextProvider>
    </>
  );
}

export default App;
