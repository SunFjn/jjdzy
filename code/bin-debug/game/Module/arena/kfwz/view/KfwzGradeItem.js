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
 * @date: 2019-12-07 14:41:40
 */
var KfwzGradeItem = (function (_super) {
    __extends(KfwzGradeItem, _super);
    function KfwzGradeItem() {
        return _super.call(this) || this;
    }
    KfwzGradeItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzGradeItem"));
    };
    KfwzGradeItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    KfwzGradeItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.itemList.numItems = pData.rewardList.length;
            t.gradeCtrl.selectedIndex = pData.cfg.dw - 1;
        }
        else {
            t.itemList.numItems = 0;
        }
    };
    KfwzGradeItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    KfwzGradeItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    KfwzGradeItem.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (!t._curData)
            return;
        var t_dataList = t._curData.rewardList;
        if (t_dataList) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_dataList[pIndex];
        }
    };
    //>>>>end
    KfwzGradeItem.URL = "ui://me1skowlpmqq76";
    return KfwzGradeItem;
}(fairygui.GComponent));
__reflect(KfwzGradeItem.prototype, "KfwzGradeItem");
