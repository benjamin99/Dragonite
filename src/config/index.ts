import * as _ from 'lodash';

const env = process.env.NODE_ENV || 'development';

export const config = {
    version: process.env.VERSION || 1,
    port: process.env.SERVER_PORT || 80,
    host: process.env.SERVER_HOST || '0.0.0.0',
    mongodb: process.env.MONGODB,
    log: true
};

try {
    _.merge(config, require(`./${env}`));
} catch (error) {
    console.log(`Cannot load config from: ${env}`);
}
