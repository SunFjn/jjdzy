var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_HongBao = (function () {
    function Vo_HongBao() {
        /**L:红包唯一id */
        this.id = 0;
        /**U:发送者名字 */
        this.name = "";
        /**头像id */
        this.headId = 0;
        /**I:头像框 */
        this.frameId = 0;
        /**B:已经领取人数 */
        this.drawNum = 0;
        /**I:领取了多少 0是没有领取 >0领取了*/
        this.robNum = 0;
        /**I:红包总金额 */
        this.moneyNum = 0;
        /**U:红包名称 */
        this.hbName = "";
        this.recordName = ""; //名字
        this.money = 0; //红包金额
        this.isMyself = 0; //是否玩家本人,1是,0不是
    }
    /**L:红包唯一idU:发送者名字U:红包名称I:头像idI:头像框B:已经领取人数I:领取了多少 0是没有领取 >0领取了I:红包总金额 */
    Vo_HongBao.prototype.readData = function (data) {
        var self = this;
        self.id = data.readLong();
        self.name = data.readUTF();
        self.hbName = data.readUTF();
        self.headId = data.readInt();
        self.frameId = data.readInt();
        self.drawNum = data.readByte();
        self.robNum = data.readInt();
        self.moneyNum = data.readInt();
    };
    Vo_HongBao.prototype.readRecord = function (data) {
        var self = this;
        self.recordName = data.readUTF();
        self.money = data.readLong();
        self.isMyself = data.readByte();
    };
    return Vo_HongBao;
}());
__reflect(Vo_HongBao.prototype, "Vo_HongBao");
