var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleBuffState = (function () {
    function RoleBuffState() {
        this.remainTime = 2500;
        this.autoRemove = 1; //自动移除
        this.isWorking = false;
        this.shakex = 1;
        this.shakeInterv = 0;
        this.buffID = 0;
        this.buffLv = 0;
    }
    RoleBuffState.create = function () {
        var p = RoleBuffState.POOL;
        if (p.length) {
            return p.shift();
        }
        return new RoleBuffState();
    };
    RoleBuffState.prototype.update = function (ctx) {
        var self = this;
        self.remainTime -= ctx.dt;
        if (self.remainTime <= 0) {
            ctx.d = 1;
        }
    };
    RoleBuffState.prototype.onAdd = function () {
        var self = this;
        var role = self.role;
        self.isWorking = true;
        self.cfg = Config.buff_011[self.buffID];
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
        console.log("添加buffID" + self.buffID);
        if (self.cfg.texiao > 0) {
            switch (self.cfg.wz) {
                case 1:
                    self.eff = EffectMgr.addEff("eff/" + self.cfg.texiao + "/ani", role.view, 0, 0, 1000, -1, true, 1, Main.skill_part_type);
                    break;
            }
        }
    };
    RoleBuffState.prototype.onRemove = function () {
        var self = this;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
        self.isWorking = false;
        if (self.role) {
            self.role.addZhaoYunBuff(0);
            self.role.buffData[self.buffID] = null;
            delete self.role.buffData[self.buffID];
            self.role = null;
        }
        console.log("移除buffID" + self.buffID);
        self.buffLv = 0;
        self.buffID = 0;
        self.cfg = null;
        if (RoleBuffState.POOL.indexOf(self) == -1)
            RoleBuffState.POOL.push(self);
    };
    RoleBuffState.prototype.onEvent = function (evt, arg) {
    };
    RoleBuffState.POOL = [];
    return RoleBuffState;
}());
__reflect(RoleBuffState.prototype, "RoleBuffState");
