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
var View_YanHui_HoldPanel = (function (_super) {
    __extends(View_YanHui_HoldPanel, _super);
    function View_YanHui_HoldPanel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YanHui_HoldPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "View_YanHui_HoldPanel"));
    };
    View_YanHui_HoldPanel.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_HoldPanel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list0.callbackThisObj = self;
        self.list0.itemRenderer = self.listRenderHandler0;
        self.list1.callbackThisObj = self;
        self.list1.itemRenderer = self.listRenderHandler1;
        _super.prototype.childrenCreated.call(this);
    };
    View_YanHui_HoldPanel.prototype.listRenderHandler0 = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.listArr0[index];
    };
    View_YanHui_HoldPanel.prototype.listRenderHandler1 = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.listArr1[index];
    };
    View_YanHui_HoldPanel.prototype.updateShow = function () {
        var self = this;
        var cfg0 = Config.party_298[1];
        var cfg1 = Config.party_298[2];
        self.listArr0 = ConfigHelp.makeItemListArr(JSON.parse(cfg0.show));
        self.listArr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg1.show));
        self.list0.numItems = self.listArr0.length;
        self.list1.numItems = self.listArr1.length;
        self.costLb0.visible = self.holdBt0.visible = Model_player.voMine.viplv >= cfg0.vip;
        self.vipLb0.visible = Model_player.voMine.viplv < cfg0.vip;
        self.vipLb0.text = "VIP" + cfg0.vip + "可举办";
        self.costLb1.visible = self.holdBt1.visible = Model_player.voMine.viplv >= cfg1.vip;
        self.vipLb1.visible = Model_player.voMine.viplv < cfg1.vip;
        self.vipLb1.text = "VIP" + cfg1.vip + "可举办";
        self.numLb0.text = "可参与人数：" + cfg0.num;
        self.numLb1.text = "可参与人数：" + cfg1.num;
        if (Model_player.voMine.viplv >= cfg0.vip) {
            var costItem0 = ConfigHelp.makeItemListArr(JSON.parse(cfg0.consume))[0];
            self.costLb0.setImgUrl(costItem0.icon);
            self.costLb0.setCount(costItem0.count);
        }
        if (Model_player.voMine.viplv >= cfg1.vip) {
            var costItem1 = ConfigHelp.makeItemListArr(JSON.parse(cfg1.consume))[0];
            self.costLb1.setImgUrl(costItem1.icon);
            self.costLb1.setCount(costItem1.count);
        }
    };
    View_YanHui_HoldPanel.prototype.onShown = function () {
        var self = this;
        self.register(true);
        self.checkBt.selected = false;
        self.updateShow();
        IconUtil.setImg(self.backImg0, Enum_Path.YANHUI_URL + "type1.png");
        IconUtil.setImg(self.backImg1, Enum_Path.YANHUI_URL + "type2.png");
    };
    View_YanHui_HoldPanel.prototype.onHide = function () {
        var self = this;
        self.register(false);
        self.list0.numItems = 0;
        self.list1.numItems = 0;
        IconUtil.setImg(self.backImg0, null);
        IconUtil.setImg(self.backImg1, null);
    };
    View_YanHui_HoldPanel.prototype.register = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.holdBt0, egret.TouchEvent.TOUCH_TAP, self.onHold0, self);
        EventUtil.register(pFlag, self.holdBt1, egret.TouchEvent.TOUCH_TAP, self.onHold1, self);
        EventUtil.register(pFlag, self.checkBt, egret.TouchEvent.TOUCH_TAP, self.onCheck, self);
        EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.onWFSM, self);
    };
    View_YanHui_HoldPanel.prototype.onWFSM = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.YANHUI);
    };
    View_YanHui_HoldPanel.prototype.onCheck = function () {
        var self = this;
    };
    View_YanHui_HoldPanel.prototype.onHold0 = function () {
        var self = this;
        var cfg0 = Config.party_298[1];
        if (ConfigHelp.checkEnough(cfg0.consume, false)) {
            GGlobal.modelYanHui.CG_House_juban_11457(cfg0.id, 0);
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                self.doHideAnimation();
            }));
        }
    };
    View_YanHui_HoldPanel.prototype.onHold1 = function () {
        var self = this;
        var cfg0 = Config.party_298[2];
        if (ConfigHelp.checkEnough(cfg0.consume, false)) {
            var value = self.checkBt.selected ? 1 : 0;
            GGlobal.modelYanHui.CG_House_juban_11457(cfg0.id, value);
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                self.doHideAnimation();
            }));
        }
    };
    View_YanHui_HoldPanel.URL = "ui://4x7dk3lhh7qe3";
    return View_YanHui_HoldPanel;
}(UIModalPanel));
__reflect(View_YanHui_HoldPanel.prototype, "View_YanHui_HoldPanel");
