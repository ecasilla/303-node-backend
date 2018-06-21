import * as Knex from 'knex';

import { dbconstants } from '../../config/constants';

const { TODOS_TABLE } = dbconstants;

export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  due?: Date;
  date_completed?: Date;
  author: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface ICRUD<T> {
  create(entity: T[], knex: Knex, transaction?: Knex.Transaction): Promise<T[]>;
  destroy(entity: T, knex: Knex, transaction?: Knex.Transaction): Promise<T>;
  find(entity: T, knex: Knex, transaction?: Knex.Transaction): Promise<T[]>;
  findAll(entity: T, knex: Knex, transaction?: Knex.Transaction): Promise<T[]>;
  update(entity: T, knex: Knex, transaction?: Knex.Transaction): Promise<T[]>;
}

class Todos implements ICRUD<ITodo> {

  public create(todo: ITodo[], knex: Knex, transaction?: Knex.Transaction): Promise<ITodo[]> {
    return knex(TODOS_TABLE)
    .transacting(transaction)
    .insert(todo)
    .returning('*');
  }
  public find(todo: ITodo, knex: Knex, transaction?: Knex.Transaction): Promise<ITodo[]> {
    return knex.transacting(transaction)
    .select()
    .first()
    .from(TODOS_TABLE)
    .where('id', todo.id);
  }
  public findAll(knex: Knex, transaction?: Knex.Transaction): Promise<ITodo[]> {
    return knex.transacting(transaction)
    .select()
    .from(TODOS_TABLE);
  }
  public update(todo, knex: Knex, transaction?: Knex.Transaction): Promise<ITodo[]> {
    return knex(TODOS_TABLE).transacting(transaction)
    .where('id', todo.id)
    .update(todo)
    .returning('*');
  }
  public destroy(todo, knex: Knex, transaction?: Knex.Transaction): Promise<ITodo> {
    return knex.transacting(transaction)
    .del()
    .from(TODOS_TABLE)
    .where('id', todo.id)
    .returning('*');
  }
}

export const todos = new Todos();
