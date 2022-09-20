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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewMRBOX = (function (_super) {
    __extends(ViewMRBOX, _super);
    function ViewMRBOX() {
        var _this = _super.call(this) || this;
        _this.awards = [];
        _this.grids = [];
        _this.ids = 0;
        _this.loadRes("shouchong", "shouchong_atlas0");
        fairygui.UIObjectFactory.setPackageItemExtension(MRBox.URL, MRBox);
        return _this;
    }
    ViewMRBOX.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouchong", "ViewMRBOX"));
    };
    ViewMRBOX.prototype.childrenCreated = function () {
        GGlobal.createPack("shouchong");
        var s = this;
        s.view = fairygui.UIPackage.createObject("shouchong", "ViewMRBOX").asCom;
        s.contentPane = s.view;
        s.frame = (s.view.getChild("frame"));
        s.lbPro = (s.view.getChild("lbPro"));
        s.btn = (s.view.getChild("btn"));
        s.lbTip = (s.view.getChild("lbTip"));
        s.img = (s.view.getChild("img"));
        s.n9 = (s.view.getChild("n9"));
        s.n9.callbackThisObj = s;
        s.n9.itemRenderer = s.awardsRender;
        _super.prototype.childrenCreated.call(this);
        s.resetPosition();
    };
    ViewMRBOX.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.grid.showEff(true);
    };
    ViewMRBOX.prototype.onClick = function () {
        GGlobal.modelRecharge.CG_MRSC_1933(this.ids);
    };
    ViewMRBOX.prototype.update = function () {
        var m = GGlobal.modelRecharge;
        var st = m.mrscBox[this.ids - 1][0];
        var lib = Config.mrbx_715[this.ids];
        var d = lib.NEED;
        this.awards = ConfigHelp.makeItemListArr(JSON.parse(lib.AWARD));
        this.n9.numItems = this.awards.length;
        this.lbPro.text = "累充达到" + d + "天可领取(" + m.day + "/" + d + ")";
        this.lbPro.visible = st == 0;
        this.lbTip.visible = st == 0;
        this.btn.visible = st == 1;
        this.img.visible = st == 2;
    };
    ViewMRBOX.prototype.onShown = function () {
        this.ids = this._args;
        this.update();
        this.btn.addClickListener(this.onClick, this);
        GGlobal.control.listen(Enum_MsgType.MEIRISHOUCHONGUP, this.update, this);
    };
    ViewMRBOX.prototype.onHide = function () {
        this.n9.numItems = 0;
        this.btn.removeClickListener(this.onClick, this);
        GGlobal.layerMgr.close(UIConst.MRSCBOX);
        GGlobal.control.remove(Enum_MsgType.MEIRISHOUCHONGUP, this.update, this);
    };
    ViewMRBOX.URL = "ui://zzz8io3ro5124";
    return ViewMRBOX;
}(UIModalPanel));
__reflect(ViewMRBOX.prototype, "ViewMRBOX");
