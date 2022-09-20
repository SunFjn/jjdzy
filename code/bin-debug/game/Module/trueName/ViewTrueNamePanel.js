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
var ViewTrueNamePanel = (function (_super) {
    __extends(ViewTrueNamePanel, _super);
    function ViewTrueNamePanel() {
        var _this = _super.call(this) || this;
        _this.loadRes("trueName", "trueName_atlas0");
        return _this;
    }
    ViewTrueNamePanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("trueName", "ViewTrueNamePanel"));
    };
    ViewTrueNamePanel.prototype.childrenCreated = function () {
        GGlobal.createPack("trueName");
        this.view = fairygui.UIPackage.createObject("trueName", "ViewTrueNamePanel").asCom;
        this.contentPane = this.view;
        this.btnSure = (this.view.getChild("btnSure"));
        this.btnCancel = (this.view.getChild("btnCancel"));
        this.lb = (this.view.getChild("lb"));
        this.lbName = (this.view.getChild("lbName"));
        this.lbCard = (this.view.getChild("lbCard"));
        this.list = (this.view.getChild("list"));
        this.list.itemRenderer = this.renderItem;
        this.list.callbackThisObj = this;
        _super.prototype.childrenCreated.call(this);
    };
    ViewTrueNamePanel.prototype.onShown = function () {
        var s = this;
        s.btnSure.addClickListener(s.onSure, s);
        s.btnCancel.addClickListener(s.onCancel, s);
        GGlobal.control.listen(Enum_MsgType.TRUE_NAME_CLOSE, s.onCancel, s);
        s._listData = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(5901)));
        s.list.numItems = s._listData.length;
        if (Model_TrueName.isIdentity) {
            GGlobal.control.notify(Enum_MsgType.TRUE_NAME_CLOSE);
            if (!Model_TrueName.isChenMi && Model_TrueName.rewStatus != 2) {
                GGlobal.layerMgr.open(UIConst.TRUE_NAME_REWARD);
            }
        }
        else {
            Model_TrueName.getnewuser(Model_TrueName.freshIdentity);
        }
    };
    ViewTrueNamePanel.prototype.onHide = function () {
        var s = this;
        s.btnSure.removeClickListener(s.onSure, s);
        s.btnCancel.removeClickListener(s.onCancel, s);
        GGlobal.control.remove(Enum_MsgType.TRUE_NAME_CLOSE, s.onCancel, s);
        GGlobal.layerMgr.close(UIConst.TRUE_NAME);
        GGlobal.modelTrueName.openAlert();
        s.list.numItems = 0;
    };
    ViewTrueNamePanel.prototype.onSure = function () {
        var s = this;
        var n = s.lbName.text;
        var c = s.lbCard.text;
        //false  是游客
        if (!GGlobal.loginArg.isLogin) {
            ViewCommonWarn.text("请您登录后再进行实名认证");
            return;
        }
        if (n == "") {
            ViewCommonWarn.text("请输入您的真实姓名");
            return;
        }
        // var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
        // if (!nameReg.test(n)) {
        // 	ViewCommonWarn.text("你输入的姓名格式不正确");
        // 	return;
        // }
        if (c == "") {
            ViewCommonWarn.text("请输入您的身份证号码");
            return;
        }
        if (!Model_TrueName.checkIdcard(c)) {
            ViewCommonWarn.text("你输入的身份证格式不正确");
            return;
        }
        GGlobal.modelTrueName.uploadRealNameInfo(n, c);
        GGlobal.modelTrueName.CGTRUE_NAME(n, c);
    };
    ViewTrueNamePanel.prototype.onCancel = function () {
        this.closeEventHandler(null);
    };
    ViewTrueNamePanel.prototype.renderItem = function (index, obj) {
        var item = obj;
        item.vo = this._listData[index];
    };
    ViewTrueNamePanel.URL = "ui://girq9ndul5k50";
    return ViewTrueNamePanel;
}(UIModalPanel));
__reflect(ViewTrueNamePanel.prototype, "ViewTrueNamePanel");
