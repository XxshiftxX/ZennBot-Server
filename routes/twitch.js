const TwitchBot = require('twitch-bot');
const { User } = require('../models');

const Bot = new TwitchBot({
    username: 'shiftbot1124',
    oauth: 'oauth:aj8ah4035083xw27tg3d1cuon5yjnj',
    channels: ['producerzenn']
});

const SongList = [];

const Commands = {
    "조각": GetPiece,
    "신청": RequestSong,
    "지급": PayPiece,
    "테스트": async (a, b) => ({ message: SongList.map(x => x.name).join(', ') }),
}

Bot.on('message', async (chat) => {
    console.log(chat.message);
    if (!chat.message.startsWith('=젠 ')) {
        return;
    }
    
    const args = chat.message.substring(3).split(' ');
    const cmd = Commands[args[0]]
    
    if (cmd == undefined) {
        Bot.say('존재하지 않는 명령어에요!');
        return;
    }

    var res = await cmd(chat, args.slice(1));

    if ( res.message != null && res.message != undefined ) {
        Bot.say(res.message);
    }
});

async function GetPiece(chat) {
    const { username } = chat;

    var user = await User.findOne({
        where: { tname: username }
    });

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

async function RequestSong(chat, arg) {
    const { username } = chat

    const user = await User.findOne({
        where: { tname: username }
    });

    let type;
    let song = arg.join(' ');

    if (user.ticket > 0) {
        User.update(
            { ticket: user.ticket - 1 },
            { where: { tname: username }}
        );

        SongList.push({
            name: arg.join(' '),
            requester: username,
            type: 'ticket',
        });

        type = 'ticket';
        message = `티켓 1장을 소모하여 곡 "${song}"을 신청했어요!`;
    }
    else if (user.piece > 2) {
        User.update(
            { piece: user.piece - 3 },
            { where: { tname: username }}
        );

        SongList.push({
            name: arg.join(' '),
            requester: username,
            type: 'piece',
        });

        type = 'piece';
        message = `조각 3개를 소모하여 곡 "${song}"을 신청했어요!`;
    }
    else {
        return {
            result: 'fail',
            message: '조각이 없어요! =젠 조각 명령어로 보유 조각을 확인해주세요!',
        }
    }

    return {
        result: 'ok',
        type: type,
        song: song,
        message: message,
    };
}

async function PayPiece(chat, arg) {
    const type = arg[0];
    const receiver = arg[1];
    const amount = arg[2] ? Number(arg[2]) : 1;

    const { username } = chat;
    
    const user = await User.findOne({ where: { tdisplay: receiver }});

    if (!user) {
        return {
            result: 'fail',
            message: `DB에 ${receiver}님의 정보가 없어요!`,
        };
    }

    let setter;
    if (type == '곡') {
        setter = { ticket: user.ticket + amount }
    }
    else if (type == '조각') {
            setter = { piece: user.piece + amount }
    }
    else {
        return {
            result: 'fail',
            message: `"${type}"은 알 수 없는 명령이에요. =젠 지급 (조각 / 곡)의 형식으로 입력해주세요!`,
        };
    }
    
    User.update(setter, { where: { tdisplay: receiver } });

    return {
        result: 'ok',
        message: `${receiver}님에게 ${type} ${amount}개를 지급했어요!`,
    };
}

module.exports = {
    Bot: Bot,
    SongList: SongList,
    Command: {
        GetPiece,
        RequestSong,
        PayPiece,
    },
};