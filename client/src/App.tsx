import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import OurMission from "./components/OurMission";
import LandingPage from "./components/LandingPage";
import MenuList from "./components/MenuList";
import ReservationForm from "./components/ReservationForm";
import { ShoppingCartContextProvider } from "./contexts/ShoppingCartContextProvider";
import { ShoppingCart } from "./components/ShoppingCart";

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
        </Routes>
      </ShoppingCartContextProvider>
    </>
  );
}

export default App;
