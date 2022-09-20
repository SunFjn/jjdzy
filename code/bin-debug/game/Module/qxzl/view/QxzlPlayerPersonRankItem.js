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
 * 玩家个人排名item
 */
var QxzlPlayerPersonRankItem = (function (_super) {
    __extends(QxzlPlayerPersonRankItem, _super);
    function QxzlPlayerPersonRankItem() {
        return _super.call(this) || this;
    }
    QxzlPlayerPersonRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlPlayerPersonRankItem"));
    };
    QxzlPlayerPersonRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    };
    QxzlPlayerPersonRankItem.prototype.setData = function (vo, pRank) {
        var t = this;
        if (pRank > 0) {
            var t_dataList = GGlobal.modelQxzl.getRankVoListByType(3);
            t._curData = t_dataList[pRank - 1];
            t.itemList.numItems = t._curData.rewardList.length;
        }
        else
            t._curData = null;
        t.lbRank.text = pRank <= 10 ? "第" + pRank + "名" : "第10+名";
        if (pRank <= 10 && vo) {
            t.c1.selectedIndex = 1;
            t.lbName.text = vo.name;
            t.lbScore.text = "积分：" + vo.score;
        }
        else if (pRank > 10 && GGlobal.modelQxzl.myPersonRank > 10 && GGlobal.modelQxzl.myPersonScore > 0) {
            t.c1.selectedIndex = 1;
            t.lbName.text = Model_player.voMine.name;
            t.lbScore.text = "积分：" + GGlobal.modelQxzl.myPersonScore;
        }
        else if (pRank > 10 && GGlobal.modelQxzl.personRankList.length > 0 && GGlobal.modelQxzl.myPersonRank <= 10) {
            t.c1.selectedIndex = 0;
            t.xwydImg.visible = false;
        }
        else {
            t.c1.selectedIndex = 0;
            t.xwydImg.visible = true;
        }
    };
    QxzlPlayerPersonRankItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
    };
    QxzlPlayerPersonRankItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    QxzlPlayerPersonRankItem.prototype.onItemRender = function (pIndex, pItem) {
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
    QxzlPlayerPersonRankItem.URL = "ui://6d8dzzdgvhu61m";
    return QxzlPlayerPersonRankItem;
}(fairygui.GComponent));
__reflect(QxzlPlayerPersonRankItem.prototype, "QxzlPlayerPersonRankItem");
