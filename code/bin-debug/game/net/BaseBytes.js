var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BaseBytes = (function (_super) {
    __extends(BaseBytes, _super);
    function BaseBytes(buffer, bufferExtSize) {
        return _super.call(this, buffer, bufferExtSize) || this;
    }
    /** js 最大只能表示 2^53 的整数 */
    BaseBytes.prototype.writeLong = function (v) {
        v = parseInt(v.toString(), 10);
        this.writeDouble(v);
    };
    BaseBytes.prototype.readDouble = function () {
        throw (new Error("use readLong"));
    };
    BaseBytes.prototype.readLong = function () {
        var double = _super.prototype.readDouble.call(this);
        return double;
    };
    //return [] or [[],[]]
    BaseBytes.prototype.readFmt = function (format, ret) {
        if (ret === void 0) { ret = null; }
        if (!ret) {
            ret = [];
        }
        for (var i = 0; i < format.length; i++) {
            var t = format[i];
            if (t === "B") {
                ret[i] = this.readByte();
            }
            else if (t === "I") {
                ret[i] = this.readInt();
            }
            else if (t === "L") {
                ret[i] = this.readLong();
            }
            else if (t === "S") {
                ret[i] = this.readShort();
            }
            else if (t === "U") {
                ret[i] = this.readUTF();
            }
            else if (t === "J") {
                ret[i] = JSON.parse(this.readUTF());
            }
            else {
                var len = this.readShort();
                var arr = ret[i] = [];
                for (var ii = 0; ii < len; ii++) {
                    arr[ii] = this.readFmt(t);
                }
            }
        }
        return ret;
    };
    return BaseBytes;
}(egret.ByteArray));
__reflect(BaseBytes.prototype, "BaseBytes");
