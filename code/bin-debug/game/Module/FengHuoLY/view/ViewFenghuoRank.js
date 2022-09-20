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
var ViewFenghuoRank = (function (_super) {
    __extends(ViewFenghuoRank, _super);
    function ViewFenghuoRank() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(ChildFHPlayerRank.URL, ChildFHPlayerRank);
        fairygui.UIObjectFactory.setPackageItemExtension(ChildServerRank.URL, ChildServerRank);
        fairygui.UIObjectFactory.setPackageItemExtension(ChildScoreRank.URL, ChildScoreRank);
        fairygui.UIObjectFactory.setPackageItemExtension(FHServerRankItem.URL, FHServerRankItem);
        fairygui.UIObjectFactory.setPackageItemExtension(FHPlayerRankItem.URL, FHPlayerRankItem);
        fairygui.UIObjectFactory.setPackageItemExtension(FengHuoScoreItem.URL, FengHuoScoreItem);
        _this.loadRes("FengHuoLY", "FengHuoLY_atlas0");
        return _this;
    }
    ViewFenghuoRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "ViewFenghuoRank"));
    };
    ViewFenghuoRank.prototype.childrenCreated = function () {
        GGlobal.createPack("FengHuoLY");
        var sf = this;
        sf.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewFenghuoRank").asCom;
        sf.contentPane = sf.view;
        sf.c1 = sf.view.getController("c1");
        sf.frame = (sf.view.getChild("frame"));
        sf.n2 = (sf.view.getChild("n2"));
        sf.n3 = (sf.view.getChild("n3"));
        sf.n4 = (sf.view.getChild("n4"));
        sf.n7 = (sf.view.getChild("n7"));
        sf.n9 = (sf.view.getChild("n9"));
        sf.n8 = (sf.view.getChild("n8"));
        sf.tabArr = [sf.n2, sf.n3, sf.n4];
        _super.prototype.childrenCreated.call(this);
    };
    ViewFenghuoRank.prototype.showPage = function () {
        if (this._page)
            this._page.hide();
        switch (this.c1.selectedIndex) {
            case 0:
                this._page = this.n7;
                break;
            case 1:
                this._page = this.n9;
                break;
            case 2:
                this._page = this.n8;
                break;
        }
        this._page.show();
    };
    ViewFenghuoRank.prototype.addRedot = function () {
        this.n4.checkNotice = GGlobal.reddot.checkCondition(UIConst.FHLY);
    };
    ViewFenghuoRank.prototype.onShown = function () {
        var sf = this;
        sf.c1.selectedIndex = 0;
        sf.tabArr[0].selected = true;
        sf.addRedot();
        sf.showPage();
        GGlobal.modelFengHuoLY.CG_PLAYERRANK_3553();
        GGlobal.reddot.listen(UIConst.FHLY, sf.addRedot, sf);
        sf.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, sf.showPage, sf);
    };
    ViewFenghuoRank.prototype.onHide = function () {
        var sf = this;
        GGlobal.reddot.remove(UIConst.FHLY, sf.addRedot, sf);
        sf.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, sf.showPage, sf);
        if (this._page)
            this._page.hide();
        GGlobal.layerMgr.close(UIConst.FHLY_RANK);
    };
    ViewFenghuoRank.URL = "ui://edvdots4kzd9f";
    return ViewFenghuoRank;
}(UIModalPanel));
__reflect(ViewFenghuoRank.prototype, "ViewFenghuoRank");
