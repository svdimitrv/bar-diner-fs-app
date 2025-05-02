import React from 'react';
import '../styles/ContentWrapper.scss'
import '../tailwind-server.css'

type ContentWrapperProps = {
    children: React.ReactNode;
  };

const ContentWrapper: React.FC<ContentWrapperProps> = ({children}) => {
    return (
        <section className='content-wrapper flex flex-col items-center justify-center h-full'>
            {children}
        </section>
    )
}

export default ContentWrapper;