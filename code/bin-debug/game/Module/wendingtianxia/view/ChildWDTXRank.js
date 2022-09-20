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
var ChildWDTXRank = (function (_super) {
    __extends(ChildWDTXRank, _super);
    function ChildWDTXRank() {
        return _super.call(this) || this;
    }
    ChildWDTXRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ChildWDTXRank"));
    };
    ChildWDTXRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n6 = (this.getChild("n6"));
        this.lbMyRank = (this.getChild("lbMyRank"));
        this.lbScore = (this.getChild("lbScore"));
        this.n0.callbackThisObj = this;
        this.n0.itemRenderer = this.itemRender;
    };
    ChildWDTXRank.prototype.itemRender = function (idx, obj) {
        var item = obj;
        var dt = this._data[idx] ? this._data[idx] : null;
        item.setdata(dt);
    };
    ChildWDTXRank.prototype.updateList = function () {
        var m = GGlobal.modelWenDingTX;
        this._data = m.rank_Total;
        this.n0.numItems = m.rank_Total.length;
        this.lbScore.text = "当前积分：" + m.score;
        if (m.rank > 10)
            this.lbMyRank.text = "我的排名：10+";
        else
            this.lbMyRank.text = "我的排名：" + m.rank;
    };
    ChildWDTXRank.prototype.open = function () {
        var s = this;
        var m = GGlobal.modelWenDingTX;
        m.totalRank4213();
        s.updateList();
        GGlobal.control.listen(Enum_MsgType.WDTX_RANK, s.updateList, s);
    };
    ChildWDTXRank.prototype.close = function () {
        var s = this;
        s.n0.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.WDTX_RANK, s.updateList, s);
    };
    ChildWDTXRank.URL = "ui://gxs8kn67fl2h5";
    return ChildWDTXRank;
}(fairygui.GComponent));
__reflect(ChildWDTXRank.prototype, "ChildWDTXRank");
