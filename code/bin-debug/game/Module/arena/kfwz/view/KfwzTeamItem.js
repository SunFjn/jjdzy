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
 * @date: 2019-12-04 18:07:07
 */
var KfwzTeamItem = (function (_super) {
    __extends(KfwzTeamItem, _super);
    function KfwzTeamItem() {
        var _this = _super.call(this) || this;
        _this._posIndex = -1;
        return _this;
    }
    KfwzTeamItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzTeamItem"));
    };
    KfwzTeamItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    KfwzTeamItem.prototype.setPos = function (pPosIndex) {
        var t = this;
        t._posIndex = pPosIndex;
    };
    KfwzTeamItem.prototype.setData = function (pData) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t._curData = pData;
        t.draggable = t_model.areYouLeader;
        t.resetPos();
        if (pData) {
            var t_model_1 = GGlobal.modelKfwz;
            t.registerEvent(true);
            t.visible = true;
            if (pData.isLeader) {
                t.flagLeader.visible = true;
            }
            else {
                t.flagLeader.visible = false;
            }
            t.btnClose.visible = false;
            t.imageSelect.visible = false;
            if (t_model_1.areYouLeader) {
                t.btnClose.visible = true;
            }
            else {
            }
            if (pData.roleId == Model_player.voMine.id) {
                t.btnClose.visible = true;
                // t.imageSelect.visible = true;
            }
            t.headCom.setData(pData);
        }
        else {
            t.registerEvent(false);
            t.visible = false;
            t.headCom.setData(null);
        }
    };
    //===================================== private method =====================================
    KfwzTeamItem.prototype.resetPos = function () {
        var t = this;
        if (!t._initPos) {
            t._initPos = new egret.Point(t.x, t.y);
        }
        SimpleTimer.ins().removeTimer(t.resetPos, t);
        t.x = t._initPos.x;
        t.y = t._initPos.y;
    };
    KfwzTeamItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_DRAG_RESET_POS, t.onResetPos, t);
        EventUtil.register(pFlag, t.btnClose, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t, fairygui.DragEvent.DRAG_START, t.onDragStart, t);
        EventUtil.register(pFlag, t, fairygui.DragEvent.DRAG_END, t.onDragEnd, t);
        EventUtil.register(pFlag, t, fairygui.DropEvent.DROP, t.onDrop, t);
    };
    //======================================== handler =========================================
    KfwzTeamItem.prototype.onResetPos = function (pData) {
        var t = this;
        if (pData.posIndex == t._posIndex) {
            if (pData.result)
                SimpleTimer.ins().addTimer(t.resetPos, t, 300, 1);
            else
                t.resetPos();
        }
    };
    KfwzTeamItem.prototype.onDragStart = function (e) {
        var t = this;
        console.log("==== dragStart");
        if (e.currentTarget instanceof fairygui.GObject) {
            e.currentTarget.parent.addChildAt(e.currentTarget, e.currentTarget.parent.numChildren - 1);
        }
    };
    KfwzTeamItem.prototype.onDragEnd = function (e) {
        var t = this;
        if (t._curData && e.currentTarget instanceof fairygui.GObject) {
            var t_disCon = e.currentTarget.parent;
            var t_n = t_disCon.numChildren;
            for (var i = 0; i < t_n; i++) {
                var t_dis = t_disCon.getChildAt(i);
                if (t_dis && t_dis.visible && t_dis != e.currentTarget && t_dis.hasEventListener(fairygui.DropEvent.DROP) && t_dis.displayObject.hitTestPoint(e.stageX, e.stageY)) {
                    var dropEvt = new fairygui.DropEvent(fairygui.DropEvent.DROP, { posIndex: t._posIndex });
                    t_dis.requestFocus();
                    t_dis.dispatchEvent(dropEvt);
                    return;
                }
            }
        }
        t.resetPos();
        console.log("==== dragEnd");
    };
    KfwzTeamItem.prototype.onDrop = function (e) {
        console.log("==== drop");
        var t = this;
        var t_model = GGlobal.modelKfwz;
        var t_success = false;
        var t_sourceIndex = e.source["posIndex"];
        if (t_sourceIndex >= 0 && t._posIndex >= 0 && t._posIndex != t_sourceIndex) {
            t_success = t_model.CG_CrossTeamKing_exchange_10833(t_sourceIndex, t._posIndex);
        }
        GGlobal.control.notify(Enum_MsgType.KFWZ_DRAG_RESET_POS, { posIndex: t_sourceIndex, result: t_success });
    };
    KfwzTeamItem.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnClose:
                if (!t_model.isInTeam)
                    return;
                if (t_model.areYouLeader && t._curData.roleId != Model_player.voMine.id) {
                    t_model.CG_CrossTeamKing_moveMeber_10837(t._curData.posIndex); //队长踢人
                }
                else {
                    t_model.CG_CrossTeamKing_exitteam_10835(); //自己退出队伍
                }
                break;
        }
    };
    //>>>>end
    KfwzTeamItem.URL = "ui://me1skowln9yf74";
    return KfwzTeamItem;
}(fairygui.GComponent));
__reflect(KfwzTeamItem.prototype, "KfwzTeamItem");
