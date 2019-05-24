import { createConnection } from 'mysql';
import { config } from './config';

const connection = createConnection(config);

connection.connect();