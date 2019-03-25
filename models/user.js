module.exports = (seq, Types) => (
    seq.define('user', {
        name: {
            type: Types.STRING(30),
            allowNull: false,
            unique: true,
        },
        tname: {
            type: Types.STRING(15),
            allowNull: true,
        },
        tdisplay: {
            type: Types.STRING(15),
            allowNull: true,
        },
        ticket: {
            type: Types.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        piece: {
            type: Types.INTEGER,
            allowNull: true,
            defaultValue: 0,
        }
    })
);