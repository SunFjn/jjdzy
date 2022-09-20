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
var ChatWuJiangSkillS = (function (_super) {
    __extends(ChatWuJiangSkillS, _super);
    function ChatWuJiangSkillS() {
        return _super.call(this) || this;
    }
    ChatWuJiangSkillS.createInstance = function () {
        return (fairygui.UIPackage.createObject("chat", "ChatWuJiangSkillS"));
    };
    ChatWuJiangSkillS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.imgBg = (s.getChild("imgBg"));
        s.imgIcon = (s.getChild("imgIcon"));
        s.labName = (s.getChild("labName"));
    };
    ChatWuJiangSkillS.prototype.setVo = function (value, index, skillLv, job, starLv, params, damage) {
        if (damage === void 0) { damage = 0; }
        var s = this;
        s.skillID = value;
        s._index = index;
        s.level = skillLv;
        s.starLv = starLv;
        s.params = params;
        s.job = job;
        s.damage = damage;
        var skill = Config.skill_210[value];
        if (skill) {
            if (index == 4) {
                s.labName.text = skill.n + " Lv." + skillLv;
            }
            else {
                s.labName.text = skill.n;
            }
            ImageLoader.instance.loader(Enum_Path.SKILL_URL + skill.icon + ".png", s.imgIcon);
            s.imgIcon.visible = true;
            s.addClickListener(s.onClick, this);
        }
        else {
            s.labName.text = "";
            s.imgIcon.visible = false;
            s.removeClickListener(s.onClick, this);
        }
    };
    ChatWuJiangSkillS.prototype.onClick = function () {
        var s = this;
        if (s._index == 4) {
            GGlobal.layerMgr.open(UIConst.TIANFU_SKILL_SHOW, { level: s.level, skillid: s.skillID, id: s.params.id });
        }
        else {
            GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_SKILLSHOW, { value: s.skillID, index: s._index, lv: s.level, job: s.job, starLv: s.starLv, type: 3, damage: s.damage });
        }
    };
    ChatWuJiangSkillS.URL = "ui://fx4pr5qewjpa2c";
    return ChatWuJiangSkillS;
}(fairygui.GComponent));
__reflect(ChatWuJiangSkillS.prototype, "ChatWuJiangSkillS");
