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
var ViewShenJianGrid = (function (_super) {
    __extends(ViewShenJianGrid, _super);
    function ViewShenJianGrid() {
        var _this = _super.call(this) || this;
        _this._choose = false;
        _this._check = false;
        return _this;
    }
    ViewShenJianGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewBWGrid"));
    };
    ViewShenJianGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Object.defineProperty(ViewShenJianGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            var self = this;
            self._vo = vo;
            if (vo) {
                IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
                IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + vo.icon + ".png");
                self.imgIcon.visible = true;
                if (vo.starLv > 0) {
                    self.starGroup.visible = true;
                    self.sourceGroup.visible = false;
                    self.starLb.text = vo.starLv + "";
                }
                else {
                    self.starGroup.visible = false;
                    self.sourceGroup.visible = false;
                }
                if (vo.id == Model_ShenJian.shenJianId) {
                    self.weal = true;
                }
                else {
                    self.weal = false;
                }
                if (vo.starLv <= 0) {
                    self.sourceLb.text = vo.way;
                    self.maskBg.visible = true;
                }
                else {
                    self.maskBg.visible = false;
                }
                self.nameLb.text = vo.name;
                self.nameLb.color = Color.getColorInt(vo.quality);
            }
            else {
                self.imgIcon.visible = false;
                self.nameLb.text = "";
                self.starGroup.visible = false;
                self.sourceLb.visible = false;
                self.weal = false;
                IconUtil.setImg(self.bg, null);
                IconUtil.setImg(self.imgIcon, null);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewShenJianGrid.prototype.setSuitVo = function (v) {
        this.vo = v;
        this.choose = false;
        this.checkNotice = false;
    };
    Object.defineProperty(ViewShenJianGrid.prototype, "choose", {
        get: function () {
            return this._choose;
        },
        set: function (value) {
            this.selectImg.visible = value;
            this._choose = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewShenJianGrid.prototype, "weal", {
        set: function (value) {
            this.wearImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewShenJianGrid.prototype, "checkNotice", {
        get: function () {
            return this._check;
        },
        set: function (value) {
            this.noticeImg.visible = value;
            this._check = value;
        },
        enumerable: true,
        configurable: true
    });
    ViewShenJianGrid.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.imgIcon, null);
        self.choose = false;
        self.checkNotice = false;
    };
    ViewShenJianGrid.URL = "ui://3tzqotadn4tus";
    return ViewShenJianGrid;
}(fairygui.GComponent));
__reflect(ViewShenJianGrid.prototype, "ViewShenJianGrid");
