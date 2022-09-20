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
var View_SanGuoYT_ButtomUI = (function (_super) {
    __extends(View_SanGuoYT_ButtomUI, _super);
    function View_SanGuoYT_ButtomUI() {
        return _super.call(this) || this;
    }
    View_SanGuoYT_ButtomUI.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("sanGuoYiTong", "View_SanGuoYT_ButtomUI"));
        }
        return this._inst;
    };
    View_SanGuoYT_ButtomUI.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        self.rewardBt = (self.getChild("rewardBt"));
        self.exitBt = (self.getChild("exitBt"));
    };
    View_SanGuoYT_ButtomUI.prototype.onExit = function () {
        GGlobal.modelSanGuoYT.CG_EXIT_SCENE_5803();
    };
    View_SanGuoYT_ButtomUI.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.SANGUO_YITONG_SCENE_REWARD);
    };
    View_SanGuoYT_ButtomUI.prototype.openRank = function () {
        if (TimeUitl.cool("ViewWenDingTXBottomUI", 1000)) {
            GGlobal.layerMgr.open(UIConst.WENDINGTX_RANK);
        }
    };
    View_SanGuoYT_ButtomUI.prototype.checkNotice = function () {
        this.rewardBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 1) || GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 2) || GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 3);
        ;
    };
    View_SanGuoYT_ButtomUI.prototype.toShow = function () {
        var self = this;
        var pat = GGlobal.layerMgr.UI_MainBottom;
        pat.addChild(self);
        self.resetPostion();
        self.rewardBt.addClickListener(self.onReward, self);
        self.exitBt.addClickListener(self.onExit, self);
        GGlobal.reddot.listen(UIConst.WENDINGTX, self.checkNotice, self);
    };
    View_SanGuoYT_ButtomUI.prototype.toHide = function () {
        var self = this;
        GGlobal.reddot.remove(UIConst.WENDINGTX, self.checkNotice, self);
        self.rewardBt.removeClickListener(self.onReward, self);
        self.exitBt.addClickListener(self.onExit, self);
        self.removeFromParent();
    };
    View_SanGuoYT_ButtomUI.prototype.resetPostion = function () {
        var a = this;
        a.setXY((fairygui.GRoot.inst.width - a.width) >> 1, fairygui.GRoot.inst.height - 290);
    };
    View_SanGuoYT_ButtomUI.URL = "ui://z4ijxlqkmo6gx";
    return View_SanGuoYT_ButtomUI;
}(fairygui.GComponent));
__reflect(View_SanGuoYT_ButtomUI.prototype, "View_SanGuoYT_ButtomUI");
