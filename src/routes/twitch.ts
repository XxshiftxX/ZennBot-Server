import * as TwitchBot from 'twitch-bot';

const bot = new TwitchBot({
  username: 'shiftbot1124',
  oauth: 'oauth:aj8ah4035083xw27tg3d1cuon5yjnj',
  channels: ['producerzenn']
});

bot.on('message', (chat) => {

});

bot.on('error', (err) => {
  console.error(`Bot error: ${err}`);
});

module.exports = bot;