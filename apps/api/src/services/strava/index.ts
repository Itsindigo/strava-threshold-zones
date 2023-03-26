import { DetailedActivity } from "strava-types";
import {
  saveStravaUser,
  findStravaUser,
  PersistedStravaUser,
} from "../../repositories/strava_users";
import { encrypt, decrypt } from "../crypto";
import { logger } from "../../logger";
import { getAuthorizedAthlete, getActivities } from "../../clients/strava";
import {
  batchSaveStravaActivities,
  StravaActivity,
} from "../../repositories/strava_activities";
import { noop } from "../../utils/noop";

export const authorizeAndSaveUser = async (code: string) => {
  const data = await getAuthorizedAthlete(code);

  const existingUser = await findStravaUserDecrypted(data.athlete.id).catch(
    noop
  );

  if (existingUser) {
    logger.info(
      { id: existingUser.id, stravaId: existingUser.stravaId },
      "User found"
    );
    return existingUser;
  }

  const { stravaUserId } = await saveStravaUser({
    stravaId: data.athlete.id,
    username: data.athlete.username,
    firstName: data.athlete.firstname,
    lastName: data.athlete.lastname,
    refreshToken: JSON.stringify(encrypt(data.refresh_token)),
    accessToken: JSON.stringify(encrypt(data.access_token)),
    expiresAt: data.expires_at,
  });

  const user = await findStravaUserDecrypted(stravaUserId);

  logger.info({ id: user.id, stravaId: user.stravaId }, "User created");
  return user;
};

export const findStravaUserDecrypted = async (
  stravaId: number
): Promise<PersistedStravaUser> => {
  const user = await findStravaUser(stravaId);

  if (!user) {
    throw new Error("Could not find user");
  }

  return {
    ...user,
    refreshToken: decrypt(JSON.parse(user.refreshToken)),
    accessToken: decrypt(JSON.parse(user.accessToken)),
  };
};

export const getUserActivities = async (
  user: PersistedStravaUser,
  pageNumber = 1
): Promise<DetailedActivity[]> => {
  const activities = await getActivities({
    expiresAt: user.expiresAt,
    refreshToken: user.refreshToken,
    accessToken: user.accessToken,
    pageNumber,
  });

  return activities;
};

export const getAllAthleteActivityPages = async (
  user: PersistedStravaUser,
  pageNumber: number,
  activities: DetailedActivity[]
): Promise<DetailedActivity[]> => {
  const page = await getUserActivities(user, pageNumber);
  if (page.length === 0) {
    return activities;
  }
  return getAllAthleteActivityPages(user, pageNumber + 1, [
    ...activities,
    ...page,
  ]);
};

export const saveStravaActivities = async (activities: StravaActivity[]) => {
  return batchSaveStravaActivities(activities);
};

export const getAuthenticationURL = async () => {
  // Just hardcode for now
  return `https://www.strava.com/oauth/authorize?
    client_id=70056
    &redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fstrava%2Fcallback
    &response_type=code
    &scope=read%2Cread_all%2Cprofile%3Aread_all%2Cprofile%3Awrite%2Cactivity%3Aread%2Cactivity%3Aread_all%2Cactivity%3Awrite`;
};
