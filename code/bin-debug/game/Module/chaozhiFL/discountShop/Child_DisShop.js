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
var Child_DisShop = (function (_super) {
    __extends(Child_DisShop, _super);
    function Child_DisShop() {
        return _super.call(this) || this;
    }
    Child_DisShop.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "Child_DisShop"));
    };
    Child_DisShop.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.list = (this.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        this.list.setVirtual();
    };
    Child_DisShop.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(GGlobal.modelCZFL.shopArr[index]);
    };
    Child_DisShop.prototype.show = function () {
        this.list.numItems = GGlobal.modelCZFL.shopArr.length;
    };
    Child_DisShop.prototype.open = function () {
        GGlobal.control.listen(Enum_MsgType.DISCOUNT_SHOP, this.show, this);
        if (GGlobal.modelCZFL.shopArr.length <= 0) {
            if (ModelEightLock.originalDatas[UIConst.DISCOUNT_SHOP1]) {
                GGlobal.modelEightLock.CG4571(UIConst.DISCOUNT_SHOP1);
            }
            else {
                GGlobal.modelCZFL.CG_OPEN_DISCOUNTSHOP();
            }
        }
        else {
            this.show();
        }
    };
    Child_DisShop.prototype.close = function () {
        this.list.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.DISCOUNT_SHOP, this.show, this);
    };
    Child_DisShop.URL = "ui://qzsojhcrt68wf";
    return Child_DisShop;
}(fairygui.GComponent));
__reflect(Child_DisShop.prototype, "Child_DisShop", ["ICZFLView"]);
