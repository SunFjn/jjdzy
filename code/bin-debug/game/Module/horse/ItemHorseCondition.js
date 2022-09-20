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
 * @date: 2020-03-26 11:30:58
 */
var ItemHorseCondition = (function (_super) {
    __extends(ItemHorseCondition, _super);
    function ItemHorseCondition() {
        return _super.call(this) || this;
    }
    ItemHorseCondition.createInstance = function () {
        return (fairygui.UIPackage.createObject("horse", "ItemHorseCondition"));
    };
    ItemHorseCondition.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    ItemHorseCondition.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            var t_model = GGlobal.model_Horse;
            var t_vo = t_model.getHorseVoById(~~pData[0]);
            var t_needStar = ~~pData[1];
            if (t_vo) {
                t.labName.text = HtmlUtil.font(t_vo.cfg.name, Color.getColorStr(t_vo.quality));
                IconUtil.setImg(t.imgIcon, Enum_Path.ICON70_URL + t_vo.cfg.icon + ".png");
                IconUtil.setImg(t.bg, Enum_Path.ICON70_URL + "BmG_" + t_vo.quality + ".png");
                var t_color = Color.REDSTR;
                if (t_vo.star >= t_needStar) {
                    t_color = Color.GREENSTR;
                }
                t.starLb.text = HtmlUtil.font(t_needStar + "", t_color);
            }
            t.registerEvent(true);
        }
        else {
            IconUtil.setImg(this.imgIcon, null);
            IconUtil.setImg(this.bg, null);
            t.registerEvent(false);
        }
    };
    ItemHorseCondition.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    ItemHorseCondition.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ItemHorseCondition.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    };
    //======================================== handler =========================================
    ItemHorseCondition.prototype.onClick = function (e) {
        var t = this;
        if (t._curData) {
            var t_model = GGlobal.model_Horse;
            var t_vo = t_model.getHorseVoById(~~t._curData[0]);
            if (t_vo)
                FastAPI.showItemTips(t_vo.cfg.icon);
        }
    };
    ItemHorseCondition.URL = "ui://7shc3kzddwb4v";
    return ItemHorseCondition;
}(fairygui.GButton));
__reflect(ItemHorseCondition.prototype, "ItemHorseCondition");
