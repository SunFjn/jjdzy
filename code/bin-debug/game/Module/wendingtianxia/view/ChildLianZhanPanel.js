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
var ChildLianZhanPanel = (function (_super) {
    __extends(ChildLianZhanPanel, _super);
    function ChildLianZhanPanel() {
        return _super.call(this) || this;
    }
    ChildLianZhanPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("wendingTX", "ChildLianZhanPanel"));
    };
    ChildLianZhanPanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n3 = (this.getChild("n3"));
        this.n1 = (this.getChild("n1"));
        this.n0.callbackThisObj = this;
        this.n0.itemRenderer = this.itemRender;
    };
    ChildLianZhanPanel.prototype.itemRender = function (idx, obj) {
        var item = obj;
        var dt = this._data[idx] ? this._data[idx] : null;
        item.setdata(dt);
    };
    ChildLianZhanPanel.prototype.updateList = function () {
        var m = GGlobal.modelWenDingTX;
        this._data = m.rank_LianZhan;
        this.n0.numItems = this._data.length;
        this.n1.text = "我的连斩：" + m.kill_count;
    };
    ChildLianZhanPanel.prototype.open = function () {
        var s = this;
        var m = GGlobal.modelWenDingTX;
        m.killCountRank4215();
        s.updateList();
        GGlobal.control.listen(Enum_MsgType.WDTX_RANK, s.updateList, s);
    };
    ChildLianZhanPanel.prototype.close = function () {
        var s = this;
        s.n0.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.WDTX_RANK, s.updateList, s);
    };
    ChildLianZhanPanel.URL = "ui://gxs8kn67fl2h7";
    return ChildLianZhanPanel;
}(fairygui.GComponent));
__reflect(ChildLianZhanPanel.prototype, "ChildLianZhanPanel");
