import { DetailedActivity } from "strava-types";
import { saveStravaUser, findStravaUser } from "../repositories/strava_users";
import { getAuthorizedAthlete, getActivities } from "../clients/strava";

export const authorizeAndSaveUser = async (code: string) => {
  const data = await getAuthorizedAthlete(code);

  /* TODO encrypt tokens */
  const user = await saveStravaUser({
    stravaId: data.athlete.id,
    username: data.athlete.username,
    firstName: data.athlete.firstname,
    lastName: data.athlete.lastname,
    refreshToken: data.refresh_token,
    accessToken: data.access_token,
    expiresAt: data.expires_at,
  });

  return user;
};

export const getUserActivities = async (
  userId: number,
  pageNumber = 1
): Promise<DetailedActivity[]> => {
  const user = await findStravaUser(userId);

  if (!user) {
    throw new Error("Could not find user");
  }

  const activities = await getActivities({
    expiresAt: user.expiresAt,
    refreshToken: user.refreshToken,
    accessToken: user.accessToken,
    pageNumber,
  });

  return activities;
};

export const getAllActivityPages = async (
  athleteId: number,
  pageNumber: number,
  activities: DetailedActivity[]
): Promise<DetailedActivity[]> => {
  const page = await getUserActivities(athleteId, pageNumber);
  if (page.length === 0) {
    return activities;
  }
  return getAllActivityPages(athleteId, pageNumber + 1, [
    ...activities,
    ...page,
  ]);
};

export const getAuthenticationURL = async () => {
  // Just hardcode for now
  return `https://www.strava.com/oauth/authorize?
    client_id=70056
    &redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fstrava%2Fcallback
    &response_type=code
    &scope=read%2Cread_all%2Cprofile%3Aread_all%2Cprofile%3Awrite%2Cactivity%3Aread%2Cactivity%3Aread_all%2Cactivity%3Awrite`;
};
