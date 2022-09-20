var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_KaiFuKH = (function () {
    function Vo_KaiFuKH() {
        this.st = 0; //领奖状态
        this.pro = 0; //当前进度
        /**限量奖励(特殊奖励)状态，0:未达到，1:可领取，2:已领取，3:已抢完 */
        this.limitSt = 0; //限量奖励
        /**B:达标奖励状态，0:未达到，1:可领取，2:已领取 */
        this.reward = 0; //达标奖励
        /**剩余数量 */
        this.lastNum = 0;
    }
    Vo_KaiFuKH.prototype.init = function (cfg) {
        this.lib = cfg;
        this.id = cfg.id;
        this.sys = cfg.sys;
        this.type = cfg.type;
        this.tabIndex = (cfg.id / 1000) >> 0;
        var date = JSON.parse(cfg.open);
        this.day = date[0][0];
    };
    Vo_KaiFuKH.prototype.getSortIndex = function () {
        var ret = this.id;
        if (this.st == 2) {
            ret += 10000;
        }
        else if (this.st == 1) {
            ret -= 10000;
        }
        return ret;
    };
    Vo_KaiFuKH.prototype.getSortIndex2 = function () {
        var ret = this.id;
        // if(this.reward == 2 || this.limitSt == 2 || this.limitSt == 3){
        // 	ret += 10000;
        // } else if(this.reward == 1 || this.limitSt == 1){
        // 	ret -= 10000;  
        // }
        if (this.lastNum == 0 && this.reward == 2) {
            ret += 20000;
        }
        else if (this.limitSt == 1) {
            ret -= 10000;
        }
        else if (this.reward == 1) {
            ret -= 10000;
        }
        else if (this.limitSt == 0 || this.reward == 0) {
            ret -= 1000;
        }
        else if (this.reward == 2) {
            ret += 10000;
        }
        else if (this.limitSt == 2) {
            ret += 10000;
        }
        else if (this.limitSt == 3) {
            ret += 10000;
        }
        return ret;
    };
    return Vo_KaiFuKH;
}());
__reflect(Vo_KaiFuKH.prototype, "Vo_KaiFuKH");
