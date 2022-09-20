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
var YiShouEquipGrid = (function (_super) {
    __extends(YiShouEquipGrid, _super);
    function YiShouEquipGrid() {
        return _super.call(this) || this;
    }
    YiShouEquipGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "YiShouEquipGrid"));
    };
    YiShouEquipGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YiShouEquipGrid.prototype.setVo = function (vo, index) {
        if (index === void 0) { index = 0; }
        var self = this;
        self.vo = vo;
        if (vo) {
            self.setShowImg(true);
            var itemVo = VoItem.create(vo.cfg.daoju);
            IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + Math.floor(vo.color / 1000) + ".png");
            IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + itemVo.icon + ".png");
            if (index == 0) {
                var jie = Math.floor((vo.level % 1000) / 10);
                var lv = vo.level % 10;
                self.lbNum.text = jie + "阶" + lv + "级";
                self.colorBg.visible = self.colorLb.visible = false;
                self.lbNum.visible = self.levelBg.visible = true;
            }
            else {
                self.colorLb.text = "+" + vo.color % 100;
                self.colorBg.visible = self.colorLb.visible = true;
                self.lbNum.visible = self.levelBg.visible = false;
            }
            self.nameLb.text = vo.cfg.mingzi;
            self.nameLb.color = Color.getColorInt(Math.floor(vo.color / 1000));
        }
        else {
            self.setShowImg(false);
            IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_1.png");
        }
    };
    YiShouEquipGrid.prototype.checkNotice = function (value) {
        this.noticeImg.visible = value;
    };
    YiShouEquipGrid.prototype.setChoose = function (value) {
        this.selectImg.visible = value;
    };
    YiShouEquipGrid.prototype.setShowImg = function (value) {
        var self = this;
        self.showImg.visible = !value;
        self.dataGroup.visible = value;
    };
    YiShouEquipGrid.prototype.clean = function () {
        var self = this;
        self.selectImg.visible = false;
        self.vo = null;
        IconUtil.setImg(self.imgIcon, null);
        IconUtil.setImg(self.bg, null);
    };
    YiShouEquipGrid.URL = "ui://7y83phvnpz9kr";
    return YiShouEquipGrid;
}(fairygui.GComponent));
__reflect(YiShouEquipGrid.prototype, "YiShouEquipGrid");
