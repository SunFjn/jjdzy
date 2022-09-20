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
var Model_LiuChuQS = (function (_super) {
    __extends(Model_LiuChuQS, _super);
    function Model_LiuChuQS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //今日可求助次数
        _this.helpMeCt = 0;
        //今日可帮助次数
        _this.helpOthCt = 0;
        _this.curGuan = 1001; //当前正在挑战的关卡
        _this.saoDCt = 0; //可扫荡次数
        _this.firPass = 0; //首通关卡数
        _this.teamJoinArr = [];
        _this.teamMyArr = [];
        _this.batId = 0; //战斗地图
        _this.joinTeamId = 0;
        return _this;
    }
    // public static leaveMsg = true;//战斗结束离开队伍不需弹提示
    Model_LiuChuQS.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        var self = this;
        wsm.regHand(8202, self.GC_OPENUI_8202, self);
        wsm.regHand(8204, self.GC_TEAM_DATA_8204, self);
        wsm.regHand(8206, self.GC_BUILD_TEAM_8206, self);
        wsm.regHand(8208, self.GC_REMOVE_MEMBER_8208, self);
        wsm.regHand(8210, self.GC_BROAD_CAST_8210, self);
        wsm.regHand(8212, self.GC_BROAD_CAST_8212, self);
        wsm.regHand(8214, self.GC_JOIN_TEAM_8214, self);
        wsm.regHand(8216, self.GC_BATTLE_8216, self);
        wsm.regHand(8218, self.GC_REFLASH_SCENE_8218, self);
        wsm.regHand(8220, self.GC_DEATH_8220, self);
        wsm.regHand(8222, self.GC_REFLASH_TEAM_HP_8222, self);
        wsm.regHand(8226, self.GC_SAO_DANG_8226, self);
        wsm.regHand(8228, self.GC_REFLASH_HELP_NUM_8228, self);
    };
    /**openUI */
    Model_LiuChuQS.prototype.CG_OPENUI_8201 = function () {
        this.sendSocket(8201, this.getBytes());
    };
    /**队伍数据 */
    Model_LiuChuQS.prototype.CG_TEAM_DATA_8203 = function (gua) {
        var bytes = this.getBytes();
        bytes.writeInt(gua);
        this.sendSocket(8203, bytes);
    };
    /**创建队伍 I:关卡id */
    Model_LiuChuQS.prototype.CG_BUILD_TEAM_8205 = function (gua) {
        var bytes = this.getBytes();
        bytes.writeInt(gua);
        this.sendSocket(8205, bytes);
    };
    /**踢人 L:玩家id */
    Model_LiuChuQS.prototype.CG_REMOVE_MEMBER_8207 = function (id) {
        var bytes = this.getBytes();
        bytes.writeLong(id);
        this.sendSocket(8207, bytes);
    };
    /**广播邀请协助 */
    Model_LiuChuQS.prototype.CG_BROAD_CAST_8209 = function () {
        var bytes = this.getBytes();
        this.sendSocket(8209, bytes);
    };
    /**离开队伍 I:关卡id */
    Model_LiuChuQS.prototype.CG_LEAVE_8211 = function (teamId) {
        var bytes = this.getBytes();
        bytes.writeInt(teamId);
        this.sendSocket(8211, bytes);
    };
    /**加入队伍 I:队伍idI: 关卡id*/
    Model_LiuChuQS.prototype.CG_JOIN_TEAM_8213 = function (teamId, guanId) {
        var bytes = this.getBytes();
        bytes.writeInt(teamId);
        bytes.writeInt(guanId);
        this.sendSocket(8213, bytes);
    };
    /**开始战斗*/
    Model_LiuChuQS.prototype.CG_BATTLE_8215 = function () {
        this.sendSocket(8215, this.getBytes());
    };
    /**退出副本*/
    Model_LiuChuQS.prototype.CG_LEAVE_BATTLE_8223 = function () {
        this.sendSocket(8223, this.getBytes());
    };
    /**扫荡*/
    Model_LiuChuQS.prototype.CG_SAO_DANG_8225 = function () {
        this.sendSocket(8225, this.getBytes());
    };
    //=========================================
    /**打开界面 I:今日可求助次数I:今日可帮助次数I:当前关卡（未通关），该id之前的全部关卡则为通关 */
    Model_LiuChuQS.prototype.GC_OPENUI_8202 = function (self, bytes) {
        self.helpMeCt = bytes.readInt();
        self.helpOthCt = bytes.readInt();
        self.curGuan = bytes.readInt();
        self.saoDCt = bytes.readInt();
        self.firPass = bytes.readInt(); //首通关卡关卡数 可扫荡
        self.notify(Model_LiuChuQS.openui);
        self.notify(Model_LiuChuQS.tsmsg_red);
    };
    /**队伍信息 B:结果 1成功 2副本不存在I:关卡id[U:队长名字I:队伍idI:头像idI:头像框idB:总人数]队伍信息 */
    Model_LiuChuQS.prototype.GC_TEAM_DATA_8204 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 1) {
            var guan = bytes.readInt();
            var len = bytes.readShort();
            self.teamJoinArr = [];
            for (var i = 0; i < len; i++) {
                self.teamJoinArr.push({ guan: guan, name: bytes.readUTF(), teamId: bytes.readInt(), headId: bytes.readInt(), frameId: bytes.readInt(), total: bytes.readByte() });
            }
            self.notify(Model_LiuChuQS.room_data);
        }
        else {
            // ViewCommonWarn.text("查看队伍信息失败")
        }
    };
    /**创建队伍 B:结果 1成功 2刷新数据 3副本不存在 4需要通关前面的副本才能打这个副本I:队伍idI:关卡id[B:类型 1队长 2队员U:队员名字 L:队员idI:队员头像 I:队员头像框 I:队员等级L:队员战力]队伍数据 */
    Model_LiuChuQS.prototype.GC_BUILD_TEAM_8206 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 1 || res == 2) {
            var teamId = bytes.readInt();
            var guan = bytes.readInt();
            var len = bytes.readShort();
            self.teamMyArr = [];
            for (var i = 0; i < len; i++) {
                var v = new Vo_LiuChuQS();
                v.readMsg(bytes);
                v.teamId = teamId;
                v.guan = guan;
                self.teamMyArr.push(v);
            }
            self.notify(Model_LiuChuQS.teamui);
            //战斗id
            self.batId = guan;
            Model_LiuChuQS.batIng = false;
        }
        else {
            var arr = ["", "", "", "关卡不存在", "需要通关前一关卡", "已通关不可创建房间"];
            ViewCommonWarn.text(arr[res]);
        }
    };
    /**踢人 B:结果 1成功（刷新队伍数据） 2没在队伍中 3队伍缓存异常 4你不是队长 5该队员不存在 6你被踢出队伍 */
    Model_LiuChuQS.prototype.GC_REMOVE_MEMBER_8208 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 1) {
            ViewCommonWarn.text("踢人成功");
        }
        else if (res == 2) {
            ViewCommonWarn.text("没在队伍中");
        }
        else if (res == 3) {
            ViewCommonWarn.text("队伍缓存异常");
        }
        else if (res == 4) {
            ViewCommonWarn.text("你不是队长");
        }
        else if (res == 5) {
            ViewCommonWarn.text("该队员不存在");
        }
        else if (res == 6) {
            self.teamMyArr = [];
            self.notify(Model_LiuChuQS.teamui);
            ViewCommonWarn.text("你被踢出队伍");
        }
        else {
            ViewCommonWarn.text("踢人失败");
        }
    };
    /**广播邀请协助 B:结果 1成功 2你没在队伍中 3队伍缓存异常 4你不是队长 5队员已满 6操作太频繁 7求助次数已用完 */
    Model_LiuChuQS.prototype.GC_BROAD_CAST_8210 = function (self, bytes) {
        var state = bytes.readByte();
        if (state != 1) {
            //B:结果 1成功 2你没在队伍中 3队伍缓存异常 4你不是队长 5队员已满 6操作太频繁
            ViewCommonWarn.text(["", "已发出协助邀请", "你没在队伍中", "队伍缓存异常", "你不是队长", "队员已满", "操作太频繁", "求助次数已用完"][state]);
        }
        else {
            self.notify(Model_LiuChuQS.msg_invite, 10);
        }
    };
    /**离开队伍 B:结果 1成功 2队伍已解散 战斗则结束*/
    Model_LiuChuQS.prototype.GC_BROAD_CAST_8212 = function (self, bytes) {
        var res = bytes.readByte();
        self.teamMyArr = [];
        self.notify(Model_LiuChuQS.teamui);
        if (res == 1) {
            // ViewCommonWarn.text("解散队伍成功")
        }
        else if (res == 2) {
            ViewCommonWarn.text("队伍已解散");
            if (Model_LiuChuQS.bossHP > 0) {
                self.notify(Model_LiuChuQS.msg_datas_over);
            }
        }
        else {
            ViewCommonWarn.text("队伍已解散");
        }
        // Model_LiuChuQS.leaveMsg = true;
    };
    /**加入队伍 B:结果 1成功 2已有队伍 3队伍不存在 4队伍已满 5队伍已进入战斗，无法加入 6需要通关前面的副本才能打这个副本 7今日帮助次数已用尽 8该玩家已经没有求助次数，不能加入*/
    Model_LiuChuQS.prototype.GC_JOIN_TEAM_8214 = function (self, bytes) {
        var res = bytes.readByte();
        var arr = ["", "加入成功", "已有队伍", "队伍不存在", "队伍已满", "队伍已进入战斗", "需要通关前一关卡", "今日帮助次数已用尽", "该玩家已经没有求助次数"];
        ViewCommonWarn.text(arr[res]);
        if (res == 1) {
            if (GGlobal.layerMgr.isOpenView(UIConst.CHAT)) {
                GGlobal.layerMgr.close2(UIConst.CHAT);
            }
            if (Number(self.joinTeamId) > 0 && !GGlobal.layerMgr.isOpenView(UIConst.CHILD_LCQS_PANEL)) {
                GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, Math.floor(Number(self.joinTeamId) / 1000));
            }
        }
        self.joinTeamId = 0;
    };
    /**开始战斗 B:结果 1成功 2没有队伍 3两个缓存不同步，没有队伍缓存 4队长才能开始战斗 5队伍还在战斗中 */
    Model_LiuChuQS.prototype.GC_BATTLE_8216 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 1) {
            GGlobal.mapscene.enterScene(SceneCtrl.LIU_CHU_QS);
        }
        else {
            var arr = ["", "", "队伍不存在", "队伍不同步", "队长才能开始战斗", "队伍还在战斗中"];
            ViewCommonWarn.text(arr[res]);
        }
    };
    /**场景刷新数据 L:boss气血上限L: boss当前气血L:我的伤害[U:名字 L:伤害]伤害排行 */
    Model_LiuChuQS.prototype.GC_REFLASH_SCENE_8218 = function (self, bytes) {
        Model_LiuChuQS.bossMaxHP = bytes.readLong();
        Model_LiuChuQS.bossHP = bytes.readLong();
        Model_LiuChuQS.myHurt = bytes.readLong();
        var len = bytes.readShort();
        // self.batRank = []
        for (var i = 0; i > len; i++) {
            var name_1 = bytes.readUTF();
            var hurt = bytes.readLong();
            // self.batRank.push({ name: name, hurt: hurt })
        }
        self.notify(Model_LiuChuQS.msg_datas_hurt);
    };
    /**死亡通知广播其他人 L:玩家id */
    Model_LiuChuQS.prototype.GC_DEATH_8220 = function (self, bytes) {
        var playerId = bytes.readLong();
        self.notify(Model_LiuChuQS.msg_datas_dead, playerId);
    };
    /**刷新队员气血 [L:玩家idL:玩家气血]队伍气血数据 */
    Model_LiuChuQS.prototype.GC_REFLASH_TEAM_HP_8222 = function (self, bytes) {
        var len = bytes.readShort();
        Model_LiuChuQS.hpArr.length = 0;
        for (var i = 0; i < len; i++) {
            Model_LiuChuQS.hpArr.push([bytes.readLong(), bytes.readLong()]);
        }
        self.notify(Model_LiuChuQS.msg_datas_hp);
    };
    /**扫荡 B:结果 1成功 2没扫荡次数 3首关都未通关，不能扫荡 4无可扫荡副本[I:关卡id[B:道具类型I:道具idI:道具数量]]所有数据 */
    Model_LiuChuQS.prototype.GC_SAO_DANG_8226 = function (self, bytes) {
        var res = bytes.readByte();
        if (res == 1) {
            var len = bytes.readShort();
            var saoDrop = [];
            for (var i = 0; i < len; i++) {
                var guan = bytes.readInt();
                var drop = [];
                var size = bytes.readShort();
                for (var j = 0; j < size; j++) {
                    drop.push([bytes.readByte(), bytes.readInt(), bytes.readInt()]);
                }
                saoDrop.push({ guan: guan, drop: drop });
            }
            self.saoDCt = 0;
            self.notify(Model_LiuChuQS.tsmsg_red);
            GGlobal.layerMgr.open(UIConst.CHILD_LCQS_SAODANG, saoDrop);
        }
        else if (res == 2) {
            ViewCommonWarn.text("没有扫荡次数");
        }
        else if (res == 3) {
            ViewCommonWarn.text("未通关，不能扫荡");
        }
        else if (res == 4) {
            ViewCommonWarn.text("无可扫荡关卡");
        }
        else {
            ViewCommonWarn.text("扫荡失败");
        }
    };
    /**刷新协助次数 B:已协助次数B: 协助总次数 */
    Model_LiuChuQS.prototype.GC_REFLASH_HELP_NUM_8228 = function (self, bytes) {
        self.helpMeCt = bytes.readByte();
        self.helpOthCt = bytes.readByte();
        self.notify(Model_LiuChuQS.openui);
    };
    Model_LiuChuQS.prototype.getTabArr = function (hard) {
        if (!this._tabObj) {
            this.initCfg();
        }
        return this._tabArr[hard];
    };
    Model_LiuChuQS.prototype.getHard = function (cur) {
        var v = Config.six_279[cur];
        return v ? v.hard : 1; //没有是最后一关
    };
    Model_LiuChuQS.prototype.getGuanArr = function (gua) {
        if (!this._tabObj) {
            this.initCfg();
        }
        return this._tabObj[gua];
    };
    Model_LiuChuQS.prototype.initCfg = function () {
        if (this._tabObj)
            return;
        this._tabObj = {};
        this._tabArr = {};
        for (var keys in Config.six_279) {
            var v = Config.six_279[keys];
            var index = Math.floor(v.id / 1000);
            var hard = v.hard;
            if (this._tabArr[hard] == null) {
                this._tabArr[hard] = [];
            }
            if (this._tabObj[index] == null) {
                this._tabArr[hard].push(v);
                this._tabObj[index] = [];
                this._tabObj[index].push(v);
            }
            else {
                this._tabObj[index].push(v);
            }
        }
    };
    // private _frist = false;
    Model_LiuChuQS.prototype.fristLogin = function () {
        // this._frist = true;
    };
    Model_LiuChuQS.prototype.checkRed = function () {
        //第一次登陆
        // if (!this._frist) {
        // 	this._frist = true;
        // 	return true;
        // }
        if (this.checkSaiDan()) {
            return true;
        }
        return false;
    };
    Model_LiuChuQS.prototype.checkSaiDan = function () {
        //可扫荡
        if (this.firPass > 0 && this.saoDCt > 0 && this.curGuan > 1001) {
            return true;
        }
        return false;
    };
    Model_LiuChuQS.prototype.linkToOpen = function (id, teamId) {
        this.joinTeamId = id;
        // GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, Math.floor(id / 1000))
        this.CG_JOIN_TEAM_8213(teamId, id);
    };
    Model_LiuChuQS.tsmsg_red = "tsmsg_red";
    Model_LiuChuQS.openui = "openui";
    Model_LiuChuQS.room_data = "room_data";
    Model_LiuChuQS.guan_sel = "guan_sel";
    Model_LiuChuQS.guan_sel_msg = "guan_sel_msg";
    Model_LiuChuQS.msg_invite = "msg_invite";
    Model_LiuChuQS.teamui = "teamui";
    //战斗
    Model_LiuChuQS.msg_datas_hurt = "msg_datas_hurt";
    Model_LiuChuQS.msg_datas_hp = "msg_datas_hp";
    Model_LiuChuQS.msg_datas_dead = "msg_datas_dead";
    Model_LiuChuQS.msg_datas_over = "msg_datas_over";
    Model_LiuChuQS.hpArr = [];
    Model_LiuChuQS.batIng = false; //战斗中
    return Model_LiuChuQS;
}(BaseModel));
__reflect(Model_LiuChuQS.prototype, "Model_LiuChuQS");
