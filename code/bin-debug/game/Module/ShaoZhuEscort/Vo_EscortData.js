var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 护送基础数据
 */
var Vo_EscortData = (function () {
    function Vo_EscortData() {
        /**玩家id */
        this.playerId = 0;
        /**玩家名字 */
        this.playerName = "";
        /**护送少主武将 */
        this.guardId = 0;
        /**战力 */
        this.power = 0;
        /**头像id，没有则为0 */
        this.headID = 0;
        /**头像框 */
        this.frameID = 0;
        /**国家 */
        this.country = 0;
        /**剩余时间 */
        this.timeRemain = 0;
        /**状态：0：不可拦截，1：可拦截 */
        this.state = 0;
    }
    Vo_EscortData.prototype.initDate = function (data) {
        var self = this;
        self.playerId = data.readLong();
        self.playerName = data.readUTF();
        self.guardId = data.readInt();
        self.power = data.readLong();
        self.headID = data.readInt();
        self.frameID = data.readInt();
        self.country = data.readInt();
        self.timeRemain = data.readInt();
        self.state = data.readByte();
    };
    return Vo_EscortData;
}());
__reflect(Vo_EscortData.prototype, "Vo_EscortData");
