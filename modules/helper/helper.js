'use strict';
import { to } from 'await-to-js';
import crypto from 'crypto';
import shortId from 'short-unique-id';
import fs from 'fs';
import configs from './../../config';

const wait = async (_promise) => {
    const [err, res] = await to(_promise);
    if (err) return [err ? err : getError(err)];
    return [null, res];
};

const genShortId = (_length = 8) => {
    let hashIds = new shortId();
    return hashIds.randomUUID(_length).toUpperCase();
};

const md5 = (_string) => crypto.createHash('md5').update(_string).digest('hex');

const isEmail = (_string) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(_string);

const getImages = (_string) => _string && _string.replace(configs.upload.pathImage, configs.urlImage);

const createDir = (_path) => {
    try {
        if (!fs.existsSync(_path)) {
            return fs.mkdirSync(_path, { recursive: true });
        }
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
};

const getError = (_error) => {
    let stack = _error.stack ? _error.stack : '';
    let stackObject = stack.split('\n');
    let position = getPositionError(stackObject);
    let splitMessage = _error.message ? _error.message.split('\n') : [''];
    return {
        filename: position.filename,
        line: position.line,
        row: position.line,
        code: _error.code ? _error.code : null,
        message: splitMessage[splitMessage.length - 1],
        type: _error.type ? _error.type : _error.name,
        stack: stack,
        arguments: _error.arguments,
    };
};

const getPositionError = (_stack) => {
    let filename,
        line,
        row;
    try {
        let filteredStack = _stack.filter(function (s) {
            return /\(.+?\)$/.test(s);
        });
        let splitLine;
        if (filteredStack.length > 0) {
            splitLine = filteredStack[0].match(/(?:\()(.+?)(?:\))$/)[1].split(':');
        } else {
            splitLine = _stack[0].split(':');
        }
        let splitLength = splitLine.length;
        filename = splitLine[splitLength - 3];
        line = Number(splitLine[splitLength - 2]);
        row = Number(splitLine[splitLength - 1]);
    } catch (err) {
        filename = '';
        line = 0;
        row = 0;
    }
    return {
        filename: filename,
        line: line,
        row: row,
    };
};


export { md5, wait, getImages, createDir, isEmail, genShortId };
