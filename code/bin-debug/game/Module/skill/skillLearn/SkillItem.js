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
var SkillItem = (function (_super) {
    __extends(SkillItem, _super);
    function SkillItem() {
        var _this = _super.call(this) || this;
        /**1已满级 2技能等级超过角色等级3铜币不足*/
        _this.ret = 0;
        _this._choose = false;
        _this.check = false;
        return _this;
    }
    SkillItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Skill", "SkillItem"));
    };
    SkillItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.nameLb = (s.getChild("nameLb"));
        s.cdLb = (s.getChild("cdLb"));
        s.desLb = (s.getChild("desLb"));
        s.promptLb = (s.getChild("promptLb"));
        s.costItem = (s.getChild("costItem"));
        s.costItem.setImgUrl(Enum_Attr.TONGBI + "");
        s.levelLb = (s.getChild("levelLb"));
        s.skillIcon = (s.getChild("skillIcon"));
        s.upBt = (s.getChild("upBt"));
        s.showGroup = (s.getChild("showGroup"));
        s.selectImg = (s.getChild("selectImg"));
        s.noticeImg = (s.getChild("noticeImg"));
        // s.showGroup.visible = s.selectImg.visible = false;
        s.upBt.addClickListener(s.upHandle, this);
    };
    SkillItem.prototype.upHandle = function () {
        var s = this;
        var arr = ["", "已满级", "技能等级不能超过角色等级", "铜币不足"];
        if (s.ret == 3) {
            View_CaiLiao_GetPanel.show(VoItem.create(Enum_Attr.TONGBI));
        }
        else if (s.ret) {
            ViewCommonWarn.text(arr[s.ret]);
        }
        else if (s.checkNotice) {
            GGlobal.modelSkill.CG_UPGRADE_SKILL(s.vo.id);
        }
    };
    Object.defineProperty(SkillItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            var s = this;
            s._vo = vo;
            s.ret = 0;
            s.nameLb.text = vo.name;
            s.cdLb.text = "CD:" + (vo.cdms / 1000) + "秒";
            s.desLb.displayObject.wordWrap = true;
            var desContent = HtmlUtil.fontNoColor(SkillUtil.getSkillDes(vo, 2), 20);
            var desArr = desContent.split("+");
            var desResult = desArr[0] + "\n+" + desArr[1] + "+" + desArr[2];
            s.desLb.text = desResult;
            var level = vo.level;
            if (level <= 0) {
                level = 1;
                s.promptLb.text = vo.openguanqia + "关开启";
                s.promptLb.visible = true;
                s.costItem.visible = false;
                s.upBt.touchable = s.upBt.visible = false;
            }
            else {
                s.promptLb.visible = false;
                s.costItem.visible = true;
                s.upBt.touchable = s.upBt.visible = true;
            }
            s.levelLb.text = vo.level + "";
            ImageLoader.instance.loader(Enum_Path.SKILL_URL + vo.icon + ".png", s.skillIcon);
            var cost = Config.xiaohao_210[level].xiaohao;
            if (!Config.xiaohao_210[level + 1]) {
                s.costItem.setCount("已满级");
                s.checkNotice = false;
                s.ret = 1;
            }
            else {
                if (Model_player.voMine.tongbi >= cost) {
                    s.costItem.setCount(HtmlUtil.fontNoSize(cost + "", Color.getColorStr(2)));
                    // if (Model_player.voMine.level > vo.level) {
                    if (Model_LunHui.realLv > vo.level) {
                        s.checkNotice = true;
                    }
                    else {
                        s.ret = 2;
                        s.checkNotice = false;
                    }
                }
                else {
                    s.ret = 3;
                    s.costItem.setCount(HtmlUtil.fontNoSize(cost + "", Color.getColorStr(6)));
                    s.checkNotice = false;
                }
            }
            s.skillIcon.grayed = vo.level <= 0;
            if (vo.level <= 0)
                s.checkNotice = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillItem.prototype, "choose", {
        get: function () {
            return this._choose;
        },
        set: function (value) {
            var s = this;
            s._choose = value;
            s.selectImg.visible = value;
            // s.showGroup.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillItem.prototype, "checkNotice", {
        get: function () {
            return this.check;
        },
        set: function (value) {
            var s = this;
            s.noticeImg.visible = value;
            s.check = value;
        },
        enumerable: true,
        configurable: true
    });
    SkillItem.URL = "ui://c7onhgk8c14zj";
    return SkillItem;
}(fairygui.GComponent));
__reflect(SkillItem.prototype, "SkillItem");
