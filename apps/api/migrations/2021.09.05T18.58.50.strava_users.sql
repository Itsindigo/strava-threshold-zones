CREATE TABLE strava_users (
  id SERIAL PRIMARY KEY,
  strava_id BIGINT NOT NULL,
  username varchar(50) NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  refresh_token varchar(255) NOT NULL,
  access_token varchar(255) NOT NULL,
  expires_at integer NOT NULL,
  CONSTRAINT strava_user_id_unique UNIQUE (strava_id)
);