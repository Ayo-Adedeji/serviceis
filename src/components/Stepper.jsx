import React from "react";

export default function Stepper({ currentStep }) {
  const steps = [
    { id: 1, label: "Product information" },
    { id: 2, label: "Contact details" },
    { id: 3, label: "Confirmation" },
  ];

  return (
    <ol className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-0 w-full max-w-3xl mx-auto">
      {steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <li key={step.id} className="flex items-center">
            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${
                    isCompleted
                      ? "bg-blue-600 text-white"
                      : isActive
                      ? "border-2 border-blue-600 text-blue-600"
                      : "border-2 border-gray-300 text-gray-600"
                  }
                `}
                aria-current={isActive ? "step" : undefined}
              >
                {step.id}
              </div>
              <span
                className={`text-sm ${
                  isActive
                    ? "text-blue-700 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line only on large screens */}
            {idx < steps.length - 1 && (
              <div
                className={`hidden lg:block h-[2px] w-24 mx-3 ${
                  isCompleted ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
