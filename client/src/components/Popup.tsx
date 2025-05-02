import React, { useEffect, useRef } from "react";

type AnchoredPopupProps = {
  anchorRef: React.RefObject<HTMLLIElement | null>;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const AnchoredPopup: React.FC<AnchoredPopupProps> = ({
  anchorRef,
  onClose,
  children,
  className = "",
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  return (
    <div
      ref={popupRef}
      className={`absolute right-0 mt-2 z-50 rounded-xl shadow-lg border border-gray-200 bg-white p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default AnchoredPopup;
