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
        var res = await bot.GetPiece({ username: 'taemino0o', display_name: '태민태민' });

        assert.equal(res.result, 'fail');
        assert.equal(res.message, `DB에 태민태민님의 정보가 없어요!`);
    });


    after(() => {
        User.destroy({});
    });
});

describe('=젠 신청', () => {
    beforeEach(() => {
        User.destroy({});
        User.create({
            id: 1,
            name: "시프트P",
            tname: "qjfrntop",
            tdisplay: "시프트",
            ticket: 55,
            piece: 444
        });
        bot.SongList.length = 0;
    });

    it('Normal Case - Ticket', async () => {
        var res = await bot.RequestSong({
            username: 'qjfrntop',
            args: 'test-song 1'
        });

        assert.equal(res.result, 'ok');
        assert.equal(res.message, '티켓 1장을 사용하여 곡 "test-song 1"을 신청했어요!');
        assert.equal(bot.SongList, [{ name: 'test-song 1', requester: 'qjfrntop', type: 'ticket' }]);
    });

    it('Normal Case - Piece', async () => {
        User.update({ ticket: 0 }, { where: { tname: 'qjfrntop' }});

        var res = await bot.RequestSong({
            username: 'qjfrntop',
            args: 'test-song 2'
        });

        assert.equal(res.result, 'ok');
        assert.equal(res.message, '조각 3개를 사용하여 곡 "test-song 2"을 신청했어요!');
        assert.equal(bot.SongList, [{ name: 'test-song 2', requester: 'qjfrntop', type: 'piece' }]);
    });

    it('No Points', async () => {
        User.update({ ticket: 0, piece: 0 }, { where: { tname: 'qjfrntop' }});

        var res = await bot.RequestSong({
            username: 'producerzenn'
        });

        assert.equal(res.result, 'fail');
        assert.equal(bot.length, 0);
        assert.equal(res.message, '조각이 충분하지 않아요! =젠 조각 명령어로 보유 조각을 확인해주세요!');
    });

    it('Cooltimes', async () => {
        bot.SongList.push({ name: 'cooltime', requester: 'qjfrntop', type: 'piece' })
        bot.SongList.push({ name: 'cooltime', requester: 'producerzenn', type: 'piece' })
        bot.SongList.push({ name: 'cooltime', requester: 'producerzenn', type: 'piece' })

        var res = await bot.RequestSong({
            username: 'qjfrntop'
        });

        assert.equal(res.result, 'fail');
        assert.equal(bot.length, 3);
        assert.equal(res.message, '아직 쿨타임이에요! 자신의 곡과 곡 사이에는 최소 4개의 곡이 있어야 해요!');
    });

    it('No User in DB', async () => {
        var res = await bot.RequestSong({
             username: 'taemino0o', 
             display_name: '태민태민' 
        });
        
        assert.equal(res.result, 'fail');
        assert.equal(res.message, `DB에 태민태민님의 정보가 없어요!`);
    });
});