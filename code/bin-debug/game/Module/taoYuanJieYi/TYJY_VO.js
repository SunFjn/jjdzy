var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TYJY_VO = (function () {
    function TYJY_VO() {
        this.gangId = 0; //义盟id
        this.gangNum = 0;
        this.gangName = ""; //义盟名字
        this.status = 0; //4.取消申请 3.申请加入 2申请已满 1已满员
        this.power = 0; //战力
        this.dage = "";
        this.playerId = 0; //玩家id
        this.playerName = ""; //玩家名字
        this.offLine = 0; //玩家离线时间 =0在线，>0离线时间(秒)
        //头像id
        this.headId = 0;
        //头像框
        this.frameId = 0;
        this.position = 0; //地位标识：1.大哥 2.二哥 3.三弟
        this.playerLv = 0; //玩家等级
        this.playerPower = 0; //玩家战力
        this.playerVip = 0; //玩家vip
    }
    TYJY_VO.prototype.readGangMsg = function (data) {
        this.gangId = data.readLong();
        this.gangNum = data.readInt();
        this.gangName = data.readUTF();
        this.status = data.readByte();
        this.power = data.readLong();
        this.dage = data.readUTF();
    };
    TYJY_VO.prototype.readMemberMsg = function (data) {
        this.playerId = data.readLong();
        this.playerName = data.readUTF();
        this.offLine = data.readInt();
        this.headId = data.readInt();
        this.frameId = data.readInt();
        this.position = data.readByte();
        this.playerVip = data.readByte();
        this.playerLv = data.readInt();
        this.playerPower = data.readLong();
    };
    TYJY_VO.prototype.readApplyMsg = function (data) {
        this.playerId = data.readLong();
        this.playerName = data.readUTF();
        this.headId = data.readInt();
        this.frameId = data.readInt();
        this.playerPower = data.readLong();
        this.playerVip = data.readByte();
    };
    return TYJY_VO;
}());
__reflect(TYJY_VO.prototype, "TYJY_VO");
