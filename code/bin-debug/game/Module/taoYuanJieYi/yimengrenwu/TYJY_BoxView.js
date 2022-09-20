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
 * 桃园结义宝箱奖励
 */
var TYJY_BoxView = (function (_super) {
    __extends(TYJY_BoxView, _super);
    function TYJY_BoxView() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    TYJY_BoxView.createInstance = function () {
        return (fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_BoxView"));
    };
    TYJY_BoxView.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_BoxView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    TYJY_BoxView.prototype.getAwards = function () {
        GGlobal.model_TYJY.CG_GET_REWARD(this._cfg.id, this._idx + 1);
        this.doHideAnimation();
    };
    TYJY_BoxView.prototype.updateView = function () {
        this._st = 0;
        this._st = GGlobal.model_TYJY.taskObj[this._cfg.id].arr1[this._idx];
        this.getBtn.visible = this._st == 1;
        this.getImg.visible = this._st == 2;
        this.tips.visible = this._st == 0;
    };
    TYJY_BoxView.prototype.onShown = function () {
        this._cfg = this._args.cfg;
        var awards;
        this._idx = this._args.idx;
        if (this._idx == 0) {
            awards = this._cfg.reward1;
        }
        else if (this._idx == 1) {
            awards = this._cfg.reward2;
        }
        else {
            awards = this._cfg.reward3;
        }
        awards = JSON.parse(awards);
        if (this.arr)
            ConfigHelp.cleanGridview(this.arr);
        awards = ConfigHelp.makeItemListArr(awards);
        this.arr = ConfigHelp.addGridview(awards, this, 100, 100);
        ConfigHelp.centerGrid(this.arr, 70, 110, 3, 130);
        this.getBtn.addClickListener(this.getAwards, this);
        GGlobal.control.listen(UIConst.TYJY_YMRW, this.updateView, this);
        this.updateView();
    };
    TYJY_BoxView.prototype.onHide = function () {
        if (this.arr)
            ConfigHelp.cleanGridview(this.arr);
        GGlobal.layerMgr.close(UIConst.TYJY_TASKBOX);
        this.getBtn.removeClickListener(this.getAwards, this);
        GGlobal.control.remove(UIConst.TYJY_YMRW, this.updateView, this);
    };
    TYJY_BoxView.URL = "ui://m2fm2aiygt1t1d";
    return TYJY_BoxView;
}(UIModalPanel));
__reflect(TYJY_BoxView.prototype, "TYJY_BoxView");
