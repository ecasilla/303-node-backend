import * as bluebird from 'bluebird';
import * as faker from 'faker';

import db from '../db';

import { dbconstants } from './constants';

const { TODOS_TABLE } = dbconstants;

export function batchInsert(count) {
  const range = Array(count).fill(0);
  const author = faker.name.findName();
  return db.transaction((trx) => {
    return bluebird.map(range, (_) => {
      const title = faker.lorem.sentence();
      const description = faker.lorem.sentence();
      const due = faker.date.future();
      const todo = {
        author,
        title,
        description,
        due,
      };
      return db(TODOS_TABLE).transacting(trx).insert(todo);
    });
  });
}

export async function seed(count = 100) {
  try {
    await batchInsert(count);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
