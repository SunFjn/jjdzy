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
var View_YJDQ_WaveName = (function (_super) {
    __extends(View_YJDQ_WaveName, _super);
    function View_YJDQ_WaveName() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YJDQ_WaveName.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("FuBen", "View_YJDQ_WaveName").asCom;
        this.contentPane = this.view;
        this.lb = (this.view.getChild("lb"));
        this.isShowOpenAnimation = false;
        this.isShowMask = false;
        _super.prototype.childrenCreated.call(this);
    };
    View_YJDQ_WaveName.prototype.updateShow = function () {
        var cfg = Config.yiqi_007[Model_YJDQ.curPass];
        this.lb.text = "第" + cfg.bo + "波  " + cfg.name;
    };
    View_YJDQ_WaveName.prototype.onShown = function () {
        this.updateShow();
    };
    View_YJDQ_WaveName.prototype.onHide = function () {
        Timer.instance.remove(this.updateShow, this);
        GGlobal.layerMgr.close(UIConst.FUBEN_YJDQ_WAVE);
    };
    View_YJDQ_WaveName.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, 300);
    };
    View_YJDQ_WaveName.URL = "ui://pkuzcu87rvdr1i";
    return View_YJDQ_WaveName;
}(UIModalPanel));
__reflect(View_YJDQ_WaveName.prototype, "View_YJDQ_WaveName");
