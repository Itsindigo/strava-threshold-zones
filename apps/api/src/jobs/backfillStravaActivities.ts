import { logger } from "../logger";
import { myStravaAthleteId } from "../constants";
import { findStravaUserDecrypted, getUserActivities } from "../services/strava";

const main = async () => {
  const user = await findStravaUserDecrypted(myStravaAthleteId);

  if (!user) {
    throw new Error("Could not find user");
  }

  const activities = await getUserActivities(user);
  console.log(activities[0]);
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
