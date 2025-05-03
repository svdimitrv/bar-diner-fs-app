import React from "react";
import transparentLogo from "../assets/logo-transparent.png";
import "../styles/OurMission.scss";
import ContentWrapper from "./ContentWrapper";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

type MissionDescriptor = {
  missionImage: string;
  missionTitle: string;
  missionDescription: string;
};

const OurMission: React.FC = () => {
  const missions: MissionDescriptor[] = [
    {
      missionImage: transparentLogo,
      missionTitle: "The food that excites you!",
      missionDescription:
        "Our expert chefs tirelessly prepare the dishes from exquisite mean, fresh vegetables, and herbs.",
    },
    {
      missionImage: transparentLogo,
      missionTitle: "Time of your life!",
      missionDescription:
        "We know that the essence of life is having the best memories. Our music selection, parties, and DJs are here to make your night memorable beyond food and drinks.",
    },
    {
      missionImage: transparentLogo,
      missionTitle: "One more drink is never too much!",
      missionDescription:
        "Our bartenders will serve the best cocktails that you have ever tasted!",
    },
  ];
  return (
    <>
      <ContentWrapper>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-100">
          <h2 className="text-xl font-bold text-[#002147] mb-4">Contact Us</h2>

          <div className="flex items-center gap-3 text-gray-800">
            <PhoneIcon className="w-6 h-6 text-[#002147]" />
            <span className="text-base">+359 888 255 148</span>
          </div>

          <div className="flex items-center gap-3 text-gray-800">
            <EnvelopeIcon className="w-6 h-6 text-[#002147]" />
            <span className="text-base">barra@barra.bg</span>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=42.606542, 23.114701"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[#002147] hover:underline"
          >
            <MapPinIcon className="w-6 h-6" />
            <span className="text-base">Pernik, Buchinski Pat 10</span>
          </a>
        </div>

        <h2 className="text-xl font-bold text-[#002147] my-4">Our Mission</h2>

        <section className="grid-missions-wrapper mt-4">
          {missions.map((mission, index) => (
            <div className="mission-card" key={index}>
              <img
                className="mission-card-image"
                src={mission.missionImage}
                alt={mission.missionTitle}
              ></img>
              <h3 className="mission-header-text">{mission.missionTitle}</h3>
              <span className="mission-text">{mission.missionDescription}</span>
            </div>
          ))}
        </section>
      </ContentWrapper>
    </>
  );
};

export default OurMission;
