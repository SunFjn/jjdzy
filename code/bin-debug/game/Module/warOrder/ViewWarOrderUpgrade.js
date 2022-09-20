/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var ViewWarOrderUpgrade = (function (_super) {
    __extends(ViewWarOrderUpgrade, _super);
    function ViewWarOrderUpgrade() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewWarOrderUpgrade.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder", "ViewWarOrderUpgrade"));
    };
    ViewWarOrderUpgrade.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("warOrder", "ViewWarOrderUpgrade").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.list.itemRenderer = self.onItemRender0;
        self.list.callbackThisObj = self;
    };
    // protected constructFromXML(xml: any): void {
    //     super.constructFromXML(xml);
    //     let t = this;
    //     CommonManager.parseChildren(t, t);
    //     t.list.itemRenderer = this.onItemRender0;
    //     t.list.callbackThisObj = this;
    // }
    ViewWarOrderUpgrade.prototype.onShown = function () {
        var self = this;
        self._cfgID = self._args;
        self.registerEvent(true);
        self.refreshData();
        IconUtil.setImg(self.img, Enum_Path.ICON70_URL + 4 + ".png");
    };
    ViewWarOrderUpgrade.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        GGlobal.modelActivity.CG_OPENACT(self._cfgID.groupId); //重新请求更新奖励列表数据
        IconUtil.setImg(self.img, null);
    };
    ViewWarOrderUpgrade.prototype.refreshData = function () {
        var t = this;
        var m = GGlobal.modelWarOrder;
        var voWarO = m.getWarOrder(t._cfgID.id);
        t.stateCtrl.selectedIndex = voWarO.upgradeFlag;
        var cfg = Config.xsljh1_338[t._cfgID.qs];
        t._rewardArr = ConfigHelp.makeItemListArr(cfg.reward);
        t.list.numItems = t._rewardArr.length;
        var t_charCfg = Config.shop_011[cfg.cz];
        t.btnGo.text = t_charCfg.RMB + "元";
        t.tf2.text = HtmlUtil.fontNoSize(cfg.jz, Color.GREENSTR) + "  超值奖励等你来拿";
    };
    ViewWarOrderUpgrade.prototype.registerEvent = function (pFlag) {
        GGlobal.control.register(pFlag, Enum_MsgType.WarOrder_REWARD_UPDATE, this.onUpdate, this);
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    ViewWarOrderUpgrade.prototype.onUpdate = function () {
        this.refreshData();
    };
    ViewWarOrderUpgrade.prototype.onBtnClick = function (e) {
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
    ViewWarOrderUpgrade.prototype.onItemRender0 = function (pIndex, pItem) {
        pItem.isShowEff = true;
        pItem.tipEnabled = true;
        pItem.vo = this._rewardArr[pIndex];
    };
    ViewWarOrderUpgrade.pkg = "warOrder";
    //>>>>end
    ViewWarOrderUpgrade.URL = "ui://5xptxudgp5ib1";
    return ViewWarOrderUpgrade;
}(UIModalPanel));
__reflect(ViewWarOrderUpgrade.prototype, "ViewWarOrderUpgrade");
