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
var ChildFHPlayerRank = (function (_super) {
    __extends(ChildFHPlayerRank, _super);
    function ChildFHPlayerRank() {
        return _super.call(this) || this;
    }
    ChildFHPlayerRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "ChildFHPlayerRank"));
    };
    ChildFHPlayerRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        sf.n0 = (sf.getChild("n0"));
        sf.lbMyRank = (sf.getChild("lbMyRank"));
        sf.lbMyScore = (sf.getChild("lbMyScore"));
        sf.n0.callbackThisObj = sf;
        sf.n0.itemRenderer = sf.listReder;
    };
    ChildFHPlayerRank.prototype.listReder = function (idx, obj) {
        var m = GGlobal.modelFengHuoLY;
        var dta = GGlobal.modelFengHuoLY.rank_player;
        var item = obj;
        if (dta[idx]) {
            item.setdata(dta[idx], idx);
        }
        else {
            item.setdata(null, idx);
        }
    };
    ChildFHPlayerRank.prototype.listUpdate = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        sf.n0.numItems = 10;
        sf.n0.scrollToView(0);
        if (m.myRank == 0)
            sf.lbMyRank.text = "我的排名：10+";
        else
            sf.lbMyRank.text = "我的排名：" + m.myRank;
        sf.lbMyScore.text = "我的积分：" + m.myScore;
    };
    ChildFHPlayerRank.prototype.show = function () {
        var sf = this;
        GGlobal.modelFengHuoLY.CG_PLAYERRANK_3553();
        GGlobal.control.listen(Enum_MsgType.FHLY_PLAYER_UPDATE, sf.listUpdate, sf);
    };
    ChildFHPlayerRank.prototype.hide = function () {
        var sf = this;
        sf.n0.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.FHLY_PLAYER_UPDATE, sf.listUpdate, sf);
    };
    ChildFHPlayerRank.URL = "ui://edvdots4kzd9g";
    return ChildFHPlayerRank;
}(fairygui.GComponent));
__reflect(ChildFHPlayerRank.prototype, "ChildFHPlayerRank");
