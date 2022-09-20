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
var ViewWarOrderUpgrade1 = (function (_super) {
    __extends(ViewWarOrderUpgrade1, _super);
    function ViewWarOrderUpgrade1() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.childrenCreated();
        return _this;
    }
    ViewWarOrderUpgrade1.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderUpgrade1"));
    };
    ViewWarOrderUpgrade1.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderUpgrade1").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.t0 = self.view.getTransition("t0");
        _super.prototype.childrenCreated.call(this);
        self.list.itemRenderer = self.onItemRender0;
        self.list.callbackThisObj = self;
    };
    ViewWarOrderUpgrade1.prototype.onShown = function () {
        var self = this;
        self._cfgID = self._args;
        self.registerEvent(true);
        self.refreshData();
    };
    ViewWarOrderUpgrade1.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        GGlobal.modelActivity.CG_OPENACT(self._cfgID.groupId); //重新请求更新奖励列表数据
    };
    ViewWarOrderUpgrade1.prototype.refreshData = function () {
        var t = this;
        var m = GGlobal.modelWarOrder;
        var voWarO = m.getWarOrder(t._cfgID.id);
        t.stateCtrl.selectedIndex = voWarO.upgradeFlag;
        var cfg = Config.xsljh1_338[t._cfgID.qs];
        t._rewardArr = ConfigHelp.makeItemListArr(cfg.show1);
        t.list.numItems = t._rewardArr.length;
        var t_charCfg = Config.shop_011[cfg.cz];
        t.btnGo.text = t_charCfg.RMB + "元";
        // t.tf2.text = HtmlUtil.fontNoSize(64800 + "", Color.GREENSTR) + "  超值奖励等你来拿"
        var picItem = ConfigHelp.makeItemListArr(cfg.show)[0];
        if (picItem.cfg.tips == 1) {
            t.setUIWuJ(picItem);
            t.pic.visible = false;
        }
        else if (picItem.cfg.tips == 2) {
            t.setUIRole(picItem);
            t.pic.visible = true;
        }
        t.ldName.text = picItem.name;
    };
    ViewWarOrderUpgrade1.prototype.registerEvent = function (pFlag) {
        GGlobal.control.register(pFlag, Enum_MsgType.WarOrder_REWARD_UPDATE, this.onUpdate, this);
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    ViewWarOrderUpgrade1.prototype.onUpdate = function () {
        this.refreshData();
    };
    ViewWarOrderUpgrade1.prototype.onBtnClick = function (e) {
        var m = GGlobal.modelWarOrder;
        switch (e.currentTarget) {
            case this.btnGo:
                var t_qs = this._cfgID.qs;
                for (var key in Config.xsljh1_338) {
                    var cfg = Config.xsljh1_338[key];
                    if (cfg.qs == t_qs) {
                        GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.cz, null, false);
                        break;
                    }
                }
                break;
        }
        GGlobal.layerMgr.close(UIConst.WAR_ORDER_UPGRADE);
    };
    ViewWarOrderUpgrade1.prototype.onItemRender0 = function (pIndex, pItem) {
        pItem.isShowEff = true;
        pItem.tipEnabled = true;
        pItem.vo = this._rewardArr[pIndex];
    };
    ViewWarOrderUpgrade1.prototype.setUIRole = function (v) {
        var self = this;
        var sys = v.cfg.sys;
        var tz = v.tzPas;
        if (self.godWeaponEff) {
            EffectMgr.instance.removeEff(self.godWeaponEff);
            self.godWeaponEff = null;
        }
        self.t0.setPaused(false);
        var cfg1;
        var effID = 0;
        switch (sys) {
            case UIConst.BAOWU:
                cfg1 = Config.bao_214[tz];
                IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                break;
            case UIConst.TIANSHU:
                cfg1 = Config.book_215[tz];
                IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                break;
            case UIConst.SHEN_JIAN:
                cfg1 = Config.sword_216[tz];
                effID = cfg1.tptx;
                IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                break;
            case UIConst.YIBAO:
                cfg1 = Config.yb_217[tz];
                effID = cfg1.tptx;
                IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                break;
            case UIConst.ZHAN_JIA:
                cfg1 = Config.clothes_212[tz];
                effID = cfg1.tptx;
                IconUtil.setImg(self.pic, Enum_Path.ZHANJIA_URL + cfg1.pic + ".png");
                break;
            case UIConst.BINGFA:
                cfg1 = Config.book_213[tz];
                effID = cfg1.tptx;
                IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                break;
            case UIConst.ZS_GODWEAPON:
                IconUtil.setImg(self.pic, null);
                var cfg7 = Config.sb_750[tz];
                self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg7.picture, self.pic.displayObject, self.pic.width / 2, self.pic.height / 2, 1000);
                break;
            case UIConst.SHAOZHU:
                IconUtil.setImg(self.pic, null);
                var cfg8 = Config.son_267[tz];
                self.t0.setPaused(true);
                self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg8.zs, self.pic.displayObject, self.pic.width / 2, self.pic.height, 1000);
                break;
            case UIConst.SHAOZHU_FASHION:
                IconUtil.setImg(self.pic, null);
                var cfg9 = Config.sonshow_267[tz];
                self.t0.setPaused(true);
                self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg9.zs, self.pic.displayObject, self.pic.width / 2, self.pic.height, 1000);
                break;
            case UIConst.QICE_STAR:
                var cfg10 = Config.qc_760[tz];
                IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg10.pic + ".png");
                break;
            case UIConst.HORSE:
            case UIConst.HORSE_HH:
                IconUtil.setImg(self.pic, null);
                self.t0.setPaused(true);
                var cfgHorse = Config.zq_773[tz];
                self.godWeaponEff = EffectMgr.addEff("body/" + cfgHorse.model + "/ride_st/ani", self.pic.displayObject, self.pic.width / 2, self.pic.height, 1000);
                break;
        }
        if (self.sysEff) {
            EffectMgr.instance.removeEff(self.sysEff);
            self.sysEff = null;
        }
        if (effID > 0) {
            self.sysEff = EffectMgr.addEff("uieff/" + effID, self.pic.displayObject, self.pic.width / 2, self.pic.height / 2, 1000, -1, true);
        }
    };
    ViewWarOrderUpgrade1.prototype.setUIWuJ = function (v) {
        var self = this;
        var tzPas = v.tzPas;
        var mx;
        var weapon;
        var hero;
        var hasSkill = true;
        if (v.tz == UIConst.WU_JIANG_SZ) {
            mx = Config.sz_739[tzPas].moxing;
            weapon = tzPas;
            hero = Config.hero_211[Math.floor(tzPas / 1000)];
        }
        else {
            hero = Config.hero_211[tzPas];
            weapon = mx = hero.type;
        }
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.setPos(self.posImg.x, self.posImg.y);
            self.awatar.uiparent = self.displayListContainer;
            self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
        }
        self.awatar.setBody(mx);
        self.awatar.setWeapon(weapon);
        self.awatar.onAdd();
        self.awatar.setScaleXY(1.5, 1.5);
    };
    //>>>>end
    ViewWarOrderUpgrade1.URL = "ui://89er3bo3e7lc1";
    return ViewWarOrderUpgrade1;
}(UIModalPanel));
__reflect(ViewWarOrderUpgrade1.prototype, "ViewWarOrderUpgrade1");
