import React, { createContext, useContext, ReactNode } from "react";

type CloseCartContextType = {
  closeCart: () => void;
};

const CloseCartContext = createContext<CloseCartContextType | undefined>(undefined);

export const useCloseCart = () => {
  const context = useContext(CloseCartContext);
  if (!context) {
    throw new Error("useCloseCart must be used within a CloseCartProvider");
  }
  return context;
};

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export const CloseCartProvider: React.FC<Props> = ({ children, onClose }) => {
  return (
    <CloseCartContext.Provider value={{ closeCart: onClose }}>
      {children}
    </CloseCartContext.Provider>
  );
};
