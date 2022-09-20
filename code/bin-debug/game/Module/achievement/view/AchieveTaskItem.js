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
 * @date: 2019-11-07 17:33:52
 */
var AchieveTaskItem = (function (_super) {
    __extends(AchieveTaskItem, _super);
    function AchieveTaskItem() {
        return _super.call(this) || this;
    }
    AchieveTaskItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "AchieveTaskItem"));
    };
    AchieveTaskItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    AchieveTaskItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.stateCtrl.selectedIndex = pData.state;
            t.btnGet.noticeImg.visible = (pData.state == EnumAchievement.STATE_CAN_GET);
            t.tfName.text = pData.cfg.bt;
            t.tfContent.text = pData.cfg.ms;
            t.pb.max = pData.cfg.cs1;
            t.pb.value = pData.count;
            t.item.isShowEff = true;
            t.item.tipEnabled = true;
            t.item.vo = pData.rewardList[0];
            t.resCom.setItemId(pData.rewardList[1].id);
            t.resCom.setCount(pData.rewardList[1].count);
        }
        else {
            t.registerEvent(false);
            t.item.vo = null;
        }
    };
    AchieveTaskItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    AchieveTaskItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    AchieveTaskItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    AchieveTaskItem.prototype.onBtnClick = function (e) {
        var t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                var t_openId = t._curData.cfg.open;
                var t_cla = GGlobal.layerMgr.getClassById(t_openId);
                if (t_cla == ViewRebirthPanel) {
                    //先关闭当前面板
                    GGlobal.layerMgr.close2(UIConst.ACHIEVEMENT);
                }
                GGlobal.layerMgr.open(t_openId);
                break;
            case t.btnGet:
                GGlobal.modelAchievement.CG_Achievement_getReward_10323(0, t._curData.id);
                break;
        }
    };
    //>>>>end
    AchieveTaskItem.URL = "ui://dllc71i9pke624";
    return AchieveTaskItem;
}(fairygui.GComponent));
__reflect(AchieveTaskItem.prototype, "AchieveTaskItem");
