class ModelCtryBoss extends BaseModel {
    public static readonly msg_datas = "msg_datas";
    public static readonly msg_batInfo = "msg_batInfo";
    public static readonly msg_beenKiller = "msg_beenKiller";//更新被杀的玩家
    public static readonly msg_bossBeenKill = "msg_bossBeenKill";//boss已被杀
    public data: {
        curBossId: number, bossMaxHp: number, bossHp: number,
        killers: { [bossId: number]: string }, leftCount: number, states: { [bossId: number]: number }, remainLeftCnt: number
    }= {curBossId:1, bossMaxHp:0, bossHp:0, killers:[], leftCount:5, states:[], remainLeftCnt:5};
    /**战斗信息 */
    public battleInfo: {
        myHp: number, bossMaxHp: number, bossHp: number, myDamage: number, others: { name: string, demage: number }[]
    } = <any>{ bossHp: 1 };

    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        const self = this;
        wsm.regHand(3202, self.GC3202, self);
        wsm.regHand(3204, self.GC3204, self);
        wsm.regHand(3206, self.GC3206, self);
        wsm.regHand(3208, self.GC3208, self);
        wsm.regHand(3210, self.GC3210, self);
        wsm.regHand(3212, self.GC3212, self);
        wsm.regHand(3214, self.GC3214, self);
        wsm.regHand(3216, self.GC3216, self);
        wsm.regHand(3218, self.GC_OPEN_COUNTRYBOSS_RANK, self);
        wsm.regHand(3220, self.GC_OPEN_COUNTRYRANK, self);
    }

    public myRankArr: { playerId: number, name: string, hurt: number }[] = [];
    public countryRankArr: { countryId: number, countryNum: number }[] = [];
    public bossID: number = 0;
    public myhurt: number = 0;
    /**3219	GC 打开国家排行 */
    public CG_OPEN_COUNTRYRANK() {
        let ba = new BaseBytes();
        this.sendSocket(3219, ba);
    }

    /**3220	GC 国家排行 [I:国家idI:国家boss]国家排行 */
    public GC_OPEN_COUNTRYRANK(self: ModelCtryBoss, bytes: BaseBytes): void {
        self.countryRankArr = [];
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            let countryId = bytes.readInt();
            let countryNum = bytes.readInt();
            self.countryRankArr[i] = { countryId: countryId, countryNum: countryNum };
        }
        GGlobal.control.notify(Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE);
    }

    /**3218	GC打开排行榜 B:boss序号[L:玩家idU:玩家姓名L:玩家伤害]伤害排行数组[I:国家idI:国家boss进度]国家排行L:我的伤害 */
    public GC_OPEN_COUNTRYBOSS_RANK(self: ModelCtryBoss, bytes: BaseBytes) {
        self.bossID = bytes.readByte();
        self.myRankArr = [];
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            let playerId = bytes.readLong();
            let name = bytes.readUTF();
            let hurt = bytes.readLong();
            self.myRankArr[i] = { playerId: playerId, name: name, hurt: hurt };
        }
        self.myhurt = bytes.readLong();
        GGlobal.control.notify(Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE);
    }

    /**3217	CG 打开某个国家boss排行榜 B:boss序号 */
    public CG_OPEN_COUNTRYBOSS_RANK(bossId: number) {
        let ba = new BaseBytes();
        ba.writeByte(bossId);
        this.sendSocket(3217, ba);
    }

    /**打开UI */
    public CG3201() { this.sendSocket(3201, this.getBytes()) }
    /**I:当前boss序号L:boss最大气血L:boss当前气血[I:已经击杀boss序号U:击杀者姓名]I:我的剩余boss挑战数I:今日购买次数[I:boss序号B:奖励状态 0不可 1可以 2领完] */
    private GC3202(self: ModelCtryBoss, bytes: BaseBytes) {
        self.data = self.data || <any>{};
        const temp = self.data;
        temp.curBossId = Math.min(self.maxBossId(), bytes.readInt());
        temp.bossMaxHp = bytes.readLong();
        temp.bossHp = Math.max(0, bytes.readLong());
        temp.killers = {};
        var len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            temp.killers[bytes.readInt()] = bytes.readUTF();
        }
        temp.leftCount = bytes.readInt();
        temp.remainLeftCnt = bytes.readInt();
        temp.states = {};
        len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            temp.states[bytes.readInt()] = bytes.readByte();
        }
        GGlobal.reddot.setCondition(1505, 0, self.checkNotice());
        self.notify(ModelCtryBoss.msg_datas);
        GGlobal.reddot.notify(ReddotEvent.CHECK_COUNTRY);
    }
    public static curBossID: number;//保存挑战boss 进入场景初始化气血
    /**挑战Boss B:0成功 1次数不够 2boss已经死亡 3你已经在副本中*/
    public CG3203(bossId: number) {
        const bytes = this.getBytes();
        bytes.writeInt(bossId);
        ModelCtryBoss.curBossID = bossId;
        this.sendSocket(3203, bytes);
    }
    private GC3204(self: ModelCtryBoss, bytes: BaseBytes) {
        const state = bytes.readByte();
        switch (state) {
            case 0://成功
                GGlobal.mapscene.enterScene(SceneCtrl.COUNTRYBOSS);
                GGlobal.layerMgr.close2(UIConst.COUNTRY_BOSS);
                GGlobal.layerMgr.close2(UIConst.COUNTRY);
                break;
            case 1:
                ViewCommonWarn.text("剩余挑战次数不够");
                break;
            case 2:
                ViewCommonWarn.text("boss已经死亡");
                self.CG3201();
                break;
            case 3:
                ViewCommonWarn.text("您已经在副本中");
                break;
        }
    }
    /**场景中伤害数据同步 L:我的气血L:boss最大气血L:boss当前血量L:我的伤害值[U:玩家idL:玩家伤害] */
    private GC3206(self: ModelCtryBoss, bytes: BaseBytes) {
        self.battleInfo = self.battleInfo || <any>{};
        bytes.readLong();
        self.battleInfo.bossMaxHp = bytes.readLong();
        self.battleInfo.bossHp = bytes.readLong();
        self.battleInfo.myDamage = bytes.readLong();
        self.battleInfo.others = [];
        const len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            self.battleInfo.others.push({ name: bytes.readUTF(), demage: bytes.readLong() });
        }
        self.notify(ModelCtryBoss.msg_batInfo);
        if (Model_player.voMine.sceneChar&&Model_player.voMine.sceneChar.curhp <= 0) {
            self.CG3207();
        }
    }
    
    /**请求退出国家boss */
    public CG3207() {
        this.sendSocket(3207, this.getBytes());
    }
    private GC3208(self: ModelCtryBoss, bytes: BaseBytes) {
        const state = bytes.readByte();
        switch (state) {
            case 0://成功
                const awards = Config.xtcs_004[3815].other;
                const drops = ConfigHelp.makeItemListArr(JSON.parse(awards));
                if (self.battleInfo && self.battleInfo.bossHp > 0) {
                    if (!GGlobal.layerMgr.isOpenView(UIConst.COMMON_FAIL)) {
                        ViewCommonFail.show(5000, self, "离开", self.realQuit, null, drops);
                    }
                } else {
                    if (!GGlobal.layerMgr.isOpenView(UIConst.COMMON_WIN)) {
                        ViewCommonWin.show(drops, 10000, self, "退出", self.realQuit);
                    }
                }
                break;
            case 1://失败
                ViewCommonWarn.text("退出失败!");
                break;
        }
    }
    private realQuit() {
        GGlobal.modelScene.returnMainScene();
        GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
        if (GGlobal.layerMgr.lastPanelId <= 0) GGlobal.layerMgr.open(UIConst.COUNTRY_BOSS);
    }
    /**被击杀的玩家id */
    private GC3210(self: ModelCtryBoss, bytes: BaseBytes) {
        var temp = [];
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            temp.push(bytes.readLong());
        }
        self.notify(ModelCtryBoss.msg_beenKiller, temp);
    }
    /**广播副本内玩家boss已死亡 */
    private GC3212(self: ModelCtryBoss) {
        ViewBroadcastText.showMsg("国家BOSS已经死亡，领奖励去吧!");
        self.notify(ModelCtryBoss.msg_bossBeenKill);
    }
    /**购买挑战次数 */
    public CG3213(count: number) {
        const bytes = this.getBytes();
        bytes.writeByte(count);
        this.sendSocket(3213, bytes);
    }
    private GC3214(self: ModelCtryBoss, bytes: BaseBytes) {
        const state = bytes.readByte();
        if (state == 0) {
            //不读下一个字段了，直接刷新界面数据
            self.CG3201();
        } else {
            //0成功 1目前次数已满 2购买次数达到上限 3货币不足
            switch (state) {
                case 1:
                    ViewCommonWarn.text("目前次数已满");
                    break;
                case 2:
                    ViewCommonWarn.text("购买次数达到上限");
                    break;
                case 3:
                    ViewCommonWarn.text("货币不足");
                    break;
            }
        }
    }
    /**获取boss通过奖励 */
    public CG3215(bossId: number) {
        const bytes = this.getBytes();
        bytes.writeInt(bossId);
        this.sendSocket(3215, bytes);
    }
    private GC3216(self: ModelCtryBoss, bytes: BaseBytes) {
        const state = bytes.readByte();
        if (state == 0) {
            //成功
            ViewCtryBoss.isGetAwardBack = true;
            self.CG3201();//直接刷新
        } else {
            if (state == 2) {
                Model_RongLian.ALERT_ONEKEY();
            } else {
                ViewCommonWarn.text("失败!");
            }
        }
    }
    public checkNotice() {
        const {data} = this;
        if (!data) {
            return false;
        }
        const curBossId = data.curBossId;
        for (let key in data.states) {
            if (data.states[key] == 1) {//有奖励可领
                return true;
            }
        }
        if (!data.killers[data.curBossId] && data.leftCount > 0) {//有次数可挑战
            return true;
        }
        return false;
    }
    private _maxBossId: number = 0;
    public maxBossId() {
        if (this._maxBossId > 0) {
            return this._maxBossId;
        } else {
            for (let key in Config.gjboss_738) {
                this._maxBossId = Math.max(Config.gjboss_738[key].cengshu, this._maxBossId);
            }
            return this._maxBossId;
        }
    }
}