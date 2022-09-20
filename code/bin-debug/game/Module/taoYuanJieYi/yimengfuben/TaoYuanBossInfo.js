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
var TaoYuanBossInfo = (function (_super) {
    __extends(TaoYuanBossInfo, _super);
    function TaoYuanBossInfo() {
        return _super.call(this) || this;
    }
    TaoYuanBossInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TaoYuanBossInfo"));
    };
    TaoYuanBossInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    TaoYuanBossInfo.prototype.click = function () {
        // GGlobal.layerMgr.open(UIConst.TYBOSS_RANK);
    };
    TaoYuanBossInfo.prototype.listen = function () {
        var s = this;
        s.btn.addClickListener(s.click, s);
        GGlobal.model_TYJY.listen(Model_TYJY.msg_batInfo, s.setdata, s);
        s.resetPosition();
    };
    TaoYuanBossInfo.prototype.removeList = function () {
        var s = this;
        s.btn.removeClickListener(s.click, s);
        GGlobal.model_TYJY.remove(Model_TYJY.msg_batInfo, s.setdata, s);
    };
    TaoYuanBossInfo.show = function () {
        var s = this;
        if (!s.instance)
            s.instance = s.createInstance();
        s.instance.listen();
        GGlobal.layerMgr.UI_floorUI_1.addChild(s.instance);
    };
    TaoYuanBossInfo.hide = function () {
        var s = this;
        s.instance.removeList();
        s.instance.clearDatta();
        if (s.instance.parent)
            GGlobal.layerMgr.UI_floorUI_1.removeChild(s.instance);
    };
    TaoYuanBossInfo.prototype.setdata = function () {
        var s = this;
        var d = GGlobal.model_TYJY.battleInfo.others;
        if (d.length) {
            s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(GGlobal.model_TYJY.battleInfo.myDamage) + "               " + d[0].name + "：" + ConfigHelp.getYiWanText(d[0].demage);
        }
        else {
            s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(GGlobal.model_TYJY.battleInfo.myDamage);
        }
    };
    TaoYuanBossInfo.prototype.clearDatta = function () {
        var s = this;
        s.lbMyhurt.text = "";
    };
    TaoYuanBossInfo.prototype.resetPosition = function () {
        var s = this;
        s.setXY((fairygui.GRoot.inst.width - s.width) >> 1, 380);
    };
    TaoYuanBossInfo.URL = "ui://m2fm2aiygf441g";
    return TaoYuanBossInfo;
}(fairygui.GComponent));
__reflect(TaoYuanBossInfo.prototype, "TaoYuanBossInfo");
