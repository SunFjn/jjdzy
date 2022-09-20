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
 * @date: 2020-04-09 16:21:54
 */
var XyfqRewardItem = (function (_super) {
    __extends(XyfqRewardItem, _super);
    function XyfqRewardItem() {
        return _super.call(this) || this;
    }
    XyfqRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "XyfqRewardItem"));
    };
    XyfqRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
    };
    //=========================================== API ==========================================
    XyfqRewardItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            var t_cfg = pData.rewardCfg;
            t.comTitle.title = t_cfg.name;
            var t_dataList = pData.rewardList;
            t._dataList = t_dataList;
            t.itemList.numItems = t_dataList.length;
            if (t_dataList.length > 12)
                t.hCtrl.selectedIndex = 2;
            else if (t_dataList.length > 6)
                t.hCtrl.selectedIndex = 1;
            else
                t.hCtrl.selectedIndex = 0;
        }
        else {
            t._dataList = null;
            t.itemList.numItems = 0;
        }
    };
    XyfqRewardItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    XyfqRewardItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    XyfqRewardItem.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList && t._dataList[pIndex]) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t._dataList[pIndex];
        }
    };
    //>>>>end
    XyfqRewardItem.URL = "ui://7hwmix0gbnypu";
    return XyfqRewardItem;
}(fairygui.GComponent));
__reflect(XyfqRewardItem.prototype, "XyfqRewardItem");
