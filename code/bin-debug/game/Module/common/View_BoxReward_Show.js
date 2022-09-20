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
var View_BoxReward_Show = (function (_super) {
    __extends(View_BoxReward_Show, _super);
    function View_BoxReward_Show() {
        var _this = _super.call(this) || this;
        _this._defaultTitle = "";
        _this.childrenCreated();
        return _this;
    }
    View_BoxReward_Show.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("common", "View_BoxReward_Show").asCom;
        a.contentPane = a.view;
        a.frame = (a.view.getChild("frame"));
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = this;
        a.list.itemRenderer = a.renderHandler;
        a.lb = (a.view.getChild("lb"));
        a.isShowOpenAnimation = false;
        //缓存默认标题
        a._defaultTitle = a.frame.title;
        _super.prototype.childrenCreated.call(this);
    };
    View_BoxReward_Show.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        grid.isShowEff = true;
        grid.vo = this.itemArr[index];
        grid.tipEnabled = true;
    };
    View_BoxReward_Show.prototype.updateShow = function () {
        var a = this;
        if (!a._args)
            return;
        var arg = a._args;
        a.itemArr = arg.reward;
        if (arg.text) {
            a.lb.visible = true;
            a.lb.text = arg.text;
        }
        else {
            a.lb.visible = false;
        }
        if (arg.title)
            a.frame.title = arg.title;
        else
            a.frame.title = a._defaultTitle;
        a.list.numItems = a.itemArr.length;
    };
    View_BoxReward_Show.prototype.onShown = function () {
        this.updateShow();
    };
    View_BoxReward_Show.prototype.onHide = function () {
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.BOX_REWARD_SHOW);
    };
    View_BoxReward_Show.show = function (reward, text, pTitle) {
        var arg = { reward: reward, text: text, title: pTitle };
        GGlobal.layerMgr.open(UIConst.BOX_REWARD_SHOW, arg);
    };
    View_BoxReward_Show.URL = "ui://jvxpx9em81i09f";
    return View_BoxReward_Show;
}(UIModalPanel));
__reflect(View_BoxReward_Show.prototype, "View_BoxReward_Show");
