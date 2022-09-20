var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WMSZVO = (function () {
    function WMSZVO() {
        this.rank = 0; //排名
        this.name = ""; //玩家名
        this.integral = 0; //积分
        this.id = 0; //配置表id
        this.status = 0; //奖励状态，0:未达到，1:可领取，2:已领取
    }
    WMSZVO.prototype.readRankMsg = function (data) {
        this.rank = data.readShort();
        this.name = data.readUTF();
        this.integral = data.readInt();
    };
    WMSZVO.prototype.readMsg = function (data) {
        this.id = data.readInt();
        this.status = data.readByte();
    };
    return WMSZVO;
}());
__reflect(WMSZVO.prototype, "WMSZVO");
