import * as superagent from 'supertest';

export function request(app: any): superagent.SuperTest<superagent.Test> {
  return superagent(app.listen());
};
