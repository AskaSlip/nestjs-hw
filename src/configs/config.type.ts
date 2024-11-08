export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  aws: AwsConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};
export type DatabaseConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  name: string;
};
export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};
export type AwsConfig = {
  accessKey: string;
  secretKey: string;
  region: string;
  bucketName: string;
  ACL: string;
  endpoint: string;
};
export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
