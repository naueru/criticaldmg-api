import { Model, Sequelize } from "sequelize";
import { UserModel } from "../models/users.model";
import { SessionModel } from "../models/sessions.model";
import { SessionLogModel } from "../models/sessionLogs.model";
import { CampaignModel } from "../models/campaigns.model";
import { CharacterModel } from "../models/characters.model";
// Don't remove this comment. It's needed to format import lines nicely.

/**
 * Model names available on sequelize
 */
export enum ModelName {
  USER = "user",
  SESSION = "session",
  SESSION_LOG = "session_log",
  SESSION_SUBSCRIPTION = "session_subscription",
  CAMPAIGN = "campaign",
  CHARACTER = "character",
  // Don't remove this comment. It's needed to add model names nicely.
}

/**
 * Model available on sequelize.models
 * Add here the new models for better typing
 */
export type Models = {
  [ModelName.USER]: ModelCtor<UserModel>;
  [ModelName.SESSION]: ModelCtor<SessionModel>;
  [ModelName.SESSION_LOG]: ModelCtor<SessionLogModel>;
  [ModelName.CAMPAIGN]: ModelCtor<CampaignModel>;
  [ModelName.CHARACTER]: ModelCtor<CharacterModel>;
  // Don't remove this comment. It's needed to add models nicely.
};

/**
 * Custom Model to add static method associate used to add references to other models
 */
export abstract class CriticalDMGModel<T = any, T2 = any> extends Model<T, T2> {
  static associate?: (models: Models) => void;
}

/**
 * Custom Sequelize for sequelize intance to have our Model implementation
 */
export class CriticalDMGSequelize extends Sequelize {
  /**
   * Dictionary of all models linked with this instance.
   */
  readonly models!: Models;
}

export type ModelType = typeof CriticalDMGModel;

export type ModelCtor<M extends CriticalDMGModel> = { new (): M } & ModelType;
