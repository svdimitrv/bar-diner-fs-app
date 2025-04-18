import React from 'react';
type ContentWrapperProps = {
    children: React.ReactNode;
  };

const ContentWrapper: React.FC<ContentWrapperProps> = ({children}) => {
    return (
        <div style={{
            maxWidth: '1280px',
            margin: '0 auto'
        }}>
            {children}
        </div>
    )
}

export default ContentWrapper;