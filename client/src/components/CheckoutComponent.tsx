import React, { useState } from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";
import "../tailwind-server.css";
import ContentWrapper from "./ContentWrapper";
import "../styles/CheckoutComponent.scss";
import { useFormik } from "formik";
import { validationSchema } from "../validation/checkoutFormValidationScheme";

type UserInfo = {
  name: string;
  city: string;
  email: string;
  phone: string;
  street: string;
  streetNumber: number | null;
  isHouse: boolean;
  apartmentBuildingNumber: number | null;
  floor: number | null;
  apartmentNumber: number | null;
};

export const CheckoutComponent: React.FC = () => {
  const { cartItems } = useShoppingCart();
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
    onSubmit: (values) => {
      // Submit to backend
    },
  });

  return (
    <ContentWrapper>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} lv - Quantity: {item.quantity}
              </li>
            ))}
          </ul>

          <div className="text-black font-semibold mb-6">
            Total items: {cartItems.length}
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black"
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
                className="border border-[#002147] p-1 rounded"
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
                className="border border-[#002147] p-1 rounded"
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
                className="border border-[#002147] p-1 rounded"
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
                className="border border-[#002147] p-1 rounded"
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
                className="border border-[#002147] p-1 rounded"
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
                className="border border-[#002147] p-1 rounded"
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
                    className="border border-[#002147] p-1 rounded"
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
                    className="border border-[#002147] p-1 rounded"
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
                    className="border border-[#002147] p-1 rounded"
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

            <button
              type="submit"
              className="highlight-button mt-4 col-span-full"
            >
              Submit Order
            </button>
          </form>
        </>
      )}
    </ContentWrapper>
  );
};
