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
/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewGuanQiaSweeping = (function (_super) {
    __extends(ViewGuanQiaSweeping, _super);
    function ViewGuanQiaSweeping() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        var s = _this;
        s.loadRes("guanqia", "guanqia_atlas0");
        s.isShowOpenAnimation = false;
        return _this;
    }
    ViewGuanQiaSweeping.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaSweeping"));
    };
    ViewGuanQiaSweeping.prototype.childrenCreated = function () {
        GGlobal.createPack("guanqia");
        var s = this;
        s.view = fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaSweeping").asCom;
        s.contentPane = s.view;
        s.c1 = s.view.getController("c1");
        s.frame = (s.view.getChild("frame"));
        s.imgBG = (s.view.getChild("imgBG"));
        s.n10 = (s.view.getChild("n10"));
        s.btnSweep = (s.view.getChild("btnSweep"));
        s.lbTip = (s.view.getChild("lbTip"));
        s.lbCount = (s.view.getChild("lbCount"));
        s.n16 = (s.view.getChild("n16"));
        s.n23 = (s.view.getChild("n23"));
        s.n24 = (s.view.getChild("n24"));
        s.n25 = (s.view.getChild("n25"));
        s.n26 = (s.view.getChild("n26"));
        s.n27 = (s.view.getChild("n27"));
        s.n28 = (s.view.getChild("n28"));
        s.n29 = (s.view.getChild("n29"));
        s.n31 = (s.view.getChild("n31"));
        s.n32 = (s.view.getChild("n32"));
        s.n33 = (s.view.getChild("n33"));
        s.n30 = (s.view.getChild("n30"));
        s.n34 = (s.view.getChild("n34"));
        s.n36 = (s.view.getChild("n36"));
        s.n37 = (s.view.getChild("n37"));
        s.n38 = (s.view.getChild("n38"));
        s.grids = [s.n23, s.n24, s.n25, s.n26, s.n27];
        _super.prototype.childrenCreated.call(this);
        s.resetPosition();
        s.n29.setVirtual();
        s.n29.callbackThisObj = s;
        s.n29.itemRenderer = s.itemRender;
    };
    ViewGuanQiaSweeping.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.grid.showEff(true);
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ViewGuanQiaSweeping.prototype.onVIP = function () {
        this.onCloseHandler();
        GGlobal.layerMgr.open(UIConst.VIP);
    };
    ViewGuanQiaSweeping.prototype.changeMode = function (awards) {
        this.c1.setSelectedIndex(1);
        this._awards = awards;
        this.n29.numItems = awards.length;
    };
    ViewGuanQiaSweeping.prototype.onSweeping = function () {
        var m = GGlobal.modelGuanQia;
        if (m.SDCount < m.totalSD) {
            var r = GGlobal.modelGuanQia.challBossWithCond();
            if (r) {
                var lib = Config.clear_205;
                var cost = lib[m.SDCount + 1].xh;
                var yb = JSON.parse(cost)[0][2];
                if (yb == 0) {
                    this.sweepToServ();
                }
                else {
                    var b = ConfigHelp.checkEnough(cost, true);
                    if (b) {
                        ViewAlert.show("是否消耗<font color='#ffc334'>" + JSON.parse(cost)[0][2] + "元宝</font>扫荡？", Handler.create(this, this.sweepToServ), ViewAlert.OKANDCANCEL);
                    }
                }
            }
        }
        else
            ViewCommonWarn.text("没有扫荡次数");
    };
    ViewGuanQiaSweeping.prototype.DirectSweeping = function () {
        var m = GGlobal.modelGuanQia;
        if (m.SDCount < m.totalSD) {
            var r = GGlobal.modelGuanQia.challBossWithCond();
            if (r) {
                var lib = Config.clear_205;
                var cost = lib[m.SDCount + 1].xh;
                var yb = JSON.parse(cost)[0][2];
                if (yb == 0) {
                    this.sweepToServ();
                }
                else {
                    var b = ConfigHelp.checkEnough(cost, true);
                    if (b) {
                        this.sweepToServ();
                    }
                    else {
                        ModelChongZhi.guideToRecharge();
                    }
                }
            }
        }
        else
            ViewCommonWarn.text("没有扫荡次数");
    };
    ViewGuanQiaSweeping.prototype.oneKeyRL = function () {
        Model_RongLian.onekeyRongLian();
    };
    ViewGuanQiaSweeping.prototype.sweepToServ = function () {
        GGlobal.modelGuanQia.CG_SWEEP_1109();
    };
    ViewGuanQiaSweeping.prototype.onCloseHandler = function () {
        this.doHideAnimation();
        GGlobal.layerMgr.close(UIConst.GUANQIASWEEPING);
    };
    ViewGuanQiaSweeping.prototype.updateAwards = function () {
        var self = this;
        var m = GGlobal.modelGuanQia;
        var gkcfg = Config.BOSS_205[m.curGuanQiaLv];
        var skillArr = GGlobal.modelCouSkill.skillArr;
        var slen = skillArr.length;
        var tongqian = 0;
        var exp = 0;
        for (var i = 0; i < slen; i++) {
            var item = skillArr[i];
            if (item.isAct) {
                tongqian += item.cfg.lxtq;
                exp += item.cfg.lxjy;
            }
        }
        var awards = JSON.parse(gkcfg.reward);
        awards = ConfigHelp.makeItemListArr(awards);
        for (var i = 0; i < 5; i++) {
            var grid = this.grids[i];
            if (i < awards.length) {
                grid.tipEnabled = true;
                grid.grid.showEff(true);
                var vo = awards[i];
                if (vo.cfg.id == Enum_Attr.TONGBI) {
                    vo.count += tongqian;
                }
                else if (vo.cfg.id == Enum_Attr.EXP) {
                    vo.count += exp;
                }
                grid.vo = vo;
                grid.visible = true;
            }
            else {
                grid.tipEnabled = false;
                grid.grid.showEff(false);
                grid.visible = false;
            }
        }
        this.lbTip.visible = m.SDCount == 0;
        if (m.totalSD - m.SDCount > 0) {
            self.n36.text = self.lbCount.text = "剩余次数：<font color='" + Color.GREENSTR + "'>" + (m.totalSD - m.SDCount) + "/" + m.totalSD + "</font>";
        }
        else {
            self.n36.text = self.lbCount.text = "剩余次数：<font color='" + Color.REDSTR + "'>" + (m.totalSD - m.SDCount) + "/" + m.totalSD + "</font>";
        }
        if (m.SDCount < m.totalSD) {
            var lib = Config.clear_205;
            var cost = lib[m.SDCount + 1].xh;
            var yb = JSON.parse(cost)[0][2];
            this.n33.text = yb + "";
        }
    };
    ViewGuanQiaSweeping.prototype.checkRLNotice = function () {
        this.n30.checkNotice = Model_Bag.equipList.length >= Model_Bag.getCurBagNum();
    };
    ViewGuanQiaSweeping.prototype.onShown = function () {
        var s = this;
        this.c1.setSelectedIndex(0);
        s.btnSweep.addClickListener(s.onSweeping, s);
        s.n34.addClickListener(s.DirectSweeping, s);
        s.n30.addClickListener(s.oneKeyRL, s);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, s.checkRLNotice, s);
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_SWEEP, s.updateAwards, s);
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_SWEEP_01, s.changeMode, s);
        s.updateAwards();
        IconUtil.setImg(this.imgBG, Enum_Path.BACK_URL + "guanqiasd.jpg");
        GGlobal.modelGuanQia.CS_BOSSINFO_1103();
    };
    ViewGuanQiaSweeping.prototype.onHide = function () {
        var s = this;
        for (var i = 0; i < 5; i++) {
            var grid = this.grids[i];
            grid.tipEnabled = false;
            grid.grid.showEff(false);
            grid.visible = false;
        }
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, s.checkRLNotice, s);
        GGlobal.control.remove(Enum_MsgType.MSG_GQ_SWEEP, s.updateAwards, s);
        GGlobal.control.remove(Enum_MsgType.MSG_GQ_SWEEP_01, s.changeMode, s);
        s.btnSweep.removeClickListener(s.onSweeping, s);
        s.n34.removeClickListener(s.DirectSweeping, s);
        s.n30.removeClickListener(s.oneKeyRL, s);
        GGlobal.layerMgr.close(UIConst.GUANQIASWEEPING);
        if (s.imgBG)
            IconUtil.setImg(s.imgBG, null);
        s.n29.numItems = 0;
    };
    ViewGuanQiaSweeping.URL = "ui://r92dp953u94lr";
    return ViewGuanQiaSweeping;
}(UIModalPanel));
__reflect(ViewGuanQiaSweeping.prototype, "ViewGuanQiaSweeping");
