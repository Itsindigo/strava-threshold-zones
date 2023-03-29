import { useState } from "react";
import { SafeParseReturnType } from "zod";
import { IFormData } from "./types";
import { isValidAge, isValidHeartRate } from "./utils";
import { ZonesWizardAgeStep } from "./ZonesWizardAgeStep";
import { ZonesWizardMaximumHeartRateStep } from "./ZonesWizardMaximumHeartRateStep";
import { ZonesWizardRestingHeartRateStep } from "./ZonesWizardRestingHeartRateStep";
import { ZonesWizardStartStep } from "./ZonesWizardStartStep";

export const ZonesWizard = () => {
  const [formData, setFormData] = useState<IFormData>({
    step: 0,
    age: "",
    maxHeartRate: undefined,
    restingHeartRate: undefined,
  });

  const handleFormDataChange = (data: IFormData) => {
    const { age, maxHeartRate, restingHeartRate } = data;
    let parsedField: SafeParseReturnType<number, number> = {
      success: true,
      data: 0,
    };

    switch (formData.step) {
      case 0:
        break;
      case 1:
        parsedField = isValidAge.safeParse(age);
        break;
      case 2:
        parsedField = isValidHeartRate.safeParse(restingHeartRate);
        break;
      case 3:
        parsedField = isValidHeartRate.safeParse(maxHeartRate);
        break;
    }

    if (parsedField.success) {
      setFormData((prevData) => ({ ...prevData, step: prevData.step + 1 }));
    }
  };

  const steps = [
    <ZonesWizardStartStep
      handleChange={(data: IFormData) =>
        handleFormDataChange({ ...formData, ...data })
      }
      formData={formData}
    />,
    <ZonesWizardAgeStep
      formData={formData}
      setFormData={setFormData}
      handlePrev={() => {
        setFormData((prevData) => ({
          ...prevData,
          age: "",
          step: prevData.step - 1,
        }));
      }}
      handleNext={handleFormDataChange}
    />,
    <ZonesWizardRestingHeartRateStep />,
    <ZonesWizardMaximumHeartRateStep />,
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
      {steps[formData.step]}
    </form>
  );
};
