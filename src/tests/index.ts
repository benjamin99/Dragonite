import { request } from './utils/request';
import * as app from '../';
import { describe } from './utils/mocha';


describe('dragnote', function() {
  before(function*() {
    this.request = request(app);
  });

  require('./models');
  require('./routes');
});
