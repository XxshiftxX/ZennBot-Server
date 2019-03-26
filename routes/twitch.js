const TwitchBot = require('twitch-bot');
const { User } = require('../models');

const Bot = new TwitchBot({
    username: 'shiftbot1124',
    oauth: 'oauth:aj8ah4035083xw27tg3d1cuon5yjnj',
    channels: ['producerzenn']
});

const commands = {
    조각: GetPiece
}

Bot.on('message', async (chat) => {
    if(chat.message == '테스트1124' && chat.username) {
        const { message } = await GetPiece(chat);
        console.log(message);
        Bot.say(message);
    }
});

async function GetPiece(chat) {
    const { username } = chat;

    var user = await User.findOne({
        where: { tname: username }
    })

    return {
        result: "ok",
        ticket: user.ticket,
        piece: user.piece,
        message: `${user.tdisplay}님은 현재 ${user.ticket}개의 티켓과 ${user.piece}개의 조각을 가지고 있어요!`
    };
}

module.exports = {
    Bot: Bot,
    GetPiece: GetPiece
};