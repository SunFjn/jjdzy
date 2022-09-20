class ModelLvBuComeUp extends BaseModel {
    public static readonly msg_datas: string = "msg_datas";
    public static readonly msg_paiHang: string = "msg_paiHang";
    public static readonly msg_single:string = "msg_single";
    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        const self = this;
        wsm.regHand(2712, self.GC2712, self);
        wsm.regHand(2714, self.GC2714, self);
        wsm.regHand(2716, self.GC2716, self);
    }
    public datas: Record<string, IPaiHangInfo> = {};//排名数据
    public paimingMine: number;//我的排名
    public jifenMine: number;//我的积分
    public awardGetInfo: Record<string, IAwardGet> = {};
    /**打开UI */
    public CG2711() { this.sendSocket(2711, this.getBytes()) }
    private GC2712(self: ModelLvBuComeUp, bytes: BaseBytes) {
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            var paiming: number = bytes.readByte();
            var data: IPaiHangInfo = self.datas[paiming] || (self.datas[paiming] = <any>{});
            data.name = bytes.readUTF();
            data.job = bytes.readInt();
            data.head = bytes.readInt();
            data.headBg = bytes.readInt();
            data.jiFen = bytes.readInt();
        }
        var gotInfo = {};
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            gotInfo[bytes.readByte()] = true;
        }
        self.paimingMine = bytes.readByte();
        self.jifenMine = bytes.readInt();
        self.prepareDatas();
        self.updateJLInfos(gotInfo);
        self.notify(ModelLvBuComeUp.msg_datas);
    }
    /**打开排行榜 */
    public CG2713() { this.sendSocket(2713, this.getBytes()) }
    private GC2714(self: ModelLvBuComeUp, bytes: BaseBytes) {
        var datas = [];
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            var paiming: number = bytes.readByte();
            var name: string = bytes.readUTF();
            var jifen: number = bytes.readInt();
            datas.push([paiming, name, jifen]);
        }
        self.notify(ModelLvBuComeUp.msg_paiHang, datas);
    }
    /**领取奖励 */
    public CG2715(cfgId: number) {
        var bytes = this.getBytes();
        bytes.writeByte(cfgId);
        this.sendSocket(2715, bytes);
    }
    private GC2716(self: ModelLvBuComeUp, bytes: BaseBytes) {
        var state: number = bytes.readByte();
        if (state == 1) {
            var cfgId: number = bytes.readByte();
            var data = self.awardGetInfo[cfgId];
            if(data) {
                data.state = 2;
            }
            self.updateJLInfos();
            GGlobal.layerMgr.close2(UIConst.VIEWLBGETJL);
            self.notify(ModelLvBuComeUp.msg_single, data);
        } else {
            ViewCommonWarn.text("领取失败");
        }
    }
    private cfgHasInit: boolean = false;
    private updateJLInfos(gotIds?: any) {
        const self = this;
        if (!self.cfgHasInit) {
            self.cfgHasInit = true;
            var lib = Config.lbjlpoint_250;
            for (let key in lib) {
                self.awardGetInfo[key] = <any>{ cfgId: key, jifen: lib[key].point, awards: lib[key].reward, state: 0 };
            }
        }
        var mineJifen = this.jifenMine;
        for (let key in self.awardGetInfo) {
            var hasGotId = gotIds && gotIds[key];
            var info = self.awardGetInfo[key];
            if (hasGotId) {
                info.state = 2;
            } else {
                if(info.state != 2) {
                    info.state = mineJifen >= info.jifen ? 1 : 0;
                }
            }
        }
    }
    private curDatLen: number = 0;
    private prepareDatas() {
        const self = this;
        var lib = Config.lbjl_250;
        var lib2 = Config.lbjlpoint_250;
        if (this.curDatLen < Object.keys(lib).length) {
            for (let key in lib) {
                var cfg = lib[key];
                if (!self.datas[key]) {
                    var data: IPaiHangInfo = self.datas[key] = <any>{};
                    data.headBg = null;
                    data.head = null;
                    data.jiFen = lib2[key].point;
                    data.job = null;
                    data.name = "虚位以待";
                    data.paiming = parseInt(key);
                    self.curDatLen++;
                }
            }
        }
    }
    public canGetJLIndex() {
        const self = this;
        var cntGot:number = 0;
        var cntNotGot:number = -1;
        var len:number = Object.keys(self.awardGetInfo).length;
        for (let key in self.awardGetInfo) {
            var data = self.awardGetInfo[key];
            if (data.state == 1) {
                break;
            }else if(data.state == 0) {
                if(cntNotGot >= 0) {
                    cntNotGot = Math.min(cntNotGot, cntGot);
                }else {
                    cntNotGot = cntGot;
                }
            }
            cntGot++;
        }
        if(cntGot == len) {
            cntGot = cntNotGot;
        }
        var ret = Math.max(0, Math.min(cntGot, len - 4));
        return ret;
    }
    private static _max:number;
    public static getMaxJL() {
        if(this._max) {
            return this._max;
        }
        var lib = Config.lbjlpoint_250;
        var targetKey;
        for(let key in lib) {
            targetKey = key;
        }
        return this._max = lib[targetKey].point;
    }
}
interface IPaiHangInfo {
    paiming: number;
    name: string;
    job: number;
    head: number;
    headBg: number;
    jiFen: number;
}
interface IAwardGet {
    cfgId: number;
    jifen: number;
    awards: string;
    state: number;
}