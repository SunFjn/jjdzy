var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var TweenValue = (function () {
        function TweenValue() {
            this.x = this.y = this.z = this.w = 0;
        }
        Object.defineProperty(TweenValue.prototype, "color", {
            get: function () {
                return (this.w << 24) + (this.x << 16) + (this.y << 8) + this.z;
            },
            set: function (value) {
                this.x = (value & 0xFF0000) >> 16;
                this.y = (value & 0x00FF00) >> 8;
                this.z = (value & 0x0000FF);
                this.w = (value & 0xFF000000) >> 24;
            },
            enumerable: true,
            configurable: true
        });
        TweenValue.prototype.getField = function (index) {
            switch (index) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw new Error("Index out of bounds: " + index);
            }
        };
        TweenValue.prototype.setField = function (index, value) {
            switch (index) {
                case 0:
                    this.x = value;
                    break;
                case 1:
                    this.y = value;
                    break;
                case 2:
                    this.z = value;
                    break;
                case 3:
                    this.w = value;
                    break;
                default:
                    throw new Error("Index out of bounds: " + index);
            }
        };
        TweenValue.prototype.setZero = function () {
            this.x = this.y = this.z = this.w = 0;
        };
        return TweenValue;
    }());
    fairygui.TweenValue = TweenValue;
    __reflect(TweenValue.prototype, "fairygui.TweenValue");
})(fairygui || (fairygui = {}));
