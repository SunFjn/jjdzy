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
var TYJY_TaskItem2 = (function (_super) {
    __extends(TYJY_TaskItem2, _super);
    function TYJY_TaskItem2() {
        var _this = _super.call(this) || this;
        _this.idx = 0;
        _this._st = 0;
        return _this;
    }
    TYJY_TaskItem2.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_TaskItem2"));
    };
    TYJY_TaskItem2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        this.addClickListener(this.clickHandler, this);
    };
    TYJY_TaskItem2.prototype.clickHandler = function (e) {
        if (!this.cfg)
            return;
        GGlobal.layerMgr.open(UIConst.TYJY_TASKBOX, { cfg: this.cfg, idx: this.idx });
    };
    TYJY_TaskItem2.prototype.setDate = function (index) {
        this.idx = index;
        this.title.text = (this.idx + 1) + "人完成";
    };
    TYJY_TaskItem2.prototype.update = function (st) {
        this._st = st;
        this.c1.setSelectedIndex(st);
    };
    TYJY_TaskItem2.URL = "ui://m2fm2aiyvfmx17";
    return TYJY_TaskItem2;
}(fairygui.GComponent));
__reflect(TYJY_TaskItem2.prototype, "TYJY_TaskItem2");
