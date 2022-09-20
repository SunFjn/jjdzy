var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoPersonalBoss = (function () {
    function VoPersonalBoss() {
        this.count = 0;
        this.rebornTime = 0; //复活时间
        this.isClearance = false; //是否通关
        this.bossid = 0;
    }
    VoPersonalBoss.prototype.initLib = function () {
        var lib = Config.solo_220[this.id];
        this.condition = JSON.parse(lib["con"])[0];
        this.bossid = JSON.parse(lib.boss)[0][1];
    };
    //是否可扫荡
    VoPersonalBoss.prototype.getClearSt = function () {
        return this.isClearance && this.count > 0 && this.isRefresh();
    };
    Object.defineProperty(VoPersonalBoss.prototype, "sortIndex", {
        get: function () {
            var _sortIndex = this.id;
            if (this.isActi()) {
                _sortIndex += 1000;
                if (this.isRefresh())
                    _sortIndex += 1000;
            }
            else if (!this.isActi())
                _sortIndex *= -1;
            return _sortIndex;
        },
        enumerable: true,
        configurable: true
    });
    VoPersonalBoss.prototype.setTime = function (val) {
        this.rebornTime = egret.getTimer() + val * 1000;
    };
    VoPersonalBoss.prototype.isActi = function () {
        var vm = Model_player.voMine;
        var zs = vm.zsID;
        var lv = Model_LunHui.realLv;
        var hasActi;
        if (this.condition[0] > 0) {
            hasActi = lv >= this.condition[0];
        }
        else {
            hasActi = zs >= this.condition[1];
        }
        return hasActi;
    };
    VoPersonalBoss.prototype.isRefresh = function () {
        var has = this.rebornTime < egret.getTimer();
        return has;
    };
    return VoPersonalBoss;
}());
__reflect(VoPersonalBoss.prototype, "VoPersonalBoss");
