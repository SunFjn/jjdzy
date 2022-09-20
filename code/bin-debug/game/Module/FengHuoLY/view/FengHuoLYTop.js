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
var FengHuoLYTop = (function (_super) {
    __extends(FengHuoLYTop, _super);
    function FengHuoLYTop() {
        var _this = _super.call(this) || this;
        _this._data = [];
        return _this;
    }
    FengHuoLYTop.createInstance = function () {
        if (!this.inst)
            this.inst = (fairygui.UIPackage.createObject("FengHuoLY", "FengHuoLYTop"));
        return this.inst;
    };
    FengHuoLYTop.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        this.n17 = (this.getChild("n17"));
        this.lbScore = (this.getChild("lbScore"));
        this.lbDesc = (this.getChild("lbDesc"));
        this.lbTime = (this.getChild("lbTime"));
        this.n21 = (this.getChild("n21"));
        sf.n21.callbackThisObj = sf;
        sf.n21.itemRenderer = sf.itemRender;
    };
    FengHuoLYTop.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._data[idx]);
    };
    FengHuoLYTop.prototype.scoreUpdate = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        sf._data = [
            [ModelFengHuoLY.RED, m.redScore, m.redServer, 0],
            [ModelFengHuoLY.BLUE, m.blueScore, m.blueServer, 0],
            [ModelFengHuoLY.GREEN, m.greenScore, m.greenServer, 0]
        ];
        sf._data = sf._data.sort(function (a, b) { return a[1] > b[1] ? -1 : 1; });
        sf.n21.numItems = sf._data.length;
        sf.lbScore.text = "我的积分：<font color='#FFFFFF'>" + m.myScore + "</font>";
    };
    FengHuoLYTop.prototype.openDesc = function () {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.FHLY);
    };
    FengHuoLYTop.prototype.timer = function () {
        var m = GGlobal.modelFengHuoLY;
        var now = new Date(Model_GlobalMsg.getServerTime()).getTime();
        var t = (m.getEndTime() - now) / 1000;
        t = t < 0 ? 0 : t;
        var date = DateUtil.getMSBySec3(t >> 0);
        this.lbTime.text = "活动时间：<font color='#FFFFFF'>" + date + "</font>";
    };
    FengHuoLYTop.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign);
    };
    FengHuoLYTop.prototype.enter = function () {
        var sf = this;
        var b = GGlobal.layerMgr.UI_MainBottom;
        b.addChild(this);
        sf.scoreUpdate();
        sf.resetPosition();
        GGlobal.control.listen(Enum_MsgType.FHLY_SCORE_UPDATE, sf.scoreUpdate, sf);
        GGlobal.control.listen(Enum_MsgType.FHLY_SCORE_INIT, sf.scoreUpdate, sf);
        Timer.instance.listen(sf.timer, sf, 1000);
        sf.lbDesc.addClickListener(sf.openDesc, sf);
    };
    FengHuoLYTop.prototype.exite = function () {
        var sf = this;
        this.removeFromParent();
        GGlobal.control.remove(Enum_MsgType.FHLY_SCORE_UPDATE, sf.scoreUpdate, sf);
        GGlobal.control.remove(Enum_MsgType.FHLY_SCORE_INIT, sf.scoreUpdate, sf);
        Timer.instance.remove(sf.timer, sf);
        sf.lbDesc.removeClickListener(sf.openDesc, sf);
        sf.n21.numItems = 0;
    };
    FengHuoLYTop.URL = "ui://edvdots4srrs1";
    return FengHuoLYTop;
}(fairygui.GComponent));
__reflect(FengHuoLYTop.prototype, "FengHuoLYTop");
