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
    var GearDisplay = (function (_super) {
        __extends(GearDisplay, _super);
        function GearDisplay(owner) {
            var _this = _super.call(this, owner) || this;
            _this._displayLockToken = 1;
            _this._visible = 0;
            return _this;
        }
        GearDisplay.prototype.init = function () {
            this.pages = null;
        };
        GearDisplay.prototype.apply = function () {
            this._displayLockToken++;
            if (this._displayLockToken == 0)
                this._displayLockToken = 1;
            if (this.pages == null || this.pages.length == 0
                || this.pages.indexOf(this._controller.selectedPageId) != -1)
                this._visible = 1;
            else
                this._visible = 0;
        };
        GearDisplay.prototype.addLock = function () {
            this._visible++;
            return this._displayLockToken;
        };
        GearDisplay.prototype.releaseLock = function (token) {
            if (token == this._displayLockToken)
                this._visible--;
        };
        Object.defineProperty(GearDisplay.prototype, "connected", {
            get: function () {
                return this._controller == null || this._visible > 0;
            },
            enumerable: true,
            configurable: true
        });
        return GearDisplay;
    }(fairygui.GearBase));
    fairygui.GearDisplay = GearDisplay;
    __reflect(GearDisplay.prototype, "fairygui.GearDisplay");
})(fairygui || (fairygui = {}));
