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
var ABActUI = (function (_super) {
    __extends(ABActUI, _super);
    function ABActUI() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ABActUI.prototype.childrenCreated = function () {
        var self = this;
        var view = self.getView();
        this.addChild(view);
        CommonManager.parseChildren(view, self);
        self.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, self.onShow, self);
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onHide, self);
    };
    return ABActUI;
}(fairygui.GComponent));
__reflect(ABActUI.prototype, "ABActUI");
