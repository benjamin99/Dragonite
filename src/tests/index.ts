import * as app from '../';
import { request } from './utils/request';
import { describe } from './utils/mocha';


describe('dragnote', function() {
  before(function*() {
    this.request = request(app);
  });

  it('test');

  require('./models');
  require('./routes');
});
