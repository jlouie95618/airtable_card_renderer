'use strict'; // indicate to use Strict Mode

(function() {
    var root = this;
    var previousDateColumnType = root.DateColumnType;

    var has_require = typeof require !== 'undefined';

    var _ = root._;
    var moment = root.moment;
    var GenericColumnType = root.GenericColumnType;

    if (typeof _ === 'undefined') {
        if (has_require) { _ = require('underscore'); }
        else { throw new Error('date_column_type requires Underscore'); }
    }
    if (typeof moment === 'undefined') {
        if (has_require) { moment = require('moment'); }
        else { throw new Error('date_column_type requires the moment file'); }
    }
    if (typeof GenericColumnType === 'undefined') {
        if (has_require) { GenericColumnType = require('../generic_column_type.js'); }
        else { throw new Error('date_column_type requires the GenericColumnType file'); }
    }

    var DateColumnType = GenericColumnType.extend({
        init: function(columnName, contentObject, verbose) {
            this._super(columnName, contentObject, verbose);
        },
        generateElement: function(isForCompact) {
            var dateTime;
            if (this._displayValue.indexOf('T') > -1) {
                dateTime = moment(this._displayValue).format('lll');
            } else {
                dateTime = moment(this._displayValue).format('ll');
            }
            console.log(moment(this._displayValue).format('lll'));
            if (this._verbose) {
                console.log(dateTime);
                console.log(Date);
                console.log('UTC Versions');
                console.log(dateTime.getUTCDate());
                console.log(dateTime.getUTCFullYear());
                console.log(dateTime.getUTCMonth());
                console.log(dateTime.getUTCDay());
                console.log(dateTime.getUTCHours());
                console.log(dateTime.getUTCMinutes());
                console.log(dateTime.getUTCSeconds());
                console.log('Non-UTC Versions');
                console.log(dateTime.getDate());
                console.log(dateTime.getFullYear());
                console.log(dateTime.getMonth());
                console.log(dateTime.getDay());
                console.log(dateTime.getHours());
                console.log(dateTime.getMinutes());
                console.log(dateTime.getSeconds());
            }
            return this._createBasicLayout(isForCompact, 
                    this._columnName, dateTime); 
        }
    });

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = DateColumnType;
        }
        exports.DateColumnType = DateColumnType;
    } else {
        root.DateColumnType = DateColumnType;
    }

}).call(this);
