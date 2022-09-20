/**
 * 轮回副本管理器
 * @author: lujiahao 
 * @date: 2020-02-26 14:47:59 
 */
class ModelLhfb extends BaseModel {
    constructor() {
        super();
    }

    public copyVoList: VoCopyLhfb[] = [];
    private _levelVoMap: { [levelId: number]: VoLevelLhfb } = {};

    /** 已协助次数 */
    public hasHelp = 0;
    /** 队伍信息 */
    public teamVo: VoTeamLhfb = new VoTeamLhfb();

    /** 当前的轮回id（进度） */
    private _curLunhuiId = 0;

    public battleVoMap: { [roleId: number]: VoBattleLhfb } = {};

    public bossHp = 0;
    public bossHpMax = 0;

    public hasResult = false;
    public isInBattle = false;

    public isInAct = false;

    /** 临时缓存邀请链接的队伍id */
    private _tempToJoinTeamId = 0;
    /** 缓存正在连上跨服时的创建队伍的请求 */
    private _tempCreateLunhunId = 0;
    /** 记录是否正在连上跨服的状态 */
    private _isLogining = false;

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;

        let t = this;
        {
            let t_lunhuiIdMap = {};
            let t_cfg = Config.lhfb_337;
            for (let k in t_cfg) {
                let t_levelId = ~~k;
                let t_lunhuiId = ~~(t_levelId / 1000);
                if (!t_lunhuiIdMap[t_lunhuiId]) {
                    t_lunhuiIdMap[t_lunhuiId] = true;
                    let t_vo = new VoCopyLhfb();
                    t_vo.lunhuiId = t_lunhuiId;
                    t.copyVoList.push(t_vo);
                }
            }
        }
    }
    //========================================= 协议相关 ========================================
    public listenServ(mgr: WebSocketMgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(11862, this.GC_RebornFB_openUi_11862, this);
        mgr.regHand(11864, this.GC_RebornFB_createTeam_11864, this);
        mgr.regHand(11866, this.GC_RebornFB_teamInfoChage_11866, this);
        mgr.regHand(11868, this.GC_RebornFB_joinTeam_11868, this);
        mgr.regHand(11870, this.GC_RebornFB_invitation_11870, this);
        mgr.regHand(11872, this.GC_RebornFB_invitationBroads_11872, this);
        mgr.regHand(11874, this.GC_RebornFB_exitTeam_11874, this);
        mgr.regHand(11876, this.GC_RebornFB_moveMeber_11876, this);
        mgr.regHand(11878, this.GC_RebornFB_refreshStar_11878, this);
        mgr.regHand(11880, this.GC_RebornFB_noticeStar_11880, this);
        mgr.regHand(11882, this.GC_RebornFB_battle_11882, this);
        mgr.regHand(11884, this.GC_RebornFB_reflashSceneData_11884, this);
        mgr.regHand(11886, this.GC_RebornFB_death_11886, this);
        mgr.regHand(11890, this.GC_RebornFB_reflashTeamHP_11890, this);
        mgr.regHand(11892, this.GC_RebornFB_loginCross_11892, this);
    }

    /**11891  登录中央服 */
    public CG_RebornFB_loginCross_11891(): void {
        var bates = this.getBytes();
        this.sendSocket(11891, bates);
        let t = this;
        t._isLogining = true;
    }

    /**11892 B 登录中央服返回 B:状态:0-成功,1-失败state*/
    public GC_RebornFB_loginCross_11892(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readByte();
        self._isLogining = false;
        switch (arg1) {
            case 0:
                self.isInAct = true;
                if (self._tempCreateLunhunId > 0) {
                    let t_lunhuiId = self._tempCreateLunhunId;
                    self._tempCreateLunhunId = 0;
                    self.CG_RebornFB_createTeam_11863(t_lunhuiId);
                }
                if (self._tempToJoinTeamId > 0) {
                    self.CG_RebornFB_joinTeam_11867(self._tempToJoinTeamId);
                    // self._tempToJoinTeamId = 0;
                }
                break;
            default:
                break;
        }
    }

    /**11861  打开轮回副本界面 */
    public CG_RebornFB_openUi_11861(): void {
        var bates = this.getBytes();
        this.sendSocket(11861, bates);
    }

    public cmdSendEnter() {
        let t = this;
        if (t._isLogining)
            return;
        if (t.isInAct)
            return;
        t.CG_RebornFB_loginCross_11891();
    }

    public cmdSendExit() {
        let t = this;
        if (!t.isInAct)
            return;
        t.cmdSendExitTeam(false);
        Model_WorldNet.exiteCross();
        t.clearBattleInfo();
        t.clearTeamVo();
        t._tempCreateLunhunId = 0;
        t._isLogining = false;
        t.isInAct = false;
    }

    /**11862 I-[I-I-I] 打开轮回副本界面返回 I:已经协助次数helpNum[I:副本轮回等级I:副本星级I:已挑战次数]副本信息battleInfo*/
    public GC_RebornFB_openUi_11862(self: ModelLhfb, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readInt(); //已协助次数

        if (self.hasHelp != arg1) {
            self.hasHelp = arg1;
            t_change = true;
        }

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg2 = data.readInt(); //轮回id
            let arg3 = data.readInt(); //星数
            let arg4 = data.readInt(); //已挑战次数

            let t_vo = self.getCopyVoByLunhuiId(arg2);
            if (t_vo && t_vo.update({ star: arg3, hasPass: arg4 })) {
                t_change = true;
            }
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LHFB_UPDATE);
        }

        let t_myLunhuiId = Model_player.voMine.reincarnationLevel;
        let t_tempLunhuiId = 0;
        for (let v of self.copyVoList) {
            if (v.remainCount > 0 && v.lunhuiId <= t_myLunhuiId) {
                t_tempLunhuiId = v.lunhuiId;
                break;
            }
        }

        if (t_tempLunhuiId != self._curLunhuiId) {
            self._curLunhuiId = t_tempLunhuiId;
            GGlobal.control.notify(Enum_MsgType.LHFB_CUR_ID_CHANGE, { isScroll: true });
        }

        self.reddotCheck();
    }

    /**11863 I 创建队伍 I:轮回等级rebornLv*/
    public CG_RebornFB_createTeam_11863(pLunhuiId: number): void {
        let t = this;
        let t_copyVo = t.getCopyVoByLunhuiId(pLunhuiId);
        if (!t_copyVo)
            return;
        // if (t_copyVo.remainCount <= 0) {
        //     ViewCommonWarn.text("当前副本剩余挑战次数不足");
        //     return;
        // }
        if (t._tempToJoinTeamId > 0)
            return;
        if (!t.isInAct && t._isLogining && t._tempToJoinTeamId == 0) {
            //第一次打开界面时候连上跨服协议有一定的延时不能立马返回
            //这里缓存器创建队伍的请求
            t._tempCreateLunhunId = pLunhuiId;
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(pLunhuiId);
        this.sendSocket(11863, bates, true);
    }

    /**11864 B 创建队伍返回 B:状态:0-成功,1-数据不存在,2-配置不存在,3-轮回等级不足,4-你已经有队伍,5-操作太频繁state*/
    public GC_RebornFB_createTeam_11864(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0: //成功
                // ViewCommonWarn.text("队伍创建成功");
                break;
            case 1: //失败
                ViewCommonWarn.text("数据不存在");
                break;
            case 2:
                ViewCommonWarn.text("配置不存在");
                break;
            case 3:
                ViewCommonWarn.text("轮回等级不足");
                break;
            case 4:
                ViewCommonWarn.text("你已经有队伍了");
                break;
            case 5:
                ViewCommonWarn.text("操作太频繁了");
                break;
            default:
                ViewCommonWarn.text("操作失败");
                break;
        }
    }

    /**11866 B-L-I-I-I-[L-I-I-U-I-L-I] 队伍信息变化 B:状态:0-创建队伍,1-有人加入,2-有人离开,3-队伍解散,4-刷新星数stateL:队长idcapHidI:队伍idteamIdI:轮回等级levelI:副本星数star[L:玩家idI:头像I:头像框U:玩家名字I:等级L:战力I:轮回等级]队伍信息teamInfo*/
    public GC_RebornFB_teamInfoChage_11866(self: ModelLhfb, data: BaseBytes): void {
        let t_change = false;

        let t_old = self.isInTeam;

        let arg1 = data.readByte(); //操作字段 0创建队伍 1有人加入 2有人退出 3队伍解散
        if (arg1 == 3) {
            //队长解散了队伍
            let t_isLeader = self.areYouLeader;

            self.clearTeamVo();
            if (!t_isLeader) {
                GGlobal.layerMgr.close2(UIConst.LHFB);
                ViewCommonWarn.text("队长解散了队伍");
            }
            else {
            }
            return;
        }
        let arg2 = data.readLong(); //队长id
        let arg3 = data.readInt(); //队伍id
        let arg4 = data.readInt(); //轮回id
        let arg5 = data.readInt(); //星数

        self.teamVo.teamId = arg3;
        self.teamVo.leaderId = arg2;
        self.teamVo.lunhuiId = arg4;
        self.teamVo.star = arg5;
        self.teamVo.memberList.length = 0; //先清空队伍信息

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg6 = data.readLong(); //玩家id
            let arg7 = data.readInt(); //头像
            let arg8 = data.readInt(); //头像框
            let arg9 = data.readUTF(); //玩家名字
            let arg10 = data.readInt(); //等级
            let arg11 = data.readLong(); //战力
            let arg12 = data.readInt(); //轮回等级

            let t_memberVo = new VoTeamMemberLhfb();
            t_memberVo.roleId = arg6;
            t_memberVo.head = arg7;
            t_memberVo.headGrid = arg8;
            t_memberVo.name = arg9;
            t_memberVo.level = arg10;
            t_memberVo.power = arg11;
            t_memberVo.lunhuiId = arg12;
            self.teamVo.memberList.push(t_memberVo);
        }

        if (self.teamVo.memberList.length > 0) {
            self.teamVo.memberList.sort((pA, pB) => {
                let t_vA = pA.sortValue;
                let t_vB = pB.sortValue;
                if (t_vA == t_vB) {
                    return pA.roleId - pB.roleId;
                }
                else
                    return t_vB - t_vA;
            });
        }

        t_change = true;

        let t_new = self.isInTeam;

        if (t_new != t_old && t_new) {
            //表示新创建队伍
            if (GGlobal.layerMgr.isOpenView(UIConst.CHAT)) {
                //新创建队伍需要关闭聊天
                GGlobal.layerMgr.close2(UIConst.CHAT);
            }
            GGlobal.control.notify(Enum_MsgType.LHFB_CUR_ID_CHANGE, { isScroll: false });
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LHFB_TEAM_DATA_UPDATE);
        }
    }

    public cmdSendJoinTeam(pTeamId: number) {
        let t = this;
        if (t.isInAct) {
            //正在跨服中
            t.CG_RebornFB_joinTeam_11867(pTeamId);
        }
        else {
            //没有在跨服中，通过外部链接进入
            if (!ModuleManager.isOpen(UIConst.LHFB, true))
                return;
            t._tempToJoinTeamId = pTeamId;
            t.cmdSendEnter();
            // GGlobal.layerMgr.open(UIConst.LHFB);
            // SimpleTimer.ins().addTimer(t.onDelayClearTeamId, t, 1000, 1);
        }
    }

    //用于超时清除缓存的队伍id
    private onDelayClearTeamId() {
        let t = this;
        t._tempToJoinTeamId = 0;
    }

    /**11867 I 申请加入队伍 I:队伍idteamId*/
    public CG_RebornFB_joinTeam_11867(arg1): void {
        let t = this;
        if (t.isInTeam) {
            ViewCommonWarn.text("您已经在其他队伍中了");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(11867, bates, true);
    }

    /**11868 B 申请加入队伍返回 B:状态:0-成功,1-协助次数不足,2-你已经有队伍,3-队伍不存在,4-队伍已满,5-队伍已进入战斗,6-轮回等级不足state*/
    public GC_RebornFB_joinTeam_11868(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readByte();
        let t_success = false;
        self._tempToJoinTeamId = 0;
        switch (arg1) {
            case 0:
                t_success = true;
                break;
            case 1:
                ViewCommonWarn.text("协助次数不足");
                break;
            case 2:
                ViewCommonWarn.text("你已经有队伍了");
                break;
            case 3:
                ViewCommonWarn.text("队伍不存在");
                break;
            case 4:
                ViewCommonWarn.text("队伍已满");
                break;
            case 5:
                ViewCommonWarn.text("队伍已进入战斗");
                break;
            case 6:
                ViewCommonWarn.text("轮回等级不足");
                break;
            default:
                ViewCommonWarn.text("加入队伍失败");
                break;
        }
        // if (t_success && GGlobal.layerMgr.isOpenView(UIConst.LHFB) && !self.isInTeam) {
        //     //申请加入失败后需要关闭界面
        //     GGlobal.layerMgr.close2(UIConst.LHFB);
        //     if (Model_GlobalMsg.kaifuDay > 7)
        //         GGlobal.layerMgr.open(UIConst.CHAT);
        //     else
        //         GGlobal.layerMgr.open(UIConst.CHAT, 1);
        // }
        if (t_success) {
            if (!GGlobal.layerMgr.isOpenView(UIConst.LHFB)) {
                GGlobal.layerMgr.open(UIConst.LHFB);
            }
        }
        else {
            if (!self.isInTeam) {
                //不成功的话退出跨服
                self.cmdSendExit();
            }
        }
    }

    private _lastInviteTeamId = 0;
    /**11869  发出邀请 */
    public CG_RebornFB_invitation_11869(): void {
        let t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader) {
            ViewCommonWarn.text("你不是队长，不能进行邀请");
            return;
        }
        if (t.teamVo.memberList.length >= 3) {
            ViewCommonWarn.text("队伍已满员");
            return;
        }
        if (t.teamVo.teamId == t._lastInviteTeamId && !TimeUitl.cool("ModelLhfb.CG_RebornFB_invitation_11869", 10000)) {
            ViewCommonWarn.text("你已发送过邀请了，请耐心等候");
            return;
        }
        var bates = this.getBytes();
        this.sendSocket(11869, bates, true);
        t._lastInviteTeamId = t.teamVo.teamId;
    }

    /**11870 B 发出邀请返回 B:状态:0-成功,1-不在队伍中,2-不是队长,3-队伍已满人,4-队伍不存在state*/
    public GC_RebornFB_invitation_11870(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0:
                ViewCommonWarn.text("成功发出了邀请");
                break;
            case 1:
                ViewCommonWarn.text("你不在队伍中");
                break;
            case 2:
                ViewCommonWarn.text("你不是队长，不能进行邀请");
                break;
            case 3:
                ViewCommonWarn.text("队伍已满");
                break;
            case 4:
                ViewCommonWarn.text("队伍不存在");
                break;
            default:
                ViewCommonWarn.text("邀请操作失败");
                break;
        }
    }

    /**11872 I-U-I 邀请广播 I:队伍idteamIdU:队长名字nameI:轮回等级level*/
    public GC_RebornFB_invitationBroads_11872(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readInt();
        let arg2 = data.readUTF();
        let arg3 = data.readInt();
    }

    private _closeWinAfterExit = false;
    /** 退出队伍 */
    public cmdSendExitTeam(pCloseWinAfterExit: boolean) {
        let t = this;
        if (t.isInTeam) {
            if (pCloseWinAfterExit) { //从ui的按钮关闭的话需要在退出后关闭界面
                t._closeWinAfterExit = true;
            }
            else {
            }
            t.CG_RebornFB_exitTeam_11873();
        }
    }

    /**11873  退出队伍 */
    public CG_RebornFB_exitTeam_11873(): void {
        let t = this;
        if (!t.isInTeam)
            return;
        var bates = this.getBytes();
        this.sendSocket(11873, bates, true);
    }

    /**11874 B 退出队伍返回 B:状态:0-成功,1-失败state*/
    public GC_RebornFB_exitTeam_11874(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0: //成功退出队伍
                self.clearTeamVo();
                if (self._closeWinAfterExit) {
                    GGlobal.layerMgr.close2(UIConst.LHFB);
                    self._closeWinAfterExit = false;
                }
                break;
            default:
                break;
        }
    }

    /**11875 L 移除队友 L:队友hidmemHid*/
    public CG_RebornFB_moveMeber_11875(arg1): void {
        let t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader)
            return;
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(11875, bates, true);
    }

    /**11876 B 移除队友返回 B:状态:0-成功,1-你没在队伍中,2-队伍不存在,3-你不是队长,4-该队员不存在state*/
    public GC_RebornFB_moveMeber_11876(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0:
                if (self.areYouLeader) {
                }
                else { //非队长收到这个就是说被T了
                    self.clearTeamVo();
                    ViewCommonWarn.text("你被请离了队伍");
                    GGlobal.layerMgr.close2(UIConst.LHFB); //被t了需要关闭界面
                }
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
    }

    /**11877  刷新星级 */
    public CG_RebornFB_refreshStar_11877(): void {
        let t = this;
        if (!t.areYouLeader) {
            ViewCommonWarn.text("只有队长才能刷新奖励");
            return;
        }
        if (t.teamVo.star >= EnumLhfb.MAX_STAR) {
            ViewCommonWarn.text("已达最大星数");
            return;
        }
        if (!FastAPI.checkItemEnough(t.starUpNeedItem.id, t.starUpNeedItem.count, true))
            return;
        var bates = this.getBytes();
        this.sendSocket(11877, bates, true);
    }

    /**11878 B-I 刷新星级返回 B:状态:0-成功,1-失败stateI:当前星级star*/
    public GC_RebornFB_refreshStar_11878(self: ModelLhfb, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readByte();
        let arg2 = data.readInt();
        switch (arg1) {
            case 0: //成功
                if (self.isInTeam) {
                    if (self.areYouLeader) {
                        let t_copy = self.getCopyVoByLunhuiId(self.teamVo.lunhuiId);
                        if (t_copy) {
                            if (t_copy.star != arg2) {
                                t_copy.star = arg2;
                                t_change = true;
                            }
                        }
                    }
                    if (self.teamVo.star != arg2) {
                        self.teamVo.star = arg2;
                        t_change = true;
                    }
                }
                else {
                }
                ViewCommonWarn.text("刷新成功");
                break;
            default:
                break;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LHFB_UPDATE);
        }
    }

    /**11880 I 通知星级变化 I:当前星级star*/
    public GC_RebornFB_noticeStar_11880(self: ModelLhfb, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readInt();
        if (self.isInTeam) {
            if (self.areYouLeader) {
                let t_copy = self.getCopyVoByLunhuiId(self.teamVo.lunhuiId);
                if (t_copy) {
                    if (t_copy.star != arg1) {
                        t_copy.star = arg1;
                        t_change = true;
                    }
                }
            }
            if (self.teamVo.star != arg1) {
                self.teamVo.star = arg1;
                t_change = true;
            }
        }
        else {
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LHFB_UPDATE);
        }
    }

    /**11881  开始挑战 */
    public CG_RebornFB_battle_11881(): void {
        let t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader)
            return;
        let t_copyVo = t.getCopyVoByLunhuiId(t.teamVo.lunhuiId);
        if (!t_copyVo)
            return;
        if (t_copyVo.remainCount <= 0) {
            ViewCommonWarn.text("当前副本剩余挑战次数不足");
            return;
        }
        var bates = this.getBytes();
        this.sendSocket(11881, bates, true);
    }

    /**11882 B 开始挑战返回 B:状态:0-成功,1-失败state*/
    public GC_RebornFB_battle_11882(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readByte();
        switch (arg1) {
            case 0:
                self.clearBattleInfo(); //进入场景前线清空战斗信息
                GGlobal.mapscene.enterScene(SceneCtrl.LHFB); //开始挑战进入场景
                break;
            default:
                break;
        }
    }

    /**11884 L-L-L-[U-L] 场景刷新数据 L:boss气血上限bossHpMaxL:boss当前气血bossHpL:我的伤害myHurt[U:名字L:伤害]伤害排行数据hurtList*/
    public GC_RebornFB_reflashSceneData_11884(self: ModelLhfb, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readLong(); //boss血量上限
        let arg2 = data.readLong(); //boss当前血量
        let arg3 = data.readLong();

        if (self.bossHp != arg2) {
            self.bossHp = arg2;
            t_change = true;
        }

        if (self.bossHpMax != arg1) {
            self.bossHpMax = arg1;
            t_change = true;
        }

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg4 = data.readUTF();
            let arg5 = data.readLong();
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LHFB_BATTLE_HP_UPDATE);
        }
    }

    /**11886 L 死亡广播 L:角色IDid*/
    public GC_RebornFB_death_11886(self: ModelLhfb, data: BaseBytes): void {
        let arg1 = data.readLong();
        GGlobal.control.notify(Enum_MsgType.LHFB_BATTLE_DEAD, { roleId: arg1 });
    }

    /**11887  退出战斗 */
    public CG_RebornFB_leaveBattle_11887(): void {
        var bates = this.getBytes();
        this.sendSocket(11887, bates, true);
    }

    /**
     * 显示胜利失败界面
     * @param pResult 0失败 1胜利
     */
    public showResultPanel(pResult: number, pRewarList: IGridImpl[] = null) {
        let t = this;
        t.hasResult = true;
        if (pResult == 1) {
            //胜利
            ViewCommonWin.show(pRewarList, 5000, t, "退出", t.onResultExit);
        }
        else {
            //失败
            ViewCommonFail.show(5000, t, "离开", t.onResultExit);
        }
    }

    public onResultExit() {
        let t = this;
        GGlobal.modelScene.returnMainScene();
        if (t.isInTeam) {
            //没有队伍信息，则退回到主界面
            GGlobal.layerMgr.open(UIConst.LHFB);
        }
        else {
            //没有队伍了要发送离开跨服
            t.cmdSendExit();
        }
        t.hasResult = false;
    }

    /**11888  战斗结束 */
    public GC_RebornFB_battleEnd_11888(self: ModelLhfb, data: BaseBytes): void {

    }

    /**11890 [L-L] 刷新队友血量 [L:玩家或机器人IDL:气血值]队伍气血数据hpList*/
    public GC_RebornFB_reflashTeamHP_11890(self: ModelLhfb, data: BaseBytes): void {
        let t_change = false;
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readLong();
            let arg2 = data.readLong();

            let t_vo = self.battleVoMap[arg1];
            if (!t_vo) {
                self.battleVoMap[arg1] = t_vo = VoBattleLhfb.getFromPool();
                t_vo.roleId = arg1;
            }
            if (t_vo.curHp != arg2) {
                t_vo.curHp = arg2;
                t_change = true;
            }
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LHFB_BATTLE_HP_UPDATE);
        }
    }

    /** 清空战斗信息 */
    private clearBattleInfo() {
        let t = this;
        for (let k in t.battleVoMap) {
            let t_vo = t.battleVoMap[k];
            if (t_vo) {
                delete t.battleVoMap[k];
                VoBattleLhfb.recycleToPool(t_vo);
            }
        }
    }

    /** 清空队伍信息 */
    private clearTeamVo() {
        let t = this;
        if (t.isInTeam) {
            t.teamVo.clear();
            GGlobal.control.notify(Enum_MsgType.LHFB_TEAM_DATA_UPDATE);
        }
    }
    //=========================================== API ==========================================
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

    public getCurLunhuiId(): number {
        let t = this;
        if (t.isInTeam) {
            return t.teamVo.lunhuiId;
        }
        else {
            return t._curLunhuiId;
        }
    }

    public getBattleVoByRoleId(pRoleId: number): VoBattleLhfb {
        let t = this;
        return t.battleVoMap[pRoleId];
    }

    /**
     * 通过轮回id获取副本数据信息
     * @param pLunhuiId 轮回id
     */
    public getCopyVoByLunhuiId(pLunhuiId: number): VoCopyLhfb {
        return this.copyVoList[pLunhuiId - 1];
    }

    /**
     * 通过轮回id和星数获取关卡vo
     * @param pLunhuiId 轮回id
     * @param pStar 星数
     */
    public getLevelVoByLunhuiIdAndStar(pLunhuiId: number, pStar: number): VoLevelLhfb {
        let t = this;
        let t_levelId = pLunhuiId * 1000 + pStar;
        let t_vo = t._levelVoMap[t_levelId];
        if (t_vo === undefined) {
            let t_cfg = Config.lhfb_337[t_levelId];
            if (t_cfg) {
                t_vo = new VoLevelLhfb();
                t_vo.levelId = t_levelId;
                t_vo.lunhuiId = pLunhuiId;
                t_vo.star = pStar;
            }
            else {
                t_vo = null;
            }
            t._levelVoMap[t_levelId] = t_vo;
        }
        return t_vo;
    }

    /**
     * 通过关卡id获取关卡vo
     * @param pLevelId 关卡id
     */
    public getLevelVoByLevelId(pLevelId: number): VoLevelLhfb {
        let t_lunhuiId = ~~(pLevelId / 1000);
        let t_star = pLevelId % 1000;
        return this.getLevelVoByLunhuiIdAndStar(t_lunhuiId, t_star);
    }

    private _starNeed: IGridImpl;
    /** 刷星消耗 */
    public get starUpNeedItem(): IGridImpl {
        let t = this;
        if (t._starNeed === undefined) {
            let t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(8230));
            t._starNeed = t_list[0]
        }
        return t._starNeed;
    }

    /** 每个副本最大挑战次数 */
    public get maxChallenge(): number {
        return FastAPI.getSystemValue(8231);
    }

    /** 最大的协助次数（全副本共享） */
    public get maxHelp(): number {
        return FastAPI.getSystemValue(8232);
    }

    /** 剩余协助次数 */
    public get remainHelp(): number {
        let t = this;
        let t_remain = t.maxHelp - t.hasHelp;
        return t_remain < 0 ? 0 : t_remain;
    }

    private _helpRewardList: IGridImpl[];
    /** 协助奖励 */
    public get helpRewardList(): IGridImpl[] {
        let t = this;
        if (t._helpRewardList === undefined) {
            t._helpRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(8233));
        }
        return t._helpRewardList;
    }

    private _helpConsume: IGridImpl;
    /** 协助次数消耗 */
    public get helpConsume(): IGridImpl {
        let t = this;
        if (t._helpConsume === undefined) {
            let t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(8234));
            t._helpConsume = t_list[0];
        }
        return t._helpConsume;
    }
    //===================================== private method =====================================
    private reddotCheck() {
        let t = this;
        let t_value = 0;
        for (let v of t.copyVoList) {
            if (v.remainCount > 0 && v.canEnter(false)) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(UIConst.LHFB + "|" + 1, t_value);
    }
    //======================================== handler =========================================
}