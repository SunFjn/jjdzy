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
var ViewBWGrid = (function (_super) {
    __extends(ViewBWGrid, _super);
    function ViewBWGrid() {
        var _this = _super.call(this) || this;
        _this.isShow = true;
        _this._choose = false;
        _this._check = false;
        return _this;
    }
    ViewBWGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewBWGrid"));
    };
    ViewBWGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
    };
    Object.defineProperty(ViewBWGrid.prototype, "vo", {
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
                    a.maskBg.visible = false;
                    a.starLb.text = vo.starLv + "";
                }
                else {
                    a.starGroup.visible = false;
                    a.maskBg.visible = true;
                    a.sourceGroup.visible = false;
                }
                if (a.isShow) {
                    if (vo.state == 0 || vo.state == 1) {
                        a.weal = true;
                    }
                    else {
                        a.weal = false;
                    }
                    if (vo.state == 2 || vo.state == 4) {
                        a.sourceLb.text = vo.way;
                        a.maskBg.visible = true;
                    }
                    else {
                        a.sourceLb.text = "";
                        a.maskBg.visible = false;
                    }
                }
                else {
                    a.weal = false;
                    a.maskBg.visible = false;
                    a.choose = false;
                }
                a.nameLb.text = vo.name;
                a.nameLb.color = Color.getColorInt(vo.quality);
            }
            else {
                IconUtil.setImg(a.bg, Enum_Path.ICON70_URL + "BmG_1.png");
                IconUtil.setImg(a.imgIcon, null);
                a.maskBg.visible = false;
                a.nameLb.text = "";
                a.starGroup.visible = false;
                a.sourceGroup.visible = false;
                a.weal = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewBWGrid.prototype.setSuitVo = function (v) {
        var a = this;
        a.vo = v;
        a.weal = false;
        a.checkNotice = false;
        a.choose = false;
    };
    Object.defineProperty(ViewBWGrid.prototype, "choose", {
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
    Object.defineProperty(ViewBWGrid.prototype, "weal", {
        set: function (value) {
            this.wearImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewBWGrid.prototype, "checkNotice", {
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
    ViewBWGrid.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.imgIcon, null);
    };
    ViewBWGrid.URL = "ui://3tzqotadn4tus";
    return ViewBWGrid;
}(fairygui.GComponent));
__reflect(ViewBWGrid.prototype, "ViewBWGrid");
