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
 * @date: 2020-04-08 17:35:30
 */
var XyfqItemRank = (function (_super) {
    __extends(XyfqItemRank, _super);
    function XyfqItemRank() {
        return _super.call(this) || this;
    }
    XyfqItemRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "XyfqItemRank"));
    };
    XyfqItemRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    XyfqItemRank.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.tfRank.text = "\u7B2C" + pData.rank + "\u540D";
            if (pData.name) {
                t.tfName.text = pData.name;
                t.tfCount.text = "\u62BD\u7B7E\u6570\uFF1A" + pData.count + "\u6B21";
            }
            else {
                t.tfName.text = HtmlUtil.font("虚位以待", "#cccccc");
                t.tfCount.text = HtmlUtil.font("\u62BD\u7B7E\u6570\uFF1A\u6682\u65E0\u6570\u636E", "#cccccc");
            }
            t.itemList.numItems = pData.rewardList.length;
        }
        else {
            t.itemList.numItems = 0;
        }
    };
    XyfqItemRank.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    XyfqItemRank.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    XyfqItemRank.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._curData && t._curData.rewardList) {
            var t_list = t._curData.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    //>>>>end
    XyfqItemRank.URL = "ui://7hwmix0gbnypp";
    return XyfqItemRank;
}(fairygui.GComponent));
__reflect(XyfqItemRank.prototype, "XyfqItemRank");
