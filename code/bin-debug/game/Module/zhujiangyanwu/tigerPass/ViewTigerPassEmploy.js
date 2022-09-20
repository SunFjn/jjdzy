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
var ViewTigerPassEmploy = (function (_super) {
    __extends(ViewTigerPassEmploy, _super);
    function ViewTigerPassEmploy() {
        var _this = _super.call(this) || this;
        _this._vo = null;
        _this.childrenCreated();
        return _this;
    }
    ViewTigerPassEmploy.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ViewTigerPassEmploy"));
    };
    ViewTigerPassEmploy.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("zjyw", "ViewTigerPassEmploy").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.list.itemRenderer = s.rendHandler;
        s.list.callbackThisObj = s;
        _super.prototype.childrenCreated.call(this);
    };
    ViewTigerPassEmploy.prototype.onShown = function () {
        var s = this;
        GGlobal.modelTigerPass.listen(Model_TigerPass.msg_employ_list, s.update, s);
        s.btnSure.addClickListener(s.onEmploy, s);
        s.btnCge.addClickListener(s.onCge, s);
        s.list.addEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
        GGlobal.control.listen(Enum_MsgType.ZERO_RESET, s.zeroUp, s);
        s.update();
        s.zeroUp();
    };
    ViewTigerPassEmploy.prototype.onHide = function () {
        var s = this;
        GGlobal.modelTigerPass.remove(Model_TigerPass.msg_employ_list, s.update, s);
        s.btnSure.removeClickListener(s.onEmploy, s);
        s.btnCge.removeClickListener(s.onCge, s);
        s.list.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClick, s);
        GGlobal.control.remove(Enum_MsgType.ZERO_RESET, s.zeroUp, s);
        s.list.numItems = 0;
    };
    ViewTigerPassEmploy.prototype.update = function () {
        var m = GGlobal.modelTigerPass;
        var s = this;
        s._employArr = m.employArr;
        s.list.numItems = 6;
        if (s._employArr && s._employArr.length > 0) {
            s.list.selectedIndex = 0;
            s._vo = s._employArr[0];
        }
        else {
            s.list.selectedIndex = -1;
            s._vo = null;
        }
        var color = m.ctEmploy == 0 ? Color.REDSTR : Color.GREENSTR;
        s.lbCt.text = "雇佣他人次数:" + HtmlUtil.fontNoSize(m.ctEmploy + "/" + ConfigHelp.getSystemNum(7101), color);
        //花费
        if (!s._cost) {
            s._cost = Number(JSON.parse(ConfigHelp.getSystemDesc(7103))[0][2]);
        }
        s.lbCost.text = s._cost + "";
        if (Model_player.voMine.tongbi < s._cost) {
            s.lbCost.color = Color.REDINT;
        }
        else {
            s.lbCost.color = Color.GREENINT;
        }
    };
    ViewTigerPassEmploy.prototype.rendHandler = function (index, v) {
        v.vo = this._employArr[index];
    };
    ViewTigerPassEmploy.prototype.onEmploy = function () {
        var s = this;
        var m = GGlobal.modelTigerPass;
        if (s._vo == null) {
            ViewCommonWarn.text("无雇佣帮手");
            return;
        }
        if (Model_player.voMine.yuanbao < s._vo.price) {
            ViewCommonWarn.text("元宝不足");
            return;
        }
        if (s._vo.count == 0) {
            ViewCommonWarn.text("该帮手没有剩余雇佣次数");
            return;
        }
        if (m.ctEmploy <= 0) {
            ViewCommonWarn.text("没有雇佣他人次数");
            return;
        }
        if (m.employId > 0) {
            ViewCommonWarn.text("已雇佣帮手，无需重复雇佣");
            return;
        }
        m.CGChooseEmploy8911(this._vo.plyId);
        this.closeEventHandler(null);
    };
    ViewTigerPassEmploy.prototype.onCge = function () {
        if (Model_player.voMine.tongbi < this._cost) {
            ViewCommonWarn.text("铜币不足");
            return;
        }
        GGlobal.modelTigerPass.CGRefreshEmploy8915();
    };
    ViewTigerPassEmploy.prototype.itemClick = function (e) {
        var v = e.itemObject;
        this._vo = v.vo;
    };
    //零点重置
    ViewTigerPassEmploy.prototype.zeroUp = function () {
        GGlobal.modelTigerPass.CGOpenEmploy8909();
    };
    ViewTigerPassEmploy.URL = "ui://7a366usay5hd2f";
    return ViewTigerPassEmploy;
}(UIModalPanel));
__reflect(ViewTigerPassEmploy.prototype, "ViewTigerPassEmploy");
