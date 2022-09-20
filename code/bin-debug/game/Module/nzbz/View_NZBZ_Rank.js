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
var View_NZBZ_Rank = (function (_super) {
    __extends(View_NZBZ_Rank, _super);
    function View_NZBZ_Rank() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(NZBZ_RankItem.URL, NZBZ_RankItem);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_NZBZ_MyRank.URL, Child_NZBZ_MyRank);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_Country_Rank.URL, Child_Country_Rank);
        _this.childrenCreated();
        return _this;
    }
    View_NZBZ_Rank.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("nzbz", "View_NZBZ_Rank").asCom;
        this.contentPane = this.view;
        this.c1 = this.view.getController("c1");
        this.item0 = (this.view.getChild("item0"));
        this.item1 = (this.view.getChild("item1"));
        _super.prototype.childrenCreated.call(this);
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.updateShow, this);
    };
    View_NZBZ_Rank.prototype.updateShow = function () {
        switch (this.c1.selectedIndex) {
            case 0:
                this.item0.show();
                break;
            case 1:
                this.item1.show();
                break;
        }
    };
    View_NZBZ_Rank.prototype.onShown = function () {
        this.c1.selectedIndex = 0;
        GGlobal.control.listen(Enum_MsgType.NZBZ_RANK_UPDATE, this.updateShow, this);
        GGlobal.modelnzbz.CG_GET_NZBZ_RANK();
        GGlobal.modelnzbz.CG_GET_NZBZ_COUNTRYRANK();
    };
    View_NZBZ_Rank.prototype.onHide = function () {
        this.item0.hide();
        this.item1.hide();
        GGlobal.control.remove(Enum_MsgType.NZBZ_RANK_UPDATE, this.updateShow, this);
        GGlobal.layerMgr.close(UIConst.NANZHENG_BEIZHAN_RANK);
    };
    View_NZBZ_Rank.URL = "ui://xzyn0qe3l3h38";
    return View_NZBZ_Rank;
}(UIModalPanel));
__reflect(View_NZBZ_Rank.prototype, "View_NZBZ_Rank");
