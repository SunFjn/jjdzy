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
var ViewWuJiangPanel = (function (_super) {
    __extends(ViewWuJiangPanel, _super);
    function ViewWuJiangPanel() {
        var _this = _super.call(this) || this;
        _this._godsel = 0; //神将的跳转
        _this.godItemArr = [];
        //武将
        _this.curWuJItem = null;
        _this.wuJItemArr = [];
        _this.wujiang_page_change = function () {
            var self = _this;
            if (self.curGodItem) {
                self.curGodItem.onClose();
                self.curGodItem.removeFromParent();
            }
            if (self.godWujiangItem) {
                self.godWujiangItem.closePanel();
                self.godWujiangItem.removeFromParent();
            }
            if (self.curWuJItem) {
                self.curWuJItem.removeEvent();
                self.curWuJItem.removeFromParent();
            }
            var selC1 = self.c1.selectedIndex;
            if (!self.wuJItemArr[selC1]) {
                if (selC1 == 0) {
                    self.wuJItemArr[selC1] = ChildWuJiangUpStar.createInstance();
                    self.wuJItemArr[selC1].setXY(0, 148);
                }
                else if (selC1 == 1) {
                    self.wuJItemArr[selC1] = ChildWuJiangUpJie.createInstance();
                    self.wuJItemArr[selC1].setXY(15, 146);
                }
                else if (selC1 == 2) {
                    self.wuJItemArr[selC1] = ChildWuJiangJiBan.createInstance();
                    self.wuJItemArr[selC1].setXY(15, 146);
                }
                else if (selC1 == 3) {
                    self.wuJItemArr[selC1] = ChildWuJiangJYin.createInstance();
                    self.wuJItemArr[selC1].setXY(15, 146);
                }
            }
            self.curWuJItem = self.wuJItemArr[selC1];
            self.curWuJItem.addEvent();
            self.view.addChild(self.curWuJItem);
            if (selC1 == 0) {
                self.curWuJItem.show();
            }
            else if (selC1 == 3) {
                self.curWuJItem.show();
            }
            self.update();
        };
        _this.godweapon_page_change = function () {
            var self = _this;
            Model_ZSGodWeapon.selectJob = 0;
            if (self.curGodItem) {
                Model_ZSGodWeapon.selectJob = self.curGodItem.getSelectJob();
                self.curGodItem.onClose();
                self.curGodItem.removeFromParent();
            }
            if (self.godWujiangItem) {
                self.godWujiangItem.closePanel();
                self.godWujiangItem.removeFromParent();
            }
            if (self.curWuJItem) {
                self.curWuJItem.removeEvent();
                self.curWuJItem.removeFromParent();
            }
            var selC3 = self.c3.selectedIndex;
            if (!self.godItemArr[selC3]) {
                if (selC3 == 0) {
                    self.godItemArr[selC3] = Child_ZSGodWeapon_UpStar.createInstance();
                    self.godItemArr[selC3].setXY(0, 148);
                }
                else if (selC3 == 1) {
                    self.godItemArr[selC3] = Child_ZSGodWeapon_CuiLian.createInstance();
                    self.godItemArr[selC3].setXY(0, 148);
                }
                else if (selC3 == 2) {
                    self.godItemArr[selC3] = Child_GodWeapon_DuanZao.createInstance();
                    self.godItemArr[selC3].setXY(6, 157);
                }
            }
            self.curGodItem = self.godItemArr[selC3];
            self.curGodItem.onOpen();
            self.view.addChildAt(self.curGodItem, self.view.numChildren - 2);
        };
        _this.godwujiang_page_change = function () {
            var self = _this;
            if (self.curGodItem) {
                self.curGodItem.onClose();
                self.curGodItem.removeFromParent();
            }
            if (self.curWuJItem) {
                self.curWuJItem.removeEvent();
                self.curWuJItem.removeFromParent();
            }
            if (self.godWujiangItem) {
                self.godWujiangItem.closePanel();
                self.godWujiangItem.removeFromParent();
            }
            if (!self.godWujiangItem) {
                self.godWujiangItem = ChildGodWuJiangView.createInstance();
            }
            self.godWujiangItem.openPanel(self._godsel);
            self.view.addChild(self.godWujiangItem);
        };
        _this.setSkin("wuJiang", "wuJiang_atlas0", "ViewWuJiangPanel");
        return _this;
    }
    ViewWuJiangPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "ViewWuJiangPanel"));
    };
    ViewWuJiangPanel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(ChildWuJiangUpJie.URL, ChildWuJiangUpJie);
        f.setPackageItemExtension(ChildWuJiangUpStar.URL, ChildWuJiangUpStar);
        f.setPackageItemExtension(ChildShiZhuang.URL, ChildShiZhuang);
        f.setPackageItemExtension(ChildWuJiangJYin.URL, ChildWuJiangJYin);
        f.setPackageItemExtension(VWuJiangSkill.URL, VWuJiangSkill);
        f.setPackageItemExtension(VWuJiangGrid.URL, VWuJiangGrid);
        f.setPackageItemExtension(VWuJiangJYin.URL, VWuJiangJYin);
        f.setPackageItemExtension(ChildWuJiangJiBan.URL, ChildWuJiangJiBan);
        f.setPackageItemExtension(Child_ZSGodWeapon_UpStar.URL, Child_ZSGodWeapon_UpStar);
        f.setPackageItemExtension(Child_ZSGodWeapon_CuiLian.URL, Child_ZSGodWeapon_CuiLian);
        f.setPackageItemExtension(VZSGodWeaponGrid.URL, VZSGodWeaponGrid);
        f.setPackageItemExtension(Child_GodWeapon_DuanZao.URL, Child_GodWeapon_DuanZao);
        f.setPackageItemExtension(VGodWeaponPoint.URL, VGodWeaponPoint);
        f.setPackageItemExtension(ChildGodWuJiang.URL, ChildGodWuJiang);
        f.setPackageItemExtension(ChildGodWuJiangXiuLian.URL, ChildGodWuJiangXiuLian);
        f.setPackageItemExtension(ChildGodWuJiangView.URL, ChildGodWuJiangView);
    };
    ViewWuJiangPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    ViewWuJiangPanel.prototype.openPanel = function (value) {
        var self = this;
        var st = 0;
        self._args = value;
        if (self._args)
            st = self._args;
        if (st >= 20) {
            self._godsel = st % 10;
        }
        else if (st >= 10) {
            self.c3.selectedIndex = st % 10;
        }
        else {
            self.c1.selectedIndex = st;
        }
        self.c2.selectedIndex = Math.floor(st / 10);
        self.selectPage();
    };
    ViewWuJiangPanel.prototype.onShown = function () {
        var self = this;
        var st = 0;
        if (self._args)
            st = self._args;
        if (st >= 20) {
            self._godsel = st % 10;
        }
        else if (st >= 10) {
            self.c3.selectedIndex = st % 10;
        }
        else {
            self.c1.selectedIndex = st;
        }
        self.c2.selectedIndex = Math.floor(st / 10);
        self.addListen();
        // self.selectPage();
        self.checkSBDiscount();
    };
    ViewWuJiangPanel.prototype.onWuJiang = function (evt) {
        var self = this;
        var bt = evt.target;
        if (bt.hashCode == self.wuJiangBt.hashCode) {
            if (self.c2.selectedIndex == 0)
                return;
            self.c2.selectedIndex = 0;
            self.c1.selectedIndex = 0;
            self._godsel = 0;
        }
        else if (bt.hashCode == self.godWuJiangBt.hashCode) {
            if (!ModuleManager.isOpen(UIConst.GOD_WUJIANG, true))
                return;
            if (self.c2.selectedIndex == 2)
                return;
            self.c2.selectedIndex = 2;
        }
        else {
            if (self.c2.selectedIndex == 1)
                return;
            if (!ModuleManager.isOpen(UIConst.ZS_GODWEAPON, true))
                return;
            self.c2.selectedIndex = 1;
            self.c3.selectedIndex = 0;
            self._godsel = 0;
        }
        self.selectPage();
        this.view.setChildIndex(this.wuJiangBt, this.view.numChildren - 1);
        this.view.setChildIndex(this.godWuJiangBt, this.view.numChildren - 1);
        this.view.setChildIndex(this.godWeaponBt, this.view.numChildren - 1);
    };
    ViewWuJiangPanel.prototype.onHide = function () {
        this.removeListen();
    };
    // private _first: boolean = false;
    ViewWuJiangPanel.prototype.addListen = function () {
        var self = this;
        // if (!self._first) {
        // GGlobal.modelEquip.CGGetEquips(3);
        // if (GGlobal.modelguanxian.guanzhi == 0) {
        // 	GGlobal.modelguanxian.csGuanxian();
        // }
        // 	self._first = true;
        // }
        ViewWuJiangPanel._selPage = 0;
        GGlobal.modelBySys.CGJiBan(Model_BySys.JIB_WUJIANG);
        GGlobal.modelWuJiang.CGGetWuJiang();
        var c = GGlobal.control;
        c.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        c.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.update, self);
        c.listen(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, self.update, self);
        c.listen(Enum_MsgType.WUJIANG_UPJIE_UPDATE, self.update, self);
        c.listen(Enum_MsgType.WUJIANG_UP_SKILL, self.update, self);
        c.listen(Enum_MsgType.WUJIANG_USE_DAN, self.update, self);
        // c.listen(Enum_MsgType.MSG_GXINIT, self.update, self);
        c.listen(Enum_MsgType.WUJIANG_OPENUI_UPDATE, self.selectPage, self);
        GGlobal.reddot.listen(ReddotEvent.CHECK_WU_JIANG, self.upCheck, self);
        GGlobal.reddot.listen(UIConst.GOD_WUJIANG, self.upCheck, self);
        GGlobal.reddot.listen(UIConst.ZS_GODWEAPON, self.upCheck, self);
        self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
        self.c3.addEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
        self.wuJiangBt.addClickListener(self.onWuJiang, self);
        self.godWeaponBt.addClickListener(self.onWuJiang, self);
        self.godWuJiangBt.addClickListener(self.onWuJiang, self);
        // self.viewJie.addEvent();
        // self.viewStar.addEvent();
        // self.viewJYin.addEvent();
        // self.viewJiB.addEvent();
        c.listen(Enum_MsgType.ACTIVITY_LOGIN_SEND, self.checkSBDiscount, self);
        c.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.checkSBDiscount, self);
    };
    ViewWuJiangPanel.prototype.removeListen = function () {
        var c = GGlobal.control;
        var self = this;
        Model_WuJiang.selectJob = 0;
        GGlobal.layerMgr.close(UIConst.WU_JIANG);
        c.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        c.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.update, self);
        c.remove(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE, self.update, self);
        c.remove(Enum_MsgType.WUJIANG_UPJIE_UPDATE, self.update, self);
        c.remove(Enum_MsgType.WUJIANG_UP_SKILL, self.update, self);
        c.remove(Enum_MsgType.WUJIANG_USE_DAN, self.update, self);
        // c.remove(Enum_MsgType.MSG_GXINIT, self.update, self);
        GGlobal.reddot.remove(ReddotEvent.CHECK_WU_JIANG, self.upCheck, self);
        GGlobal.reddot.remove(UIConst.ZS_GODWEAPON, self.upCheck, self);
        GGlobal.reddot.remove(UIConst.GOD_WUJIANG, self.upCheck, self);
        c.remove(Enum_MsgType.WUJIANG_OPENUI_UPDATE, self.selectPage, self);
        self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
        self.c3.removeEventListener(fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
        self.wuJiangBt.removeClickListener(self.onWuJiang, self);
        self.godWeaponBt.removeClickListener(self.onWuJiang, self);
        self.godWuJiangBt.removeClickListener(self.onWuJiang, self);
        c.remove(Enum_MsgType.ACTIVITY_LOGIN_SEND, self.checkSBDiscount, self);
        c.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.checkSBDiscount, self);
        // self.viewJie.removeEvent();
        // self.viewStar.removeEvent();
        // self.viewJYin.removeEvent();
        // self.viewJiB.removeEvent();
        if (self.curWuJItem) {
            self.curWuJItem.removeEvent();
            self.curWuJItem.removeFromParent();
        }
        self.curWuJItem = null;
        if (self.curGodItem) {
            self.curGodItem.onClose();
            self.curGodItem.removeFromParent();
        }
        self.curGodItem = null;
        // self.weaponItem.onClose();
        // self.godWeaponItem1.onClose();
        // self.duanZaoItem.onClose();
        Model_GlobalMsg.selectID = 0;
    };
    ViewWuJiangPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        for (var i = 0; i < this.wuJItemArr.length; i++) {
            var v = this.wuJItemArr[i];
            if (v)
                v.dispose();
        }
        this.wuJItemArr = []; //可能调用2次  设置null 前面会报错
        for (var i = 0; i < this.godItemArr.length; i++) {
            var v = this.godItemArr[i];
            if (v)
                v.dispose();
        }
        this.godItemArr = [];
    };
    ViewWuJiangPanel.prototype.selectPage = function () {
        var self = this;
        if (self.godWujiangItem) {
            self.godWujiangItem.closePanel();
        }
        switch (self.c2.selectedIndex) {
            case 0://普通武将
                self.wujiang_page_change();
                break;
            case 1://神兵
                self.godweapon_page_change();
                break;
            case 2://神将
                self.godwujiang_page_change();
                break;
        }
        self.tab1.parent.setChildIndex(self.tab1, self.tab1.parent.numChildren - 1);
    };
    ViewWuJiangPanel.prototype.update = function () {
        var self = this;
        if (self.c2.selectedIndex != 0)
            return;
        if (self.curWuJItem)
            self.curWuJItem.update();
        self.upCheck();
    };
    ViewWuJiangPanel.prototype.upCheck = function () {
        var r = GGlobal.reddot;
        var self = this;
        self.tab0.checkNotice = r.checkCondition(UIConst.WU_JIANG, 0) || r.checkCondition(UIConst.WU_JIANG, 4) || ViewMainBottomUI.checkShenjiangzhiliNotic();
        self.tab1.checkNotice = r.checkCondition(UIConst.WU_JIANG, 1);
        self.tab2.checkNotice = r.checkCondition(UIConst.WU_JIANG, 2);
        self.tab3.checkNotice = r.checkCondition(UIConst.WU_JIANG, 3);
        self.tab00.checkNotice = r.checkCondition(UIConst.ZS_GODWEAPON, 0);
        self.tab01.checkNotice = r.checkCondition(UIConst.ZS_GODWEAPON, 1);
        self.tab02.checkNotice = r.checkCondition(UIConst.ZS_GODWEAPON, 2);
        self.wuJiangBt.checkNotice = r.checkCondition(UIConst.WU_JIANG, 0) || r.checkCondition(UIConst.WU_JIANG, 4) || ViewMainBottomUI.checkShenjiangzhiliNotic() ||
            r.checkCondition(UIConst.WU_JIANG, 1) || r.checkCondition(UIConst.WU_JIANG, 2) || r.checkCondition(UIConst.WU_JIANG, 3);
        self.godWeaponBt.checkNotice = r.checkCondition(UIConst.ZS_GODWEAPON, 0) || r.checkCondition(UIConst.ZS_GODWEAPON, 1) || r.checkCondition(UIConst.ZS_GODWEAPON, 2);
        self.godWuJiangBt.checkNotice = r.checkCondition(UIConst.GOD_WUJIANG, 0) || r.checkCondition(UIConst.GOD_WUJIANG, 1) || r.checkCondition(UIConst.GOD_WUJIANG, 2) || r.checkCondition(UIConst.JUEXING, 7);
    };
    ViewWuJiangPanel.prototype.guideCheckTab = function (arg) {
        return this.c1.selectedIndex == arg;
    };
    ViewWuJiangPanel.prototype.guideTab = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.tab1, self.tab1.width / 2, self.tab1.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.tab1, self.tab1.width / 2, 0, -90, -106, -100);
    };
    ViewWuJiangPanel.prototype.guidePage = function (step) {
        if (this.wuJItemArr[1])
            this.wuJItemArr[1].guidePage(step);
    };
    ViewWuJiangPanel.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    ViewWuJiangPanel.prototype.check_wujiang_select = function () {
        if (this.c1.selectedIndex == 0 && this.wuJItemArr[0]) {
            return this.wuJItemArr[0].check_wujiang_select();
        }
        else {
            return false;
        }
    };
    ViewWuJiangPanel.prototype.check_wujiang_upstar = function () {
        if (this.c1.selectedIndex == 0 && this.wuJItemArr[0]) {
            return this.wuJItemArr[0].check_wujiang_upstar();
        }
        else {
            return false;
        }
    };
    ViewWuJiangPanel.prototype.guide_wujiang_select = function (step) {
        if (this.wuJItemArr[0])
            this.wuJItemArr[0].guide_wujiang_select(step);
    };
    ViewWuJiangPanel.prototype.guide_wujiang_upstar = function (step) {
        if (this.wuJItemArr[0])
            this.wuJItemArr[0].guide_wujiang_upstar(step);
    };
    ViewWuJiangPanel.prototype.guide_wujiang_change = function (step) {
        if (this.wuJItemArr[0])
            this.wuJItemArr[0].guide_wujiang_change(step);
    };
    /**
     * 检查神兵折扣图标显示
     */
    ViewWuJiangPanel.prototype.checkSBDiscount = function () {
        if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK)) {
            this.sbDiscountImg.visible = true;
            this.sbDiscountImg1.visible = true;
        }
        else {
            this.sbDiscountImg.visible = false;
            this.sbDiscountImg1.visible = false;
        }
    };
    ViewWuJiangPanel.URL = "ui://zyx92gzwtht40";
    return ViewWuJiangPanel;
}(UIPanelBase));
__reflect(ViewWuJiangPanel.prototype, "ViewWuJiangPanel");
