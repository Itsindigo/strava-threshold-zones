import { logger } from "../logger";
import { myStravaAthleteId } from "../constants";
import {
  findStravaUserDecrypted,
  getUserActivities,
  saveStravaActivities,
} from "../services/strava";

const main = async () => {
  const user = await findStravaUserDecrypted(myStravaAthleteId);

  if (!user) {
    throw new Error("Could not find user");
  }

  const activities = await getUserActivities(user);

  await saveStravaActivities(
    activities.map((activity) => ({
      stravaId: activity.id,
      stravaUserId: user.stravaId,
      activityName: activity.name ?? null,
      distance: activity.distance ?? null,
      movingTimeSeconds: activity.moving_time ?? null,
      sportType: activity.sport_type ?? null,
      workoutType: activity.workout_type ?? null,
      startDate: activity.start_date ?? null,
      startDateLocal: activity.start_date_local ?? null,
      timezone: activity.timezone ?? null,
      averageSpeedMps: activity.average_speed ?? null,
      averageHeartRate: activity.average_heartrate ?? null,
      maxHeartRate: activity.max_heartrate ?? null,
      sufferScore: activity.suffer_score ?? null,
    }))
  );
};

main()
  .then(() => {
    logger.info("Successfully imported activities");
    process.exit(0);
  })
  .catch((error) => {
    logger.error({ err: error }, "Failed to import activities");
    process.exit(1);
  });
