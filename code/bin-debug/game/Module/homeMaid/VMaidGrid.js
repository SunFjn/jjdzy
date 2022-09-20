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
var VMaidGrid = (function (_super) {
    __extends(VMaidGrid, _super);
    function VMaidGrid() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    VMaidGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeMaid", "VMaidGrid"));
    };
    VMaidGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    VMaidGrid.prototype.setVo = function (v, c1) {
        var s = this;
        s._vo = v;
        s.labName.text = HtmlUtil.fontNoSize(v.name, Color.getColorStr(v.quality));
        IconUtil.setImg(s.imgIcon, Enum_Path.ICON70_URL + v.cfg.touxiang + ".png");
        IconUtil.setImg(s.bg, Enum_Path.ICON70_URL + "BmG_" + v.quality + ".png");
        s.starLb.text = v.star + "";
        s.starGroup.visible = v.star > 0;
        s.maskBg.visible = !v.isAct;
        s.imgUse.visible = (v.id == GGlobal.model_HomeMaid.useId);
        //红点
        s.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_MAID, v.id * 10 + c1);
    };
    Object.defineProperty(VMaidGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    VMaidGrid.prototype.clean = function () {
        var s = this;
        IconUtil.setImg(s.bg, null);
        IconUtil.setImg(s.imgIcon, null);
    };
    Object.defineProperty(VMaidGrid.prototype, "checkNotice", {
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
    VMaidGrid.URL = "ui://qqn3a7vx137v6c";
    return VMaidGrid;
}(fairygui.GButton));
__reflect(VMaidGrid.prototype, "VMaidGrid");
