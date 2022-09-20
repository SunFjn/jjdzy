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
var ChildCrossShiLian = (function (_super) {
    __extends(ChildCrossShiLian, _super);
    function ChildCrossShiLian() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this.buffItemArr = [];
        return _this;
    }
    ChildCrossShiLian.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ChildCrossShiLian"));
    };
    ChildCrossShiLian.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.itemArr = [self.item0, self.item1, self.item2];
        self.buffItemArr = [self.item00, self.item01, self.item02];
    };
    ChildCrossShiLian.prototype.initView = function (pParent) {
    };
    ChildCrossShiLian.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelkfsl;
        if (model.floor <= 0)
            return;
        var cfg = Config.kfsl_767[model.floor];
        if (!cfg) {
            cfg = Config.kfsl_767[model.pass];
            self.maxLb.visible = true;
            self.passLb.text = "试炼" + model.pass + "关";
        }
        else {
            self.maxLb.visible = false;
            self.passLb.text = "试炼" + model.floor + "关";
        }
        var type = Math.floor(cfg.lx / 100);
        self.c1.selectedIndex = type - 1;
        self.moneyRe.setImgUrl("410411");
        self.moneyRe.setCount(model.trialNum);
        switch (type) {
            case 1:
                for (var i = 0; i < self.itemArr.length && i < model.roleData.length; i++) {
                    self.itemArr[i].setVo(model.roleData[i], cfg);
                }
                break;
            case 2:
                for (var i = 0; i < self.buffItemArr.length && i < model.buffData.length; i++) {
                    self.buffItemArr[i].setVo(model.buffData[i], cfg);
                }
                break;
            case 3:
                if (Config.kfsl_767[model.floor + 1]) {
                    self.maxLb.visible = false;
                    self.nextBt0.visible = model.chestNum > 0;
                }
                else {
                    self.nextBt0.visible = false;
                    self.maxLb.visible = true;
                }
                var cfg1 = Config.slbx_767[cfg.lx];
                var costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg1.xh));
                self.costRe.visible = model.chestNum > 0;
                self.drawBt.text = model.chestNum > 0 ? "开启宝箱" : "免费开箱";
                self.costRe.setImgUrl(costArr[0].icon);
                self.costRe.setCount(costArr[0].count);
                self.numLb.text = "开箱次数：" + (cfg1.sx - model.chestNum) + "/" + cfg1.sx;
                break;
        }
        if (type != 1) {
            for (var i = 0; i < self.itemArr.length; i++) {
                self.itemArr[i].clean();
            }
        }
        if (type != 2) {
            for (var i = 0; i < self.buffItemArr.length; i++) {
                self.buffItemArr[i].clean();
            }
        }
    };
    ChildCrossShiLian.prototype.nextHandler = function () {
        GGlobal.modelkfsl.CG_CrossTrial_nextFloor_10481();
    };
    ChildCrossShiLian.prototype.openPanel = function (pData) {
        var self = this;
        var model = GGlobal.modelkfsl;
        self.registerEvent(true);
        IconUtil.setImg(self.backImg, Enum_Path.SHILIAN_URL + "back.jpg");
        IconUtil.setImg(self.backIcon, Enum_Path.SHILIAN_URL + "back1.png");
        IconUtil.setImg(self.boxIcon, Enum_Path.SHILIAN_URL + "box.png");
        if (!self.boxEff) {
            self.boxEff = EffectMgr.addEff("uieff/10090", self.boxIcon.displayObject, self.boxIcon.width / 2 - 7, self.boxIcon.height / 2 - 29, 1000);
        }
        if (model.floor <= 0) {
            model.CG_CrossTrial_openUI_10471();
        }
        else {
            self.updateShow();
        }
    };
    ChildCrossShiLian.prototype.closePanel = function (pData) {
        var self = this;
        self.registerEvent(false);
        IconUtil.setImg(self.backImg, null);
        IconUtil.setImg(self.backIcon, null);
        IconUtil.setImg(self.boxIcon, null);
        if (self.boxEff) {
            EffectMgr.instance.removeEff(self.boxEff);
            self.boxEff = null;
        }
        for (var i = 0; i < self.itemArr.length; i++) {
            self.itemArr[i].clean();
            self.buffItemArr[i].clean();
        }
    };
    ChildCrossShiLian.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.CROSS_SHILIAN, self.updateShow, self);
        EventUtil.register(pFlag, self.nextBt, egret.TouchEvent.TOUCH_TAP, self.nextHandler, self);
        EventUtil.register(pFlag, self.nextBt0, egret.TouchEvent.TOUCH_TAP, self.nextHandler, self);
        EventUtil.register(pFlag, self.wfsmLb, egret.TouchEvent.TOUCH_TAP, self.wfsmHandler, self);
        EventUtil.register(pFlag, self.linkLb, egret.TouchEvent.TOUCH_TAP, self.linkHandler, self);
        EventUtil.register(pFlag, self.shopBt, egret.TouchEvent.TOUCH_TAP, self.openshop, self);
        EventUtil.register(pFlag, self.drawBt, egret.TouchEvent.TOUCH_TAP, self.openBox, self);
    };
    ChildCrossShiLian.prototype.openBox = function () {
        var model = GGlobal.modelkfsl;
        if (model.chestNum <= 0) {
            GGlobal.modelkfsl.CG_CrossTrial_getChest_10479();
        }
        else {
            var cfg = Config.kfsl_767[model.floor];
            var cfg1 = Config.slbx_767[cfg.lx];
            if (model.chestNum >= cfg1.sx) {
                ViewCommonWarn.text("开箱次数不足");
                return;
            }
            if (ConfigHelp.checkEnough(cfg1.xh, false)) {
                GGlobal.modelkfsl.CG_CrossTrial_getChest_10479();
            }
            else {
                ModelChongZhi.guideToRecharge();
            }
        }
    };
    ChildCrossShiLian.prototype.openshop = function () {
        GGlobal.layerMgr.open(UIConst.SHOP, Config.stroe_218[7].px);
    };
    ChildCrossShiLian.prototype.wfsmHandler = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.CROSS_SHILIAN);
    };
    ChildCrossShiLian.prototype.linkHandler = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.CROSS_SHILIAN_BUFF);
    };
    ChildCrossShiLian.URL = "ui://yqpfulefkh255v";
    return ChildCrossShiLian;
}(fairygui.GComponent));
__reflect(ChildCrossShiLian.prototype, "ChildCrossShiLian", ["IPanel"]);
