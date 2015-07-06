/// <reference path="typings/node/node.d.ts"/>

var path = require('path');



// -- Paths and files

exports.srcDir = 'src';
exports.tsConfigPath = path.resolve(__dirname, 'tsconfig.json');
exports.karmaConfigPath = path.resolve(__dirname, 'karma.config.js');

exports.dev = {};
exports.dev.destDir = 'build/dev';
exports.dev.bundleFileName = 'putz.js';
exports.dev.tsOptions = {
};

exports.prod = {};
exports.prod.destDir = 'build/prod';
exports.prod.bundleFileName = 'putz.js';
exports.prod.tsOptions = {
    removeComments: true
};

exports.test = {};
exports.test.srcDir = 'test';
exports.test.destDir = 'build/test';
exports.test.bundleFileName = 'test.js';
exports.test.specFilesGlob = 'test/**/*.spec.ts';
exports.test.tsOptions = {
};



// -- Exported library modules --

exports.exportedModules = [
    { expose: 'putz', file: './src/main.ts' },
    { expose: 'putz/http', file: './src/http/http.ts' }
];