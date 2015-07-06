import * as puts from './main';
import * as http from './http/http';

var _window = <any> window;
_window.puts = puts;
_window.puts.http = http;