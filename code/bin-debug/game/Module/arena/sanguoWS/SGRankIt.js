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
var SGRankIt = (function (_super) {
    __extends(SGRankIt, _super);
    function SGRankIt() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        return _this;
    }
    SGRankIt.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "SGRankIt"));
    };
    SGRankIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.rankImg = (this.getChild("rankImg"));
        this.lbRank = (this.getChild("lbRank"));
    };
    SGRankIt.prototype.clean = function () {
        ConfigHelp.cleanGridview(this.grids);
    };
    SGRankIt.prototype.setIndex = function (i, max) {
        var s = this;
        ConfigHelp.cleanGridview(s.grids);
        var lib = Config.double_230[i + 1];
        var condi = JSON.parse(lib.rank)[0];
        var str = lib.tips;
        if (condi[0] != condi[1]) {
            str += "\n(" + condi[0] + "-" + condi[1] + ")";
            s.rankImg.visible = false;
            s.lbRank.visible = true;
            s.lbRank.text = str;
        }
        else {
            s.lbRank.visible = false;
            s.rankImg.visible = true;
            s.rankImg.url = CommonManager.getCommonUrl("rank_" + condi[0]);
        }
        var award = JSON.parse(lib.reward);
        var awa = ConfigHelp.makeItemListArr(award);
        s.grids = ConfigHelp.addGridview(awa, s, 100, 20, true, false);
        for (var i_1 = 0; i_1 < s.grids.length; i_1++) {
            s.grids[i_1].setXY(466 - i_1 * 88, 7);
            s.grids[i_1].setScale(0.8, 0.8);
        }
    };
    SGRankIt.URL = "ui://me1skowl608av";
    return SGRankIt;
}(fairygui.GComponent));
__reflect(SGRankIt.prototype, "SGRankIt");
