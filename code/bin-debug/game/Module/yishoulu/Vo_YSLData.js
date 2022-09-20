var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 异兽录基础数据
 */
var Vo_YSLData = (function () {
    function Vo_YSLData() {
        /**异兽id */
        this.ysId = 0;
        /**异兽录升级表等级lv */
        this.lvUpId = 0;
        /**异兽录套装表等级lv */
        this.suitId = 0;
        /**当前经验 */
        this.exp = 0;
        /**阶数 */
        this.jie = 0;
        this.skillLv = 1000;
        this.equipArr = [];
    }
    Vo_YSLData.prototype.initDate = function (data) {
        var self = this;
        self.ysId = data.readByte();
        self.lvUpId = data.readInt();
        self.exp = data.readInt();
        self.suitId = data.readInt();
        self.jie = data.readInt();
        self.cfg = Config.ysl_752[self.ysId];
        self.skillLv = self.ysId * 1000;
        self.initEquip(self.ysId);
    };
    Vo_YSLData.prototype.initEquip = function (cfgID) {
        var self = this;
        self.equipArr = [];
        for (var i = 1; i <= 4; i++) {
            if (Config.ystfzb_752[cfgID * 100 + i]) {
                var vo = Vo_YiShouEquip.create(cfgID * 100 + i);
                self.equipArr.push(vo);
            }
        }
    };
    return Vo_YSLData;
}());
__reflect(Vo_YSLData.prototype, "Vo_YSLData");
