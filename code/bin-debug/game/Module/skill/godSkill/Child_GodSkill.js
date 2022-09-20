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
var Child_GodSkill = (function (_super) {
    __extends(Child_GodSkill, _super);
    function Child_GodSkill() {
        var _this = _super.call(this) || this;
        //>>>>end
        _this.iconBtArr = [];
        _this.lvLbArr = [];
        return _this;
    }
    Child_GodSkill.createInstance = function () {
        return (fairygui.UIPackage.createObject("Skill", "Child_GodSkill"));
    };
    Child_GodSkill.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_GodSkill.prototype.openPanel = function (pData) {
        this.open();
    };
    Child_GodSkill.prototype.closePanel = function (pData) {
        this.close();
    };
    Child_GodSkill.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        for (var i = 0; i < 3; i++) {
            var iconBt0 = (self.getChild("iconBt" + i));
            iconBt0.data = i;
            var lvLb0 = (self.getChild("lvLb" + i));
            self.lvLbArr.push(lvLb0);
            self.iconBtArr.push(iconBt0);
        }
    };
    Child_GodSkill.prototype.iconHandler = function (event) {
        GGlobal.layerMgr.open(UIConst.GODSKILL_ZHENYAN, this.vo.zhenYanArr[event.target.data]);
    };
    Child_GodSkill.prototype.updateShow = function () {
        var self = this;
        var vo;
        var len = Model_player.voMine.skillList.length;
        for (var i = 0; i < len; i++) {
            if (Model_player.voMine.skillList[i].type == Model_Skill.TYPE3) {
                vo = Model_player.voMine.skillList[i];
                break;
            }
        }
        self.vo = vo;
        if (vo) {
            self.skillName.text = vo.name;
            self.skillDes.text = SkillUtil.getSkillDes(vo);
            for (var i = 0; i < 3; i++) {
                var skillId = vo.zhenYanArr[i];
                self.lvLbArr[i].text = skillId % 1000 + "";
                var cfg = Config.godskill_210[skillId];
                if (cfg.next > 0) {
                    var costArr = JSON.parse(cfg.consume);
                    var count = Model_Bag.getItemCount(costArr[0][1]);
                    self.iconBtArr[i].checkNotice = count >= costArr[0][2];
                }
                else {
                    self.iconBtArr[i].checkNotice = false;
                }
            }
            IconUtil.setImg(self.skillIcon, Enum_Path.SKILL_URL + vo.icon + ".png");
            IconUtil.setImg(self.nameImg, Enum_Path.SKILL_URL + "name_" + vo.icon + ".png");
            self.skillCon.text = "释放需要1000怒气，每次攻击怒气+10";
        }
    };
    Child_GodSkill.prototype.open = function () {
        var self = this;
        IconUtil.setImg(self.godSkillBack, Enum_Path.SKILL_URL + "bg.jpg");
        self.updateShow();
        GGlobal.reddot.listen(ReddotEvent.CHECK_GOD_SKILL, self.updateShow, self);
        for (var i = 0; i < 3; i++) {
            var iconBt0 = self.iconBtArr[i];
            iconBt0.addClickListener(self.iconHandler, self);
        }
    };
    Child_GodSkill.prototype.close = function () {
        var self = this;
        IconUtil.setImg(self.skillIcon, null);
        IconUtil.setImg(self.nameImg, null);
        IconUtil.setImg(self.godSkillBack, null);
        GGlobal.reddot.remove(ReddotEvent.CHECK_GOD_SKILL, self.updateShow, self);
        for (var i = 0; i < 3; i++) {
            var iconBt0 = self.iconBtArr[i];
            iconBt0.removeClickListener(self.iconHandler, self);
        }
    };
    Child_GodSkill.URL = "ui://c7onhgk8c14zn";
    return Child_GodSkill;
}(fairygui.GComponent));
__reflect(Child_GodSkill.prototype, "Child_GodSkill", ["IPanel"]);
