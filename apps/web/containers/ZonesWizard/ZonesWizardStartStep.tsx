import Button from "../../components/Button/Button";
import ArrowRight from "../../components/Icons/ArrowRight";
import { IFormData } from "./types";

interface IProps {
  handleChange: (formData: IFormData) => void;
  formData: IFormData;
}

export const ZonesWizardStartStep = ({ handleChange, formData }: IProps) => {
  return (
    <>
      <p className="font-sans text-white mb-6">
        Heart rate threshold zones are specific ranges of heart rate that
        correspond to different levels of exertion. These zones are used in
        fitness training to help athletes and fitness enthusiasts optimize their
        workouts and achieve their fitness goals. By monitoring your heart rate
        and training within these zones, you can ensure that you are working out
        at the right intensity to improve your fitness, without pushing yourself
        too hard and risking injury or burnout. Each threshold zone has its own
        benefits and uses, and can be customized to your individual fitness
        level and goals.
      </p>
      <div className="flex justify-center mb-16">
        <Button
          variant="primary"
          extraClasses="py-2 px-2 font-semibold shadow-md inline-flex"
          onClick={() => handleChange(formData)}
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
