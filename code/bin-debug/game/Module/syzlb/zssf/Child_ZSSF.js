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
var Child_ZSSF = (function (_super) {
    __extends(Child_ZSSF, _super);
    function Child_ZSSF() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        return _this;
    }
    Child_ZSSF.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "Child_ZSSF"));
    };
    Child_ZSSF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.itemArr = [self.item0, self.item1, self.item2, self.item3, self.item4];
    };
    Child_ZSSF.prototype.initView = function (pParent) {
    };
    Child_ZSSF.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelzssf;
        self.surLb.text = "今日掠夺次数：" + model.ldNum;
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "zssf" + self.c1.selectedIndex + ".jpg");
        Timer.instance.remove(self.resHandler, self);
        Timer.instance.remove(self.timeHandler, self);
        if (self.c1.selectedIndex == 0) {
            for (var i = 0; i < self.itemArr.length; i++) {
                self.itemArr[i].onShow(model.cityData[i + 1]);
            }
            if (!self.curItem) {
                self.itemArr[0].setChoose(true);
                self.curItem = self.itemArr[0];
            }
            var curData = self.curItem.cityData;
            var cfg = Config.zssf_294[curData.id];
            self.cityLb0.text = cfg.name;
            self.cityIcon.url = CommonManager.getUrl("syzlb", curData.id == 5 ? "city1" : "city0");
            var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
            self.rewardLb0.setImgUrl(rewardArr[0].icon);
            self.goGeneralBt.visible = curData.state == 0;
            if (curData.state == 0) {
                self.goGeneralBt.checkNotice = model.getHasWujiang(curData.id).length > 0;
                self.timeLb.text = "";
                self.rewardLb0.setCount(cfg.time / Model_ZSSF.rewardTime * rewardArr[0].count);
                self.qdLb.text = "需镇守时长：" + Math.floor(cfg.time / 3600) + "小时";
                self.timeLb.visible = self.rewardLb1.visible = false;
                self.head0.setdata(0);
            }
            else {
                if (curData.state == 1) {
                    var surTime = ConfigHelp.getSurTime(curData.times);
                    var rewardTime = Math.floor((cfg.time - surTime) / Model_ZSSF.rewardTime);
                    self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
                    self.rewardLb0.setCount(rewardTime * rewardArr[0].count + HtmlUtil.fontNoSize("(+" + rewardArr[0].count + "/10分钟)", Color.getColorStr(2)));
                    if (surTime > 0) {
                        Timer.instance.listen(self.timeHandler, self, 1000);
                    }
                }
                else {
                    self.timeLb.text = "已完成";
                    self.rewardLb0.setCount(cfg.time / Model_ZSSF.rewardTime * rewardArr[0].count);
                }
                self.timeLb.visible = true;
                self.qdLb.text = "被掠夺：" + curData.bldNum + "/" + Config.xtcs_004[8007].num;
                var rewardArr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
                self.rewardLb1.visible = true;
                self.rewardLb1.setImgUrl(rewardArr1[0].icon);
                self.rewardLb1.setCount(curData.bldNum * rewardArr1[0].count);
                self.head0.setdata(RoleUtil.getHeadRole(Config.hero_211[curData.generalID].head), -1, "总加成:" + (curData.per / 1000) + "%", -1, true);
            }
            self.goBt.checkNotice = model.ldNum > 0;
        }
        else {
            if (!model.ldData)
                return;
            self.goBt.checkNotice = false;
            for (var i = 0; i < self.itemArr.length; i++) {
                self.itemArr[i].onShow1(i + 1, model.ldData[i + 1]);
            }
            if (!self.curItem) {
                self.itemArr[0].setChoose(true);
                self.curItem = self.itemArr[0];
            }
            var curData = self.curItem.cityData1;
            var cfg = Config.zssf_294[self.curItem.cityID];
            self.cityLb1.text = cfg.name;
            self.cityIcon.url = CommonManager.getUrl("syzlb", self.curItem.cityID == 5 ? "city1" : "city0");
            if (curData) {
                var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
                self.resCom.setImgUrl(rewardArr[0].icon);
                self.resCom.setCount(rewardArr[0].count);
                self.ldNumLb.text = "可掠夺次数：" + curData.ldNum + "/" + Config.xtcs_004[8007].num;
                self.powerLb.text = curData.power + "";
                self.head1.setdata(RoleUtil.getHeadRole(Config.hero_211[curData.job].head), -1, "", -1, true);
                self.ldBt.checkNotice = curData.ldNum > 0 && model.ldNum > 0;
                self.ldImg.visible = curData.state == 1;
                self.ldBt.visible = curData.state != 1;
            }
            else {
                self.ldImg.visible = false;
            }
            self.cityDataGroup.visible = curData ? true : false;
            self.cityPrompt.visible = curData ? false : true;
            var surTime = ConfigHelp.getSurTime(model.resTime);
            if (surTime > 0) {
                self.freegroup.visible = true;
                self.resBt.text = "刷新";
                self.resTimeLb.text = DateUtil2.formatUsedTime(surTime, "下次免费刷新时间：uu分ss秒");
                Timer.instance.listen(self.resHandler, self, 1000);
                var costArr = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8005].other));
                self.costLb.setImgUrl(costArr[0].icon);
                self.costLb.setCount(costArr[0].count);
            }
            else {
                self.freegroup.visible = false;
                self.resBt.text = "免费刷新";
            }
        }
        self.reportBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.ZSSF, 1);
    };
    Child_ZSSF.prototype.timeHandler = function () {
        var self = this;
        var cfg = Config.zssf_294[self.curItem.cityData.id];
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        var surTime = ConfigHelp.getSurTime(self.curItem.cityData.times);
        self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
        var rewardTime = Math.floor((cfg.time - surTime) / Model_ZSSF.rewardTime);
        self.timeLb.text = "剩余时间：" + DateUtil.getHMSBySecond2(surTime);
        self.rewardLb0.setCount(rewardTime * rewardArr[0].count + HtmlUtil.fontNoSize("(+" + rewardArr[0].count + "/10分钟)", Color.getColorStr(2)));
        if (surTime <= 0) {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_ZSSF.prototype.resHandler = function () {
        var self = this;
        var model = GGlobal.modelzssf;
        var surTime = ConfigHelp.getSurTime(model.resTime);
        self.resTimeLb.text = self.resTimeLb.text = DateUtil2.formatUsedTime(surTime, "下次免费刷新时间：uu分ss秒");
        ;
        if (surTime <= 0) {
            Timer.instance.remove(self.resHandler, self);
            self.freegroup.visible = false;
            self.resBt.text = "免费刷新";
        }
    };
    Child_ZSSF.prototype.openPanel = function (pData) {
        var self = this;
        GGlobal.modelzssf.CG_GuardArea_openUI_10901();
        self.c1.selectedIndex = 0;
        self.registerEvent(true);
    };
    Child_ZSSF.prototype.closePanel = function (pData) {
        var self = this;
        IconUtil.setImg(self.backImg, null);
        Timer.instance.remove(self.resHandler, self);
        Timer.instance.remove(self.timeHandler, self);
        self.registerEvent(false);
    };
    Child_ZSSF.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.ZSSF, self.updateShow, self);
        GGlobal.control.register(pFlag, Enum_MsgType.ZSSF_PLAYEFF, self.playEff, self);
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
        EventUtil.register(pFlag, self.goBt, egret.TouchEvent.TOUCH_TAP, self.onGo, self);
        EventUtil.register(pFlag, self.goGeneralBt, egret.TouchEvent.TOUCH_TAP, self.onGoGeneral, self);
        EventUtil.register(pFlag, self.ldBt, egret.TouchEvent.TOUCH_TAP, self.onLD, self);
        EventUtil.register(pFlag, self.reportBt, egret.TouchEvent.TOUCH_TAP, self.onReport, self);
        EventUtil.register(pFlag, self.shopBt, egret.TouchEvent.TOUCH_TAP, self.onShop, self);
        EventUtil.register(pFlag, self.resBt, egret.TouchEvent.TOUCH_TAP, self.onRes, self);
        EventUtil.register(pFlag, self.smBt, egret.TouchEvent.TOUCH_TAP, self.onWFSM, self);
        for (var i = 0; i < self.itemArr.length; i++) {
            EventUtil.register(pFlag, self.itemArr[i], egret.TouchEvent.TOUCH_TAP, self.onItem, self);
        }
    };
    Child_ZSSF.prototype.onWFSM = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ZSSF);
    };
    Child_ZSSF.prototype.onRes = function () {
        var model = GGlobal.modelzssf;
        var surTime = ConfigHelp.getSurTime(model.resTime);
        if (surTime <= 0) {
            model.CG_GuardArea_refresh_10913(0);
        }
        else {
            if (ConfigHelp.checkEnough(Config.xtcs_004[8005].other, true)) {
                model.CG_GuardArea_refresh_10913(1);
            }
        }
    };
    Child_ZSSF.prototype.onShop = function () {
        GGlobal.layerMgr.open(UIConst.ZSSF_SHOP);
    };
    Child_ZSSF.prototype.onReport = function () {
        var self = this;
        self.reportBt.checkNotice = false;
        GGlobal.reddot.setCondition(UIConst.ZSSF, 1, false);
        GGlobal.layerMgr.open(UIConst.ZSSF_BATTLEREPORT);
    };
    Child_ZSSF.prototype.onLD = function () {
        var self = this;
        var model = GGlobal.modelzssf;
        if (self.ldBt.checkNotice) {
            model.cityID = self.curItem.cityData1.cityID;
            model.CG_GuardArea_plunder_10911(self.curItem.cityData1.cityID);
        }
        else {
            if (model.ldNum <= 0) {
                return ViewCommonWarn.text("掠夺次数不足");
            }
            else if (self.curItem.cityData1.ldNum <= 0) {
                return ViewCommonWarn.text("被掠夺次数不足");
            }
        }
    };
    Child_ZSSF.prototype.onGo = function () {
        var self = this;
        self.c1.selectedIndex = self.c1.selectedIndex == 0 ? 1 : 0;
        if (self.curItem)
            self.curItem.setChoose(false);
        Timer.instance.remove(self.timeHandler, self);
        self.curItem = null;
        GGlobal.modelzssf.CG_GuardArea_openPlunderUI_10909();
    };
    Child_ZSSF.prototype.onGoGeneral = function () {
        var self = this;
        GGlobal.layerMgr.open(UIConst.ZSSF_GO, self.curItem.cityData.id);
    };
    Child_ZSSF.prototype.onItem = function (evt) {
        var self = this;
        var item = evt.target;
        if (self.curItem && item.hashCode == self.curItem.hashCode)
            return;
        if (self.curItem)
            self.curItem.setChoose(false);
        item.setChoose(true);
        self.curItem = item;
        self.updateShow();
    };
    Child_ZSSF.prototype.playEff = function () {
        var self = this;
        for (var i = 0; i < self.itemArr.length; i++) {
            EffectMgr.addEff("uieff/10092", self.itemArr[i].displayListContainer, self.itemArr[i].width / 2, self.itemArr[i].height / 2, 1000, 1000, false);
        }
    };
    Child_ZSSF.URL = "ui://3o8q23uult8ir";
    return Child_ZSSF;
}(fairygui.GComponent));
__reflect(Child_ZSSF.prototype, "Child_ZSSF", ["IPanel"]);
