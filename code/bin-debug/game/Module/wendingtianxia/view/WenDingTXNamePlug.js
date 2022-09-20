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
var WenDingTXNamePlug = (function (_super) {
    __extends(WenDingTXNamePlug, _super);
    function WenDingTXNamePlug() {
        var _this = _super.call(this) || this;
        _this.autoRemove = true;
        return _this;
    }
    WenDingTXNamePlug.create = function () {
        return WenDingTXNamePlug.POOL.length ? WenDingTXNamePlug.POOL.pop() : WenDingTXNamePlug.createInstance();
    };
    WenDingTXNamePlug.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "WenDingTXNamePlug"));
    };
    WenDingTXNamePlug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.hpbar = (this.getChild("hpbar"));
        this.nameLb = (this.getChild("nameLb"));
        this.imgYuXi = (this.getChild("imgYuXi"));
        this.jxLb = (this.getChild("jxLb"));
        this.imgFlag = (this.getChild("imgFlag"));
        this.hpbar.max = 100;
    };
    WenDingTXNamePlug.prototype.setJiFen = function (val) {
        this.jxLb.text = "击杀积分：" + val;
    };
    WenDingTXNamePlug.prototype.setHp = function (val) {
        this.hpbar.value = val;
    };
    WenDingTXNamePlug.prototype.setYuxi = function (val) {
        this.imgYuXi.visible = val;
    };
    WenDingTXNamePlug.prototype.setChaoShen = function (val) {
        var cfgs = Config.wdtxlz_260;
        var legendary = cfgs[2].reward;
        var doublkill = cfgs[1].reward;
        this.imgFlag.visible = val >= doublkill;
        this.imgFlag.url = val >= legendary ? "ui://gxs8kn67cg2io" : "ui://gxs8kn67cg2if";
        this.algin();
    };
    WenDingTXNamePlug.prototype.setName = function (val) {
        this.nameLb.text = val;
    };
    WenDingTXNamePlug.prototype.algin = function () {
        this.imgYuXi.y = this.imgFlag.visible ? -94 : -64;
    };
    WenDingTXNamePlug.prototype.update = function () {
    };
    WenDingTXNamePlug.prototype.onAdd = function () {
        this.imgYuXi.visible = false;
        this.imgFlag.visible = false;
        this.jxLb.text = "击杀积分：0";
        this.nameLb.text = this.role.name;
        this.nameLb.color = Model_player.isMineID(this.role.id) ? Color.GREENINT : Color.REDINT;
        this.setHp(100);
        this.role.headGroup.addChild(this.displayObject);
    };
    WenDingTXNamePlug.prototype.onRemove = function () {
        var a = this;
        a.role.headGroup.removeChild(a.displayObject);
        WenDingTXNamePlug.POOL.push(this);
    };
    WenDingTXNamePlug.URL = "ui://gxs8kn67fl2h3";
    WenDingTXNamePlug.POOL = [];
    return WenDingTXNamePlug;
}(fairygui.GComponent));
__reflect(WenDingTXNamePlug.prototype, "WenDingTXNamePlug");
