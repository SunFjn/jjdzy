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
 * @date: 2019-10-31 21:12:34
 */
var BallloonItem = (function (_super) {
    __extends(BallloonItem, _super);
    function BallloonItem() {
        var _this = _super.call(this) || this;
        _this.indexId = 0;
        return _this;
    }
    BallloonItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("balloon", "BallloonItem"));
    };
    BallloonItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    BallloonItem.prototype.setData = function (pData, pPlayMc) {
        if (pPlayMc === void 0) { pPlayMc = false; }
        var t = this;
        t.curVo = pData;
        if (pData) {
            var t_hasItem = false;
            if (pData.rewardItem) {
                t.item.isShowEff = true;
                t.item.tipEnabled = true;
                t.item.vo = pData.rewardItem;
                t.stateCtrl.selectedIndex = 1;
                t_hasItem = true;
            }
            else {
                t.item.vo = null;
                t.stateCtrl.selectedIndex = 0;
            }
            if (pPlayMc) {
                t.playMc();
            }
            else {
                t.imgFlash.visible = false;
                t.item.visible = t_hasItem;
            }
        }
        else {
            t.item.vo = null;
            t.resetState();
        }
    };
    //===================================== private method =====================================
    BallloonItem.prototype.playMc = function () {
        var t = this;
        egret.Tween.removeTweens(t.imgFlash);
        var tw = egret.Tween.get(t.imgFlash);
        t.item.visible = false;
        t.imgFlash.visible = true;
        t.imgFlash.alpha = 1;
        tw.to({ alpha: 0 }, 100)
            .to({ alpha: 1 }, 100)
            .to({ alpha: 0 }, 100)
            .call(function () {
            t.imgFlash.visible = false;
            t.item.visible = true;
        }, t);
    };
    BallloonItem.prototype.resetState = function () {
        var t = this;
        egret.Tween.removeTweens(t.imgFlash);
        t.imgFlash.visible = false;
        t.stateCtrl.selectedIndex = 0;
        t.noticeImg.visible = false;
    };
    //======================================== handler =========================================
    BallloonItem.prototype.handleClick = function (e) {
        var t = this;
        if (t.indexId <= 0)
            return;
        if (!t.curVo)
            return;
        if (t.curVo.rewardItem) {
            //有物品数据则是已经翻过了
        }
        else {
            //无物品数据则可以翻牌
            // t.stateCtrl.selectedIndex = 1;
            // t.playMc();
            GGlobal.modelBalloon.CG_PlayBalloon_shooting_10001(t.indexId);
        }
    };
    //>>>>end
    BallloonItem.URL = "ui://i1mp7ufxwuwj6";
    return BallloonItem;
}(fairygui.GComponent));
__reflect(BallloonItem.prototype, "BallloonItem");
