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
 * @date: 2019-10-30 17:33:51
 */
var XfytStepItem = (function (_super) {
    __extends(XfytStepItem, _super);
    function XfytStepItem() {
        return _super.call(this) || this;
    }
    XfytStepItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("xfyt", "XfytStepItem"));
    };
    XfytStepItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    XfytStepItem.prototype.setData = function (pData, pInit) {
        var t = this;
        var t_oldData = t._curData;
        t._curData = pData;
        if (pData) {
            if (pData.pos % 2 == 0) {
                t.bgCtrl.selectedIndex = 0;
            }
            else {
                t.bgCtrl.selectedIndex = 1;
            }
            t.imageStart.visible = false;
            t.imgIcon.visible = false;
            t.tfCount.visible = false;
            t.imgBig.visible = false;
            if (pData.pos == 1) {
                t.imageStart.visible = true;
            }
            else {
                if (pData.rewardItem) {
                    var t_showIcon = false;
                    if (pInit) {
                        if (!pData.hasGet) {
                            t_showIcon = true;
                        }
                        else {
                            t_showIcon = false;
                        }
                    }
                    else {
                        t_showIcon = true;
                    }
                    t.tfCount.visible = t.imgIcon.visible = t_showIcon;
                    t.imgBig.visible = pData.cfg.dj && t_showIcon ? true : false;
                    if (pData != t_oldData) {
                        IconUtil.setImg1(Enum_Path.ICON70_URL + pData.rewardItem.icon + ".png", t.imgIcon);
                    }
                    if (pData.rewardItem.count > 1) {
                        t.tfCount.text = ConfigHelp.getYiWanText(pData.rewardItem.count);
                    }
                    else {
                        t.tfCount.text = "";
                    }
                }
            }
            t.registerEvent(true);
        }
        else {
            t.registerEvent(false);
            IconUtil.setImg1(null, t.imgIcon);
        }
    };
    XfytStepItem.prototype.getData = function () {
        return this._curData;
    };
    XfytStepItem.prototype.hideItemIcon = function () {
        var t = this;
        t.imgBig.visible = t.imgIcon.visible = t.tfCount.visible = false;
    };
    XfytStepItem.prototype.clean = function () {
        var t = this;
        t.setData(null, false);
        _super.prototype.clean.call(this);
    };
    XfytStepItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    XfytStepItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.imgIcon, egret.TouchEvent.TOUCH_TAP, t.onIconClick, t);
    };
    //======================================== handler =========================================
    XfytStepItem.prototype.onIconClick = function (e) {
        var t = this;
        if (t._curData && t._curData.rewardItem) {
            FastAPI.showItemTips(t._curData.rewardItem);
        }
    };
    //>>>>end
    XfytStepItem.URL = "ui://n5noipr2vpqq6";
    return XfytStepItem;
}(fairygui.GComponent));
__reflect(XfytStepItem.prototype, "XfytStepItem");
