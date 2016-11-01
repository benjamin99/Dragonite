import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as joi from 'joi';
import { Member, MemberDocument } from '../models/Members';
import { Reply, ReplyDocument } from '../models/Replies';
import { Event, EventDocument } from '../models/Events';

const listSchema = {
  all: joi.boolean().default(false)
};

const joiValidate: (value: any, schema: joi.Schema) => void = Promise.promisify(joi.validate);

function normalizedReplyInfo(reaction: ReplyDocument) {
  return {
    id: reaction._id,
    content: reaction.content,
    memberId: reaction.memberId,
    created: reaction.created.getTime() / 1000,
    deleted: reaction.deleted.getTime() / 1000
  };
}

export function *list(): any {
  // TODO ...
  return null;
};

export function *create(): any {
  // TODO ...
  return null;
};

export function *destroy(): any {
  // TODO:
  return null;
};
