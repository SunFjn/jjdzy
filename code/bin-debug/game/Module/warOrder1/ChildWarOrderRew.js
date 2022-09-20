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
var ChildWarOrderRew = (function (_super) {
    __extends(ChildWarOrderRew, _super);
    function ChildWarOrderRew() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.awatar = null;
        return _this;
    }
    ChildWarOrderRew.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder1", "ChildWarOrderRew"));
    };
    ChildWarOrderRew.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.t0 = t.getTransition("t0");
        t.list.itemRenderer = t.onRewardItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
        t.listShow.itemRenderer = t.onRewardShow;
        t.listShow.callbackThisObj = t;
    };
    ChildWarOrderRew.prototype.updata = function (v, actVo) {
        var t = this;
        t._listDat = v;
        t._curActVo = actVo;
        t.list.numItems = v.length;
        var m = GGlobal.modelWarOrder;
        var voWarO = m.getWarOrder(t._curActVo.id);
        //奖励页的聚焦有特殊逻辑
        var t_listCom = this.list;
        var t_voList = v;
        var t_targetIndex = 0;
        var t_hasCanGet = false;
        for (var i = 0; i < t_voList.length; i++) {
            var t_vo = t_voList[i];
            if (t_vo.state0 == Model_WarOrderAct.STATE_CAN_GET || t_vo.state1 == Model_WarOrderAct.STATE_CAN_GET) {
                t_targetIndex = i;
                t_hasCanGet = true;
                break;
            }
        }
        if (t_hasCanGet) {
            t_listCom.scrollToView(t_targetIndex, true, true);
        }
        else {
            t_targetIndex = voWarO.levelId; //- 2;
            t_targetIndex = t_targetIndex < 0 ? 0 : t_targetIndex;
            t_targetIndex = t_targetIndex < m.getLvMax(t._curActVo.qs) ? t_targetIndex : m.getLvMax(t._curActVo.qs) - 1;
            t_listCom.scrollToView(t_targetIndex, true, true);
        }
        t.showBig(t_targetIndex);
        var picCfg = Config.xsljh1_338[actVo.qs];
        var picItem = ConfigHelp.makeItemListArr(picCfg.show)[0];
        if (picItem.cfg.tips == 1) {
            t.setUIWuJ(picItem);
            t.pic.visible = false;
        }
        else if (picItem.cfg.tips == 2) {
            t.setUIRole(picItem);
            t.pic.visible = true;
        }
        t.ldName.text = picItem.name;
        // IconUtil.setImg(t.ldName, Enum_Path.PIC_URL + picItem.cfg.use + ".png");
        t._rewardArr = ConfigHelp.makeItemListArr(picCfg.reward);
        t.listShow.numItems = t._rewardArr.length;
        t.refreshLevelInfo();
        t.registerEvent(true);
        if (t._curActVo) {
            if (!Timer.instance.has(t.onDateUpdate, t))
                Timer.instance.listen(t.onDateUpdate, t, 1000);
        }
    };
    ChildWarOrderRew.prototype.refreshLevelInfo = function () {
        var t = this;
        var m = GGlobal.modelWarOrder;
        var voWarO = m.getWarOrder(t._curActVo.id);
        var t_levelId = voWarO.levelId;
        var t_curExp = voWarO.curExp;
        var t_vo = m.getRewardVoById(t_levelId, t._curActVo);
        if (t_vo) {
            if (t_vo.cfg.exp == 0) {
                this.pb.visible = false;
                this.pb.max = t_vo.cfg.exp;
                this.pb.value = t_vo.cfg.exp;
                this.pb._titleObject.text = "已满级";
            }
            else {
                this.pb.visible = true;
                this.pb.max = t_vo.cfg.exp;
                this.pb.value = t_curExp;
            }
        }
        else {
        }
        this.tfLevel.text = t_levelId + "";
        var t_upgradeFlag = voWarO.upgradeFlag;
        this.updateFlagCtrl.selectedIndex = t_upgradeFlag;
        egret.Tween.removeTweens(t.imgLock);
        if (t_upgradeFlag == 0) {
            t.scaling();
        }
    };
    //===================================== private method =====================================
    ChildWarOrderRew.prototype.onRewardItemRender = function (pIndex, pItem) {
        pItem.setData(this._listDat[pIndex], this._curActVo);
    };
    ChildWarOrderRew.prototype.onRewardShow = function (pIndex, pItem) {
        pItem.vo = this._rewardArr[pIndex];
    };
    ChildWarOrderRew.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
        t.itemBig.clean();
        Timer.instance.remove(t.onDateUpdate, t);
        if (t.awatar) {
            t.awatar.onRemove();
            t.awatar = null;
        }
        IconUtil.setImg(t.pic, null);
        if (t.godWeaponEff) {
            EffectMgr.instance.removeEff(t.godWeaponEff);
            t.godWeaponEff = null;
        }
        if (t.sysEff) {
            EffectMgr.instance.removeEff(t.sysEff);
            t.sysEff = null;
        }
        egret.Tween.removeTweens(t.imgLock);
    };
    ChildWarOrderRew.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnBuyLv, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnLock, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.list.scrollPane, fairygui.ScrollPane.SCROLL, t.scrollComp, t);
        ReddotMgr.ins().register(t._curActVo.groupId + "_1", t.btnGetAll.noticeImg);
    };
    ChildWarOrderRew.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnLock:
                GGlobal.layerMgr.open(UIConst.WAR_ORDER_UPGRADE1, t._curActVo);
                break;
            case t.btnGetAll:
                var canGet = false;
                for (var i = 0; i < t._listDat.length; i++) {
                    var v = t._listDat[i];
                    if (v.state0 == 1 || v.state1 == 1) {
                        canGet = true;
                        break;
                    }
                }
                if (!canGet) {
                    ViewCommonWarn.text("暂无奖励可领");
                    return;
                }
                GGlobal.modelWarOrder.CG12251(0, 0, 1, t._curActVo.groupId);
                break;
            case t.btnBuyLv:
                GGlobal.layerMgr.open(UIConst.WAR_ORDER_BUYCT1, t._curActVo);
                break;
        }
    };
    ChildWarOrderRew.prototype.scrollComp = function () {
        var t = this;
        var curpage = this.list.getFirstChildInView();
        t.showBig(curpage + 4);
    };
    ChildWarOrderRew.prototype.showBig = function (curpage) {
        var t = this;
        var big;
        while (true) {
            big = t._listDat[curpage];
            if (big == null || big.id % 5 == 0) {
                break;
            }
            else {
                curpage++;
            }
        }
        if (big == null) {
            big = t._listDat[t._listDat.length - 1];
        }
        t.itemBig.updata(big);
    };
    ChildWarOrderRew.prototype.setUIRole = function (v) {
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
    ChildWarOrderRew.prototype.setUIWuJ = function (v) {
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
    /** 刷新时间 */
    ChildWarOrderRew.prototype.onDateUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
            var t_remainS = t_end - servTime;
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //小于24小时
                    // t_dateStr = DateUtil.formatUsedTime(t_remainS, "活动剩余时间：\nhh小时uu分ss秒");
                    t_dateStr = "活动剩余时间：\n" + HtmlUtil.font(DateUtil.formatUsedTime(t_remainS, "hh小时uu分ss秒"), Color.GREENSTR);
                }
                else {
                    // t_dateStr = DateUtil.formatUsedTime(t_remainS, "活动剩余时间：\ndd天hh小时");
                    t_dateStr = "活动剩余时间：\n" + HtmlUtil.font(DateUtil.formatUsedTime(t_remainS, "dd天hh小时"), Color.GREENSTR);
                }
            }
            else {
                t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
            }
        }
        this.tfDate.text = t_dateStr;
    };
    //缩放
    ChildWarOrderRew.prototype.scaling = function () {
        var t = this;
        egret.Tween.get(t.imgLock).wait(500).call(t.fireEff, t).wait(500).call(t.fireEff, t).wait(1000).call(t.scaling, t);
    };
    ChildWarOrderRew.prototype.fireEff = function () {
        var t = this;
        egret.Tween.get(t.imgLock).to({ scaleX: 1.1, scaleY: 1.1 }, 100, egret.Ease.backInOut).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backInOut);
    };
    //>>>>end
    ChildWarOrderRew.URL = "ui://89er3bo3e7lcp";
    return ChildWarOrderRew;
}(fairygui.GComponent));
__reflect(ChildWarOrderRew.prototype, "ChildWarOrderRew");
