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
 * @date: 2019-09-30 16:10:36
 */
var QxzlTaskItem = (function (_super) {
    __extends(QxzlTaskItem, _super);
    function QxzlTaskItem() {
        return _super.call(this) || this;
    }
    QxzlTaskItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlTaskItem"));
    };
    QxzlTaskItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.itemList1.itemRenderer = this.onItemRender;
        this.itemList1.callbackThisObj = this;
        this.itemList1.setVirtual();
    };
    //=========================================== API ==========================================
    QxzlTaskItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            var t_strName = pData.cfg.name;
            var t_color = Color.REDSTR;
            if (pData.count >= pData.cfg.cs) {
                t_color = Color.GREENSTR;
            }
            var t_strCount = HtmlUtil.font(ConfigHelp.reTxt("({0}/{1})", pData.count, pData.cfg.cs), t_color);
            if (t._curData.cfg.type == 3) {
                t.tfName.text = t_strName + "\n" + "(12-14点领取)";
            }
            else {
                t.tfName.text = t_strName + "\n" + t_strCount;
            }
            t.itemList1.numItems = pData.rewardList.length;
            t.stateCtrl.selectedIndex = pData.state;
            t.registerEvent(true);
        }
        else {
            t.registerEvent(false);
            t.itemList1.numItems = 0;
        }
    };
    QxzlTaskItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    //===================================== private method =====================================
    QxzlTaskItem.prototype.onItemRender = function (pIndex, pItem) {
        if (this._curData && this._curData.rewardList) {
            var t_list = this._curData.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    QxzlTaskItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    QxzlTaskItem.prototype.onBtnClick = function (e) {
        var t = this;
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                //TODO
                break;
            case t.btnGet:
                GGlobal.modelQxzl.CG_QunXiongZhuLu_getTaskReward_8963(this._curData.id);
                break;
        }
    };
    //>>>>end
    QxzlTaskItem.URL = "ui://6d8dzzdgrak314";
    return QxzlTaskItem;
}(fairygui.GComponent));
__reflect(QxzlTaskItem.prototype, "QxzlTaskItem");
