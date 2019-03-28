const autoBind = require('auto-bind');

module.exports = class Request {
    constructor() {
        autoBind(this);
    }
}