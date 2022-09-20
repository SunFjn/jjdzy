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
 * @date: 2019-10-08 15:22:52
 */
var QxzlCountryRankItem = (function (_super) {
    __extends(QxzlCountryRankItem, _super);
    function QxzlCountryRankItem() {
        return _super.call(this) || this;
    }
    QxzlCountryRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlCountryRankItem"));
    };
    QxzlCountryRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    QxzlCountryRankItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.tfCountry.text = FastAPI.getCountryName(pData.countryId, true);
            t.tfScore.text = ConfigHelp.reTxt("总积分：{0}", pData.score);
            if (pData.countryId > 0) {
                IconUtil.setImg(t.loaderFlag, Enum_Path.IMAGE_MODULES_URL + "country/countrya" + pData.countryId + ".png");
            }
            t.itemList.numItems = pData.rewardList.length;
            t.registerEvent(true);
        }
        else {
            t.itemList.numItems = 0;
            t.registerEvent(false);
        }
    };
    QxzlCountryRankItem.prototype.clean = function () {
        this.setData(null);
        IconUtil.setImg(this.loaderFlag, null);
        _super.prototype.clean.call(this);
    };
    QxzlCountryRankItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    QxzlCountryRankItem.prototype.onItemRender = function (pIndex, pItem) {
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
    QxzlCountryRankItem.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    QxzlCountryRankItem.URL = "ui://6d8dzzdgcpw91b";
    return QxzlCountryRankItem;
}(fairygui.GComponent));
__reflect(QxzlCountryRankItem.prototype, "QxzlCountryRankItem");
