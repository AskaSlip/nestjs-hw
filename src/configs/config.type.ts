export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  aws: AwsConfig;
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
};
