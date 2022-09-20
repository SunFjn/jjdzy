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
 * @date: 2019-12-11 11:04:27
 */
var KfwzLogItem = (function (_super) {
    __extends(KfwzLogItem, _super);
    function KfwzLogItem() {
        return _super.call(this) || this;
    }
    KfwzLogItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzLogItem"));
    };
    KfwzLogItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.list1.itemRenderer = t.onItemRender1;
        t.list1.callbackThisObj = t;
        t.list2.itemRenderer = t.onItemRender2;
        t.list2.callbackThisObj = t;
    };
    //=========================================== API ==========================================
    KfwzLogItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            if (pData.isFold)
                t.typeCtrl.selectedIndex = 0;
            else
                t.typeCtrl.selectedIndex = 1;
            t.resultCtrl.selectedIndex = pData.result;
            var t_enemyLeaderName = pData.enemyLeaderName;
            switch (pData.result) {
                case 1://胜
                    t.tfContent.text = "\u4F60\u7684\u961F\u4F0D\u6218\u80DC\u4E86<font color='#469ff2'>" + t_enemyLeaderName + "</font>\u7B49\u4EBA\uFF0C\u83B7\u5F97<font color='#469ff2'>" + pData.score + "</font>\u79EF\u5206";
                    break;
                case 2://负
                    t.tfContent.text = "\u4F60\u7684\u961F\u4F0D\u4E0D\u654C<font color='#469ff2'>" + t_enemyLeaderName + "</font>\u7B49\u4EBA\uFF0C\u83B7\u5F97<font color='#469ff2'>" + pData.score + "</font>\u79EF\u5206";
                    break;
            }
            t.list1.numItems = t._curData.myTeamList.length;
            t.list2.numItems = t._curData.enemyTeamList.length;
        }
        else {
            t.registerEvent(false);
        }
    };
    KfwzLogItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    KfwzLogItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    KfwzLogItem.prototype.onItemRender1 = function (pIndex, pItem) {
        var t = this;
        if (t._curData) {
            pItem.setData(t._curData.myTeamList[pIndex]);
        }
    };
    KfwzLogItem.prototype.onItemRender2 = function (pIndex, pItem) {
        var t = this;
        if (t._curData) {
            pItem.setData(t._curData.enemyTeamList[pIndex]);
        }
    };
    KfwzLogItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        // EventUtil.register(pFlag, t.btnShow, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        // EventUtil.register(pFlag, t.btnHide, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    KfwzLogItem.prototype.onBtnClick = function (e) {
        var t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnShow:
                t._curData.isFold = false;
                GGlobal.control.notify(Enum_MsgType.KFWZ_LOG_CHANGE_SIZE);
                break;
            case t.btnHide:
                t._curData.isFold = true;
                GGlobal.control.notify(Enum_MsgType.KFWZ_LOG_CHANGE_SIZE);
                break;
            case t:
                t._curData.isFold = !t._curData.isFold;
                GGlobal.control.notify(Enum_MsgType.KFWZ_LOG_CHANGE_SIZE);
                break;
        }
    };
    //>>>>end
    KfwzLogItem.URL = "ui://me1skowls0r57n";
    return KfwzLogItem;
}(fairygui.GComponent));
__reflect(KfwzLogItem.prototype, "KfwzLogItem");
