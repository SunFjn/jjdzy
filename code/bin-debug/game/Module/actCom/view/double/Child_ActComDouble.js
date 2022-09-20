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
var Child_ActComDouble = (function (_super) {
    __extends(Child_ActComDouble, _super);
    function Child_ActComDouble() {
        return _super.call(this) || this;
    }
    Child_ActComDouble.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComDouble", "Child_ActComDouble"));
    };
    Child_ActComDouble.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActComDouble.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemActComDouble.URL, ItemActComDouble);
    };
    Child_ActComDouble.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
    };
    Child_ActComDouble.prototype.openPanel = function (pData) {
        var self = this;
        self.y = 264;
        self.list.numItems = 4;
        self._act = pData;
        Timer.instance.listen(self.onUpdate, self);
        //红点
        var r = GGlobal.reddot;
        r.setCondition(UIConst.ACTCOM_DOUBLE, 0, false);
        r.notify(UIConst.ACTCOM);
        IconUtil.setImg(self.imgBg, Enum_Path.ACTCOM_URL + "doubleBg.jpg");
    };
    Child_ActComDouble.prototype.closePanel = function (pData) {
        var self = this;
        self.list.numItems = 0;
        Timer.instance.remove(self.onUpdate, self);
        IconUtil.setImg(self.imgBg, null);
    };
    Child_ActComDouble.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.closePanel();
    };
    Child_ActComDouble.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.vo = idx;
    };
    Child_ActComDouble.prototype.onUpdate = function () {
        var self = this;
        var end = self._act ? self._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            self.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            self.labTime.text = "00:00:00";
        }
    };
    Child_ActComDouble.URL = "ui://746rywv8e3qh0";
    Child_ActComDouble.pkg = "actComDouble";
    return Child_ActComDouble;
}(fairygui.GComponent));
__reflect(Child_ActComDouble.prototype, "Child_ActComDouble", ["IPanel"]);
