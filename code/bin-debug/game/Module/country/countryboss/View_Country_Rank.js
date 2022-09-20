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
var View_Country_Rank = (function (_super) {
    __extends(View_Country_Rank, _super);
    function View_Country_Rank() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_Country_Rank.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("country", "View_Country_Rank").asCom;
        this.contentPane = this.view;
        this.item0 = (this.view.getChild("item0"));
        this.item1 = (this.view.getChild("item1"));
        this.c1 = this.view.getController("c1");
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.changeHandler, this);
        _super.prototype.childrenCreated.call(this);
    };
    View_Country_Rank.prototype.changeHandler = function () {
        if (this.c1.selectedIndex == 0) {
            this.frame.asLabel.text = "排行榜(" + this._args + "层)";
            this.item0.updateShow();
        }
        else {
            this.frame.asLabel.text = "排行榜";
            this.item1.updateShow();
        }
    };
    View_Country_Rank.prototype.onShown = function () {
        if (this.c1.selectedIndex == 0) {
            this.changeHandler();
        }
        else {
            this.c1.selectedIndex = 0;
        }
        GGlobal.modelCtryBoss.CG_OPEN_COUNTRYBOSS_RANK(this._args);
        GGlobal.modelCtryBoss.CG_OPEN_COUNTRYRANK();
        GGlobal.control.listen(Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE, this.changeHandler, this);
    };
    View_Country_Rank.prototype.onHide = function () {
        GGlobal.modelCtryBoss.countryRankArr = [];
        GGlobal.modelCtryBoss.myRankArr = [];
        GGlobal.modelCtryBoss.myhurt = 0;
        GGlobal.control.remove(Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE, this.changeHandler, this);
        GGlobal.layerMgr.close(UIConst.COUNTRYBOSS_RANK);
        this.item0.clean();
        this.item1.clean();
    };
    View_Country_Rank.URL = "ui://uwzc58njp1wo29";
    return View_Country_Rank;
}(UIModalPanel));
__reflect(View_Country_Rank.prototype, "View_Country_Rank");
