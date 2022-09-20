var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Handler = (function () {
    function Handler(caller, method, args, once) {
        if (args === void 0) { args = null; }
        if (once === void 0) { once = false; }
        this.once = false;
        this.once = false;
        this._id = 0;
        this.setTo(caller, method, args, once);
    }
    Handler.create = function (caller, method, args, once) {
        if (args === void 0) { args = null; }
        if (once === void 0) { once = false; }
        if (this.POOL.length) {
            return this.POOL.pop().setTo(caller, method, args, once);
        }
        else {
            return new Handler(caller, method, args, once);
        }
    };
    Handler.prototype.setTo = function (caller, method, args, once) {
        if (args === void 0) { args = null; }
        if (once === void 0) { once = false; }
        this._id = Handler._gid++;
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = once;
        return this;
    };
    Handler.prototype.run = function () {
        if (this.method == null) {
            return null;
        }
        var id = this._id;
        var result = this.method.apply(this.caller, this.args);
        if (this._id === id && this.once) {
            this.recover();
        }
        return result;
    };
    Handler.prototype.runWith = function (data) {
        if (this.method == null) {
            return null;
        }
        var id = this._id;
        if (data == null) {
            var result = this.method.apply(this.caller, this.args);
        }
        else if (!this.args && !data.unshift) {
            result = this.method.call(this.caller, data);
        }
        else if (this.args) {
            result = this.method.apply(this.caller, this.args.concat(data));
        }
        else {
            result = this.method.call(this.caller, data);
        }
        if (this._id === id && this.once) {
            this.recover();
        }
        return result;
    };
    Handler.prototype.clear = function () {
        this.caller = null;
        this.method = null;
        this.args = null;
        return this;
    };
    /**
    *清理并回收到 Handler 对象池内。
    */
    Handler.prototype.recover = function () {
        if (this._id > 0) {
            this._id = 0;
            Handler.POOL.push(this.clear());
        }
    };
    Handler.POOL = [];
    Handler._gid = 1;
    return Handler;
}());
__reflect(Handler.prototype, "Handler");
