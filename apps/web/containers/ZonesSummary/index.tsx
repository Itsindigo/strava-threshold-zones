import { ZoneCalculator } from "./utils";

interface IProps {
  restingHeartRate: number;
  maxHeartRate: number;
}

export const ZonesSummary: React.FC<IProps> = ({
  restingHeartRate,
  maxHeartRate,
}) => {
  const calculator = ZoneCalculator({ restingHeartRate, maxHeartRate });
  const zone1 = calculator.zone1();
  const zone2 = calculator.zone2();
  const zone3 = calculator.zone3();
  const zone4 = calculator.zone4();
  const zone5 = calculator.zone5();
  return (
    <div>
      <p>
        {zone1.label}: {zone1.range[0]} - {zone1.range[1]}
      </p>
      <p>
        {zone2.label}: {zone2.range[0]} - {zone2.range[1]}
      </p>
      <p>
        {zone3.label}: {zone3.range[0]} - {zone3.range[1]}
      </p>
      <p>
        {zone4.label}: {zone4.range[0]} - {zone4.range[1]}
      </p>
      <p>
        {zone5.label}: {zone5.range[0]} - {zone5.range[1]}
      </p>
    </div>
  );
};
