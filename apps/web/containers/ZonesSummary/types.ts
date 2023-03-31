export type Range = [number, number];

export interface IZoneCalculatorConstructor {
  restingHeartRate: number;
  maxHeartRate: number;
}

export type ZoneDetail = {
  range: Range;
  label: string;
};

export interface ZoneCalculator {
  zone1: () => ZoneDetail;
  zone2: () => ZoneDetail;
  zone3: () => ZoneDetail;
  zone4: () => ZoneDetail;
  zone5: () => ZoneDetail;
}
