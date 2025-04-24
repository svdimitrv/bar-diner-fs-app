import React from 'react';
import './ContentWrapper.scss'

type ContentWrapperProps = {
    children: React.ReactNode;
  };

const ContentWrapper: React.FC<ContentWrapperProps> = ({children}) => {
    return (
        <section className='content-wrapper'>
            {children}
        </section>
    )
}

export default ContentWrapper;