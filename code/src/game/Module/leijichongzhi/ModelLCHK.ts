class ModelLCHK extends BaseModel {
    public static msg_datas = "msg_datas";
    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        wsm.regHand(4392, this.GC4392, this);
        wsm.regHand(4394, this.GC4394, this);
    }
    public datas: any = {};
    public money: number = 0;
    /**打开UI */
    public CG4391(){this.sendSocket(4391, this.getBytes())}
    private GC4392(self:ModelLCHK, bytes:BaseBytes) {
        for(let i = 0, len = bytes.readShort(); i < len; i++) {
            const id = bytes.readInt();
            self.datas[id] = bytes.readByte();//0:未达到，1:可领取，2:已领取
        }
        self.money = bytes.readInt();
        const canGetId = self.canGetId();
        GGlobal.reddot.setCondition(UIConst.LCHK, 0, self.datas[canGetId] == 1);
        GGlobal.reddot.notify(UIConst.LCHK);
        self.notify(ModelLCHK.msg_datas);
    }
    /**领取奖励 */
    public CG4393(id: number) {
        const bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4393, bytes);
    }
    private GC4394(self:ModelLCHK, bytes: BaseBytes) {
        const state = bytes.readByte();
        if(state == 1) {
            bytes.readInt();//清掉字节数组里最后一个int(没有用)
            self.CG4391();//拉数据刷新
        }else {
            //B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取
            ViewCommonWarn.text(["没有该奖励", "", "未达条件", "已领取"][state]);
        }
    }
    public canGetId() {
        for(let key in this.datas) {
            if(this.datas[key] == 1) {
                return key;
            }
        }
        return this.minNonGet();
    }
    public minNonGet() {
        for(let key in this.datas) {
            if(this.datas[key] == 0) {
                return key;
            }
        }
        return null;
    }
}