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
/**
 * 六道
 */
var Child_SixWay = (function (_super) {
    __extends(Child_SixWay, _super);
    function Child_SixWay() {
        return _super.call(this) || this;
    }
    Child_SixWay.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "Child_SixWay"));
    };
    Child_SixWay.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        self.linkSixWay.text = HtmlUtil.createLink("玩法说明");
        self.linkSixWay.addEventListener(egret.TextEvent.LINK, self.openGaiLV, self);
        GGlobal.modellh.CG_SIXWAY_OPENUI();
    };
    Child_SixWay.prototype.openPanel = function (pData) {
        this.onShown();
    };
    Child_SixWay.prototype.closePanel = function (pData) {
        this.onHide();
    };
    Child_SixWay.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_SixWay.prototype.onShown = function () {
        var self = this;
        // GGlobal.modellh.CG_SIXWAY_OPENUI();
        GGlobal.control.listen(UIConst.SIXWAY, self.updateView, self);
        self.btnBag.addClickListener(self.onOpenBag, self);
        GGlobal.reddot.listen(UIConst.SIXWAY, self.updateView, self);
        self.updateView();
    };
    Child_SixWay.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.SIXWAY, self.updateView, self);
        self.btnBag.removeClickListener(self.onOpenBag, self);
        GGlobal.reddot.remove(UIConst.SIXWAY, self.updateView, self);
    };
    Child_SixWay.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(GGlobal.modellh.suitArr[idx], idx);
    };
    Child_SixWay.prototype.openGaiLV = function (evt) {
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SIXWAY);
    };
    /**
     * 更新页面数据
     */
    Child_SixWay.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.modellh;
        self.list.numItems = model.suitArr ? model.suitArr.length : 0;
        self.powerLb.text = model.power + "";
        self.btnBag.checkNotice = Model_LunHui.length >= 250;
    };
    /**
     * 打开分解背包
     */
    Child_SixWay.prototype.onOpenBag = function () {
        // GGlobal.layerMgr.close2(UIConst.SIXWAY);
        // GGlobal.layerMgr.close2(UIConst.LUNHUI);
        // GGlobal.layerMgr.close2(UIConst.TIANMING);
        GGlobal.layerMgr.open(UIConst.SIXWAY_FENJIE, UIConst.SIXWAY);
    };
    Child_SixWay.URL = "ui://ehelf5bh11m1wv";
    return Child_SixWay;
}(fairygui.GComponent));
__reflect(Child_SixWay.prototype, "Child_SixWay", ["IPanel"]);
