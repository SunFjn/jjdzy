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
var WenDingTXStatePlug = (function (_super) {
    __extends(WenDingTXStatePlug, _super);
    function WenDingTXStatePlug() {
        var _this = _super.call(this) || this;
        _this.autoRemove = true;
        return _this;
    }
    WenDingTXStatePlug.create = function (role) {
        var ret = WenDingTXStatePlug.POOL.length ? WenDingTXStatePlug.POOL.pop() : WenDingTXStatePlug.createInstance();
        ret.role = role;
        return ret;
    };
    WenDingTXStatePlug.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "WenDingTXStatePlug"));
    };
    WenDingTXStatePlug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n2 = (this.getChild("n2"));
    };
    //B:玩家状态 0默认 1死亡 2战斗
    WenDingTXStatePlug.prototype.setState = function (val) {
        if (val == 1)
            this.n2.url = "ui://gxs8kn67cg2ij";
        else if (val == 2)
            this.n2.url = "ui://gxs8kn67cg2ik";
    };
    WenDingTXStatePlug.prototype.update = function () {
    };
    WenDingTXStatePlug.prototype.onAdd = function () {
        this.setXY(-70, 40);
        this.role.headGroup.addChild(this.displayObject);
    };
    WenDingTXStatePlug.prototype.onRemove = function () {
        var a = this;
        a.role.headGroup.removeChild(a.displayObject);
        WenDingTXStatePlug.POOL.push(this);
    };
    WenDingTXStatePlug.URL = "ui://gxs8kn67fl2h2";
    WenDingTXStatePlug.POOL = [];
    return WenDingTXStatePlug;
}(fairygui.GComponent));
__reflect(WenDingTXStatePlug.prototype, "WenDingTXStatePlug");
