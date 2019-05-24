import { bot } from './twitch';
import { getPoint as getPointFromModel } from '../models';
import { Chat } from '../types/twitch';

export const commands = {
  조각: getPoint,
};

const OnError = (name, messages) => {
  if (name in messages)
      bot.say(messages[name]);
}

async function getPoint(_args: Array<string>, chat: Chat) {
  try {
    const { ticket, piece } = await getPointFromModel(chat.username);
    bot.say(`${chat.display_name}님은 현재 ${ticket}개의 티켓과 ${piece}개의 조각을 가지고 있어요!`);
  }
  catch ({ name }) {
    var messages = {
      'Not Found': `${chat.display_name}님의 데이터가 존재하지 않아요!`
    };
    OnError(name, messages);
  }
}