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
var ViewBaZhenTuShow = (function (_super) {
    __extends(ViewBaZhenTuShow, _super);
    function ViewBaZhenTuShow() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(VBaZTGrid.URL, VBaZTGrid);
        _this.loadRes("baZhenTu", "baZhenTu_atlas0");
        return _this;
    }
    ViewBaZhenTuShow.prototype.childrenCreated = function () {
        GGlobal.createPack("baZhenTu");
        this.view = fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuShow").asCom;
        this.contentPane = this.view;
        this.grid = (this.view.getChild("grid"));
        this.labT = (this.view.getChild("labT"));
        this.lb1 = (this.view.getChild("lb1"));
        this.lbAttr = (this.view.getChild("lbAttr"));
        this.lbLv = (this.view.getChild("lbLv"));
        this.lbName = (this.view.getChild("lbName"));
        this.lb2 = (this.view.getChild("lb2"));
        this.lbPower = (this.view.getChild("lbPower"));
        this.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
    };
    ViewBaZhenTuShow.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
    };
    ViewBaZhenTuShow.prototype.onShown = function () {
        var c = this._args;
        this.lbName.text = c.name;
        var arr = c.content.split("_");
        var id = parseInt(arr[0]);
        var level = parseInt(arr[1]);
        var starLv = parseInt(arr[2]);
        var v = new VoBaZhenTu();
        v.id = id;
        v.level = level;
        v.starLv = starLv;
        v.initLib();
        ;
        this.grid.isShowEff = true;
        this.grid.vo = v;
        this.lbLv.text = v.level + "";
        this.lbPower.text = v.power + "";
        this.lbAttr.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
    };
    ViewBaZhenTuShow.prototype.onHide = function () {
        this.grid.showEff(false);
        GGlobal.layerMgr.close(UIConst.BAZHENTU_SHOW);
    };
    return ViewBaZhenTuShow;
}(UIModalPanel));
__reflect(ViewBaZhenTuShow.prototype, "ViewBaZhenTuShow");
