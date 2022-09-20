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
var Child_ActCom_LJFL = (function (_super) {
    __extends(Child_ActCom_LJFL, _super);
    function Child_ActCom_LJFL() {
        return _super.call(this) || this;
    }
    Child_ActCom_LJFL.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCom_LJFL", "Child_ActCom_LJFL"));
    };
    Child_ActCom_LJFL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActCom_LJFL.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Item_ActCom_LJFL.URL, Item_ActCom_LJFL);
    };
    Child_ActCom_LJFL.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        s.list.setVirtual();
        s.lab.text = HtmlUtil.createLink("活动规则", true, "");
    };
    Child_ActCom_LJFL.prototype.openPanel = function (pData) {
        var s = this;
        s.y = 257;
        s._act = pData;
        GGlobal.modelActivity.CG_OPENACT(s._act.id);
        IconUtil.setImg(s.imgBg, Enum_Path.ACTCOM_URL + "ljfl.jpg");
        Timer.instance.listen(s.upTimer, s, 1000);
        s.registerEvent(true);
    };
    Child_ActCom_LJFL.prototype.closePanel = function (pData) {
        var s = this;
        s.list.numItems = 0;
        IconUtil.setImg(s.imgBg, null);
        Timer.instance.remove(s.upTimer, s);
        s.registerEvent(false);
    };
    Child_ActCom_LJFL.prototype.registerEvent = function (pFlag) {
        var s = this;
        var m = GGlobal.model_ActLJFL;
        m.register(pFlag, Model_ActComLJFL.OPENUI, s.upView, s);
        EventUtil.register(pFlag, s.lab, egret.TextEvent.LINK, s.openExplain, s);
    };
    Child_ActCom_LJFL.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActCom_LJFL.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.setVo(s._listData[index], s._flag);
    };
    Child_ActCom_LJFL.prototype.upTimer = function () {
        var s = this;
        var end = s._act ? s._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            s.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            s.labTime.text = "00:00:00";
        }
        var flag = end - servTime - 86400;
        if (flag > 0) {
            s.lbAct.text = DateUtil.getMSBySecond4(end - servTime - 86400) + "后可充值激活";
        }
        else {
            s.lbAct.text = "充值激活奖励";
        }
        if (flag > -1 && flag < 1) {
            s.upView();
        }
    };
    Child_ActCom_LJFL.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_ActLJFL;
        //时间
        var end = s._act ? s._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        s._flag = end - servTime - 86400 <= 0;
        //排序
        // let arr0 = []
        // let arr1 = []
        // let arr2 = []
        // for (let i = 0; i < m.datArr.length; i++) {
        // 	let v = m.datArr[i];
        // 	if (v.st == 1) {
        // 		arr1.push(v);
        // 	}
        // 	else if (v.st == 2) {
        // 		arr2.push(v);
        // 	}
        // 	else {
        // 		arr0.push(v);
        // 	}
        // }
        // s._listData = arr1.concat(arr0).concat(arr2);
        s._listData = m.datArr;
        s.list.numItems = s._listData.length;
        if (s._listData.length > 0) {
            s.list.scrollToView(0);
        }
    };
    Child_ActCom_LJFL.prototype.openExplain = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_LJFL);
    };
    Child_ActCom_LJFL.URL = "ui://y35rlqhydufs0";
    Child_ActCom_LJFL.pkg = "actCom_LJFL";
    return Child_ActCom_LJFL;
}(fairygui.GComponent));
__reflect(Child_ActCom_LJFL.prototype, "Child_ActCom_LJFL");
