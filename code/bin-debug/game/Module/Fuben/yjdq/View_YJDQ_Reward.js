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
var View_YJDQ_Reward = (function (_super) {
    __extends(View_YJDQ_Reward, _super);
    function View_YJDQ_Reward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YJDQ_Reward.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_Reward").asCom;
        this.contentPane = this.view;
        this.rewardBt = (this.view.getChild("rewardBt"));
        this.rewardBt.addClickListener(this.rewardHandle, this);
        this.isShowOpenAnimation = false;
        this.isShowMask = false;
        _super.prototype.childrenCreated.call(this);
    };
    View_YJDQ_Reward.prototype.rewardHandle = function () {
        GGlobal.layerMgr.open(UIConst.FUBEN_YJDQ_REWARDSHOW);
    };
    View_YJDQ_Reward.prototype.onShown = function () {
    };
    View_YJDQ_Reward.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_REWARD);
    };
    View_YJDQ_Reward.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, fairygui.GRoot.inst.height - 350);
    };
    View_YJDQ_Reward.URL = "ui://pkuzcu87fzz85";
    return View_YJDQ_Reward;
}(UIModalPanel));
__reflect(View_YJDQ_Reward.prototype, "View_YJDQ_Reward");
