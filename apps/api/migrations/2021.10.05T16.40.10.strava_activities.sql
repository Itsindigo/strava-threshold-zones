CREATE TABLE strava_activities (
  id SERIAL PRIMARY KEY,
  strava_id BIGINT NOT NULL,
  strava_user_id BIGINT NOT NULL,
  activity_name varchar(255),
  distance numeric(8, 1),
  moving_time_seconds integer,
  sport_type varchar(255),
  workout_type integer,
  start_date timestamp,
  start_date_local timestamp,
  timezone varchar(255),
  average_speed_mps numeric(8, 3),
  average_heart_rate numeric(8, 3),
  max_heart_rate numeric(8, 3),
  suffer_score integer,
  CONSTRAINT strava_activity_id_unique UNIQUE (strava_id),
  CONSTRAINT events_category_fk FOREIGN KEY (strava_user_id) REFERENCES strava_users (strava_id) ON DELETE CASCADE
);