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
var Child_ActTalent = (function (_super) {
    __extends(Child_ActTalent, _super);
    function Child_ActTalent() {
        return _super.call(this) || this;
    }
    Child_ActTalent.createInstance = function () {
        return (fairygui.UIPackage.createObject("actTalent", "Child_ActTalent"));
    };
    Child_ActTalent.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActTalent.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(VActTalentItem.URL, VActTalentItem);
    };
    Child_ActTalent.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
    };
    Child_ActTalent.prototype.openPanel = function (pData) {
        var s = this;
        s.y = 257;
        s._act = pData;
        Timer.instance.listen(s.upTimer, s);
        if (s._act.id == UIConst.ACTCOM_TALENT) {
            IconUtil.setImg(s.imgHeadbg, Enum_Path.ACTCOM_URL + "7501_bg.jpg");
            GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XILIAN, s.upList, s);
            s.labTips.text = "修炼天赋达到指定次数可领取奖励";
        }
        else if (s._act.id == UIConst.YUNCHOUWEIWO_JLMJ) {
            IconUtil.setImg(s.imgHeadbg, Enum_Path.ACTCOM_URL + "7712_bg.jpg");
            GGlobal.control.listen(UIConst.YUNCHOUWEIWO_JLMJ, s.upList, s);
            s.labTips.text = "修炼天赋达到指定次数可领取奖励";
        }
        GGlobal.modelEightLock.CG4571(s._act.id);
        s.upList();
    };
    Child_ActTalent.prototype.closePanel = function (pData) {
        var s = this;
        s.list.numItems = 0;
        Timer.instance.remove(s.upTimer, s);
        IconUtil.setImg(s.imgHeadbg, null);
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XILIAN, s.upList, s);
        GGlobal.control.remove(UIConst.YUNCHOUWEIWO_JLMJ, s.upList, s);
    };
    Child_ActTalent.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActTalent.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.setVo(s._listData[index], s._act.id);
    };
    Child_ActTalent.prototype.upTimer = function () {
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
    Child_ActTalent.prototype.upList = function () {
        var s = this;
        var model = GGlobal.modelActTalent;
        // this._listData = Model_HuoDong.getListData(model.xlArr);
        if (s._act.id == UIConst.ACTCOM_TALENT) {
            this._listData = Model_HuoDong.getListData(model.xlArr);
        }
        else {
            this._listData = Model_HuoDong.getListData(model.jlmjArr);
        }
        s.list.numItems = s._listData ? s._listData.length : 0;
        if (s.list.numItems > 0) {
            s.list.scrollToView(0);
        }
        s.upTimer();
    };
    Child_ActTalent.URL = "ui://smvxlnhhewuk0";
    Child_ActTalent.pkg = "actTalent";
    return Child_ActTalent;
}(fairygui.GComponent));
__reflect(Child_ActTalent.prototype, "Child_ActTalent", ["IPanel"]);
