var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_ShaoZhu = (function () {
    function Vo_ShaoZhu() {
        this.bodyID = 0;
        this.skillLv = 0;
        this.bodyArr = [];
        /**被动技能数组 */
        this.skillData = {};
        this.shaozhuID = 0;
        this.starLv = 0;
        this.level = 1;
        this.exp = 0;
    }
    Vo_ShaoZhu.prototype.initcfg = function (id) {
        var self = this;
        self.shaozhuID = id;
        self.cfg = Config.son_267[id];
        self.initStarCfg(self.cfg.star);
        self.initQinMiCfg(1);
        for (var key in Config.sonshow_267) {
            var fashioncfg = Config.sonshow_267[key];
            if (fashioncfg.son == id) {
                var fashionVo = new ShaoZhuFashionVo();
                fashionVo.initcfg(fashioncfg);
                self.bodyArr.push(fashionVo);
            }
        }
    };
    Vo_ShaoZhu.prototype.initStarCfg = function (starId) {
        var self = this;
        self.starLv = starId % 100;
        this.starcfg = Config.sonstar_267[starId];
    };
    Vo_ShaoZhu.prototype.initQinMiCfg = function (level) {
        this.level = level;
        this.qinMiCfg = Config.sonqm_267[level];
    };
    Vo_ShaoZhu.prototype.dispose = function () {
        var ret = this;
        ret.exp = 0;
        ret.level = 0;
        ret.starLv = 0;
        ret.shaozhuID = 0;
        ret.cfg = null;
        ret.qinMiCfg = null;
        ret.starcfg = null;
        ret.bodyID = 0;
        ret.skillLv = 0;
        ret.bodyArr = [];
        ret.skillData = {};
        Pool.recover("Vo_Skill", ret);
    };
    Vo_ShaoZhu.create = function (id) {
        var vo = Pool.getItemByClass("Vo_ShaoZhu", Vo_ShaoZhu);
        vo.initcfg(id);
        return vo;
    };
    return Vo_ShaoZhu;
}());
__reflect(Vo_ShaoZhu.prototype, "Vo_ShaoZhu");
var ShaoZhuSkill = (function () {
    function ShaoZhuSkill() {
    }
    ShaoZhuSkill.prototype.initSkillCfg = function (value) {
        this.skillID = value;
        this.cfg = Config.sonskill_267[value];
    };
    return ShaoZhuSkill;
}());
__reflect(ShaoZhuSkill.prototype, "ShaoZhuSkill");
var ShaoZhuFashionVo = (function () {
    function ShaoZhuFashionVo() {
    }
    ShaoZhuFashionVo.prototype.initcfg = function (value) {
        var self = this;
        self.cfg = value;
        self.id = value.id;
        self.name = value.name;
        self.attr = JSON.parse(value.attr);
        self.conmuse = JSON.parse(value.conmuse);
        self.max = value.max;
        self.pz = value.pz;
        self.mod = value.mod;
        self.starLv = 0;
    };
    ShaoZhuFashionVo.prototype.getPower = function () {
        return ConfigHelp.powerFormulaArr(this.attr) * this.starLv;
    };
    return ShaoZhuFashionVo;
}());
__reflect(ShaoZhuFashionVo.prototype, "ShaoZhuFashionVo");
