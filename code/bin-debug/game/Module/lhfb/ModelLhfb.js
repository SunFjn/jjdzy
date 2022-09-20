var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 轮回副本管理器
 * @author: lujiahao
 * @date: 2020-02-26 14:47:59
 */
var ModelLhfb = (function (_super) {
    __extends(ModelLhfb, _super);
    function ModelLhfb() {
        var _this = _super.call(this) || this;
        _this.copyVoList = [];
        _this._levelVoMap = {};
        /** 已协助次数 */
        _this.hasHelp = 0;
        /** 队伍信息 */
        _this.teamVo = new VoTeamLhfb();
        /** 当前的轮回id（进度） */
        _this._curLunhuiId = 0;
        _this.battleVoMap = {};
        _this.bossHp = 0;
        _this.bossHpMax = 0;
        _this.hasResult = false;
        _this.isInBattle = false;
        _this.isInAct = false;
        /** 临时缓存邀请链接的队伍id */
        _this._tempToJoinTeamId = 0;
        /** 缓存正在连上跨服时的创建队伍的请求 */
        _this._tempCreateLunhunId = 0;
        /** 记录是否正在连上跨服的状态 */
        _this._isLogining = false;
        _this._setupFlag = false;
        _this._lastInviteTeamId = 0;
        _this._closeWinAfterExit = false;
        return _this;
    }
    ModelLhfb.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        var t = this;
        {
            var t_lunhuiIdMap = {};
            var t_cfg = Config.lhfb_337;
            for (var k in t_cfg) {
                var t_levelId = ~~k;
                var t_lunhuiId = ~~(t_levelId / 1000);
                if (!t_lunhuiIdMap[t_lunhuiId]) {
                    t_lunhuiIdMap[t_lunhuiId] = true;
                    var t_vo = new VoCopyLhfb();
                    t_vo.lunhuiId = t_lunhuiId;
                    t.copyVoList.push(t_vo);
                }
            }
        }
    };
    //========================================= 协议相关 ========================================
    ModelLhfb.prototype.listenServ = function (mgr) {
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
    };
    /**11891  登录中央服 */
    ModelLhfb.prototype.CG_RebornFB_loginCross_11891 = function () {
        var bates = this.getBytes();
        this.sendSocket(11891, bates);
        var t = this;
        t._isLogining = true;
    };
    /**11892 B 登录中央服返回 B:状态:0-成功,1-失败state*/
    ModelLhfb.prototype.GC_RebornFB_loginCross_11892 = function (self, data) {
        var arg1 = data.readByte();
        self._isLogining = false;
        switch (arg1) {
            case 0:
                self.isInAct = true;
                if (self._tempCreateLunhunId > 0) {
                    var t_lunhuiId = self._tempCreateLunhunId;
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
    };
    /**11861  打开轮回副本界面 */
    ModelLhfb.prototype.CG_RebornFB_openUi_11861 = function () {
        var bates = this.getBytes();
        this.sendSocket(11861, bates);
    };
    ModelLhfb.prototype.cmdSendEnter = function () {
        var t = this;
        if (t._isLogining)
            return;
        if (t.isInAct)
            return;
        t.CG_RebornFB_loginCross_11891();
    };
    ModelLhfb.prototype.cmdSendExit = function () {
        var t = this;
        if (!t.isInAct)
            return;
        t.cmdSendExitTeam(false);
        Model_WorldNet.exiteCross();
        t.clearBattleInfo();
        t.clearTeamVo();
        t._tempCreateLunhunId = 0;
        t._isLogining = false;
        t.isInAct = false;
    };
    /**11862 I-[I-I-I] 打开轮回副本界面返回 I:已经协助次数helpNum[I:副本轮回等级I:副本星级I:已挑战次数]副本信息battleInfo*/
    ModelLhfb.prototype.GC_RebornFB_openUi_11862 = function (self, data) {
        var t_change = false;
        var arg1 = data.readInt(); //已协助次数
        if (self.hasHelp != arg1) {
            self.hasHelp = arg1;
            t_change = true;
        }
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg2 = data.readInt(); //轮回id
            var arg3 = data.readInt(); //星数
            var arg4 = data.readInt(); //已挑战次数
            var t_vo = self.getCopyVoByLunhuiId(arg2);
            if (t_vo && t_vo.update({ star: arg3, hasPass: arg4 })) {
                t_change = true;
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LHFB_UPDATE);
        }
        var t_myLunhuiId = Model_player.voMine.reincarnationLevel;
        var t_tempLunhuiId = 0;
        for (var _i = 0, _a = self.copyVoList; _i < _a.length; _i++) {
            var v = _a[_i];
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
    };
    /**11863 I 创建队伍 I:轮回等级rebornLv*/
    ModelLhfb.prototype.CG_RebornFB_createTeam_11863 = function (pLunhuiId) {
        var t = this;
        var t_copyVo = t.getCopyVoByLunhuiId(pLunhuiId);
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
    };
    /**11864 B 创建队伍返回 B:状态:0-成功,1-数据不存在,2-配置不存在,3-轮回等级不足,4-你已经有队伍,5-操作太频繁state*/
    ModelLhfb.prototype.GC_RebornFB_createTeam_11864 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 0://成功
                // ViewCommonWarn.text("队伍创建成功");
                break;
            case 1://失败
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
    };
    /**11866 B-L-I-I-I-[L-I-I-U-I-L-I] 队伍信息变化 B:状态:0-创建队伍,1-有人加入,2-有人离开,3-队伍解散,4-刷新星数stateL:队长idcapHidI:队伍idteamIdI:轮回等级levelI:副本星数star[L:玩家idI:头像I:头像框U:玩家名字I:等级L:战力I:轮回等级]队伍信息teamInfo*/
    ModelLhfb.prototype.GC_RebornFB_teamInfoChage_11866 = function (self, data) {
        var t_change = false;
        var t_old = self.isInTeam;
        var arg1 = data.readByte(); //操作字段 0创建队伍 1有人加入 2有人退出 3队伍解散
        if (arg1 == 3) {
            //队长解散了队伍
            var t_isLeader = self.areYouLeader;
            self.clearTeamVo();
            if (!t_isLeader) {
                GGlobal.layerMgr.close2(UIConst.LHFB);
                ViewCommonWarn.text("队长解散了队伍");
            }
            else {
            }
            return;
        }
        var arg2 = data.readLong(); //队长id
        var arg3 = data.readInt(); //队伍id
        var arg4 = data.readInt(); //轮回id
        var arg5 = data.readInt(); //星数
        self.teamVo.teamId = arg3;
        self.teamVo.leaderId = arg2;
        self.teamVo.lunhuiId = arg4;
        self.teamVo.star = arg5;
        self.teamVo.memberList.length = 0; //先清空队伍信息
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg6 = data.readLong(); //玩家id
            var arg7 = data.readInt(); //头像
            var arg8 = data.readInt(); //头像框
            var arg9 = data.readUTF(); //玩家名字
            var arg10 = data.readInt(); //等级
            var arg11 = data.readLong(); //战力
            var arg12 = data.readInt(); //轮回等级
            var t_memberVo = new VoTeamMemberLhfb();
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
            self.teamVo.memberList.sort(function (pA, pB) {
                var t_vA = pA.sortValue;
                var t_vB = pB.sortValue;
                if (t_vA == t_vB) {
                    return pA.roleId - pB.roleId;
                }
                else
                    return t_vB - t_vA;
            });
        }
        t_change = true;
        var t_new = self.isInTeam;
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
    };
    ModelLhfb.prototype.cmdSendJoinTeam = function (pTeamId) {
        var t = this;
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
    };
    //用于超时清除缓存的队伍id
    ModelLhfb.prototype.onDelayClearTeamId = function () {
        var t = this;
        t._tempToJoinTeamId = 0;
    };
    /**11867 I 申请加入队伍 I:队伍idteamId*/
    ModelLhfb.prototype.CG_RebornFB_joinTeam_11867 = function (arg1) {
        var t = this;
        if (t.isInTeam) {
            ViewCommonWarn.text("您已经在其他队伍中了");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(11867, bates, true);
    };
    /**11868 B 申请加入队伍返回 B:状态:0-成功,1-协助次数不足,2-你已经有队伍,3-队伍不存在,4-队伍已满,5-队伍已进入战斗,6-轮回等级不足state*/
    ModelLhfb.prototype.GC_RebornFB_joinTeam_11868 = function (self, data) {
        var arg1 = data.readByte();
        var t_success = false;
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
    };
    /**11869  发出邀请 */
    ModelLhfb.prototype.CG_RebornFB_invitation_11869 = function () {
        var t = this;
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
    };
    /**11870 B 发出邀请返回 B:状态:0-成功,1-不在队伍中,2-不是队长,3-队伍已满人,4-队伍不存在state*/
    ModelLhfb.prototype.GC_RebornFB_invitation_11870 = function (self, data) {
        var arg1 = data.readByte();
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
    };
    /**11872 I-U-I 邀请广播 I:队伍idteamIdU:队长名字nameI:轮回等级level*/
    ModelLhfb.prototype.GC_RebornFB_invitationBroads_11872 = function (self, data) {
        var arg1 = data.readInt();
        var arg2 = data.readUTF();
        var arg3 = data.readInt();
    };
    /** 退出队伍 */
    ModelLhfb.prototype.cmdSendExitTeam = function (pCloseWinAfterExit) {
        var t = this;
        if (t.isInTeam) {
            if (pCloseWinAfterExit) {
                t._closeWinAfterExit = true;
            }
            else {
            }
            t.CG_RebornFB_exitTeam_11873();
        }
    };
    /**11873  退出队伍 */
    ModelLhfb.prototype.CG_RebornFB_exitTeam_11873 = function () {
        var t = this;
        if (!t.isInTeam)
            return;
        var bates = this.getBytes();
        this.sendSocket(11873, bates, true);
    };
    /**11874 B 退出队伍返回 B:状态:0-成功,1-失败state*/
    ModelLhfb.prototype.GC_RebornFB_exitTeam_11874 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 0://成功退出队伍
                self.clearTeamVo();
                if (self._closeWinAfterExit) {
                    GGlobal.layerMgr.close2(UIConst.LHFB);
                    self._closeWinAfterExit = false;
                }
                break;
            default:
                break;
        }
    };
    /**11875 L 移除队友 L:队友hidmemHid*/
    ModelLhfb.prototype.CG_RebornFB_moveMeber_11875 = function (arg1) {
        var t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader)
            return;
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(11875, bates, true);
    };
    /**11876 B 移除队友返回 B:状态:0-成功,1-你没在队伍中,2-队伍不存在,3-你不是队长,4-该队员不存在state*/
    ModelLhfb.prototype.GC_RebornFB_moveMeber_11876 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 0:
                if (self.areYouLeader) {
                }
                else {
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
    };
    /**11877  刷新星级 */
    ModelLhfb.prototype.CG_RebornFB_refreshStar_11877 = function () {
        var t = this;
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
    };
    /**11878 B-I 刷新星级返回 B:状态:0-成功,1-失败stateI:当前星级star*/
    ModelLhfb.prototype.GC_RebornFB_refreshStar_11878 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        switch (arg1) {
            case 0://成功
                if (self.isInTeam) {
                    if (self.areYouLeader) {
                        var t_copy = self.getCopyVoByLunhuiId(self.teamVo.lunhuiId);
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
    };
    /**11880 I 通知星级变化 I:当前星级star*/
    ModelLhfb.prototype.GC_RebornFB_noticeStar_11880 = function (self, data) {
        var t_change = false;
        var arg1 = data.readInt();
        if (self.isInTeam) {
            if (self.areYouLeader) {
                var t_copy = self.getCopyVoByLunhuiId(self.teamVo.lunhuiId);
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
    };
    /**11881  开始挑战 */
    ModelLhfb.prototype.CG_RebornFB_battle_11881 = function () {
        var t = this;
        if (!t.isInTeam)
            return;
        if (!t.areYouLeader)
            return;
        var t_copyVo = t.getCopyVoByLunhuiId(t.teamVo.lunhuiId);
        if (!t_copyVo)
            return;
        if (t_copyVo.remainCount <= 0) {
            ViewCommonWarn.text("当前副本剩余挑战次数不足");
            return;
        }
        var bates = this.getBytes();
        this.sendSocket(11881, bates, true);
    };
    /**11882 B 开始挑战返回 B:状态:0-成功,1-失败state*/
    ModelLhfb.prototype.GC_RebornFB_battle_11882 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 0:
                self.clearBattleInfo(); //进入场景前线清空战斗信息
                GGlobal.mapscene.enterScene(SceneCtrl.LHFB); //开始挑战进入场景
                break;
            default:
                break;
        }
    };
    /**11884 L-L-L-[U-L] 场景刷新数据 L:boss气血上限bossHpMaxL:boss当前气血bossHpL:我的伤害myHurt[U:名字L:伤害]伤害排行数据hurtList*/
    ModelLhfb.prototype.GC_RebornFB_reflashSceneData_11884 = function (self, data) {
        var t_change = false;
        var arg1 = data.readLong(); //boss血量上限
        var arg2 = data.readLong(); //boss当前血量
        var arg3 = data.readLong();
        if (self.bossHp != arg2) {
            self.bossHp = arg2;
            t_change = true;
        }
        if (self.bossHpMax != arg1) {
            self.bossHpMax = arg1;
            t_change = true;
        }
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg4 = data.readUTF();
            var arg5 = data.readLong();
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.LHFB_BATTLE_HP_UPDATE);
        }
    };
    /**11886 L 死亡广播 L:角色IDid*/
    ModelLhfb.prototype.GC_RebornFB_death_11886 = function (self, data) {
        var arg1 = data.readLong();
        GGlobal.control.notify(Enum_MsgType.LHFB_BATTLE_DEAD, { roleId: arg1 });
    };
    /**11887  退出战斗 */
    ModelLhfb.prototype.CG_RebornFB_leaveBattle_11887 = function () {
        var bates = this.getBytes();
        this.sendSocket(11887, bates, true);
    };
    /**
     * 显示胜利失败界面
     * @param pResult 0失败 1胜利
     */
    ModelLhfb.prototype.showResultPanel = function (pResult, pRewarList) {
        if (pRewarList === void 0) { pRewarList = null; }
        var t = this;
        t.hasResult = true;
        if (pResult == 1) {
            //胜利
            ViewCommonWin.show(pRewarList, 5000, t, "退出", t.onResultExit);
        }
        else {
            //失败
            ViewCommonFail.show(5000, t, "离开", t.onResultExit);
        }
    };
    ModelLhfb.prototype.onResultExit = function () {
        var t = this;
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
    };
    /**11888  战斗结束 */
    ModelLhfb.prototype.GC_RebornFB_battleEnd_11888 = function (self, data) {
    };
    /**11890 [L-L] 刷新队友血量 [L:玩家或机器人IDL:气血值]队伍气血数据hpList*/
    ModelLhfb.prototype.GC_RebornFB_reflashTeamHP_11890 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readLong();
            var arg2 = data.readLong();
            var t_vo = self.battleVoMap[arg1];
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
    };
    /** 清空战斗信息 */
    ModelLhfb.prototype.clearBattleInfo = function () {
        var t = this;
        for (var k in t.battleVoMap) {
            var t_vo = t.battleVoMap[k];
            if (t_vo) {
                delete t.battleVoMap[k];
                VoBattleLhfb.recycleToPool(t_vo);
            }
        }
    };
    /** 清空队伍信息 */
    ModelLhfb.prototype.clearTeamVo = function () {
        var t = this;
        if (t.isInTeam) {
            t.teamVo.clear();
            GGlobal.control.notify(Enum_MsgType.LHFB_TEAM_DATA_UPDATE);
        }
    };
    Object.defineProperty(ModelLhfb.prototype, "isInTeam", {
        //=========================================== API ==========================================
        /** 是否在队伍中 */
        get: function () {
            var t = this;
            return t.teamVo.teamId > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelLhfb.prototype, "areYouLeader", {
        /** 你是否队长 */
        get: function () {
            var t = this;
            if (t.teamVo.teamId > 0 && t.teamVo.leaderId == Model_player.voMine.id)
                return true;
            else
                return false;
        },
        enumerable: true,
        configurable: true
    });
    ModelLhfb.prototype.getCurLunhuiId = function () {
        var t = this;
        if (t.isInTeam) {
            return t.teamVo.lunhuiId;
        }
        else {
            return t._curLunhuiId;
        }
    };
    ModelLhfb.prototype.getBattleVoByRoleId = function (pRoleId) {
        var t = this;
        return t.battleVoMap[pRoleId];
    };
    /**
     * 通过轮回id获取副本数据信息
     * @param pLunhuiId 轮回id
     */
    ModelLhfb.prototype.getCopyVoByLunhuiId = function (pLunhuiId) {
        return this.copyVoList[pLunhuiId - 1];
    };
    /**
     * 通过轮回id和星数获取关卡vo
     * @param pLunhuiId 轮回id
     * @param pStar 星数
     */
    ModelLhfb.prototype.getLevelVoByLunhuiIdAndStar = function (pLunhuiId, pStar) {
        var t = this;
        var t_levelId = pLunhuiId * 1000 + pStar;
        var t_vo = t._levelVoMap[t_levelId];
        if (t_vo === undefined) {
            var t_cfg = Config.lhfb_337[t_levelId];
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
    };
    /**
     * 通过关卡id获取关卡vo
     * @param pLevelId 关卡id
     */
    ModelLhfb.prototype.getLevelVoByLevelId = function (pLevelId) {
        var t_lunhuiId = ~~(pLevelId / 1000);
        var t_star = pLevelId % 1000;
        return this.getLevelVoByLunhuiIdAndStar(t_lunhuiId, t_star);
    };
    Object.defineProperty(ModelLhfb.prototype, "starUpNeedItem", {
        /** 刷星消耗 */
        get: function () {
            var t = this;
            if (t._starNeed === undefined) {
                var t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(8230));
                t._starNeed = t_list[0];
            }
            return t._starNeed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelLhfb.prototype, "maxChallenge", {
        /** 每个副本最大挑战次数 */
        get: function () {
            return FastAPI.getSystemValue(8231);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelLhfb.prototype, "maxHelp", {
        /** 最大的协助次数（全副本共享） */
        get: function () {
            return FastAPI.getSystemValue(8232);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelLhfb.prototype, "remainHelp", {
        /** 剩余协助次数 */
        get: function () {
            var t = this;
            var t_remain = t.maxHelp - t.hasHelp;
            return t_remain < 0 ? 0 : t_remain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelLhfb.prototype, "helpRewardList", {
        /** 协助奖励 */
        get: function () {
            var t = this;
            if (t._helpRewardList === undefined) {
                t._helpRewardList = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(8233));
            }
            return t._helpRewardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelLhfb.prototype, "helpConsume", {
        /** 协助次数消耗 */
        get: function () {
            var t = this;
            if (t._helpConsume === undefined) {
                var t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(8234));
                t._helpConsume = t_list[0];
            }
            return t._helpConsume;
        },
        enumerable: true,
        configurable: true
    });
    //===================================== private method =====================================
    ModelLhfb.prototype.reddotCheck = function () {
        var t = this;
        var t_value = 0;
        for (var _i = 0, _a = t.copyVoList; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.remainCount > 0 && v.canEnter(false)) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(UIConst.LHFB + "|" + 1, t_value);
    };
    return ModelLhfb;
}(BaseModel));
__reflect(ModelLhfb.prototype, "ModelLhfb");
