import * as express from 'express';
import { isEmpty } from 'lodash';

import db from '../../db';

import { todos as Todos, ITodo } from './todo.model';

function handleError(res: express.Response, statusCode = 500, err: Error) {
  return res.status(statusCode).json(err);
}

function respondWithResult(res: express.Response, statusCode = 200, entity) {
  if (entity) {
    return res.status(statusCode).json(entity);
  }
  return res.status(statusCode).json([]);
}

export async function index(_, res: express.Response) {
  try {
    const todos = await db.transaction(trx => Todos.findAll(db, trx));
    respondWithResult(res, 200, todos);
  } catch (error) {
    handleError(res, 500, error);
  }
}

export async function show(req: express.Request, res: express.Response) {
  try {
    const todo: ITodo[] = await db.transaction(trx => Todos.find(req.params, db, trx));
    respondWithResult(res, 200, todo);
  } catch (error) {
    handleError(res, 500, error);
  }
}

export async function create(req: express.Request, res: express.Response) {
  try {
    const todo: ITodo[] = await db.transaction(trx => Todos.create(req.body, db, trx));
    respondWithResult(res, 201, todo);
  } catch (error) {
    handleError(res, 500, error);
  }
}

export async function update(req: express.Request, res: express.Response) {
  const todo = Object.assign<ITodo, { id: string }>(req.body, req.params);
  try {
    const updatedTodo: ITodo[] = await db.transaction(trx =>
      Todos.update(todo, db, trx),
    );
    respondWithResult(res, 200, updatedTodo);
  } catch (error) {
    handleError(res, 500, error);
  }
}

export async function destroy(req: express.Request, res: express.Response) {
  try {
    let todo;
    await db.transaction(async (trx) => {
      todo = await Todos.find(req.params, db, trx);
      if (isEmpty(todo)) {
        return;
      }
      return Todos.destroy(todo, db, trx);
    });
    respondWithResult(res, 204, todo);
  } catch (error) {
    handleError(res, 500, error);
  }
}
