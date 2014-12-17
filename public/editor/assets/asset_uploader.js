/**
* A js library to upload File objects that represent assets
* to S3 and then Corazon. In order to do that it needs:
* - A File object
* - The S3 key that wil be used to upload the file to S3
* - An optional id id of an asset in case we are updating an existing asset
* - A signing URL which returns an aws signature ready to be used to upload the file
* - The URL to create the asset in Corazon
* - Optional progress method
* - Optional onUploaded method called when the asset is uploaded to S3 but before it's created on the server
*
* example usage:
_____________________________________________________________
   var uploader = new AssetUploader( {
        file: theFile,
        s3Name: "uploaded_name",
        signServiceUrl: /username/depot/sign_s3_asset,
        createAssetUrl: /username/depot/assets/create
    });

    uploader.upload().then( function() {
        console.log( "success" );
    }, function( err ) {
        console.error( "error" )
    } );
_____________________________________________________________
*/
var AssetUploader = function(options) {
    this.options = options || {};
    options.s3Name = options.s3Name || 'default_name';
    options.onProgress = options.onProgress || this._onProgress;
    pc.extend(this, options);
};

AssetUploader.prototype = {
    // additional extensions and their mime types
    mime_types: {
        'tga': 'image/x-tga',
        'dds': 'image/dds',
        'crn': 'image/crunch',
        'fbx': 'model/vnd.autodesk.fbx',
        'dae': 'model/vnd.collada+xml',
        'obj': 'model/vnd.wavefront.obj',
        'json': 'application/json' // needed for Windows
    },

    allowed_extensions: [
        'fbx', 'dae', 'obj', '3ds',
        'txt',
        'xml',
        'json',
        'tif', 'tga', 'png', 'jpg', 'jpeg', 'gif', 'bmp',
        'wav', 'mp3', 'mp4', 'ogg'
    ],

    /**
    * Uploads the file to S3 and then creates the asset in Corazon. After
    * all this is done it calls the resolve callback.
    */
    upload: function () {
        var self = this;
        var promise = new RSVP.Promise( function( resolve, reject ) {
            var mimeType = self._getFileType(self.file);
            if( !mimeType ) {
                reject("Invalid file type.");
            }
            else {
                var s3upload = new S3Upload({
                    autoUpload: false,
                    s3_object_name: self.s3Name,
                    s3_object_type: mimeType,
                    s3_sign_put_url: self.signServiceUrl,

                    onProgress: function(percent, message, publicUrl, file) {
                        self.onProgress( percent, message );
                    },

                    onFinishS3Put: function(public_url, file) {
                        delete self.xhr;
                        if( self.onUploaded ) {
                            self.onUploaded(public_url);
                        }

                        self._createAsset().done( function(data) {
                            if( data && data.error ) {
                                reject( data.error );
                            } else {
                                resolve( data );
                            }
                        }).fail( function(err) {
                            reject( [err.status, err.statusText].join(' ') );
                        } );
                    },

                    onError: function(status, file) {
                        reject( status );
                    }
                });

                s3upload.uploadFile(self.file, function( xhr ) {
                    self.xhr = xhr;
                });
            }

        });

        return promise;
    },

    /**
    * Returns the mime type of the file. Uses
    * extra mime types if the file object has not been
    * able to determine the file type.
    */
    _getFileType: function(file) {
        var extension = file.name.substr((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1).toLowerCase();

        if( this.allowed_extensions.indexOf(extension) < 0 ){
            return null;
        }

        return file.type || this.mime_types[extension];
    },

    /**
    * Default progress handler
    */
    _onProgress: function( percent ) {
        console.log("File progress: " + percent );
    },

    /**
    * Makes a POST request to createAssetUrl in order
    * to create the asset. The URL takes s3_key as a parameter
    */
    _createAsset: function() {
        var self = this;
        var url = this.createAssetUrl + "?s3_key=" + self.s3Name;
        if( this.id ) {
            url += "&id=" + this.id;
        }

        return $.ajax({
          type: "POST",
          url: url,
        });
    },

    /**
    * Cancels the current upload.
    */
    cancel: function () {
        if( this.xhr ) {
            this.xhr.abort();
            delete this.xhr;
        }
    },
};

