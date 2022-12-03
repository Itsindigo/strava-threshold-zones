import axios from "axios";

import { logger } from "../../logger";
import config from "../../config";
import { updateRefreshToken } from "../../repositories/strava_users";
import { unixTime } from "../../utils/datetime";
import {
  GetNewRefreshTokenResponse,
  StravaTokenData,
  StravaAuthResponse,
} from "./types";
import { stravaApiBaseUrl } from "./constants";
import { DetailedActivity } from "strava-types";

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
  StravaTokenData & { pageNumber: number; pageSize?: number },
  DetailedActivity[]
>(async ({ accessToken, pageNumber, pageSize = 100 }) => {
  const searchParams = new URLSearchParams({
    per_page: `${pageSize}`,
    page: `${pageNumber}`,
  });
  const { data } = await axios.get<DetailedActivity[]>(
    `${stravaApiBaseUrl}/athlete/activities?${searchParams}`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
});
