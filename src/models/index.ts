import { createConnection } from 'mysql';
import { config } from './config';
import { NotFoundError } from './error';

const connection = createConnection(config);

export const getPoint = (tname) => new Promise<any>((resolve, reject) => {
  connection.query(`SELECT ticket, piece from users where tname="${tname}"`, (err, low) => {
    if (err) {
      reject(err);
      return;
    }
    if (low.length == 0) {
      reject(new NotFoundError(`Twitch name "${tname}" not found from users database`));
      return;
    }
    
    const { ticket, piece } = low[0];
    resolve({ ticket, piece });
  });
});