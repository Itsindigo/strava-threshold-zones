export * from "./types";
import { sql } from "slonik";
import { StravaActivity } from "./types";
import { pool } from "../../slonik";
import { TABLE_NAMES } from "../../config";

export const batchSaveStravaActivities = async (
  stravaActivities: StravaActivity[]
): Promise<{ stravaActivityId: number }> => {
  const {
    rows: [{ strava_id: stravaActivityId }],
  } = await pool.query<{ strava_id: number }>(sql`
    INSERT INTO ${sql.identifier([TABLE_NAMES.stravaActivities])} (
      strava_id,
      strava_user_id,
      activity_name,
      distance,
      moving_time_seconds,
      sport_type,
      workout_type,
      start_date,
      start_date_local,
      timezone,
      average_speed_mps,
      average_heart_rate,
      max_heart_rate,
      suffer_score
    ) SELECT * FROM
    ${sql.unnest(
      stravaActivities.map((activity) => {
        return Object.values(activity);
      }),
      [
        "int8",
        "int8",
        "varchar",
        "numeric",
        "int4",
        "varchar",
        "int4",
        "timestamptz",
        "timestamptz",
        "varchar",
        "numeric",
        "numeric",
        "numeric",
        "numeric",
      ]
    )}
    RETURNING (
      strava_id
    )
  `);

  return {
    stravaActivityId,
  };
};
