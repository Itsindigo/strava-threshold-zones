import { logger } from "../logger";
import { myStravaAthleteId } from "../constants";
import { getUserActivities } from "../services/strava";

const main = async () => {
  const activities = await getUserActivities(myStravaAthleteId);
  console.log({ activities: Object.keys(activities) });
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