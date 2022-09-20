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
var ChildLayerRank = (function (_super) {
    __extends(ChildLayerRank, _super);
    function ChildLayerRank() {
        return _super.call(this) || this;
    }
    ChildLayerRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ChildLayerRank"));
    };
    ChildLayerRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n7 = (this.getChild("n7"));
        this.lbNowLayer = (this.getChild("lbNowLayer"));
        this.lbMaxLayer = (this.getChild("lbMaxLayer"));
        this.lbScore = (this.getChild("lbScore"));
        this.n0.callbackThisObj = this;
        this.n0.itemRenderer = this.itemRender;
    };
    ChildLayerRank.prototype.itemRender = function (idx, obj) {
        var item = obj;
        var dt = this._data[idx] ? this._data[idx] : null;
        item.setdata(dt);
    };
    ChildLayerRank.prototype.updateList = function () {
        var m = GGlobal.modelWenDingTX;
        this._data = m.rank_Layer;
        this.n0.numItems = this._data.length;
        this.lbNowLayer.text = "当前层数：" + m.layer;
        this.lbMaxLayer.text = "最高层数：" + m.maxLayer;
        this.lbScore.text = "最高积分：" + m.score;
    };
    ChildLayerRank.prototype.open = function () {
        var s = this;
        var m = GGlobal.modelWenDingTX;
        m.layerRank4217();
        s.updateList();
        GGlobal.control.listen(Enum_MsgType.WDTX_RANK, s.updateList, s);
    };
    ChildLayerRank.prototype.close = function () {
        var s = this;
        s.n0.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.WDTX_RANK, s.updateList, s);
    };
    ChildLayerRank.URL = "ui://gxs8kn67fl2h9";
    return ChildLayerRank;
}(fairygui.GComponent));
__reflect(ChildLayerRank.prototype, "ChildLayerRank");
