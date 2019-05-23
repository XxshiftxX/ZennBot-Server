import * as TwitchBot from 'twitch-bot';
import { Chat } from '../types/twitch';

export const bot = new TwitchBot({
  username: 'shiftbot1124',
  oauth: 'oauth:aj8ah4035083xw27tg3d1cuon5yjnj',
  channels: ['qjfrntop']
});

const commands = {

};

const onMessageEvent = (chat: Chat) => {
  const { message } = chat;
  if (!isVaildCommand(message))
    return;
  
  const args = message.split(' ').slice(1);
  commands[args[0]](args.slice(1), chat);
};
bot.on('message', onMessageEvent);

const onErrorEvent = (err) => {
  console.error(`Bot error: ${err}`);
};
bot.on('error', onErrorEvent);

function isVaildCommand(message: string): boolean {
  if (!message.startsWith('=젠 '))
    return false;

  const args = message.split(' ').slice(1);
  if (!(args[0] in commands))
    return false;

  return true;
}