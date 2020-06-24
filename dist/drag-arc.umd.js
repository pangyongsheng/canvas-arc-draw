(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.dragArc = factory());
}(this, (function () { 'use strict';

	var x = 1;
	var index = (function (y) {
	  return x + y;
	});

	return index;

})));
