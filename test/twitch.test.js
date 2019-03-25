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


    it('Normal Case', () => {
        var res = bot.GetPiece('qjfrntop');

        assert.equal(res.Result, 'ok');
        assert.equal(res.Ticket, 5);
        assert.equal(res.Piece, 12);
        assert.equal(res.Chat, "시프트님은 현재 5개의 티켓과 12개의 조각을 가지고 있어요!");
    });

    it('No User in DB', () => {
        var res = bot.GetPiece('taemino0o');

        assert.equal(res.Result, 'fail');
        assert.equal(res.Chat, "시청자 DB에 이름이 존재하지 않아요!");
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