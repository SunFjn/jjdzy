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
var ViewSanGuoZSPrompt = (function (_super) {
    __extends(ViewSanGuoZSPrompt, _super);
    function ViewSanGuoZSPrompt() {
        var _this = _super.call(this) || this;
        _this.isShowOpenAnimation = false;
        _this.childrenCreated();
        return _this;
    }
    ViewSanGuoZSPrompt.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("Arena", "ViewSanGuoZSPrompt").asCom;
        this.contentPane = this.view;
        this.rankLb = (this.view.getChild("rankLb"));
        this.moneyLb = (this.view.getChild("moneyLb"));
        this.effImg = (this.view.getChild("effImg"));
        this.maskSp = (this.view.getChild("maskSp"));
        this.effImg.mask = this.maskSp.displayObject;
        _super.prototype.childrenCreated.call(this);
    };
    ViewSanGuoZSPrompt.prototype.onShown = function () {
        var rank = Model_SGZS.myRank;
        this.rankLb.text = "历史最高排名提高至：" + HtmlUtil.fontNoSize(rank + "", Color.getColorStr(2));
        this.moneyLb.text = Model_SGZS.lastMoney + "";
        GGlobal.layerMgr.UI_Popup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doHideAnimation, this);
    };
    ViewSanGuoZSPrompt.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SANGUO_ZHANSHEN_RANK_REWARD);
        GGlobal.layerMgr.UI_Popup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doHideAnimation, this);
    };
    ViewSanGuoZSPrompt.URL = "ui://me1skowln7xv35";
    return ViewSanGuoZSPrompt;
}(UIModalPanel));
__reflect(ViewSanGuoZSPrompt.prototype, "ViewSanGuoZSPrompt");
