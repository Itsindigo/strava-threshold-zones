export interface StravaActivity {
  stravaId: number;
  stravaUserId: number;
  activityName: string | null;
  distance: number | null;
  movingTimeSeconds: number | null;
  sportType: string | null;
  workoutType: number | null;
  startDate: string | null;
  startDateLocal: string | null;
  timezone: string | null;
  averageSpeedMps: number | null;
  averageHeartRate: number | null;
  maxHeartRate: number | null;
  sufferScore: number | null;
}

export interface PersistedStravaActivity extends StravaActivity {
  id: number;
}
