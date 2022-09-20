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
var ViewYBGrid = (function (_super) {
    __extends(ViewYBGrid, _super);
    function ViewYBGrid() {
        var _this = _super.call(this) || this;
        _this.isShow = true;
        _this._choose = false;
        _this._check = false;
        return _this;
    }
    ViewYBGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewBWGrid"));
    };
    ViewYBGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
    };
    Object.defineProperty(ViewYBGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            var a = this;
            a._vo = vo;
            if (vo) {
                IconUtil.setImg(a.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
                IconUtil.setImg(a.imgIcon, Enum_Path.ICON70_URL + vo.icon + ".png");
                a.imgIcon.visible = true;
                if (vo.starLv > 0) {
                    a.starGroup.visible = true;
                    a.sourceGroup.visible = false;
                    a.starLb.text = vo.starLv + "";
                    a.maskBg.visible = false;
                }
                else {
                    a.starGroup.visible = false;
                    a.sourceLb.text = vo.way;
                    a.sourceGroup.visible = false;
                    a.maskBg.visible = true;
                }
                a.nameLb.text = vo.name;
                a.nameLb.color = Color.getColorInt(vo.quality);
            }
            else {
                a.imgIcon.visible = false;
                a.nameLb.text = "";
                a.starGroup.visible = false;
                a.sourceGroup.visible = false;
                IconUtil.setImg(a.bg, null);
                IconUtil.setImg(a.imgIcon, null);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewYBGrid.prototype.setSuitVo = function (v) {
        var a = this;
        a.vo = v;
        a.choose = false;
        a.checkNotice = false;
    };
    Object.defineProperty(ViewYBGrid.prototype, "choose", {
        get: function () {
            return this._choose;
        },
        set: function (value) {
            var a = this;
            a.selectImg.visible = value;
            a._choose = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewYBGrid.prototype, "checkNotice", {
        get: function () {
            return this._check;
        },
        set: function (value) {
            var a = this;
            a.noticeImg.visible = value;
            a._check = value;
        },
        enumerable: true,
        configurable: true
    });
    ViewYBGrid.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.imgIcon, null);
        self.choose = false;
        self.checkNotice = false;
    };
    ViewYBGrid.URL = "ui://3tzqotadn4tus";
    return ViewYBGrid;
}(fairygui.GComponent));
__reflect(ViewYBGrid.prototype, "ViewYBGrid");
