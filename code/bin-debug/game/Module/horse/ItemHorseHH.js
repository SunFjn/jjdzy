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
 * @date: 2020-03-25 19:06:33
 */
var ItemHorseHH = (function (_super) {
    __extends(ItemHorseHH, _super);
    function ItemHorseHH() {
        return _super.call(this) || this;
    }
    ItemHorseHH.createInstance = function () {
        return (fairygui.UIPackage.createObject("horse", "ItemHorseHH"));
    };
    ItemHorseHH.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    ItemHorseHH.prototype.setData = function (pData) {
        var t = this;
        t._curVo = pData;
        if (pData) {
            t.labName.text = HtmlUtil.font(pData.cfg.name, Color.getColorStr(pData.quality));
            IconUtil.setImg(t.imgIcon, Enum_Path.ICON70_URL + pData.cfg.icon + ".png");
            IconUtil.setImg(t.bg, Enum_Path.ICON70_URL + "BmG_" + pData.quality + ".png");
            t.maskBg.visible = !pData.isAct;
            t.boxBattle.visible = (pData.id == GGlobal.model_Horse.rideId);
            var t_jie = pData.jie;
            var t_ji = pData.ji;
            if (t_jie > 0 && t_ji > 0) {
                t.starLb.text = pData.jiejiStr;
            }
            else {
                t.starLb.text = "";
            }
            t.noticeImg.visible = pData.checkUpConditionHH(false) && pData.checkConsumeHH(false);
        }
        else {
            IconUtil.setImg(t.imgIcon, null);
            IconUtil.setImg(t.bg, null);
        }
    };
    ItemHorseHH.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    ItemHorseHH.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    ItemHorseHH.URL = "ui://7shc3kzddwb4u";
    return ItemHorseHH;
}(fairygui.GButton));
__reflect(ItemHorseHH.prototype, "ItemHorseHH");
