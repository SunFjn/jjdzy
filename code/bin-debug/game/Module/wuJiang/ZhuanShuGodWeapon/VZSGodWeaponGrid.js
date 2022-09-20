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
var VZSGodWeaponGrid = (function (_super) {
    __extends(VZSGodWeaponGrid, _super);
    function VZSGodWeaponGrid() {
        return _super.call(this) || this;
    }
    VZSGodWeaponGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "VZSGodWeaponGrid"));
    };
    VZSGodWeaponGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Object.defineProperty(VZSGodWeaponGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            var self = this;
            self._vo = v;
            self.labName.text = v.cfg.name;
            self.labName.color = Color.getColorInt(v.quality);
            self.imgBattle.visible = v.job == Model_player.voMine.job;
            if (v.starLv > 0) {
                self.starLb.text = v.starLv + "";
                self.starGroup.visible = true;
                self.maskBg.visible = false;
            }
            else {
                self.starGroup.visible = false;
                self.maskBg.visible = true;
            }
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.cfg.tupian + ".png", self.imgIcon);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + Model_WuJiang.getHeroQuality(v.wujiangVo) + ".png", self.bg);
        },
        enumerable: true,
        configurable: true
    });
    VZSGodWeaponGrid.prototype.setNot = function (value) {
        this.noticeImg.visible = value;
    };
    VZSGodWeaponGrid.prototype.setSuitVo = function (v) {
        var self = this;
        self.imgBattle.visible = false;
        self.noticeImg.visible = false;
        self._vo = v;
        self.labName.text = v.cfg.name;
        self.labName.color = Color.getColorInt(v.quality);
        if (v.starLv > 0) {
            self.starLb.text = v.starLv + "";
            self.starGroup.visible = true;
            self.maskBg.visible = false;
        }
        else {
            self.starGroup.visible = false;
            self.maskBg.visible = true;
        }
        var itemVo = ConfigHelp.makeItemListArr(v.costArr)[0];
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemVo.icon + ".png", self.imgIcon);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + itemVo.quality + ".png", self.bg);
    };
    VZSGodWeaponGrid.URL = "ui://zyx92gzwhi633y";
    return VZSGodWeaponGrid;
}(fairygui.GButton));
__reflect(VZSGodWeaponGrid.prototype, "VZSGodWeaponGrid");
