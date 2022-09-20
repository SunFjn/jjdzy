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
var VActTalentGoalItem = (function (_super) {
    __extends(VActTalentGoalItem, _super);
    function VActTalentGoalItem() {
        return _super.call(this) || this;
    }
    VActTalentGoalItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actTalentGoal", "VActTalentGoalItem"));
    };
    VActTalentGoalItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.itemRenderer = s.renderHandle;
        s.list.callbackThisObj = s;
        s.btnGet.addClickListener(s.onClickGet, s);
        s.btnRec.addClickListener(s.onClickRec, s);
    };
    VActTalentGoalItem.prototype.setVo = function (v, hid) {
        var s = this;
        s._vo = v;
        s._hid = hid;
        var colorStr;
        var model = GGlobal.modelActTalent;
        s.btnRec.text = "前往";
        s._cfg = Config.lffwtfmb_285[v.id];
        colorStr = v.canCt >= s._cfg.c1 ? Color.GREENSTR : Color.REDSTR;
        s._status = v ? v.status : 0;
        if (v.hasCt == 1) {
            s.lab.text = "拥有" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + s._cfg.c1 + ")", colorStr) + "个" + s._cfg.c2 + "级天赋装备";
        }
        else if (v.hasCt == 2) {
            s.lab.text = "拥有" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + s._cfg.c1 + ")", colorStr) + "个" + Color.getColorName(s._cfg.c2) + "品天赋装备";
        }
        else if (v.hasCt == 3) {
            s.lab.text = "天赋总等级达到" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + s._cfg.c1 + ")", colorStr) + "级";
        }
        else if (v.hasCt == 4) {
            s.lab.text = "天赋总战力达到" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + s._cfg.c1 + ")", colorStr);
        }
        if (s._status == 0) {
            s.btnGet.touchable = s.btnGet.visible = false;
            s.btnRec.touchable = s.btnRec.visible = true;
            s.imgGet.visible = false;
        }
        else if (s._status == 1) {
            s.btnGet.checkNotice = s.btnGet.touchable = s.btnGet.visible = true;
            s.btnRec.touchable = s.btnRec.visible = false;
            s.imgGet.visible = false;
        }
        else if (s._status == 2) {
            s.btnGet.touchable = s.btnGet.visible = false;
            s.btnRec.touchable = s.btnRec.visible = false;
            s.imgGet.visible = true;
        }
        else {
            s.btnGet.touchable = s.btnGet.visible = false;
            s.btnRec.touchable = s.btnRec.visible = false;
            s.imgGet.visible = false;
        }
        s._listData = null;
        //奖励显示
        s._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(s._cfg.reward));
        s.list.numItems = s._listData ? s._listData.length : 0;
    };
    VActTalentGoalItem.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    VActTalentGoalItem.prototype.onClickGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        GGlobal.modelActTalent.CG_GOAL_GET9401(this._vo.hasCt, this._vo.id);
    };
    VActTalentGoalItem.prototype.onClickRec = function (e) {
        GGlobal.layerMgr.open(this._cfg.open);
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    VActTalentGoalItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VActTalentGoalItem.URL = "ui://ss8kd9acoiu12";
    return VActTalentGoalItem;
}(fairygui.GComponent));
__reflect(VActTalentGoalItem.prototype, "VActTalentGoalItem");
