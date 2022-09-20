var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WishTreeVO = (function () {
    function WishTreeVO() {
        this.status = 0;
        this.rank = 0;
        this.name = "";
        this.wish = 0;
    }
    WishTreeVO.prototype.readMsg = function (data) {
        this.id = data.readInt();
        this.status = data.readByte();
    };
    WishTreeVO.prototype.readRankMsg = function (data) {
        this.rank = data.readShort();
        this.name = data.readUTF();
        this.wish = data.readInt();
    };
    return WishTreeVO;
}());
__reflect(WishTreeVO.prototype, "WishTreeVO");
