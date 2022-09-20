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
var ViewCouSkillItem = (function (_super) {
    __extends(ViewCouSkillItem, _super);
    function ViewCouSkillItem() {
        return _super.call(this) || this;
    }
    ViewCouSkillItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "ViewCouSkillItem"));
    };
    ViewCouSkillItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
    };
    Object.defineProperty(ViewCouSkillItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            var cfgNext = Config.gjjn_748[v.cfg.next];
            if (v.cfg.attr != "0") {
                this.lbCurVal.text = ConfigHelp.attrString(JSON.parse(v.cfg.attr), "+");
                if (cfgNext) {
                    this.lbNextVal.text = ConfigHelp.attrString(JSON.parse(cfgNext.attr), "+", null, "#15f234");
                }
            }
            else if (v.cfg.zxjy != "0" || (cfgNext && cfgNext.zxjy != "0")) {
                this.lbCurVal.text = "离线经验+" + v.cfg.lxjy;
                if (cfgNext) {
                    this.lbNextVal.text = HtmlUtil.fontNoSize("离线经验+" + cfgNext.lxjy, "#15f234");
                }
            }
            else {
                this.lbCurVal.text = "离线铜钱+" + v.cfg.lxtq;
                if (cfgNext) {
                    this.lbNextVal.text = HtmlUtil.fontNoSize("离线铜钱+" + cfgNext.lxtq, "#15f234");
                }
            }
            if (!cfgNext) {
                this.lbNext.text = "已满级";
                this.lbNextVal.text = "";
            }
            else {
                this.lbNext.text = "下级效果";
            }
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.cfg.icon + ".png", this.imgIcon);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + 5 + ".png", this.bg);
            ImageLoader.instance.loader(Enum_Path.PIC_URL + v.cfg.tupianzi + ".png", this.imgName);
            var lv = v.skillId % 1000;
            this.lbLevel.text = "Lv." + lv;
            this.imgLocked.visible = lv == 0;
            this.lbLevel.visible = lv > 0;
            this.noticeImg.visible = GGlobal.modelCouSkill.checkRedVo(v.skillId);
        },
        enumerable: true,
        configurable: true
    });
    ViewCouSkillItem.URL = "ui://uwzc58njdr4r6d";
    return ViewCouSkillItem;
}(fairygui.GButton));
__reflect(ViewCouSkillItem.prototype, "ViewCouSkillItem");
