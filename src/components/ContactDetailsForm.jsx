import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactDetailsSchema } from "../validation/contactDetailsSchema";

export default function ContactDetailsForm({ data, onChange, onNext, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: yupResolver(contactDetailsSchema),
  });

  const onSubmit = (formValues) => {
    onChange(formValues);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-lg font-semibold">Contact details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            {...register("fullName")}
            className="mt-1 w-full border rounded p-2"
          />
          <p className="text-red-600 text-sm mt-1">{errors.fullName?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full border rounded p-2"
          />
          <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            {...register("phone")}
            className="mt-1 w-full border rounded p-2"
          />
          <p className="text-red-600 text-sm mt-1">{errors.phone?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            {...register("address")}
            className="mt-1 w-full border rounded p-2"
          />
          <p className="text-red-600 text-sm mt-1">{errors.address?.message}</p>
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="border border-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
