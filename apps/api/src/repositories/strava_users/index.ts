export * from "./types";
import { sql } from "slonik";
import { pool } from "../../slonik";
import { TABLE_NAMES } from "../../config";
import { StravaUser, PersistedStravaUser } from "./types";

export const saveStravaUser = async ({
  stravaId,
  username,
  firstName,
  lastName,
  refreshToken,
  accessToken,
  expiresAt,
}: StravaUser): Promise<{ stravaUserId: number }> => {
  const {
    rows: [{ strava_id: stravaUserId }],
  } = await pool.query<{ strava_id: number }>(sql`
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
      strava_id
    )
  `);

  return {
    stravaUserId,
  };
};

export const findStravaUser = async (
  stravaUserId: number
): Promise<PersistedStravaUser | undefined> => {
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
