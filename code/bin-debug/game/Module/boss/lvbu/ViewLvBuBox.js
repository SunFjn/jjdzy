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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewLvBuBox = (function (_super) {
    __extends(ViewLvBuBox, _super);
    function ViewLvBuBox() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        _this.loadRes();
        return _this;
    }
    ViewLvBuBox.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ViewLvBuBox"));
    };
    ViewLvBuBox.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("Boss", "ViewLvBuBox").asCom;
        this.contentPane = this.view;
        this.frame = (this.view.getChild("frame"));
        this.lbCondition = (this.view.getChild("lbCondition"));
        _super.prototype.childrenCreated.call(this);
        this.resetPosition();
    };
    ViewLvBuBox.prototype.showAward = function (awards) {
        ConfigHelp.cleanGridview(this.grids);
        this.grids = ConfigHelp.addGridview(awards, this, 132, 140, true, false, 3, 120);
        ConfigHelp.centerGrid(this.grids, 60, 140, 4, 120);
    };
    ViewLvBuBox.prototype.onShown = function () {
        var id = this._args.rank;
        this.lbCondition.text = " 排名达到第" + id + "名可领取";
        var vos = ConfigHelp.makeItemListArr(this._args.data);
        this.showAward(vos);
    };
    ViewLvBuBox.prototype.onHide = function () {
        ConfigHelp.cleanGridview(this.grids);
        GGlobal.layerMgr.close(UIConst.LVBUBOX);
    };
    ViewLvBuBox.URL = "ui://47jfyc6eqcyl12";
    return ViewLvBuBox;
}(UIModalPanel));
__reflect(ViewLvBuBox.prototype, "ViewLvBuBox");
