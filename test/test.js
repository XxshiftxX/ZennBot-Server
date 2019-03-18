var assert = require('assert');

describe('Array Test', () => {
    describe('indexOf() Method', () => {
        it('Return -1 when there\'s no matching value', () => {
            assert.equal(-1, [1, 2, 3].indexOf(10));
            assert.equal(-1, [1, 2, 3].indexOf(5));
        })
    })
})