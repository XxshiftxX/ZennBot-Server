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

export const getTnameByTdisplay = (tdisplay: string) => new Promise<string>((resolve, reject) => {
  connection.query(`SELECT tname from users where tdisplay="${tdisplay}"`, (err, low) => {
    if (err) {
      reject(err);
      return;
    }
    if (low.length == 0) {
      reject(new NotFoundError(`Twitch display name "${tdisplay}" not found from users database`));
      return;
    }

    resolve(low[0].tname);
  });
});

export const updatePoint = (tname: string, type: string, amount: Number) => new Promise(async (resolve, reject) => {
  const point = await getPoint(tname);
  if (amount == undefined)
    amount = 0;
  connection.query(`UPDATE users SET ${type}=${point[type]+amount} WHERE tname="${tname}"`, (err) => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  });
});