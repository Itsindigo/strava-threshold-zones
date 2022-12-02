import { sql } from "slonik";
import { pool } from "../slonik";
import { TABLE_NAMES } from "../config";

interface StravaUser {
  stravaId: number;
  username: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
}

interface PersistedStravaUser extends StravaUser {
  id: number;
}

export const saveStravaUser = async ({
  stravaId,
  username,
  firstName,
  lastName,
  refreshToken,
  accessToken,
  expiresAt,
}: StravaUser) => {
  const {
    rows: [user],
  } = await pool.query<PersistedStravaUser>(sql`
    INSERT INTO ${sql.identifier([TABLE_NAMES.stravaUsers])} (
      strava_id,
      username,
      first_name,
      last_name,
      refresh_token,
      access_token,
      expires_at
    ) VALUES (
      ${sql.join(
        [
          stravaId,
          username,
          firstName,
          lastName,
          refreshToken,
          accessToken,
          expiresAt,
        ],
        sql`, `
      )}
    ) RETURNING (
      id,
      strava_id as stravaId,
      username,
      first_name as firstName,
      last_name as lastName,
      refresh_token as refreshToken,
      access_token as accessToken,
      expires_at as expiresAt
    )
  `);

  return user;
};

export const findStravaUser = async (stravaUserId: number) => {
  const {
    rows: [user],
  } = await pool.query<PersistedStravaUser>(sql`
    SELECT
      id,
      strava_id AS "stravaId",
      username,
      first_name AS "firstName",
      last_name AS "lastName",
      refresh_token AS "refreshToken",
      access_token AS "accessToken",
      expires_at AS "expiresAt"
    FROM ${sql.identifier([TABLE_NAMES.stravaUsers])}
    WHERE strava_id = ${stravaUserId}
  `);

  return user;
};

export const updateRefreshToken = (
  oldToken: string,
  {
    refreshToken,
    accessToken,
    expiresAt,
  }: {
    refreshToken: string;
    accessToken: string;
    expiresAt: number;
  }
) => {
  pool.query(sql`
    UPDATE ${sql.identifier([TABLE_NAMES.stravaUsers])}
    SET refresh_token = ${refreshToken}, access_token = ${accessToken}, expires_at = ${expiresAt}
    WHERE refresh_token = ${oldToken}
  `);
};
