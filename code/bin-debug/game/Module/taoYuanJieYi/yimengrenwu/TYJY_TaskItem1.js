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
var TYJY_TaskItem1 = (function (_super) {
    __extends(TYJY_TaskItem1, _super);
    function TYJY_TaskItem1() {
        return _super.call(this) || this;
    }
    TYJY_TaskItem1.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_TaskItem1"));
    };
    TYJY_TaskItem1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    TYJY_TaskItem1.prototype.setdata = function (name, num, cs) {
        var s = this;
        s.nameLb.text = name;
        s.expBar.max = cs;
        s.expBar.value = num;
        s.expBar._titleObject.text = num + "/" + cs;
    };
    TYJY_TaskItem1.URL = "ui://m2fm2aiyvfmx16";
    return TYJY_TaskItem1;
}(fairygui.GComponent));
__reflect(TYJY_TaskItem1.prototype, "TYJY_TaskItem1");
