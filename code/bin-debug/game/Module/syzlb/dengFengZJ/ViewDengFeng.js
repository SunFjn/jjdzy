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
var ViewDengFeng = (function (_super) {
    __extends(ViewDengFeng, _super);
    function ViewDengFeng() {
        return _super.call(this) || this;
    }
    ViewDengFeng.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ViewDengFeng"));
    };
    ViewDengFeng.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ViewDengFeng.prototype.initView = function (pParent) {
    };
    ViewDengFeng.prototype.openPanel = function (pData) {
        var s = this;
        s.registerEvent(true);
        var m = GGlobal.modelDengFengZJ;
        if (m.status == 2) {
            s.c1.selectedIndex = 1;
        }
        else {
            s.c1.selectedIndex = 0;
        }
        s.updateShow();
        s.updateNotice();
    };
    ViewDengFeng.prototype.closePanel = function (pData) {
        var self = this;
        self.registerEvent(false);
        self.vFinal.hide();
        self.vSea.hide();
    };
    ViewDengFeng.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
        GGlobal.reddot.register(pFlag, UIConst.DENG_FENG_SEA, self.updateNotice, self);
        GGlobal.reddot.register(pFlag, UIConst.DENG_FENG_FINAL, self.updateNotice, self);
    };
    ViewDengFeng.prototype.updateShow = function () {
        var s = this;
        if (s.c1.selectedIndex == 0) {
            s.vSea.show();
            s.vFinal.hide();
        }
        else {
            s.vSea.hide();
            s.vFinal.show();
        }
    };
    ViewDengFeng.prototype.updateNotice = function () {
        var self = this;
        self.btn0.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_SEA, 0);
        self.btn1.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_FINAL, 0);
    };
    ViewDengFeng.URL = "ui://3o8q23uujo891w";
    return ViewDengFeng;
}(fairygui.GComponent));
__reflect(ViewDengFeng.prototype, "ViewDengFeng", ["IPanel"]);
