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
 * 关卡收益提示面板
*/
var ViewGuanQiaTips = (function (_super) {
    __extends(ViewGuanQiaTips, _super);
    function ViewGuanQiaTips() {
        var _this = _super.call(this) || this;
        _this._timer = 0;
        _this.loadRes("guanqia", "guanqia_atlas0");
        return _this;
    }
    ViewGuanQiaTips.prototype.childrenCreated = function () {
        GGlobal.createPack("guanqia");
        var self = this;
        // self.isShowMask = false;
        self.view = fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaTips").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.closeBt.addClickListener(self.closeEventHandler, self);
    };
    ViewGuanQiaTips.prototype.onShown = function () {
        var self = this;
        var m = GGlobal.modelGuanQia;
        self._timer = 0;
        Timer.instance.listen(this.upTime, this, 1000);
        var vomine = Model_player.voMine;
        var expValue = ModelGuanQia.getExpGP(m.curGuanQiaLv - 1);
        expValue = Math.ceil(Number(expValue) * (100 + vomine.expAdd) / 100);
        self.curExpTxt.text = ConfigHelp.numToStr(expValue) + "/小时";
        expValue = ModelGuanQia.getExpGP(m.curGuanQiaLv);
        expValue = Math.ceil(Number(expValue) * (100 + vomine.expAdd) / 100);
        self.nextExpTxt.text = ConfigHelp.numToStr(expValue) + "/小时";
        self.curTongBiTxt.text = ConfigHelp.numToStr(ModelGuanQia.getTBGP(m.curGuanQiaLv - 1)) + "/小时";
        self.nextTongBiTxt.text = ConfigHelp.numToStr(ModelGuanQia.getTBGP(m.curGuanQiaLv)) + "/小时";
    };
    /**打开界面 */
    ViewGuanQiaTips.show = function () {
        var m = GGlobal.modelGuanQia;
        var lb = Config.BOSS_205[m.curGuanQiaLv];
        if (!lb)
            return;
        if (GGlobal.layerMgr.isOpenView(UIConst.GQBOSSTIPS)) {
            var panel = GGlobal.layerMgr.getView(UIConst.GQBOSSTIPS);
            panel.onShown();
        }
        else {
            GGlobal.layerMgr.open(UIConst.GQBOSSTIPS);
        }
    };
    ViewGuanQiaTips.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.GQBOSSTIPS);
        Timer.instance.remove(this.upTime, this);
        this.closeBt.removeClickListener(this.closeEventHandler, this);
    };
    ViewGuanQiaTips.prototype.upTime = function () {
        this._timer++;
        if (this._timer > 2) {
            GGlobal.layerMgr.close2(UIConst.GQBOSSTIPS);
        }
    };
    return ViewGuanQiaTips;
}(UIModalPanel));
__reflect(ViewGuanQiaTips.prototype, "ViewGuanQiaTips");
