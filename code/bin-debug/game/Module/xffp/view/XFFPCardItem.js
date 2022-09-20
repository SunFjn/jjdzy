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
 * 消费翻牌卡片组件
 * @author: lujiahao
 * @date: 2019-09-07 11:35:36
 */
var XFFPCardItem = (function (_super) {
    __extends(XFFPCardItem, _super);
    function XFFPCardItem() {
        var _this = _super.call(this) || this;
        _this.index = -1;
        return _this;
    }
    XFFPCardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("xffp", "XFFPCardItem"));
    };
    XFFPCardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    /**
     * 设置数据
     * @param pData
     * @param pPlayMc 是否播放动画，默认false不播放
     */
    XFFPCardItem.prototype.setData = function (pData, pPlayMc) {
        if (pPlayMc === void 0) { pPlayMc = false; }
        this.curVo = pData;
        if (pData) {
            this.item.isShowEff = true;
            this.item.tipEnabled = true;
            this.item.vo = pData.rewardList[0];
            if (pData.cfg.big)
                this.frontCtrl.selectedIndex = 1;
            else
                this.frontCtrl.selectedIndex = 0;
            if (pPlayMc) {
                this.playMc();
            }
            else {
                this.ctrlState.selectedIndex = 1;
            }
        }
        else {
            this.item.vo = null;
            this.resetState();
        }
    };
    //===================================== private method =====================================
    XFFPCardItem.prototype.playMc = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        this.ctrlState.selectedIndex = 0;
        this.scaleX = 1;
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 0 }, 150).call(function () {
            _this.ctrlState.selectedIndex = 1;
        }, this)
            .to({ scaleX: 1 }, 150).wait(100).call(function () {
            if (_this.curVo) {
                GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, _this.curVo.rewardList);
            }
        }, this);
    };
    XFFPCardItem.prototype.resetState = function () {
        egret.Tween.removeTweens(this);
        this.scaleX = 1;
        this.ctrlState.selectedIndex = 0;
        this.noticeImg.visible = false;
    };
    XFFPCardItem.prototype.registerEvent = function (pFlag) {
    };
    //======================================== handler =========================================
    XFFPCardItem.prototype.handleClick = function (e) {
        // this.playMc();
        if (this.index < 0)
            return;
        if (this.curVo) {
            //有数据则是已经翻过了
        }
        else {
            //无数据则是翻牌
            if (this.index > -1)
                GGlobal.modelXFFP.cmdSendFlopCard(this.index);
        }
    };
    //>>>>end
    XFFPCardItem.URL = "ui://791nthw5mej8g";
    return XFFPCardItem;
}(fairygui.GComponent));
__reflect(XFFPCardItem.prototype, "XFFPCardItem");
