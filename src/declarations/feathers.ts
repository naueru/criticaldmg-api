import { CriticalDMGSequelize } from "./sequelize";
import { ServiceAddons } from "@feathersjs/feathers";
import { Application as ExpressFeathers } from "@feathersjs/express";
import { Users } from "../services/users/users.class";
import { AuthenticationService } from "@feathersjs/authentication/lib";
import { Rooms } from "../services/rooms/rooms.class";

export enum SettingName {
  SEQUELIZE = "sequelizeClient",
  DATABASE_CONFIGURATION = "DATABASE_CONFIGURATION",
  SEQUELIZE_SYNC = "sequelizeSync",
  PAGINATE = "paginate",
  PUBLIC_PATH = "public",
  PORT = "port",
  HOST = "host",
}

export enum ServiceName {
  USERS = "users",
  AUTHENTICATION = "authentication",
  ROOMS = "rooms",
}

export interface DatabaseConfiguration {
  NAME: string;
  USERNAME: string;
  PASSWORD: string;
  HOST: string;
  PORT: number;
  DIALECT: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
}

export interface SettingTypes {
  /**
   * Sequelize instance wrapper with specific Critical DMG logic
   */
  [SettingName.SEQUELIZE]: CriticalDMGSequelize;

  /**
   * Postgres configuration data
   */
  [SettingName.DATABASE_CONFIGURATION]: DatabaseConfiguration;

  /**
   * Sequelize.sync promise result
   */
  [SettingName.SEQUELIZE_SYNC]: Promise<CriticalDMGSequelize>;

  /**
   * Sequelize.sync promise result
   */
  [SettingName.PAGINATE]: Pagination;

  /**
   * Path where the public assets will reside
   */
  [SettingName.PUBLIC_PATH]: string;

  /**
   * Application port where it'll listen
   */
  [SettingName.PORT]: string;

  /**
   * Host
   */
  [SettingName.HOST]: string;
}

export interface ServiceTypes {
  [ServiceName.USERS]: Users & ServiceAddons<any>;

  [ServiceName.ROOMS]: Rooms & ServiceAddons<any>;

  [ServiceName.AUTHENTICATION]: AuthenticationService & ServiceAddons<any>;
}

export type Pagination = void | { default: number; max: number };

interface CriticalDMGApplication {
  get<T extends keyof SettingTypes>(name: T): SettingTypes[T];

  set<T extends keyof SettingTypes>(name: T, value: SettingTypes[T]): this;
}

// The application instance type that will be used everywhere else
export type Application = Omit<ExpressFeathers<ServiceTypes>, "get" | "set"> &
  CriticalDMGApplication;
