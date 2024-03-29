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

export const ZonesWizardRestingHeartRateStep = ({
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
      setFormData({ ...formData, restingHeartRate: event.target.value });
    } else if (event.target.value === "") {
      setFormData({ ...formData, restingHeartRate: event.target.value });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <InputField
          id="zones-resting-hr"
          label="What is your resting heart rate?"
          name="resting-hr"
          value={formData.restingHeartRate}
          onChange={handleHeartRateChange}
          inputMode="numeric"
          inputRef={inputRef}
          extraClasses="w-5/6 px-4 py-2"
        />
        <ErrorMessageContainer errorMessages={errorMessages} />
      </div>
    </>
  );
};
