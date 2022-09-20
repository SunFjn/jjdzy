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
 * 桃园结义开启BOSS提示界面
 */
var TYJY_BossTips = (function (_super) {
    __extends(TYJY_BossTips, _super);
    function TYJY_BossTips() {
        var _this = _super.call(this) || this;
        _this._cost = 0;
        _this.childrenCreated();
        return _this;
    }
    TYJY_BossTips.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_BossTips").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.vres.setType(1);
        _super.prototype.childrenCreated.call(this);
    };
    TYJY_BossTips.prototype.onShown = function () {
        var self = this;
        self.lowBtn.addClickListener(self.onLow, self);
        self.highBtn.addClickListener(self.onHigh, self);
        self.vres.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
        var cfg = Config.tyjyboss_251[343002];
        self._cost = Number(ConfigHelp.SplitStr(cfg.consume)[0][2]);
        self.vres.text = "" + self._cost;
        if (Model_player.voMine.yuanbao >= self._cost) {
            self.vres.color = Color.GREENINT;
        }
        else {
            self.vres.color = Color.REDINT;
        }
    };
    TYJY_BossTips.prototype.onHide = function () {
        var self = this;
        self.lowBtn.removeClickListener(self.onLow, self);
        self.highBtn.removeClickListener(self.onHigh, self);
    };
    /**
     * 开启低级
     */
    TYJY_BossTips.prototype.onLow = function (e) {
        GGlobal.model_TYJY.CG_OPEN_BOSS(343001);
        GGlobal.layerMgr.close(UIConst.TYJY_APPLY);
    };
    /**
     * 开启高级
     */
    TYJY_BossTips.prototype.onHigh = function (e) {
        if (Model_player.voMine.yuanbao < this._cost) {
            ViewCommonWarn.text("元宝不足");
            return;
        }
        GGlobal.model_TYJY.CG_OPEN_BOSS(343002);
        GGlobal.layerMgr.close(UIConst.TYJY_APPLY);
    };
    TYJY_BossTips.URL = "ui://m2fm2aiyozk41e";
    return TYJY_BossTips;
}(UIModalPanel));
__reflect(TYJY_BossTips.prototype, "TYJY_BossTips");
