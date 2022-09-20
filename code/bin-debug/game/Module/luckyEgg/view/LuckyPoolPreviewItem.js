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
 * @date: 2020-01-07 17:48:23
 */
var LuckyPoolPreviewItem = (function (_super) {
    __extends(LuckyPoolPreviewItem, _super);
    function LuckyPoolPreviewItem() {
        return _super.call(this) || this;
    }
    LuckyPoolPreviewItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("luckyEgg", "LuckyPoolPreviewItem"));
    };
    LuckyPoolPreviewItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        // t.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    LuckyPoolPreviewItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.iconLoader.url = CommonManager.getUrl("luckyEgg", "levelImg_" + pData.poolType);
            t.itemList.numItems = pData.rewardList.length;
            if (pData.rewardList.length > 10)
                t.hCtrl.selectedIndex = 2;
            else if (pData.rewardList.length > 5)
                t.hCtrl.selectedIndex = 1;
            else
                t.hCtrl.selectedIndex = 0;
        }
        else {
            t.itemList.numItems = 0;
        }
    };
    LuckyPoolPreviewItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    LuckyPoolPreviewItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    LuckyPoolPreviewItem.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._curData) {
            pItem.vo = t._curData.rewardList[pIndex];
        }
    };
    //>>>>end
    LuckyPoolPreviewItem.URL = "ui://wx4kos8ulxqwn";
    return LuckyPoolPreviewItem;
}(fairygui.GLabel));
__reflect(LuckyPoolPreviewItem.prototype, "LuckyPoolPreviewItem");
