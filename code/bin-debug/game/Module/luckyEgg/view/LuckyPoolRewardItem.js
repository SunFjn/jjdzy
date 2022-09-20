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
 * @date: 2020-01-07 17:52:34
 */
var LuckyPoolRewardItem = (function (_super) {
    __extends(LuckyPoolRewardItem, _super);
    function LuckyPoolRewardItem() {
        var _this = _super.call(this) || this;
        _this._poolType = 0;
        return _this;
    }
    LuckyPoolRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("luckyEgg", "LuckyPoolRewardItem"));
    };
    LuckyPoolRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.flagList.itemRenderer = t.onFlagRender;
        t.flagList.callbackThisObj = t;
    };
    //=========================================== API ==========================================
    LuckyPoolRewardItem.prototype.setData = function (pPoolType) {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        if (pPoolType > 0) {
            t.iconLoader.url = CommonManager.getUrl("luckyEgg", "levelImg_" + pPoolType);
            t._dataList = t_model.getEggItemListByType(pPoolType);
            if (t._dataList) {
                t.flagList.numItems = t.itemList.numItems = t._dataList.length;
                if (t._dataList.length > 5)
                    t.hCtrl.selectedIndex = 1;
                else
                    t.hCtrl.selectedIndex = 0;
            }
            else {
                t.flagList.numItems = t.itemList.numItems = 0;
                t.hCtrl.selectedIndex = 0;
            }
        }
        else {
            t._dataList = null;
            t.flagList.numItems = t.itemList.numItems = 0;
        }
    };
    LuckyPoolRewardItem.prototype.clean = function () {
        this.setData(0);
        _super.prototype.clean.call(this);
    };
    LuckyPoolRewardItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    LuckyPoolRewardItem.prototype.onFlagRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            var t_vo = t._dataList[pIndex];
            if (t_vo && t_vo.hasGet)
                pItem.visible = true;
            else
                pItem.visible = false;
        }
    };
    LuckyPoolRewardItem.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList && t._dataList[pIndex]) {
            pItem.vo = t._dataList[pIndex].itemVo;
        }
    };
    //>>>>end
    LuckyPoolRewardItem.URL = "ui://wx4kos8uchyoo";
    return LuckyPoolRewardItem;
}(fairygui.GLabel));
__reflect(LuckyPoolRewardItem.prototype, "LuckyPoolRewardItem");
