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
var Child_BOSSZC = (function (_super) {
    __extends(Child_BOSSZC, _super);
    function Child_BOSSZC() {
        var _this = _super.call(this) || this;
        _this._lstIndex = 0; //和类型对应上 1本服 2跨服
        _this.tabArr = [];
        _this.tabArrBG = [];
        _this._dta = [];
        /**前后端数据不一致时，最后一次更新数据时间*/
        _this._lastReqTime = 0;
        return _this;
    }
    Child_BOSSZC.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "Child_BOSSZC"));
    };
    Child_BOSSZC.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_BOSSZC.prototype.openPanel = function (pData) {
        this.open();
    };
    Child_BOSSZC.prototype.closePanel = function (pData) {
        this.close();
    };
    Child_BOSSZC.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = this.itemRender;
        self.list.setVirtual();
        self.tabArrBG = ["", self.imageSelect1, self.imageSelect2];
        for (var i = 1; i < 3; i++) {
            self.tabArrBG[i].visible = false;
        }
    };
    Child_BOSSZC.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._dta[idx], this.c1.selectedIndex + 1);
    };
    Child_BOSSZC.prototype.changeHD = function () {
        var m = GGlobal.modelBossZc;
        var idx = this.c1.selectedIndex + 1;
        var arr = [0, UIConst.BOSS_BATTLEFIELD_LOCAL, UIConst.BOSS_BATTLEFIELD_CROSS];
        if (!ModuleManager.isOpen(arr[idx], true)) {
            this.c1.selectedIndex = 0;
            return;
        }
        this._lstIndex = idx;
        for (var i = 1; i < 3; i++) {
            this.tabArrBG[i].visible = i == idx;
        }
        GGlobal.modelBossZc.CGopenUI(idx);
    };
    Child_BOSSZC.prototype.update = function () {
        var m = GGlobal.modelBossZc;
        var idx = this.c1.selectedIndex + 1;
        if (idx == Model_BossZC.LOCAL) {
            this._dta = m.local_dta;
        }
        else {
            this._dta = m.cross_dta;
        }
        this.list.numItems = this._dta.length;
    };
    Child_BOSSZC.prototype.updateX = function () {
        var len = this._dta.length;
        ;
        var max = this.list.numChildren;
        for (var i = 0; i < len; i++) {
            if (i < max) {
                var item = this.list.getChildAt(i);
                item.updateX();
            }
        }
        var now = egret.getTimer();
        if (Model_BossZC.data_valid == 1 && now - this._lastReqTime > 1000) {
            this._lastReqTime = now;
            var idx = this.c1.selectedIndex + 1;
            GGlobal.modelBossZc.CGopenUI(idx);
            // DEBUGWARING.log("BOSS战场  数据已过期， 请求最新数据");
            Model_BossZC.data_valid = 0;
        }
        var lib = Config.bosszc_010;
        var cfg;
        for (var i_1 in lib) {
            cfg = lib[i_1];
            break;
        }
        var ms = Model_GlobalMsg.getServerTime();
        var nowDate = new Date(ms);
        var nowMin = nowDate.getMinutes();
        var nowSec = nowDate.getSeconds();
        var h = nowDate.getHours();
        var dates = JSON.parse(cfg.shuaxin2);
        var ii = dates.length;
        var date = "0:00";
        var sec = 0;
        for (var j = 0; j < ii; j++) {
            var tp = dates[j];
            var ch = tp[0];
            var cm = tp[1];
            if (h == ch && nowMin < cm) {
                date = dates[j];
                sec = (cm - nowMin) * 60;
                break;
            }
            else if (h < ch) {
                date = dates[j];
                sec = ((ch - h) * 60 + cm - nowMin) * 60;
                break;
            }
            if (j == ii - 1) {
                date = dates[0];
                ch = dates[0][0];
                cm = dates[0][1];
                sec = ((24 - h + ch) * 60 + cm - nowMin) * 60;
                break;
            }
        }
        sec -= nowSec;
        var nextTime = BroadCastManager.reTxt("{0}点{1}分", date[0], date[1]);
        var nextFresh = DateUtil.getHMSBySecond2(sec);
        this.lbNextTime.text = BroadCastManager.reTxt("<font color='{0}'>BOSS刷新时间：</font>{1}", Color.GREENSTR, nextTime);
        this.lbRefreshTime.text = BroadCastManager.reTxt("<font color='{0}'>BOSS刷新倒计时：</font>{1}", Color.GREENSTR, nextFresh);
    };
    Child_BOSSZC.prototype.openShop = function () {
        GGlobal.layerMgr.open(UIConst.BOSSZC_SHOP);
    };
    Child_BOSSZC.prototype.openDesc = function (e) {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.BOSS_BATTLEFIELD_LOCAL);
    };
    Child_BOSSZC.prototype.open = function () {
        var s = this;
        s.update();
        this.c1.selectedIndex = GGlobal.modelBossZc.sceneType - 1;
        s.changeHD();
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.changeHD, s);
        // GGlobal.modelBossZc.CGopenUI(Model_BossZC.LOCAL);
        GGlobal.control.listen(Enum_MsgType.BOSSZC_OPEN, s.update, s);
        Timer.instance.listen(s.updateX, s, 1000);
        s.btnShop.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHOP);
        s.btnShop.addClickListener(this.openShop, this);
        s.lbDes.addClickListener(this.openDesc, this);
    };
    Child_BOSSZC.prototype.close = function () {
        var s = this;
        s._lstIndex = 0;
        s.list.numItems = 0;
        Timer.instance.remove(s.updateX, s);
        s.btnShop.removeClickListener(s.openShop, s);
        s.lbDes.removeClickListener(s.openDesc, s);
        GGlobal.control.remove(Enum_MsgType.BOSSZC_OPEN, s.update, s);
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.changeHD, s);
    };
    //>>>>end
    Child_BOSSZC.URL = "ui://47jfyc6eppyw31";
    return Child_BOSSZC;
}(fairygui.GComponent));
__reflect(Child_BOSSZC.prototype, "Child_BOSSZC", ["IPanel"]);
