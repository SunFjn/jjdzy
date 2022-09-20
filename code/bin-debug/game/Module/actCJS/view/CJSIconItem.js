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
 * @author: lujiahao
 * @date: 2019-11-20 17:23:31
 */
var CJSIconItem = (function (_super) {
    __extends(CJSIconItem, _super);
    function CJSIconItem() {
        return _super.call(this) || this;
    }
    CJSIconItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCJS", "CJSIconItem"));
    };
    CJSIconItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    CJSIconItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.visible = true;
            t.stateCtrl.selectedIndex = pData.state;
            IconUtil.setImg1(Enum_Path.CJS_URL + pData.cfg.tb + ".png", t.iconLoader);
            t.addClickListener(t.onOpen, t);
        }
        else {
            t.visible = false;
        }
    };
    CJSIconItem.prototype.onOpen = function () {
        var t = this;
        GGlobal.layerMgr.open(UIConst.ACTCOM_CJS_TASK, { layer: t._curData.cfg.cs });
    };
    CJSIconItem.prototype.dispose = function () {
        var t = this;
        t.removeClickListener(t.onOpen, t);
        t.setData(null);
        IconUtil.setImg1(null, t.iconLoader);
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    CJSIconItem.URL = "ui://ehocr0vupwnz6";
    return CJSIconItem;
}(fairygui.GComponent));
__reflect(CJSIconItem.prototype, "CJSIconItem");
