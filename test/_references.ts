/// <reference path="../typings/karma-jasmine/karma-jasmine"/>
/// <reference path="../typings/putz/putz" />

// Some NodeJS declarations used
declare var __filename: string;
declare var __dirname: string;
declare module 'fs' {    
    export function readFileSync(filename: string, encoding: string): string;    
}