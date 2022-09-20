var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_JiangHun = (function () {
    function Vo_JiangHun() {
        /** 激活*/
        this.activationArr = [];
        this.attArr = [];
        this.consumeArr = [];
        this.power = 0;
        //类型*10000+品质*1000+等级
        this._level = 0;
    }
    Vo_JiangHun.prototype.initcfg = function (id) {
        var cfg = Config.general_006[id];
        this.ID = cfg.ID;
        this.name = cfg.name;
        this.type = cfg.type;
        this.quality = cfg.quality;
        this.pic = cfg.pic;
        this.activationArr = JSON.parse(cfg.activation);
        //判断将魂是否激活
    };
    Object.defineProperty(Vo_JiangHun.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            var cfg = Config.genlv_006[value];
            this._level = cfg.lv;
            if (cfg.attr != "0") {
                this.attArr = JSON.parse(cfg.attr);
            }
            this.next = cfg.next;
            this.consumeArr = JSON.parse(cfg.consume);
            this.power = cfg.power;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_JiangHun.prototype, "isJiHuo", {
        get: function () {
            if (this.level > 0) {
                return true;
            }
            return Model_RunMan.getIsPass(this.activationArr[0][0], this.activationArr[0][1]);
        },
        enumerable: true,
        configurable: true
    });
    Vo_JiangHun.create = function (id) {
        var vo = new Vo_JiangHun();
        vo.initcfg(id);
        return vo;
    };
    return Vo_JiangHun;
}());
__reflect(Vo_JiangHun.prototype, "Vo_JiangHun");
