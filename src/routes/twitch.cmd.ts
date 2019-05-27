import { bot } from './twitch';
import { getPoint, updatePoint, getTnameByTdisplay } from '../models';
import { Chat } from '../types/twitch';

export const commands = {
  조각: getPointCommand,
  지급: payPointCommand,
};

const OnError = (name, messages) => {
  if (name in messages)
      bot.say(messages[name]);
}

async function getPointCommand(_args: Array<string>, chat: Chat) {
  try {
    const { ticket, piece } = await getPoint(chat.username);
    bot.say(`${chat.display_name}님은 현재 ${ticket}개의 티켓과 ${piece}개의 조각을 가지고 있어요!`);
  }
  catch ({ name }) {
    var messages = {
      'Not Found': `${chat.display_name}님의 데이터가 존재하지 않아요!`
    };
    OnError(name, messages);
  }
}

async function payPointCommand(args: Array<string>, _chat: Chat) {
  const [lawType, tdisplay, lawAmount] = args;
  const amount = lawAmount ? +lawAmount : 1;
  const type = lawType == '조각' ? 'piece' : 'ticket';
  try {
    const tname = await getTnameByTdisplay(tdisplay);
    await updatePoint(tname, type, amount);
    bot.say(`${tdisplay}님께 ${lawType} ${amount}개를 지급했어요!`);
  } catch ({ name }) {
    var messages = {
      'Not Found': `${tdisplay}님의 데이터가 존재하지 않아요!`,
    };
    OnError(name, messages);
  }
}