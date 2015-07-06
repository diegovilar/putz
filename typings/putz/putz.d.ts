declare module 'putz' {

    export class Error {
        name: string;
        message: string;
        constructor(message?: string);
    }

    export class TypeError extends Error {
    }

    export class RangeError extends Error {
    }

    export class ReferenceError extends Error {
    }

    export class SyntaxError extends Error {
    }

    export class EvalError extends Error {
    }

    export class URIError extends Error {
    }

    export class JSONParseError extends Error {
    }

    export class IOError extends Error {
    }

    export class NetworkError extends IOError {
    }

}

declare module 'putz/http' {

    import {NetworkError} from 'putz';

    export class HttpError extends NetworkError {
        statusCode: number;
        constructor(statusCode: number, message?: string);
        static createFromStatusCode(statusCode: number, message?: string): HttpError;
    }



    //-- 4xx

    export class HttpBadRequestError extends HttpError {
        constructor(message?: string);
    }

    export class HttpUnauthorizedError extends HttpError {
        constructor(message?: string);
    }

    export class HttpForbiddenError extends HttpError {
        constructor(message?: string);
    }

    export class HttpNotFoundError extends HttpError {
        constructor(message?: string);
    }

    export class HttpMethodNotAllowedError extends HttpError {
        constructor(message?: string);
    }

    export class HttpConflictError extends HttpError {
        constructor(message?: string);
    }

    export class HttpGoneError extends HttpError {
        constructor(message?: string);
    }

    export class HttpPreconditionFailedError extends HttpError {
        constructor(message?: string);
    }

    export class HttpUnsurpportedMediaTypeError extends HttpError {
        constructor(message?: string);
    }



    //-- 5xx

    export class HttpInternalServerError extends HttpError {
        constructor(message?: string);
    }

    export class HttpNotImplementedError extends HttpError {
        constructor(message?: string);
    }

}