'use strict'; // indicate to use Strict Mode

var _ = require('underscore');

var GenericColumnType = require('../generic_column_type.js');

var AttachmentsColumnType = GenericColumnType.extend({
    init: function(columnName, contentObject, verbose) {
        this._super(columnName, contentObject, verbose);
        this._numImages = this._determineNumImages(contentObject.displayValue);
    },
    generateElement: function(isForCompact) {
        var that = this;
        var content = $('<div/>');
        var images;
        var docs;
        _.each(this._displayValue, function(attachmentObject) {
            var anchor = $('<a/>').attr('href', attachmentObject.url);
            if ((attachmentObject.type).indexOf('image') !== -1) {
                images = that._handleImageLookup(images, attachmentObject, anchor);
            } else {
                docs = that._handleDocumentLookup(docs, attachmentObject, anchor);
            }
        });
        if (images) { content.append(images); }
        if (docs) { content.append(docs); }
        return this._createBasicLayout(isForCompact, 
                this._columnName, content); 
    },
    _handleImageLookup: function(images, item, anchor) {
        var image;
        var numImages = this._determineNumImages(this._displayValue);
        if (numImages > 1) {
            image = $('<div/>').attr('class', 'img-content-grid');
            image.css('background-image', 'url(' + item.url + ')');
            anchor.append(image);
        } else {
            image = $('<img/>').attr('src', item.url);
            image.attr('alt', item.filename);
            anchor.append(image.attr('class', 'img-content'));
        }
        if (!images) { images = $('<div/>'); }
        images.append(anchor);
        return images;
    },
    _determineNumImages: function(displayValue) {
        var numImages = 0;
        _.each(displayValue, function(value) {
            if (value && typeof value.type === 'string' && 
                (value.type).indexOf('image') === 0) {
                numImages++;
            }
        });
        return numImages;
    },
    _handleDocumentLookup: function(docs, item, anchor) {
        var iconText = '  ' + item.filename;
        var icon = $('<i/>').attr('class', 
            'airtable-gmail-ext-icon-file-alt').text(iconText);
        anchor.attr('title', item.filename);
        anchor.append(icon);
        if (!docs) { docs = $('<div/>'); }
        docs.append(anchor);     
        return docs;       
    }
});

module.exports = AttachmentsColumnType;
