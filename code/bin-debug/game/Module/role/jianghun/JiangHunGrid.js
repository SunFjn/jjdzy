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
var JiangHunGrid = (function (_super) {
    __extends(JiangHunGrid, _super);
    function JiangHunGrid() {
        return _super.call(this) || this;
    }
    JiangHunGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "JiangHunGrid"));
    };
    JiangHunGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Object.defineProperty(JiangHunGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            var self = this;
            self._vo = vo;
            if (vo) {
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", self.bg);
                self.iconImg.visible = true;
                self.nameLv.visible = true;
                if (vo.isJiHuo) {
                    IconUtil.setImg(self.iconImg, Enum_Path.GENERAL_URL + vo.pic + ".jpg");
                    self.maskImg.visible = false;
                    self.nameLv.text = vo.name + "\nLv." + vo.level;
                    self.nameLv.color = Color.getColorInt(vo.quality);
                    self.lockImg.visible = false;
                    if (vo.level > 0) {
                        if (vo.next > 0 && vo.exp + Model_player.voMine.hunhuo >= vo.consumeArr[0][2]) {
                            self.checkNotice = true;
                        }
                        else {
                            self.checkNotice = false;
                        }
                    }
                }
                else {
                    self.checkNotice = false;
                    self.maskImg.visible = true;
                    if (Model_JiangHun.openIndex == 0) {
                        IconUtil.setImg(self.iconImg, Enum_Path.GENERAL_URL + vo.pic + ".jpg");
                        self.nameLv.text = vo.name;
                        self.nameLv.color = 0x666666;
                        self.lockImg.visible = false;
                    }
                    else {
                        self.iconImg.visible = false;
                        self.nameLv.visible = false;
                        self.lockImg.visible = true;
                    }
                }
            }
            else {
                self.checkNotice = false;
                self.iconImg.visible = false;
                self.lockImg.visible = true;
                IconUtil.setImg(self.iconImg, null);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JiangHunGrid.prototype, "vo1", {
        set: function (vo) {
            var self = this;
            self._vo = vo;
            if (vo) {
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", self.bg);
                self.iconImg.visible = true;
                IconUtil.setImg(self.iconImg, Enum_Path.GENERAL_URL + vo.pic + ".jpg");
                self.nameLv.visible = false;
                self.lockImg.visible = false;
                self.checkNotice = false;
                self.maskImg.visible = false;
            }
            else {
                IconUtil.setImg(self.iconImg, null);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JiangHunGrid.prototype, "checkNotice", {
        set: function (value) {
            this.noticeImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    JiangHunGrid.URL = "ui://3tzqotadk8ozf";
    return JiangHunGrid;
}(fairygui.GComponent));
__reflect(JiangHunGrid.prototype, "JiangHunGrid");
