const TwitchBot = require('twitch-bot');
const { User } = require('../models');

const Bot = new TwitchBot({
    username: 'shiftbot1124',
    oauth: 'oauth:aj8ah4035083xw27tg3d1cuon5yjnj',
    channels: ['producerzenn']
});

Bot.on('message', (chat) => {

});

module.exports = {
    //GetPiece: GetPiece
};