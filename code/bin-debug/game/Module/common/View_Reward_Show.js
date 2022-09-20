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
var View_Reward_Show = (function (_super) {
    __extends(View_Reward_Show, _super);
    function View_Reward_Show() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_Reward_Show.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("common", "View_Reward_Show").asCom;
        a.contentPane = a.view;
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.dataLb = (a.view.getChild("dataLb"));
        a.promptLb = (a.view.getChild("promptLb"));
        a.drawBt = (a.view.getChild("drawBt"));
        a.drawImg = (a.view.getChild("drawImg"));
        a.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
        a.drawBt.addClickListener(a.drawHandler, a);
    };
    View_Reward_Show.prototype.drawHandler = function () {
        if (this.onDraw) {
            this.onDraw.run();
        }
        else {
            this.doHideAnimation();
        }
    };
    View_Reward_Show.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        grid.vo = this.itemArr[index];
    };
    View_Reward_Show.prototype.updateShow = function () {
        var a = this;
        if (!a._args)
            return;
        var arg = a._args;
        a.onDraw = arg.onDraw;
        a.itemArr = arg.reward;
        a.dataLb.text = arg.text0;
        a.drawImg.visible = false;
        if (arg.text1) {
            a.promptLb.text = arg.text1;
            a.promptLb.visible = true;
            a.drawBt.visible = false;
        }
        else {
            a.drawBt.visible = true;
            a.drawBt.checkNotice = false;
            if (arg.state == 1) {
                a.drawBt.checkNotice = true;
            }
            else if (arg.state == 2) {
                a.drawBt.visible = false;
                a.drawImg.visible = true;
            }
            a.promptLb.visible = false;
        }
        a.list.numItems = a.itemArr.length;
    };
    View_Reward_Show.prototype.onShown = function () {
        this.updateShow();
    };
    View_Reward_Show.prototype.onHide = function () {
        this.list.numItems = 0;
        this.onDraw = null;
        GGlobal.layerMgr.close(UIConst.REWARD_SHOW);
    };
    View_Reward_Show.show = function (reward, text0, text1, onDraw, state) {
        if (onDraw === void 0) { onDraw = null; }
        var arg = { reward: reward, text0: text0, text1: text1, onDraw: onDraw, state: state };
        if (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW)) {
            var ui = GGlobal.layerMgr.getView(UIConst.REWARD_SHOW);
            ui._args = arg;
            ui.updateShow();
        }
        else {
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW, arg);
        }
    };
    View_Reward_Show.URL = "ui://jvxpx9emr6x487";
    return View_Reward_Show;
}(UIModalPanel));
__reflect(View_Reward_Show.prototype, "View_Reward_Show");
