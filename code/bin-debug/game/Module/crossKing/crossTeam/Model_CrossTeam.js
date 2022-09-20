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
var Model_CrossTeam = (function (_super) {
    __extends(Model_CrossTeam, _super);
    function Model_CrossTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Model_CrossTeam, "fuBenData", {
        get: function () {
            if (Model_CrossTeam._fuBenData.length <= 0) {
                for (var key in Config.zdfb_255) {
                    var cfg = Config.zdfb_255[key];
                    Model_CrossTeam._fuBenData[parseInt(key) - 1] = cfg;
                }
            }
            return Model_CrossTeam._fuBenData;
        },
        enumerable: true,
        configurable: true
    });
    /**3401 查看副本组队信息 B:副本ID  */
    Model_CrossTeam.prototype.CG_LOOK_TEAM_DATA = function (fubenID) {
        var ba = new BaseBytes();
        ba.writeByte(fubenID);
        this.sendSocket(3401, ba, true);
    };
    /**3403 快速加入 B:类型 1创建副本 2快速加入B:副本ID   */
    Model_CrossTeam.prototype.CG_TEAM_JOINORCREATE = function (type, fubenID) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeByte(fubenID);
        this.sendSocket(3403, ba, true);
    };
    /**3405	（跨服）踢人 L:队员ID  */
    Model_CrossTeam.prototype.CG_TEAM_DELETE_MEMBER = function (memberId) {
        var ba = new BaseBytes();
        ba.writeLong(memberId);
        this.sendSocket(3405, ba, true);
    };
    /**3407	（跨服）开始挑战 */
    Model_CrossTeam.prototype.CG_TEAM_START_BATTLE = function () {
        var ba = new BaseBytes();
        this.sendSocket(3407, ba, true);
    };
    /**3409	（跨服）离开队伍 */
    Model_CrossTeam.prototype.CG_TEAM_LEAVETEAM = function () {
        var ba = new BaseBytes();
        this.sendSocket(3409, ba, true);
    };
    /**3411	（跨服）加入指定队伍 I:队伍IDB:副本ID */
    Model_CrossTeam.prototype.CG_TEAM_JOINTEAM = function (teamID, fubenID) {
        var ba = new BaseBytes();
        ba.writeInt(teamID);
        ba.writeByte(fubenID);
        this.sendSocket(3411, ba, true);
    };
    /**3413	（跨服）拉一个机器人入队伍 */
    Model_CrossTeam.prototype.CG_TEAM_JOINROBOT = function () {
        var ba = new BaseBytes();
        this.sendSocket(3413, ba, true);
    };
    /**3417	死亡通知 I:机器人ID 不是机器人死亡不用发0 */
    Model_CrossTeam.prototype.CG_TEAM_DEADSEND = function (robotID) {
        var ba = new BaseBytes();
        ba.writeInt(robotID);
        this.sendSocket(3417, ba, true);
    };
    /**3419	（跨服）离开队伍 */
    Model_CrossTeam.prototype.CG_TEAM_EXIT_TEAMFUBEN = function () {
        var ba = new BaseBytes();
        this.sendSocket(3419, ba, true);
    };
    /**3421	登录中央服 B:副本IDI:队伍ID（默认是0，聊天框请求队伍ID）*/
    Model_CrossTeam.prototype.CG_TEAM_LOGINCROSSSEVER = function (fubenID, teamId) {
        var ba = new BaseBytes();
        ba.writeByte(fubenID);
        ba.writeInt(teamId);
        this.sendSocket(3421, ba);
    };
    /**3425	收益使用姿态 B:姿态 0勾选 其他:不勾选*/
    Model_CrossTeam.prototype.CG_TEAM_USE_SHOUYI = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(3425, ba, true);
    };
    //协议处理
    Model_CrossTeam.prototype.listenServ = function (mgr) {
        var s = this;
        s.socket = mgr;
        mgr.regHand(3400, s.GC_CROSS_TEAM_SURNUM, s);
        mgr.regHand(3402, s.GC_TEAM_FUBEN_DATA, s);
        mgr.regHand(3404, s.GC_TEAM_JOINORCREATE, s);
        mgr.regHand(3406, s.GC_TEAM_DELETE_MEMBER, s);
        mgr.regHand(3408, s.GC_TEAM_START_BATTLE, s);
        mgr.regHand(3410, s.GC_TEAM_LEAVETEAM, s);
        mgr.regHand(3412, s.GC_TEAM_JOINTEAM, s);
        mgr.regHand(3416, s.GC_TEAM_UPDATEBATTLE_SHOW, s);
        mgr.regHand(3418, s.GC_TEAM_DEADSEND, s);
        mgr.regHand(3424, s.GC_TEAM_UPDATE_ROLEHP, s);
    };
    /**3424	刷新队员气血 [L:玩家或机器人IDL:气血值]队伍气血数据 */
    Model_CrossTeam.prototype.GC_TEAM_UPDATE_ROLEHP = function (self, data) {
        Model_CrossTeam.hpArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_CrossTeam.hpArr.push(data.readFmt(["L", "L"]));
        }
        GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_RANK_UPDATE);
    };
    /**3418	死亡通知广播给其他人 L:角色ID或机器人ID */
    Model_CrossTeam.prototype.GC_TEAM_DEADSEND = function (self, data) {
        var roleID = data.readLong();
        GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_PLAYER_DEAD, roleID);
    };
    /**3416	场景刷新数据 L:boss气血上限L:boss当前气血L:我的伤害[U::名字L:伤害]伤害排行数据 */
    Model_CrossTeam.prototype.GC_TEAM_UPDATEBATTLE_SHOW = function (self, data) {
        Model_CrossTeam.bosshpMax = data.readLong();
        Model_CrossTeam.bosshp = data.readLong();
        Model_CrossTeam.myhurt = data.readLong();
        Model_CrossTeam.rankData = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_CrossTeam.rankData.push(data.readFmt(["U", "L"]));
        }
        GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_RANK_UPDATE);
    };
    /**3412	加入指定队伍（同步所有队员130属性） B:结果 1成功 2你已经有队伍，不能重复加入 3队伍不存在 4队伍已满 5你等级不足，不能加入 */
    Model_CrossTeam.prototype.GC_TEAM_JOINTEAM = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            if (!GGlobal.layerMgr.isOpenView(UIConst.CROSS_TEAM)) {
                GGlobal.layerMgr.open(UIConst.CROSS_TEAM);
            }
        }
        else {
            var arr = ["", "成功", "你已经有队伍，不能重复加入", "队伍不存在", "队伍已满", "你等级不足，不能加入", "队伍已在战斗中"];
            return ViewCommonWarn.text(arr[result]);
        }
    };
    /**3410 离开队伍 B:结果 0战斗结束自动离开 1离开成功 2你没在队伍中 3队伍缓存异常 4被人T出队伍 */
    Model_CrossTeam.prototype.GC_TEAM_LEAVETEAM = function (self, data) {
        var result = data.readByte();
        var arr = ["", "离开成功", "你没在队伍中", "队伍缓存异常", "您被请离了房间"];
        ViewCommonWarn.text(arr[result]);
        if (result == 1 || result == 4) {
            Model_CrossTeam.teamId = 0;
            Model_CrossTeam.myTeamArr.length = 0;
            GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_UPDATE);
        }
    };
    /**3408	开始挑战 B:结果 1开打 2没有队伍 3两个缓存不同步，没有队伍缓存 4队长才能开始战斗 */
    Model_CrossTeam.prototype.GC_TEAM_START_BATTLE = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            // let index: number = 0;
            // for (let i = 0; i < Model_CrossTeam.teamArr.length; i++) {
            // 	let arr = Model_CrossTeam.myTeamArr[i];
            // 	if (arr[2] != Model_player.voMine.id && arr[2] > 0) {
            // 		index++;
            // 	}
            // }
            // if (index == 0) {
            GGlobal.mapscene.enterScene(SceneCtrl.CROSS_TEAM);
            GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_ENTER_SCENE);
            // } else {
            // 	GGlobal.control.listen(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
            // }
        }
    };
    Model_CrossTeam.prototype.enterBattle = function () {
        var index = 0;
        for (var i = 0; i < Model_CrossTeam.teamArr.length; i++) {
            var arr = Model_CrossTeam.myTeamArr[i];
            if (arr[2] != Model_player.voMine.id && arr[2] > 0 && !GGlobal.modelPlayer.playerDetailDic[arr[2]]) {
                index++;
            }
        }
        if (index == 0) {
            GGlobal.mapscene.enterScene(SceneCtrl.CROSS_TEAM);
            GGlobal.control.remove(Enum_MsgType.MSG_ADDROLEDETAIL, this.enterBattle, this);
        }
    };
    /**3406	踢人 B:结果 1成功会刷新队伍数据 2你没在队伍中 3队伍缓存异常 4你不是队长 5该队员不存在 */
    Model_CrossTeam.prototype.GC_TEAM_DELETE_MEMBER = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            ViewCommonWarn.text("踢出成功");
        }
    };
    /**3404	快速加入 B:结果 1打开界面成功 2后端主动刷新前端数据 3配置表没配该等级副本 4转数等级不够，不能加入 5你已经有队伍，不能重复加入 6请连中央服
    I:队伍IDB:副本ID[B:类型 1是队长 2是队员U:队员名字L:队员IDI:机器人IDS:头像IDS:头像框IDS:队员等级L:队员战力]队伍数据 */
    Model_CrossTeam.prototype.GC_TEAM_JOINORCREATE = function (self, data) {
        var result = data.readByte();
        if (result == 1 || result == 2) {
            Model_CrossTeam.myTeamArr.length = 0;
            Model_CrossTeam.teamId = data.readInt();
            Model_CrossTeam.fubenID = data.readByte();
            for (var i = 0, len = data.readShort(); i < len; i++) {
                var arr = data.readFmt(["B", "U", "L", "I", "S", "S", "S", "L"]);
                Model_CrossTeam.myTeamArr.push(arr);
            }
            GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_UPDATE);
        }
        else {
            var prompt_1 = "";
            switch (result) {
                case 4:
                    prompt_1 = "转数等级不够，不能加入";
                    break;
                case 5:
                    prompt_1 = "你已经有队伍，不能重复加入";
                    break;
                case 6:
                    prompt_1 = "请连中央服";
                    break;
                case 7:
                    prompt_1 = "操作太频繁";
                    break;
                default:
                    break;
            }
            ViewCommonWarn.text(prompt_1);
        }
    };
    /**3402 查看副本组队信息 B:结果 1成功 2没有该副本 3转数等级不够，不能查看 4请连跨服[U:队长名I:队伍IDS:头像IDS:头像框IDB:总人数]队伍数据  */
    Model_CrossTeam.prototype.GC_TEAM_FUBEN_DATA = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_CrossTeam.teamArr.length = 0;
            for (var i = 0, len = data.readShort(); i < len; i++) {
                var arr = data.readFmt(["U", "I", "S", "S", "B"]);
                Model_CrossTeam.teamArr.push(arr);
            }
            GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_UPDATE);
        }
    };
    /**3400 登录 B:剩余收益次数  */
    Model_CrossTeam.prototype.GC_CROSS_TEAM_SURNUM = function (self, data) {
        var num = data.readByte();
        Model_CrossTeam.surNum = num;
        GGlobal.control.notify(Enum_MsgType.CROSS_TEAM_UPDATE);
    };
    /**剩余收益次数 */
    Model_CrossTeam.surNum = 0;
    /**队伍ID */
    Model_CrossTeam.teamId = 0;
    /**队伍数组 */
    Model_CrossTeam.teamArr = [];
    /**组队信息 */
    Model_CrossTeam.myTeamArr = [];
    /**副本ID */
    Model_CrossTeam.fubenID = 0;
    /**是否队长 */
    Model_CrossTeam.isLeader = 0;
    /**boss气血上限 */
    Model_CrossTeam.bosshpMax = 0;
    /**boss当前气血 */
    Model_CrossTeam.bosshp = 0;
    /**我的伤害 */
    Model_CrossTeam.myhurt = 0;
    /**气血数组 */
    Model_CrossTeam.hpArr = [];
    /**排行数据 */
    Model_CrossTeam.rankData = [];
    /**零点重置 */
    Model_CrossTeam.isZero = false;
    Model_CrossTeam._fuBenData = [];
    return Model_CrossTeam;
}(BaseModel));
__reflect(Model_CrossTeam.prototype, "Model_CrossTeam");
