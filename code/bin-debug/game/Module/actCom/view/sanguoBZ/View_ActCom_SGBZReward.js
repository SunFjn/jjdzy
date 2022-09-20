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
var View_ActCom_SGBZReward = (function (_super) {
    __extends(View_ActCom_SGBZReward, _super);
    function View_ActCom_SGBZReward() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.childrenCreated();
        return _this;
    }
    View_ActCom_SGBZReward.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActComSGBZ", "View_ActCom_SGBZReward").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        _super.prototype.childrenCreated.call(this);
    };
    View_ActCom_SGBZReward.prototype.renderHandler = function (index, grid) {
        var self = this;
        var rewardArr = self._args;
        grid.setVo(self.rewardArr[index]);
        if (index < rewardArr.length) {
            grid.isShowImg(false);
        }
        else {
            grid.isShowImg(true);
        }
    };
    View_ActCom_SGBZReward.prototype.onShown = function () {
        var self = this;
        var model = GGlobal.modelsgbz;
        var arr = [];
        self.rewardArr = [];
        for (var key in model.rewardData) {
            arr.push(model.rewardData[key]);
        }
        self.rewardArr = self._args.concat(arr);
        self.list.numItems = self.rewardArr.length;
    };
    View_ActCom_SGBZReward.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
    };
    View_ActCom_SGBZReward.URL = "ui://y9683xrpj158d";
    return View_ActCom_SGBZReward;
}(UIModalPanel));
__reflect(View_ActCom_SGBZReward.prototype, "View_ActCom_SGBZReward");
