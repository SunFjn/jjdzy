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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var View_GCBZ_Panel = (function (_super) {
    __extends(View_GCBZ_Panel, _super);
    function View_GCBZ_Panel() {
        var _this = _super.call(this) || this;
        /**攻城令 */
        _this.itemID = 410439;
        /**物资 */
        _this.itemID1 = 410438;
        _this.posArr0 = [{ x: 50, y: 650 }, { x: 90, y: 400 }, { x: 120, y: 150 }, { x: 450, y: 570 }];
        _this.posArr1 = [{ x: 70, y: 650 }, { x: 250, y: 440 }, { x: 280, y: 150 }, { x: 630, y: 260 }];
        _this.isFirstOpen = false;
        _this.setSkin("GCBZ", "GCBZ_atlas0", "View_GCBZ_Panel");
        return _this;
    }
    View_GCBZ_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_Panel"));
    };
    View_GCBZ_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Child_GCBZ.URL, Child_GCBZ);
        f(GCBZCityItem.URL, GCBZCityItem);
        f(GCBZ_ShopItem.URL, GCBZ_ShopItem);
        f(GCBZ_BattleReportItem.URL, GCBZ_BattleReportItem);
    };
    View_GCBZ_Panel.prototype.initView = function () {
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.scrollItemToViewOnClick = false;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        self.buyBt.visible = false;
        self.tab0.data = 0;
        self.tab1.data = 1;
    };
    View_GCBZ_Panel.prototype.renderHandler = function (index, child) {
        var self = this;
        child.setVo(self.cityData[index], self.c1.selectedIndex);
    };
    View_GCBZ_Panel.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelgcbz;
        if (!model.cityData)
            return;
        if (self.isFirstOpen) {
            if (model.selDiff == 1) {
                self.c1.selectedIndex = Config.gcbz_777[model.curID].nd - 1;
            }
            else {
                self.c1.selectedIndex = model.diffState - 1;
            }
            var rewardMaxVo = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[8251].other))[0];
            if (model.rewardNum >= rewardMaxVo.count) {
                ViewCommonWarn.text("驻守奖励已达上限，请及时领取");
            }
            if (!self.curTab) {
                self.curTab = self.c1.selectedIndex == 0 ? self.tab0 : self.tab1;
                self.curTab.selected = true;
            }
            self.isFirstOpen = false;
        }
        self.cityData = model.cityData[self.c1.selectedIndex + 1];
        if (model.curID <= 0)
            model.curID = self.cityData[0][0].cfg.tgs;
        self.list.numItems = self.cityData.length;
        var count = Model_Bag.getItemCount(self.itemID);
        if (model.resetNum > 0 || count <= 0) {
            self.gridIcon.visible = false;
            // self.buyBt.visible = true;
            self.numLb.text = "重置次数：" + model.resetNum + "/" + ConfigHelp.getSystemNum(8253);
        }
        else {
            self.gridIcon.visible = true;
            // self.buyBt.visible = false;
            var itemVo = VoItem.create(self.itemID);
            self.gridIcon.vo = itemVo;
            self.numLb.text = itemVo.name + ":      " + count + "/1";
        }
        self.rewardGroup.visible = model.rewardNum > 0;
        var itemVo1 = VoItem.create(self.itemID1);
        itemVo1.count = model.rewardNum;
        self.grid.vo = itemVo1;
        self.timeLb.text = "剩余可驻守\n" + DateUtil2.formatUsedTime(model.times);
        if (model.times > 0 && model.zhuShouID > 0) {
            if (!Timer.instance.has(self.timeHandler, self)) {
                Timer.instance.listen(self.timeHandler, self, 1000);
            }
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
        self.locationBt.visible = self.locationBt1.visible = model.selDiff == 1 && self.c1.selectedIndex == Config.gcbz_777[model.curID].nd - 1;
    };
    View_GCBZ_Panel.prototype.locationVomine = function () {
        var self = this;
        var model = GGlobal.modelgcbz;
        GGlobal.control.register(false, Enum_MsgType.GCBZ_OPEN, self.locationVomine, self);
        if (model.selDiff == 1 && self.c1.selectedIndex == Config.gcbz_777[model.curID].nd - 1) {
            var index = -1;
            var posX = 0;
            for (var i = 0; i < self.cityData.length; i++) {
                for (var j = 0; j < self.cityData[i].length; j++) {
                    if (model.zhuShouID > 0) {
                        if (self.cityData[i][j].cfg.tgs == model.zhuShouID) {
                            index = i;
                            if (Config.gcbz_777[model.curID].nd == 1) {
                                posX = self.posArr0[j].x;
                            }
                            else {
                                posX = self.posArr1[j].x;
                            }
                            break;
                        }
                    }
                    else {
                        if (self.cityData[i][j].cfg.tgs == model.curID) {
                            index = i;
                            if (Config.gcbz_777[model.curID].nd == 1) {
                                posX = self.posArr0[j].x;
                            }
                            else {
                                posX = self.posArr1[j].x;
                            }
                            break;
                        }
                    }
                }
                if (index >= 0)
                    break;
            }
            self.list.scrollPane.setPosX(index * 720 + posX);
        }
    };
    View_GCBZ_Panel.prototype.timeHandler = function () {
        var self = this;
        var model = GGlobal.modelgcbz;
        model.times--;
        if (model.times <= 0) {
            Timer.instance.remove(self.timeHandler, self);
        }
        self.timeLb.text = "剩余可驻守\n" + DateUtil2.formatUsedTime(model.times);
    };
    View_GCBZ_Panel.prototype.onShown = function () {
        var self = this;
        self.isFirstOpen = true;
        self.updateShow();
        self.register(true);
        self.updateNotice();
        GGlobal.modelgcbz.CG_AttackCity_openUI_12051();
    };
    View_GCBZ_Panel.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        self.register(false);
        if (self.curTab)
            self.curTab.selected = false;
        self.curTab = null;
        Timer.instance.remove(self.timeHandler, self);
    };
    View_GCBZ_Panel.prototype.moveTo = function () {
        var self = this;
        for (var i = 0; i < self.cityData.length; i++) {
            for (var j = 0; j < self.cityData[i].length; j++) {
                if (self.cityData[i][j].cfg.tgs == GGlobal.modelgcbz.curID) {
                    GGlobal.control.notify(Enum_MsgType.GCBZ_MOVE_TWEEN, j);
                    return;
                }
            }
        }
    };
    View_GCBZ_Panel.prototype.updateNotice = function () {
        var self = this;
        var r = GGlobal.reddot;
        self.reportBt.checkNotice = r.checkCondition(UIConst.GCBZ, 1);
        self.rewardBt.checkNotice = r.checkCondition(UIConst.GCBZ, 0);
    };
    View_GCBZ_Panel.prototype.register = function (pFlag) {
        var self = this;
        var e = EventUtil.register;
        e(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.OnChange, self);
        e(pFlag, self.resetBt, egret.TouchEvent.TOUCH_TAP, self.OnReset, self);
        e(pFlag, self.buyBt, egret.TouchEvent.TOUCH_TAP, self.OnBuy, self);
        e(pFlag, self.reportBt, egret.TouchEvent.TOUCH_TAP, self.OnReport, self);
        e(pFlag, self.explainBt, egret.TouchEvent.TOUCH_TAP, self.OnExplain, self);
        e(pFlag, self.rewardBt, egret.TouchEvent.TOUCH_TAP, self.OnReward, self);
        e(pFlag, self.grid, egret.TouchEvent.TOUCH_TAP, self.OnReward, self);
        e(pFlag, self.shopBt, egret.TouchEvent.TOUCH_TAP, self.OnShop, self);
        e(pFlag, self.locationBt, egret.TouchEvent.TOUCH_TAP, self.OnLocation, self);
        e(pFlag, self.locationBt1, egret.TouchEvent.TOUCH_TAP, self.OnLocation, self);
        e(pFlag, self.tab0, egret.TouchEvent.TOUCH_TAP, self.tabHandler, self);
        e(pFlag, self.tab1, egret.TouchEvent.TOUCH_TAP, self.tabHandler, self);
        GGlobal.control.register(pFlag, Enum_MsgType.GCBZ_MOVE, self.moveTo, self);
        GGlobal.control.register(pFlag, Enum_MsgType.GCBZ_OPEN, self.locationVomine, self);
        GGlobal.control.register(pFlag, Enum_MsgType.GCBZ_RESET, self.listReset, self);
        GGlobal.control.register(pFlag, Enum_MsgType.GCBZ_REWARD_SHOW, self.rewardShow, self);
        GGlobal.control.register(pFlag, UIConst.GCBZ, self.updateShow, self);
        GGlobal.reddot.register(pFlag, UIConst.GCBZ, self.updateNotice, self);
    };
    View_GCBZ_Panel.prototype.tabHandler = function (evt) {
        var self = this;
        var model = GGlobal.modelgcbz;
        var tab = evt.target;
        if (tab.data == self.c1.selectedIndex)
            return;
        if (tab.data < model.diffState) {
            if (self.curTab)
                self.curTab.selected = false;
            self.c1.selectedIndex = tab.data;
            self.curTab = tab;
        }
        else {
            tab.selected = false;
            ViewCommonWarn.text("请先通关普通难度");
        }
    };
    View_GCBZ_Panel.prototype.rewardShow = function () {
        var self = this;
        var model = GGlobal.modelgcbz;
        var itemVo = VoItem.create(self.itemID1);
        itemVo.count = model.rewardNum;
        View_Reward_Show.show([itemVo], "", "", Handler.create(self, self.onDraw), model.rewardNum > 0 ? 1 : 0);
        self.grid.vo = itemVo;
    };
    View_GCBZ_Panel.prototype.listReset = function () {
        var self = this;
        if (self.list.numItems > 0) {
            self.list.scrollToView(0);
        }
    };
    View_GCBZ_Panel.prototype.OnChange = function () {
        var self = this;
        self.list.numItems = 0;
        self.updateShow();
    };
    View_GCBZ_Panel.prototype.OnLocation = function () {
        var self = this;
        self.locationVomine();
    };
    View_GCBZ_Panel.prototype.OnShop = function () {
        GGlobal.layerMgr.open(UIConst.GCBZ_SHOP);
    };
    View_GCBZ_Panel.prototype.OnReward = function () {
        GGlobal.modelgcbz.CG_GCBZ_LOOKBOX();
    };
    View_GCBZ_Panel.prototype.onDraw = function () {
        var model = GGlobal.modelgcbz;
        if (model.rewardNum > 0) {
            GGlobal.layerMgr.close2(UIConst.REWARD_SHOW);
            model.CG_AttackCity_getAward_12055();
        }
        else {
            ViewCommonWarn.text("没有可领奖励");
        }
    };
    View_GCBZ_Panel.prototype.OnExplain = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.GCBZ);
    };
    View_GCBZ_Panel.prototype.OnReport = function () {
        GGlobal.layerMgr.open(UIConst.GCBZ_BATTLEREPORT);
    };
    View_GCBZ_Panel.prototype.OnReset = function () {
        var self = this;
        var model = GGlobal.modelgcbz;
        if (model.isTimeIn()) {
            return ViewCommonWarn.text("非活动时间中");
        }
        if (model.selDiff == 0) {
            return ViewCommonWarn.text("请先选择难度进行挑战");
        }
        else if (model.curID % 1000 <= 1 && model.state == 0) {
            return ViewCommonWarn.text("未通关第一关，不可重置");
        }
        if (model.resetNum > 0 || Model_Bag.getItemCount(self.itemID) > 0) {
            var str = "";
            var cfg = Config.gcbz_777[model.curID];
            if (model.curID % 1000 <= 1) {
                str = ConfigHelp.reTxt("当前已在{0}，是否仍然重置？", HtmlUtil.fontNoSize(model.difArr[cfg.nd] + "第1关", Color.getColorStr(2)));
            }
            else {
                str = ConfigHelp.reTxt("重置后将回到{0}并退出已驻守的城池，是否重置？", HtmlUtil.fontNoSize(model.difArr[cfg.nd] + "第1关", Color.getColorStr(2)));
            }
            ViewAlert.show(str, Handler.create(self, function () {
                model.CG_AttackCity_again_12071();
            }));
        }
        else {
            ViewCommonWarn.text("已无重置次数");
        }
    };
    View_GCBZ_Panel.prototype.OnBuy = function () {
        var _this = this;
        var self = this;
        var model = GGlobal.modelgcbz;
        if (model.isTimeIn()) {
            return ViewCommonWarn.text("当天活动已结束");
        }
        if (model.buyNum >= model.numData.length) {
            ViewCommonWarn.text("已达购买上限");
        }
        else {
            var t_canBuy_1 = model.numData.length - model.buyNum;
            ViewAlertBuy2.show(1, t_canBuy_1, Enum_Attr.yuanBao, function (pData) {
                pData.desStr = "\u4ECA\u65E5\u5269\u4F59\u8D2D\u4E70\u6B21\u6570\uFF1A<font color='" + Color.GREENSTR + "'>" + t_canBuy_1 + "</font>";
                var t_total = self.getBuyCountNeedByCount(pData.value);
                pData.totalPrice = t_total;
            }, function (pData) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    self.onBuyCountOk(pData.value);
                    return [2 /*return*/, true];
                });
            }); }, self);
        }
    };
    View_GCBZ_Panel.prototype.getBuyCountNeedByCount = function (pCount) {
        var self = this;
        var model = GGlobal.modelgcbz;
        var t_total = 0;
        for (var i = model.buyNum; i < pCount + model.buyNum; i++) {
            t_total += JSON.parse(model.numData[i].xh)[0][2];
        }
        return t_total;
    };
    View_GCBZ_Panel.prototype.onBuyCountOk = function (pCount) {
        if (pCount <= 0)
            return;
        var t = this;
        var t_need = t.getBuyCountNeedByCount(pCount);
        if (!FastAPI.checkItemEnough(Enum_Attr.yuanBao, t_need, true))
            return;
        GGlobal.modelgcbz.CG_AttackCity_buyTimes_12073(pCount);
    };
    View_GCBZ_Panel.URL = "ui://vgiijkm8uvs30";
    return View_GCBZ_Panel;
}(UIPanelBase));
__reflect(View_GCBZ_Panel.prototype, "View_GCBZ_Panel");
