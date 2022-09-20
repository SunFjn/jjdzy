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
 * 队伍列表项
 * @author: lujiahao
 * @date: 2019-12-13 18:25:14
 */
var KfwzTeamListItem = (function (_super) {
    __extends(KfwzTeamListItem, _super);
    function KfwzTeamListItem() {
        return _super.call(this) || this;
    }
    KfwzTeamListItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzTeamListItem"));
    };
    KfwzTeamListItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    KfwzTeamListItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.headCom.setData(pData);
        }
        else {
            t.registerEvent(false);
        }
    };
    KfwzTeamListItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    KfwzTeamListItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    KfwzTeamListItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnJoin, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    KfwzTeamListItem.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnJoin:
                if (t._curData) {
                    t_model.cmdSendJoinTeam(t._curData.teamId);
                }
                break;
        }
    };
    KfwzTeamListItem.URL = "ui://me1skowlp2gq84";
    return KfwzTeamListItem;
}(fairygui.GComponent));
__reflect(KfwzTeamListItem.prototype, "KfwzTeamListItem");
