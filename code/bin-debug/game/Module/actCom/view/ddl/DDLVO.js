var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DDLVO = (function () {
    function DDLVO() {
        this.rank = 0; //排名
        this.name = ""; //玩家名字
        this.count = 0; //对联正确次数
        this.id = 0;
        this.status = 0; //奖励状态，0:未达到，1:可领取，2:已领取
    }
    DDLVO.prototype.readRankMsg = function (data) {
        this.rank = data.readByte();
        this.name = data.readUTF();
        this.count = data.readInt();
    };
    DDLVO.prototype.readAwardMsg = function (data) {
        this.id = data.readInt();
        this.status = data.readByte();
    };
    return DDLVO;
}());
__reflect(DDLVO.prototype, "DDLVO");
