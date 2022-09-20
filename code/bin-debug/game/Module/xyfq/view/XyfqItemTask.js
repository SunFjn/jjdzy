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
 * @date: 2020-04-09 10:17:14
 */
var XyfqItemTask = (function (_super) {
    __extends(XyfqItemTask, _super);
    function XyfqItemTask() {
        return _super.call(this) || this;
    }
    XyfqItemTask.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "XyfqItemTask"));
    };
    XyfqItemTask.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    };
    //=========================================== API ==========================================
    XyfqItemTask.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            var t_state = pData.state;
            t.stateCtrl.selectedIndex = t_state;
            t.itemList.numItems = pData.rewardList.length;
            t.btnGet.noticeImg.visible = (t_state == 1);
            t.tfName.text = "\u62BD\u7B7E" + pData.cfg.time + "\u6B21";
            t.itemList.scrollToView(0);
        }
        else {
            t.itemList.numItems = 0;
            t.registerEvent(false);
        }
    };
    XyfqItemTask.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    XyfqItemTask.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    XyfqItemTask.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._curData) {
            var t_list = t._curData.rewardList;
            if (t_list) {
                pItem.isShowEff = true;
                pItem.tipEnabled = true;
                pItem.vo = t_list[pIndex];
            }
        }
    };
    XyfqItemTask.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    XyfqItemTask.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        switch (e.currentTarget) {
            case t.btnGet:
                if (t._curData) {
                    t_model.CG_LuckSign_getTargetAward_12155(t._curData.type, t._curData.id);
                }
                break;
        }
    };
    //>>>>end
    XyfqItemTask.URL = "ui://7hwmix0gbnypr";
    return XyfqItemTask;
}(fairygui.GComponent));
__reflect(XyfqItemTask.prototype, "XyfqItemTask");
