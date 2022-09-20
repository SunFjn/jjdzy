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
var VWuJiangSkillS = (function (_super) {
    __extends(VWuJiangSkillS, _super);
    function VWuJiangSkillS() {
        return _super.call(this) || this;
    }
    VWuJiangSkillS.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "VWuJiangSkillS"));
    };
    VWuJiangSkillS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    VWuJiangSkillS.prototype.setVo = function (value, index, level, params) {
        if (level === void 0) { level = 0; }
        this._vo = value;
        this._index = index;
        this._params = params;
        this._level = level;
        var skill = Config.skill_210[value];
        if (skill) {
            this.labName.text = skill.n;
            this.labName1.text = skill.n;
            ImageLoader.instance.loader(Enum_Path.SKILL_URL + skill.icon + ".png", this.imgIcon);
            this.imgIcon.visible = true;
            this.addClickListener(this.onClick, this);
        }
        else {
            this.labName.text = "";
            this.labName1.text = "";
            this.imgIcon.visible = false;
            this.removeClickListener(this.onClick, this);
        }
    };
    VWuJiangSkillS.prototype.onClick = function () {
        if (this._vo) {
            if (this._index == 4) {
                GGlobal.layerMgr.open(UIConst.TIANFU_SKILL_SHOW, { skillid: this._vo, level: this._level, id: this._params.id });
                return;
            }
            // GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_SKILLS, this._vo)
            var level = 0;
            var starLv = 0;
            var skillList = Model_player.voMine.skillList;
            var cfgids = JSON.parse(Config.hero_211[Model_player.voMine.job].attack);
            if (skillList[cfgids.length + this._index]) {
                level = skillList[cfgids.length + this._index].level;
            }
            var job = Config.skill_210[this._vo].job;
            if (Config.hero_211[job].godhero == 1) {
                if (!ModelGodWuJiang.getWuJiangIsActivation(job)) {
                    level = 1;
                }
                starLv = ModelGodWuJiang.wuJiangStar(job);
            }
            else {
                if (!Model_WuJiang.wuJiangStar[job]) {
                    level = 1;
                }
                starLv = Model_WuJiang.wuJiangStar[job];
            }
            var damage = 0;
            var shenjiangzhiliSkillLv = Model_WuJiang.shenjiangzhiliSkillLv[job] ? Model_WuJiang.shenjiangzhiliSkillLv[job] : 0;
            var godskillCfg = Config.herogodskill_211[job * 100 + shenjiangzhiliSkillLv];
            if (godskillCfg) {
                var arr = JSON.parse(godskillCfg.attpg);
                var len = arr.length;
                for (var i = 0; i < len; i++) {
                    if (arr[i][0] == this._vo) {
                        damage = arr[i][1];
                        break;
                    }
                }
            }
            GGlobal.layerMgr.open(UIConst.TIP_WUJIANG_SKILLSHOW, { value: this._vo, index: this._index, lv: level, job: job, starLv: starLv, type: 1, damage: damage });
        }
    };
    VWuJiangSkillS.prototype.dispose = function () {
        this.removeClickListener(this.onClick, this);
    };
    VWuJiangSkillS.URL = "ui://jvxpx9eml0xet";
    return VWuJiangSkillS;
}(fairygui.GComponent));
__reflect(VWuJiangSkillS.prototype, "VWuJiangSkillS");
