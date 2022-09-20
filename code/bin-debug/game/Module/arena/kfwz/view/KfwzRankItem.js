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
 * @date: 2019-12-09 16:44:17
 */
var KfwzRankItem = (function (_super) {
    __extends(KfwzRankItem, _super);
    function KfwzRankItem() {
        return _super.call(this) || this;
    }
    KfwzRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzRankItem"));
    };
    KfwzRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    KfwzRankItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.tfRank.text = "" + pData.rank;
            if (pData.name) {
                t.tfName.text = pData.name;
                t.iconGrade.visible = true;
            }
            else {
                t.tfName.text = "虚位以待";
                t.iconGrade.visible = false;
            }
            t.tfScore.text = pData.score + "";
            t.gradeCtrl.selectedIndex = pData.grade - 1;
        }
        else {
            t.registerEvent(false);
        }
    };
    KfwzRankItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    KfwzRankItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    KfwzRankItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    KfwzRankItem.prototype.onBtnClick = function (e) {
        var t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnReward:
                View_BoxReward_Show.show(t._curData.rewardList, "\u6392\u540D\u7B2C" + t._curData.rank + "\u53EF\u9886\u53D6");
                break;
        }
    };
    //>>>>end
    KfwzRankItem.URL = "ui://me1skowlpmqq78";
    return KfwzRankItem;
}(fairygui.GComponent));
__reflect(KfwzRankItem.prototype, "KfwzRankItem");
