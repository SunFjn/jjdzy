var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PXSBVO = (function () {
    function PXSBVO() {
        this.id = 0; //大奖配置表id
        this.status = 0; //状态：0未达到，1可领取，2已领取
        this.day = 0; //达到天数
        this.arr = [];
    }
    PXSBVO.prototype.readMsg = function (data) {
        var self = this;
        self.id = data.readInt();
        self.status = data.readByte();
        self.day = data.readInt();
        self.arr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var status_1 = data.readByte(); //状态：0未达到，1可领取，2已领取
            self.arr.push([id, status_1]);
        }
    };
    return PXSBVO;
}());
__reflect(PXSBVO.prototype, "PXSBVO");
