var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Chat = (function () {
    function Vo_Chat() {
        /**(1跨服,2本服,3国家4系统)*/
        this.type = 0;
        /**头像ID */
        this.headId = 1001;
        /**头像框 */
        this.frameId = 1003;
    }
    return Vo_Chat;
}());
__reflect(Vo_Chat.prototype, "Vo_Chat");
