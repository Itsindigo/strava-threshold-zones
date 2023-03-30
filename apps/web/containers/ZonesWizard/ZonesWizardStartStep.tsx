import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import ArrowRight from "../../components/Icons/ArrowRight";
import { ErrorMessageContainer } from "./Components/ErrorMessageContainer";
import { ERROR_MALFORMED_JSON_SUMMARY } from "./constants";
import { IFormData } from "./types";

interface IProps {
  handleChange: (formData: IFormData) => void;
  formData: IFormData;
}

export const ZonesWizardStartStep = ({ handleChange, formData }: IProps) => {
  const router = useRouter();

  const [parsingError, setParsingError] = useState<string>();

  useEffect(() => {
    if (router.query.malformed) {
      setParsingError(ERROR_MALFORMED_JSON_SUMMARY);
    }
  }, []);

  const handleClearQuery = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
  };

  return (
    <>
      <div>
        <p className="font-sans text-white mb-8">
          Heart rate threshold zones are specific ranges of heart rate that
          correspond to different levels of exertion. These zones are used in
          fitness training to help athletes and fitness enthusiasts optimize
          their workouts and achieve their fitness goals. By monitoring your
          heart rate and training within these zones, you can ensure that you
          are working out at the right intensity to improve your fitness,
          without pushing yourself too hard and risking injury or burnout. Each
          threshold zone has its own benefits and uses, and can be customized to
          your individual fitness level and goals.
        </p>
        <ErrorMessageContainer
          errorMessages={parsingError ? [parsingError] : []}
        />
      </div>
      <div className="flex justify-center mb-16">
        <Button
          variant="primary"
          extraClasses="py-2 px-2 font-semibold shadow-md inline-flex"
          onClick={() => {
            handleClearQuery();
            handleChange(formData);
          }}
        >
          Calculate Your Zones {"   "}
          <span className="px-2 font-bold">
            <ArrowRight />
          </span>
        </Button>
      </div>
    </>
  );
};
