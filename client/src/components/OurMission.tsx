import React from 'react';
import transparentLogo from '../assets/logo-transparent.png'
import './OurMission.scss'

type MissionDescriptor = {
    missionImage: string;
    missionTitle: string;
    missionDescription: string;
}

const OurMission: React.FC = () => {
    const missions: MissionDescriptor[] = [
        {
            missionImage: transparentLogo,
            missionTitle: 'The food that excites you!',
            missionDescription: 'Our expert chefs tirelessly prepare the dishes from exquisite mean, fresh vegetables, and herbs.'
        },
        {
            missionImage: transparentLogo,
            missionTitle: 'Time of your life!',
            missionDescription: 'We know that the essence of life is having the best memories. Our music selection, parties, and DJs are here to make your night memorable beyond food and drinks.'
        },
        {
            missionImage: transparentLogo,
            missionTitle: 'One more drink is never too much!',
            missionDescription: 'Our bartenders will serve the best cocktails that you have ever tasted!'
        }
    ]
    return (
        <>
            <section className='grid-missions-wrapper'>
                {
                    missions.map((mission, index) => (
                        <div className='mission-card' key={index}>
                            <img className='mission-card-image' src={mission.missionImage} alt={mission.missionTitle}></img>
                            <h3 className='mission-header-text'>
                                {mission.missionTitle}
                            </h3>
                            <span className='mission-text'>
                                {mission.missionDescription}
                            </span>
                        </div>
                    ))
                }
            </section>
        </>
    )
}

export default OurMission;