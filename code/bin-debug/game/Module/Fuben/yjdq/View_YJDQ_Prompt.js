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
var View_YJDQ_Prompt = (function (_super) {
    __extends(View_YJDQ_Prompt, _super);
    function View_YJDQ_Prompt() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YJDQ_Prompt.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_Prompt").asCom;
        this.contentPane = this.view;
        this.lb = (this.view.getChild("lb"));
        this.isShowOpenAnimation = false;
        this.isShowMask = false;
        _super.prototype.childrenCreated.call(this);
    };
    View_YJDQ_Prompt.prototype.updateShow = function () {
        this.times--;
        var cfg = Config.yiqi_007[Model_YJDQ.curPass];
        this.lb.setVar("time", "" + this.times).setVar("bo", "" + (cfg.bo + 5)).flushVars();
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    View_YJDQ_Prompt.prototype.onShown = function () {
        this.times = Config.xtcs_004[1023].num + 1;
        Timer.instance.listen(this.updateShow, this, 1000);
    };
    View_YJDQ_Prompt.prototype.onHide = function () {
        Timer.instance.remove(this.updateShow, this);
        GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_PROMPT);
    };
    View_YJDQ_Prompt.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, fairygui.GRoot.inst.height - 360 - this.height);
    };
    View_YJDQ_Prompt.URL = "ui://pkuzcu87fzz83";
    return View_YJDQ_Prompt;
}(UIModalPanel));
__reflect(View_YJDQ_Prompt.prototype, "View_YJDQ_Prompt");
