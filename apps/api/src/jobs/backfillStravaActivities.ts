import { logger } from "../logger";
import { myStravaAthleteId } from "../constants";
import { getUserActivities } from "../services/strava";
import { StravaActivity } from "src/clients/strava/types";

const getAllActivityPages = async (
  pageNumber: number,
  activities: StravaActivity[]
): Promise<StravaActivity[]> => {
  const page = await getUserActivities(myStravaAthleteId, pageNumber);
  if (page.length === 0) {
    return activities;
  }
  return getAllActivityPages(pageNumber + 1, [...activities, ...page]);
};

const main = async () => {
  const activities = await getUserActivities(myStravaAthleteId);
  console.log(activities.find((activity) => activity.has_heartrate));
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
