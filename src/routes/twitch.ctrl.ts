import { Chat } from '../types/twitch';
import { commands } from './twitch.cmd'

export const onMessageEvent = (chat: Chat) => {
  const { message } = chat;
  if (!isVaildCommand(message))
    return;
  
  const args = message.split(' ').slice(1);
  commands[args[0]](args.slice(1), chat);
};

export const onErrorEvent = (err) => {
  console.error(`Bot error: ${err}`);
};

const isVaildCommand = (message: string): boolean => {
  if (!message.startsWith('=젠 '))
    return false;

  const args = message.split(' ').slice(1);
  if (!(args[0] in commands))
    return false;

  return true;
}