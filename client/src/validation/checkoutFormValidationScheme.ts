import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  city: Yup.string()
    .oneOf(["Pernik", "Перник"], 'City must be either "Pernik" or "Перник"')
    .required("City is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  street: Yup.string().required("Street is required"),
  streetNumber: Yup.number()
    .typeError("Street Number must be a number")
    .required("Street Number is required"),

  isHouse: Yup.boolean().required(),

  apartmentBuildingNumber: Yup.number()
    .nullable()
    .when("isHouse", {
      is: false,
      then: (schema) =>
        schema
          .typeError("Building Number must be a number")
          .required("Building Number required for apartments"),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),

  floor: Yup.number()
    .nullable()
    .when("isHouse", {
      is: false,
      then: (schema) =>
        schema
          .typeError("Floor must be a number")
          .required("Floor required for apartments"),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),

  apartmentNumber: Yup.number()
    .nullable()
    .when("isHouse", {
      is: false,
      then: (schema) =>
        schema
          .typeError("Apartment Number must be a number")
          .required("Apartment Number required for apartments"),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
});
