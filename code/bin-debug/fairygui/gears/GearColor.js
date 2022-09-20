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
    var GearColor = (function (_super) {
        __extends(GearColor, _super);
        function GearColor(owner) {
            return _super.call(this, owner) || this;
        }
        GearColor.prototype.init = function () {
            if (this._owner["strokeColor"] != undefined)
                this._default = new fairygui.GearColorValue(this._owner.color, this._owner.strokeColor);
            else
                this._default = new fairygui.GearColorValue(this._owner.color);
            this._storage = {};
        };
        GearColor.prototype.addStatus = function (pageId, buffer) {
            var gv;
            if (pageId == null)
                gv = this._default;
            else {
                gv = new fairygui.GearColorValue();
                this._storage[pageId] = gv;
            }
            gv.color = buffer.readColor();
            gv.strokeColor = buffer.readColor();
        };
        GearColor.prototype.apply = function () {
            this._owner._gearLocked = true;
            var gv = this._storage[this._controller.selectedPageId];
            if (!gv)
                gv = this._default;
            this._owner.color = gv.color;
            if (this._owner["strokeColor"] != undefined && !isNaN(gv.strokeColor))
                this._owner.strokeColor = gv.strokeColor;
            this._owner._gearLocked = false;
        };
        GearColor.prototype.updateState = function () {
            var gv = this._storage[this._controller.selectedPageId];
            if (!gv) {
                gv = new fairygui.GearColorValue(null, null);
                this._storage[this._controller.selectedPageId] = gv;
            }
            gv.color = this._owner.color;
            if (this._owner["strokeColor"] != undefined)
                gv.strokeColor = this._owner.strokeColor;
        };
        return GearColor;
    }(fairygui.GearBase));
    fairygui.GearColor = GearColor;
    __reflect(GearColor.prototype, "fairygui.GearColor");
})(fairygui || (fairygui = {}));
