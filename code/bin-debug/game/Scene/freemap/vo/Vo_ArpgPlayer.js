var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_ArpgPlayer = (function () {
    function Vo_ArpgPlayer() {
        /**将衔*/
        this.jiangXian = 0;
        /**称号*/
        this.title = 0;
        /** vip等级 */
        this.viplv = 0;
        /** 武器*/
        this.weapon = 0;
        /** 神兵*/
        this.godWeapon = 0;
        this.shouhun = 0;
        this.horseId = 0;
        this.zs = 0;
        this.state = 0; //场景状态  0：正常，1：战斗，2：冻结 预留
        this.hp = 1;
        this.maxHp = 1;
    }
    Vo_ArpgPlayer.prototype.setBody = function (v) {
        var fscfg = Config.sz_739[v];
        var moxing = 0;
        if (fscfg) {
            this.body = fscfg.moxing;
        }
        else {
            this.body = v;
        }
    };
    Vo_ArpgPlayer.prototype.setShouHun = function (v) {
        this.shouhun = v;
    };
    Vo_ArpgPlayer.prototype.setHorseId = function (v) {
        this.horseId = v;
    };
    Vo_ArpgPlayer.prototype.setWeapon = function (v) {
        var fscfg = Config.sz_739[v];
        var moxing = 0;
        if (fscfg) {
            this.weapon = fscfg.moxing;
        }
        else {
            this.weapon = v;
        }
    };
    Vo_ArpgPlayer.prototype.setHp = function (hp) {
        this.hp = hp;
    };
    Vo_ArpgPlayer.prototype.isMineID = function () {
        return Model_player.isMineID(this.id);
    };
    Vo_ArpgPlayer.create = function () {
        return new Vo_ArpgPlayer();
        // return Pool.getItemByClass("Vo_ArpgPlayer", Vo_ArpgPlayer);
    };
    return Vo_ArpgPlayer;
}());
__reflect(Vo_ArpgPlayer.prototype, "Vo_ArpgPlayer");
