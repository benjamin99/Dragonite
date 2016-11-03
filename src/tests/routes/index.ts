import { describe, it } from '../utils/mocha';
import { should as Should } from 'chai';

const should = Should(); // tslint:ignore-line

describe('routes', function() {
  it('health check', function*() {
    const response = yield this.request.get('/');
    console.log(response.text);
    response.text.should.equals('ok');
  });
});
