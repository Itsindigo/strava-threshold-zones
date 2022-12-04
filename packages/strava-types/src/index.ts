export type { paths, webhooks, components, external, operations } from "./raw";

import { components } from "./raw";

/** Export all of these types manually so that we can override data that is missing on the API Spec. */
export type ActivityStats = components["schemas"]["ActivityStats"];
export type ActivityTotal = components["schemas"]["ActivityTotal"];
export type Fault = components["schemas"]["Fault"];
export type Error = components["schemas"]["Error"];
export type DetailedAthlete = components["schemas"]["DetailedAthlete"];
export type SummaryAthlete = components["schemas"]["SummaryAthlete"];
export type MetaAthlete = components["schemas"]["MetaAthlete"];
export type SummaryClub = components["schemas"]["SummaryClub"];
export type MetaClub = components["schemas"]["MetaClub"];
export type ActivityType = components["schemas"]["ActivityType"];
export type SummaryGear = components["schemas"]["SummaryGear"];
export type Zones = components["schemas"]["Zones"];
export type HeartRateZoneRanges = components["schemas"]["HeartRateZoneRanges"];
export type ZoneRanges = components["schemas"]["ZoneRanges"];
export type ZoneRange = components["schemas"]["ZoneRange"];
export type PowerZoneRanges = components["schemas"]["PowerZoneRanges"];
export type DetailedSegment = components["schemas"]["DetailedSegment"];
export type SummarySegment = components["schemas"]["SummarySegment"];
export type LatLng = components["schemas"]["LatLng"];
export type SummarySegmentEffort =
  components["schemas"]["SummarySegmentEffort"];
export type SummaryPRSegmentEffort =
  components["schemas"]["SummaryPRSegmentEffort"];
export type PolylineMap = components["schemas"]["PolylineMap"];
export type DetailedSegmentEffort =
  components["schemas"]["DetailedSegmentEffort"];
export type MetaActivity = components["schemas"]["MetaActivity"];
export type ExplorerResponse = components["schemas"]["ExplorerResponse"];
export type ExplorerSegment = components["schemas"]["ExplorerSegment"];
export type SummaryActivity = components["schemas"]["SummaryActivity"];
export type SportType = components["schemas"]["SportType"];
export type PhotosSummary = components["schemas"]["PhotosSummary"];
export type Split = components["schemas"]["Split"];
export type Lap = components["schemas"]["Lap"];
export type UpdatableActivity = components["schemas"]["UpdatableActivity"];
export type ActivityZone = components["schemas"]["ActivityZone"];
export type TimedZoneDistribution =
  components["schemas"]["TimedZoneDistribution"];
export type TimedZoneRange = components["schemas"]["TimedZoneRange"];
export type Comment = components["schemas"]["Comment"];
export type DetailedClub = components["schemas"]["DetailedClub"];
export type DetailedGear = components["schemas"]["DetailedGear"];
export type Route = components["schemas"]["Route"];
export type Upload = components["schemas"]["Upload"];
export type StreamSet = components["schemas"]["StreamSet"];
export type TimeStream = components["schemas"]["TimeStream"];
export type BaseStream = components["schemas"]["BaseStream"];
export type DistanceStream = components["schemas"]["DistanceStream"];
export type LatLngStream = components["schemas"]["LatLngStream"];
export type AltitudeStream = components["schemas"]["AltitudeStream"];
export type SmoothVelocityStream =
  components["schemas"]["SmoothVelocityStream"];
export type HeartrateStream = components["schemas"]["HeartrateStream"];
export type CadenceStream = components["schemas"]["CadenceStream"];
export type PowerStream = components["schemas"]["PowerStream"];
export type TemperatureStream = components["schemas"]["TemperatureStream"];
export type MovingStream = components["schemas"]["MovingStream"];
export type SmoothGradeStream = components["schemas"]["SmoothGradeStream"];

/* Types with data missing in the API Spec */
export type DetailedActivity = components["schemas"]["DetailedActivity"] & {
  id: number;
  has_heartrate: boolean;
  average_heartrate?: number;
  max_heartrate?: number;
  suffer_score?: number;
};
