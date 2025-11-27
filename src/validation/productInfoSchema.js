import * as yup from "yup";

export const productInfoSchema = yup.object().shape({
  registrationType: yup.string().required("Select registration type"),
  manufacturer: yup.string().required("Select manufacturer"),
  productName: yup.string().trim().required("Enter product name"),
  productNumber: yup.string().trim().required("Enter product number"),
  purchaseDate: yup.string().required("Enter purchase date"),
  faultDescription: yup.string().trim().required("Describe the fault"),
  note: yup.string().trim(), // optional
  files: yup
    .array()
    .min(1, "Upload at least one file")
    .max(5, "Maximum 5 files")
    .test("fileSize", "Each file must be ≤ 5MB", (files) =>
      files ? files.every((f) => f.size <= 5 * 1024 * 1024) : true
    )
    .test("fileType", "Allowed types: pdf, jpg, jpeg, png", (files) =>
      files
        ? files.every((f) =>
            ["application/pdf", "image/jpeg", "image/png"].includes(f.type)
          )
        : true
    ),
});
