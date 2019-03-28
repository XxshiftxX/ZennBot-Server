const TwitchBot = require('twitch-bot');
const { User } = require('../models');

const Bot = new TwitchBot({
    username: 'shiftbot1124',
    oauth: 'oauth:aj8ah4035083xw27tg3d1cuon5yjnj',
    channels: ['producerzenn']
});

const SongList = [];

Bot.on('message', async (chat) => {
    if(!chat.message.startsWith('=젠 ')) {
        return;
    }
    
    const args = chat.message.substring(3).split(' ');
    
    ExecuteCommand(chat, args)
    .then((res) => {
        if(res.message != null) {
            Bot.say(res.message);
        }
    })
    .catch((err) => {
        Bot.say('명령어가 존재하지 않아요!');
    });
});

function ExecuteCommand(chat, cmd) {
    const commands = {
        "조각": GetPiece
    }

    return new Promise( async (resolve, reject) => {
        const command = commands[cmd[0]];

        if (command == undefined) {
            reject(new Error(`There's no command named ${cmd[0]}`));
        }

        const args = cmd.slice(1);
        const res = await command(chat, args);
        console.log(args);
        resolve(res);
    });
}

async function GetPiece(chat) {
    const { username } = chat;

    var user = await User.findOne({
        where: { tname: username }
    });

    console.log(`${username} req >> ${user}`);

    if (user == null) {
        return {
            result: 'fail',
            message: `DB에 ${chat.display_name}님의 정보가 없어요!`
        }
    }

    return {
        result: "ok",
        ticket: user.ticket,
        piece: user.piece,
        message: `${user.tdisplay}님은 현재 ${user.ticket}개의 티켓과 ${user.piece}개의 조각을 가지고 있어요!`
    };
}

async function RequestSong(chat) {
    
}

module.exports = {
    Bot: Bot,
    SongList: SongList,
    Command: {
        GetPiece: GetPiece,
        RequestSong: RequestSong
    }
};