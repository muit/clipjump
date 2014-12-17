pc.extend(pc.common, function() {
    var Corazon = function (url, options) {
        options = options || {
            endpoint: "http://login.playcanvas.com/oauth2/auth",
            redirect: "http://login.playcanvas.com/oauth2/end",
            origin: "http://login.playcanvas.com",
            client: "http://playcanvas.com"
        };
        this.baseUrl = url;
        this.authorized = true;
        this.me = null;
        this.accessToken = null;
        if (options.oauth) {
            this.oauth = oauth;
        } else {
            //this.oauth = new pc.net.OAuth(options.endpoint, options.redirect, options.origin, options.client, "designer");
        }
    };

    Corazon.prototype.getBaseUrl = function () {
        return this.baseUrl;
    };

    Corazon.prototype.authorize = function (username, success) {
        this.username = username;
        /*
        this.oauth.refreshAccessToken(function (token) {
            this.users = new UserApi("user", "users", this.baseUrl, this);
            this.users.getOne(this.username, function (user) {
                this.owner = user;
                this.authorized = true;
                this.accessToken = token;
                success(this);
            }.bind(this));
        }.bind(this));
        */
    };

    var ResourceApi = function (name, plural, url, corazon) {
        this._name = name;
        this._plural = plural;
        this._url = url;
        this._corazon = corazon;

        // Wrapper functions can be used to intercept return data before the success callback is fired
        this.getWrapper = null;
        this.createWrapper = null;
        this.updateWrapper = null;
        this.deleteWrapper = null;
    };

    ResourceApi.prototype.getServer = function () {
        return this._corazon;
    };

    /**
     * Get one or more resources from the server
     * @param {String} id ID or full URL or resource
     * @param {Object} [params] Parameters for URL
     * @param {Function} success
     * @param {Function} [error]
     */
    ResourceApi.prototype.get = function (id, params, success, error) {
        var url = this._getUrl(id);

        // If params is skipped, re-organize arguments
        if(typeof(params) === "function") {
            error = success;
            success = params;
            params = {};
        }

        if(params.revision) {
            url.path = pc.path.join(url.path, "revisions/" + params.revision);
            delete params.revision;
        }

        params = this._getParams(params);
        url.setQuery(params);

        this._corazon.oauth.get(url.toString(), function (response) {
            if(typeof(response) == "string") {
                response = JSON.parse(response);
            }
            if(success) {
                if(this.getWrapper) {
                    response.response = this.getWrapper(response.response);
                }
                success(response.response);
            }
        }.bind(this), {
            headers: {
                "Content-Type": this._corazon.oauth.ContentType.JSON
            },
            error: function (status, xhr, exception) {
                this._handleError(status, xhr, error);
            }.bind(this)
        });
    };

    ResourceApi.prototype.getOne = function (id, params, success, error) {
        // If params is skipped
        if(typeof(params) === "function") {
            error = success;
            success = params;
            params = {};
        }

        this.get(id, params, function (resources) {
            if(success) {
                if (resources.length) {
                    success(resources[0]);
                } else {
                    success(null);
                }
            }
        }, error);
    };

    /**
     * Update the resource on the server
     * @param {Object} resource The resource or list of resources to save
     * @param {Object} success Callback on success, passed the saved resource
     * @param {Object} error Callback on error, passed a list of error messages
     */
    ResourceApi.prototype.update = function (resource, success, error) {
        if (pc.type(resource) !== "array") {
            resource = [resource];
        }

        error = error || function () {};

        // Remove any _rev information
        resource.forEach(function (item) {
            delete item._rev;
            delete item.last_modified;
        });

        var url = this._getUrl(this._idFromResourceList(resource));
        var params = this._getParams({});
        url.setQuery(params);

        this._corazon.oauth.put(url.toString(), function (response, status, xhr) {
            if(success) {
                if(this.updateWrapper) {
                    response.response = this.updateWrapper(response.response);
                }
                success(response.response);
            }
        }.bind(this), resource, {
            headers: {
                "Content-Type": this._corazon.oauth.ContentType.JSON
            },
            error: function (status, xhr, exception) {
                this._handleError(status, xhr, error);
            }.bind(this)
        });
    };

    /**
     * Create a new resource
     * @param {Object} data
     * @param {Object} success
     */
    ResourceApi.prototype.create = function (data, success, error) {
        var url = this._getUrl();

        var params = this._getParams({});
        url.setQuery(params);

        this._corazon.oauth.post(url.toString(), function (response, status, xhr) {
            if (status === 201) {
                // New resource created fetch it before calling success
                url = xhr.getResponseHeader("Content-Location");
                this.get(url, function (response) {
                    if(success) {
                        if(this.createWrapper) {
                            response[0] = this.createWrapper(response[0]);
                        }
                        success(response[0]);
                    }
                }.bind(this), error);
            }
        }.bind(this), data, {
            headers: {
                "Content-Type": this._corazon.oauth.ContentType.JSON
            },
            error: function (status, xhr, exception) {
                this._handleError(status, xhr, error);
            }.bind(this)
        });
    };

    /**
     * @function
     * @name ResourceApi#del
     * @description Mark an resource as deleted
     * @param {Number || Object} resource The id of the resource or the resource to delete
     * @param {Object} success Callback on success, no arguments
     * @param {Object} error Callback on error, passed a list of error messages
    */
    ResourceApi.prototype.del = function (resource, success, error) {
        var id = resource;
        if (resource.resource_id) {
            id = resource.resource_id;
        }

        var url = this._getUrl(id);

        var params = this._getParams();
        url.setQuery(params);

        this._corazon.oauth.delete_(url.toString(), function (response) {
            if (success) {
                if(this.deleteWrapper) {
                    this.deleteWrapper();
                }
                success();
            }
        }.bind(this), {
            headers: {
                "Content-Type": this._corazon.oauth.ContentType.JSON
            },
            error: function (status, xhr, exception) {
               this._handleError(status, xhr, error);
            }.bind(this)
        });
    };

    ResourceApi.prototype.getChangesets = function (id, recursive, success, error) {
        var url;
        if (typeof(recursive) == "function") {
            error = success;
            success = recursive;
            error = function () {};
        }

        if(recursive !== false) {
            recursive = true;
        }

        url = this._getUrl(id, "changesets");
        //url = pc.path.join(this._getUrl(id).toString(), "changesets");
        //url += "?recursive=true";

        var params = this._getParams({
            recursive: true
        });
        url.setQuery(params);

        this._corazon.oauth.get(url.toString(), function (response) {
            success(response.response);
        }.bind(this), {
            headers: {"Content-Type": this._corazon.oauth.ContentType.JSON},
            error: function (errors) {
              error(errors);
            }.bind(this)
        });
    };

    ResourceApi.prototype._getUrl = function (id, path) {
        var url;
        path = path || "";
        if (id) {
            if(id.substr(0, "http".length) === "http") {
                url = new pc.URI(id); // id is an absolute url, so we assume it is correct
            } else {
                url = new pc.URI(pc.path.join(this._url, this._plural, id, path));
            }
        } else {
            // Get entire collection
            url = new pc.URI(pc.path.join(this._url, this._plural, path));
        }

        return url;
    };

    /**
     * @name pc.common.ResourceApi#_getParams
     * @function
     * @private
     * @description Return parameters to send with GET/POST/PUT/DELETE request
     * @param params Initial parameters to use, new parameters are appended, existing parameters are overwritten
     * @returns {Object} A javascript object of parameters
     */
    ResourceApi.prototype._getParams = function (params) {
        var p = params || {};
        //p.access_token = this._corazon.access_token;
        return p;
    };

    ResourceApi.prototype._handleError = function (status, xhr, error) {
        error = error || function (e) {
                            e.forEach(function (msg) { logERROR(msg); });
                         };

        switch(status) {
            case 400:
            case 404:
                var response = JSON.parse(xhr.responseText);
                error(response.response.error, status);
                break;
            case 401:
                error(["Not logged in"], status);
                break;
            case 403:
                error(["Insufficient permissions"], status);
                break;
            case 500:
                error(["Server Error"], status);
                break;
            default:
                error(["Unhandled error: " + status], status);
                break;
        }
    }

    ResourceApi.prototype._idFromResourceList = function (resources) {
        return resources.map(function(item) { return item.resource_id; }).join(",");
    }

    var RepositoryApi = function (name, plural, url, corazon) {
    };

    RepositoryApi = pc.inherits(RepositoryApi, ResourceApi);
    RepositoryApi.Types = {
        BITBUCKET: 'bitbucket',
        GITHUB: 'github'
    };

    var UserApi = function (name, plural, url, corazon) {
        this.getWrapper = this._get;
    };
    UserApi = pc.inherits(UserApi, ResourceApi);

    /**
     * Extend each User resource with the DepotApi
     */
    UserApi.prototype._get = function (response) {
        response.forEach(function (user) {
            var url = pc.path.join(this._url, user.username);
            user.depots = new DepotApi("depot", "depots", url, this._corazon);
        }, this);
        return response;
    };

    /**
     * @name pc.common.DepotApi
     * @description API for accessing depots
     */
    var DepotApi = function (name, plural, url, corazon) {
        this.getWrapper = this._get;
    };
    DepotApi = pc.inherits(DepotApi, ResourceApi);

    /**
     * Extend each depot resource with the entity, asset, export and repository apis
     */
    DepotApi.prototype._get = function (response) {
        response.forEach(function (depot) {
            var self = this;
            var url = pc.path.join(this._url, depot.name);

            depot.entities = new ResourceApi("entity", "entities", url, this._corazon);
            depot.assets = new ResourceApi("asset", "assets", url, this._corazon);
            depot.apps = new ResourceApi("app", "apps", url, this._corazon);
            depot.exports = new ResourceApi("export", "exports", url, this._corazon);
            depot.repositories = new RepositoryApi("repository", "repositories", url, this._corazon);
            depot.packs = new ResourceApi("pack", "packs", url, this._corazon);
            depot.changesets = new ResourceApi("changeset", "changesets", url, this._corazon);
            depot.mergesets = new ResourceApi("mergeset", "mergesets", url, this._corazon);

            depot.getContent = function (pack, success, error) {
                url = pc.path.join(url, 'content')
                self._corazon.oauth.get(url, function (response) {
                    success(response);
                }, {
                    headers: {'Content-Type': self._corazon.oauth.ContentType.JSON},
                    error: function (errors) {
                        if (error) {
                            error(errors);
                        }
                    }
                });
            };
        }, this);
        return response;
    };

    DepotApi.prototype._idFromResourceList = function (resources) {
        return resources.map(function(item) {return item['id']}).join(",");
    }

    return {
        Corazon: Corazon,
        ResourceApi: ResourceApi,
        RepositoryType: {
            BITBUCKET: 'bitbucket',
            GITHUB: 'github',
            DIRECTORY: 'directory'
        }
    };
}());

/*
// Sample usage
corazon = new Corazon("http://localhost/api", "dave", "mygame");
corazon.authorize("username", function () {
    //ready to use here...
    equal(corazon.authorized, true);

    corazon.depot.getOne("depot", function (depot) {
        depot.entities.getOne("123", function (entity) {

        });
    });
});

corazon.entity.create(entityData);
corazon.entity.get(id)
corazon.entity.update(entity)
corazon.entity.del(entity)
*/
