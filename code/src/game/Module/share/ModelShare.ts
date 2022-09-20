class ModelShare extends BaseModel {
    public static readonly msg_datas = "msg_datas";
    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        var self = this;
        wsm.regHand(2700, self.GC2700, self);
        wsm.regHand(2702, self.GC2702, self);
    }
    public statesDic: any = {};
    /**获取领取状态 0不可领 1可以领取 2已经领取*/
    private GC2700(self: ModelShare, bytes: BaseBytes) {
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            self.statesDic[bytes.readByte()] = bytes.readByte();
        }
        self.notify(ModelShare.msg_datas);
    }
    /**领取分享奖励 */
    public CG2701(cfgId: number) {
        var bytes = this.getBytes();
        bytes.writeByte(cfgId);
        this.sendSocket(2701, bytes);
    }
    private GC2702(self: ModelShare, bytes: BaseBytes) {
        var state = bytes.readByte();
        if (state == 0) {
            var cfgId = bytes.readByte();
            self.statesDic[cfgId] = 2;
            self.notify(ModelShare.msg_datas);
        } else {
            if (self.statesDic[1] == 2) {
                ViewCommonWarn.text("您已领取了该奖励");
            } else {
                ViewCommonWarn.text("领取失败");
            }
        }
    }

}