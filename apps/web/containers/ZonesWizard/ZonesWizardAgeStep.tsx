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
import { isValidAge } from "./utils";

interface IProps {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  errorMessages?: string[];
}

export const ZonesWizardAgeStep = ({
  formData,
  setFormData,
  errorMessages = [],
}: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ageParse = isValidAge.safeParse(event.target.value);

    if (ageParse.success) {
      setFormData({ ...formData, age: event.target.value });
    } else if (event.target.value === "") {
      setFormData({ ...formData, age: event.target.value });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <InputField
          id="zones-age"
          label="How old are you?"
          name="age"
          value={formData.age}
          onChange={handleAgeChange}
          inputMode="numeric"
          inputRef={inputRef}
          extraClasses="w-5/6 px-4 py-2"
        />
        <ErrorMessageContainer errorMessages={errorMessages} />
      </div>
    </>
  );
};
