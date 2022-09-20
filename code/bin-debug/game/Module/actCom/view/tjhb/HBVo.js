var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HBVo = (function () {
    function HBVo() {
        this.isSystemHB = 0; //是否系统红包，0不是，1是
        this.hbStatus = 0; //红包状态：0已抢光，1可抢，2已经抢过
        this.hbId = 0; //红包id
        this.hbType = 0; //红包类型，配置表id
        this.name = ""; //姓名
        this.headId = 0; //头像
        this.frameId = 0; //头像框
        this.hbNum = 0; //红包个数
        this.robNum = 0; //抢到的红包金额
        this.id = 0; //id
        this.param = 0; //参数
        this.sendStatus = 0; //0未发，1可发，2已发
        this.recordName = ""; //名字
        this.money = 0; //红包金额
        this.isMyself = 0; //是否玩家本人,1是,0不是
    }
    HBVo.prototype.readMsg = function (data) {
        this.isSystemHB = data.readByte();
        this.hbStatus = data.readByte();
        this.hbId = data.readLong();
        this.hbType = data.readInt();
        this.name = data.readUTF();
        this.headId = data.readInt();
        this.frameId = data.readInt();
        this.hbNum = data.readInt();
        this.robNum = data.readInt();
    };
    HBVo.prototype.readFhbMsg = function (data) {
        this.id = data.readInt();
        this.param = data.readInt();
        this.sendStatus = data.readByte();
    };
    HBVo.prototype.readRecordMsg = function (data) {
        this.recordName = data.readUTF();
        this.money = data.readInt();
        this.isMyself = data.readByte();
    };
    return HBVo;
}());
__reflect(HBVo.prototype, "HBVo");
