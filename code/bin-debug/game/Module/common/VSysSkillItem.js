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
var VSysSkillItem = (function (_super) {
    __extends(VSysSkillItem, _super);
    function VSysSkillItem() {
        return _super.call(this) || this;
    }
    VSysSkillItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "VSysSkillItem"));
    };
    VSysSkillItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.bg = (this.getChild("bg"));
        this.imgIcon = (this.getChild("imgIcon"));
        this.lbLevel = (this.getChild("lbLevel"));
        this.imgLocked = (this.getChild("imgLocked"));
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(VSysSkillItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            var type = v[0];
            var value = v[1];
            var cfg;
            if (type == Model_BySys.BING_FA) {
                cfg = Config.booklvskill_213;
            }
            else if (type == Model_BySys.YI_BAO) {
                cfg = Config.yblvskill_217;
            }
            else if (type == Model_BySys.SHEN_JIAN) {
                cfg = Config.swordlvskill_216;
            }
            else if (type == Model_BySys.BAO_WU) {
                cfg = Config.baolvskill_214;
            }
            else if (type == Model_BySys.TIAN_SHU) {
                cfg = Config.booklvskill_215;
            }
            else if (type == Model_BySys.ZHAN_JIA) {
                cfg = Config.clotheslvskill_212;
            }
            else if (type == Model_BySys.WU_JIANG) {
                cfg = Config.herolvskill_211;
            }
            var skill = cfg[value];
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", this.bg);
            this.lbLevel.text = "";
            if (skill) {
                if (skill.power == 0) {
                    this.imgLocked.visible = true;
                }
                else {
                    this.imgLocked.visible = false;
                }
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + skill.icon + ".png", this.imgIcon);
                this.imgIcon.visible = true;
                var level = skill.id % 1000;
                if (level > 0) {
                    this.lbLevel.text = "Lv." + level;
                }
                if (type == Model_BySys.BING_FA) {
                    this.noticeImg.visible = Model_BingFa.checkSkill(value);
                }
                else if (type == Model_BySys.YI_BAO) {
                    this.noticeImg.visible = Model_YiBao.checkSkill(value);
                }
                else if (type == Model_BySys.SHEN_JIAN) {
                    this.noticeImg.visible = Model_ShenJian.checkSkill(value);
                }
                else if (type == Model_BySys.BAO_WU) {
                    this.noticeImg.visible = Model_BaoWu.checkSkill(value);
                }
                else if (type == Model_BySys.TIAN_SHU) {
                    this.noticeImg.visible = Model_TianShu.checkSkill(value);
                }
                else if (type == Model_BySys.ZHAN_JIA) {
                    this.noticeImg.visible = Model_ZhanJia.checkSkill(value);
                }
                else if (type == Model_BySys.WU_JIANG) {
                    this.noticeImg.visible = Model_WuJiang.checkSkill(value);
                }
            }
            else {
                this.imgLocked.visible = true;
                this.imgIcon.visible = false;
                this.noticeImg.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    VSysSkillItem.URL = "ui://jvxpx9emdv773dn";
    return VSysSkillItem;
}(fairygui.GComponent));
__reflect(VSysSkillItem.prototype, "VSysSkillItem");
