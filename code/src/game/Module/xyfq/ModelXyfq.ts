/**
 * 幸运福签管理器
 * @author: lujiahao 
 * @date: 2020-04-07 10:49:36 
 */
class ModelXyfq extends BaseModel {
    constructor() {
        super();
    }

    public countDaily = 0;
    public countTotal = 0;

    private _taskVoMap: { [key: string]: VoTaskXyfq } = {};

    /** 我的排名 */
    public myRankId = 0;
    /** 我的排行抽签次数 */
    public myRankCount = 0;

    /** 是否播放动画 */
    public isPlayMc = true;

    /** 福签id列表 */
    public qianIdList = [
        448005,
        448004,
        448003,
        448002,
        448001,
    ];

    private _setupFlag = false;
    public setup() {
        let t = this;
        if (t._setupFlag)
            return;
        t._setupFlag = true;

        {
            let t_cfg = Config.xyfqmr_508;
            for (let k in t_cfg) {
                let t_id = ~~k;
                let t_vo = new VoTaskXyfq();
                t_vo.type = 2;
                t_vo.id = t_id;
                t_vo.key = StringUtil.combinKey([t_vo.type, t_vo.id]);
                t._taskVoMap[t_vo.key] = t_vo;
            }
        }

        {
            let t_cfg = Config.xyfqhd_508;
            for (let k in t_cfg) {
                let t_id = ~~k;
                let t_vo = new VoTaskXyfq();
                t_vo.type = 1;
                t_vo.id = t_id;
                t_vo.key = StringUtil.combinKey([t_vo.type, t_vo.id]);
                t._taskVoMap[t_vo.key] = t_vo;
            }
        }
    }
    //========================================= 协议相关 ========================================
    public listenServ(mgr: WebSocketMgr) {
        super.listenServ(mgr);
        //注册GC方法
        mgr.regHand(12150, this.GC_LuckSign_openUI_12150, this);
        mgr.regHand(12152, this.GC_LuckSign_draw_12152, this);
        mgr.regHand(12154, this.GC_LuckSign_openRankUI_12154, this);
        mgr.regHand(12156, this.GC_LuckSign_getTargetAward_12156, this);
        mgr.regHand(12158, this.GC_LuckSign_getAward_12158, this);
        mgr.regHand(12160, this.GC_LuckSign_openLuckSign_12160, this);
    }

    /**12150 [I-B]-[I-B]-I-I 打开界面返回 [I:总的目标奖励idB:状态0不可领取 1可领取 2已领取]总的目标奖励数据awardList[I:每日目标奖励idB:状态0不可领取 1可领取 2已领取]每日目标奖励数据awardList1I:总抽签次数numI:每日抽签次数dayNum*/
    public GC_LuckSign_openUI_12150(self: ModelXyfq, data: BaseBytes): void {
        let t_change = false;
        let t_type = 1;
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readInt();
            let arg2 = data.readByte();

            let t_vo = self.getTaskVoByTypeAndId(t_type, arg1);
            if (t_vo && t_vo.update({ state: arg2 })) {
                t_change = true;
            }
        }

        t_type = 2;
        len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg3 = data.readInt();
            let arg4 = data.readByte();

