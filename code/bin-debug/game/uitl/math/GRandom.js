var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GRandom = (function () {
    function GRandom() {
        this.maxshort = 65535;
        this.mul = 1194211693;
        this.adder = 12345;
        this.seed = 0;
        this.counter = 0;
        this.times = 0;
        this.avarange = 0;
    }
    /**产生0-1的浮点数*/
    GRandom.prototype.random = function () {
        var self = this;
        var seed = self.seed;
        seed = (seed + 1) * (seed + 3) * (seed + 9);
        seed = (seed % 1000) >> 0;
        var ret = seed / 1000;
        // if(1) {
        // 	self.times++;
        // 	self.counter += ret;
        // 	self.avarange = self.counter / self.times;
        // 	if(GRandom.logFunc) {
        // 		GRandom.logFunc("random:" + "seed=" + self.seed + "rnd=" + ret);
        // 	}else{
        // 		console.log("random:" + "seed=" + self.seed + "rnd=" + ret);
        // 	}
        // }
        self.seed++;
        if (self.seed > 1000) {
            self.seed = 1;
        }
        return ret;
    };
    GRandom.prototype.rndNum = function (min, max, fix) {
        if (fix === void 0) { fix = 100; }
        var rnd = min + this.random() * (max - min);
        rnd = (rnd * fix) >> 0;
        return rnd / fix;
    };
    /**产生0-1000的整数*/
    GRandom.prototype.randomInt = function () {
        var self = this;
        var seed = self.seed;
        seed = (seed + 1) * (seed + 3) * (seed + 9);
        seed = (seed % 1000) >> 0;
        var ret = seed;
        self.seed++;
        if (self.seed > 1000) {
            self.seed = 1;
        }
        return ret;
    };
    return GRandom;
}());
__reflect(GRandom.prototype, "GRandom");
