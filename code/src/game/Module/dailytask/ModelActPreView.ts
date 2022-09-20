class ModelActPreView extends BaseModel {
    public static readonly msg_datas = "msg_datas";
    public static readonly msg_tsMsg = "msg_tsMsg";
    public static readonly msg_tsmsg_red = "msg_tsmsg_red";
    public static readonly msg_tsmsg_cge = "msg_tsmsg_cge";
    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        const self = this;
        wsm.regHand(4050, self.GC4050, self);
        wsm.regHand(4052, self.GC4052, self);
        //推送设置
        wsm.regHand(4054, self.GC4054, self);
        wsm.regHand(4056, self.GC4056, self);
        wsm.regHand(7502, self.GC7502, self);
    }
    private static _datas = [];
    private static _regDay: number = -1;
    public static get datas() {
        if (!this._datas || this._regDay != Model_GlobalMsg.kaifuDay) {
            this._regDay = Model_GlobalMsg.kaifuDay;
            this._datas.length = 0;
            const lib = Config.hdyl_259;
            for (let key in lib) {
                const cfg = lib[key];
                if (this.isSuitable(cfg)) {
                    if (cfg.sysid == 3703 && this._regDay == 1) {
                        continue;
                    }
                    this._datas.push(cfg);
                }
            }
        }
        for (let i = this._datas.length - 1; i >= 0; i--) {
            const _data = this._datas[i];
            const selfDay = _data.kq;
            if (!(Model_GlobalMsg.kaifuDay >= selfDay)) {
                this._datas.splice(i, 1);
            }
        }
        this._datas.sort(this.sort);
        return this._datas;
    }
    private static sort(a: Ihdyl_259, b: Ihdyl_259) {
        const aSt = ModelActPreView.getState(a);
        const bSt = ModelActPreView.getState(b);
        return -aSt + bSt;
    }
    public static getState(data: Ihdyl_259) {
        const begin = data.start.split(":");
        const end = data.end.split(":");
        const date = new Date(Model_GlobalMsg.getServerTime());
        const beginDate = new Date(Model_GlobalMsg.getServerTime());
        beginDate.setHours(begin[0]);
        beginDate.setMinutes(begin[1]);
        const endDate = new Date(Model_GlobalMsg.getServerTime());
        endDate.setHours(end[0]);
        endDate.setMinutes(end[1]);
        if (date.getTime() > endDate.getTime()) {
            return 0;
        } else if (date.getTime() < beginDate.getTime()) {
            return 1;
        } else {
            return 2;
        }
    }
    private static isSuitable(cfg: Ihdyl_259 | number) {
        if (!(typeof cfg == "number")) {
            if (cfg.day > 10) {
                const mDay = cfg.day % 10 >> 0;
                if (TimeUitl.isIn7Days()) {
                    return mDay == Model_GlobalMsg.kaifuDay && cfg.close == 0;
                } else {
                    return mDay == Model_GlobalMsg.kaifuDay;
                }
            } else {
                const date = new Date(Model_GlobalMsg.getServerTime());
                const week = date.getDay() == 0 ? 7 : date.getDay();
                if (TimeUitl.isIn7Days()) {
                    return cfg.day == week && cfg.close == 0;
                } else {
                    return cfg.day == week;
                }
            }
        }
    }
    public static gotSt: number = 0;
    /**打开UI */
    private GC4050(self: ModelActPreView, bytes: BaseBytes) {
        ModelActPreView.gotSt = bytes.readByte();
        self.setIconNotice()
    }
    /**领取奖励 */
    public CG4051() { this.sendSocket(4051, this.getBytes()) }
    private GC4052(self: ModelActPreView, bytes: BaseBytes) {
        const state = bytes.readByte();
        if (state == 1) {
            ModelActPreView.gotSt = 1;
            self.setIconNotice()
            self.notify(ModelActPreView.msg_datas);
        }
    }
    public getNotice() {
        return !(ModelActPreView.gotSt == 1);
    }


    public static tSMsgSt: number = 0;
    /**打开UI */
    private GC4054(self: ModelActPreView, bytes: BaseBytes) {
        ModelActPreView.tSMsgSt = bytes.readByte();
        self.setIconNotice()
    }
    /**领取奖励 */
    public CG4055() { this.sendSocket(4055, this.getBytes()) }
    private GC4056(self: ModelActPreView, bytes: BaseBytes) {
        const state = bytes.readByte();
        if (state == 1) {
            ModelActPreView.tSMsgSt = 1;
            self.setIconNotice()
            self.notify(ModelActPreView.msg_tsmsg_red);
        }
    }
    public getTSMsgNotice() {
        if(ChildTuiSongMsg.isOpenPf()){
            return !(ModelActPreView.tSMsgSt == 1);
        }else{
            return false;
        }
    }

    private setIconNotice() {
        let self = this;
        var red = GGlobal.reddot.checkCondition(UIConst.DAILYTASK) || self.getNotice() || self.getTSMsgNotice();
        GGlobal.mainUICtr.setIconNotice(UIConst.DAILYTASK, red);
    }
    //openUI
    public CG7501() { this.sendSocket(7501, this.getBytes()) }

    public tsMsgArr: { tag: number, status: number }[] = [];
    private GC7502(self: ModelActPreView, bytes: BaseBytes) {
        let len = bytes.readShort();
        self.tsMsgArr = []
        for (let i = 0; i < len; i++) {
            self.tsMsgArr.push({ tag: bytes.readInt(), status: bytes.readByte() });
        }
        self.notify(ModelActPreView.msg_tsMsg);
    }

    //推送设置
    public CG7503(arr: { tag: number, status: number }[]) {
        if (arr == null || arr.length == 0) return;
        let b = this.getBytes()
        b.writeShort(arr.length)
        for (let i = 0; i < arr.length; i++) {
            b.writeInt(arr[i].tag)
            b.writeByte(arr[i].status)
        }
        this.sendSocket(7503, b)
    }
}