            let t_vo = self.getTaskVoByTypeAndId(t_type, arg3);
            if (t_vo && t_vo.update({ state: arg4 })) {
                t_change = true;
            }
        }

        let arg5 = data.readInt();
        let arg6 = data.readInt();

        if (self.countTotal != arg5) {
            self.countTotal = arg5;
            t_change = true;
        }
        if (self.countDaily != arg6) {
            self.countDaily = arg6;
            t_change = true;
        }

        self.reddotCheckComp();
        self.reddotCheckOpen();
        self.reddotCheckTask();
        ReddotMgr.ins().setValue(UIConst.XYFQ + "|" + 1, 0); //灭了后端红点

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XYFQ_UPDATE);
        }
    }

    /**12151 B 抽福签 B:抽奖次数 1代表1次 2代表10次type*/
    public CG_LuckSign_draw_12151(pType: number): void {
        let t = this;
        var bates = this.getBytes();
        let t_consume: IGridImpl;
        if (pType == 1) {
            t_consume = t.consumeOne;
        }
        else {
            t_consume = t.consumeTen;
        }
        if (!FastAPI.checkItemEnough(t_consume.id, t_consume.count, true))
            return;
        bates.writeByte(pType);
        this.sendSocket(12151, bates);
    }

    /**12152 B-[B-I-I]-I-I 抽福签返回 B:状态 0成功 1元宝不足state[B:道具类型I:道具idI:道具数量]道具数据awardListI:总抽签次数numI:每日抽签次数dayNum*/
    public GC_LuckSign_draw_12152(self: ModelXyfq, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readByte();

        switch (arg1) {
            case 0: //成功
                break;
            case 1: //元宝不足
                return;
        }

        let t_list = [];
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg2 = data.readByte();
            let arg3 = data.readInt(); //id
            let arg4 = data.readInt(); //数量

            t_list.push([arg3, arg4]);
        }
        let arg5 = data.readInt();
        let arg6 = data.readInt();

        if (self.countTotal != arg5) {
            self.countTotal = arg5;
            t_change = true;
        }
        if (self.countDaily != arg6) {
            self.countDaily = arg6;
            t_change = true;
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XYFQ_DRAW_SUCCESS, t_list);
            self.reddotCheckOpen();
            self.reddotCheckComp();
            self.reddotCheckTask();
        }
    }

    /**12153  打开排行 */
    public CG_LuckSign_openRankUI_12153(): void {
        var bates = this.getBytes();
        this.sendSocket(12153, bates);
    }

    /**12154 [S-U-I]-S-I 打开排行返回 [S:排名U:玩家名字I:抽福袋次数]排行数据awardListS:我的排名myRankI:我的次数myTimes*/
    public GC_LuckSign_openRankUI_12154(self: ModelXyfq, data: BaseBytes): void {
        let t_change = false;

        let t_rankVoList = self.getRankCfgList();
        let t_checkMap = {};
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readShort(); //排名 从1开始
            let arg2 = data.readUTF(); //名字
            let arg3 = data.readInt(); //抽签次数

            let t_vo = t_rankVoList[arg1 - 1];
            if (t_vo) {
                //存在则修改原有数据
                t_checkMap[arg1] = true;
                if (t_vo.update({ name: arg2, count: arg3 })) {
                    t_change = true;
                }
            }
        }
        for (let v of t_rankVoList) {
            if (t_checkMap[v.rank])
                continue;
            if (v.reset())
                t_change = true;
        }

        let arg4 = data.readShort(); //我的排名
        let arg5 = data.readInt(); //我的抽签次数

        if (self.myRankId != arg4) {
            self.myRankId = arg4;
            t_change = true;
        }
        if (self.myRankCount != arg5) {
            self.myRankCount = arg5;
            t_change = true;
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XYFQ_RANK_UPDATE);
        }
    }

    /**12155 B-I 领取目标奖励 B:领取类型 1是总的目标类型 2是每日目标类型sysIdI:配置表idawardId*/
    public CG_LuckSign_getTargetAward_12155(pType, pId): void {
        var bates = this.getBytes();
        bates.writeByte(pType);
        bates.writeInt(pId);
        this.sendSocket(12155, bates);
    }

    /**12156 B-B-I 领取目标奖励返回 B:状态 0成功 1配置表不存在 2期数不对 3不可领取 4已领取stateB:领取类型 1是总的目标类型 2是每日目标类型sysIdI:目标表idid*/
    public GC_LuckSign_getTargetAward_12156(self: ModelXyfq, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte();
        let arg2 = data.readByte();
        let arg3 = data.readInt();

        switch (arg1) {
            case 0: //成功
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }

        let t_vo = self.getTaskVoByTypeAndId(arg2, arg3);
        if (t_vo && t_vo.hasGet == false) {
            t_vo.hasGet = true;
            t_change = true;
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XYFQ_TASK_UPDATE, { type: arg2 });
            self.reddotCheckTask();
        }
    }

    /**12157 I-I 合成福签 I:配置表ididI:合成的数量num*/
    public CG_LuckSign_getAward_12157(pItemId: number, pCount: number): void {
        let t = this;
        if (pCount <= 0)
            return;
        let t_vo = t.getQianVoById(pItemId);
        if (!t_vo)
            return;
        if (!t_vo.checkCanComp(true, pCount))
            return;
        var bates = this.getBytes();
        bates.writeInt(pItemId);
        bates.writeInt(pCount);
        this.sendSocket(12157, bates);
    }

    /**12158 B 合成福签返回 B:状态 0成功 1配置表不存在 2道具不足state*/
    public GC_LuckSign_getAward_12158(self: ModelXyfq, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0: //成功
                self.reddotCheckOpen();
                self.reddotCheckComp();
                GGlobal.control.notify(Enum_MsgType.XYFQ_UPDATE);
                break;
        }
    }

    /**12159 I-I 开启福签 I:配置表idindexI:道具数量count*/
    public CG_LuckSign_openLuckSign_12159(arg1, pCount: number): void {
        let t = this;
        if (pCount <= 0) {
            ViewCommonWarn.text("请选择数量");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(arg1);
        bates.writeInt(pCount);
        this.sendSocket(12159, bates);
    }

    /**12160 B-[B-I-I-B] 开启福签返回 B:状态 0成功 1道具不足 2配置表不存在state[B:道具类型I:道具idI:道具数量B:是否大奖 0不是 1是]道具数据awardList*/
    public GC_LuckSign_openLuckSign_12160(self: ModelXyfq, data: BaseBytes): void {
        let arg1 = data.readByte();

        switch (arg1) {
            case 0: //成功
                break;
            default:
                return;
        }

        let t_list: IGridImpl[] = [];

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg2 = data.readByte();
            let arg3 = data.readInt();
            let arg4 = data.readInt();
            let arg5 = data.readByte();

            let t_item = ConfigHelp.makeItem([arg2, arg3, arg4]);
            t_item.extra = arg5 ? 5 : 0;
            t_list.push(t_item);
        }

        if (t_list.length) {
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, t_list);
        }

        self.reddotCheckComp();
        self.reddotCheckOpen();

        //更新标签数量
        GGlobal.control.notify(Enum_MsgType.XYFQ_UPDATE);
    }

    //=========================================== API ==========================================
    /** 当前活动期数 */
    public get curQs(): number {
        let t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.XYFQ);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    }

    private _qianVoList: VoQianXyfq[];
    private _qianVoMap: { [id: number]: VoQianXyfq } = {};
    /** 获取福签数据列表 */
    public getQianVoList(): VoQianXyfq[] {
        let t = this;
        if (t._qianVoList === undefined) {
            t._qianVoList = [];
            for (let id of t.qianIdList) {
                let t_vo = new VoQianXyfq();
                t_vo.id = id;
                t._qianVoList.push(t_vo);
                t._qianVoMap[id] = t_vo;
            }
        }
        return t._qianVoList;
    }

    /** 获取合成的福签数据列表 */
    public getCompQianVoList(): VoQianXyfq[] {
        let t = this;
        let t_source = t.getQianVoList();
        let t_list = [];
        for (let v of t_source) {
            if (Config.xyfqhc_508[v.id]) {
                t_list.push(v);
            }
        }
        return t_list;
    }

    public getQianVoById(pId: number) {
        let t = this;
        t.getQianVoList();
        return t._qianVoMap[pId];
    }

    private _taskVoListTypeMap: { [type: number]: { [qs: number]: VoTaskXyfq[] } } = {};
    /**
     * 通过类型获取当前期数的任务目标列表
     * @param pType 1总目标 2每日目标
     */
    public getTaskVoListByType(pType: number): VoTaskXyfq[] {
        let t = this;
        let t_qs = t.curQs;
        let t_map = t._taskVoListTypeMap[pType];
        if (t_map === undefined) {
            t._taskVoListTypeMap[pType] = t_map = {};
        }
        let t_list = t_map[t_qs];
        if (t_list === undefined) {
            t_map[t_qs] = t_list = [];
            for (let k in t._taskVoMap) {
                let t_vo = t._taskVoMap[k];
                if (t_vo && t_vo.type == pType && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    public getTaskVoByTypeAndId(pType: number, pId: number): VoTaskXyfq {
        let t = this;
        let t_key = StringUtil.combinKey([pType, pId]);
        return t._taskVoMap[t_key];
    }

    private _rankCfgListMap: { [qs: number]: VoRankXyfq[] } = {};
    /** 获取排行榜位置vo列表 */
    public getRankCfgList(): VoRankXyfq[] {
        let t = this;
        let t_qs = t.curQs;
        let t_list = t._rankCfgListMap[t_qs];
        if (t_list === undefined) {
            t._rankCfgListMap[t_qs] = t_list = [];
            let t_cfg = Config.xyfqrank_508;
            for (let k in t_cfg) {
                let t_obj = t_cfg[k];
                if (t_obj.qs != t_qs)
                    continue;
                let t_rankList = JSON.parse(t_obj.rank);
                let t_min = ~~t_rankList[0][0];
                let t_max = ~~t_rankList[0][1];
                for (let i = t_min; i <= t_max; i++) {
                    let t_vo = new VoRankXyfq();
                    t_vo.id = ~~k;
                    t_vo.rank = i;
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    private _consumeOne: IGridImpl;
    /** 抽单次消耗 */
    public get consumeOne(): IGridImpl {
        let t = this;
        if (t._consumeOne === undefined) {
            let t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7952));
            t._consumeOne = t_list[0];
        }
        return t._consumeOne;
    }

    private _consumeTen: IGridImpl;
    /** 抽十次消耗 */
    public get consumeTen(): IGridImpl {
        let t = this;
        if (t._consumeTen === undefined) {
            let t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7953));
            t._consumeTen = t_list[0];
        }
        return t._consumeTen;
    }

    private _rankRequire: number;
    /** 排行前三要求 */
    public get rankRequire(): number {
        let t = this;
        if (t._rankRequire === undefined) {
            t._rankRequire = ~~FastAPI.getSystemValue(7954);
        }
        return t._rankRequire;
    }

    //===================================== private method =====================================
    private reddotCheckComp() {
        let t = this;
        let t_value = 0;
        let t_list = t.getCompQianVoList();
        for (let v of t_list) {
            if (v.checkCanComp(false)) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(ReddotEnum.VALUE_XYFQ_CAN_COMP, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    }

    private reddotCheckOpen() {
        let t = this;
        let t_value = 0;
        let t_list = t.getQianVoList();
        for (let v of t_list) {
            if (v.checkCanOpen(false)) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(ReddotEnum.VALUE_XYFQ_CAN_OPEN, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    }

    private reddotCheckTask() {
        let t = this;
        {
            let t_value = 0;
            let t_list = t.getTaskVoListByType(1);
            for (let v of t_list) {
                if (v.state == 1) {
                    t_value = 1;
                    break;
                }
            }
            ReddotMgr.ins().setValue(ReddotEnum.VALUE_XYFQ_TASK_TOTAL, t_value);
        }
        {
            let t_value = 0;
            let t_list = t.getTaskVoListByType(2);
            for (let v of t_list) {
                if (v.state == 1) {
                    t_value = 1;
                    break;
                }
            }
            ReddotMgr.ins().setValue(ReddotEnum.VALUE_XYFQ_TASK_DAILY, t_value);
        }
        GGlobal.reddot.notify(UIConst.ACTCOM);
    }
    //======================================== handler =========================================
}