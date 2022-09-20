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
 * @date: 2019-10-08 15:27:17
 */
var QxzlPlayerRankItem = (function (_super) {
    __extends(QxzlPlayerRankItem, _super);
    function QxzlPlayerRankItem() {
        var _this = _super.call(this) || this;
        _this._curCountryId = 0;
        return _this;
    }
    QxzlPlayerRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlPlayerRankItem"));
    };
    QxzlPlayerRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    QxzlPlayerRankItem.prototype.setData = function (pCountry, pRank) {
        var t = this;
        if (pRank > 0) {
            var t_dataList = GGlobal.modelQxzl.getRankVoListByType(2);
            t._curData = t_dataList[pRank - 1];
        }
        else
            t._curData = null;
        t._curCountryId = pCountry;
        if (t._curData) {
            t.itemList.numItems = t._curData.rewardList.length;
            if (pRank <= 3) {
                t.rankCtrl.selectedIndex = pRank;
            }
            else {
                t.rankCtrl.selectedIndex = 0;
                t.tfRank.text = pRank + "";
            }
            var t_playerList = GGlobal.modelQxzl.getRankPlayerListByCountry(pCountry);
            var t_playerVo = t_playerList[pRank - 1];
            if (t_playerVo) {
                t.tfName.text = t_playerVo.name;
                t.tfScore.text = ConfigHelp.reTxt("积分：{0}", t_playerVo.score);
                t.stateCtrl.selectedIndex = 1;
            }
            else {
                t.tfName.text = HtmlUtil.font("虚位以待", 0xcccccc);
                t.stateCtrl.selectedIndex = 0;
            }
            t.registerEvent(true);
        }
        else {
            t.itemList.numItems = 0;
            t.registerEvent(false);
        }
    };
    QxzlPlayerRankItem.prototype.clean = function () {
        this.setData(0, 0);
        _super.prototype.clean.call(this);
    };
    QxzlPlayerRankItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    QxzlPlayerRankItem.prototype.onItemRender = function (pIndex, pItem) {
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
    QxzlPlayerRankItem.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    QxzlPlayerRankItem.URL = "ui://6d8dzzdgg6cv1d";
    return QxzlPlayerRankItem;
}(fairygui.GComponent));
__reflect(QxzlPlayerRankItem.prototype, "QxzlPlayerRankItem");
