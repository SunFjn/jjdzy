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
 * @date: 2019-09-12 11:15:15
 */
var XiandingItem = (function (_super) {
    __extends(XiandingItem, _super);
    function XiandingItem() {
        return _super.call(this) || this;
    }
    XiandingItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComXianding", "XiandingItem"));
    };
    XiandingItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    XiandingItem.prototype.setData = function (pData) {
        this._curData = pData;
        if (pData) {
            var t_countStr = "";
            var t_color = Color.REDSTR;
            if (pData.curCount >= pData.cfg.cs) {
                t_color = Color.GREENSTR;
            }
            t_countStr = ConfigHelp.reTxt(HtmlUtil.font("({0}/{1})", t_color), pData.curCount, pData.cfg.cs);
            this.tfContent.text = pData.cfg.ms + " " + t_countStr;
            this.tfScore.text = ConfigHelp.reTxt("活跃度+{0}", pData.cfg.hy);
            var t_reward = pData.rewardList[0];
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + t_reward.icon + ".png", this.imageIcon);
            this.tfValue.text = t_reward.count + "";
            EventUtil.register(true, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
            this.stateCtrl.selectedIndex = pData.state;
            if (pData.state == Enum_Xianding.TASK_STATE_CAN_GET)
                this.btnGet.noticeImg.visible = true;
            else
                this.btnGet.noticeImg.visible = false;
            this.registerEvent(true);
        }
        else {
            this.registerEvent(false);
        }
    };
    XiandingItem.prototype.dispose = function () {
        this.registerEvent(false);
        EventUtil.register(false, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    XiandingItem.prototype.onIconClick = function (e) {
        if (this._curData) {
            FastAPI.showItemTips(this._curData.rewardList[0]);
        }
    };
    XiandingItem.prototype.registerEvent = function (pFlag) {
        EventUtil.register(pFlag, this.btnGo, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        EventUtil.register(pFlag, this.btnGet, egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    //======================================== handler =========================================
    XiandingItem.prototype.onBtnClick = function (e) {
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case this.btnGo:
                //打开别的界面
                var t_openId = this._curData.cfg.open;
                if (this._curData.cfg.rwlx == 13) {
                    //需要判断充值过没有，没有充值过的话，都是打开首充界面
                    // if (this._curData.curCount <= 0) {
                    //     t_openId = UIConst.SHOUCHONG;
                    // }
                    ViewChongZhi.tryToOpenCZ();
                }
                else {
                    GGlobal.layerMgr.open(t_openId);
                }
                break;
            case this.btnGet:
                GGlobal.modelXianding.cmdSendGetTaskReward(this._curData.id);
                break;
        }
    };
    //>>>>end
    XiandingItem.URL = "ui://s98a5pruoz6c4";
    return XiandingItem;
}(fairygui.GComponent));
__reflect(XiandingItem.prototype, "XiandingItem");
