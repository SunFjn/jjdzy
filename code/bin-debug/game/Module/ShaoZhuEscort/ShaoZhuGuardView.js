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
/**
 * 护卫武将界面
 */
var ShaoZhuGuardView = (function (_super) {
    __extends(ShaoZhuGuardView, _super);
    function ShaoZhuGuardView() {
        var _this = _super.call(this) || this;
        _this._selectedIndx = 0;
        _this._inAni = 0;
        _this.nowDengdengdeng = 0;
        fairygui.UIObjectFactory.setPackageItemExtension(ShaoZhuGuardItem.URL, ShaoZhuGuardItem);
        _this.loadRes();
        return _this;
    }
    ShaoZhuGuardView.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuGuardView"));
    };
    ShaoZhuGuardView.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("ShaoZhuEscort");
        self.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuGuardView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        self.moneyLb0.text = JSON.parse(Config.xtcs_004[7007].other)[0][2] + "";
        self.moneyLb1.text = JSON.parse(Config.xtcs_004[7006].other)[0][2] + "";
        _super.prototype.childrenCreated.call(this);
    };
    ShaoZhuGuardView.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(idx);
        item.setChoose(idx == this._selectedIndx);
    };
    ShaoZhuGuardView.prototype.onShown = function () {
        var self = this;
        self.addListen();
        self._selectedIndx = Model_ShaoZhuEscort.id - 1;
        self.list.numItems = Model_ShaoZhuEscort.MAX_LEVEL;
        self.checkMoney();
    };
    ShaoZhuGuardView.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_GUARD);
        this.list.numItems = 0;
    };
    ShaoZhuGuardView.prototype.addListen = function () {
        var self = this;
        GGlobal.control.listen("GC_REFRESH_SHAOZHUESCORT", self.updatePage, self);
        self.btnOnekey.addClickListener(self.oneKeyHD, self);
        self.btnRefresh.addClickListener(self.refreshHD, self);
        self.btnStart.addClickListener(self.OnStartBt, self);
    };
    ShaoZhuGuardView.prototype.removeListen = function () {
        var self = this;
        GGlobal.control.remove("GC_REFRESH_SHAOZHUESCORT", self.updatePage, self);
        self.btnOnekey.removeClickListener(self.oneKeyHD, self);
        self.btnRefresh.removeClickListener(self.refreshHD, self);
        self.btnStart.removeClickListener(self.OnStartBt, self);
    };
    ShaoZhuGuardView.prototype.checkMoney = function () {
        var s = this;
        var color = Color.REDINT;
        var condition = Config.xtcs_004[7007];
        if (ConfigHelp.checkEnough(condition.other, false)) {
            color = Color.WHITEINT;
        }
        s.moneyLb0.color = color;
        condition = Config.xtcs_004[7006];
        if (ConfigHelp.checkEnough(condition.other, false)) {
            color = Color.WHITEINT;
        }
        s.moneyLb1.color = color;
    };
    /**
     * 更新数据
     */
    ShaoZhuGuardView.prototype.updatePage = function () {
        var self = this;
        if (Model_ShaoZhuEscort.id >= Model_ShaoZhuEscort.MAX_LEVEL) {
            self._inAni = 0;
            self.list._children[self._selectedIndx].setChoose(false);
            self._selectedIndx = Model_ShaoZhuEscort.id - 1;
            self.list._children[self._selectedIndx].setChoose(true);
            self.checkMoney();
            return;
        }
        self._inAni = 10;
        self.nowDengdengdeng = self._selectedIndx;
        Timer.instance.listen(self.dengdengdeng, self, 50);
        self.checkMoney();
    };
    ShaoZhuGuardView.prototype.dengdengdeng = function () {
        var self = this;
        self._inAni--;
        var tx = 0;
        self.list._children[self._selectedIndx].setChoose(false);
        if (self._inAni <= 0) {
            self._inAni = 0;
            tx = Model_ShaoZhuEscort.id - 1;
            Timer.instance.remove(self.dengdengdeng, self);
        }
        else {
            tx = self._selectedIndx + 1;
            tx = tx < Model_ShaoZhuEscort.MAX_LEVEL ? tx : self.nowDengdengdeng;
        }
        self.list._children[tx].setChoose(true);
        self._selectedIndx = tx;
    };
    /**
     * 一键刷红
     */
    ShaoZhuGuardView.prototype.oneKeyHD = function () {
        var self = this;
        if (self.list.selectedIndex >= Model_ShaoZhuEscort.MAX_LEVEL - 1) {
            ViewCommonWarn.text("已刷到最高层");
            return;
        }
        var condition = Config.xtcs_004[7007];
        if (ConfigHelp.checkEnough(condition.other, false)) {
            if (self._inAni) {
                return;
            }
            if (TimeUitl.cool("ViewShaoZhuGuardRefresh0", 500)) {
                GGlobal.modelShaoZhuEscort.CG_REFRESH(2);
            }
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                self.doHideAnimation();
            }));
        }
    };
    /**
     * 刷新
     */
    ShaoZhuGuardView.prototype.refreshHD = function () {
        var self = this;
        if (self.list.selectedIndex >= Model_ShaoZhuEscort.MAX_LEVEL - 1) {
            ViewCommonWarn.text("已刷到最高层");
            return;
        }
        var condition = Config.xtcs_004[7006];
        if (ConfigHelp.checkEnough(condition.other, false)) {
            if (self._inAni) {
                return;
            }
            if (TimeUitl.cool("ViewShaoZhuGuardRefresh1", 500)) {
                GGlobal.modelShaoZhuEscort.CG_REFRESH(1);
            }
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                self.doHideAnimation();
            }));
        }
    };
    /**
     * 护送按钮点击事件
     */
    ShaoZhuGuardView.prototype.OnStartBt = function () {
        if (this._selectedIndx + 1 != Model_ShaoZhuEscort.MAX_LEVEL) {
            ViewAlert.show("选择<font color='#ed1414'>吕布</font>护送奖励不会损失", Handler.create(this, this.startHd), ViewAlert.OKANDCANCEL, "仍然出发", "再去选选");
            return;
        }
        this.startHd();
    };
    /**
     * 开始护送
     */
    ShaoZhuGuardView.prototype.startHd = function () {
        var self = this;
        if (Model_ShaoZhuEscort.escort <= 0) {
            ViewCommonWarn.text("今日护送次数已耗尽");
            return;
        }
        this.doHideAnimation();
        GGlobal.modelShaoZhuEscort.CG_ESCORT();
    };
    //>>>>end
    ShaoZhuGuardView.URL = "ui://lnw94ki2lnit7";
    return ShaoZhuGuardView;
}(UIModalPanel));
__reflect(ShaoZhuGuardView.prototype, "ShaoZhuGuardView");
