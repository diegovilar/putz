/// <reference path="./_references" />

import * as native from 'putz';

describe('Native errors classes > ', function() {
	
	it('should reference the host constructors', function() {
		
		expect(native.Error).toBe(Error);
		expect(native.TypeError).toBe(TypeError);
		expect(native.RangeError).toBe(RangeError);
		expect(native.ReferenceError).toBe(ReferenceError);
		expect(native.SyntaxError).toBe(SyntaxError);
		expect(native.EvalError).toBe(EvalError);
		expect(native.URIError).toBe(URIError);
		
	});
	
});