import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import InputField from "../../components/FormFields/InputField/InputField";
import { IFormData } from "./types";
import { isValidHeartRate } from "./utils";

interface IProps {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
}

export const ZonesWizardMaximumHeartRateStep = ({
  formData,
  setFormData,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleHeartRateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const heartRateParse = isValidHeartRate.safeParse(event.target.value);

    if (heartRateParse.success) {
      setFormData({ ...formData, maxHeartRate: event.target.value });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-16">
        <InputField
          id="zones-max-hr"
          label="What is your maximum heart rate?"
          name="max-hr"
          value={formData.maxHeartRate}
          onChange={handleHeartRateChange}
          inputMode="numeric"
          inputRef={inputRef}
          extraClasses="w-5/6 px-4 py-2"
        />
      </div>
    </>
  );
};
