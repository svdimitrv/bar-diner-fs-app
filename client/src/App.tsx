import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import OurMission from "./components/OurMission";
import LandingPage from "./pages/LandingPage";
import MenuList from "./pages/MenuList";
import ReservationForm from "./components/ReservationForm";
import { ShoppingCartContextProvider } from "./contexts/ShoppingCartContextProvider";
import { CheckoutComponent } from "./pages/CheckoutPage";
import Dashboard  from "./pages/AdminPage";
import ThankYouPage from "./pages/ThankYou";

function App() {
  return (
    <>
      <ShoppingCartContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<OurMission />} />
          <Route path="/menu" element={<MenuList />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/checkout" element={<CheckoutComponent />}></Route>
          <Route path="/admin" element={<Dashboard />}></Route>
          <Route path="/thank-you" element={<ThankYouPage />}></Route>
        </Routes>
      </ShoppingCartContextProvider>
    </>
  );
}

export default App;
