var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Activity = (function () {
    function Vo_Activity() {
        /** 活动状态 0：关闭 1：开启 */
        this.status = 0;
        /** 活动排序 */
        this.sortNum = 0;
        /** 活动图标 */
        this.icon = "";
    }
    // public readMsg(d:BaseBytes):void{
    // 	this.index = d.readInt();
    // 	this.id = d.readInt();
    // 	this.qs = d.readInt();
    // 	this.start = d.readInt();
    // 	this.end = d.readInt();
    // }
    Vo_Activity.prototype.setData = function (groupId, index, id, qishu, start, end) {
        var self = this;
        self.groupId = groupId;
        self.index = index;
        self.id = id;
        self.qs = qishu;
        self.start = start;
        self.end = end;
        var cfg = Config.huodong_009[index];
        if (cfg) {
            self.sortNum = cfg.px;
            self.icon = cfg.icon + "";
        }
    };
    /**前端添加 */
    Vo_Activity.create = function () {
        // return this.pool.pop() || new Vo_Activity();
        return new Vo_Activity();
    };
    /**获取活动剩余时间 秒*/
    Vo_Activity.prototype.getSurTime = function () {
        switch (this.id) {
            case UIConst.XIAOFEIPH:
                return this.end - Math.ceil(Model_GlobalMsg.getServerTime() / 1000) - 86400 * Config.xtcs_004[5301].num;
            case UIConst.SG_ZHUANPAN:
                return this.end - Math.ceil(Model_GlobalMsg.getServerTime() / 1000) - 86400 * Config.xtcs_004[5302].num;
            default:
                return Math.ceil((this.end * 1000 - Model_GlobalMsg.getServerTime()) / 1000);
        }
    };
    Vo_Activity.pool = [];
    return Vo_Activity;
}());
__reflect(Vo_Activity.prototype, "Vo_Activity");
