'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var CurrencyColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
    },
    generateElement: function() {
        var elem = $('<div>Currency</div>');
        return elem;        
    }
});

module.exports = CurrencyColumnType;
