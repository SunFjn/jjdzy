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
var ViewBaZhenTuTemp = (function (_super) {
    __extends(ViewBaZhenTuTemp, _super);
    function ViewBaZhenTuTemp() {
        var _this = _super.call(this) || this;
        _this.setSkin("baZhenTu", "baZhenTu_atlas0", "ViewBaZhenTuTemp");
        return _this;
    }
    ViewBaZhenTuTemp.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuTemp"));
    };
    ViewBaZhenTuTemp.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.frame.getChild("icon").asLoader.url = "ui://xrzn9ppab5l2n";
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHander;
        this.list.setVirtual();
    };
    ViewBaZhenTuTemp.prototype.onShown = function () {
        this.list.addEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
        this.update();
    };
    ViewBaZhenTuTemp.prototype.onHide = function () {
        this.vSelect.grid.tipEnable = false;
        this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
        GGlobal.layerMgr.close(UIConst.BAZHENTU_TEMP);
        this.list.numItems = 0;
    };
    ViewBaZhenTuTemp.prototype.update = function () {
        this._showArr = [];
        for (var keys in Config.bztzf_261) {
            var v = Config.bztzf_261[keys];
            this._showArr.push(v);
        }
        this.list.numItems = this._showArr.length;
        if (this._showArr.length > 0) {
            this.list.scrollToView(0);
            this.list.selectedIndex = 0;
        }
        this.selectdUpdate(this._showArr[0]);
    };
    ViewBaZhenTuTemp.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.grid.isShowEff = true;
        gird.setTemp(this._showArr[index]);
    };
    ViewBaZhenTuTemp.prototype.itemClick = function (e) {
        var clickItem = e.itemObject;
        this.selectdUpdate(clickItem.getTemp());
    };
    ViewBaZhenTuTemp.prototype.selectdUpdate = function (v) {
        var vba = new VoBaZhenTu();
        vba.starLv = 1;
        vba.level = 0;
        vba.id = v.id;
        vba.initLib();
        this.vSelect.grid.isShowEff = true;
        this.vSelect.vo = vba;
        this.vSelect.grid.tipEnable = true;
        this.vSelect.btnDown.visible = this.vSelect.btnDown.touchable = false;
        this.vSelect.btnWear.visible = this.vSelect.btnWear.touchable = false;
        this.vSelect.imgEquip.visible = false;
    };
    ViewBaZhenTuTemp.URL = "ui://xrzn9ppab5l2z";
    return ViewBaZhenTuTemp;
}(UIPanelBase));
__reflect(ViewBaZhenTuTemp.prototype, "ViewBaZhenTuTemp");
