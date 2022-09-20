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
 * @date: 2019-11-26 17:43:23
 */
var BzptBoxItem = (function (_super) {
    __extends(BzptBoxItem, _super);
    function BzptBoxItem() {
        var _this = _super.call(this) || this;
        _this._pos = 0;
        return _this;
    }
    BzptBoxItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actBzpt", "BzptBoxItem"));
    };
    BzptBoxItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    BzptBoxItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.stateCtrl.selectedIndex = pData.state;
            var t_color = Color.GREENSTR;
            switch (pData.state) {
                case 0:
                    t_color = Color.REDSTR;
                    t.showEff(false);
                    break;
                case 1:
                    t.showEff(true);
                    break;
                case 2:
                    t.showEff(false);
                    break;
            }
            t.tfScore.text = HtmlUtil.font(pData.curCount + "/" + pData.maxCount, t_color);
            if (pData.pos == 7)
                t.typeCtrl.selectedIndex = 1;
            else
                t.typeCtrl.selectedIndex = 0;
        }
        else {
            t.registerEvent(false);
            t.showEff(false);
        }
    };
    BzptBoxItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    BzptBoxItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    BzptBoxItem.prototype.showEff = function (pFlag) {
        var t = this;
        if (pFlag) {
            if (!t._mc) {
                t._mc = EffectMgr.addEff("uieff/10021", t.displayListContainer, t.width / 2, t.height / 2, 1000, -1, true);
                t._mc.refThis = t;
                t._mc.refKey = "_mc";
            }
        }
        else {
            if (t._mc) {
                EffectMgr.instance.removeEff(t._mc);
            }
        }
    };
    BzptBoxItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    };
    //======================================== handler =========================================
    BzptBoxItem.prototype.onClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelBzpt;
        switch (e.currentTarget) {
            case t:
                if (!t._curData)
                    return;
                GGlobal.layerMgr.open(UIConst.ACTCOM_BZPT_REWARD, t._curData);
                break;
        }
    };
    //>>>>end
    BzptBoxItem.URL = "ui://twm3bfygot2y9";
    return BzptBoxItem;
}(fairygui.GComponent));
__reflect(BzptBoxItem.prototype, "BzptBoxItem");
