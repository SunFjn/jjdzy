var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_MineData = (function () {
    function Vo_MineData() {
        /**I:矿配置id */
        this.cfgID = 0;
        /**矿主id */
        this.mineID = 0;
        /**已被顺次数 */
        this.mySteal = 0;
        /**已被抢次数I */
        this.myLoot = 0;
        /**剩余采集时间 */
        this.times = 0;
        /**角色信息 */
        this.roleArr = [];
        /**物品信息 */
        this.itemArr = [];
        /**顺手物品信息 */
        this.stealItemArr = [];
        /**抢夺物品信息 */
        this.lootItemArr = [];
    }
    Vo_MineData.prototype.initLib = function (value) {
        this.cfgID = value;
        this.cfg = Config.kfkz_275[value];
    };
    Vo_MineData.create = function (cfgID) {
        var vo = new Vo_MineData();
        vo.initLib(cfgID);
        return vo;
    };
    return Vo_MineData;
}());
__reflect(Vo_MineData.prototype, "Vo_MineData");
var Vo_MineRole = (function () {
    function Vo_MineRole() {
        /**L:矿工id::: */
        this.roleId = 0;
        /**矿工名字L */
        this.roleName = "";
        /**矿工战力*/
        this.power = 0;
        /**矿工国家*/
        this.country = 0;
        /**矿工头像*/
        this.headID = 0;
        /**矿工头像框*/
        this.frameID = 0;
    }
    /**L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框 */
    Vo_MineRole.prototype.initDate = function (data) {
        var self = this;
        self.roleId = data.readLong();
        self.roleName = data.readUTF();
        self.power = data.readLong();
        self.country = data.readByte();
        self.headID = data.readInt();
        self.frameID = data.readInt();
    };
    return Vo_MineRole;
}());
__reflect(Vo_MineRole.prototype, "Vo_MineRole");
