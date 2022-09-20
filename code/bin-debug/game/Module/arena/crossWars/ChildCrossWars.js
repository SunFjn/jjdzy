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
var ChildCrossWars = (function (_super) {
    __extends(ChildCrossWars, _super);
    function ChildCrossWars() {
        var _this = _super.call(this) || this;
        _this.lbTimeTxt = "";
        _this._curPage = 0;
        return _this;
    }
    ChildCrossWars.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ChildCrossWars"));
    };
    ChildCrossWars.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.c1 = this.getController("c1");
        this.list16.itemRenderer = this.renderListItem16;
        this.list16.callbackThisObj = this;
        this.list8.itemRenderer = this.renderListItem8;
        this.list8.callbackThisObj = this;
        this.list4.itemRenderer = this.renderListItem4;
        this.list4.callbackThisObj = this;
        this._tabBtnArr = [this.tab0, this.tab1, this.tab2, this.tab3];
    };
    ChildCrossWars.prototype.update = function () {
        if (Model_CrossWars.battleTurn > 0) {
            this.ctrlHander(Model_CrossWars.battleTurn - 1);
        }
        else {
            this.ctrlHander(Model_CrossWars.actTurn > 0 ? Math.min(Model_CrossWars.actTurn - 1, 3) : 0);
        }
    };
    ChildCrossWars.prototype.addListen = function () {
        for (var i = 0; i < this._tabBtnArr.length; i++) {
            this._tabBtnArr[i].addClickListener(this.onTabHander, this);
            this._tabBtnArr[i].name = i + "";
        }
        this.btnReward.addClickListener(this.onReward, this);
        this.btnWin.addClickListener(this.onWin, this);
        this.btnTips.addClickListener(this.onTips, this);
        this.btnShop.addClickListener(this.onShop, this);
        GGlobal.control.listen(Enum_MsgType.CROSSWARS_OPEN_UI, this.updatePage, this);
        GGlobal.control.listen(Enum_MsgType.CROSSWARS_BUY_WIN, this.updatePage, this);
        GGlobal.control.listen(Enum_MsgType.CROSSWARS_OPEN_WINERS, this.upCheck, this);
        GGlobal.control.listen(Enum_MsgType.CROSSWARS_STATUS_CHANGE, this.upStatus, this);
        Timer.instance.listen(this.upTimer, this, 1000);
    };
    ChildCrossWars.prototype.removeListen = function () {
        for (var i = 0; i < this._tabBtnArr.length; i++) {
            this._tabBtnArr[i].removeClickListener(this.onTabHander, this);
        }
        this.btnReward.removeClickListener(this.onReward, this);
        this.btnWin.removeClickListener(this.onWin, this);
        this.btnTips.removeClickListener(this.onTips, this);
        this.btnShop.removeClickListener(this.onShop, this);
        GGlobal.control.remove(Enum_MsgType.CROSSWARS_OPEN_UI, this.updatePage, this);
        GGlobal.control.remove(Enum_MsgType.CROSSWARS_BUY_WIN, this.updatePage, this);
        GGlobal.control.remove(Enum_MsgType.CROSSWARS_OPEN_WINERS, this.upCheck, this);
        GGlobal.control.remove(Enum_MsgType.CROSSWARS_STATUS_CHANGE, this.upStatus, this);
        Timer.instance.remove(this.upTimer, this);
        this.list16.numItems = 0;
        this.list8.numItems = 0;
        this.list4.numItems = 0;
        Model_CrossWars.battleTurn = 0;
    };
    ChildCrossWars.prototype.updatePage = function () {
        if (this._curPage == 0) {
            this.list16.numItems = Model_CrossWars.matchPlyArr[0] ? Math.ceil(Model_CrossWars.matchPlyArr[0].length / 2) : 0;
        }
        else if (this._curPage == 1) {
            this.list8.numItems = Model_CrossWars.matchPlyArr[1] ? Model_CrossWars.matchPlyArr[1].length : 0;
        }
        else if (this._curPage == 2) {
            this.list4.numItems = Model_CrossWars.matchPlyArr[2] ? Model_CrossWars.matchPlyArr[2].length : 0;
        }
        else {
            this.list1.first = Model_CrossWars.matchPlyArr[3] ? Model_CrossWars.matchPlyArr[3][0] : null;
        }
        if (Model_CrossWars.actStatus == 0) {
            this.lbTimeTxt = "";
            this.view1.vo = this.lbOver.text = "赛事已结束";
        }
        else {
            var period = Model_CrossWars.actPeriod == 1 ? "准备阶段" : "战斗阶段";
            this.lbTimeTxt = period;
            this.lbTitle.text = Model_CrossWars.getTurnName(Model_CrossWars.actTurn);
            this.lbOver.text = "";
        }
        this.upCheck();
        this.upTimer();
    };
    ChildCrossWars.prototype.upCheck = function () {
        if (Model_CrossWars.actStatus == 0)
            this.btnWin.checkNotice = Model_CrossWars.winReward > 0 || (Model_CrossWars.winMobai == 0 && Model_CrossWars.winPlyArr.length > 0);
        else
            this.btnWin.checkNotice = false;
    };
    ChildCrossWars.prototype.upTimer = function () {
        if (Model_CrossWars.actStatus == 0) {
            this.lbTitle.text = this.lbTime.text = this.lbTimeTxt;
        }
        else {
            var period = Model_CrossWars.actPeriod;
            var actTurn = Model_CrossWars.actTurn;
            var endHours = 0;
            var endMins = 0;
            if (actTurn == 1 && period == 1) {
                endHours = 19;
                endMins = 30;
            }
            else if (actTurn == 1 && period == 2) {
                endHours = 19;
                endMins = 35;
            }
            else if (actTurn == 2 && period == 1) {
                endHours = 19;
                endMins = 45;
            }
            else if (actTurn == 2 && period == 2) {
                endHours = 19;
                endMins = 50;
            }
            else if (actTurn == 3 && period == 1) {
                endHours = 20;
                endMins = 0;
            }
            else if (actTurn == 3 && period == 2) {
                endHours = 20;
                endMins = 5;
            }
            else if (actTurn == 4 && period == 1) {
                endHours = 20;
                endMins = 15;
            }
            else if (actTurn == 4 && period == 2) {
                endHours = 20;
                endMins = 20;
            }
            var date = new Date(Model_GlobalMsg.getServerTime());
            date.setHours(endHours);
            date.setMinutes(endMins);
            date.setSeconds(0);
            var d = date.getTime() - Model_GlobalMsg.getServerTime();
            d = Math.floor(Math.max(d, 0) / 1000);
            this.view1.vo = this.lbTime.text = this.lbTimeTxt + "  " + DateUtil.getHMSBySecond2(d);
        }
    };
    ChildCrossWars.prototype.renderListItem16 = function (index, obj) {
        var item = obj;
        item.vo = [Model_CrossWars.matchPlyArr[0][2 * index], Model_CrossWars.matchPlyArr[0][2 * index + 1]];
    };
    ChildCrossWars.prototype.renderListItem8 = function (index, obj) {
        var item = obj;
        item.vo = Model_CrossWars.matchPlyArr[1][index];
    };
    ChildCrossWars.prototype.renderListItem4 = function (index, obj) {
        var item = obj;
        item.vo = Model_CrossWars.matchPlyArr[2][index];
    };
    ChildCrossWars.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.CROSS_WARS_REWARD);
    };
    ChildCrossWars.prototype.onWin = function () {
        if (Model_CrossWars.actStatus == 1) {
            ViewCommonWarn.text("本届比赛尚未结束");
            return;
        }
        GGlobal.layerMgr.open(UIConst.CROSS_WARS_WIN);
    };
    ChildCrossWars.prototype.onTips = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CROSS_WARS);
    };
    ChildCrossWars.prototype.onShop = function () {
        // GGlobal.layerMgr.open(UIConst.BAOKU_LZ, 2)
        GGlobal.layerMgr.open(UIConst.BAOKU_XX);
    };
    ChildCrossWars.prototype.ctrlHander = function (index) {
        if (Model_CrossWars.actStatus == 1 && index + 1 > Model_CrossWars.actTurn) {
            ViewCommonWarn.text("赛事未开始");
            this["tab" + index].selected = false;
            return;
        }
        this.c1.selectedIndex = index;
        this._curPage = index;
        this.tab0.selected = (index == 0);
        this.tab1.selected = (index == 1);
        this.tab2.selected = (index == 2);
        this.tab3.selected = (index == 3);
        this.upStatus();
        this.updatePage();
    };
    ChildCrossWars.prototype.upStatus = function () {
        GGlobal.modelCrossWars.CG_OPENUI(this._curPage);
    };
    ChildCrossWars.prototype.onTabHander = function (e) {
        var curTarget = e.currentTarget;
        this.ctrlHander(Number(curTarget.name));
    };
    ChildCrossWars.URL = "ui://me1skowlhfct44";
    return ChildCrossWars;
}(fairygui.GComponent));
__reflect(ChildCrossWars.prototype, "ChildCrossWars");
