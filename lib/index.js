const NumberInput = require('./components/vue2.x/NumberInput')
const Fluctuation = require('./components/vue2.x/Fluctuation')
require('fluctuation.css')
const toFixed = require("./utils/toFixed")

module.exports = {
    NumberInput,
    Fluctuation,
    utils: {
        toFixed,
    },
}