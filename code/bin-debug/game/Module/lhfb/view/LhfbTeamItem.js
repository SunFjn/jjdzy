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
 * @date: 2020-02-28 22:56:37
 */
var LhfbTeamItem = (function (_super) {
    __extends(LhfbTeamItem, _super);
    function LhfbTeamItem() {
        return _super.call(this) || this;
    }
    LhfbTeamItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "LhfbTeamItem"));
    };
    LhfbTeamItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    LhfbTeamItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.visible = true;
            t.registerEvent(true);
            var t_model = GGlobal.modelLhfb;
            if (pData.isLeader) {
                t.leaderImg.visible = true;
            }
            else {
                t.leaderImg.visible = false;
            }
            var t_lunhuiStr = "(" + ConfigHelp.NumberToChinese(pData.lunhuiId) + "\u4E16\u8F6E\u56DE)";
            t.tfLevel.text = "Lv." + pData.level + t_lunhuiStr;
            t.tfPower.text = "\u6218\u529B\uFF1A" + ConfigHelp.getYiWanText(pData.power);
            t.btnExit.visible = false;
            if (t_model.areYouLeader) {
                t.btnExit.visible = true;
            }
            else {
            }
            if (pData.roleId == Model_player.voMine.id) {
                t.btnExit.visible = true;
            }
            var t_name = pData.name;
            if (pData.roleId == Model_player.voMine.id) {
                t_name = HtmlUtil.font(pData.name, Color.GREENSTR);
            }
            t.headCom.setdata(pData.head, pData.level, t_name, -1, false, pData.headGrid);
        }
        else {
            t.visible = false;
            t.registerEvent(false);
        }
    };
    LhfbTeamItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    LhfbTeamItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    LhfbTeamItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnExit, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    LhfbTeamItem.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        switch (e.currentTarget) {
            case t.btnExit:
                if (!t_model.isInTeam || !t._curData)
                    return;
                if (t_model.areYouLeader && t._curData.roleId != Model_player.voMine.id) {
                    //队长踢人
                    t_model.CG_RebornFB_moveMeber_11875(t._curData.roleId);
                }
                else {
                    //自己退出队伍
                    t_model.cmdSendExitTeam(true);
                }
                break;
        }
    };
    //>>>>end
    LhfbTeamItem.URL = "ui://3o8q23uuokqy1m";
    return LhfbTeamItem;
}(fairygui.GComponent));
__reflect(LhfbTeamItem.prototype, "LhfbTeamItem");
