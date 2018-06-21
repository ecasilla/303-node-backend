import * as Joi from 'joi';

interface IValidator {
  options: Joi.ValidationOptions;
  validator: {
    params?: object,
    headers?: object,
    query?: object,
    body?: object,
  };
}

export const index: IValidator = {
  options: {},
  validator: {
    query: Joi.object().keys({
      offset: Joi.number(),
      page: Joi.number().min(1),
    }),
  },
};

export const show: IValidator = {
  options: { allowUnknown: false },
  validator: {
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  },
};

const baseBody = Joi.object().keys({
  author: Joi.string(),
  completed: Joi.boolean(),
  date_completed: Joi.date(),
  description: Joi.string().required(),
  due: Joi.date(),
  title: Joi.string().required(),
});

export const create: IValidator = {
  options: {},
  validator: {
    body: baseBody,
  },
};

export const update: IValidator = {
  options: {},
  validator: {
    body: baseBody,
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  },
};

export const destory: IValidator = {
  options: {},
  validator: {
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  },
};
