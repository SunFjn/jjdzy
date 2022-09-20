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
 * @date: 2020-01-07 17:36:07
 */
var LuckyEggItem = (function (_super) {
    __extends(LuckyEggItem, _super);
    function LuckyEggItem() {
        return _super.call(this) || this;
    }
    LuckyEggItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("luckyEgg", "LuckyEggItem"));
    };
    LuckyEggItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    LuckyEggItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.typeCtrl.selectedIndex = pData.poolType - 1;
            if (pData.hasGet)
                t.visible = false;
            else
                t.visible = true;
        }
        else {
            t.visible = false;
        }
    };
    LuckyEggItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    LuckyEggItem.URL = "ui://wx4kos8uosj3h";
    return LuckyEggItem;
}(fairygui.GComponent));
__reflect(LuckyEggItem.prototype, "LuckyEggItem");
