class ModelEightLock extends BaseModel {
    public static msg_datas = "msg_datas";
    public static msg_fwCol = "msg_fwCol";
    public static msg_fwJD = "msg_fwJD";
    public static msg_jdpm = "msg_jdpm";
    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        wsm.regHand(4522, this.GC4522, this);
        wsm.regHand(4524, this.GC4524, this);
        wsm.regHand(4526, this.GC4526, this);
        wsm.regHand(4528, this.GC4528, this);
        wsm.regHand(4530, this.GC4530, this);
        wsm.regHand(4532, this.GC4532, this);
        wsm.regHand(4520, this.GC4520, this);
        wsm.regHand(4590, this.GC4590, this);
        wsm.regHand(4592, this.GC4592, this);
        wsm.regHand(4610, this.GC4610, this);
        wsm.regHand(4612, this.GC4612, this);

        wsm.regHand(4570, this.GC4570, this);
        wsm.regHand(4572, this.GC4572, this);

        wsm.regHand(7302, this.GC7302, this);
    }
    /**八门金锁数据 */
    public _datas: Ibmjs_262[];
    public getDatas() {
        if (!this._datas) {
            this._datas = [];
            const lib = Config.bmjs_262;
            for (let key in lib) {
                this._datas.push(lib[key]);
            }
        }
        return this._datas;
    }
    public eightLockTaskDic: any = {};
    public eightLockBigRewDic: any = {};
    /**八阵图系统为等级以及开服天数共同控制开启
    ** 开服第8天开启,持续7天(配置系统开启表)
    */
    public checkAndOpenIcon() {
        const bool = ModelEightLock.hasActInEightLock();
        if (bool) {
            GGlobal.mainUICtr.addIconWithListener(UIConst.EIGHTLOCK);
            if (GGlobal.mainUICtr.getIcon(UIConst.EIGHTLOCK)) {
                GGlobal.mainUICtr.setIconNotice(UIConst.EIGHTLOCK, this.checkAllNoti());
            }
        } else {
            if (GGlobal.mainUICtr.getIcon(UIConst.EIGHTLOCK)) {
                GGlobal.mainUICtr.removeIcon(UIConst.EIGHTLOCK);
            }
        }
    }

    public getNotice(sysID: number) {
        return GGlobal.reddot.checkCondition(sysID, 0);
    }
    private getEightNot() {
        const lib = Config.bmjs_262;
        for (let key in lib) {
            const state = this.getState(lib[key].id);
            if (state == 1) {
                return true;
            }
        }
        return false;
    }
    /**通过八门id获取状态 */
    public getState(id: number) {
        const preId = id - 1;
        const preCfg = Config.bmjs_262[preId];
        if (this.eightLockBigRewDic[id] && this.eightLockBigRewDic[id].state == 2 && this.allTaskGot(id)) {//当前门的大奖已领取 和所有小奖 = 已完成
            return 0;
        } else {
            let bool1 = this.eightLockBigRewDic[id] && this.eightLockBigRewDic[id].state == 1;
            let bool2 = false;
            for (let key in this.eightLockTaskDic) {
                if (Config.bmjsrw_262[key].door == id && this.eightLockTaskDic[key].state == 1) {
                    bool2 = true;
                    break;
                }
            }
            if ((bool1 || bool2) && (!preCfg || (preCfg && this.eightLockBigRewDic[preCfg.id] && this.eightLockBigRewDic[preCfg.id].state == 2))) {//大奖可领取或者小奖可领取
                return 1;
            } else {
                if (!preCfg || (preCfg && this.eightLockBigRewDic[preCfg.id] && this.eightLockBigRewDic[preCfg.id].state == 2)) {//当前是第一个门或者当前门的上一个门大奖已领取
                    return 2;
                } else {
                    return 3;
                }
            }
        }
    }
    /**所有任务奖励的领取状态 */
    private allTaskGot(door: number) {
        let valid = 1;
        for (let key in this.eightLockTaskDic) {
            if (door == Config.bmjsrw_262[key].door) {
                valid &= (this.eightLockTaskDic[key].state == 2 ? 1 : 0);
            }
        }
        return !!valid;
    }
    /**通过任务状态获取状态 */
    public getTaskState(id: number) {
        return this.eightLockTaskDic[id] && this.eightLockTaskDic[id].state;
    }
    /**通过八门id获取总任务进度 */
    public getTotalTaskProg(id: number): { cur: number, max: number } {
        const lib = Config.bmjsrw_262;
        let count = 0;
        for (let key in lib) {
            if (lib[key].door == id) {
                count++;
            }
        }
        let count2 = 0;
        for (let key in this.eightLockTaskDic) {
            if (Config.bmjsrw_262[key].door == id && this.eightLockTaskDic[key].state != 0) {
                count2++;
            }
        }
        return { cur: count2, max: count };
    }
    /**通过任务id获取该任务进度 */
    public getTaskProg(id: number): { cur: number, max: number } {
        const num = this.eightLockTaskDic[id] ? this.eightLockTaskDic[id].cur : 0;
        return { cur: num, max: Config.bmjsrw_262[id].cs };
    }
    /**个人充值 */
    public static chongZhiValue: number;
    /**符文收集数据 */
    private _fwColDatas: Ifwsj_263[];
    public getFWColDatas() {
        if (!this._fwColDatas) {
            this._fwColDatas = [];
            const lib = Config.fwsj_263;
            for (let key in lib) {
                this._fwColDatas.push(lib[key]);
            }
        }
        return this._fwColDatas;
    }
    public fuwenColDic: any = {};
    /**符文鉴定数据 */
    private _fwDJDatas: Ifwjd_264[];
    public getFWJDDatas() {
        if (!this._fwDJDatas) {
            this._fwDJDatas = [];
            const lib = Config.fwjd_264;
            for (let key in lib) {
                this._fwDJDatas.push(lib[key]);
            }
        }
        return this._fwDJDatas;
    }
    public fuwenJDDic: any = {};
    /**符文有礼 */
    private _fwYLDatas: Ifwreward_265[];
    public getFWYLDatas() {
        if (!this._fwYLDatas) {
            this._fwYLDatas = [];
            const lib = Config.fwreward_265;
            for (let key in lib) {
                this._fwYLDatas.push(lib[key]);
            }
        }
        return this._fwYLDatas;
    }
    public checkAllNoti() {
        const bool1 = GGlobal.reddot.checkCondition(UIConst.EIGHTLOCK, 0);
        const bool2 = GGlobal.reddot.checkCondition(UIConst.FUWENCOLLECT, 0);
        const bool3 = GGlobal.reddot.checkCondition(UIConst.FUWENJIANDING, 0);
        const bool4 = GGlobal.reddot.checkCondition(UIConst.FUWENYOULI, 0);
        const bool5 = GGlobal.reddot.checkCondition(UIConst.AUTHEN_RANK, 0);
        return bool1 || bool2 || bool3 || bool4 || bool5;
    }
    /**打开八门金锁 */
    public CG4521() { this.sendSocket(4521, this.getBytes()) }
    private GC4522(self: ModelEightLock, bytes: BaseBytes) {
        let len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            const id = bytes.readInt();
            self.eightLockTaskDic[id] = { id: id, cur: bytes.readInt(), state: bytes.readByte() };
        }
        len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            const id = bytes.readInt();
            self.eightLockBigRewDic[id] = { id: id, state: bytes.readByte() };
        }
        ModelEightLock.chongZhiValue = bytes.readInt();//充值金额
        const not = self.getEightNot();
        GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
        self.checkAndOpenIcon();
        self.notify(ModelEightLock.msg_datas);
    }
    /**领取任务 */
    public CG4523(id: number) {
        const bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4523, bytes);
    }
    private GC4524(self: ModelEightLock, bytes: BaseBytes) {
        //4524 GC 领取任务奖励 I:任务idB:领取结果0成功 1失败 
        let taskId = bytes.readInt();
        let result = bytes.readByte();
        if (result == 0) {//成功
            self.eightLockTaskDic[taskId].state = 2;
            const not = self.getEightNot();
            GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
            self.checkAndOpenIcon();
            self.notify(ModelEightLock.msg_datas);
        } else {
            ViewCommonWarn.text("领取条件不足!");
        }
    }
    /**领取大奖 */
    public CG4525(id: number) {
        const bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4525, bytes);
    }
    private GC4526(self: ModelEightLock, bytes: BaseBytes) {
        //4526 GC 获取大奖结果 I:目标idB:领取结果0成功 1失败 
        let taskId = bytes.readInt();
        let result = bytes.readByte();
        if (result == 0) {
            self.eightLockBigRewDic[taskId].state = 2;
            const not = self.getEightNot();
            GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
            self.checkAndOpenIcon();
            self.notify(ModelEightLock.msg_datas);
        } else {
            ViewCommonWarn.text("条件未达");
        }
    }
    /**小任务更新 */
    private GC4528(self: ModelEightLock, bytes: BaseBytes) {
        const len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            const id: number = bytes.readInt();
            self.eightLockTaskDic[id] = { id: id, cur: bytes.readInt(), state: bytes.readByte() };
        }
        const not = self.getEightNot();
        GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
        self.checkAndOpenIcon();
        self.notify(ModelEightLock.msg_datas);
    }
    /**大奖变化 */
    private GC4530(self: ModelEightLock, bytes: BaseBytes) {
        const len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            const id = bytes.readInt();
            self.eightLockBigRewDic[id] = { id: id, state: bytes.readByte() };
        }
        const not = self.getEightNot();
        GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
        self.checkAndOpenIcon();
        self.notify(ModelEightLock.msg_datas);
    }
    private GC4532(self: ModelEightLock, bytes: BaseBytes) {
        ModelEightLock.chongZhiValue = bytes.readInt();
        self.notify(ModelEightLock.msg_datas);
    }
    public static originalDatas: { [sysID: number]: IEightAct } = {};
    private GC4520(self: ModelEightLock, bytes: BaseBytes) {
        //4520	I-B-I-I-IGC 活动情况 I:系统idB:状态0开启中1结束I:期数I:开始时间I:结束时间
        const sysID = bytes.readInt();
        const state = bytes.readByte();
        const qishu = bytes.readInt();
        const start = bytes.readInt();
        const end = bytes.readInt();
        ModelEightLock.originalDatas[sysID] = <any>{ sysID: sysID, state: state, qishu: qishu, start: start, end: end };
        self.checkAndOpenIcon();
        GGlobal.control.listen(Enum_MsgType.REDDOT_NOTICE, self.checkAndOpenIcon, self);//红点比这个迟!
    }
    public static hasActInEightLock() {
        const datas = this.originalDatas;
        for (let key in datas) {
            const info: IEightAct = datas[key];
            if (info.sysID == UIConst.EIGHTLOCK || info.sysID == UIConst.FUWENCOLLECT || info.sysID == UIConst.FUWENJIANDING || info.sysID == UIConst.FUWENYOULI || info.sysID == UIConst.AUTHEN_RANK) {
                return info.state == 0;
            }
        }
        return false;
    }

    /**是否有每日直购（8-28）活动 */
    public static hasActInZhiGou() {
        const datas = this.originalDatas;
        for (let key in datas) {
            const info: IEightAct = datas[key];
            if (info.sysID == UIConst.ZHI_GOU828) {
                return true;
            }
        }
        return false;
    }

    /** */
    public static pinZhiDic: any = {};
    //符文收集
    private GC4590(self: ModelEightLock, bytes: BaseBytes) {
        const len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            self.fuwenColDic[bytes.readInt()] = bytes.readInt();//1可领 2已领取
        }
        for (let i = 0, len2 = bytes.readShort(); i < len2; i++) {
            ModelEightLock.pinZhiDic[bytes.readInt()] = bytes.readInt();
        }
        GGlobal.reddot.setCondition(UIConst.FUWENCOLLECT, 0, self.noticeFWSJ());
        self.notify(ModelEightLock.msg_fwCol);
    }
    //符文收集-领取奖励
    public CG4591(id: number) {
        const bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4591, bytes);
    }
    private GC4592(self: ModelEightLock, bytes: BaseBytes) {
        const state = bytes.readByte();
        if (state == 1) {
            self.fuwenColDic[bytes.readInt()] = 2;
            GGlobal.reddot.setCondition(UIConst.FUWENCOLLECT, 0, self.noticeFWSJ());
            self.notify(ModelEightLock.msg_fwCol);
        } else {
            ViewCommonWarn.text("条件未达!");
        }
    }
    public static hasJianDing: number = 0;
    /**符文鉴定 */
    private GC4610(self: ModelEightLock, bytes: BaseBytes) {
        ModelEightLock.hasJianDing = bytes.readInt();
        const len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            self.fuwenJDDic[bytes.readInt()] = 2;
        }
        GGlobal.reddot.setCondition(UIConst.FUWENJIANDING, 0, self.noticeFWJD());
        self.notify(ModelEightLock.msg_fwJD);
    }
    /**符文鉴定-领取奖励 */
    public CG4611(id: number) {
        const bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4611, bytes);
    }
    private GC4612(self: ModelEightLock, bytes: BaseBytes) {
        const state = bytes.readByte();
        if (state == 1) {
            self.fuwenJDDic[bytes.readInt()] = 2;
            GGlobal.reddot.setCondition(UIConst.FUWENJIANDING, 0, self.noticeFWJD());
            self.notify(ModelEightLock.msg_fwJD);
        } else {
            ViewCommonWarn.text("条件未达!");
        }
    }
    public getFWDJState(data: Ifwjd_264) {
        const state = GGlobal.modelEightLock.fuwenJDDic[data.id];
        if (state > 1) {
            return state;
        } else {
            return ModelEightLock.hasJianDing >= data.time ? 1 : 0;
        }
    }
    /** */
    private GC4570(self: ModelEightLock, bytes: BaseBytes) {
        const len = bytes.readShort();
        const servTime = Model_GlobalMsg.getServerTime() / 1000;
        for (let i = 0; i < len; i++) {
            const type = bytes.readInt();//type 没用 留坑给扩展填
            const sysID = bytes.readInt();
            const qishu = bytes.readInt();
            const start = bytes.readInt();
            const end = bytes.readInt();
            const state = servTime > start && servTime < end ? 1 : 0;
            if (state == 1) {
                ModelEightLock.originalDatas[sysID] = <any>{ sysID: sysID, state: state, qishu: qishu, start: start, end: end, type: type };
            } else {
                if (ModelEightLock.originalDatas[sysID]) {
                    delete ModelEightLock.originalDatas[sysID];
                }
            }
            ModelEightLock.checkAndOpenAct(type, state);
        }
        // Model_Activity.checkAndOpenAct();
        // GGlobal.modelShaoZhuAct.checkAndOpenIcon();
        GGlobal.control.notify(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM);
    }
    //更新活动状态 B:更新类型：0：结束，1：开启I:分类表唯一idI:系统idI:期数I:开始时间I:结束时间
    private GC4572(self: ModelEightLock, bytes: BaseBytes) {
        const state = bytes.readByte();
        const type = bytes.readInt();//type 没用 留坑给扩展填
        const sysID = bytes.readInt();
        const qishu = bytes.readInt();
        const start = bytes.readInt();
        const end = bytes.readInt();
        if (state == 1) {
            ModelEightLock.originalDatas[sysID] = <any>{ sysID: sysID, state: state, qishu: qishu, start: start, end: end, type: type };
        } else {
            if (ModelEightLock.originalDatas[sysID]) {
                delete ModelEightLock.originalDatas[sysID];
            }
        }
        ModelEightLock.checkAndOpenAct(type, state);
        // Model_Activity.checkAndOpenAct();
        // GGlobal.modelShaoZhuAct.checkAndOpenIcon();
        GGlobal.control.notify(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM);
    }

    public static rankData = [];
    public static modId: number = 0;
    public static myjdCount: number = 0;
    public static myRank: number = 0;
    public static endTime: number = 0;
    public static headData = [];
    /**打开界面返回 [U:名字I:鉴定次数]排行I:第一名职业时装（job*1000+时装id），没有则为0[I:头像id，没有则为0I:头像框I:国家I:vip等级]第二，第三名头像id，国家，vip等级I:我的鉴定次数I:我的排名I:结束时间*/
    private GC7302(self: ModelEightLock, bytes: BaseBytes) {
        ModelEightLock.rankData = [];
        ModelEightLock.headData = [];
        let len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            let rank: AuthenRankVO = new AuthenRankVO();
            rank.readMsg(bytes);
            if (rank.jdCount >= Config.xtcs_004[6801].num) {
                ModelEightLock.rankData.push(rank);
            }
        }
        ModelEightLock.modId = bytes.readInt();
        len = bytes.readShort();
        for (let j = 0; j < len; j++) {
            let headVO: AuthenHeadVO = new AuthenHeadVO();
            headVO.readMsg(bytes);
            let rank: AuthenRankVO = ModelEightLock.rankData[j + 1];
            if (rank && rank.jdCount >= Config.xtcs_004[6801].num) {
                ModelEightLock.headData.push(headVO);
            }
        }
        ModelEightLock.myjdCount = bytes.readInt();
        ModelEightLock.myRank = bytes.readInt();
        ModelEightLock.endTime = bytes.readInt();

        const not = self.getAuthenNot();
        GGlobal.reddot.setCondition(UIConst.AUTHEN_RANK, 0, not);

        self.notify(ModelEightLock.msg_jdpm);
    }

    /**判断鉴定排行的红点 */
    public getAuthenNot(): boolean {
        const end = ModelEightLock.endTime;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        const timeRemain = end - servTime;
        if (Model_Bag.getItemCount(410046) > 0 && timeRemain > 0) {
            return true;
        }
        return false;
    }

    public static getActivity(uiId: number): Vo_Activity[] {
        let arr = [];
        for (let keys in ModelEightLock.originalDatas) {
            let v = ModelEightLock.originalDatas[keys];
            let cfg = Config.hdfl_012[v.type];
            if (cfg && cfg.type == uiId) {
                let act: Vo_Activity = new Vo_Activity();
                act.end = v.end;
                act.start = v.start;
                act.id = v.sysID;
                act.groupId = cfg.type;
                act.qs = v.qishu;
                act.sortNum = ~~cfg["px"];
                act.icon = v.sysID + "";
                arr.push(act);
            }
        }
        return arr;
    }

    public static getActVo(id) {
        for (let keys in ModelEightLock.originalDatas) {
            let v = ModelEightLock.originalDatas[keys];
            if (v.sysID != id) continue;
            let cfg = Config.hdfl_012[v.type]
            if (cfg) {
                let act: Vo_Activity = new Vo_Activity();
                act.end = v.end;
                act.start = v.start;
                act.id = v.sysID;
                act.groupId = cfg.type;
                act.qs = v.qishu;
                act.sortNum = ~~cfg["px"];
                return act;
            }
        }
        return null
    }
    /**打开各系统 */
    public CG4571(sysID: number) {
        const bytes = this.getBytes();
        bytes.writeInt(sysID);
        this.sendSocket(4571, bytes);
    }

    /**7301 打开界面 */
    public CG_OPEN_UI() {
        const bytes = this.getBytes();
        this.sendSocket(7301, bytes);
    }

    /**符文收集红点 */
    public noticeFWSJ() {
        let bool = false;
        for (let key in Config.fwsj_263) {
            const state = GGlobal.modelEightLock.fuwenColDic[key];
            if (state == 1) {
                bool = true;
                break;
            }
        }
        return bool;
    }
    /**符文鉴定红点 */
    public noticeFWJD() {
        let bool = false;
        for (let key in Config.fwjd_264) {
            const state = this.getFWDJState(Config.fwjd_264[key]);
            if (state == 1) {
                bool = true;
                break;
            }
        }
        return bool;
    }

    /**图标为等级以及开服天数共同控制开启
    ** 开服第8天开启,持续7天(配置系统开启表)
    */
    public static checkAndOpenAct(type: number, bool: number) {
        let cfg: Ihdfl_012 = Config.hdfl_012[type];
        if (!cfg) return;

        let bigActID: number = cfg.type;//大活动图标id
        const redDot = GGlobal.reddot.checkCondition(bigActID, 0);
        if (bool == 1) {//开启
            GGlobal.mainUICtr.addIconWithListener(bigActID);
            GGlobal.mainUICtr.setIconNotice(bigActID, redDot);
        } else {
            let actArr = ModelEightLock.getActivity(bigActID);
            if (actArr.length <= 0 && GGlobal.mainUICtr.getIcon(bigActID)) {
                GGlobal.mainUICtr.removeIcon(bigActID);
            }
        }
    }

}
interface IEightAct {
    type: number;//没用 留坑
    sysID: number;
    state: number;
    qishu: number;
    start: number;
    end: number;
}