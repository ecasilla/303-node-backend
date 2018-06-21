import { celebrate } from 'celebrate';
import * as express from 'express';

import * as controller from './todo.ctrl';
import {
  create as createValidator,
  destory as destoryValidator,
  index as indexValidator,
  show as showValidator,
  update as updateValidator,
 } from './todo.validation';

const router: express.Router = express.Router();

const indexVal = celebrate(indexValidator.validator, indexValidator.options);
const showVal = celebrate(showValidator.validator, indexValidator.options);
const createVal = celebrate(createValidator.validator, indexValidator.options);
const updateVal = celebrate(updateValidator.validator, indexValidator.options);
const delVal = celebrate(destoryValidator.validator, indexValidator.options);

router.get('/', indexVal, controller.index);
router.get('/:id', showVal, controller.show);
router.post('/', createVal , controller.create);
router.put('/:id', updateVal, controller.update);
router.delete('/:id', delVal, controller.destroy);

export default router;
