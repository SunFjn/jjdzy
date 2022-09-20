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
var JueXingGrid = (function (_super) {
    __extends(JueXingGrid, _super);
    function JueXingGrid() {
        var _this = _super.call(this) || this;
        _this._choose = false;
        _this._check = false;
        return _this;
    }
    JueXingGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("jueXing", "JueXingGrid"));
    };
    JueXingGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.bg = (this.getChild("bg"));
        this.imgIcon = (this.getChild("imgIcon"));
        this.starLb = (this.getChild("starLb"));
        this.starGroup = (this.getChild("starGroup"));
        this.nameLb = (this.getChild("nameLb"));
        this.selectImg = (this.getChild("selectImg"));
        this.noticeImg = (this.getChild("noticeImg"));
    };
    JueXingGrid.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
        if (vo.type == 1 || vo.type == 8) {
            IconUtil.setImg(self.imgIcon, Enum_Path.HEAD_URL + vo.icon + ".png");
        }
        else {
            IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + vo.icon + ".png");
        }
        self.imgIcon.visible = true;
        if (vo.starLv > 0) {
            self.starGroup.visible = true;
            self.starLb.text = vo.starLv + "";
        }
        else {
            self.starGroup.visible = false;
        }
        self.nameLb.text = vo.name;
        self.nameLb.color = Color.getColorInt(vo.quality);
    };
    Object.defineProperty(JueXingGrid.prototype, "choose", {
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
    Object.defineProperty(JueXingGrid.prototype, "checkNotice", {
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
    JueXingGrid.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.imgIcon, null);
    };
    JueXingGrid.URL = "ui://tbqdf7fdb8g16";
    return JueXingGrid;
}(fairygui.GComponent));
__reflect(JueXingGrid.prototype, "JueXingGrid");
