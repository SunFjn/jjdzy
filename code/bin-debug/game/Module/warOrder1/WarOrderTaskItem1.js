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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var WarOrderTaskItem1 = (function (_super) {
    __extends(WarOrderTaskItem1, _super);
    function WarOrderTaskItem1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WarOrderTaskItem1.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder1", "WarOrderTaskItem1"));
    };
    WarOrderTaskItem1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
    };
    //=========================================== API ==========================================
    WarOrderTaskItem1.prototype.setData = function (pData, actVo, type) {
        var t = this;
        t._curData = pData;
        t._curActVo = actVo;
        t._type = type;
        if (pData) {
            var t_countStr = "";
            var t_color = Color.REDSTR;
            if (pData.curCount >= pData.cfg.cs) {
                t_color = Color.GREENSTR;
            }
            t.tfContent.text = pData.cfg.name;
            t.tfCs.text = ConfigHelp.reTxt(HtmlUtil.font("({0}/{1})", t_color), pData.curCount, pData.cfg.cs);
            t.tfTitle.text = pData.cfg.title;
            t.stateCtrl.selectedIndex = pData.state;
            t.tfCt.text = "";
            IconUtil.setImg(t.img, Enum_Path.RYXZ_URL + pData.cfg.icon + ".png");
            t.itemList.numItems = pData.rewardList.length;
            t.registerEvent(true);
        }
        else {
            t.registerEvent(false);
        }
    };
    WarOrderTaskItem1.prototype.clean = function () {
        var t = this;
        _super.prototype.clean.call(this);
        t.registerEvent(false);
        t.itemList.numItems = 0;
        IconUtil.setImg(t.img, null);
    };
    //===================================== private method =====================================
    WarOrderTaskItem1.prototype.onItemRender = function (pIndex, pItem) {
        if (!this._curData)
            return;
        var t_list = this._curData.rewardList;
        if (!t_list)
            return;
        pItem.isShowEff = true;
        pItem.tipEnabled = true;
        pItem.vo = (t_list[pIndex]);
    };
    WarOrderTaskItem1.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    WarOrderTaskItem1.prototype.onBtnClick = function (e) {
        var t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                GGlobal.layerMgr.close(UIConst.WAR_ORDER1);
                GGlobal.layerMgr.close(UIConst.WAR_ORDER_HD1);
                GGlobal.layerMgr.open(t._curData.cfg.open);
                break;
            case t.btnGet:
                if (t._type == 1) {
                    GGlobal.modelWarOrder.CG12259(t._curData.type, t._curData.taskId, 0, t._curActVo.groupId);
                }
                else {
                    GGlobal.modelWarOrder.CG12255(t._curData.type, t._curData.taskId, 0, t._curActVo.groupId);
                }
                break;
        }
    };
    //>>>>end
    WarOrderTaskItem1.URL = "ui://89er3bo3e7lc3";
    return WarOrderTaskItem1;
}(fairygui.GComponent));
__reflect(WarOrderTaskItem1.prototype, "WarOrderTaskItem1");
