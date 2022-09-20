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
var View_ActCom_SJXS_Reward = (function (_super) {
    __extends(View_ActCom_SJXS_Reward, _super);
    function View_ActCom_SJXS_Reward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ActCom_SJXS_Reward.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_SJXS", "View_ActCom_SJXS_Reward").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_ActCom_SJXS_Reward.prototype.renderHandler = function (index, item) {
        var self = this;
        item.setVo(self.showData[index].id, self.showData[index].state);
    };
    View_ActCom_SJXS_Reward.prototype.updateShow = function () {
        var self = this;
        self.showData = GGlobal.modelsjxs.targertData;
        self.list.numItems = self.showData.length;
    };
    View_ActCom_SJXS_Reward.prototype.onShown = function () {
        var self = this;
        self.registerEvent(true);
        self.updateShow();
    };
    View_ActCom_SJXS_Reward.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        self.list.numItems = 0;
    };
    View_ActCom_SJXS_Reward.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.SHENJIANG_XIANSHI, self.updateShow, self);
    };
    View_ActCom_SJXS_Reward.URL = "ui://iwvd88mqr3jea";
    return View_ActCom_SJXS_Reward;
}(UIModalPanel));
__reflect(View_ActCom_SJXS_Reward.prototype, "View_ActCom_SJXS_Reward");
