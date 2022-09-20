var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_ZSGodWeapon = (function () {
    function Vo_ZSGodWeapon() {
        this.bodyArr = [];
        this.job = 0;
        this.quality = 0;
        this.starMax = 0;
        this.costArr = [];
        this.state = 0;
        /**星级 */
        this.starLv = 0;
        this.equipID = 0;
        this.bodyIDArr = [];
        this.tunshiArr = [0, 0, 0];
        this.zsLv = 0;
        this.clLv = 0;
        this.clExp = 0;
    }
    Vo_ZSGodWeapon.prototype.initcfg = function (value) {
        var self = this;
        self.cfg = Config.sb_750[value];
        self.job = self.cfg.type;
        self.quality = self.cfg.pinzhi;
        self.starMax = self.cfg.shengxing;
        self.costArr = JSON.parse(self.cfg.activation);
        self.wujiangVo = Config.hero_211[self.cfg.type];
        self.initCuiLian(1);
        self.initZhuanShu(0);
        var index = 1;
        while (index > 0) {
            var bodycfg = Config.sbpf_750[self.cfg.type * 1000 + index];
            if (bodycfg) {
                self.bodyArr.push(bodycfg);
                index++;
            }
            else {
                index = 0;
            }
        }
    };
    Vo_ZSGodWeapon.prototype.initCuiLian = function (level) {
        var self = this;
        self.clLv = level;
        self.cuiLianCfg = Config.sbcl_750[self.quality * 10000 + level];
    };
    Vo_ZSGodWeapon.prototype.initZhuanShu = function (level) {
        var self = this;
        self.zsLv = level;
        self.zhuanShuCfg = Config.sbzs_750[self.job * 1000 + level];
        var vomine = Model_player.voMine;
        if (self.job == Model_player.voMine.job) {
            for (var i = 0; i < vomine.skillList.length; i++) {
                var vo = vomine.skillList[i];
                if (vo.type == Model_Skill.TYPE3) {
                    vo.godWeaponPer = JSON.parse(self.zhuanShuCfg.jineng)[0][1];
                    break;
                }
            }
            if (vomine.sceneChar) {
                vomine.sceneChar.attackCount = 0;
                vomine.sceneChar.skillList = vomine.skillList;
            }
        }
    };
    Vo_ZSGodWeapon.create = function (id) {
        var vo = new Vo_ZSGodWeapon();
        vo.initcfg(id);
        return vo;
    };
    /**可激活 */
    Vo_ZSGodWeapon.CANACTIVITY = 0;
    /**已激活 */
    Vo_ZSGodWeapon.ACTIVITY = 1;
    /**未激活 */
    Vo_ZSGodWeapon.NOCANACTIVITY = 2;
    return Vo_ZSGodWeapon;
}());
__reflect(Vo_ZSGodWeapon.prototype, "Vo_ZSGodWeapon");
