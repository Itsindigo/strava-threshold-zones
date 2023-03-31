import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import InputField from "../../components/FormFields/InputField/InputField";
import { ErrorMessageContainer } from "./Components/ErrorMessageContainer";
import { IFormData } from "./types";
import { isValidHeartRate } from "./utils";

interface IProps {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  errorMessages?: string[];
}

export const ZonesWizardMaximumHeartRateStep = ({
  formData,
  setFormData,
  errorMessages = [],
}: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleHeartRateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const heartRateParse = isValidHeartRate.safeParse(event.target.value);

    if (heartRateParse.success) {
      setFormData({ ...formData, maxHeartRate: event.target.value });
    } else if (event.target.value === "") {
      setFormData({ ...formData, maxHeartRate: event.target.value });
    }
  };

  const age = formData.age.length ? parseInt(formData.age, 10) : 0;

  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <InputField
          id="zones-max-hr"
          label="What is your maximum heart rate?"
          name="max-hr"
          value={formData.maxHeartRate}
          onChange={handleHeartRateChange}
          inputMode="numeric"
          inputRef={inputRef}
          extraClasses="w-5/6 px-4 py-2 placeholder-center"
          placeholder={`Suggestion based on your age: ${220 - age}`}
        />
        <ErrorMessageContainer errorMessages={errorMessages} />
      </div>
    </>
  );
};
