/**
 * 跨服王者数据管理器
 * @author: lujiahao 
 * @date: 2019-12-04 18:08:48 
 */
class ModelKfwz extends BaseModel {
    constructor() {
        super();
    }

    private _targetVoMap: { [id: number]: VoTargetKfwz } = {};

    /** 活动状态 0未开启 1已开启 */
    public actState = 0;
    /** 我的段位（从1开始） */
    public myGrade = 1;
    /** 转生区间 */
    public myRangeId = 1;
    /** 我的积分 */
    public myScore = 0;
    /** 我的排名 0则为无排名 */
    public myRank = 0;
    /** 今日胜场数 */
    public winCount = 0;
    /** 剩余挑战次数 */
    public remain = 0;
    /** 已购购买次数 */
    public buyCount = 0;

    /** 队伍信息 */
    public teamVo: VoTeamKfwz = new VoTeamKfwz();

    /** 我的战斗队伍 */
    public myBattleList: VoBattlePlayerKfwz[] = [];
    /** 敌方战斗队伍 */
    public enemyBattleList: VoBattlePlayerKfwz[] = [];
    public battleVoMap: { [roleId: number]: VoBattlePlayerKfwz } = {};

    /** 我方战斗顺序列表（会因死亡状态而改变顺序） */
    public myFightList: VoBattlePlayerKfwz[] = [];
    /** 敌方战斗顺序列表（会因死亡状态而改变顺序） */
    public enemyFightList: VoBattlePlayerKfwz[] = [];

    public teamList: VoTeamListKfwz[] = [];

    /** 匹配状态中 */
    public isMatching = false;

    /** 结束时候发送等待标识 */
    public overWaiting = false;

    /** 战斗类型 0人 1电脑 */
    public battleType = 0;

    /** 是否在活动中 */
    public isInAct = false;
    /** 是否在战斗中 */
    public isInBattle = false;

    /** 当前连胜数 */
    public combo = 0;

    /** 延时退出活动的标识（用于在战斗中结束活动，在结束战斗后可以正确的退出活动） */
    public delay2Exit = false;
    public hasResult = false;

    /** 临时缓存邀请链接的队伍id */
    private _tempToJoinTeamId = 0;

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;

