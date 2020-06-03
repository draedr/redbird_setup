#!/usr/bin/env node)
// If *value* is null or undefined, then fallback is returned.
function flbk (value, fallback) {
	if( value === null || value == null || value == undefined || value === undefined )
		return fallback;
	else
		return value;
}

module.exports = flbk;