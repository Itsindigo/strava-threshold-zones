import { SnakeCasedProperties } from "type-fest";
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
}: StravaUser): Promise<PersistedStravaUser> => {
  const {
    rows: [user],
  } = await pool.query<SnakeCasedProperties<PersistedStravaUser>>(sql`
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
      strava_id,
      username,
      first_name,
      last_name,
      refresh_token,
      access_token,
      expires_at
    )
  `);

  return {
    id: user.id,
    stravaId: user.strava_id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    refreshToken: user.refresh_token,
    accessToken: user.access_token,
    expiresAt: user.expires_at,
  };
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

export const updateRefreshToken = async (
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
