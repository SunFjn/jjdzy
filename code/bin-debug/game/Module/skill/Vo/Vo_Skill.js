var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Skill = (function () {
    function Vo_Skill() {
        /**是否需要回收*/ this.autoRemove = 0;
        /**技能ID*/ this.id = 0;
        /**等级 */ this.level = 0;
        /**技能类别*/ this.type = 1;
        /**冷却时间(毫秒)*/ this.cdms = 0;
        /**冷却剩余时间*/ this.remaincd = 0;
        /**多段攻击次数*/ this.duoduan = 0;
        /**图标id 读取cfg.icon*/ this.icon = null;
        /**固定威力(技能等级) */ this.power_lv = 0;
        /**攻击力十万分比威力(武将星级或宝物星级) */ this.powerAtt_lv = 0;
        /**技能战力 */ this.skill_power = 0;
        /**开启关卡需求*/ this.openguanqia = 0;
        /**神技阵眼ID保存*/ this.zhenYanArr = [1000, 2000, 3000];
        /**武将星级或宝物星级*/ this.starLv = 0;
        /**s神兵专属加成*/ this.godWeaponPer = 0;
        /**buffID*/ this.buff = 0;
        /**技能加成*/ this.skillPer = 0;
    }
    /** create
     * @id skillid
     * @level 技能等级
     * @starLv 技能等级或武将星级宝物星级
     * per 专属加成
     */
    Vo_Skill.create = function (id, level, starLv, per, autoRemove, damage) {
        if (per === void 0) { per = 0; }
        if (autoRemove === void 0) { autoRemove = 0; }
        if (damage === void 0) { damage = 0; }
        var ret = Pool.getItemByClass("Vo_Skill", Vo_Skill);
        // ret.autoRemove = autoRemove;
        ret.id = id;
        ret.level = level;
        ret.starLv = starLv;
        ret.cfg = Config.skill_210[id];
        if (ret.cfg.buff != "0") {
            ret.buff = JSON.parse(ret.cfg.buff)[0][1];
        }
        else {
            ret.buff = 0;
        }
        ret.icon = ret.cfg.icon;
        ret.name = ret.cfg.n;
        ret.type = ret.cfg.type;
        ret.cdms = ret.cfg.cd * 1000;
        ret.duoduan = ret.cfg.duoduan;
        ret.godWeaponPer = per;
        ret.skillPer = damage;
        if (ret.type == Model_Skill.TYPE1) {
            ret.level = 1;
        }
        ret.updatePower();
        return ret;
    };
    Vo_Skill.prototype.dispose = function () {
        var ret = this;
        ret.id = 0;
        ret.level = 0;
        ret.starLv = 0;
        ret.cfg = null;
        ret.buff = 0;
        ret.icon = 0;
        ret.name = null;
        ret.type = 0;
        ret.cdms = 0;
        ret.duoduan = 0;
        ret.godWeaponPer = 0;
        Pool.recover("Vo_Skill", this);
    };
    Vo_Skill.prototype.openGuanQiaHandle = function () {
        if (this.type == Model_Skill.TYPE2) {
            this.openguanqia = Config.skillstart_210[(this.id % 10) - 4].start;
        }
    };
    /**更新威力数值 */
    Vo_Skill.prototype.updatePower = function () {
        var self = this;
        var cfg = self.cfg;
        //基础威力 + 等级 * 威力成长
        self.power_lv = cfg.bp + self.level * cfg.pg;
        //基础攻击力百分比 + 武将星级或宝物星级 * 攻击百分比成长
        self.powerAtt_lv = cfg.attp + self.starLv * cfg.attpg + self.godWeaponPer + self.skillPer;
        self.skill_power = cfg.zlp + self.level * cfg.zlg;
        if (self.cfg.attr != 0) {
            if (self.addAttr) {
                self.addAttr.length = 0;
            }
            else {
                self.addAttr = [];
            }
            for (var i = 0; i < cfg.attr.length; i++) {
                var list = self.addAttr[i];
                if (!list) {
                    list = [];
                    self.addAttr[i] = list;
                }
                list[0] = cfg.attr[0][0];
                list[1] = cfg.attr[0][1] + cfg.attrg[0][1] * self.level;
            }
        }
    };
    Vo_Skill.prototype.enterCool = function () {
        this.remaincd = this.cdms;
    };
    Vo_Skill.prototype.enterCool0 = function () {
        this.remaincd = this.cfg.cd0 ? this.cfg.cd0 * 1000 : 0;
    };
    Vo_Skill.prototype.getHtmlDes = function () {
        return this.cfg.des;
    };
    Vo_Skill.getScore = function (role, skill) {
        if (skill.remaincd > 0) {
            return -1;
        }
        if (skill.type == 1) {
            var skillDistx = 0;
            var skillDisty = 0;
            var nearestEnemy = role.scene.getBestRole(MapScene.NEARESTENEMYFUNC, role);
            if (nearestEnemy) {
                var enemyLength = MoveUtil.dist(role.x, role.y, nearestEnemy.x, nearestEnemy.y);
                return 100000000 - enemyLength + skillDistx + skillDisty;
            }
        }
        return -1;
    };
    return Vo_Skill;
}());
__reflect(Vo_Skill.prototype, "Vo_Skill");
