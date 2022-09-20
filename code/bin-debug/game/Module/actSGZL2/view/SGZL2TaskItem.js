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
 * @date: 2019-11-15 10:46:29
 */
var SGZL2TaskItem = (function (_super) {
    __extends(SGZL2TaskItem, _super);
    function SGZL2TaskItem() {
        return _super.call(this) || this;
    }
    SGZL2TaskItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComSgzl2", "SGZL2TaskItem"));
    };
    SGZL2TaskItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
    };
    //=========================================== API ==========================================
    SGZL2TaskItem.prototype.setData = function (pData) {
        this._curData = pData;
        if (pData) {
            var t_countStr = "";
            var t_color = Color.REDSTR;
            if (pData.curCount >= pData.cfg.canshu) {
                t_color = Color.GREENSTR;
            }
            t_countStr = ConfigHelp.reTxt(HtmlUtil.font("({0}/{1})", t_color), pData.curCount, pData.cfg.canshu);
            this.tfContent.text = pData.cfg.shuoming + " " + t_countStr;
            this.stateCtrl.selectedIndex = pData.state;
            this.itemList.numItems = pData.rewardList.length;
            if (pData.cfg.leixing == 1)
                this.btnGo.alpha = 0;
            else
                this.btnGo.alpha = 1;
            this.registerEvent(true);
        }
        else {
            this.registerEvent(false);
        }
    };
    SGZL2TaskItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    SGZL2TaskItem.prototype.clean = function () {
        this.registerEvent(false);
        this.itemList.numItems = 0;
    };
    //===================================== private method =====================================
    SGZL2TaskItem.prototype.onItemRender = function (pIndex, pItem) {
        if (!this._curData)
            return;
        var t_list = this._curData.rewardList;
        if (!t_list)
            return;
        pItem.setData(t_list[pIndex]);
    };
    SGZL2TaskItem.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        EventUtil.register(pFlag, this.btnGet, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    SGZL2TaskItem.prototype.onBtnClick = function (e) {
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case this.btnGo:
                //打开别的界面
                var t_openId = this._curData.cfg.tiaozhuan;
                if (t_openId == UIConst.CHONGZHI) {
                    //需要判断充值过没有，没有充值过的话，都是打开首充界面
                    ViewChongZhi.tryToOpenCZ();
                }
                else {
                    var t_cla = GGlobal.layerMgr.getClassById(t_openId);
                    if (t_cla == ViewActCom) {
                        //先关闭当前面板
                        GGlobal.layerMgr.close2(UIConst.ACTCOM);
                    }
                    GGlobal.layerMgr.open(t_openId);
                }
                break;
            case this.btnGet:
                GGlobal.modelSGZL2.cmdSendGetTaskReward(this._curData.taskId);
                break;
        }
    };
    //>>>>end
    SGZL2TaskItem.URL = "ui://ggwi8wepqhocf";
    return SGZL2TaskItem;
}(fairygui.GComponent));
__reflect(SGZL2TaskItem.prototype, "SGZL2TaskItem");
