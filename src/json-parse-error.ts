import {SyntaxError} from './native';

export class JSONParseError extends SyntaxError {
    name = 'JSONParseError';    
}
