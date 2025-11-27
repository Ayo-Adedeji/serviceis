import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productInfoSchema } from "../validation/productInfoSchema";

export default function ProductInfoForm({ data, onChange, onNext }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: yupResolver(productInfoSchema),
  });

  const files = watch("files") || [];

  const onSubmit = (formValues) => {
    onChange(formValues);
    onNext();
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setValue("files", selected);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 border rounded-xl bg-gray-100 p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PRODUCT INFORMATION */}
        <div>
          <h2 className="text-lg font-semibold mb-5">PRODUCT INFORMATION</h2>

          <div className="space-y-4">
            {/* Registration type */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="sm:w-40 w-full sm:text-right">
                Registration type*
              </label>
              <select
                {...register("registrationType")}
                className="flex-1 border p-2 rounded w-full"
              >
                <option value="">Select</option>
                <option value="warranty">Warranty</option>
                <option value="paid">Paid</option>
              </select>
              <p className="text-red-600 text-sm">
                {errors.registrationType?.message}
              </p>
            </div>

            {/* Manufacturer */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="sm:w-40 w-full sm:text-right">
                Manufacturer*
              </label>
              <select
                {...register("manufacturer")}
                className="flex-1 border p-2 rounded w-full"
              >
                <option value="">Select</option>
                <option value="HP">HP</option>
                <option value="Dell">Dell</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Apple">Apple</option>
              </select>
              <p className="text-red-600 text-sm">
                {errors.manufacturer?.message}
              </p>
            </div>

            {/* Product name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="sm:w-40 w-full sm:text-right">
                Product name*
              </label>
              <input
                {...register("productName")}
                className="flex-1 border p-2 rounded w-full"
              />
              <p className="text-red-600 text-sm">
                {errors.productName?.message}
              </p>
            </div>

            {/* Product number */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="sm:w-40 w-full sm:text-right">
                Product number*
              </label>
              <input
                {...register("productNumber")}
                className="flex-1 border p-2 rounded w-full"
              />
              <p className="text-red-600 text-sm">
                {errors.productNumber?.message}
              </p>
            </div>

            {/* Purchase date */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <label className="sm:w-40 w-full sm:text-right">
                Purchase date*
              </label>
              <input
                type="date"
                {...register("purchaseDate")}
                className="flex-1 border p-2 rounded w-full"
              />
              <p className="text-red-600 text-sm">
                {errors.purchaseDate?.message}
              </p>
            </div>
          </div>
        </div>

        {/* REPAIR INFORMATION */}
        <div>
          <h2 className="text-lg font-semibold mb-5">REPAIR</h2>

          {/* Fault description */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
            <label className="sm:w-40 w-full sm:text-right">
              Fault description*
            </label>
            <textarea
              {...register("faultDescription")}
              className="flex-1 border p-2 rounded w-full"
              rows={4}
            />
            <p className="text-red-600 text-sm">
              {errors.faultDescription?.message}
            </p>
          </div>

          {/* Note */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
            <label className="sm:w-40 w-full sm:text-right">Note</label>
            <textarea
              {...register("note")}
              className="flex-1 border p-2 rounded w-full"
              rows={4}
            />
            <p className="text-red-600 text-sm">{errors.note?.message}</p>
          </div>

          {/* Upload files */}
          <div className="space-y-2">
            <label>Upload files*</label>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <p className="text-gray-600 text-sm">
              Max 5 files • Max 5MB each • Allowed: pdf, jpg, jpeg, png
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {files.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
            <p className="text-red-600 text-sm">{errors.files?.message}</p>
          </div>

          {/* Continue button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
