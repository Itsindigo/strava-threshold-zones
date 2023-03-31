import { z } from "zod";
import { IZoneCalculatorConstructor, ZoneCalculator, Range } from "./types";

export const zonesCalculationsSchema = z.object({
  restingHeartRate: z.coerce.number(),
  maxHeartRate: z.coerce.number(),
});

export function ZoneCalculator({
  restingHeartRate,
  maxHeartRate,
}: IZoneCalculatorConstructor): ZoneCalculator {
  const heartRateReserve = maxHeartRate - restingHeartRate;
  const halfReserve = Math.floor(heartRateReserve * 0.5);
  const threeQuartReserve = Math.floor(heartRateReserve * 0.75);

  const zone1 = () => {
    const range: Range = [restingHeartRate, heartRateReserve];
    return { range, label: "Recovery Zone" };
  };

  const zone2 = () => {
    const range: Range = [zone1().range[1] + 1, Math.floor(maxHeartRate * 0.7)];
    return { range, label: "Base Building Zone" };
  };

  const zone3 = () => {
    const range: Range = [
      zone2().range[1] + 1,
      Math.floor(maxHeartRate * 0.85),
    ];

    return { range, label: "Aerobic Endurance Zone" };
  };

  const zone4 = () => {
    const range: Range = [zone3().range[1] + 1, Math.floor(maxHeartRate * 0.9)];

    return { range, label: "Aerobic-Anaerobic Threshold Zone" };
  };

  const zone5 = () => {
    const range: Range = [zone4().range[1] + 1, maxHeartRate];
    return { range, label: "Lactate Training Zone" };
  };

  return {
    zone1,
    zone2,
    zone3,
    zone4,
    zone5,
  };
}
