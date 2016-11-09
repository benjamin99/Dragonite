import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as joi from 'joi';
import { render } from '../common/render';
import { MemberDocument, Member } from '../models/Members';

const Joi: any = Promise.promisifyAll(require('joi'));

const memberCreateSchema = joi.object().keys({
  username: joi.string(),
  password: joi.string(),
  scopes: joi.string()
}).requiredKeys('username', 'password');

const memberUpdateSchema = joi.object().keys({
  scopes: joi.string()
});

function formatMember(member: MemberDocument) {
  return {
    id: member._id,
    username: member.username,
    scopes: member.scopes,
    created: member.created,
    updated: member.updated,
    deleted: member.deleted
  };
}

function updateScopesProperties(form) {
  if (form.scopes) {
    form.scopes = form.scopes.split(' ');
  }
}

export function *list(): any {
  // TODO ...
};

export function *show(): any {
  return render(this, 200, formatMember(this.state.member));
}

export function *create(): any {
  const form = yield Joi.validateAsync(this.request.body, memberCreateSchema);
  updateScopesProperties(form);

  console.log(form);
  const member = new Member(form);
  yield member.save();

  return render(this, 201, formatMember(member));
};

export function *update(): any {
  const member: MemberDocument = this.state.member;
  const form = yield Joi.validateAsync(this.request.body, memberUpdateSchema);
  updateScopesProperties(form);

  _.assign(member, form);
  yield member.save();

  return render(this, 200, formatMember(member));
};
