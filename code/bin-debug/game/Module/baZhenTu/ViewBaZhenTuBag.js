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
var ViewBaZhenTuBag = (function (_super) {
    __extends(ViewBaZhenTuBag, _super);
    function ViewBaZhenTuBag() {
        var _this = _super.call(this) || this;
        _this._goStatus = false;
        _this.setSkin("baZhenTu", "baZhenTu_atlas0", "ViewBaZhenTuBag");
        return _this;
    }
    ViewBaZhenTuBag.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuBag"));
    };
    ViewBaZhenTuBag.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.frame.getChild("icon").asLoader.url = "ui://xrzn9ppab5l2n";
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.list.setVirtual();
    };
    ViewBaZhenTuBag.prototype.onShown = function () {
        this._index = this._args;
        this.addListen();
        this.update();
    };
    ViewBaZhenTuBag.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.BAZHENTU_BAG);
        if (!this._goStatus) {
            GGlobal.layerMgr.open(UIConst.BAZHENTU, 0);
        }
        this._goStatus = false;
        this.list.numItems = 0;
    };
    ViewBaZhenTuBag.prototype.addListen = function () {
        this.BtnGo.addClickListener(this.onGo, this);
        GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.OPENUI, this.update, this);
    };
    ViewBaZhenTuBag.prototype.removeListen = function () {
        this.vEqu.grid.showEff(false);
        this.BtnGo.removeClickListener(this.onGo, this);
        GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.OPENUI, this.update, this);
    };
    ViewBaZhenTuBag.prototype.update = function () {
        this._showArr = [];
        var len = Model_BaZhenTu.bagArr.length;
        var arr1 = []; //红点替换
        var arr2 = []; //无
        var equip = Model_BaZhenTu.equipArr[this._index - 1];
        var typeArr = {};
        for (var j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
            var eq = Model_BaZhenTu.equipArr[j];
            if (!eq || eq.id == 0)
                continue;
            typeArr[eq.type] = true;
        }
        for (var i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
            var v = Model_BaZhenTu.bagArr[i];
            if (v == null || v.type == 0) {
                continue;
            }
            if (equip == null || equip.id == 0) {
                if (typeArr[v.type]) {
                    arr2.push(v);
                }
                else {
                    arr1.push(v);
                }
            }
            else {
                if (v.power > equip.power) {
                    if (v.type == equip.type || !typeArr[v.type]) {
                        arr1.push(v);
                    }
                    else {
                        arr2.push(v);
                    }
                }
                else {
                    arr2.push(v);
                }
            }
        }
        arr1.sort(this.sortFunc);
        arr2.sort(this.sortFunc);
        this._showArr = arr1.concat(arr2);
        len = this._showArr.length;
        this.list.numItems = len;
        if (len > 0) {
            this.list.scrollToView(0);
        }
        this.lbTip.visible = this.BtnGo.visible = this.BtnGo.touchable = len == 0;
        this.vEqu.grid.isShowEff = true;
        this.vEqu.setEqu(Model_BaZhenTu.equipArr[this._index - 1], this._index);
    };
    ViewBaZhenTuBag.prototype.sortFunc = function (a, b) {
        if (a.pz != b.pz) {
            return b.pz - a.pz;
        }
        if (a.starLv != b.starLv) {
            return b.starLv - a.starLv;
        }
        if (a.level != b.level) {
            return b.level - a.level;
        }
        return b.id - a.id;
    };
    ViewBaZhenTuBag.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        grid.grid.isShowEff = true;
        grid.setBag(this._showArr[index], this._index);
    };
    ViewBaZhenTuBag.prototype.onGo = function () {
        this._goStatus = true;
        if (GGlobal.layerMgr.isOpenView(UIConst.BAZHENTU)) {
            GGlobal.layerMgr.getView(UIConst.BAZHENTU).setSelectIndex(2);
        }
        else {
            GGlobal.layerMgr.open(UIConst.BAZHENTU_JIANDING);
        }
        this.closeEventHandler(null);
    };
    ViewBaZhenTuBag.URL = "ui://xrzn9ppacsl06";
    return ViewBaZhenTuBag;
}(UIPanelBase));
__reflect(ViewBaZhenTuBag.prototype, "ViewBaZhenTuBag");
