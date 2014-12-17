pc.extend(pc.common, function () {
    
    var Undoable = function (options) {
        this.name = options.name;
        this.redo = options.redo;
        this.undo = options.undo;
        this.async = options.async;
        this.manager = null; // set when executed
    };
    
    Undoable.prototype.complete = function () {
        this.manager.fire("complete", this)
    };
    
    
    var UndoManager = function () {
        this.dids = [];
        this.undids = [];
        this.enabled = true;
        
        this.executing = null; // cmd that is currently being executed
        this.doing = null; // cmd that is currently being re/undone
        pc.extend(this, pc.events);
        
        this.bind("complete", this._onComplete);
    };
    
    
    UndoManager.prototype.disable = function () {
        this.enabled = false;
    };
    
    UndoManager.prototype.enable = function () {
        this.enabled = true;
    };
    
    UndoManager.prototype.isEnabled = function () {
        return this.enabled;
    };
    
    UndoManager.prototype.setEnabled = function(enable) {
        this.enabled = enable;
    };
    
    /**
     * Returns true if there is anything in the undo stack
     */
    UndoManager.prototype.canUndo = function() {
        return (this.dids.length > 0);
    }
    
    /**
     * Returns true if there is anything in the redo stack
     */
    UndoManager.prototype.canRedo = function() {
        return (this.undids.length > 0);
    }
    
    UndoManager.prototype.execute = function (cmd) {
        var last;
        var _cmd;
        
        cmd.manager = this;

        if(this.isEnabled()) {
            if(this.dids.length) {
                last = this.dids[this.dids.length-1];
                // If last cmd name is the same then merge them together
                if(cmd.name == last.name) {
                    if(this.executing) {
                        throw new Error("Calling Undoable from itself will lead to infinite loop");
                    }
                    this.dids.pop();
                    // undo function should return to previous state of first cmd
                    cmd.undo = last.undo;
                    this.dids.push(cmd);
                // If we're already executing a command then merge them together
                } else if(this.executing) {
                    last = this.dids.pop();
                    _cmd = new pc.common.Undoable({
                        name: last.name + "->" + cmd.name,
                        redo: function () {
                            var count = 0;
                            if(last.async) {
                                count++;
                            }
                            if(cmd.async) {
                                count++;
                            }
                            cmd.success = last.success = pc.callback(this, function () {
                                count--;
                                if(count == 0) {
                                    this.complete();
                                }
                            });
                            
                            last.redo();
                            cmd.redo();
                        },
                        undo: function () {
                            var count = 0;
                            if(last.async) {
                                count++;
                            }
                            if(cmd.async) {
                                count++;
                            }
                            cmd.success = last.success = pc.callback(this, function () {
                                count--;
                                if(count == 0) {
                                    this.complete();
                                }
                            });
                            
                            cmd.undo();
                            last.undo();
                        },
                        async: last.async || cmd.async
                    });
                    _cmd.manager = this;
                    this.dids.push(_cmd);
                } else {
                    this.dids.push(cmd);
                }
            } else {
                this.dids.push(cmd);                
            }
            
            this.undids = [];
        }
        
        if(!this.executing) {
            this.executing = cmd;
        }
        
        cmd.redo();
    
        if(!cmd.async) {
            this.fire("complete", cmd);
        }
    };
    
    
    UndoManager.prototype.undo = function (success) {
        if(this.executing) {
            throw new Error("Can't undo while executing.");
        }

        this.disable();
        var cmd = this.dids.pop();
        cmd.success = success;
        this.doing = cmd;
        
        try {
            cmd.undo();
        } catch(e) {
            logERROR(e);
        }
        
        this.undids.push(cmd);
        if(!cmd.async) {
            this.fire("complete", cmd);
        }
    };
    
    UndoManager.prototype.redo = function (success) {
        if(this.executing) {
            throw new Error("Can't redo while executing.");
        }
        this.disable();
        
        var cmd = this.undids.pop();
        cmd.success = success;
        this.doing = cmd;
        
        try {
            cmd.redo();
        } catch(e) {
            logERROR(e);
        }
        
        this.dids.push(cmd);
        if(!cmd.async) {
            this.fire("complete", cmd);
        }
    };
    
    UndoManager.prototype._onComplete = function (cmd) {
        if(cmd === this.executing) {
            this.executing = null;
        }
        if(cmd == this.doing) {
            this.enable();
            this.doing = null;
        }
        if(cmd.success) {
            cmd.success();
            delete cmd.success;
        }
        
    };

    return {
        Undoable: Undoable,
        UndoManager: UndoManager
    };
    
}());
