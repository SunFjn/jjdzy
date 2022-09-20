var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AuthenHeadVO = (function () {
    function AuthenHeadVO() {
    }
    AuthenHeadVO.prototype.readMsg = function (data) {
        this.headId = data.readInt();
        this.frameId = data.readInt();
        this.country = data.readInt();
        this.vip = data.readInt();
    };
    return AuthenHeadVO;
}());
__reflect(AuthenHeadVO.prototype, "AuthenHeadVO");
