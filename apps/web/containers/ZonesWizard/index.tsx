import { useState } from "react";
import { SafeParseReturnType } from "zod";
import { IFormData } from "./types";
import { isValidAge, isValidHeartRate } from "./utils";
import { ZonesWizardAgeStep } from "./ZonesWizardAgeStep";
import { ZonesWizardStartStep } from "./ZonesWizardStartStep";

export const ZonesWizard = () => {
  const [formData, setFormData] = useState<IFormData>({
    step: 0,
    age: "",
    maxHeartRate: undefined,
    restingHeartRate: undefined,
  });
  const [formError, setFormError] = useState<string[]>([]);

  const handleFormDataChange = (data: IFormData) => {
    setFormData((prevData) => ({ ...prevData, ...data }));

    console.log(`Called with`, data);

    const { age, maxHeartRate, restingHeartRate } = formData;
    let parsedField: SafeParseReturnType<number, number> = {
      success: true,
      data: 0,
    };

    switch (formData.step) {
      case 0:
        break;
      case 1:
        const ageParse = isValidAge.safeParse(age);
        parsedField = ageParse;
      case 2:
        parsedField = isValidHeartRate.safeParse(maxHeartRate);
      case 3:
        parsedField = isValidHeartRate.safeParse(restingHeartRate);
    }

    if (parsedField.success) {
      setFormData((prevData) => ({ ...prevData, step: prevData.step + 1 }));
    } else {
      setFormError(parsedField.error.errors.map((err) => err.message));
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
          age: undefined,
          step: prevData.step - 1,
        }));
      }}
      handleNext={handleFormDataChange}
    />,
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
