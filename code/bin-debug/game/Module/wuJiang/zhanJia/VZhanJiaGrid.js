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
var VZhanJiaGrid = (function (_super) {
    __extends(VZhanJiaGrid, _super);
    function VZhanJiaGrid() {
        return _super.call(this) || this;
    }
    VZhanJiaGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewBWGrid"));
    };
    VZhanJiaGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Object.defineProperty(VZhanJiaGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            var self = this;
            self._vo = v;
            var quality = Model_ZhanJia.getZhanJiaQuality(v);
            var star = Model_ZhanJia.zhanjiaStar[v.id];
            if (star && star > 0) {
                self.starLb.text = star + "";
                self.starGroup.visible = true;
                self.maskBg.visible = false;
                self.sourceGroup.visible = false;
            }
            else {
                self.sourceLb.text = v.way;
                self.starGroup.visible = false;
                self.maskBg.visible = true;
                self.sourceGroup.visible = false;
            }
            self.nameLb.text = v.name;
            self.nameLb.color = Color.getColorInt(quality);
            IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + quality + ".png");
            IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + v.icon + ".png");
            self.noticeImg.visible = Model_ZhanJia.checkStarVo(v);
        },
        enumerable: true,
        configurable: true
    });
    VZhanJiaGrid.prototype.setSuitVo = function (v) {
        var self = this;
        self.vo = v;
        self.noticeImg.visible = false;
        self.selectImg.visible = false;
    };
    VZhanJiaGrid.prototype.setIdStar = function (id) {
        var v = Config.clothes_212[id];
        this.vo = v;
        this.noticeImg.visible = false;
    };
    VZhanJiaGrid.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.imgIcon, null);
        self.noticeImg.visible = false;
        self.selectImg.visible = false;
    };
    VZhanJiaGrid.URL = "ui://3tzqotadn4tus";
    return VZhanJiaGrid;
}(fairygui.GButton));
__reflect(VZhanJiaGrid.prototype, "VZhanJiaGrid");
