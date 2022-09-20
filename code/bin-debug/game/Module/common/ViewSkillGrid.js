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
var ViewSkillGrid = (function (_super) {
    __extends(ViewSkillGrid, _super);
    function ViewSkillGrid() {
        return _super.call(this) || this;
    }
    ViewSkillGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewSkillGrid"));
    };
    ViewSkillGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    /**
     * value 技能ID
     * index 技能类型
     * job 角色职业
     * skillLv 技能等级
     * starLv 技能/人物星级
     */
    ViewSkillGrid.prototype.setVo = function (value, job, skillLv, starLv, index, damage) {
        if (skillLv === void 0) { skillLv = 1; }
        if (starLv === void 0) { starLv = 1; }
        if (damage === void 0) { damage = 0; }
        var self = this;
        self.skillID = value;
        self.index = index;
        self.level = skillLv;
        self.starLv = starLv;
        self.job = job;
        self.damage = damage;
        var skill = Config.skill_210[value];
        if (skill) {
            self.labName.text = skill.n;
            IconUtil.setImg(self.imgIcon, Enum_Path.SKILL_URL + skill.icon + ".png");
            self.addClickListener(self.onClick, self);
        }
        else {
            self.labName.text = "";
            IconUtil.setImg(self.imgIcon, null);
            self.removeClickListener(self.onClick, self);
        }
    };
    ViewSkillGrid.prototype.onClick = function () {
        var s = this;
        GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_SKILLSHOW, { value: s.skillID, index: s.index, lv: s.level, job: s.job, starLv: s.starLv, type: 3, damage: s.damage });
    };
    ViewSkillGrid.prototype.clean = function () {
        var self = this;
        self.removeClickListener(self.onClick, self);
        IconUtil.setImg(self.imgIcon, null);
    };
    ViewSkillGrid.URL = "ui://jvxpx9emr3je3gj";
    return ViewSkillGrid;
}(fairygui.GComponent));
__reflect(ViewSkillGrid.prototype, "ViewSkillGrid");
