import { createConnection } from 'mysql';
import { config } from './config';

const connection = createConnection(config);

export const getPoint = (tname) => new Promise((resolve, reject) => {
  connection.query(`SELECT ticket, piece from users where tname="${tname}"`, (err, low) => {
    if (err || low.length == 0) {
      reject(err);
      return;
    }
    
    const { ticket, piece } = low[0];
    resolve({ ticket, piece });
  });
});