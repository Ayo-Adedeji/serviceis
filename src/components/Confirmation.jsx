import React, { useState } from "react";
import { confirmationSchema } from "../validation/confirmationSchema";

export default function Confirmation({ data, onBack, onSubmit, isSubmitting }) {
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    try {
      // validate all data before final submit
      await confirmationSchema.validate(data, { abortEarly: false });
      setErrors([]);
      onSubmit(); // call the parent submit
    } catch (err) {
      if (err.name === "ValidationError") {
        setErrors(err.errors); // collect all error messages
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Confirmation</h2>

      {/* ✅ Show validation errors inline */}
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          <h3 className="font-semibold mb-2">Please fix the following issues:</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {errors.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gray-50 border rounded p-4">
        <h3 className="font-semibold mb-2">Product information</h3>
        <ul className="text-sm space-y-1">
          <li><span className="font-medium">Registration type:</span> {data.registrationType}</li>
          <li><span className="font-medium">Manufacturer:</span> {data.manufacturer}</li>
          <li><span className="font-medium">Product name:</span> {data.productName}</li>
          <li><span className="font-medium">Product number:</span> {data.productNumber}</li>
          <li><span className="font-medium">Product manufacturer:</span> {data.productManufacturer}</li>
          <li><span className="font-medium">Purchase date:</span> {data.purchaseDate}</li>
          <li><span className="font-medium">Purchase price:</span> {data.purchasePrice}</li>
          <li><span className="font-medium">Fault description:</span> {data.faultDescription}</li>
        </ul>
      </div>

      <div className="bg-gray-50 border rounded p-4">
        <h3 className="font-semibold mb-2">Contact details</h3>
        <ul className="text-sm space-y-1">
          <li><span className="font-medium">Full name:</span> {data.fullName}</li>
          <li><span className="font-medium">Email:</span> {data.email}</li>
          <li><span className="font-medium">Phone:</span> {data.phone}</li>
          <li><span className="font-medium">Address:</span> {data.address}</li>
        </ul>
      </div>

      {Array.isArray(data.files) && data.files.length > 0 && (
        <div className="bg-gray-50 border rounded p-4">
          <h3 className="font-semibold mb-2">Uploaded files</h3>
          <ul className="text-sm space-y-1">
            {data.files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="border border-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
