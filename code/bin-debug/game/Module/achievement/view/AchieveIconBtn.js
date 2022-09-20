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
 * @date: 2019-11-07 17:19:37
 */
var AchieveIconBtn = (function (_super) {
    __extends(AchieveIconBtn, _super);
    function AchieveIconBtn() {
        return _super.call(this) || this;
    }
    AchieveIconBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "AchieveIconBtn"));
    };
    AchieveIconBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    AchieveIconBtn.prototype.setData = function (pType) {
        var t = this;
        t._type = pType;
        if (pType) {
            var t_model = GGlobal.modelAchievement;
            t.registerEvent(true);
            t.icon = CommonManager.getUrl("rebirth", "icon_" + pType);
            var t_canGet = false;
            var t_chainList = t_model.getTaskChainListByType(pType);
            for (var _i = 0, t_chainList_1 = t_chainList; _i < t_chainList_1.length; _i++) {
                var vList = t_chainList_1[_i];
                for (var _a = 0, vList_1 = vList; _a < vList_1.length; _a++) {
                    var v = vList_1[_a];
                    if (v.isOpened && v.state == EnumAchievement.STATE_CAN_GET) {
                        t_canGet = true;
                        break;
                    }
                }
            }
            t.noticeImg.visible = t_canGet;
        }
        else {
            t.registerEvent(false);
        }
    };
    AchieveIconBtn.prototype.clean = function () {
        var t = this;
        t.setData(0);
        _super.prototype.clean.call(this);
    };
    AchieveIconBtn.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    AchieveIconBtn.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    AchieveIconBtn.URL = "ui://dllc71i9pke61x";
    return AchieveIconBtn;
}(fairygui.GButton));
__reflect(AchieveIconBtn.prototype, "AchieveIconBtn");
