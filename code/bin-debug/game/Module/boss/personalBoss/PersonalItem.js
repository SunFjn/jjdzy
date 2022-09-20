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
var PersonalItem = (function (_super) {
    __extends(PersonalItem, _super);
    function PersonalItem() {
        var _this = _super.call(this) || this;
        _this._lastTime = 0;
        _this.grids = [];
        _this.needRefresh = false;
        return _this;
    }
    PersonalItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "PersonalItem"));
    };
    PersonalItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btnFight.addClickListener(s.fightHandler, s);
        s.com = new fairygui.GComponent();
        s.com.setScale(0.8, 0.8);
        this.addChildAt(s.com, this.numChildren - 6);
    };
    PersonalItem.prototype.fightHandler = function () {
        var now = egret.getTimer();
        if (now - this._lastTime < 1000) {
            return;
        }
        this._lastTime = now;
        var m = GGlobal.modelBoss;
        if (GGlobal.modelGuanQia.challBossWithCond()) {
            m.CG_FIGHT_1253(this._vo.id);
        }
    };
    PersonalItem.prototype.clean = function () {
        ConfigHelp.cleanGridview(this.grids);
    };
    PersonalItem.prototype.setData = function (vo) {
        var s = this;
        s._vo = vo;
        var lvs = vo.condition[0] > 0 ? vo.condition[0] + "级" : ((vo.condition[1] / 1000) >> 0) + "转";
        var npc = Config.NPC_200[vo.bossid];
        s.head.ng.visible = false;
        s.head.setdata(RoleUtil.getHeadImg(npc.head + ""), -1, lvs, 0, true);
        if (vo.count > 0) {
            s.btnFight.enabled = true;
            s.lbCount.text = "剩余次数：<font color='" + Color.GREENSTR + "'>" + vo.count;
        }
        else {
            s.btnFight.enabled = false;
            s.lbCount.text = "剩余次数：<font color='" + Color.REDSTR + "'>" + vo.count;
        }
        var gkcfg = Config.solo_220[vo.id];
        var awards = JSON.parse(gkcfg.reward);
        var vos = ConfigHelp.makeItemListArr(awards);
        ConfigHelp.cleanGridview(s.grids);
        s.grids = ConfigHelp.addGridview(vos, this.com, 200, 60, true, false);
        var hasActi = vo.isActi();
        var has = vo.isRefresh();
        s.btnFight.visible = true;
        s.btnFight.checkNotice = false;
        if (hasActi) {
            s.lbTip.visible = false;
            s.g0.visible = false;
            if (has) {
                s.lbTime.visible = false;
            }
            else {
                s.lbTime.visible = true;
                s.lbTime.text = "";
            }
            s.btnFight.checkNotice = vo.count > 0;
        }
        else {
            var tips = void 0;
            if (vo.condition[0] > 0)
                tips = vo.condition[0] + "级开启";
            else
                tips = ((vo.condition[1] / 1000) >> 0) + "转开启";
            s.g0.visible = true;
            s.lbTip.text = tips;
            s.lbTip.visible = true;
        }
        s.com.touchable = s.btnFight.enabled = !s.g0.visible;
        s.needRefresh = hasActi && !has;
        this.updateTime();
        var act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
        this.imgDoub.visible = (act != null);
    };
    PersonalItem.prototype.updateTime = function () {
        var s = this;
        s.timeGroup.visible = false;
        s.btnFight.visible = true;
        if (!s.needRefresh)
            return;
        var te = s._vo.rebornTime - egret.getTimer();
        var b = te > 0;
        s.timeGroup.visible = b && s._vo.count > 0;
        s.btnFight.visible = !s.timeGroup.visible;
        if (b) {
            s.lbTime.color = Color.REDINT;
            s.lbTime.text = TimeUitl.getRemainingTime(te, 0, { minute: "分", second: "秒" });
        }
        else {
            s.lbTime.text = "";
            s.setData(s._vo);
        }
    };
    PersonalItem.URL = "ui://47jfyc6etujy1";
    return PersonalItem;
}(fairygui.GComponent));
__reflect(PersonalItem.prototype, "PersonalItem");
