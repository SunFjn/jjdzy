var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_HuoDong = (function () {
    function Vo_HuoDong() {
        this.status = 0;
        this.canCt = 0; //可领取的次数
        this.hasCt = 0; //已领取的次数
    }
    Vo_HuoDong.prototype.readMsg = function (data) {
        this.id = data.readByte();
        this.status = data.readByte();
    };
    Vo_HuoDong.prototype.readMsgInt = function (data) {
        this.id = data.readInt();
        this.status = data.readByte();
    };
    Vo_HuoDong.prototype.readMsgCt = function (data) {
        this.id = data.readInt();
        this.canCt = data.readByte();
        this.hasCt = data.readByte();
    };
    //0前往充值
    Vo_HuoDong.prototype.getStaCt = function (max) {
        if (this.canCt > this.hasCt) {
            return 1;
        }
        else if (this.hasCt == max) {
            return 2;
        }
        else {
            return 0;
        }
    };
    return Vo_HuoDong;
}());
__reflect(Vo_HuoDong.prototype, "Vo_HuoDong");
