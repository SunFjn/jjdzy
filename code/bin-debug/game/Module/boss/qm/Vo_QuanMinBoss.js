var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_QuanMinBoss = (function () {
    function Vo_QuanMinBoss() {
        this.id = 0;
        this.bossid = 0;
        this.name = "";
        this.bossbody = "";
        this.weapon = 0;
        this.bosshead = "";
        this.time = 0; //呵呵
        this.lastKiller = "";
        this.reliveTime = 0; //死亡时间戳
        this.curHp = 0;
        this.maxHp = 0;
        this.st = 0; //0:未刷新 1已刷新
        this.sortIndex = 0;
    }
    Vo_QuanMinBoss.prototype.initLib = function () {
        var s = this;
        s.cfg = Config.all_221[s.id];
        s.time = s.cfg.time;
        s.bossid = JSON.parse(s.cfg.boss)[0][1];
        var n = Config.NPC_200[s.bossid];
        s.name = n.name;
        s.maxHp = n.hp;
        s.weapon = n.weapon;
        s.condition = JSON.parse(s.cfg.con)[0];
        s.level = s.condition[0] > 0 ? s.condition[0] + "级" : s.condition[1] + "转";
        s.sortIndex = s.condition[0] * 1000 + s.condition[1];
        s.bossbody = n.mod;
        s.bosshead = n.head;
        s.reward = JSON.parse(s.cfg.reward);
    };
    Vo_QuanMinBoss.prototype.isOpen = function () {
        var s = this;
        var r = false;
        if (s.condition[0] > 0) {
            r = Model_LunHui.realLv >= s.condition[0];
        }
        else {
            r = ((Model_player.voMine.zsID / 1000) >> 0) >= s.condition[1];
        }
        return r;
    };
    Vo_QuanMinBoss.prototype.update = function () {
        var s = this;
        if (s.reliveTime < (Model_GlobalMsg.getServerTime() / 1000) >> 0) {
            s.st = 1;
        }
        else {
            s.st = 0;
        }
    };
    return Vo_QuanMinBoss;
}());
__reflect(Vo_QuanMinBoss.prototype, "Vo_QuanMinBoss");
