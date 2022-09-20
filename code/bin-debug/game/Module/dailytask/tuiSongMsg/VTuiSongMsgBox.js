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
var VTuiSongMsgBox = (function (_super) {
    __extends(VTuiSongMsgBox, _super);
    function VTuiSongMsgBox() {
        var _this = _super.call(this) || this;
        _this.grids = []; //86 118
        _this.childrenCreated();
        return _this;
    }
    VTuiSongMsgBox.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("dailytask", "VActPreViewBox").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.btnHand.addClickListener(s.onHand, s);
        _super.prototype.childrenCreated.call(this);
    };
    VTuiSongMsgBox.prototype.onHand = function () {
        var s = this;
        if (s.newVers && s.newVers.url && s.newVers.url.length > 0) {
            ViewCommonWarn.text("更新客户端后可领取每日奖励");
            return;
        }
        GGlobal.modelactPreView.CG4055();
        this.doHideAnimation();
    };
    VTuiSongMsgBox.prototype.onShown = function () {
        var s = this;
        s.newVers = this._args;
        ConfigHelp.cleanGridview(s.grids);
        var awards = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[4302].other));
        var beginX = s.width - awards.length * 110 >> 1;
        s.grids = ConfigHelp.addGridview(awards, s, beginX, 118, true, false, 5, 120);
        s.onUpdate();
        GGlobal.modelactPreView.listen(ModelActPreView.msg_tsMsg, s.onUpdate, s);
    };
    VTuiSongMsgBox.prototype.onUpdate = function () {
        var s = this;
        s.btnHand.visible = !(s.iconGot.visible = ModelActPreView.tSMsgSt == 1);
    };
    VTuiSongMsgBox.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.TUISONG_SET_BOX);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_tsMsg, this.onUpdate, this);
    };
    return VTuiSongMsgBox;
}(UIModalPanel));
__reflect(VTuiSongMsgBox.prototype, "VTuiSongMsgBox");
