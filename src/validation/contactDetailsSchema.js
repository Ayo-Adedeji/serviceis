import * as yup from "yup";

export const contactDetailsSchema = yup.object().shape({
  fullName: yup.string().trim().required("Enter full name"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  phone: yup.string().required("Enter phone"),
  address: yup.string().required("Enter address"),
});
