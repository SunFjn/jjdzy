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
/**枭雄争霸 竞猜*/
var ViewCrossWarsBet = (function (_super) {
    __extends(ViewCrossWarsBet, _super);
    function ViewCrossWarsBet() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewCrossWarsBet.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossWarsBet"));
    };
    ViewCrossWarsBet.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        var self = this;
        self.view = fairygui.UIPackage.createObject("Arena", "ViewCrossWarsBet").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewCrossWarsBet.prototype.resetPosition = function () {
        var self = this;
        self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 1);
    };
    ViewCrossWarsBet.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var self = this;
        self._vo = self._args;
        self.addListen();
        self.update();
        if (self._vo.power1 >= self._vo.power2) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
        }
        if (self._vo.power1 == 0 || self._vo.power2 == 0) {
            self.ply0.touchable = false;
            self.ply1.touchable = false;
            self.ply0.visible = self._vo.power1 > 0;
            self.ply1.visible = self._vo.power2 > 0;
        }
        else {
            self.ply0.touchable = true;
            self.ply1.touchable = true;
            self.ply0.visible = self.ply1.visible = true;
        }
    };
    ViewCrossWarsBet.prototype.onHide = function () {
        this.removeListen();
    };
    ViewCrossWarsBet.prototype.addListen = function () {
        var self = this;
        self.btnBet.addClickListener(self.onBet, self);
        GGlobal.control.listen(Enum_MsgType.CROSSWARS_BUY_WIN, self.update, self);
    };
    ViewCrossWarsBet.prototype.removeListen = function () {
        var self = this;
        self.btnBet.removeClickListener(self.onBet, self);
        GGlobal.control.remove(Enum_MsgType.CROSSWARS_BUY_WIN, self.update, self);
        GGlobal.layerMgr.close(UIConst.CROSS_WARS_BET);
    };
    ViewCrossWarsBet.prototype.update = function () {
        var self = this;
        self.ply0.setVo(self._vo, 0);
        self.ply1.setVo(self._vo, 1);
        var cost = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2401))[0][2];
        self._cost = Number(cost);
        self.lbCost.text = "" + cost;
        if (self._vo.buywin > 0) {
            self.btnBet.text = "已押注";
        }
        else {
            self.btnBet.text = "押注";
        }
        self.lbTipCount1.text = "" + (2 * Number(cost));
        self.lbTipCount2.text = "" + (0.5 * Number(cost));
    };
    ViewCrossWarsBet.prototype.onBet = function () {
        var self = this;
        if (Model_player.voMine.yuanbao < self._cost) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        if (self._vo == null) {
            return;
        }
        if (self._vo.buywin > 0) {
            ViewCommonWarn.text("已押注");
            return;
        }
        GGlobal.modelCrossWars.CG_BUY_WIN(self._vo.turn, self._vo.index, self.c1.selectedIndex + 1);
    };
    ViewCrossWarsBet.URL = "ui://yqpfulef6wztn";
    return ViewCrossWarsBet;
}(UIModalPanel));
__reflect(ViewCrossWarsBet.prototype, "ViewCrossWarsBet");
