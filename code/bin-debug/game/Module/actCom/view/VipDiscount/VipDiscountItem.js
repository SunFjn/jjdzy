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
var VipDiscountItem = (function (_super) {
    __extends(VipDiscountItem, _super);
    function VipDiscountItem() {
        var _this = _super.call(this) || this;
        _this.awards = [];
        return _this;
    }
    VipDiscountItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComVipDis", "VipDiscountItem"));
    };
    VipDiscountItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.rewardList.callbackThisObj = self;
        self.rewardList.itemRenderer = self.awardsRender;
    };
    VipDiscountItem.prototype.setdata = function (cfg, isPlayEff) {
        if (isPlayEff === void 0) { isPlayEff = false; }
        var self = this;
        self._curCfg = cfg;
        self.extractBtn.addClickListener(self.onExtract, self);
        self.buyBtn.addClickListener(self.onBuy, self);
        var costArr = JSON.parse(cfg.oldmoney);
        self.oldPrice.text = "原价" + costArr[0][2] + "元宝";
        self.vipTxt.text = BroadCastManager.reTxt("Vip{0}", cfg.ID);
        self.awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.item));
        self.rewardList.numItems = self.awards.length;
        self.curData = Model_VipDiscount.getVipDisData(cfg.ID);
        if (Model_VipDiscount.curVip < cfg.ID) {
            self.c1.selectedIndex = 3;
        }
        else if (self.curData) {
            self.buyBtn.text = "购买(" + self.curData.buyCount + "/" + cfg.time + ")";
            self.curPrice.text = this.curData.curPrice + "";
            if (self.curData.buyCount >= cfg.time) {
                self.c1.selectedIndex = 2;
            }
            else {
                self.c1.selectedIndex = 1;
                self.buyBtn.checkNotice = true;
                if (isPlayEff) {
                    self.n14.visible = false;
                    self.buyBtn.visible = false;
                }
                else {
                    self.n14.visible = true;
                    self.buyBtn.visible = true;
                }
            }
        }
        else {
            self.c1.selectedIndex = 0;
        }
        if (isPlayEff) {
            if (!self._mc) {
                self._mc = EffectMgr.addEff("uieff/10091", self.displayListContainer, self.width - 100, self.height / 2, 500, 500, false);
                self._mc.refThis = self;
                self._mc.refKey = "_mc";
            }
            Timer.instance.callLater(self.runAfterMc, 500, self);
        }
        else {
            if (Timer.instance.has(self.runAfterMc, self))
                Timer.instance.remove(self.runAfterMc, self);
            if (self._mc) {
                EffectMgr.instance.removeEff(self._mc);
            }
        }
    };
    VipDiscountItem.prototype.runAfterMc = function () {
        var self = this;
        self.n14.visible = true;
        self.buyBtn.visible = true;
    };
    /**
     * 奖励List
     */
    VipDiscountItem.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    VipDiscountItem.prototype.clean = function () {
        var self = this;
        var len = self.awards.length;
        for (var i = 0; i < len; i++) {
            self.awards[i].tipEnabled = false;
            self.awards[i].showEff(false);
        }
        self.extractBtn.removeClickListener(self.onExtract, self);
        self.buyBtn.removeClickListener(self.onBuy, self);
    };
    /**
     * 购买
     */
    VipDiscountItem.prototype.onBuy = function () {
        GGlobal.modelVipDiscount.CG_BUY(this._curCfg.ID);
    };
    /**
     * 抽取折扣
     */
    VipDiscountItem.prototype.onExtract = function () {
        GGlobal.modelVipDiscount.CG_EXTRACT_DISCOUNT(this._curCfg.ID);
    };
    VipDiscountItem.URL = "ui://mpjztentvt1r12";
    return VipDiscountItem;
}(fairygui.GComponent));
__reflect(VipDiscountItem.prototype, "VipDiscountItem");
