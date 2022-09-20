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
var View_LianJi_Panel = (function (_super) {
    __extends(View_LianJi_Panel, _super);
    function View_LianJi_Panel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_LianJi_Panel.prototype.childrenCreated = function () {
        var s = this;
        s.isClosePanel = false;
        s.isShowMask = false;
        s.view = fairygui.UIPackage.createObject("common", "View_LianJi_Panel").asCom;
        s.contentPane = s.view;
        s.showLb = (s.view.getChild("showLb"));
        _super.prototype.childrenCreated.call(this);
    };
    View_LianJi_Panel.prototype.updateShow = function () {
        if (Model_player.voMine && Model_player.voMine.sceneChar) {
            this.showLb.text = Model_player.voMine.sceneChar.lianjiNum + "";
        }
    };
    View_LianJi_Panel.prototype.onShown = function () {
        this.updateShow();
        GGlobal.control.listen(Enum_MsgType.LIANJI_UPDATE, this.updateShow, this);
    };
    View_LianJi_Panel.prototype.onHide = function () {
        GGlobal.control.remove(Enum_MsgType.LIANJI_UPDATE, this.updateShow, this);
        GGlobal.layerMgr.close(UIConst.LIANJI);
    };
    View_LianJi_Panel.prototype.resetPosition = function () {
        this.setXY(-GGlobal.layerMgr.offx + 100, 465);
    };
    View_LianJi_Panel.URL = "ui://jvxpx9emiy753f0";
    return View_LianJi_Panel;
}(UIModalPanel));
__reflect(View_LianJi_Panel.prototype, "View_LianJi_Panel");
