import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import OurMission from "./components/OurMission";
import ContentWrapper from "./components/ContentWrapper";
import LandingPage from "./components/LandingPage";
import MenuList from "./components/MenuList";
import ReservationForm from "./components/ReservationForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            <ContentWrapper>
              <Routes>
                <Route path="mission" element={<OurMission />} />
                <Route path="menu" element={<MenuList />} />
                <Route path='reservation' element={<ReservationForm />} />
              </Routes>
            </ContentWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
