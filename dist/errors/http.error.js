"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewError = exports.HTTPError = void 0;
class HTTPError extends Error {
    constructor(context, statusCode, message) {
        super(message);
        this.context = context;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.HTTPError = HTTPError;
function createNewError(context, statusCode, message) {
    return new HTTPError(context, statusCode, message);
}
exports.createNewError = createNewError;
