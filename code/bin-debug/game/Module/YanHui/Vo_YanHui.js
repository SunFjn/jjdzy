var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_YanHui = (function () {
    function Vo_YanHui() {
        this.id = 0;
        /**宴会类型 */
        this.type = 0;
        this.state = 0;
        this.head = 0;
        this.framePic = 0;
        this.num = 0;
        this.isPT = 0;
        /**宴会举办者ID */
        this.holdId = 0;
        /**是否申请0.未申请 1.已申请 2.已同意申请 */
        this.isApply = 0;
    }
    Vo_YanHui.create = function () {
        var vo = new Vo_YanHui();
        return vo;
    };
    return Vo_YanHui;
}());
__reflect(Vo_YanHui.prototype, "Vo_YanHui");
