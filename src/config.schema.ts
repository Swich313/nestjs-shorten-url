import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(8000),
  // MONGODB_SUPER_USER_NAME:  Joi.string().required(),
  // MONGODB_SUPER_USER_PASSWORD: Joi.string().required(),
  MONGODB_USER_NAME:  Joi.string().required(),
  MONGODB_USER_PASSWORD: Joi.string().required(),
  MONGODB_CLUSTER: Joi.string().required(),
  MONGODB_COLLECTION: Joi.string().required(),
  URL_EXPIRE_IN: Joi.number().default(60000),
  BASE_URL: Joi.string().uri()
});
