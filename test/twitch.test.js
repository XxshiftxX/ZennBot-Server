const assert = require('assert');

const bot = require('../routes/twitch');
const { sequelize, User } = require('../models');
sequelize.sync();
User.destroy({
    where: {}
});

describe('=젠 조각', () => {
    before(() => {
        User.create({
            id: 1,
            name: "시프트P",
            tname: "qjfrntop",
            tdisplay: "시프트",
            ticket: 55,
            piece: 444
        });
    });


    it('Normal Case', async () => {
        var res = await bot.GetPiece({ username: 'qjfrntop' });

        assert.equal(res.result, 'ok');
        assert.equal(res.ticket, 55);
        assert.equal(res.piece, 444);
        assert.equal(res.message, "시프트님은 현재 55개의 티켓과 444개의 조각을 가지고 있어요!");
    });

    it('No User in DB', async () => {
        var res = await bot.GetPiece({ username: 'taemino0o' });

        assert.equal(res.result, 'fail');
        assert.equal(res.chat, "시청자 DB에 이름이 존재하지 않아요!");
    });
});

describe('=젠 신청', () => {
    beforeEach(() => {
        bot.SongList.length = 0;
    });

    it('Normal Case - Ticket', () => {
        var res = bot.RequestSong('qjfrntop')
    });
});