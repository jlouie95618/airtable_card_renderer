'use strict'; // indicate to use Strict Mode

var _ = require('underscore');
var Class = require('./vendor/class.js');
var config = require('./config.js');

var GenericColumnType = Class.extend({
	init: function(columnName, contentObject, verbose) {
        // Escape inputted information so that the person
        //  cannot mess with the Javascript on the page
		this._columnName = _.escape(columnName);
        this._fieldType = _.escape(contentObject.fieldType);
        // If the displayValue is an array of things like
        //  attachments or multiselect options, we don't
        //  want to get rid of the 'array/object' structure
        if (typeof contentObject.displayValue === 'object') {
            this._displayValue = contentObject.displayValue;
        } else {
            this._displayValue = _.escape(contentObject.displayValue);
        }
        this._config = config;
        this._verbose = verbose;
	},
    // Define default "generateElement" behavior (redefined by
    //  individual subclasses), which is basically to return an 
    //  empty or blank field value for the Card
    generateElement: function() {
        return $('<div/>');
    },
    // This method does final processing of an individual field to standardize how
    //  it is rendered within the card; all of the subclasses use/should use it
    _createBasicLayout: function(isForCompact, name, content) {
        var elem = $('<div/>');
        var columnName = $('<div/>').append(name.toUpperCase()).attr('class', 'element-name');
        var columnContent = $('<div/>').append(content).attr('class', 'element-content');
        elem.append(columnName);
        elem.append(columnContent);
        return elem;
    }
});

module.exports = GenericColumnType;

