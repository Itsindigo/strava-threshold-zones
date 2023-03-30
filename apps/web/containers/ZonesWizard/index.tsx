import { useState } from "react";
import { SafeParseReturnType } from "zod";
import Button from "../../components/Button/Button";
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
    restingHeartRate: "",
    maxHeartRate: "",
  });

  const revertData = (formData: IFormData): IFormData => {
    switch (formData.step) {
      case 0:
        return formData;
      case 1:
        return { ...formData, age: "" };
      case 2:
        return { ...formData, restingHeartRate: "" };
      case 3:
        return { ...formData, maxHeartRate: "" };
      default:
        return formData;
    }
  };

  const handleFormDataChange = (data: IFormData) => {
    const { age, maxHeartRate, restingHeartRate } = data;
    let parsedField: SafeParseReturnType<any, any> = {
      success: true,
      data: undefined,
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
      setFormData((prevData) => ({
        ...prevData,
        ...data,
        step: prevData.step + 1,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Is this being called?");
    e.preventDefault();
  };

  const steps = [
    <ZonesWizardStartStep
      handleChange={(data: IFormData) =>
        handleFormDataChange({ ...formData, ...data })
      }
      formData={formData}
    />,
    <ZonesWizardAgeStep formData={formData} setFormData={setFormData} />,
    <ZonesWizardRestingHeartRateStep
      formData={formData}
      setFormData={setFormData}
    />,
    <ZonesWizardMaximumHeartRateStep
      formData={formData}
      setFormData={setFormData}
    />,
  ];

  const isFirstStep = formData.step === 0;
  const isFinalStep = formData.step === steps.length - 1;

  return (
    <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
      {steps[formData.step]}

      {!isFirstStep && (
        <div className="flex flex-row-reverse space-x-reverse space-x-4 justify-center">
          {isFinalStep ? (
            <Button
              extraClasses="w-1/6 min-w-[25%] md:min-w-[10%]"
              variant="primary"
              type="submit"
              key={`wizard-step-${formData.step}`}
            >
              Submit
            </Button>
          ) : (
            <Button
              extraClasses="w-1/6 min-w-[25%] md:min-w-[10%]"
              variant="primary"
              onClick={() => handleFormDataChange({ ...formData })}
              type="button"
              key={`wizard-step-${formData.step}`}
            >
              Next
            </Button>
          )}
          <Button
            extraClasses="w-1/6 min-w-[25%] md:min-w-[10%]"
            variant="secondary"
            onClick={() => {
              setFormData((prevData) => ({
                ...revertData(prevData),
                step: prevData.step - 1,
              }));
            }}
            type="button"
          >
            Back
          </Button>
        </div>
      )}
    </form>
  );
};
