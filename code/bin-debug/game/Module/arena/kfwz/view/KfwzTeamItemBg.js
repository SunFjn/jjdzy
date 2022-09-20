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
 * @date: 2019-12-25 15:09:57
 */
var KfwzTeamItemBg = (function (_super) {
    __extends(KfwzTeamItemBg, _super);
    function KfwzTeamItemBg() {
        var _this = _super.call(this) || this;
        _this._posIndex = -1;
        return _this;
    }
    KfwzTeamItemBg.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "KfwzTeamItemBg"));
    };
    KfwzTeamItemBg.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    KfwzTeamItemBg.prototype.setPos = function (pPosIndex) {
        var t = this;
        t._posIndex = pPosIndex;
        t.tfPos.text = pPosIndex + 1 + "\u53F7";
    };
    KfwzTeamItemBg.prototype.setData = function (pData) {
        var t = this;
        var t_model = GGlobal.modelKfwz;
        t._curData = pData;
        if (pData) {
            t.visible = true;
        }
        else {
            t.visible = false;
        }
    };
    //>>>>end
    KfwzTeamItemBg.URL = "ui://me1skowlveix8g";
    return KfwzTeamItemBg;
}(fairygui.GComponent));
__reflect(KfwzTeamItemBg.prototype, "KfwzTeamItemBg");
