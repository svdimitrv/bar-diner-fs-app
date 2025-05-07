import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#002147] mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been successfully placed. We'll start preparing it right away.
        </p>

        <div className="bg-[#f0f4f8] rounded-lg p-4 text-sm text-gray-600 mb-6">
          You will receive a confirmation email with the details of your order.
        </div>

        <button
          onClick={() => navigate("/menu")}
          className="bg-[#002147] text-white px-6 py-2 rounded-md hover:bg-[#00152b] transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
