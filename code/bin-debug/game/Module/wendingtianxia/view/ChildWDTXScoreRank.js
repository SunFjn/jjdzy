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
var ChildWDTXScoreRank = (function (_super) {
    __extends(ChildWDTXScoreRank, _super);
    function ChildWDTXScoreRank() {
        return _super.call(this) || this;
    }
    ChildWDTXScoreRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ChildWDTXScoreRank"));
    };
    ChildWDTXScoreRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.lbScore = (this.getChild("lbScore"));
        this.n0.callbackThisObj = this;
        this.n0.itemRenderer = this.itemRender;
    };
    ChildWDTXScoreRank.prototype.itemRender = function (idx, obj) {
        var item = obj;
        var dt = this._data[idx] ? this._data[idx] : null;
        item.setdata(dt);
    };
    ChildWDTXScoreRank.prototype.updateList = function () {
        var m = GGlobal.modelWenDingTX;
        this._data = m.rank_Score;
        this.n0.numItems = m.rank_Score.length;
        this.lbScore.text = "当前积分：" + m.score;
    };
    ChildWDTXScoreRank.prototype.open = function () {
        var s = this;
        var m = GGlobal.modelWenDingTX;
        m.rankScore4235();
        s.updateList();
        GGlobal.control.listen(Enum_MsgType.WDTX_RANK, s.updateList, s);
    };
    ChildWDTXScoreRank.prototype.close = function () {
        var s = this;
        s.n0.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.WDTX_RANK, s.updateList, s);
    };
    ChildWDTXScoreRank.URL = "ui://gxs8kn67n3vz16";
    return ChildWDTXScoreRank;
}(fairygui.GComponent));
__reflect(ChildWDTXScoreRank.prototype, "ChildWDTXScoreRank");
