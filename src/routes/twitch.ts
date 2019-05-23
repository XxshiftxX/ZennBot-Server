import * as TwitchBot from 'twitch-bot';
import { onMessageEvent, onErrorEvent } from './twitch.ctrl';

export const bot = new TwitchBot({
  username: 'shiftbot1124',
  oauth: 'oauth:aj8ah4035083xw27tg3d1cuon5yjnj',
  channels: ['qjfrntop'],
});

bot.on('message', onMessageEvent);
bot.on('error', onErrorEvent);