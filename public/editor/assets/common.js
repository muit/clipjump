common = {
    /**
     * Convert an array-like object into a normal array.
     * For example, this is useful for converting the arguments object into an array.
     * @param {Object} arr The array to convert
     * @return {Array} An array
     * @function
     * @name pc.makeArray
     */
    makeArray: function (arr) {
        var i,
        ret = [],
        length = arr.length;

        for(i = 0; i < length; ++i) {
            ret.push(arr[i]);
        }

        return ret;
    },

    guid: {
        /**
         * @function
         * @name common.guid.create
         * @description Create an RFC4122 version 4 compliant GUID
         * @return {String} A new GUID
         */
        create: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0,
                    v = (c == 'x') ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
    },

    string: {
        /**
         * @name common.string.ASCII_LOWERCASE
         * @description All lowercase letters
         * @type String
         */
        ASCII_LOWERCASE: "abcdefghijklmnopqrstuvwxyz",

        /**
         * @name common.string.ASCII_UPPERCASE
         * @description All uppercase letters
         * @type String
         */
        ASCII_UPPERCASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        /**
         * @name common.string.ASCII_LETTERS
         * @description All ASCII letters
         * @type String
         */
        ASCII_LETTERS: this.ASCII_LOWERCASE + this.ASCII_UPPERCASE,
        /**
         * @function
         * @name common.string.format
         * @description Return a string with {n} replaced with the n-th argument
         * @param {String} s The string to format
         * @param {Object} [arguments] All other arguments are substituted into the string
         * @returns {String} The formatted string
         * @example
         * var s = common.string.format("Hello {0}", "world");
         * console.log(s); // Prints "Hello world"
         */
        format: function (s) {
            var i = 0,
            regexp,
            args = common.makeArray(arguments);

            // drop first argument
            args.shift();

            for (i = 0; i < args.length; i++) {
                regexp = new RegExp('\\{' + i + '\\}', 'gi');
                s = s.replace(regexp, args[i]);
            }
            return s;
        },

        /**
        * @function
        * @name common.string.startsWith
        * @description Check if a string s starts with another string subs
        * @param {String} s The string to look in
        * @param {String} subs The string to look for
        * @returns {Boolean} True if s starts with subs
        * @example
        * var s = "abc";
        * if (common.string.startsWith(s, "a")) {
        *   console.log('Starts with a');
        * }
        */
        startsWith: function (s, subs) {
            return (s.indexOf(subs) === 0);
        },

        /**
        * @function
        * @name common.string.endsWith
        * @description Check if a string s ends with another string subs
        * @param {String} s The string to look in
        * @param {String} subs The string to look for
        * @returns {Boolean} True if s ends with subs
        */
        endsWith: function (s, subs) {
            return (s.lastIndexOf(subs, s.length - subs.length) !== -1);
        },

        /**
        * @function
        * @name common.string.toBool
        * @description Convert a string value to a boolean. In non-strict mode (the default), 'true' is converted to true, all other values
        * are converted to false. In strict mode, 'true' is converted to true, 'false' is converted to false, all other values will throw
        * an Exception.
        * @param {String} s The string to convert
        * @param {Boolean} [strict] In strict mode an Exception is thrown if s is not an accepted string value. Defaults to false
        * @returns {Boolean} The converted value
        */
        toBool: function (s, strict) {
            if (s === 'true') {
                return true;
            }

            if (strict) {
                if (s === 'false') {
                    return false;
                }

                throw new Error('Not a boolean string');
            }

            return false;
        },

        /**
        * @function
        * @name common.string.trim
        * @description Remove whitespace from the start and end of a string
        * @param {String} str The string that will be trimmed
        * @returns {String} A trimmed copy of the string
        */
        trim: function (str) {
            return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        }
    },

    cookie: {
        set: function (name, value, options) {
            options = options || {};

            var cookie = name + '=' + value;
            if (options.path) {
                cookie += ";path=" + options.path;
            }
            if (options.domain) {
                cookie += ";domain=" + options.domain;
            }
            if (options.path) {
                cookie += ";path=" + options.path;
            }
            if (options.secure) {
                cookie += ";secure";
            }
            if (options.lifetime) {
                cookie += ";max-age=" + options.lifetime*24*60*60;
            } else {
                // default to 1 day
                cookie += ";max-age=" + 1*24*60*60;
            }

            document.cookie = cookie;
        },

        get: function (name) {
            var cookie, cookies = document.cookie.split(";");
            var i, len = cookies.length;

            for(i = 0; i < len; i++) {
                cookie = cookies[i].trim()
                if (common.string.startsWith(cookie, name)) {
                    return cookie.split('=')[1];
                }
            }
        },

        remove: function (name, options) {
            options.lifetime = 0;
            common.cookie.set(name,"", options);
        }
    },

    /**
     * @name common.URL
     * @description Create a new URL object
     * @class A URL object
     * @param {String} url URL string
     */
    URL: function (url) {
        // See http://tools.ietf.org/html/rfc2396#appendix-B for details of RegExp
        var re = /^(([^:\/?\#]+):)?(\/\/([^\/?\#]*))?([^?\#]*)(\?([^\#]*))?(\#(.*))?/,
        result = url.match(re);

        /**
         * @name common.URL#protocol
         * @description The scheme. (e.g. http)
         */
        this.protocol = result[2];

        /**
         * @name common.URL#domain
         * @description The domain. (e.g. www.example.com)
         */
        this.domain = result[4];

        /**
         * @name common.URL#path
         * @description The path. (e.g. /users/example)
         */
        this.path = result[5];

        /**
         * @name pc.URL#query
         * @description The query, the section after a ?. (e.g. search=value)
         */
        this.query = result[7];

        /**
         * @name pc.URL#fragment
         * @description The fragment, the section after a #
         */
        this.fragment = result[9];

        /**
         * @function
         * @name pc.URL#toString
         * @description Convert URL back to string
         */
        this.toString = function () {
            var s = "";

            if (this.scheme) {
                s += this.scheme + ":";
            }

            if (this.authority) {
                s += "//" + this.authority;
            }

            s += this.path;

            if (this.query) {
                s += "?" + this.query;
            }

            if (this.fragment) {
                s += "#" + this.fragment;
            }

            return s;
        };

        /**
         * @function
         * @name common.URL#params
         * @description Returns the query parameters as an Object
         * @example
         * var s = "http://example.com?a=1&b=2&c=3
         * var uri = new common.URL(s);
         * var q = uri.params();
         * console.log(q.a); // logs "1"
         * console.log(q.b); // logs "2"
         * console.log(q.c); // logs "3"
         */
        this.params = function () {
            var vars;
            var pair;
            var result = {};

            if (this.query) {
                vars = decodeURIComponent(this.query).split("&");
                vars.forEach(function (item, index, arr) {
                    pair = item.split("=");
                    result[pair[0]] = pair[1];
                }, this);
            }

            return result;
        };

        /**
         * @function
         * @name common.URL#setParams
         * @description Set the query section of the URI from a Object
         * @param {Object} params Key-Value pairs to encode into the query string
         * @example
         * var s = "http://example.com";
         * var url = new common.URL(s);
         * url.setParams({"a":1,"b":2});
         * console.log(url.toString()); // logs "http://example.com?a=1&b=2
         */
        this.setParams = function (params) {
            q = "";
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    if (q !== "") {
                        q += "&";
                    }
                    q += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                }
            }

            this.query = q;
        };
    },

    createSkeletonScript: function (filename) {
        var parts = filename.split('/');
        // remove .js extension
        var scriptName = parts[parts.length-1].slice(0,-3).replace(new RegExp("[\\.-]"), '_');
        var script = [
            "pc.script.create('{0}', function (context) {",
            "    // Creates a new {1} instance",
            "    var {1} = function (entity) {",
            "        this.entity = entity;",
            "    };",
            "",
            "    {1}.prototype = {",
            "        // Called once after all resources are loaded and before the first update",
            "        initialize: function () {",
            "        },",
            "",
            "        // Called every frame, dt is time in seconds since last update",
            "        update: function (dt) {",
            "        }",
            "    };",
            "",
            "    return {1};",
            "});"].join('\n');

        var objectName = scriptName.charAt(0).toUpperCase() + scriptName.slice(1);
        return common.string.format( script, scriptName, objectName );
    },

    getScriptFilePattern: function () {
        var pattern = new RegExp("^(?:[\\w\\d\\.-]+\\\/)*[\\w\\d\\.-]+(?:\\.[j|J][s|S](?:[o|O][n|N])?)?$");
        return function () {
            return pattern;
        };
    }(),

    removeInvalidFileChars: function (filename) {
        return filename.replace(/[\/:"*?<>|\r\n]+/g, '_');
    },

    /**
    * Perform a deep comparison to check if two objects are equal.
    * @param {Object} a The first Object to test
    * @param {Object} b The second Object to test
    * @function
    * @name  common.isEqual
    */
    isEqual: function(a, b) {
        return this._equals(a, b, [], []);
    },

    // Internal recursive comparison function for `isEqual`. From underscore.js
    _equals: function(a, b, aStack, bStack) {
        // reference toString for optimized access to it
        var toString = Object.prototype.toString;

        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        if (a === b) {
            return a !== 0 || 1 / a == 1 / b;
        }

        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) {
            return a === b;
        }

        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className != toString.call(b)) {
            return false;
        }

        switch (className) {
            // Strings, numbers, dates, and booleans are compared by value.
            case '[object String]':
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return a == String(b);

            case '[object Number]':
                // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
                // other numeric values.
                return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);

            case '[object Date]':
            case '[object Boolean]':
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a == +b;

            // RegExps are compared by their source patterns and flags.
            case '[object RegExp]':
                return a.source == b.source &&
                       a.global == b.global &&
                       a.multiline == b.multiline &&
                       a.ignoreCase == b.ignoreCase;
        }

        if (typeof a != 'object' || typeof b != 'object') {
            return false;
        }

        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] == a) {
                return bStack[length] == b;
            }
        }
        // Objects with different constructors are not equivalent, but `Object`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(typeof aCtor === 'function' && (aCtor instanceof aCtor) &&
                                 typeof bCtor === 'function' && (bCtor instanceof bCtor))) {
            return false;
        }

        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;
        // Recursively compare objects and arrays.
        if (className == '[object Array]') {
            // Compare array lengths to determine if a deep comparison is necessary.
            size = a.length;
            result = size == b.length;
            if (result) {
                // Deep compare the contents, ignoring non-numeric properties.
                while (size--) {
                    if (!(result = this._equals(a[size], b[size], aStack, bStack))) {
                        break;
                    }
                }
            }
        } else {
            // Deep compare objects.
            for (var key in a) {
                if (a.hasOwnProperty(key)) {
                    // Count the expected number of properties.
                    size++;
                    // Deep compare each member.
                    if (!(result = b.hasOwnProperty(key) && this._equals(a[key], b[key], aStack, bStack))) {
                        break;
                    }
                }
            }

            // Ensure that both objects contain the same number of properties.
            if (result) {
                for (key in b) {
                    if (b.hasOwnProperty(key) && !(size--)) {
                        break;
                    }
                }
                result = !size;
            }
        }

        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return result;
    }
};

