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
var ViewActHolyBReward = (function (_super) {
    __extends(ViewActHolyBReward, _super);
    function ViewActHolyBReward() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewActHolyBReward.prototype.childrenCreated = function () {
        GGlobal.createPack("shouhunJX");
        this.view = fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBReward").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.lb = (this.view.getChild("lb"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewActHolyBReward.prototype.onShown = function () {
        this._cfg = this._args;
        this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(this._cfg.reward1));
        this.lb.text = "达到" + ConfigHelp.getSystemNum(5606) + "圈后可领取，周一0点结算邮件发送奖励";
        this.update();
    };
    ViewActHolyBReward.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.ACT_HOLYB_XBREWARD);
        this.list.numItems = 0;
    };
    ViewActHolyBReward.prototype.update = function () {
        this.list.numItems = this._listData.length;
    };
    ViewActHolyBReward.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    return ViewActHolyBReward;
}(UIModalPanel));
__reflect(ViewActHolyBReward.prototype, "ViewActHolyBReward");
