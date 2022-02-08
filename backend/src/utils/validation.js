/**
 * 
 */

const Joi = require("@hapi/joi");

module.exports = {
  addUserValidation: (data) => {
    const schema = Joi.object({
      domain: Joi.string().required(),
      email: Joi.string().email().required(),
      birth: Joi.date().required(),
    }).options({ abortEarly: false });
    const { error, value } = schema.validate(data);
    return { error, value };
  },
  addTweetValidation: (data) => {
    const schema = Joi.object({
      uid: Joi.string().required(),
      text: Joi.string().required(),
      media: Joi.object().optional(),
      resource_type: Joi.string().optional(),
    }).options({ abortEarly: false });
    const { error, value } = schema.validate(data);
    return { error, value };
  },
  addRetweetValidation: (data) => {
    const schema = Joi.object({
      uid: Joi.string().required(),
      tweetId: Joi.string().required(),
    }).options({ abortEarly: false });
    const { error, value } = schema.validate(data);
    return { error, value };
  },
  bookmarkValidation: (data) => {
    const schema = Joi.object({
      uid: Joi.string().required(),
      tweetId: Joi.string().required(),
    }).options({ abortEarly: false });
    const { error, value } = schema.validate(data);
    return { error, value };
  },
};
