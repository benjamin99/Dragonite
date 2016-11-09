import * as validator from 'validator';
import { render } from '../common/render';
import { Member } from '../models/Members';
import { ERROR_CODE } from '../common/error';

export function getMemberById(options?: any) {
  return function*(next) {
    const memberId = this.params.id;
    let member;

    if (validator.isInt(memberId, {min: 0})) {
      member = this.state.member = yield Member.findOne({ _id: +memberId });
    }

    if (!member) {
      return render(this, 404, {
        error: ERROR_CODE.memberNotFound,
        messsage: 'Cannot found the member with the specified id'
      });
    }

    yield next;
  };
};
