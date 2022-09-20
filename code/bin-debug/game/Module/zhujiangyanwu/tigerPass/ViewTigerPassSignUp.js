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
var ViewTigerPassSignUp = (function (_super) {
    __extends(ViewTigerPassSignUp, _super);
    function ViewTigerPassSignUp() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewTigerPassSignUp.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ViewTigerPassSignUp"));
    };
    ViewTigerPassSignUp.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("zjyw", "ViewTigerPassSignUp").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.list.itemRenderer = s.rendHandler;
        s.list.callbackThisObj = s;
        _super.prototype.childrenCreated.call(this);
    };
    ViewTigerPassSignUp.prototype.onShown = function () {
        var s = this;
        s.btnJoin.addClickListener(s.onJoin, s);
        GGlobal.modelTigerPass.listen(Model_TigerPass.msg_join_employ, s.update, s);
        s.update();
    };
    ViewTigerPassSignUp.prototype.onHide = function () {
        var s = this;
        s.btnJoin.removeClickListener(s.onJoin, s);
        GGlobal.modelTigerPass.remove(Model_TigerPass.msg_join_employ, s.update, s);
        s.list.numItems = 0;
    };
    ViewTigerPassSignUp.prototype.update = function () {
        var s = this;
        if (!s._rewArr) {
            var rew = ConfigHelp.getSystemDesc(7105);
            s._rewArr = ConfigHelp.makeItemListArr(JSON.parse(rew));
        }
        s.list.numItems = s._rewArr.length;
        var m = GGlobal.modelTigerPass;
        if (m.isEmploy) {
            s.imgHas.visible = true;
            s.btnJoin.visible = false;
        }
        else {
            s.imgHas.visible = false;
            s.btnJoin.visible = true;
            s.btnJoin.checkNotice = true;
        }
        s.lbTip.text = "每天最多被雇佣" + ConfigHelp.getSystemNum(7100) + "次\n奖励通过邮件发送";
    };
    ViewTigerPassSignUp.prototype.rendHandler = function (index, grid) {
        grid.tipEnabled = true;
        grid.isShowEff = true;
        grid.vo = this._rewArr[index];
    };
    ViewTigerPassSignUp.prototype.onJoin = function () {
        GGlobal.modelTigerPass.CGJoinEmploy8913();
        // this.closeEventHandler(null);
    };
    ViewTigerPassSignUp.URL = "ui://7a366usay5hd2e";
    return ViewTigerPassSignUp;
}(UIModalPanel));
__reflect(ViewTigerPassSignUp.prototype, "ViewTigerPassSignUp");
