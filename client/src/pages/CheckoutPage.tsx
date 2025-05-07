import React, { useState } from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";
import "../tailwind-server.css";
import ContentWrapper from "../components/ContentWrapper";
import "../styles/CheckoutComponent.scss";
import { useFormik } from "formik";
import { validationSchema } from "../validation/checkoutFormValidationScheme";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types/UserInfo";
import axios from "axios";

export const CheckoutComponent: React.FC = () => {
  const { cartItems, clearCart } = useShoppingCart();
  const navigate = useNavigate();
  const [formData, _] = useState<UserInfo>({
    name: "",
    city: "",
    email: "",
    phone: "",
    street: "",
    streetNumber: null,
    isHouse: false,
    apartmentBuildingNumber: null,
    floor: null,
    apartmentNumber: null,
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const requestBody = {
        user: {
          name: values.name,
          city: values.city,
          email: values.email,
          phone: values.phone,
          street: values.street,
          streetNumber: values.streetNumber,
          isHouse: values.isHouse,
          apartmentBuildingNumber: values.apartmentBuildingNumber,
          floor: values.floor,
          apartmentNumber: values.apartmentNumber
        },
        orders: cartItems.map(item => ({
          dishName: item.name,
          dishQuantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price
        })),
        grandTotal: cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
      };

      try {
        const response = await axios.post("http://localhost:5043/api/orders", requestBody);
      
        if (response.data?.success) {
          resetForm();
          clearCart();
          navigate('/thank-you')
        } 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Order submission failed:", error.response?.data || error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
  });

  return (
    <ContentWrapper>
      <h2 className="text-2xl font-bold mb-4 color-[#002147]">Checkout</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col gap-2">
          <p>Your cart is empty</p>
          <button
            className="highlight-button"
            onClick={() => navigate("/menu")}
          >
            Menu
          </button>
        </div>
      ) : (
        <>
          <ul className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 px-6 py-4 transition-shadow hover:shadow-md"
              >
                <div className="font-semibold text-lg text-gray-800">
                  {item.name}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {item.price} lv &bull; Quantity: {item.quantity}
                </div>
              </li>
            ))}
          </ul>

          <div className="text-black font-semibold mb-6">
            Total items: {cartItems.length}
          </div>

          <form
            id="form-id"
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 text-black m-w-[900]"
          >
            <label className="flex items-center gap-2 col-span-full">
              <input
                name="isHouse"
                type="checkbox"
                checked={formik.values.isHouse}
                onChange={formik.handleChange}
              />
              Is this a house?
            </label>

            <div className="flex flex-col">
              <input
                name="name"
                placeholder="Name"
                className="border border-[#002147] p-2 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                required
              />
              <div className="text-red-600 text-sm min-h-[1.25rem]">
                {formik.touched.name && formik.errors.name}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                name="city"
                placeholder="City"
                className="border border-[#002147] p-2 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                required
              />
              <div className="text-red-600 text-sm min-h-[1.25rem]">
                {formik.touched.city && formik.errors.city}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="border border-[#002147] p-2 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
              <div className="text-red-600 text-sm min-h-[1.25rem]">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                name="phone"
                placeholder="Phone"
                className="border border-[#002147] p-2 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                required
              />
              <div className="text-red-600 text-sm min-h-[1.25rem]">
                {formik.touched.phone && formik.errors.phone}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                name="street"
                placeholder="Street"
                className="border border-[#002147] p-2 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.street}
                required
              />
              <div className="text-red-600 text-sm min-h-[1.25rem]">
                {formik.touched.street && formik.errors.street}
              </div>
            </div>

            <div className="flex flex-col">
              <input
                name="streetNumber"
                placeholder="Street Number"
                type="number"
                className="border border-[#002147] p-2 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streetNumber ?? ""}
                required
              />
              <div className="text-red-600 text-sm min-h-[1.25rem]">
                {formik.touched.streetNumber && formik.errors.streetNumber}
              </div>
            </div>

            {!formik.values.isHouse && (
              <>
                <div className="flex flex-col">
                  <input
                    name="apartmentBuildingNumber"
                    placeholder="Apartment Building Number"
                    type="number"
                    className="border border-[#002147] p-2 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.apartmentBuildingNumber ?? ""}
                    required
                  />
                  <div className="text-red-600 text-sm min-h-[1.25rem]">
                    {formik.touched.apartmentBuildingNumber &&
                      formik.errors.apartmentBuildingNumber}
                  </div>
                </div>

                <div className="flex flex-col">
                  <input
                    name="floor"
                    placeholder="Floor"
                    type="number"
                    className="border border-[#002147] p-2 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.floor ?? ""}
                    required
                  />
                  <div className="text-red-600 text-sm min-h-[1.25rem]">
                    {formik.touched.floor && formik.errors.floor}
                  </div>
                </div>

                <div className="flex flex-col">
                  <input
                    name="apartmentNumber"
                    placeholder="Apartment Number"
                    type="number"
                    className="border border-[#002147] p-2 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.apartmentNumber ?? ""}
                    required
                  />
                  <div className="text-red-600 text-sm min-h-[1.25rem]">
                    {formik.touched.apartmentNumber &&
                      formik.errors.apartmentNumber}
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-center col-span-full">
              <button type="submit" className="highlight-button py-2 px-4 mt-4 text-white" >
                Submit Order
              </button>
            </div>
          </form>
        </>
      )}
    </ContentWrapper>
  );
};
