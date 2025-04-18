import React from "react";
import { useNavigate } from "react-router-dom";
import barPlaceholder from "../assets/placeholder-bar-image.jpg";
import transparentLogo from '../assets/logo-transparent.png'
import "./LandingPage.scss";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const onMenuButtonClick = () => {
        navigate('/menu');
    }
  return (
<div className="image-container landing-container">
  <div className="overlay-content">
    <h2 className="landing-heading-text">
      BARRA is not just a place, it is an emotion
    </h2>
    <img src={transparentLogo} className="sized-logo" />

    <button className="landing-menu-button" onClick={onMenuButtonClick}>See our Menu</button>
  </div>
  <img src={barPlaceholder} alt="Bar preview" />
</div>

  );
};

export default LandingPage;
