import { logger } from "../logger";
import { myStravaAthleteId } from "../constants";
import { findStravaUserDecrypted, getUserActivities } from "../services/strava";

const main = async () => {
  const user = await findStravaUserDecrypted(myStravaAthleteId);

  if (!user) {
    throw new Error("Could not find user");
  }

  const activities = await getUserActivities(user);

  const data = activities.map((activity) => ({
    stravaId: activity.id,
    activityName: activity.name,
    distance: activity.distance,
    movingTimeSeconds: activity.moving_time,
    sportType: activity.sport_type,
    workoutType: activity.workout_type,
    startDate: activity.start_date,
    startDateLocal: activity.start_date_local,
    timezone: activity.timezone,
    averageSpeedMps: activity.average_speed,
    averageHeartRate: activity.average_heartrate,
    maxHeartRate: activity.max_heartrate,
    sufferScore: activity.suffer_score,
  }));
  console.log({ data });
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
