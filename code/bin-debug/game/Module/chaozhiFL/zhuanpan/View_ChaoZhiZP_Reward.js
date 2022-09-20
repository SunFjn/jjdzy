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
var View_ChaoZhiZP_Reward = (function (_super) {
    __extends(View_ChaoZhiZP_Reward, _super);
    function View_ChaoZhiZP_Reward() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    View_ChaoZhiZP_Reward.prototype.childrenCreated = function () {
        GGlobal.createPack("bossTiShi");
        var a = this;
        a.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
        a.contentPane = a.view;
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.surebt = (a.view.getChild("surebt"));
        a.surebt.addClickListener(a.OnSure, a);
        a.alginbt = (a.view.getChild("continuebt"));
        a.alginbt.addClickListener(a.alginHandler, a);
        a.isShowMask = true;
        a.isShowOpenAnimation = false;
        a.closeButton = a.view.getChild("closeButton");
        a.lab = (a.view.getChild("lab"));
        a.img = (a.view.getChild("img"));
        a.lab.text = "";
        a.img.visible = false;
        a.surebt.y = 389 + 20;
        a.alginbt.y = 389 + 20;
        _super.prototype.childrenCreated.call(this);
    };
    View_ChaoZhiZP_Reward.prototype.alginHandler = function () {
        if (this.handler)
            this.handler.run();
        this.doHideAnimation();
    };
    View_ChaoZhiZP_Reward.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    View_ChaoZhiZP_Reward.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        grid.vo = this.rewardArr[index];
    };
    View_ChaoZhiZP_Reward.prototype.updateShow = function () {
        this.times = 11;
        this.rewardArr = Model_ChaoZhiFL.zpRewardArr;
        this.list.numItems = this.rewardArr.length;
        if (this.rewardArr.length > 1) {
            this.alginbt.text = "再来10次";
        }
        else {
            this.alginbt.text = "再来1次";
        }
        Timer.instance.listen(this.timeHandler, this, 1000);
    };
    View_ChaoZhiZP_Reward.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + "s)";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    View_ChaoZhiZP_Reward.prototype.onShown = function () {
        var s = this;
        s.handler = s._args;
        s.updateShow();
        for (var i = 0; i < s.rewardArr.length; i++) {
            var gridVo = s.rewardArr[i];
            ViewBroadcastItemText.text("获得了【" + gridVo.name + "】 X" + gridVo.count, gridVo.qColor);
        }
    };
    View_ChaoZhiZP_Reward.prototype.onHide = function () {
        var s = this;
        s.list.numItems = 0;
        Timer.instance.remove(s.timeHandler, s);
        GGlobal.layerMgr.close(UIConst.CHAOZHI_ZHUANPAN_REWARD);
    };
    View_ChaoZhiZP_Reward.URL = "ui://qzsojhcrhn3o4";
    return View_ChaoZhiZP_Reward;
}(UIModalPanel));
__reflect(View_ChaoZhiZP_Reward.prototype, "View_ChaoZhiZP_Reward");
