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
 * 合服活动-大神送礼
 */
var Child_HeFu_DSSL = (function (_super) {
    __extends(Child_HeFu_DSSL, _super);
    function Child_HeFu_DSSL() {
        return _super.call(this) || this;
    }
    Child_HeFu_DSSL.createInstance = function () {
        return (fairygui.UIPackage.createObject("hefuAct", "Child_HeFu_DSSL"));
    };
    Child_HeFu_DSSL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_HeFu_DSSL.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(HeFu_DSSL_Item.URL, HeFu_DSSL_Item);
        f(HeFu_DSSL_Item1.URL, HeFu_DSSL_Item1);
    };
    Child_HeFu_DSSL.prototype.initView = function (pParent) {
        var self = this;
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
    };
    Child_HeFu_DSSL.prototype.openPanel = function (pData) {
        this.y = 264;
        this.show();
        GGlobal.modelActivity.CG_OPENACT(UIConst.HFKH_DSSL);
    };
    Child_HeFu_DSSL.prototype.closePanel = function (pData) {
        this.disposePanel();
        this.list.numItems = 0;
    };
    Child_HeFu_DSSL.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    /**注销事件 */
    Child_HeFu_DSSL.prototype.disposePanel = function () {
        var self = this;
        IconUtil.setImg(self.bgImg, null);
        GGlobal.control.remove(UIConst.HFKH_DSSL, self.updateView, self);
    };
    Child_HeFu_DSSL.prototype.show = function () {
        var self = this;
        IconUtil.setImg(self.bgImg, Enum_Path.PIC_URL + "dashensongli.jpg");
        GGlobal.control.listen(UIConst.HFKH_DSSL, self.updateView, self);
    };
    /**
     * 更新页面数据
     */
    Child_HeFu_DSSL.prototype.updateView = function () {
        var self = this;
        self.rechargeTxt.text = "活动期间已充值：" + GGlobal.model_actCom.dsslRecharge + "元";
        this._listData = GGlobal.model_actCom.numArr;
        this.list.numItems = this._listData ? this._listData.length : 0;
    };
    Child_HeFu_DSSL.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setType(this._listData[index]);
    };
    Child_HeFu_DSSL.pkg = "hefuAct";
    Child_HeFu_DSSL.URL = "ui://07jsdu7hhilo6";
    return Child_HeFu_DSSL;
}(fairygui.GComponent));
__reflect(Child_HeFu_DSSL.prototype, "Child_HeFu_DSSL", ["IPanel"]);
