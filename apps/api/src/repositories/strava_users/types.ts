export interface StravaUser {
  stravaId: number;
  username: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
}

export interface PersistedStravaUser extends StravaUser {
  id: number;
}
