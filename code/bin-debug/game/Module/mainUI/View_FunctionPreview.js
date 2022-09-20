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
var View_FunctionPreview = (function (_super) {
    __extends(View_FunctionPreview, _super);
    function View_FunctionPreview() {
        var _this = _super.call(this) || this;
        _this.guanqiaID = 0;
        return _this;
    }
    View_FunctionPreview.createInstance = function () {
        if (!View_FunctionPreview._instance)
            View_FunctionPreview._instance = (fairygui.UIPackage.createObject("MainUI", "View_FunctionPreview"));
        return View_FunctionPreview._instance;
    };
    View_FunctionPreview.createInstance1 = function () {
        if (!View_FunctionPreview._instance1)
            View_FunctionPreview._instance1 = (fairygui.UIPackage.createObject("MainUI", "View_FunctionPreview"));
        return View_FunctionPreview._instance1;
    };
    View_FunctionPreview.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        a.iconImg = (a.getChild("iconImg"));
        a.openLb = (a.getChild("openLb"));
        a.noticeImg = (a.getChild("noticeImg"));
        a.imgBg = (a.getChild("imgBg"));
        Model_FunctionPreview.getFunctionPreView();
        GGlobal.reddot.listen(UIConst.FUNCTIONPREVIEW, a.showNotice, this);
        a.show();
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, a.show, this);
        GGlobal.control.listen(Enum_MsgType.FUNCTIONPREVIEW, a.show, this);
        fairygui.GRoot.inst.addEventListener(fairygui.GObject.SIZE_CHANGED, a.resetPosition, this);
        a.addClickListener(a.OnOpen, this);
    };
    View_FunctionPreview.prototype.OnOpen = function () {
        GGlobal.layerMgr.open(UIConst.FUNCTIONPREVIEW);
    };
    View_FunctionPreview.prototype.show = function () {
        var a = this;
        var curcfg;
        var listArr = Model_FunctionPreview.listArr;
        var arr = Model_FunctionPreview.drawArr;
        var index = 0;
        for (var i = 0; i < listArr.length; i++) {
            var cfg = listArr[i];
            if (GGlobal.modelGuanQia.curGuanQiaLv < cfg.id) {
                curcfg = cfg;
                break;
            }
            else {
                if (Model_FunctionPreview.isFirstOpen && arr.indexOf(cfg.id) == -1) {
                    index++;
                    GGlobal.reddot.setCondition(UIConst.FUNCTIONPREVIEW, 0, true);
                }
            }
        }
        if (!curcfg)
            curcfg = listArr[listArr.length - 1];
        if (Model_FunctionPreview.isFirstOpen && index == 0) {
            GGlobal.reddot.setCondition(UIConst.FUNCTIONPREVIEW, 0, false);
        }
        IconUtil.setImg(a.iconImg, Enum_Path.SYSSHOW_URL + curcfg.icon + ".png");
        a.openLb.text = curcfg.tips;
        if (a.guanqiaID == 0)
            a.guanqiaID = curcfg.id;
        if (a.guanqiaID != curcfg.id && !Model_FunctionPreview.isFirstOpen) {
            a.guanqiaID = curcfg.id;
            GGlobal.reddot.setCondition(UIConst.FUNCTIONPREVIEW, 0, true);
        }
        a.showNotice();
        a.resetPosition();
    };
    View_FunctionPreview.prototype.showNotice = function () {
        this.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.FUNCTIONPREVIEW);
    };
    View_FunctionPreview.prototype.hide = function () {
        var a = this;
        GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, a.show, this);
        fairygui.GRoot.inst.removeEventListener(fairygui.GObject.SIZE_CHANGED, a.resetPosition, this);
        GGlobal.reddot.remove(UIConst.FUNCTIONPREVIEW, a.showNotice, this);
        GGlobal.control.remove(Enum_MsgType.FUNCTIONPREVIEW, a.show, this);
        IconUtil.setImg(a.iconImg, null);
    };
    View_FunctionPreview.prototype.resetPosition = function () {
        var a = this;
        // a.setXY((fairygui.GRoot.inst.width - a.width), View_ActPreview.instance.height + ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + ViewMainTopUI2.instance.height * 2);
    };
    View_FunctionPreview.prototype.resetPosition1 = function () {
        var a = this;
        a.setXY(43, 164);
    };
    View_FunctionPreview.URL = "ui://7gxkx46wobjs4d";
    return View_FunctionPreview;
}(fairygui.GComponent));
__reflect(View_FunctionPreview.prototype, "View_FunctionPreview");
