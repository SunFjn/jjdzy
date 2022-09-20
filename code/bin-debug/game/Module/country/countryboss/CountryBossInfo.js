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
var CountryBossInfo = (function (_super) {
    __extends(CountryBossInfo, _super);
    function CountryBossInfo() {
        return _super.call(this) || this;
    }
    CountryBossInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "CountryBossInfo"));
    };
    CountryBossInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbMyhurt = (this.getChild("lbMyhurt"));
        this.btn = (this.getChild("btn"));
    };
    CountryBossInfo.prototype.click = function () {
        GGlobal.layerMgr.open(UIConst.COUNTRYBOSS_RANK1);
    };
    CountryBossInfo.prototype.listen = function () {
        var s = this;
        s.btn.addClickListener(s.click, s);
        GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_batInfo, s.setdata, s);
        s.resetPosition();
    };
    CountryBossInfo.prototype.removeList = function () {
        var s = this;
        s.btn.removeClickListener(s.click, s);
        GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_batInfo, s.setdata, s);
    };
    CountryBossInfo.show = function () {
        var s = this;
        if (!s.instance)
            s.instance = s.createInstance();
        s.instance.listen();
        GGlobal.layerMgr.UI_floorUI_1.addChild(s.instance);
    };
    CountryBossInfo.hide = function () {
        var s = this;
        s.instance.removeList();
        s.instance.clearDatta();
        if (s.instance.parent)
            GGlobal.layerMgr.UI_floorUI_1.removeChild(s.instance);
    };
    CountryBossInfo.prototype.setdata = function () {
        var s = this;
        var d = GGlobal.modelCtryBoss.battleInfo.others;
        if (d.length) {
            s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(GGlobal.modelCtryBoss.battleInfo.myDamage) + "               " + d[0].name + "：" + ConfigHelp.getYiWanText(d[0].demage);
        }
        else {
            s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(GGlobal.modelCtryBoss.battleInfo.myDamage);
        }
    };
    CountryBossInfo.prototype.clearDatta = function () {
        var s = this;
        s.lbMyhurt.text = "";
    };
    CountryBossInfo.prototype.resetPosition = function () {
        var s = this;
        s.setXY((fairygui.GRoot.inst.width - s.width) >> 1, 380);
    };
    CountryBossInfo.URL = "ui://uwzc58njofde2k";
    return CountryBossInfo;
}(fairygui.GComponent));
__reflect(CountryBossInfo.prototype, "CountryBossInfo");
