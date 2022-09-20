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
var VBaZTItem = (function (_super) {
    __extends(VBaZTItem, _super);
    function VBaZTItem() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    VBaZTItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "VBaZTItem"));
    };
    VBaZTItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    VBaZTItem.prototype.setVo = function (v) {
        this._vo = v;
        if (v && v.id != 0) {
            // this.labName.text = v.name
            // this.labName.color = Color.QUALITYCOLOR[v.pz];
            this.labName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
            ImageLoader.instance.loader(Enum_Path.BAZHENTU_URL + v.icon + ".png", this.imgIcon);
            this.imgIcon.visible = true;
            this.imgAdd.visible = false;
            this.imgName.visible = true;
            this.labNeed.text = "";
            this.checkNotice = (Model_BaZhenTu.canUpLevel(v) || Model_BaZhenTu.canUpStar(v) || Model_BaZhenTu.canUpPower(this.index - 1));
        }
        else {
            this.imgName.visible = false;
            this.imgIcon.visible = false;
            this.labName.text = "";
            if (Model_BaZhenTu.getIsLock(this.index)) {
                this.imgAdd.visible = false;
                var v_1 = Config.bzt_261[this.index];
                if (this.index > 8) {
                    this.labNeed.text = "符文\n" + v_1.fw + "级";
                    var cost = Number(JSON.parse(v_1.xh)[0][2]);
                    var red = (Model_BaZhenTu.getTotalLv() < v_1.fw) || (Model_player.voMine.yuanbao < cost);
                    this.labNeed.color = red ? Color.REDINT : Color.GREENINT;
                    this.checkNotice = !red;
                }
                else if (v_1.vip == 0) {
                    this.labNeed.text = v_1.lv + "级";
                    this.labNeed.color = Color.REDINT;
                    this.checkNotice = false;
                }
                else {
                    this.labNeed.text = v_1.lv + "级\n(VIP" + v_1.vip + ")";
                    this.labNeed.color = Color.REDINT;
                    this.checkNotice = false;
                }
            }
            else {
                this.imgAdd.visible = true;
                this.labNeed.text = "";
                this.checkNotice = Model_BaZhenTu.canWear(this.index - 1);
            }
        }
    };
    Object.defineProperty(VBaZTItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VBaZTItem.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            if (this._checkNotice != value) {
                this._checkNotice = value;
                this.noticeImg.visible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    VBaZTItem.URL = "ui://xrzn9ppaf8nk5";
    return VBaZTItem;
}(fairygui.GButton));
__reflect(VBaZTItem.prototype, "VBaZTItem");
