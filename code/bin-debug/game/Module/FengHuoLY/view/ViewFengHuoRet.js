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
/** sf is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewFengHuoRet = (function (_super) {
    __extends(ViewFengHuoRet, _super);
    function ViewFengHuoRet() {
        var _this = _super.call(this) || this;
        _this._data = [];
        _this.now = 5;
        _this.childrenCreated();
        return _this;
    }
    ViewFengHuoRet.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "ViewFengHuoRet"));
    };
    ViewFengHuoRet.prototype.childrenCreated = function () {
        GGlobal.createPack("FengHuoLY");
        var sf = this;
        sf.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewFengHuoRet").asCom;
        sf.contentPane = sf.view;
        CommonManager.parseChildren(sf.view, sf);
        sf.n29.callbackThisObj = sf;
        sf.n29.itemRenderer = sf.itemRender;
        _super.prototype.childrenCreated.call(this);
    };
    ViewFengHuoRet.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._data[idx]);
    };
    ViewFengHuoRet.prototype.setUIDta = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        if (m.mvpHead) {
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHeadGrid), sf.imgHeadGrid);
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHead), sf.imgHead);
            sf.lbMvpName.text = m.MVP;
        }
        else {
            sf.lbMvpName.text = "";
        }
        sf._data = m.endDta;
        sf._data[0][3] = 1;
        sf.n29.numItems = sf._data.length;
    };
    ViewFengHuoRet.prototype.onExite = function () {
        GGlobal.modelFengHuoLY.exite();
    };
    ViewFengHuoRet.prototype.btnTimer = function () {
        var sf = this;
        sf.now--;
        if (sf.now < 1) {
            sf.onExite();
        }
        sf.n14.text = "确定（" + sf.now + "s）";
    };
    ViewFengHuoRet.prototype.onShown = function () {
        var sf = this;
        sf.setUIDta();
        sf.now = 8;
        sf.n14.addClickListener(sf.onExite, sf);
        Timer.instance.listen(sf.btnTimer, sf, 1000);
        GGlobal.control.listen(UIConst.FHLY + "end", this.setUIDta, this);
        IconUtil.setImg(sf.n22, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/bg.png");
    };
    ViewFengHuoRet.prototype.onHide = function () {
        var sf = this;
        GGlobal.control.remove(UIConst.FHLY + "end", this.setUIDta, this);
        if (sf.n14)
            sf.n14.removeClickListener(sf.onExite, sf);
        GGlobal.layerMgr.close(UIConst.FHLY_END);
        Timer.instance.remove(sf.btnTimer, sf);
        IconUtil.setImg(sf.n22, null);
        sf.n29.numItems = 0;
    };
    ViewFengHuoRet.URL = "ui://edvdots4j08a1j";
    return ViewFengHuoRet;
}(UIModalPanel));
__reflect(ViewFengHuoRet.prototype, "ViewFengHuoRet");
