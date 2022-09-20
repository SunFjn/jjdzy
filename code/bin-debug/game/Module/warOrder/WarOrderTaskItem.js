/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var WarOrderTaskItem = (function (_super) {
    __extends(WarOrderTaskItem, _super);
    function WarOrderTaskItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WarOrderTaskItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder", "WarOrderTaskItem"));
    };
    WarOrderTaskItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
    };
    //=========================================== API ==========================================
    WarOrderTaskItem.prototype.setData = function (pData, actVo, type) {
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
    WarOrderTaskItem.prototype.clean = function () {
        var t = this;
        _super.prototype.clean.call(this);
        t.registerEvent(false);
        t.itemList.numItems = 0;
        IconUtil.setImg(t.img, null);
    };
    //===================================== private method =====================================
    WarOrderTaskItem.prototype.onItemRender = function (pIndex, pItem) {
        if (!this._curData)
            return;
        var t_list = this._curData.rewardList;
        if (!t_list)
            return;
        pItem.isShowEff = true;
        pItem.tipEnabled = true;
        pItem.vo = (t_list[pIndex]);
    };
    WarOrderTaskItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    WarOrderTaskItem.prototype.onBtnClick = function (e) {
        var t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                GGlobal.layerMgr.close(UIConst.WAR_ORDER);
                GGlobal.layerMgr.close(UIConst.WAR_ORDER_HD);
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
    WarOrderTaskItem.pkg = "warOrder";
    //>>>>end
    WarOrderTaskItem.URL = "ui://5xptxudgp5ib5";
    return WarOrderTaskItem;
}(fairygui.GComponent));
__reflect(WarOrderTaskItem.prototype, "WarOrderTaskItem");
