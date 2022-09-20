/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var ChildScoreRank = (function (_super) {
    __extends(ChildScoreRank, _super);
    function ChildScoreRank() {
        return _super.call(this) || this;
    }
    ChildScoreRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "ChildScoreRank"));
    };
    ChildScoreRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n0.callbackThisObj = this;
        this.n0.itemRenderer = this.itemHD;
    };
    ChildScoreRank.prototype.itemHD = function (idx, obj) {
        var dta = GGlobal.modelFengHuoLY.rank_score;
        var item = obj;
        item.setdata(dta[idx]);
    };
    ChildScoreRank.prototype.listUpdate = function () {
        this.n0.numItems = GGlobal.modelFengHuoLY.rank_score.length;
    };
    ChildScoreRank.prototype.show = function () {
        var sf = this;
        sf.listUpdate();
        GGlobal.modelFengHuoLY.CG_SCORELIST_3571();
        GGlobal.control.listen(Enum_MsgType.FHLY_SCORERANK_UPDATE, sf.listUpdate, sf);
    };
    ChildScoreRank.prototype.hide = function () {
        var sf = this;
        sf.n0.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.FHLY_SCORERANK_UPDATE, sf.listUpdate, sf);
    };
    ChildScoreRank.URL = "ui://edvdots4kzd9k";
    return ChildScoreRank;
}(fairygui.GComponent));
__reflect(ChildScoreRank.prototype, "ChildScoreRank");
