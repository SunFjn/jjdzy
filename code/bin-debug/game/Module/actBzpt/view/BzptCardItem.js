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
 * @date: 2019-11-26 19:40:14
 */
var BzptCardItem = (function (_super) {
    __extends(BzptCardItem, _super);
    function BzptCardItem() {
        return _super.call(this) || this;
    }
    BzptCardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actBzpt", "BzptCardItem"));
    };
    BzptCardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.tfContent.wordWrap = true;
    };
    //=========================================== API ==========================================
    BzptCardItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.skewY = 0;
            t.stateCtrl.selectedIndex = pData.state;
            var t_color = Color.GREENSTR;
            if (pData.count < pData.cfg.cs)
                t_color = Color.REDSTR;
            t.tfContent.text = pData.cfg.sm + "\n<font color='" + t_color + "'>(" + pData.count + "/" + pData.cfg.cs + ")</font>";
        }
        else {
            t.registerEvent(false);
        }
    };
    BzptCardItem.prototype.playMc = function (pComplete, pCall) {
        var t = this;
        egret.Tween.removeTweens(t);
        t.skewY = 0;
        var tw = egret.Tween.get(t);
        tw.to({ skewY: -90 }, 250).call(function () {
            t.stateCtrl.selectedIndex = 2;
            if (pComplete) {
                pComplete.apply(pCall);
            }
        });
    };
    //===================================== private method =====================================
    BzptCardItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    };
    //======================================== handler =========================================
    BzptCardItem.prototype.onClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelBzpt;
        switch (e.currentTarget) {
            case t:
                if (!t._curData)
                    return;
                switch (t._curData.state) {
                    case 0://前往
                        var t_openId = t._curData.cfg.tz;
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
                    case 1://领取
                        t_model.CG_BaoZangPinTu_activate_10651(t._curData.id);
                        break;
                }
                break;
        }
    };
    //>>>>end
    BzptCardItem.URL = "ui://twm3bfyglplob";
    return BzptCardItem;
}(fairygui.GComponent));
__reflect(BzptCardItem.prototype, "BzptCardItem");
