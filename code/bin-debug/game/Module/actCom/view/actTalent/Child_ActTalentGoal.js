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
var Child_ActTalentGoal = (function (_super) {
    __extends(Child_ActTalentGoal, _super);
    function Child_ActTalentGoal() {
        return _super.call(this) || this;
    }
    Child_ActTalentGoal.createInstance = function () {
        return (fairygui.UIPackage.createObject("actTalentGoal", "Child_ActTalentGoal"));
    };
    Child_ActTalentGoal.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s._tabArr = [];
        for (var i = 0; i < 4; i++) {
            s._tabArr.push((this.getChild("tab" + i)));
        }
    };
    Child_ActTalentGoal.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(VActTalentGoalItem.URL, VActTalentGoalItem);
    };
    Child_ActTalentGoal.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
    };
    Child_ActTalentGoal.prototype.openPanel = function (pData) {
        var s = this;
        s.y = 257;
        s._act = pData;
        Timer.instance.listen(s.upTimer, s);
        IconUtil.setImg(s.imgHeadbg, Enum_Path.ACTCOM_URL + "7502_bg.jpg");
        s.c1.selectedIndex = 0;
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selHandle, s);
        s.upView();
        s.checkTab();
        GGlobal.reddot.listen(UIConst.ACTCOM_TAL, s.checkTab, s);
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_MUBIAO, s.upView, s);
        GGlobal.modelEightLock.CG4571(s._act.id);
    };
    Child_ActTalentGoal.prototype.closePanel = function (pData) {
        var s = this;
        s.list.numItems = 0;
        Timer.instance.remove(s.upTimer, s);
        IconUtil.setImg(s.imgHeadbg, null);
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, s.selHandle, s);
        GGlobal.reddot.remove(UIConst.ACTCOM_TAL, s.checkTab, s);
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_MUBIAO, s.upView, s);
    };
    Child_ActTalentGoal.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActTalentGoal.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.setVo(s._listData[index], s._act.id);
    };
    Child_ActTalentGoal.prototype.upTimer = function () {
        var s = this;
        var end = s._act ? s._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            s.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            s.labTime.text = "00:00:00";
        }
    };
    Child_ActTalentGoal.prototype.selHandle = function () {
        this.upList();
    };
    Child_ActTalentGoal.prototype.upList = function () {
        var s = this;
        var model = GGlobal.modelActTalent;
        var index = s.c1.selectedIndex;
        s._listData = Model_HuoDong.getListData(model.muBObj[index + 1]);
        s.list.numItems = s._listData ? s._listData.length : 0;
        if (s.list.numItems > 0) {
            s.list.scrollToView(0);
        }
    };
    Child_ActTalentGoal.prototype.upView = function () {
        var s = this;
        s.upTimer();
        s.upList();
    };
    Child_ActTalentGoal.prototype.checkTab = function () {
        var s = this;
        for (var i = 0; i < s._tabArr.length; i++) {
            var btn = s._tabArr[i];
            var red = GGlobal.reddot.checkCondition(UIConst.ACTCOM_TALENT_GOAL, i + 1);
            btn.checkNotice = red;
        }
    };
    Child_ActTalentGoal.URL = "ui://ss8kd9acewuk1";
    Child_ActTalentGoal.pkg = "actTalentGoal";
    return Child_ActTalentGoal;
}(fairygui.GComponent));
__reflect(Child_ActTalentGoal.prototype, "Child_ActTalentGoal", ["IPanel"]);
