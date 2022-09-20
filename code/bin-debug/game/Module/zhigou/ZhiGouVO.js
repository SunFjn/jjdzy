var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZhiGouVO = (function () {
    function ZhiGouVO() {
        //每日直购表id
        this.id = 0;
        //奖励状态，0:未达到，1:可领取，2:已领取
        this.state = 0;
    }
    ZhiGouVO.prototype.readMsg = function (data) {
        this.id = data.readInt();
        this.state = data.readInt();
    };
    return ZhiGouVO;
}());
__reflect(ZhiGouVO.prototype, "ZhiGouVO");
