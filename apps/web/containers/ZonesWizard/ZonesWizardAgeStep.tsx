import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import Button from "../../components/Button/Button";
import { IFormData } from "./types";
import { isValidAge } from "./utils";

interface IProps {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
  handlePrev: () => void;
  handleNext: (formData: IFormData) => void;
}

export const ZonesWizardAgeStep = ({
  formData,
  setFormData,
  handlePrev,
  handleNext,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ageParse = isValidAge.safeParse(event.target.value);

    if (ageParse.success) {
      setFormData({ ...formData, age: event.target.value });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-16">
        <label htmlFor="zones-age" className="mb-2">
          How old are you?
        </label>
        <input
          id="zones-age"
          type="text"
          inputMode="numeric"
          className="
            w-5/6 px-4 py-2
            text-whiteborder text-center
            shadow-sm shadow-white caret-blue-300
            focus:outline-none rounded
          "
          ref={inputRef}
          name="age"
          value={formData.age}
          onChange={handleAgeChange}
        />
      </div>
      <div className="flex flex-row-reverse space-x-reverse space-x-4 justify-center">
        <Button
          extraClasses="w-1/6 min-w-[25%] md:min-w-[10%]"
          variant="primary"
          onClick={() => handleNext({ ...formData })}
        >
          Next
        </Button>
        <Button
          extraClasses="w-1/6 min-w-[25%] md:min-w-[10%]"
          variant="secondary"
          onClick={handlePrev}
        >
          Back
        </Button>
      </div>
    </>
  );
};
