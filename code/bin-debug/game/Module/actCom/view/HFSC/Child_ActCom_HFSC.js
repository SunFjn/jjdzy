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
var Child_ActCom_HFSC = (function (_super) {
    __extends(Child_ActCom_HFSC, _super);
    function Child_ActCom_HFSC() {
        var _this = _super.call(this) || this;
        _this.listData = [];
        return _this;
    }
    Child_ActCom_HFSC.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_HFSC", "Child_ActCom_HFSC"));
    };
    Child_ActCom_HFSC.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    Child_ActCom_HFSC.prototype.initView = function (pParent) {
    };
    Child_ActCom_HFSC.prototype.renderHandler = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.listData[index];
    };
    Child_ActCom_HFSC.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelhfsc;
        var cfg = Config.hfkhhfsc_286[self.c1.selectedIndex + 1];
        self.listData = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self.listData.length;
        self.tab0.getChild("noticeImg").visible = model.scData[0] == 1;
        self.tab1.getChild("noticeImg").visible = model.scData[1] == 1;
        switch (model.scData[self.c1.selectedIndex]) {
            case 0:
                self.drawBt.text = "充点小钱";
                self.drawBt.visible = true;
                self.drawImg.visible = false;
                break;
            case 1:
                self.drawBt.text = "领取";
                self.drawBt.visible = true;
                self.drawBt.checkNotice = true;
                self.drawImg.visible = false;
                break;
            case 2:
                self.drawBt.visible = false;
                self.drawImg.visible = true;
                break;
        }
    };
    Child_ActCom_HFSC.prototype.OnDraw = function () {
        var self = this;
        var model = GGlobal.modelhfsc;
        var cfg = Config.hfkhhfsc_286[self.c1.selectedIndex + 1];
        if (model.scData[self.c1.selectedIndex] == 1) {
            GGlobal.modelhfsc.CG_HeFuFristRecharge_getreward_9631(self.c1.selectedIndex + 1);
        }
        else if (model.scData[self.c1.selectedIndex] == 0) {
            GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.cz, null, false);
        }
    };
    Child_ActCom_HFSC.prototype.openPanel = function (pData) {
        var self = this;
        var model = GGlobal.modelhfsc;
        self.registerEvent(true);
        var selIndex = 0;
        if (model.scData[0] != 1 && model.scData[1] == 1) {
            selIndex = 1;
        }
        if (self.c1.selectedIndex == selIndex) {
            self.updateShow();
        }
        else {
            self.c1.selectedIndex = selIndex;
        }
        IconUtil.setImg(self.backImg, Enum_Path.ACTCOM_URL + "hfsc.jpg");
        GGlobal.modelActivity.CG_OPENACT(UIConst.HFKH_HFSC);
    };
    Child_ActCom_HFSC.prototype.closePanel = function (pData) {
        var self = this;
        self.list.numItems = 0;
        IconUtil.setImg(self.backImg, null);
        self.registerEvent(false);
    };
    Child_ActCom_HFSC.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.HFKH_HFSC, self.updateShow, self);
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
        EventUtil.register(pFlag, self.drawBt, egret.TouchEvent.TOUCH_TAP, self.OnDraw, self);
    };
    Child_ActCom_HFSC.URL = "ui://444si0mygapn2";
    Child_ActCom_HFSC.pkg = "ActCom_HFSC";
    return Child_ActCom_HFSC;
}(fairygui.GComponent));
__reflect(Child_ActCom_HFSC.prototype, "Child_ActCom_HFSC", ["IPanel"]);
