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
var VHorseGrid = (function (_super) {
    __extends(VHorseGrid, _super);
    function VHorseGrid() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    VHorseGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("horse", "VHorseGrid"));
    };
    VHorseGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    VHorseGrid.prototype.setVo = function (v, c1) {
        var s = this;
        s._vo = v;
        s.labName.text = HtmlUtil.fontNoSize(v.cfg.name, Color.getColorStr(v.quality));
        IconUtil.setImg(s.imgIcon, Enum_Path.ICON70_URL + v.cfg.icon + ".png");
        IconUtil.setImg(s.bg, Enum_Path.ICON70_URL + "BmG_" + v.quality + ".png");
        s.starLb.text = v.star + "";
        s.starGroup.visible = v.star > 0;
        s.maskBg.visible = !v.isAct;
        s.boxBattle.visible = (v.id == GGlobal.model_Horse.rideId);
        //红点
        s.checkNotice = GGlobal.reddot.checkCondition(UIConst.HORSE, v.id * 10 + c1);
    };
    Object.defineProperty(VHorseGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    VHorseGrid.prototype.clean = function () {
        _super.prototype.clean.call(this);
        IconUtil.setImg(this.imgIcon, null);
        IconUtil.setImg(this.bg, null);
    };
    Object.defineProperty(VHorseGrid.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            this._checkNotice = value;
            this.noticeImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    //>>>>end
    VHorseGrid.URL = "ui://7shc3kzdwa9jc";
    return VHorseGrid;
}(fairygui.GButton));
__reflect(VHorseGrid.prototype, "VHorseGrid");
