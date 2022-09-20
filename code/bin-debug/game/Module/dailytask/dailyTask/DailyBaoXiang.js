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
var DailyBaoXiang = (function (_super) {
    __extends(DailyBaoXiang, _super);
    function DailyBaoXiang() {
        var _this = _super.call(this) || this;
        _this.idx = 0;
        _this._st = 0;
        return _this;
    }
    DailyBaoXiang.createInstance = function () {
        return (fairygui.UIPackage.createObject("dailytask", "DailyBaoXiang"));
    };
    DailyBaoXiang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.ctr1 = this.getController("ctr1");
        this.iconBX = (this.getChild("iconBX"));
        this.iconYLQ = (this.getChild("iconYLQ"));
        this.addClickListener(this.clickHandler, this);
    };
    DailyBaoXiang.prototype.clickHandler = function (e) {
        var awards = Config.baoxiang_708[this.idx].award;
        // if (this._st == 1) GGlobal.modeltask.CG_BX_1055(this.idx);
        GGlobal.layerMgr.open(UIConst.DAILYTASKBOX, { awards: awards, idx: this.idx });
    };
    DailyBaoXiang.prototype.update = function (st) {
        this._st = st;
        this.ctr1.setSelectedIndex(st);
    };
    DailyBaoXiang.URL = "ui://b3p8szvvtw1l1";
    return DailyBaoXiang;
}(fairygui.GComponent));
__reflect(DailyBaoXiang.prototype, "DailyBaoXiang");
