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
var View_FunctionNotice_Panel = (function (_super) {
    __extends(View_FunctionNotice_Panel, _super);
    function View_FunctionNotice_Panel() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_FunctionNotice_Panel.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("MainUI", "View_FunctionNotice_Panel").asCom;
        s.contentPane = s.view;
        this.iconImg = (s.view.getChild("iconImg"));
        _super.prototype.childrenCreated.call(this);
        s.addClickListener(s.doHideAnimation, s);
    };
    View_FunctionNotice_Panel.prototype.onShown = function () {
    };
    View_FunctionNotice_Panel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.FUNCTIONNOTICE);
        this.tweenHandler();
    };
    View_FunctionNotice_Panel.prototype.tweenHandler = function () {
        var s = this;
        var point = s.localToRoot(s.iconImg.x - GGlobal.layerMgr.offx, s.iconImg.y);
        var image = new fairygui.GLoader();
        image.x = point.x;
        image.y = point.y;
        image.url = "ui://7gxkx46w73mn6g";
        GGlobal.layerMgr.UI_OFFLINE.addChild(image);
        var point1 = ViewMainUIBottomUI1.instance.localToRoot(ViewMainUIBottomUI1.instance.angerSkill.x - GGlobal.layerMgr.offx, ViewMainUIBottomUI1.instance.angerSkill.y);
        // let num = Math.sqrt(ConfigHelp.dist(point.x, point.y, point1.x, point1.y));
        // if (num < 200) num = 200;
        // if (num > 400) num = 400;
        egret.Tween.get(image).to({ x: point1.x, y: point1.y }, 500).call(function () {
            Model_player.voMine.setAutoSkill(!Model_player.voMine.autoSkill);
            ViewMainUIBottomUI1.instance.updateAuto();
            GGlobal.layerMgr.UI_OFFLINE.removeChild(image);
        }, this).play();
    };
    View_FunctionNotice_Panel.URL = "ui://7gxkx46w73mn6e";
    return View_FunctionNotice_Panel;
}(UIModalPanel));
__reflect(View_FunctionNotice_Panel.prototype, "View_FunctionNotice_Panel");
