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
 * 刷新矿藏界面
 */
var ViewCrossMineralRefresh = (function (_super) {
    __extends(ViewCrossMineralRefresh, _super);
    function ViewCrossMineralRefresh() {
        var _this = _super.call(this) || this;
        _this._selectedIndx = 0;
        _this._inAni = 0;
        _this.nowDengdengdeng = 0;
        fairygui.UIObjectFactory.setPackageItemExtension(RefreshMinItem.URL, RefreshMinItem);
        _this.loadRes();
        return _this;
    }
    ViewCrossMineralRefresh.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralRefresh"));
    };
    ViewCrossMineralRefresh.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("crossKing");
        self.view = fairygui.UIPackage.createObject("crossKing", "ViewCrossMineralRefresh").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        self.moneyLb0.text = JSON.parse(Config.xtcs_004[6608].other)[0][2] + "";
        self.moneyLb1.text = JSON.parse(Config.xtcs_004[6609].other)[0][2] + "";
        _super.prototype.childrenCreated.call(this);
    };
    ViewCrossMineralRefresh.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(idx);
        item.setChoose(idx == this._selectedIndx);
    };
    ViewCrossMineralRefresh.prototype.showBtnState = function () {
        var self = this;
        if (Model_CrossMineral.myMineVo.cfgID >= Model_CrossMineral.MAX_LEVEL) {
            self.refreshGroup.visible = false;
            self.startBt.visible = true;
        }
        else {
            self.refreshGroup.visible = true;
            self.startBt.visible = false;
        }
        self.checkMoney();
    };
    ViewCrossMineralRefresh.prototype.checkMoney = function () {
        var s = this;
        var color = Color.REDINT;
        var condition = Config.xtcs_004[6608];
        if (ConfigHelp.checkEnough(condition.other, false)) {
            color = Color.WHITEINT;
        }
        s.moneyLb0.color = color;
        condition = Config.xtcs_004[6609];
        if (ConfigHelp.checkEnough(condition.other, false)) {
            color = Color.WHITEINT;
        }
        s.moneyLb1.color = color;
    };
    ViewCrossMineralRefresh.prototype.onShown = function () {
        var self = this;
        self.addListen();
        self._selectedIndx = Model_CrossMineral.myMineVo.cfgID - 1;
        self.list.numItems = Model_CrossMineral.MAX_LEVEL;
        self.showBtnState();
    };
    ViewCrossMineralRefresh.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.CROSS_MINERAL_REFRESH);
    };
    ViewCrossMineralRefresh.prototype.dengdengdeng = function () {
        var self = this;
        self._inAni--;
        var tx = 0;
        self.list._children[self._selectedIndx].setChoose(false);
        if (self._inAni <= 0) {
            self._inAni = 0;
            tx = Model_CrossMineral.myMineVo.cfgID - 1;
            Timer.instance.remove(self.dengdengdeng, self);
        }
        else {
            tx = self._selectedIndx + 1;
            tx = tx < Model_CrossMineral.MAX_LEVEL ? tx : self.nowDengdengdeng;
        }
        self.list._children[tx].setChoose(true);
        self._selectedIndx = tx;
    };
    ViewCrossMineralRefresh.prototype.listUpdate = function () {
        var self = this;
        if (Model_CrossMineral.myMineVo.cfgID - 1 >= Model_CrossMineral.MAX_LEVEL - 1) {
            self._inAni = 0;
            self.list._children[self._selectedIndx].setChoose(false);
            self._selectedIndx = Model_CrossMineral.myMineVo.cfgID - 1;
            self.list._children[self._selectedIndx].setChoose(true);
            self.showBtnState();
            return;
        }
        self._inAni = 10;
        self.nowDengdengdeng = self._selectedIndx;
        Timer.instance.listen(self.dengdengdeng, self, 50);
        self.showBtnState();
    };
    ViewCrossMineralRefresh.prototype.oneKeyHD = function () {
        var self = this;
        if (self.list.selectedIndex >= Model_CrossMineral.MAX_LEVEL - 1) {
            ViewCommonWarn.text("当前矿藏已满级");
            return;
        }
        var condition = Config.xtcs_004[6608];
        if (ConfigHelp.checkEnough(condition.other, false)) {
            if (self._inAni) {
                return;
            }
            if (TimeUitl.cool("ViewCrossMineralRefresh0", 500)) {
                GGlobal.modelCrossMineral.CG_REFRESH_MINE(1);
            }
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                self.doHideAnimation();
            }));
        }
    };
    ViewCrossMineralRefresh.prototype.refreshHD = function () {
        var self = this;
        if (self.list.selectedIndex >= Model_CrossMineral.MAX_LEVEL - 1) {
            ViewCommonWarn.text("当前矿藏已满级");
            return;
        }
        var condition = Config.xtcs_004[6609];
        if (ConfigHelp.checkEnough(condition.other, false)) {
            if (self._inAni) {
                return;
            }
            if (TimeUitl.cool("ViewCrossMineralRefresh1", 500)) {
                GGlobal.modelCrossMineral.CG_REFRESH_MINE(0);
            }
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                self.doHideAnimation();
            }));
        }
    };
    ViewCrossMineralRefresh.prototype.OnStartBt = function () {
        this.doHideAnimation();
        GGlobal.modelCrossMineral.CG_START_MINE();
    };
    ViewCrossMineralRefresh.prototype.addListen = function () {
        var s = this;
        s.btnOnekey.addClickListener(s.oneKeyHD, s);
        s.btnRefresh.addClickListener(s.refreshHD, s);
        s.startBt.addClickListener(s.OnStartBt, s);
        GGlobal.control.listen("GC_REFRESH_MINE", s.listUpdate, s);
    };
    ViewCrossMineralRefresh.prototype.removeListen = function () {
        var s = this;
        Timer.instance.remove(s.dengdengdeng, s);
        s.list.numItems = 0;
        s._inAni = 0;
        s.btnOnekey.removeClickListener(s.oneKeyHD, s);
        s.btnRefresh.removeClickListener(s.refreshHD, s);
        s.startBt.removeClickListener(s.OnStartBt, s);
        GGlobal.control.remove("GC_REFRESH_MINE", s.listUpdate, s);
        GGlobal.layerMgr.close(UIConst.CROSS_MINERAL_REFRESH);
    };
    ViewCrossMineralRefresh.URL = "ui://yqpfulefnyv754";
    return ViewCrossMineralRefresh;
}(UIModalPanel));
__reflect(ViewCrossMineralRefresh.prototype, "ViewCrossMineralRefresh");
