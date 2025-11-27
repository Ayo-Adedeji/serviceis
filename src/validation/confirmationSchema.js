import * as yup from "yup";

export const confirmationSchema = yup.object().shape({
  registrationType: yup.string().required(),
  manufacturer: yup.string().required(),
  productName: yup.string().required(),
  serialNumber: yup.string(),
  endUserPurchaseDate: yup.string(),
//   purchasePrice: yup.string().required(),
  faultDescription: yup.string().required(),
  note: yup.string(),
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  files: yup.array().min(1).max(5),
});
