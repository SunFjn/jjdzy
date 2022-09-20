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
var VActHolyBGrid = (function (_super) {
    __extends(VActHolyBGrid, _super);
    function VActHolyBGrid() {
        return _super.call(this) || this;
    }
    VActHolyBGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "VActHolyBGrid"));
    };
    VActHolyBGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
    };
    Object.defineProperty(VActHolyBGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            if (v == null) {
                this.grid.visible = false;
                this._vo = null;
            }
            else {
                this.grid.tipEnabled = true;
                this.grid.isShowEff = true;
                this.grid.vo = ConfigHelp.makeItem(v);
                this.grid.visible = true;
                this._vo = this.grid.vo;
            }
        },
        enumerable: true,
        configurable: true
    });
    VActHolyBGrid.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.grid.clean();
    };
    VActHolyBGrid.URL = "ui://4aepcdbwwg9y4p";
    return VActHolyBGrid;
}(fairygui.GComponent));
__reflect(VActHolyBGrid.prototype, "VActHolyBGrid");
