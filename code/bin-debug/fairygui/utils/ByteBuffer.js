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
var fairygui;
(function (fairygui) {
    var ByteBuffer = (function (_super) {
        __extends(ByteBuffer, _super);
        function ByteBuffer(buffer, bufferExtSize) {
            var _this = _super.call(this, buffer, bufferExtSize) || this;
            _this.stringTable = null;
            _this.version = 0;
            return _this;
        }
        ByteBuffer.prototype.skip = function (count) {
            this.position += count;
        };
        ByteBuffer.prototype.readBool = function () {
            return this.readByte() == 1;
        };
        ByteBuffer.prototype.readS = function () {
            var index = this.readUnsignedShort();
            if (index == 65534)
                return null;
            else if (index == 65533)
                return "";
            else
                return this.stringTable[index];
        };
        ByteBuffer.prototype.writeS = function (value) {
            var index = this.readUnsignedShort();
            if (index != 65534 && index != 65533)
                this.stringTable[index] = value;
        };
        ByteBuffer.prototype.readColor = function (hasAlpha) {
            if (hasAlpha === void 0) { hasAlpha = false; }
            var r = this.readUnsignedByte();
            var g = this.readUnsignedByte();
            var b = this.readUnsignedByte();
            var a = this.readUnsignedByte();
            return (hasAlpha ? (a << 24) : 0) + (r << 16) + (g << 8) + b;
        };
        ByteBuffer.prototype.readChar = function () {
            var i = this.readUnsignedShort();
            return String.fromCharCode(i);
        };
        ByteBuffer.prototype.readBuffer = function () {
            var count = this.readUnsignedInt();
            var ba = new ByteBuffer(new Uint8Array(this.buffer, this.position, count));
            ba.stringTable = this.stringTable;
            ba.version = this.version;
            return ba;
        };
        ByteBuffer.prototype.seek = function (indexTablePos, blockIndex) {
            var tmp = this.position;
            this.position = indexTablePos;
            var segCount = this.readByte();
            if (blockIndex < segCount) {
                var useShort = this.readByte() == 1;
                var newPos;
                if (useShort) {
                    this.position += 2 * blockIndex;
                    newPos = this.readUnsignedShort();
                }
                else {
                    this.position += 4 * blockIndex;
                    newPos = this.readUnsignedInt();
                }
                if (newPos > 0) {
                    this.position = indexTablePos + newPos;
                    return true;
                }
                else {
                    this.position = tmp;
                    return false;
                }
            }
            else {
                this.position = tmp;
                return false;
            }
        };
        return ByteBuffer;
    }(egret.ByteArray));
    fairygui.ByteBuffer = ByteBuffer;
    __reflect(ByteBuffer.prototype, "fairygui.ByteBuffer");
})(fairygui || (fairygui = {}));
