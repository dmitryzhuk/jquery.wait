/*
 * Banksravni.ru implementation
 */

/*global define */
(function (factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else {
    	factory(jQuery);
    }

}(function ($) {

    'use strict';

    /** Default options for Plugin */
    var defaults = {
            // Delay in milliseconds before actual showing of the message
            'delay': 400
        },
        name = 'wait';

    /** Defines Plugin constructor */
    function Wait(element, options) {
        // set values for 'private' fields
        this.element = element;
        this.options = $.extend({}, defaults, options);
    }

    /** Plugin prototype definition */
    Wait.prototype = {

        /**
         * Performs initialization of this plugin instance.
         * This method called once during plugin initialization for new element.
         */
        init: function () {
            this.wait = window.document.createElement('div');
            $(this.wait)
                .addClass('wait')
                .append('<span class="aligner"></span>')
                .append('<span class="icon"></span>')
                .append('<div class="message"></div>');
            $(this.element).after(this.wait);
        },

        /**
         * Displays wait box with given message.
         *
         * @param message
         *          An optional message to display in the box.
         * @param delay
         *          An optional overriding delay before showing the box.
         */
        show: function (message, delay) {
            var self = this;
            $('.aligner', this.wait).css('line-height', this.element.offsetHeight + 'px');
            $('.message', this.wait).text(!!message ? message : '');
            $('.icon', this.wait).removeClass('error');
            $(this.wait)
                .css('left', this.element.offsetLeft + 'px')
                .css('top', this.element.offsetTop + 'px')
                .css('width', this.element.offsetWidth + 'px')
                .css('height', this.element.offsetHeight + 'px');
            this.timer = window.setTimeout(function () {
                $(self.wait).show();
            }, delay || this.options.delay);
        },

        /**
         * Displays wait box with error message and icon.
         *
         * @param message
         *          An optional message to display in the box.
         */
        error: function (message) {
            message = typeof message === 'string' ? message : this.message(message);
            $('.aligner', this.wait).css('line-height', this.element.offsetHeight + 'px');
            $('.message', this.wait).text(!!message ? message : '');
            $('.icon', this.wait).addClass('error');
            $(this.wait)
                .css('width', this.element.offsetWidth + 'px')
                .css('height', this.element.offsetHeight + 'px')
                .show();
        },

        /**
         * Simply makes wait box invisible.
         */
        hide: function () {
            window.clearTimeout(this.timer);
            $(this.wait).hide();
        },

        /**
         * Extracts error message from XMLHTTPRequest object.
         * @param xhr
         *          An instance of XMLHTTPRequest object.
         * @returns {string}
         *          Readable message.
         */
        message: function (xhr) {
            if (xhr.status === 0) {
                return 'No connection.\nVerify Network.';
            } else if (xhr.status === 500) {
                return 'Error 500: Internal Server Error.';
            } else if (xhr.status === 404) {
                return 'Error 404: Resource not found';
            } else {
                return 'Error ' + xhr.status;
            }
        },

        /**
         * Executes particular plugin command.
         * This method called for each matched element in a sequence.
         *
         * @param options
         *          Execution options.
         */
        command: function (options) {
            if (options !== undefined) {
                if (options.action === 'show') {
                    this.show(options.message, options.delay);
                } else if (options.action === 'error') {
                    this.error(options.message);
                } else if (options.action === 'hide') {
                    this.hide();
                }
            }
        }
    };

    // Bind plugin instance to element
    $.fn[name] = function (options) {
        return this.each(function () {
            var key = 'plugin_' + name,
                plugin = $.data(this, key);
            if (plugin === undefined) {
                plugin = new Wait(this, options);
                plugin.init();
                $.data(this, key, plugin);
            }
            plugin.command(options);
        });
    };

}));
