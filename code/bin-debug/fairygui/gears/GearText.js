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
    var GearText = (function (_super) {
        __extends(GearText, _super);
        function GearText(owner) {
            return _super.call(this, owner) || this;
        }
        GearText.prototype.init = function () {
            this._default = this._owner.text;
            this._storage = {};
        };
        GearText.prototype.addStatus = function (pageId, buffer) {
            if (pageId == null)
                this._default = buffer.readS();
            else
                this._storage[pageId] = buffer.readS();
        };
        GearText.prototype.apply = function () {
            this._owner._gearLocked = true;
            var data = this._storage[this._controller.selectedPageId];
            if (data !== undefined)
                this._owner.text = data;
            else
                this._owner.text = this._default;
            this._owner._gearLocked = false;
        };
        GearText.prototype.updateState = function () {
            this._storage[this._controller.selectedPageId] = this._owner.text;
        };
        return GearText;
    }(fairygui.GearBase));
    fairygui.GearText = GearText;
    __reflect(GearText.prototype, "fairygui.GearText");
})(fairygui || (fairygui = {}));
