pc.extend(pc.common, function () {

    var VALID_TYPES = ['number', 'string', 'boolean', 'asset', 'rgb', 'rgba', 'vector', 'enumeration'];

    var validators = {
        'number': function (url, attribute) {
            return validateValue(url, attribute, 'number', 0);
        },

        'string': function (url, attribute) {
            if (validateValue(url, attribute, 'string', '')) {
                if (attribute.defaultValue.length > 512) {
                    reportAttributeError(url, attribute, "Value exceeds 512 characters");
                    return false;
                }

                return true;
            } else {
                return false;
            }
        },


        'boolean': function (url, attribute) {
            return validateValue(url, attribute, 'boolean', false);
        },

        'asset': function (url, attribute) {
            // TODO check max array length
            return validateArrayValue(url, attribute, [], -1, 'number');
        },

        'vector': function (url, attribute) {
            return validateArrayValue(url, attribute, [0,0,0], 3, 'number');
        },

        'rgb': function (url, attribute) {
            return validateArrayValue(url, attribute, [0,0,0], 3, 'number');
        },

        'rgba': function (url, attribute) {
            return validateArrayValue(url, attribute, [0,0,0,1], 4, 'number');
        },

        'enumeration': function (url, attribute) {
            if (attribute.options &&
                attribute.options.enumerations &&
                pc.type(attribute.options.enumerations) === 'array' &&
                attribute.options.enumerations.length) {

                var valueType;
                var enumerations = attribute.options.enumerations;
                // TODO check enumerations max length
                for (var i=0; i<enumerations.length; i++) {
                    if (pc.type(enumerations[i]) !== 'object') {
                        reportAttributeError(url, attribute, "Each enumeration must be an object with this form: {name: '...', value: ...}");
                        return false;
                    } else {
                        if (pc.type(enumerations[i].name) !== 'string' ||
                            enumerations[i].name.length === 0 ||
                            pc.type(enumerations[i].value) === 'undefined') {

                            reportAttributeError(url, attribute, "Each enumeration must be an object with this form: {name: '...', value: ...}");
                            return false;
                        } else {
                            if (!valueType) {
                                valueType = pc.type(enumerations[i].value);
                            } else {
                                if (valueType !== pc.type(enumerations[i].value)) {
                                    reportAttributeError(url, attribute, "All enumerations values must be the same type");
                                    return false;
                                }
                            }
                        }
                    }
                }

                if (validateValue(url, attribute, valueType, enumerations[0].value)) {
                    var isValueInEnumerations = false;
                    for (var i=0; i<enumerations.length; i++) {
                        if (enumerations[i].value === attribute.defaultValue) {
                            isValueInEnumerations = true;
                            break;
                        }
                    }

                    if (!isValueInEnumerations) {
                        reportAttributeError(url, attribute, "Value is not one of the possible enumerations");
                    }

                    return isValueInEnumerations;
                } else {
                    return false;
                }
            } else {
                reportAttributeError(url, attribute, "Missing enumerations from attribute options");
                return false;
            }
        }
    };

    var validateValue = function (url, attribute, correctType, valueIfUndefined) {
        var type = pc.type(attribute.defaultValue);
        if (type === 'undefined') {
            attribute.defaultValue = valueIfUndefined;
        } else if (type !== correctType) {
            reportAttributeError(url, attribute, 'Value is not of type ' + correctType);
            return false;
        }

        return true;
    };

    var validateArrayValue = function (url, attribute, valueIfUndefined, correctLength, typeofElements) {
        if (validateValue(url, attribute, 'array', valueIfUndefined)) {
            if (correctLength >= 0 && attribute.defaultValue.length !== correctLength) {
                reportAttributeError(url, attribute, pc.string.format('Value must be an array with {0} elements of type {1}', correctLength, typeofElements));
                return false;
            } else {
                for (var i=0; i<attribute.defaultValue.length; i++) {
                    if (typeof attribute.defaultValue[i] !== typeofElements) {
                        reportAttributeError(url, attribute, pc.string.format('Value must be an array with elements of type {0}', typeofElements));
                        return false;
                    }
                }
            }

            return true;
        } else {
            return false;
        }
    };

    var reportAttributeError = function (url, attribute, error) {
        logERROR(pc.string.format("Attribute '{0}' of script {1} is invalid: {2}", attribute.name, url, error));
    };

    var ScriptAttributesParser = function () {
    };

    ScriptAttributesParser.prototype = {

        /**
        * Starts a web worker which scans the specified URL
        * for script attributes, then validates the result and passes it to
        * the success callback
        */
        scanScript: function (url, success, error) {
            var self = this;

            if (pc.string.startsWith(url, 'http:') || pc.string.startsWith(url, 'https:')) {

                // only allow scrpts from code.playcanvas.com and localhost:51000 to be parsed
                if (!pc.string.startsWith(url, 'http://code.playcanvas.com') &&
                    !pc.string.startsWith(url, 'http://localhost:51000')) {

                    error('Cannot parse script ' + url + ': Invalid origin.');
                    return;
                }
            }

            var worker = new Worker("/static/designer/script/designer/src/app/workers/parse_script_attributes.js");
            worker.postMessage({
                url: url
            });

            worker.onmessage = function (e) {
                if (e.data) {
                    if (typeof e.data.error !== 'undefined') {
                        var err = pc.string.format("Could not parse {0} - {1}", url, e.data.error);
                        logERROR(err);
                        error(err);
                    }
                    else {
                        success(self.validateScriptAttributes(url, e.data));
                    }
                }
            };
        },

        validateScriptAttributes: function (url, attributes) {
            var self = this;
            var validated = {};
            try {
                validated = {
                    name: attributes.name,
                    attributes: attributes.values.filter(function (attr) {
                        // check if name is valid
                        if (typeof attr.name !== 'string' || !attr.name) {
                            logERROR(pc.string.format("Validation error in {0}: Missing attribute name", url));
                            return false;
                        }

                        if (attr.name.length > 128) {
                            logERROR(pc.string.format("Validation error in {0}: Attribute name exceeds 128 characters", url));
                            return false;
                        }

                        // check if type is valid
                        if (typeof attr.type === 'undefined') {
                            reportAttributeError(url, attr, "Missing attribute type");
                            return false;
                        }

                        if (VALID_TYPES.indexOf(attr.type) < 0) {
                            reportAttributeError(url, attr, pc.string.format("{0} is not a valid attribute type", attr.type));
                            return false;
                        }

                        if (attr.options && attr.options.displayName) {
                            if (typeof attr.options.displayName !== 'string') {
                                reportAttributeError(url, attr, "Display name of attribute must be a string");
                                return false;
                            }

                            if (attr.options.displayName.length > 128) {
                                reportAttributeError(url, attr, "Display name of attribute cannot exceed 128 characters");
                                return false;
                            }
                        }

                        // type-specific validations
                        return validators[attr.type](url, attr);
                    }).map(function (attr) {
                        // Only allowed options
                        return {
                            name: attr.name,
                            displayName: attr.options && attr.options.displayName ? attr.options.displayName : attr.name,
                            defaultValue: attr.defaultValue,
                            value: attr.defaultValue,
                            type: attr.type,
                            options: attr.options ? {
                                // Only allowed options
                                displayName: attr.name,
                                max: attr.options.max,
                                min: attr.options.min,
                                step: attr.options.step,
                                type: attr.options.type,
                                decimalPrecision: attr.options.decimalPrecision,
                                enumerations: attr.options.enumerations
                            } : {}
                        };
                    })
                };
            } catch (error) {
                logERROR("Invalid script attributes")
                logERROR(error);
            }

            return validated;
        },

        /**
        * Merges the previous attributes with the new ones making
        * sure that user-defined values are not overwritten with defaults
        */
        mergeAttributes: function(previousAttributes, newAttributes) {
            var lookup = {}
            var result = newAttributes ? pc.extend([], newAttributes) : [];

            // scan the values of the previous attributes
            // and add them to the lookup object
            if (previousAttributes) {
                for (var i=0; i<previousAttributes.length; i++) {
                    var value = previousAttributes[i].defaultValue;
                    if (typeof previousAttributes[i].value !== "undefined") {
                        value = previousAttributes[i].value;
                    }

                    lookup[previousAttributes[i].name] = {
                        type: previousAttributes[i].type,
                        value: value
                    };
                }
            }

            // go through all the new attributes and set their values
            // to their previous value (stored in lookup) or to their default value
            if (newAttributes) {
                for (var j = 0; j < newAttributes.length; j++) {
                    var name = newAttributes[j].name;
                    var value = newAttributes[j].defaultValue;
                    var prev = lookup[name];

                    // if there is a previous value then keep it but only
                    // if the previous type is the same as the new type
                    if (prev && prev.value !== undefined && prev.type === newAttributes[j].type) {
                        value = prev.value;
                    }

                    // make sure to clone the value if it is an array type
                    result[j].value = pc.type(value) === 'array' ? pc.extend([], value) : value;
                }
            }

            return result;
        }
    };

    return {
        ScriptAttributesParser: ScriptAttributesParser
    };

}());
