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
var ViewVip = (function (_super) {
    __extends(ViewVip, _super);
    function ViewVip() {
        var _this = _super.call(this) || this;
        _this.awards = [];
        _this.maxVip = 0;
        _this.showVIP = 0;
        _this.isShowOpenAnimation = false;
        _this.setSkin("vip", "vip_atlas0", "ViewVip");
        return _this;
    }
    ViewVip.createInstance = function () {
        return (fairygui.UIPackage.createObject("vip", "ViewVip"));
    };
    ViewVip.prototype.initView = function () {
        _super.prototype.initView.call(this);
        _super.prototype.resetPosition.call(this);
        var s = this;
        var b = s.view;
        s.lbCZ.visible = !GGlobal.isIOS;
        s.lbPro.visible = !GGlobal.isIOS;
        s.effContianer = new fairygui.GComponent();
        b.addChildAt(s.effContianer, 3);
        s.tts = [s.i0, s.i1, s.i2, s.t0, s.t1, s.t2];
        s.n37.callbackThisObj = s;
        s.n37.itemRenderer = s.itemRender;
        s.btnGift.setNoticeXY(77, 15);
    };
    ViewVip.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    ViewVip.prototype.onLeft = function () {
        var s = this;
        if (s.showVIP > 0) {
            s.showVIP--;
            s.setIndex();
        }
    };
    ViewVip.prototype.onRight = function () {
        var s = this;
        if (s.showVIP < s.maxVip + 1) {
            s.showVIP++;
            s.setIndex();
        }
    };
    ViewVip.prototype.openCZ = function () {
        // GGlobal.layerMgr.open(UIConst.CHONGZHI);
        ViewChongZhi.tryToOpenCZ();
    };
    ViewVip.prototype.openDS = function () {
        GGlobal.layerMgr.open(UIConst.VIPDESC, this.showVIP);
    };
    ViewVip.prototype.lqHd = function () {
        if (this.showVIP - 1 > GGlobal.modelvip.vip) {
            ViewCommonWarn.text("未达条件");
            return;
        }
        GGlobal.modelvip.CG_LINGQU_2063(this.showVIP - 1);
    };
    ViewVip.prototype.showDes = function (str) {
        var self = this;
        var data = str.split(",");
        ;
        var len = data.length;
        var w0 = -20;
        for (var i = 0; i < 3; i++) {
            if (i < len) {
                self.tts[i].visible = true;
                self.tts[i + 3].visible = true;
                self.tts[i + 3].text = data[i];
                self.tts[i].x = w0 + 20;
                self.tts[i + 3].x = self.tts[i].x + 30;
                w0 = self.tts[i + 3].x + self.tts[i + 3].width;
            }
            else {
                self.tts[i].visible = false;
                self.tts[i + 3].visible = false;
            }
        }
        w0 = (640 - w0) >> 1;
        for (var i = 0; i < len; i++) {
            if (i < len) {
                self.tts[i].x = w0;
                self.tts[i + 3].x = self.tts[i].x + 30;
                w0 = self.tts[i + 3].x + self.tts[i + 3].width + 20;
            }
        }
    };
    ViewVip.prototype.reCheck = function () {
        var s = this;
        var m = GGlobal.modelvip;
        var d = m.dta;
        var v = m.vip;
        s.showVIP = v + 2;
        s.showVIP = s.showVIP > s.maxVip + 1 ? s.maxVip + 1 : s.showVIP;
        for (var i = 0; i < v + 1; i++) {
            if (d.indexOf(i) < 0) {
                s.showVIP = i + 1; //自动翻页
                break;
            }
        }
        s.setIndex();
    };
    ViewVip.prototype.setIndex = function () {
        var s = this;
        var m = GGlobal.modelvip;
        var vip = s.showVIP;
        var lib = Config.VIP_710[vip];
        IconUtil.setImg(s.boxTitle, Enum_Path.vipURL + lib.word + ".png");
        IconUtil.setImg(s.pic, Enum_Path.vipURL + lib.picture + ".png");
        // ImageLoader.instance.loader(Enum_Path.vipURL + lib.word + ".png", s.boxTitle);
        // ImageLoader.instance.loader(Enum_Path.vipURL + lib.picture + ".png", s.pic);
        s.showDes(lib.DES);
        var dt = m.dta;
        var bl = dt.indexOf(s.showVIP - 1) != -1;
        s.btn.visible = !bl && (s.showVIP - 1) <= m.vip;
        s.btn.checkNotice = (s.showVIP - 1) <= m.vip;
        s.lbYlq.visible = bl;
        s.awards = ConfigHelp.makeItemListArr(JSON.parse(lib.AWARD));
        s.n37.numItems = s.awards.length;
        s.disLb.text = lib.zk + "折";
        s.lbNowBox.text = "VIP" + (vip - 1) + "特权礼包";
        s.btnleft.visible = s.showVIP != 1;
        s.btnright.visible = s.showVIP != s.maxVip + 1;
    };
    ViewVip.prototype.update = function () {
        var s = this;
        var m = GGlobal.modelvip;
        var vip = m.vip + 1;
        s.lbVip.text = "P" + m.vip;
        var lib = Config.VIP_710[vip];
        s.maxVip = lib.MAXVIP;
        s.vipBar.value = m.exp;
        if (Config.VIP_710[vip + 1]) {
            var nxt = Config.VIP_710[vip + 1];
            s.vipBar.max = nxt.MONEY;
            s.lbPro.text = "再充值<font color='#15f234'>" + (nxt.MONEY - m.exp) + "元</font>即成为<font color='#15f234'>VIP" + vip + "</font>";
        }
        else {
            s.lbPro.text = "";
            s.vipBar.max = lib.MONEY;
        }
        s.reCheck();
        //材料获得跳转对应vip界面
        if (s._args) {
            s.showVIP = s._args + 1;
            s._args = null;
        }
        s.setIndex();
    };
    ViewVip.prototype.openGift = function () {
        GGlobal.layerMgr.open(UIConst.VIPGIFT);
    };
    ViewVip.prototype.checkGfitNotice = function () {
        this.btnGift.checkNotice = GGlobal.reddot.checkCondition(UIConst.VIPGIFT);
    };
    ViewVip.prototype.updateGuanQia = function () {
        var s = this;
        s.lbCZ.visible = !GGlobal.isIOS;
        s.lbPro.visible = !GGlobal.isIOS;
    };
    ViewVip.prototype.onShown = function () {
        var s = this;
        if (!s.effPart) {
            s.effPart = EffectMgr.addEff("uieff/10011", s.effContianer.displayListContainer, 320, 460, 800, -1);
            s.effPart.mc.scaleX = s.effPart.mc.scaleY = 3;
        }
        s.checkGfitNotice();
        GGlobal.modelvip.CG_OPENUI_2061();
        GGlobal.reddot.listen(ReddotEvent.CHECK_VIP, s.checkGfitNotice, s);
        GGlobal.control.listen(Enum_MsgType.VIP_OPEN, s.update, s);
        GGlobal.control.listen(Enum_MsgType.VIP_LQ, s.reCheck, s);
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, s.updateGuanQia, s);
    };
    ViewVip.prototype.onHide = function () {
        var s = this;
        if (s.effPart) {
            s.effPart.mc.scaleX = s.effPart.mc.scaleY = 1;
            s.effPart = EffectMgr.instance.removeEff(s.effPart);
            s.effPart = null;
        }
        s.n37.numItems = 0;
        GGlobal.reddot.remove(ReddotEvent.CHECK_VIP, s.checkGfitNotice, s);
        GGlobal.control.remove(Enum_MsgType.VIP_OPEN, s.update, s);
        GGlobal.control.remove(Enum_MsgType.VIP_LQ, s.reCheck, s);
        GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, s.updateGuanQia, s);
        GGlobal.layerMgr.close2(UIConst.VIP);
        IconUtil.setImg(s.boxTitle, null);
        IconUtil.setImg(s.pic, null);
    };
    ViewVip.prototype.eventFunction = function (t) {
        var self = this;
        var event = EventUtil.register;
        event(t, self.btn, EventUtil.TOUCH, self.lqHd, self);
        event(t, self.lbCZ, EventUtil.TOUCH, self.openCZ, self);
        event(t, self.btnleft, EventUtil.TOUCH, self.onLeft, self);
        event(t, self.btnGift, EventUtil.TOUCH, self.openGift, self);
        event(t, self.btnCheck, EventUtil.TOUCH, self.openDS, self);
        event(t, self.btnright, EventUtil.TOUCH, self.onRight, self);
    };
    ViewVip.URL = "ui://w4xdcvn7nvyw0";
    return ViewVip;
}(UIPanelBase));
__reflect(ViewVip.prototype, "ViewVip");
