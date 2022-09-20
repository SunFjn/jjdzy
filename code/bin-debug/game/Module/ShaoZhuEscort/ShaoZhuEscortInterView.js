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
/**
 * 少主护送拦截面板
 */
var ShaoZhuEscortInterView = (function (_super) {
    __extends(ShaoZhuEscortInterView, _super);
    function ShaoZhuEscortInterView() {
        var _this = _super.call(this) || this;
        _this._awards = [];
        fairygui.UIObjectFactory.setPackageItemExtension(EscortRewardItem.URL, EscortRewardItem);
        _this.loadRes();
        return _this;
    }
    ShaoZhuEscortInterView.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortInterView"));
    };
    ShaoZhuEscortInterView.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("ShaoZhuEscort");
        self.view = fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortInterView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        // self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ShaoZhuEscortInterView.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._awards[idx], idx);
    };
    ShaoZhuEscortInterView.prototype.onShown = function () {
        var self = this;
        self.addListen();
        self._data = this._args;
        if (!self._data)
            return;
        var cfg = Config.szhs_401[self._data.guardId];
        if (cfg) {
            self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.lj));
            self.list.numItems = self._awards.length;
            self.guardNameLb.text = HtmlUtil.fontNoSize("护送武将：" + cfg.name, Color.getColorStr(cfg.pz));
        }
        self.head.setdata(self._data.headID, -1, null, 0, false, self._data.frameID, self._data.country);
        self.nameLb.text = self._data.playerName;
        self.powerLb.text = "战力：" + self._data.power;
    };
    ShaoZhuEscortInterView.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT_INTER);
    };
    ShaoZhuEscortInterView.prototype.addListen = function () {
        var self = this;
        self.fightBtn.addClickListener(self.onFight, self);
        self.leftBtn.addClickListener(self.onLeft, self);
    };
    ShaoZhuEscortInterView.prototype.removeListen = function () {
        var self = this;
        self.fightBtn.removeClickListener(self.onFight, self);
        self.leftBtn.removeClickListener(self.onLeft, self);
    };
    /**
     * 战斗
     */
    ShaoZhuEscortInterView.prototype.onFight = function () {
        if (Model_ShaoZhuEscort.inter <= 0) {
            ViewCommonWarn.text("今日拦截次数已耗尽");
            return;
        }
        GGlobal.modelShaoZhuEscort.CG_INTERCEPT(this._data.playerId);
    };
    /**
     * 离开
     */
    ShaoZhuEscortInterView.prototype.onLeft = function () {
        this.doHideAnimation();
        this.removeListen();
    };
    ShaoZhuEscortInterView.URL = "ui://lnw94ki2lnitl";
    return ShaoZhuEscortInterView;
}(UIModalPanel));
__reflect(ShaoZhuEscortInterView.prototype, "ShaoZhuEscortInterView");