        {
            let t_cfg = Config.kfwzmb_770;
            for (let k in t_cfg) {
                let t_vo = new VoTargetKfwz();
                t_vo.id = ~~k;
                this._targetVoMap[t_vo.id] = t_vo;
            }
        }
    }
    //========================================= 协议相关 ========================================
    //协议处理
    public listenServ(mgr: WebSocketMgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10820, this.GC_CrossTeamKing_actstate_10820, this);
        mgr.regHand(10822, this.GC_CrossTeamKing_openUi_10822, this);
        mgr.regHand(10824, this.GC_CrossTeamKing_createteam_10824, this);
        mgr.regHand(10826, this.GC_CrossTeamKing_invitation_10826, this);
        mgr.regHand(10828, this.GC_CrossTeamKing_invitationBroads_10828, this);
        mgr.regHand(10830, this.GC_CrossTeamKing_joinTeam_10830, this);
        mgr.regHand(10832, this.GC_CrossTeamKing_teamInfoChage_10832, this);
        mgr.regHand(10834, this.GC_CrossTeamKing_exchange_10834, this);
        mgr.regHand(10836, this.GC_CrossTeamKing_moveteam_10836, this);
        mgr.regHand(10838, this.GC_CrossTeamKing_moveMeber_10838, this);
        mgr.regHand(10840, this.GC_CrossTeamKing_marryBattle_10840, this);
        mgr.regHand(10842, this.GC_CrossTeamKing_battleUi_10842, this);
        mgr.regHand(10844, this.GC_CrossTeamKing_battleinfo_10844, this);
        mgr.regHand(10846, this.GC_CrossTeamKing_uiupdate_10846, this);
        mgr.regHand(10848, this.GC_CrossTeamKing_openRank_10848, this);
        mgr.regHand(10850, this.GC_CrossTeamKing_reward_10850, this);
        mgr.regHand(10852, this.GC_CrossTeamKing_returnLog_10852, this);
        mgr.regHand(10854, this.GC_CrossTeamKing_teaminfos_10854, this);
        mgr.regHand(10856, this.GC_CrossTeamKing_cancelMarry_10856, this);
        mgr.regHand(10858, this.GC_CrossTeamKing_overPveBattle_10858, this);
        mgr.regHand(10860, this.GC_CrossTeamKing_joinAct_10860, this);
        mgr.regHand(10862, this.GC_CrossTeamKing_buyCount_10862, this);
        mgr.regHand(10864, this.GC_CrossTeamKing_continuitywin_10864, this);
    }

    /**10820 B 广播活动状态 B:0未开启 1开启中state*/
    public GC_CrossTeamKing_actstate_10820(self: ModelKfwz, data: BaseBytes): void {
        self.setup();
        let t_change = false;
        let arg1 = data.readByte();

        if (self.actState != arg1) {
            self.actState = arg1;
            t_change = true;

            if (self.actState == 0) {
                //活动关闭
                if (self.isInBattle) {
                    self.delay2Exit = true; //战斗中结束活动，记一个标识
                }
                else {
                    self.cmdSendExit();
                }

                if (self.isMatching) {
                    self.isMatching = false;
                    GGlobal.layerMgr.close2(UIConst.KFWZ_MATCH); //关闭匹配界面
                }
            }
            else {
                //活动开启
                if (GGlobal.layerMgr.isOpenView(UIConst.KFWZ)) {
                    //如果界面开着，则重新请求进入跨服
                    self.cmdSendEnter();
                    self.CG_CrossTeamKing_openUi_10821();
                }
            }
        }

        if (t_change) {
            self.reddotCheckBox();
            GGlobal.control.notify(Enum_MsgType.KFWZ_ACT_STATE_CHANGE);
        }
    }

    public cmdSendEnter() {
        let t = this;
        if (t.isInAct)
            return;
        t.CG_CrossTeamKing_joinAct_10859();
    }

    public cmdSendExit() {
        let t = this;
        if (!t.isInAct)
            return;
        Model_WorldNet.exiteCross();
        t.clearBattleList();
        t.clearTeamVo();
        t.clearTeamList();
        t.isInAct = false;
        t.delay2Exit = false;
    }

    /**10821  打开ui  */
    public CG_CrossTeamKing_openUi_10821(): void {
        var bates = this.getBytes();
        this.sendSocket(10821, bates);
    }

    /**10822 B-B-B-I-I-I-I-I-[I-B]-I GC 打开ui返回 B:活动状态0未开启 1开启中stateB:转生段位rebornB:段位duanweiI:本赛季积分jfI:本赛季排名rankI:胜利厂数winNumI:剩余挑战次数battleNumI:已经购买次数buynum[I:宝箱idB:宝箱领取状态 0 1 2]todayRewardI:当前连胜次数continuitywin*/
    public GC_CrossTeamKing_openUi_10822(self: ModelKfwz, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte(); //活动状态
        let arg2 = data.readByte(); //转生区间
        let arg3 = data.readByte(); //段位
        let arg4 = data.readInt(); //赛季积分
        let arg5 = data.readInt(); //赛季排名
        let arg6 = data.readInt(); //胜利场数
        let arg7 = data.readInt(); //剩余挑战次数
        let arg8 = data.readInt(); //已购买次数

        arg3 = arg3 < 1 ? 1 : arg3;

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg9 = data.readInt(); //宝箱id
            let arg10 = data.readByte(); //宝箱领取状态

            let t_vo = self.getTargetVoById(arg9);
            if (t_vo && t_vo.update({ state: arg10 })) {
                t_change = true;
            }
        }
        let arg11 = data.readInt(); //当前连胜数

        if (self.updateInfo({ actState: arg1, myGrade: arg3, myRangeId: arg2, myScore: arg4, myRank: arg5, winCount: arg6, remain: arg7, buyCount: arg8, combo: arg11 })) {
            t_change = true;
        }

        //这里把后端的红点灭掉
        ReddotMgr.ins().setValue(UIConst.KFWZ + "|" + 1, 0);

        if (t_change) {
            self.reddotCheckBox();
            GGlobal.control.notify(Enum_MsgType.KFWZ_UPDATE);
        }
    }

    private updateInfo(pData: { actState: number, myGrade: number, myRangeId: number, myScore: number, myRank: number, winCount: number, remain: number, buyCount: number, combo: number }): boolean {
        let t = this;
        return ObjectUtils.modifyObject(t, pData);
    }

    /**10823  CG 创建队伍（进入跨服） */
    public CG_CrossTeamKing_createteam_10823(): void {
        var bates = this.getBytes();
        this.sendSocket(10823, bates, true);
    }

    /**10824 B-I GC 创建队伍返回 B:0成功 1已经存在 2活动未开启 3次数不够restI:队伍idteamid*/
    public GC_CrossTeamKing_createteam_10824(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        let arg2 = data.readInt();

        switch (arg1) {
            case 0: //创建成功
                break;
            case 1:
                ViewCommonWarn.text("您已经有队伍了，请勿重复创建");
                break;
            case 2:
                ViewCommonWarn.text("活动尚未开启");
                break;
            case 3:
                ViewCommonWarn.text("剩余挑战次数不足");
                break;
        }
    }

    private _lastInviteTeamId = 0;
    /**10825  CG 邀请玩家参与（跨服） */
    public CG_CrossTeamKing_invitation_10825(): void {
        let t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader)
            return;
        if (t.teamVo.teamId == t._lastInviteTeamId && !TimeUitl.cool("CG_CrossTeamKing_invitation_10825", 10000)) {
            ViewCommonWarn.text("你已发送过邀请了，请耐心等候");
            return;
        }
        var bates = this.getBytes();
        this.sendSocket(10825, bates, true);
        this._lastInviteTeamId = t.teamVo.teamId;
    }

    /**10826 B 邀请返回 B:B: 0成功 1失败 2你没在队伍中 3你不是队长 5队员已满 6操作太频繁rest*/
    public GC_CrossTeamKing_invitation_10826(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0:
                ViewCommonWarn.text("组队邀请发送成功");
                break;
            case 1:
                ViewCommonWarn.text("组队邀请发送失败");
                break;
            case 2:
                ViewCommonWarn.text("你当前不在队伍中");
                break;
            case 3:
                ViewCommonWarn.text("你不是队长，不能进行邀请");
                break;
            case 5:
                ViewCommonWarn.text("队伍已满，不能再邀请");
                break;
            case 6:
                ViewCommonWarn.text("你已发送过邀请了，请耐心等候");
                break;
        }
    }

    /**10828 I-U 邀请的广播 I:队伍idteamidU:队长名字name*/
    public GC_CrossTeamKing_invitationBroads_10828(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readInt();
        let arg2 = data.readUTF();
    }

    public cmdSendJoinTeam(pTeamId: number) {
        let t = this;
        if (t.isInAct) {
            //正在跨服中
            t.CG_CrossTeamKing_joinTeam_10829(pTeamId);
        }
        else {
            //没有在跨服中，通过外部链接进入
            if (!ModuleManager.isOpen(UIConst.KFWZ, true))
                return;
            t._tempToJoinTeamId = pTeamId;
            GGlobal.layerMgr.open(UIConst.KFWZ);
            SimpleTimer.ins().addTimer(t.onDelayClearTeamId, t, 1000, 1);
        }
    }

    //用于超时清除缓存的队伍id
    private onDelayClearTeamId() {
        let t = this;
        t._tempToJoinTeamId = 0;
    }

    /**10829 I CG 申请加入某个队伍 I:队伍idteamid*/
    public CG_CrossTeamKing_joinTeam_10829(pTeamId): void {
        let t = this;
        if (!t.actState) {
            ViewCommonWarn.text("活动尚未开启");
            t._tempToJoinTeamId = 0;
            return;
        }
        if (t.isInTeam) {
            ViewCommonWarn.text("你已经在其他队伍中了");
            t._tempToJoinTeamId = 0;
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(pTeamId);
        this.sendSocket(10829, bates, true);
    }

    /**10830 B GC 请求加入队伍返回 B:0请求成功 1队伍不存在 2队伍己满3次数不够4转生区间不符合6已在队伍中7队伍正在匹配8正在战斗中*/
    public GC_CrossTeamKing_joinTeam_10830(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0:
                ViewCommonWarn.text("成功加入队伍");
                if (!GGlobal.layerMgr.isOpenView(UIConst.KFWZ)) {
                    GGlobal.layerMgr.open(UIConst.KFWZ);
                }
                break;
            case 1:
                ViewCommonWarn.text("加入队伍失败，队伍不存在");
                break;
            case 2:
                ViewCommonWarn.text("队伍已满");
                break;
            case 3:
                ViewCommonWarn.text("剩余挑战次数不足");
                break;
            case 4:
                ViewCommonWarn.text("你所在的转生区间不符合队伍要求");
                break;
            case 5:
                ViewCommonWarn.text("失败，错误码5");
                break;
            case 6:
                ViewCommonWarn.text("你已经在其他队伍中了");
                break;
            case 7:
                ViewCommonWarn.text("队伍正在匹配中，加入失败");
                break;
            case 8:
                ViewCommonWarn.text("队伍正在战斗中，加入失败");
                break;
        }
        self._tempToJoinTeamId = 0;
    }

    /**10832 B-L-I-[L-I-I-U-I-L] GC 队伍信息变化 B:0创建队伍1有加入2有人退出typeL:队长idcapHidI:队伍idteamid[L:玩家idI:头像I:头像框U:玩家名字I:等级L:战力]teaminfo*/
    public GC_CrossTeamKing_teamInfoChage_10832(self: ModelKfwz, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte(); //操作字段:0创建队伍1有加入2有人退出
        let arg2 = data.readLong(); //队长id
        let arg3 = data.readInt(); //队伍id

        let t_old = self.isInTeam;

        self.teamVo.teamId = arg3;
        self.teamVo.leaderId = arg2;
        self.teamVo.memberList.length = 0; //先清空队伍信息

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg4 = data.readLong(); //玩家id
            let arg5 = data.readInt(); //头像
            let arg6 = data.readInt(); //头像框
            let arg7 = data.readUTF(); //玩家名字
            let arg8 = data.readInt(); //等级
            let arg9 = data.readLong(); //战力

            let t_memberVo = new VoTeamMemberKfwz();
            t_memberVo.posIndex = i;
            t_memberVo.roleId = arg4;
            t_memberVo.head = arg5;
            t_memberVo.headGrid = arg6;
            t_memberVo.name = arg7;
            t_memberVo.level = arg8;
            t_memberVo.power = arg9;
            self.teamVo.memberList.push(t_memberVo);
        }

        t_change = true;

        let t_new = self.isInTeam;

        if (t_new != t_old && t_new) {
            //表示新创建队伍
            if (GGlobal.layerMgr.isOpenView(UIConst.CHAT)) {
                //新创建队伍需要关闭聊天
                GGlobal.layerMgr.close2(UIConst.CHAT);
            }
            self.startAutoEnterTimer(true);
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.KFWZ_TEAM_DATA_UPDATE);
        }
    }

    /**10833 B-B CG数组下标交换位置（跨服） B:位置1index1B:位置2index2*/
    public CG_CrossTeamKing_exchange_10833(pIndex1, pIndex2): boolean {
        let t = this;
        if (!t.isInTeam)
            return false;
        if (!t.areYouLeader)
            return false;

        var bates = this.getBytes();
        bates.writeByte(pIndex1);
        bates.writeByte(pIndex2);
        this.sendSocket(10833, bates, true);
        return true;
    }

    /**10834 B-B GC 广播队伍中玩家 位置交换 B:队伍位置1index1B:队伍位置2index2*/
    public GC_CrossTeamKing_exchange_10834(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        let arg2 = data.readByte();
        self.teamVo.changeMemberPos(arg1, arg2);

        ViewCommonWarn.text("上阵顺序调整成功");

        GGlobal.control.notify(Enum_MsgType.KFWZ_TEAM_DATA_UPDATE);
    }

    /**10835  CG 退出（跨服）主动退出队伍 */
    public CG_CrossTeamKing_exitteam_10835(): void {
        let t = this;
        if (!t.isInTeam)
            return;
        var bates = this.getBytes();
        this.sendSocket(10835, bates, true);
    }

    /**10836 B GC 退出队伍 B:0退出成功1 失败rest*/
    public GC_CrossTeamKing_moveteam_10836(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0: //成功退出队伍
                self.clearTeamVo();
                break;
            default: //失败
                break;
        }
    }

    /** 清空队伍信息 */
    private clearTeamVo() {
        let t = this;
        if (t.isInTeam) {
            t.teamVo.clear();
            t.startAutoEnterTimer(false); //清除自动开始倒计时
            GGlobal.control.notify(Enum_MsgType.KFWZ_TEAM_DATA_UPDATE);
        }
    }

    /**10837 （跨服）I CG 移除队友 I:队友位置012index*/
    public CG_CrossTeamKing_moveMeber_10837(pIndex): void {
        let t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader)
            return;
        var bates = this.getBytes();
        bates.writeInt(pIndex);
        this.sendSocket(10837, bates, true);
    }

    /**10838 B GC移除队员返回 B:0移除成功1你不是队长2失败rest*/
    public GC_CrossTeamKing_moveMeber_10838(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0: //移除成功
                if (self.isInTeam) {
                    if (self.areYouLeader) {
                    }
                    else {
                        //不是队长的话，就是被人踢走了
                        self.clearTeamVo();
                    }
                }
                break;
            case 1:
                break;
            default:
                break;
        }
    }

    /**10855  CG 取消匹配战斗（跨服） */
    public CG_CrossTeamKing_cancelMarry_10855(): void {
        let t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader)
            return;
        if (!t.isMatching)
            return;
        t.setAutoStartFlag(false); //需要连自动开始的选中状态也取消掉
        var bates = this.getBytes();
        this.sendSocket(10855, bates, true);
    }

    /**10856 B GC取消匹配返回 B:0取消成功 1失败 rest*/
    public GC_CrossTeamKing_cancelMarry_10856(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0:
                self.isMatching = false;
                GGlobal.layerMgr.close2(UIConst.KFWZ_MATCH); //关闭匹配界面
                break;
            case 1:
                break;
        }
    }

    /**10839 （跨服）  CG 开始匹配战斗 */
    public CG_CrossTeamKing_marryBattle_10839(): void {
        let t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader)
            return;
        if (t.remain <= 0) {
            ViewCommonWarn.text("剩余挑战次数不足");
            return;
        }
        t.startAutoEnterTimer(false);
        var bates = this.getBytes();
        this.sendSocket(10839, bates, true);
    }

    /**10840 B GC 匹配战斗结果 B:0开始匹配1次数不够2时间未到3失败rest*/
    public GC_CrossTeamKing_marryBattle_10840(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0: //开始匹配
                if (self.isInBattle && self.hasResult) {
                    GGlobal.layerMgr.close2(UIConst.COMMON_FAIL);
                    GGlobal.layerMgr.close2(UIConst.COMMON_WIN);
                    self.onResultExit();
                }
                self.isMatching = true;
                GGlobal.layerMgr.open(UIConst.KFWZ_MATCH); //弹出匹配界面
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    /**10842 [I-I-U-L-B-L]-[I-I-U-L-B-L] GC 匹配到对手 [I:头像I:头像框U:玩家名字L:战力B:是否是电脑人0不是1是L:玩家id]己方myteam[I:头像I:头像框U:玩家名字L:战力B:是否是电脑人0不是1是L:玩家id]敌方enemyteam*/
    public GC_CrossTeamKing_battleUi_10842(self: ModelKfwz, data: BaseBytes): void {
        self.isMatching = false;
        self.battleType = 0;
        self.overWaiting = false;
        GGlobal.layerMgr.close2(UIConst.KFWZ_MATCH); //关闭匹配界面
        let t_hasCPU = false; //是否有电脑
        self.clearBattleList(); //清空战斗队伍信息
        {
            let len = data.readShort();
            for (let i = 0; i < len; i++) {
                let arg1 = data.readInt(); //头像
                let arg2 = data.readInt(); //头像框
                let arg3 = data.readUTF(); //玩家名字
                let arg4 = data.readLong(); //战力
                let arg5 = data.readByte(); //对手类型 0人 1电脑
                let arg6 = data.readLong(); //玩家id

                let t_vo = VoBattlePlayerKfwz.getFromPool();
                t_vo.roleId = arg6;
                t_vo.head = arg1;
                t_vo.headGrid = arg2;
                t_vo.name = arg3;
                t_vo.power = arg4;
                t_vo.type = arg5;
                t_vo.index = i;
                t_vo.force = 1;
                self.myBattleList.push(t_vo);
                self.myFightList.push(t_vo);
                self.battleVoMap[t_vo.roleId] = t_vo;

                if (t_vo.type == 1)
                    t_hasCPU = true;
            }
        }
        {
            let len = data.readShort();
            for (let i = 0; i < len; i++) {
                let arg7 = data.readInt();
                let arg8 = data.readInt();
                let arg9 = data.readUTF();
                let arg10 = data.readLong();
                let arg11 = data.readByte();
                let arg12 = data.readLong();

                let t_vo = VoBattlePlayerKfwz.getFromPool();
                t_vo.roleId = arg12;
                t_vo.head = arg7;
                t_vo.headGrid = arg8;
                t_vo.name = arg9;
                t_vo.power = arg10;
                t_vo.type = arg11;
                t_vo.index = i;
                t_vo.force = 2;
                self.enemyBattleList.push(t_vo);
                self.enemyFightList.push(t_vo);
                self.battleVoMap[t_vo.roleId] = t_vo;

                if (t_vo.type == 1)
                    t_hasCPU = true;
            }
        }

        if (t_hasCPU) {
            self.battleType = 1; //如果匹配到电脑，则战斗类型是电脑
        }

        self.sortFightList();

        GGlobal.layerMgr.open(UIConst.KFWZ_START);

        if (self.battleType == 1) {
            GGlobal.mapscene.enterScene(SceneCtrl.KFWZ);
        }
    }

    /** 对战斗顺序重新排序 */
    private sortFightList() {
        let t = this;
        t.myFightList.sort((pA, pB) => {
            return pB.sortValue - pA.sortValue;
        });
        t.enemyFightList.sort((pA, pB) => {
            return pB.sortValue - pA.sortValue;
        });
    }

    private clearBattleList() {
        let t = this;
        for (let i = t.myBattleList.length - 1; i >= 0; i--) {
            let t_vo = t.myBattleList[i];
            delete t.battleVoMap[t_vo.roleId];
            VoBattlePlayerKfwz.recycleToPool(t_vo);
            t.myBattleList.splice(i, 1);
        }
        t.myFightList.length = 0;
        for (let i = t.enemyBattleList.length - 1; i >= 0; i--) {
            let t_vo = t.enemyBattleList[i];
            delete t.battleVoMap[t_vo.roleId];
            VoBattlePlayerKfwz.recycleToPool(t_vo);
            t.enemyBattleList.splice(i, 1);
        }
        t.enemyFightList.length = 0;
    }

    /**10844 I-I 战斗情况 I:队伍idteamidI:死亡的indexdieindex*/
    public GC_CrossTeamKing_battleinfo_10844(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readInt(); //队伍id
        let arg2 = data.readInt(); //死亡的队员index

        let t_battleList: VoBattlePlayerKfwz[];
        if (self.teamVo.teamId == arg1) {
            //我的队伍
            t_battleList = self.myBattleList;
        }
        else {
            //敌方队伍
            t_battleList = self.enemyBattleList;
        }
        if (t_battleList) {
            let t_vo = t_battleList[arg2];
            if (t_vo) {
                self.updateBattleDead(t_vo.roleId);
            }
        }
    }

    /** 更新战斗死亡状况 */
    public updateBattleDead(pRoleId: number) {
        let t = this;
        let t_vo = t.getBattleVoByRoleId(pRoleId);
        if (t_vo && t_vo.isDead == 0) {
            t_vo.isDead = 1;
            let t_nextVo: VoBattlePlayerKfwz;
            switch (t_vo.force) {
                case 1:
                    if (t_vo.roleId == t.myFightList[0].roleId) {
                        //挂的是当前正在打的人则表示正常流程死亡
                        t_nextVo = t.myBattleList[t_vo.index + 1];
                    }
                    else {
                        //挂的不是正在打的人则表示后面的人中途退出
                        t_nextVo = null;
                    }
                    break;
                case 2:
                    if (t_vo.roleId == t.enemyFightList[0].roleId) {
                        t_nextVo = t.enemyBattleList[t_vo.index + 1];
                    }
                    else {
                        t_nextVo = null;
                    }
                    break;
            }
            t.sortFightList(); //战斗顺序重新排序
            GGlobal.control.notify(Enum_MsgType.KFWZ_BATTLE_PLAYER_DEAD, { deadVo: t_vo, nextVo: t_nextVo });
        }
    }

    /**10846 B-I-I-I-I GC战斗后 界面更新 B:段位I:本赛季积分I:本赛季排名I:胜利场数I:剩余挑战次数*/
    public GC_CrossTeamKing_uiupdate_10846(self: ModelKfwz, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte(); //段位
        let arg2 = data.readInt(); //赛季积分
        let arg3 = data.readInt(); //赛季排名
        let arg4 = data.readInt(); //胜利场数
        let arg5 = data.readInt(); //剩余挑战次数

        if (self.myGrade != arg1) {
            self.myGrade = arg1;
            t_change = true;
        }
        if (self.myScore != arg2) {
            self.myScore = arg2;
            t_change = true;
        }
        if (self.myRank != arg3) {
            self.myRank = arg4;
            t_change = true;
        }
        if (self.remain != arg5) {
            self.remain = arg5;
            t_change = true;
        }

        if (t_change) {
            self.reddotCheckBox();
            GGlobal.control.notify(Enum_MsgType.KFWZ_UPDATE);
        }
    }

    /**10847 B 打开排行榜 B:对于转生段位rebornIndex*/
    public CG_CrossTeamKing_openRank_10847(arg1): void {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(10847, bates);
    }

    /**10848 B-I-I-[I-I-U-I] GC 打开排行榜 B:转生段位rebornTypeI:排名myrankI:段位myduanwei[I:排名I:段位U:名字I:积分]rankinfo*/
    public GC_CrossTeamKing_openRank_10848(self: ModelKfwz, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte(); //转生区间
        let arg2 = data.readInt(); //我的排名
        let arg3 = data.readInt(); //我的段位

        let t_myRangeId = self.getRangeId();
        if (arg1 == t_myRangeId) {
            if (self.myRank != arg2) {
                self.myRank = arg2;
                t_change = true;
            }
            arg3 = arg3 < 1 ? 1 : arg3;
            if (self.myGrade != arg3) {
                self.myGrade = arg3;
                t_change = true;
            }
        }

        let t_rankVoList = self.getRankCfgListByRangeId(arg1);
        let t_checkMap = {};
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg4 = data.readInt(); //排名
            let arg5 = data.readInt(); //段位
            let arg6 = data.readUTF(); //名字
            let arg7 = data.readInt(); //积分

            let t_vo = t_rankVoList[arg4 - 1];
            if (t_vo) {
                //存在则修改原有数据
                t_checkMap[arg4] = true;
                if (t_vo.update({ grade: arg5, name: arg6, score: arg7 })) {
                    t_change = true;
                }
            }
            else {
                //不存在则新增数据
                // t_vo = new VoRankCfgKfwz();
            }
        }
        for (let v of t_rankVoList) {
            if (t_checkMap[v.rank])
                continue;
            if (v.reset())
                t_change = true;
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.KFWZ_RANK_UPDATE, { rangeId: arg1 });
        }
    }

    /**10849 I CG 获取每日宝箱奖励 I:奖励索引rewardindex*/
    public CG_CrossTeamKing_getReward_10849(arg1): void {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(10849, bates);
    }

    /**10850 I-B GC 奖励变化 I:奖励索引indexB:奖励状态0 1 2state*/
    public GC_CrossTeamKing_reward_10850(self: ModelKfwz, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readInt();
        let arg2 = data.readByte();

        let t_vo = self.getTargetVoById(arg1);
        if (t_vo && t_vo.update({ state: arg2 })) {
            t_change = true;
        }

        if (t_change) {
            self.reddotCheckBox();
            GGlobal.control.notify(Enum_MsgType.KFWZ_UPDATE);
        }
    }

    /**10851  CG 查询战报（跨服） */
    public CG_CrossTeamKing_getLog_10851(): void {
        var bates = this.getBytes();
        this.sendSocket(10851, bates, true);
    }

    public logVoList: VoLogKfwz[] = [];
    /**10852 [B-I-[L-B-I-I-U]-[L-B-I-I-U]] GC 战报返回 [B:胜负1胜2负I:获得积分[L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字][L:玩家idB:是否队长0队员1队长I:头像I:头像框U:玩家名字]]日志信息logInfo*/
    public GC_CrossTeamKing_returnLog_10852(self: ModelKfwz, data: BaseBytes): void {
        self.clearLogList();

        let len = data.readShort();
        for (let i = 0; i < len; i++) {

            let arg1 = data.readByte(); //胜负1胜2负
            let arg2 = data.readInt(); //获得积分

            let t_voLog = VoLogKfwz.getFromPool();
            t_voLog.result = arg1;
            t_voLog.score = arg2;

            {
                let len1 = data.readShort();
                for (let i = 0; i < len1; i++) {
                    let arg3 = data.readLong(); //玩家id
                    let arg4 = data.readByte(); //是否队长
                    let arg5 = data.readInt(); //头像
                    let arg6 = data.readInt(); //头像框
                    let arg7 = data.readUTF(); //玩家名字

                    let t_player = VoLogPlayerKfwz.getFromPool();
                    t_player.roleId = arg3;
                    t_player.isLeader = arg4;
                    t_player.head = arg5;
                    t_player.headGrid = arg6;
                    t_player.name = arg7;
                    t_voLog.myTeamList.push(t_player);
                }
            }
            {
                let len1 = data.readShort();
                for (let i = 0; i < len1; i++) {
                    let arg8 = data.readLong();
                    let arg9 = data.readByte();
                    let arg10 = data.readInt();
                    let arg11 = data.readInt();
                    let arg12 = data.readUTF();

                    let t_player = VoLogPlayerKfwz.getFromPool();
                    t_player.roleId = arg8;
                    t_player.isLeader = arg9;
                    t_player.head = arg10;
                    t_player.headGrid = arg11;
                    t_player.name = arg12;
                    t_voLog.enemyTeamList.push(t_player);
                }
            }

            // self.logVoList.unshift(t_voLog); 
            self.logVoList.push(t_voLog);
        }
        self.logVoList.reverse(); //最新的排在上面

        GGlobal.control.notify(Enum_MsgType.KFWZ_LOG_UPDATE);
    }

    /** 清空日志 */
    private clearLogList() {
        let t = this;
        for (let i = t.logVoList.length - 1; i >= 0; i--) {
            let t_vo = t.logVoList[i];
            VoLogKfwz.recycleToPool(t_vo);
            t.logVoList.splice(i, 1);
        }
    }

    /**10854 [I-U-B] GC 本区间队伍信息 [I:队伍idU:队长名字B:参与人物数量]teams*/
    public GC_CrossTeamKing_teaminfos_10854(self: ModelKfwz, data: BaseBytes): void {
        self.clearTeamList();
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readInt(); //队伍id
            let arg2 = data.readInt(); //头像
            let arg3 = data.readInt(); //头像框
            let arg4 = data.readUTF(); //队长名字
            let arg5 = data.readByte(); //队伍人数

            let t_vo = VoTeamListKfwz.getFromPool();
            t_vo.teamId = arg1;
            t_vo.head = arg2;
            t_vo.headGrid = arg3;
            t_vo.name = arg4;
            t_vo.count = arg5;
            self.teamList.push(t_vo);
        }

        GGlobal.control.notify(Enum_MsgType.KFWZ_TEAM_LIST_UPDATE);
    }

    /** 清空队伍列表 */
    private clearTeamList() {
        let t = this;
        for (let i = t.teamList.length - 1; i >= 0; i--) {
            let t_vo = t.teamList[i];
            VoTeamListKfwz.recycleToPool(t_vo);
            t.teamList.splice(i, 1);
        }
    }

    public cmdSendOverPVE(pResult) {
        let t = this;
        let t_killCount = 0;
        for (let v of t.enemyBattleList) {
            if (v.isDead) {
                t_killCount++;
            }
        }
        t.CG_CrossTeamKing_overPveBattle_10857(pResult, t_killCount);
    }

    /**10857 B-B CG 结束当前pve战斗（跨服） B:0胜利 1失败restB:杀死电脑的数量kill*/
    public CG_CrossTeamKing_overPveBattle_10857(arg1, arg2): void {
        let t = this;
        if (t.overWaiting)
            return;
        var bates = this.getBytes();
        bates.writeByte(arg1);
        bates.writeByte(arg2);
        this.sendSocket(10857, bates, true);
        t.overWaiting = true;
    }

    /**10858 B GC 通知其他队友战斗结束 B:0胜利 1失败rest*/
    public GC_CrossTeamKing_overPveBattle_10858(self: ModelKfwz, data: BaseBytes): void {
        let arg1 = data.readByte();
        self.showResultPanel(arg1);
        GGlobal.control.notify(Enum_MsgType.KFWZ_BATTLE_PVE_OVER, { result: arg1 });
    }

    /**
     * 显示胜利失败界面
     * @param pResult 0胜利 1失败
     */
    public showResultPanel(pResult: number) {
        let t = this;
        t.hasResult = true;
        let t_rangeId = t.getRangeId();
        let t_rewardVo = t.getBattleRewardVoByRangeId(t_rangeId);
        if (pResult == 0) {
            //胜利
            ViewCommonWin.show(t_rewardVo.rewardListWin, 5000, t, "退出", t.onResultExit);
        }
        else {
            //失败
            ViewCommonFail.show(5000, t, "离开", t.onResultExit, t_rewardVo.rewardListFail);
        }
    }

    public onResultExit() {
        // if (GGlobal.layerMgr.lastPanelId <= 0)
        //     GGlobal.layerMgr.open(UIConst.KFWZ);
        GGlobal.modelScene.returnMainScene();
        GGlobal.layerMgr.open(UIConst.KFWZ);
        GGlobal.modelKfwz.hasResult = false;
        GGlobal.modelKfwz.startAutoEnterTimer(true);
    }

    /**10859  CG 进入活动 */
    public CG_CrossTeamKing_joinAct_10859(): void {
        var bates = this.getBytes();
        this.sendSocket(10859, bates);
    }

    /**10860  GC 进入活动成功 */
    public GC_CrossTeamKing_joinAct_10860(self: ModelKfwz, data: BaseBytes): void {
        self.isInAct = true;
        if (self._tempToJoinTeamId > 0) {
            self.CG_CrossTeamKing_joinTeam_10829(self._tempToJoinTeamId);
            self._tempToJoinTeamId = 0;
        }
    }

    /**10861 I  I:需要购买的次数count*/
    public CG_CrossTeamKing_buyCount_10861(arg1): void {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(10861, bates);
    }

    /**10862 B-I-I  B:结果0成功，其他失败resI:已购买次数buyCountI:剩余挑战次数remain*/
    public GC_CrossTeamKing_buyCount_10862(self: ModelKfwz, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readByte();
        let arg2 = data.readInt();
        let arg3 = data.readInt();

        switch (arg1) {
            case 0:
                if (self.buyCount != arg2) {
                    self.buyCount = arg2;
                    t_change = true;
                }
                if (self.remain != arg3) {
                    self.remain = arg3;
                    t_change = true;
                }
                break;
            default:
                ViewCommonWarn.text("购买失败");
                break;
        }

        if (t_change) {
            self.reddotCheckBox();
            GGlobal.control.notify(Enum_MsgType.KFWZ_UPDATE);
        }
    }

    /**10863  CG 退出战斗（pvp pve） */
    public CG_CrossTeamKing_quitBattle_10863(): void {
        var bates = this.getBytes();
        this.sendSocket(10863, bates, true);
    }

    /**10864 I GC连胜数量变化 I:当前连胜数continuitywin*/
    public GC_CrossTeamKing_continuitywin_10864(self: ModelKfwz, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readInt();
        if (arg1 != self.combo) {
            self.combo = arg1;
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.KFWZ_UPDATE);
        }
    }

    //=========================================== API ==========================================
    private _openTsList: number[][];
    /** 活动开启时间 */
    public get openTsList(): number[][] {
        let t = this;
        if (t._openTsList === undefined) {
            let t_str = FastAPI.getSystemValue(7924);
            let t_list = JSON.parse(t_str);
            t._openTsList = t_list;
        }
        return t._openTsList;
    }

    /** 是否在队伍中 */
    public get isInTeam(): boolean {
        let t = this;
        return t.teamVo.teamId > 0;
    }

    /** 你是否队长 */
    public get areYouLeader(): boolean {
        let t = this;
        if (t.teamVo.teamId > 0 && t.teamVo.leaderId == Model_player.voMine.id)
            return true;
        else
            return false;
    }

    private _curZsId = -1;
    private _rangeId = 0;
    /** 获取转生区间id */
    public getRangeId(): number {
        let t = this;
        // let t_myZs = Model_player.voMine.zsID;
        // if (t._curZsId != t_myZs) {
        //     t._rangeId = 0;
        //     let t_cfg = Config.kfwzqj_770;
        //     for (let k in t_cfg) {
        //         let t_list = JSON.parse(t_cfg[k].zs);
        //         let t_min = ~~t_list[0][0];
        //         let t_max = ~~t_list[0][1];
        //         if (t_myZs >= t_min && t_myZs <= t_max) {
        //             t._rangeId = ~~k;
        //             break;
        //         }
        //     }
        //     t._curZsId = t_myZs;
        //     //默认没有合适的区间则使用第一个区间以防报错
        //     if (t._rangeId == 0)
        //         t._rangeId = 1;
        // }
        // return t._rangeId;
        if (t.myRangeId <= 0)
            return 1;
        else
            return t.myRangeId;
    }

    /**
     * 通过id获取目标数据
     * @param pId 
     */
    public getTargetVoById(pId: number): VoTargetKfwz {
        return this._targetVoMap[pId];
    }

    private _targetVoListMap: { [rangeId: number]: VoTargetKfwz[] } = {};
    /** 获取目标数据列表 */
    public getTargetVoList(): VoTargetKfwz[] {
        let t = this;
        let t_rangeId = t.getRangeId();
        let t_list = t._targetVoListMap[t_rangeId];
        if (t_list === undefined) {
            t._targetVoListMap[t_rangeId] = t_list = [];
            let t_cfg = Config.kfwzmb_770;
            for (let k in t_cfg) {
                let t_vo = t.getTargetVoById(~~k);
                if (t_vo.cfg.zs == t_rangeId) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    /** 最大的目标数 */
    public get maxTargetCount(): number {
        let t = this;
        let t_list = t.getTargetVoList();
        if (t_list.length > 0) {
            return t_list[t_list.length - 1].cfg.cs;
        }
        return 0;
    }

    private _gradeListMap: { [rangeId: number]: VoGradeKfwz[] } = {};
    /** 获取段位列表 */
    public getGradeList(): VoGradeKfwz[] {
        let t = this;
        let t_rangeId = t.getRangeId();
        let t_list = t._gradeListMap[t_rangeId];
        if (t_list === undefined) {
            t._gradeListMap[t_rangeId] = t_list = [];
            let t_cfg = Config.kfwzdw_770;
            for (let k in t_cfg) {
                let t_vo = new VoGradeKfwz();
                t_vo.id = ~~k;
                if (t_vo.cfg.zs == t_rangeId) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    /**
     * 通过段位获取对应段位配置数据
     * @param pGrade 段位
     */
    public getGradeVoByGrade(pGrade: number): VoGradeKfwz {
        let t = this;
        let t_list = t.getGradeList();
        return t_list[pGrade - 1];
    }

    private _rankCfgListMap: { [rangeId: number]: VoRankCfgKfwz[] };
    /** 获取排行配置列表 */
    public getRankCfgListByRangeId(pRangeId: number): VoRankCfgKfwz[] {
        let t = this;
        let t_rangeId = pRangeId;
        if (!t._rankCfgListMap) {
            t._rankCfgListMap = {};
            let t_cfg = Config.kfwzph_770;
            for (let k in t_cfg) {
                let t_vo: VoRankCfgKfwz = null;
                let t_obj = t_cfg[k];
                let t_volist = t._rankCfgListMap[t_obj.zs];
                if (t_volist === undefined) {
                    t._rankCfgListMap[t_obj.zs] = t_volist = [];
                }
                let t_pmList = JSON.parse(t_obj.pm);
                let t_min = ~~t_pmList[0][0];
                let t_max = ~~t_pmList[0][1];
                if (t_min == t_max) {
                    t_vo = new VoRankCfgKfwz();
                    t_vo.id = ~~k;
                    t_vo.rank = t_min;
                    t_volist.push(t_vo);
                }
                else {
                    for (let i = t_min; i <= t_max; i++) {
                        t_vo = new VoRankCfgKfwz();
                        t_vo.id = ~~k;
                        t_vo.rank = i;
                        t_volist.push(t_vo);
                    }
                }
                // if (t_vo.cfg.zs == t_rangeId) {
                //     t_volist.push(t_vo);
                // }
            }
        }
        let t_list = t._rankCfgListMap[t_rangeId];
        if (t_list === undefined) {
            t_list = [];
        }
        return t_list;
    }

    private _battleRewardVoMap: { [rangeId: number]: VoBattleRewardKfwz } = {};
    /**
     * 通过转生id获取挑战奖励数据
     * @param pRangeId 
     */
    public getBattleRewardVoByRangeId(pRangeId: number): VoBattleRewardKfwz {
        let t = this;
        let t_vo = t._battleRewardVoMap[pRangeId];
        if (t_vo === undefined) {
            let t_cfg = Config.kfwztz_770;
            for (let k in t_cfg) {
                let t_tempVo = new VoBattleRewardKfwz();
                t_tempVo.id = ~~k;
                t._battleRewardVoMap[t_tempVo.id] = t_tempVo;
            }
            t_vo = t._battleRewardVoMap[pRangeId];
        }
        return t_vo;
    }

    /** vip可购买上限 */
    public get vipBuyLimit(): number {
        let t_vipId = Model_player.voMine.viplv + 1;
        let t_cfg = Config.VIP_710[t_vipId];
        if (t_cfg) {
            return t_cfg.kfwz;
        }
        else
            return 0;
    }

    private _buyCountConsume: IGridImpl;
    private _buyCountNeedList: IGridImpl[];
    /** 购买次数所需消耗 */
    public get vipBuyNeedConsume(): IGridImpl {
        let t = this;
        if (t._buyCountConsume === undefined) {
            let t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7923));
            if (t_list && t_list.length > 0)
                t._buyCountConsume = t_list[0];
            else
                t._buyCountConsume = null;
        }
        return t._buyCountConsume;
    }

    /**
     * 通过数量获取购买次数所需的总价
     * @param pCount 
     */
    public getBuyCountNeedByCount(pCount: number): number {
        let t = this;
        if (t._buyCountNeedList === undefined) {
            t._buyCountNeedList = [];
            let t_cfg = Config.kfwzcs_770;
            for (let k in t_cfg) {
                let t_list = ConfigHelp.makeItemListArr(t_cfg[k].xh);
                t._buyCountNeedList.push(t_list[0]);
            }
        }
        let t_total = 0;
        for (let i = 0; i < pCount; i++) {
            let t_value = 0;
            let t_key = t.buyCount + i;
            if (t_key < t._buyCountNeedList.length) {
                t_value = t._buyCountNeedList[t_key].count;
            }
            else {
                t_value = t._buyCountNeedList[t._buyCountNeedList.length - 1].count;
            }
            t_total += t_value;
        }
        return t_total;
    }

    /**
     * 通过玩家id获取战斗玩家信息
     * @param pRoleId 
     */
    public getBattleVoByRoleId(pRoleId: number): VoBattlePlayerKfwz {
        let t = this;
        return t.battleVoMap[pRoleId];
    }


    /**
     * 检查战斗是否全部结束
     * @returns 0还没结束 1我方死光 2敌方死光
     */
    public checkIsAllOver(): number {
        let t = this;
        {
            let t_total = t.enemyBattleList.length;
            let t_deadCount = 0;
            for (let v of t.enemyBattleList) {
                if (v.isDead) {
                    t_deadCount++;
                }
            }
            if (t_deadCount >= t_total) {
                return 2;
            }
        }
        {
            let t_total = t.myBattleList.length;
            let t_deadCount = 0;
            for (let v of t.myBattleList) {
                if (v.isDead) {
                    t_deadCount++;
                }
            }
            if (t_deadCount >= t_total) {
                return 1;
            }
        }
        return 0;
    }

    /** 自动开始标识 */
    public autoStartFlag: boolean = false;
    /** 自动开始倒计时（s） */
    public autoStartTime: number = 5;
    /** 设置自动开始标识 */
    public setAutoStartFlag(value: boolean) {
        let t = this;
        if (t.autoStartFlag == value)
            return;
        t.autoStartFlag = value;
        t.startAutoEnterTimer(true);
    }

    /** 自动开始倒计时 */
    public startAutoEnterTimer(pFlag: boolean) {
        let t = this;
        t.teamVo.teamId
        if (pFlag
            && t.isInAct
            && t.autoStartFlag
            && t.isInTeam
            && t.areYouLeader
            && t.teamVo.canEnter) {
            t.teamVo.autoEnterStartTs = Model_GlobalMsg.getServerTime();
            SimpleTimer.ins().addTimer(t.onAutoEnterTimer, t, t.autoStartTime * 1000, 1);
        }
        else {
            t.teamVo.autoEnterStartTs = 0;
            SimpleTimer.ins().removeTimer(t.onAutoEnterTimer, t);
        }

        GGlobal.control.notify(Enum_MsgType.KFWZ_AUTO_START_TIMER_CHANGE);
    }

    private onAutoEnterTimer() {
        let t = this;
        t.CG_CrossTeamKing_marryBattle_10839();
    }

    //===================================== private method =====================================
    private reddotCheckBox() {
        let t = this;
        {
            let t_value = 0;
            let t_boxList = t.getTargetVoList();
            for (let v of t_boxList) {
                if (v.state == 1) {
                    t_value = 1;
                    break;
                }
            }
            ReddotMgr.ins().setValue(ReddotEnum.VALUE_KFWZ_BOX_REWARD, t_value);
        }

        {
            let t_value = 0;
            if (t.actState) {
                t_value = t.remain > 0 ? 1 : 0;
            }
            ReddotMgr.ins().setValue(ReddotEnum.VALUE_KFWZ_REMAIN, t_value);
        }
    }
    //======================================== handler =========================================
}