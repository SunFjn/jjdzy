var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_TuJian = (function () {
    function Vo_TuJian() {
        /**激活消耗 */
        this.activation_jihuo = [];
        /**激活属性 */
        this.attr_jihuo = [];
        this.power0 = 0;
        this.isJiHuo = false;
        this.starLv = 0;
        this.attr_star = [];
        this.consume_star = [];
        /**星级战力 */
        this.power1 = 0;
        this._starID = 0;
        this.attr_level = [];
        this.consume_level = [];
        this.power2 = 0;
    }
    Vo_TuJian.prototype.initConfig = function (id) {
        this.cfg = Config.picture_005[id];
        this.ID = id;
        this.type = this.cfg.type;
        this.name = this.cfg.name;
        this.pic = this.cfg.pic;
        this.quality = this.cfg.quality;
        this.activation_jihuo = JSON.parse(this.cfg.activation);
        this.attr_jihuo = JSON.parse(this.cfg.attr);
        this.source = this.cfg.get;
        this.power0 = this.cfg.power;
    };
    Object.defineProperty(Vo_TuJian.prototype, "starID", {
        get: function () {
            return this._starID;
        },
        set: function (value) {
            this._starID = value;
            var cfg = Config.picstar_005[value];
            this.starLv = cfg.lv;
            this.attr_star = JSON.parse(cfg.attr);
            this.consume_star = JSON.parse(cfg.consume);
            this.next_star = cfg.next;
            this.levelMax = cfg.lvmax;
            this.des_star = cfg.describe;
            this.power1 = cfg.power;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_TuJian.prototype, "levelID", {
        get: function () {
            return this._levelID;
        },
        set: function (value) {
            this._levelID = value;
            var cfg = Config.piclv_005[value];
            this.level = cfg.lv;
            if (cfg.attr != "0") {
                this.attr_level = JSON.parse(cfg.attr);
            }
            else {
                this.attr_level = [];
            }
            if (cfg.consume != "0") {
                this.consume_level = JSON.parse(cfg.consume);
            }
            else {
                this.consume_level = [];
            }
            this.next_level = cfg.next;
            this.power2 = cfg.power;
        },
        enumerable: true,
        configurable: true
    });
    Vo_TuJian.create = function (id) {
        var vo = new Vo_TuJian();
        vo.initConfig(id);
        return vo;
    };
    return Vo_TuJian;
}());
__reflect(Vo_TuJian.prototype, "Vo_TuJian");
