import axios from "axios";

import { logger } from "../logger";
import config from "../config";
import { updateRefreshToken } from "../repositories/strava_users";
import { unixTime } from "../utils/datetime";

const stravaApiBaseUrl = "https://www.strava.com/api/v3";

type StravaAthlete = {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  weight: number;
  profile_medium: string;
  profile: string;
  friend: null;
  follower: null;
};

interface StravaActivity {
  id: number;
}

interface StravaAuthResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: StravaAthlete;
}

type StravaTokenData = {
  expiresAt: number;
  refreshToken: string;
  accessToken: string;
};

interface GetNewRefreshTokenResponse {
  token_type: string;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
}

export const getNewRefreshToken = async (
  refreshToken: string
): Promise<GetNewRefreshTokenResponse> => {
  try {
    const { data } = await axios.post<GetNewRefreshTokenResponse>(
      `${stravaApiBaseUrl}/oauth/token`,
      {
        client_id: config.strava.clientId,
        client_secret: config.strava.clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }
    );
    logger.info(data, "Token Refreshed");
    return data;
  } catch (err) {
    logger.error({ err }, "Error refreshing token");
    throw err;
  }
};

const refreshTokenAsNeeded = <Data extends StravaTokenData, Result>(
  fn: (data: Data) => Promise<Result>
) => {
  return async (data: Data): Promise<Result> => {
    const { refreshToken, accessToken, expiresAt } = data;

    if (data.expiresAt < unixTime()) {
      logger.info("Token expired, fetching new one");
      const {
        refresh_token: refreshToken,
        access_token: accessToken,
        expires_at: expiresAt,
      } = await getNewRefreshToken(data.refreshToken);

      await updateRefreshToken(data.refreshToken, {
        refreshToken,
        accessToken,
        expiresAt,
      });
      logger.info("Token saved");
    }
    return fn({
      ...data,
      refreshToken,
      accessToken,
      expiresAt,
    });
  };
};

export const getAuthorizedAthlete = async (
  code: string
): Promise<StravaAuthResponse> => {
  const { data } = await axios.post<StravaAuthResponse>(
    `${stravaApiBaseUrl}/oauth/token`,
    {
      client_id: config.strava.clientId,
      client_secret: config.strava.clientSecret,
      grant_type: "authorization_code",
      code,
    }
  );

  return data;
};

// $ http GET "https://www.strava.com/api/v3/?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]"

export const getActivities = refreshTokenAsNeeded<
  StravaTokenData,
  StravaActivity[]
>(async ({ expiresAt, refreshToken, accessToken }) => {
  const { data } = await axios.get<StravaActivity[]>(
    `${stravaApiBaseUrl}/athlete/activities`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
});
