import React from "react";
import Stepper from "../components/Stepper";
import ProductInfoForm from "../components/ProductInfoForm";
import ContactDetailsForm from "../components/ContactDetailsForm";
import Confirmation from "../components/Confirmation";
import RegistrationHeader from "../components/RegistrationHeader";

export default function RepairRegistration() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [reference, setReference] = React.useState("");

  // Keep keys consistent with ProductInfoForm and productInfoSchema
  const [formData, setFormData] = React.useState({
    registrationType: "",
    manufacturer: "",
    productName: "",
    productNumber: "",
    purchaseDate: "",
    faultDescription: "",
    note: "",
    files: [],
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const patchForm = (partial) =>
    setFormData((prev) => ({ ...prev, ...partial }));
  const next = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    try {
      setIsSubmitting(true);

      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === "files" && Array.isArray(v)) {
          v.forEach((file) => body.append("files", file));
        } else {
          body.append(k, v ?? "");
        }
      });

      const response = await fetch(
        "http://localhost:4000/api/repair-registration",
        {
          method: "POST",
          body,
        }
      );

      const result = await response.json();

      if (result.success) {
        setReference(result.reference);
      } else {
        alert(result.message || "Submission failed.");
      }
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <RegistrationHeader />

      {/* Responsive wrapper */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {reference ? (
          <div className="max-w-xl mx-auto bg-white shadow rounded p-6 space-y-3">
            <h2 className="text-xl font-semibold">Repair reference</h2>
            <p>Your repair has been registered.</p>
            <p className="font-mono text-2xl">{reference}</p>
            <p className="text-sm text-gray-600">
              Keep this number to track your repair.
            </p>
          </div>
        ) : (
          <>
            {/* Stepper adapts to screen width */}
            <div className="overflow-x-auto">
              <Stepper currentStep={currentStep} />
            </div>

            <div className="mt-8">
              {currentStep === 1 && (
                <ProductInfoForm
                  data={formData}
                  onChange={patchForm}
                  onNext={next}
                />
              )}

              {currentStep === 2 && (
                <ContactDetailsForm
                  data={formData}
                  onChange={patchForm}
                  onNext={next}
                  onBack={back}
                />
              )}

              {currentStep === 3 && (
                <Confirmation
                  data={formData}
                  onBack={back}
                  onSubmit={submit}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
