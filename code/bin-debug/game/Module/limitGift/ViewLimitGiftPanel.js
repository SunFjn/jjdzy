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
var ViewLimitGiftPanel = (function (_super) {
    __extends(ViewLimitGiftPanel, _super);
    function ViewLimitGiftPanel() {
        var _this = _super.call(this) || this;
        _this._endTime = 0;
        _this.loadRes("limitGift", "limitGift_atlas0");
        return _this;
    }
    ViewLimitGiftPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("limitGift", "ViewLimitGiftPanel"));
    };
    ViewLimitGiftPanel.prototype.childrenCreated = function () {
        GGlobal.createPack("limitGift");
        var s = this;
        s.contentPane = s.view = fairygui.UIPackage.createObject("limitGift", "ViewLimitGiftPanel").asCom;
        CommonManager.parseChildren(s.view, s);
        s.tabArr = [s.tab0, s.tab1, s.tab2, s.tab3];
        s.btnTabArr = [s.btnTab0, s.btnTab1];
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        _super.prototype.childrenCreated.call(this);
    };
    ViewLimitGiftPanel.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var m = GGlobal.model_limitGift;
        var s = this;
        m.listen(Model_LimitGift.OPENUI, s.upView, s);
        m.listen(Model_LimitGift.GETAWARD, s.upSelView, s);
        Timer.instance.listen(s.upTimer, s);
        for (var i = 0; i < 4; i++) {
            s.tabArr[i].addClickListener(s.onTab, s);
        }
        s.btn.addClickListener(s.onCharge, s);
        s.btnGet.addClickListener(s.onGet, s);
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onPage, this);
        s.upView();
        IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "limitGift.jpg");
    };
    ViewLimitGiftPanel.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        var s = this;
        var m = GGlobal.model_limitGift;
        m.remove(Model_LimitGift.OPENUI, s.upView, s);
        m.remove(Model_LimitGift.GETAWARD, s.upSelView, s);
        Timer.instance.remove(s.upTimer, s);
        for (var i = 0; i < 4; i++) {
            s.tabArr[i].removeClickListener(s.onTab, s);
        }
        s.btn.removeClickListener(s.onCharge, s);
        s.btnGet.removeClickListener(s.onGet, s);
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.onPage, this);
        IconUtil.setImg(s.imgBg, null);
        s.list.numItems = 0;
    };
    ViewLimitGiftPanel.prototype.upView = function () {
        var m = GGlobal.model_limitGift;
        var s = this;
        var arr = m.giftArr;
        var idx = 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        s._ingArr = [];
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            if (v.endTime - servTime <= 0) {
                continue;
            }
            if (v.type == 1) {
                s.tabArr[i].text = "转生";
            }
            else if (v.type == 2) {
                s.tabArr[i].text = "切换地图";
            }
            else if (v.type == 3) {
                s.tabArr[i].text = "红将收集";
            }
            else if (v.type == 4) {
                s.tabArr[i].text = "一骑当千";
            }
            s.tabArr[i].visible = true;
            s.tabArr[i].data = v.type;
            idx++;
            s._ingArr.push(v);
        }
        for (var i = idx; i < 4; i++) {
            s.tabArr[i].visible = false;
        }
        if (s._ingArr.length > 0) {
            if (this._args && this._args > 0) {
                s.onTabView(this._args);
                this._args = null;
            }
            else {
                s.onTabView(s._ingArr[0].type);
            }
        }
        else {
            s.closeEventHandler(null);
            // GGlobal.mainUICtr.removeIcon(UIConst.LIMIT_GIFT);
        }
    };
    //转生  切换地图
    ViewLimitGiftPanel.prototype.onTab = function (e) {
        var btn = e.currentTarget;
        var s = this;
        s.onTabView(btn.data);
    };
    ViewLimitGiftPanel.prototype.onTabView = function (type) {
        var s = this;
        var m = GGlobal.model_limitGift;
        for (var i = 0; i < m.giftArr.length; i++) {
            if (m.giftArr[i].type == type) {
                s._selVo = m.giftArr[i];
                break;
            }
        }
        for (var i = 0; i < s.tabArr.length; i++) {
            var v = s.tabArr[i];
            v.selected = (v.data == s._selVo.type);
        }
        s._endTime = s._selVo.endTime;
        s.upTimer();
        s._awaArr = [];
        //取最大的2个
        for (var i = 0; i < s._selVo.awaArr.length; i++) {
            var v = s._selVo.awaArr[i];
            if (v.cfg.lx2 == 1 && (s._awaArr[0] == null || v.id > s._awaArr[0].id)) {
                s._awaArr[0] = v;
            }
            else if (v.cfg.lx2 == 2 && (s._awaArr[1] == null || v.id > s._awaArr[1].id)) {
                s._awaArr[1] = v;
            }
        }
        if (s.c1.selectedIndex == 0) {
            s.onPage();
        }
        else {
            s.c1.selectedIndex = 0;
        }
    };
    //至尊 豪华
    ViewLimitGiftPanel.prototype.onPage = function () {
        var s = this;
        var c = this.c1.selectedIndex;
        if (c == 0) {
            s.selView(s._awaArr[0]);
        }
        else if (c == 1) {
            s.selView(s._awaArr[1]);
        }
    };
    ViewLimitGiftPanel.prototype.selView = function (v) {
        var s = this;
        s._selDt = v;
        s.upSelView();
    };
    ViewLimitGiftPanel.prototype.upSelView = function () {
        var s = this;
        var cfg = s._selDt.cfg;
        s.lbTit.text = cfg.ms;
        s.lbZhe.text = (cfg.zk / 100) + "";
        s._lstDt = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
        s.list.numItems = s._lstDt.length;
        s.btn.text = cfg.rmb + "元";
        if (s._selDt.st == 1) {
            s.btn.visible = false;
            s.btnGet.visible = true;
            s.btnGet.checkNotice = true;
            s.imgHas.visible = false;
        }
        else if (s._selDt.st == 2) {
            s.btn.visible = false;
            s.btnGet.visible = false;
            s.imgHas.visible = true;
        }
        else {
            s.btn.visible = true;
            s.btnGet.visible = false;
            s.imgHas.visible = false;
        }
        s.upRed();
    };
    ViewLimitGiftPanel.prototype.itemRender = function (index, obj) {
        var s = this;
        var item = obj;
        item.tipEnabled = item.isShowEff = true;
        item.vo = s._lstDt[index];
    };
    ViewLimitGiftPanel.prototype.upTimer = function () {
        var s = this;
        var end = s._endTime ? s._endTime : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            s.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            s.lbTime.text = "00:00:00";
            s.upView();
        }
    };
    ViewLimitGiftPanel.prototype.onCharge = function () {
        var s = this;
        if (!s._selDt) {
            return;
        }
        GGlobal.modelchongzhi.CG_CHONGZHI_135(s._selDt.cfg.cz, null, false);
    };
    ViewLimitGiftPanel.prototype.onGet = function () {
        var s = this;
        if (!s._selDt) {
            return;
        }
        if (s._selDt.st != 1) {
            return;
        }
        GGlobal.model_limitGift.CG_GETAWARD_10451(s._selDt.id);
    };
    ViewLimitGiftPanel.prototype.upRed = function () {
        var s = this;
        for (var i = 0; i < s._awaArr.length; i++) {
            var v = s._awaArr[i];
            s.btnTabArr[i].checkNotice = v.st == 1;
        }
        for (var i = 0; i < s._ingArr.length; i++) {
            var v = s._ingArr[i];
            var red = false;
            for (var j = 0; j < v.awaArr.length; j++) {
                var v1 = v.awaArr[j];
                if (v1.st == 1) {
                    red = true;
                    break;
                }
            }
            s.tabArr[i].checkNotice = red;
        }
    };
    ViewLimitGiftPanel.URL = "ui://k02wlh83fvsk0";
    return ViewLimitGiftPanel;
}(UIModalPanel));
__reflect(ViewLimitGiftPanel.prototype, "ViewLimitGiftPanel");
