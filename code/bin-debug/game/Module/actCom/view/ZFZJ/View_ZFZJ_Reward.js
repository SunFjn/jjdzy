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
var View_ZFZJ_Reward = (function (_super) {
    __extends(View_ZFZJ_Reward, _super);
    function View_ZFZJ_Reward() {
        var _this = _super.call(this) || this;
        _this.showData = [];
        _this.childrenCreated();
        return _this;
    }
    View_ZFZJ_Reward.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_ZFZJ", "View_ZFZJ_Reward").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        _super.prototype.childrenCreated.call(this);
    };
    View_ZFZJ_Reward.prototype.renderHandler = function (index, item) {
        var self = this;
        item.setVo(self.showData[index]);
    };
    View_ZFZJ_Reward.prototype.updateShow = function () {
        var self = this;
        self.list.numItems = self.showData.length;
    };
    View_ZFZJ_Reward.prototype.onShown = function () {
        var self = this;
        if (self.showData.length <= 0) {
            for (var key in Config.hfkhzfzj_286) {
                self.showData.push(Config.hfkhzfzj_286[key]);
            }
            self.showData.sort(function (a, b) {
                return a.id - b.id;
            });
        }
        self.registerEvent(true);
        self.updateShow();
    };
    View_ZFZJ_Reward.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        self.registerEvent(false);
    };
    View_ZFZJ_Reward.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.HFKH_ZFZJ, self.updateShow, self);
    };
    View_ZFZJ_Reward.URL = "ui://4h4iwgjrr3jej";
    return View_ZFZJ_Reward;
}(UIModalPanel));
__reflect(View_ZFZJ_Reward.prototype, "View_ZFZJ_Reward");
