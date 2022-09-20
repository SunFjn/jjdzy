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
var ModelShengJieMJ = (function (_super) {
    __extends(ModelShengJieMJ, _super);
    function ModelShengJieMJ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // private datas: ISJMJData[];
        _this.teamInfos = [];
        /** 已经购买了宝箱的副本*/
        _this.idBoughts = {};
        _this.isGetOpen = false;
        _this.isGetID = 0;
        _this.fubenInfo = {};
        _this.sdCntDic = {};
        _this.regId = 0;
        return _this;
    }
    ModelShengJieMJ.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        var self = this;
        wsm.regHand(3762, self.GC3762, self);
        wsm.regHand(3764, self.GC3764, self);
        wsm.regHand(3766, self.GC3766, self);
        wsm.regHand(3768, self.GC3768, self);
        wsm.regHand(3770, self.GC3770, self);
        wsm.regHand(3772, self.GC3772, self);
        wsm.regHand(3774, self.GC3774, self);
        wsm.regHand(3776, self.GC3776, self);
        wsm.regHand(3778, self.GC3778, self);
        wsm.regHand(3780, self.GC3780, self);
        wsm.regHand(3782, self.GC3782, self);
        wsm.regHand(3784, self.GC3784, self);
        wsm.regHand(3788, self.GC3788, self);
        wsm.regHand(3790, self.GC3790, self);
        wsm.regHand(3792, self.GC3792, self);
    };
    ModelShengJieMJ.prototype.isLeader = function () {
        for (var i = 0; i < this.teamInfos.length; i++) {
            var info = this.teamInfos[i];
            if (info.isLeader == 1 && info.id == Model_player.voMine.id) {
                return true;
            }
        }
        return false;
    };
    ModelShengJieMJ.prototype.linkToOpen = function (id, teamId) {
        var self = this;
        self.CG3761();
        self.CG3777(teamId, id);
    };
    ModelShengJieMJ.prototype.isLvlFit = function (id, openLv) {
        if (openLv === void 0) { openLv = -1; }
        if (!Config.sjmjfb_258[id]) {
            return false;
        }
        var tempNum = id / 1000 >> 0;
        if (openLv == -1) {
            openLv = Config.sjmjfb_258[id].open;
        }
        switch (tempNum) {
            case 1://武将
                return openLv <= Model_WuJiang.jieShu;
            case 2://战甲
                return openLv <= Model_ZhanJia.jieShu;
            case 3://宝物
                return openLv <= Model_BaoWu.level;
            case 4://天书
                return openLv <= GGlobal.modeltianshu.level;
            case 5://神剑
                return openLv <= Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
            case 6://异宝
                return openLv <= Model_BySys.sysJie(Model_BySys.YI_BAO);
            case 7://兵法
                return openLv <= Model_BySys.sysJie(Model_BySys.BING_FA);
        }
        return false;
    };
    /**打开UI */
    ModelShengJieMJ.prototype.CG3761 = function () { this.sendSocket(3761, this.getBytes()); };
    ModelShengJieMJ.prototype.GC3762 = function (self, bytes) {
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var type = bytes.readShort();
            var fbID = bytes.readShort();
            var sdCnt = bytes.readByte();
            self.removeSameType(fbID);
            self.fubenInfo[fbID] |= 1;
            self.sdCntDic[type] = sdCnt;
        }
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            self.idBoughts[bytes.readShort()] = true;
        }
        self.notify(ModelShengJieMJ.msg_datas_sjmj);
        // GGlobal.reddot.setCondition(UIConst.SJMJ1, 0, self.notice());
        // GGlobal.reddot.notify(ReddotEvent.CHECK_CROSS_SJMJ);
        if (ShengJieMJSceneCtrl.sucOpenPan) {
            ShengJieMJSceneCtrl.sucOpenPan = false;
            // const data = self.getData(ItemTeam.curMiJing.data.id);
            var oldSelId = ItemTeam.curMiJing.data.id;
            var newId = self.getNewId(oldSelId);
            GGlobal.layerMgr.open(UIConst.SJMJ2, newId);
        }
        else if (self.isGetOpen) {
            self.isGetOpen = false;
            GGlobal.layerMgr.open(UIConst.SJMJ2, self.getFBCfg(self.isGetID).id);
        }
        GGlobal.control.notify(Enum_MsgType.CROSSKING_SJMJ);
    };
    ModelShengJieMJ.prototype.getFBCfg = function (id) {
        var fubenInfo = GGlobal.modelSJMJ.fubenInfo;
        var idAsKey = id;
        for (var key in fubenInfo) {
            var compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return Config.sjmjfb_258[id * 1000 + 1];
    };
    ModelShengJieMJ.prototype.removeSameType = function (id) {
        var idAsKey = id / 1000 >> 0;
        for (var key in this.fubenInfo) {
            var tempId = Number(key) / 1000 >> 0;
            if (tempId == idAsKey) {
                delete this.fubenInfo[key];
                break;
            }
        }
    };
    ModelShengJieMJ.prototype.getNewId = function (oldId) {
        var keyNumber = oldId / 1000 >> 0;
        var ret = oldId;
        for (var key in this.fubenInfo) {
            var compareId = Number(key) / 1000 >> 0;
            if (compareId == keyNumber) {
                ret = Number(key);
                break;
            }
        }
        return ret;
    };
    /**打开秘境 id秘境id*/
    ModelShengJieMJ.prototype.CG3763 = function (id, teamId) {
        if (teamId === void 0) { teamId = 0; }
        var bytes = this.getBytes();
        bytes.writeShort(id);
        if (WorldSocketMgr.instance.isNet) {
            this.sendSocket(3763, bytes, true);
        }
        else {
            this.CG3777(teamId, id);
            this.sendSocket(3763, bytes);
        }
    };
    ModelShengJieMJ.prototype.GC3764 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            var id = bytes.readShort(); //秘境id
            var len = bytes.readShort();
            self.teamInfos.length = 0;
            for (var i = 0; i < len; i++) {
                var info = { name: bytes.readUTF(), teamId: bytes.readInt(), head: bytes.readShort(), headBg: bytes.readShort(), count: bytes.readByte() };
                self.teamInfos.push(info);
            }
            ModelShengJieMJ.isSelfTeam = false;
            self.notify(ModelShengJieMJ.msg_datas_team);
        }
        else {
            //B:结果 1成功 2请连跨服 3副本不存在 4等级不足
            ViewCommonWarn.text("" + ["", "", "请连跨服", "副本不存在", "等级不足"][state]);
        }
    };
    /**创建队伍 id秘境id*/
    ModelShengJieMJ.prototype.CG3765 = function (id) {
        var bytes = this.getBytes();
        bytes.writeShort(id);
        this.sendSocket(3765, bytes, true);
    };
    ModelShengJieMJ.prototype.GC3766 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            var teamId = bytes.readInt();
            var mjId = bytes.readShort();
            var len = bytes.readShort();
            self.teamInfos.length = 0;
            for (var i = 0; i < len; i++) {
                var info = {
                    isLeader: bytes.readByte(), teamId: teamId, name: bytes.readUTF(), id: bytes.readLong(),
                    head: bytes.readShort(), headBg: bytes.readShort(), level: bytes.readShort(), zhanLi: bytes.readLong()
                };
                self.teamInfos.push(info);
            }
            ModelShengJieMJ.isSelfTeam = true;
            self.notify(ModelShengJieMJ.msg_datas_team);
        }
        else {
            //1成功 2刷新数据 3副本不存在 4等级不足 5请连跨服 6操作太频繁 7需要通关前面的副本才能打这个副本 8等阶不足 9该队伍已通关, 不能创建队伍
            ViewCommonWarn.text("" + ["", "", "刷新数据", "副本不存在", "等级不足", "请连跨服", "操作太频繁", "请先通关前面的副本", "等阶不足", "该队伍已通关, 不能创建队伍"][state]);
        }
    };
    /**踢人 */
    ModelShengJieMJ.prototype.CG3767 = function (id) {
        var bytes = this.getBytes();
        bytes.writeLong(id);
        this.sendSocket(3767, bytes, true);
    };
    ModelShengJieMJ.prototype.GC3768 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            //后端刷新队伍数据 
            ViewCommonWarn.text("已请离该玩家");
            self.CG3763(ItemTeam.curMiJing.data.id);
        }
        else {
            //B:结果 1成功（会刷新队伍数据） 2你没在队伍中 3队伍缓存异常 4你不是队长 5该队员不存在 6请访问中央服 7你被踢出队伍
            ViewCommonWarn.text(["", "", "你没在队伍中", "队伍缓存异常", "你不是队长", "该队员不存在", "请访问中央服", "你被踢出队伍"][state]);
        }
    };
    /**邀请协助 */
    ModelShengJieMJ.prototype.CG3769 = function () { this.sendSocket(3769, this.getBytes(), true); };
    ModelShengJieMJ.prototype.GC3770 = function (self, bytes) {
        var state = bytes.readByte();
        if (state != 1) {
            //B:结果 1成功 2你没在队伍中 3队伍缓存异常 4你不是队长 5队员已满 6操作太频繁
            ViewCommonWarn.text(["", "已发出协助邀请", "你没在队伍中", "队伍缓存异常", "你不是队长", "队员已满", "操作太频繁"][state]);
        }
        else {
            self.notify(ModelShengJieMJ.msg_invite, 10);
        }
    };
    /**离开队伍 */
    ModelShengJieMJ.prototype.CG3771 = function () { this.sendSocket(3771, this.getBytes(), true); };
    ModelShengJieMJ.prototype.GC3772 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            //
            self.CG3763(ItemTeam.curMiJing.data.id);
        }
        else {
            //B:结果 1成功 2请访问中央服 3队伍已解散
            if (GGlobal.sceneType != SceneCtrl.CROSS_SJMJ) {
                ViewCommonWarn.text(["", "", "请访问中央服", "队伍已解散"][state]);
            }
        }
    };
    /**加入队伍 */
    ModelShengJieMJ.prototype.CG3773 = function (teamId, mjId) {
        var bytes = this.getBytes();
        bytes.writeInt(teamId);
        bytes.writeShort(mjId);
        this.sendSocket(3773, bytes, true);
    };
    ModelShengJieMJ.prototype.GC3774 = function (self, bytes) {
        var state = bytes.readByte();
        if (state != 1) {
            //B:结果 1成功 2你已经有队伍，不能重复加入 3队伍不存在 4队伍已满 5你等级不足，不能加入 6队伍已在战斗中，无法加入 7请访问中央服 8需要通关前面的副本才能打这个副本 9阶数不够
            ViewCommonWarn.text(["", "", "", "队伍不存在", "队伍已满", "等级不足", "队伍在战斗中", "请访问中央服", "前面的副本还没通关", "阶数不够"][state]);
        }
        else {
            if (GGlobal.layerMgr.isOpenView(UIConst.CHAT)) {
                GGlobal.layerMgr.close2(UIConst.CHAT);
            }
        }
    };
    /**开始战斗 */
    ModelShengJieMJ.prototype.CG3775 = function () { this.sendSocket(3775, this.getBytes(), true); };
    ModelShengJieMJ.prototype.GC3776 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            GGlobal.mapscene.enterScene(SceneCtrl.CROSS_SJMJ);
            GGlobal.control.notify(Enum_MsgType.CROSS_MJ_ENTER_SCENE);
        }
        else {
            //B:结果 1成功 2没有队伍 3两个缓存不同步，没有队伍缓存 4队长才能开始战斗 5请访问中央服
            ViewCommonWarn.text(["", "", "没有队伍", "两个缓存不同步", "队长才能操作", "请访问中央服"][state]);
        }
    };
    /**登录中央服 */
    ModelShengJieMJ.prototype.CG3777 = function (teamId, mjId) {
        var bytes = this.getBytes();
        bytes.writeShort(mjId);
        bytes.writeInt(teamId);
        this.regId = mjId;
        this.sendSocket(3777, bytes);
    };
    ModelShengJieMJ.prototype.GC3778 = function (self, bytes) {
        //B:结果 2副本不存在 3等级不足 4需要通关前面的副本才能打这个副本 5操作太频繁
        var state = bytes.readByte();
        if (state != 1) {
            //B:结果 2副本不存在 3等级不足 4需要通关前面的副本才能打这个副本 5操作太频繁 6等价不够
            ViewCommonWarn.text(["", "", "副本不存在", "等级不足", "前面的副本还没通关", "操作太频繁", "等阶不够"][state]);
        }
        else {
            ViewSJMJ.isInvite = true;
            GGlobal.layerMgr.open(UIConst.SJMJ2, self.regId);
        }
    };
    /**场景数据刷新 */
    ModelShengJieMJ.prototype.GC3780 = function (self, bytes) {
        ModelShengJieMJ.bossMaxHP = bytes.readLong();
        ModelShengJieMJ.bossHP = bytes.readLong();
        ModelShengJieMJ.myHurt = bytes.readLong();
        // var arr = [];
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var name_1 = bytes.readUTF();
            var hurt = bytes.readLong();
            // arr.push([name, hurt]);
        }
        self.notify(ModelShengJieMJ.msg_datas_hurt);
    };
    /**死亡广播 */
    ModelShengJieMJ.prototype.GC3782 = function (self, bytes) {
        var playerId = bytes.readLong();
        self.notify(ModelShengJieMJ.msg_datas_dead, playerId);
    };
    /**刷新场景队员气血 */
    ModelShengJieMJ.prototype.GC3784 = function (self, bytes) {
        var len = bytes.readShort();
        ModelShengJieMJ.hpArr.length = 0;
        for (var i = 0; i < len; i++) {
            ModelShengJieMJ.hpArr.push([bytes.readLong(), bytes.readLong()]);
        }
        self.notify(ModelShengJieMJ.msg_datas_hp);
    };
    /**退出副本 */
    ModelShengJieMJ.prototype.CG3785 = function () { this.sendSocket(3785, this.getBytes(), true); };
    /**扫荡 */
    ModelShengJieMJ.prototype.CG3787 = function (mjId) {
        var bytes = this.getBytes();
        bytes.writeShort(mjId);
        this.sendSocket(3787, bytes);
    };
    ModelShengJieMJ.prototype.GC3788 = function (self, bytes) {
        var state = bytes.readByte();
        var arr = [];
        if (state == 1) {
            var len = bytes.readShort();
            for (var i = 0; i < len; i++) {
                var mjId = bytes.readShort();
                var info = {};
                info.mjId = mjId;
                info.arr = [];
                var rewardLen = bytes.readShort();
                for (var j = 0; j < rewardLen; j++) {
                    var type = bytes.readByte();
                    var id = bytes.readInt();
                    var count = bytes.readInt();
                    info.arr.push([type, id, count]);
                }
                arr.push(info);
            }
        }
        else {
            //B:结果 1完成 2没扫荡次数 3奖励已领取 4未通关，不能扫荡 5没有可扫荡的副本
            ViewCommonWarn.text(["", "", "没有扫荡次数了", "奖励已领取", "未通关, 不能扫荡", "没有可扫荡的副本"][state]);
        }
        if (arr.length > 0) {
            GGlobal.layerMgr.open(UIConst.SJMJ_SD, arr);
        }
    };
    /**购买宝箱 */
    ModelShengJieMJ.prototype.CG3789 = function (id) {
        var bytes = this.getBytes();
        bytes.writeShort(id);
        this.sendSocket(3789, bytes);
    };
    ModelShengJieMJ.prototype.GC3790 = function (self, bytes) {
        //B:结果 1成功 2请访问子服 3副本不存在 4宝箱已购买 5关卡未通关 6道具不足
        var state = bytes.readByte();
        if (state == 1) {
            self.CG3761();
        }
        else {
            //B:结果 1成功 2请访问子服 3副本不存在 4宝箱已购买 5关卡未通关 6道具不足
            if (state == 6) {
                GGlobal.layerMgr.close(UIConst.SJMJ_BX);
                ModelChongZhi.guideToRecharge();
            }
            else {
                ViewCommonWarn.text(["", "", "请访问子服", "副本不存在", "宝箱已购买", "关卡未通关", "元宝不足"][state]);
            }
        }
    };
    ModelShengJieMJ.prototype.GC3792 = function (self, bytes) {
        ModelShengJieMJ.xieZhuCnt = bytes.readByte();
        ModelShengJieMJ.maxXieZhuCnt = bytes.bytesAvailable ? bytes.readByte() : 3;
    };
    ModelShengJieMJ.prototype.notice = function () {
        // if (this.fubenInfo) {
        // for (let i = 0, len = this.datas.length; i < len; i++) {
        //     const data = this.datas[i];
        //     const maxId = data.cfgFB.id;
        //     const fitId = maxId / 1000 >> 0;
        //     if (data.hasPassed) {
        //         const count = maxId % 1000 >> 0;
        //         var cnt = 0;
        //         for (let key in this.idBoughts) {
        //             if (Number(key) / 1000 >> 0 == fitId) {
        //                 cnt++;
        //             }
        //         }
        //         if (cnt < count) {
        //             return true;
        //         }
        //     }
        // }
        for (var key in this.fubenInfo) {
            var tongGuanId = Number(key);
            if (tongGuanId) {
                var idAsKey = tongGuanId / 1000 >> 0;
                var awardCnt = tongGuanId % 1000 >> 0;
                var cnt = 0;
                for (var buyId in this.idBoughts) {
                    if (Number(key) / 1000 >> 0 == idAsKey) {
                        cnt++;
                    }
                }
                if (cnt < awardCnt) {
                    return true;
                }
            }
        }
        return false;
        // }
    };
    ModelShengJieMJ.prototype.noticeSingle = function (id) {
        if (this.fubenInfo[id]) {
            var idAsKey = id / 1000 >> 0;
            var count = id % 1000 >> 0;
            var cnt = 0;
            for (var key in this.idBoughts) {
                if (Number(key) / 1000 >> 0 == idAsKey) {
                    cnt++;
                }
            }
            return cnt < count;
        }
        else {
            return false;
        }
        // if (this.fubenInfo) {
        //     for (let i = 0, len = this.datas.length; i < len; i++) {
        //         const data = this.datas[i];
        //         const maxId = data.cfgFB.id;
        //         if ((data.cfgFB.id / 1000 >> 0) == id && data.hasPassed) {
        //             const count = maxId % 1000 >> 0;
        //             var cnt = 0;
        //             for (let key in this.idBoughts) {
        //                 if (Number(key) / 1000 >> 0 == id) {
        //                     cnt++;
        //                 }
        //             }
        //             if (cnt < count) {
        //                 return true;
        //             }
        //         }
        //     }
        // }
    };
    ModelShengJieMJ.prototype.checkTabRed = function (id) {
        var tongGuanCfg;
        var fubenInfo = GGlobal.modelSJMJ.fubenInfo;
        for (var key in fubenInfo) {
            var compareId = Number(key) / 1000 >> 0;
            if (compareId == id) {
                tongGuanCfg = Config.sjmjfb_258[key];
            }
        }
        var red = false;
        if (tongGuanCfg) {
            var info = this.idBoughts;
            var arr = ModelShengJieMJ.mjfbCfgArr(id);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id > tongGuanCfg.id) {
                    break;
                }
                var bool = !info[arr[i].id];
                if (bool) {
                    red = true;
                    break;
                }
            }
        }
        return red;
    };
    ModelShengJieMJ.mjfbCfgArr = function (id) {
        if (ModelShengJieMJ._mjfbCfgArr == null) {
            ModelShengJieMJ._mjfbCfgArr = {};
            var lib = Config.sjmjfb_258;
            for (var key in lib) {
                var tempId = Number(key) / 1000 >> 0;
                if (ModelShengJieMJ._mjfbCfgArr[tempId] == null) {
                    ModelShengJieMJ._mjfbCfgArr[tempId] = [];
                }
                ModelShengJieMJ._mjfbCfgArr[tempId].push(lib[key]);
            }
        }
        return ModelShengJieMJ._mjfbCfgArr[id];
    };
    ModelShengJieMJ.msg_datas_sjmj = "msg_datas_sjmj";
    ModelShengJieMJ.msg_datas_team = "msg_datas_team";
    ModelShengJieMJ.msg_datas_hurt = "msg_datas_hurt";
    ModelShengJieMJ.msg_datas_dead = "msg_datas_dead";
    ModelShengJieMJ.msg_datas_hp = "msg_datas_hp";
    ModelShengJieMJ.msg_invite = "msg_invite";
    ModelShengJieMJ.idToName = ["", "武将", "战甲", "宝物", "天书", "神剑", "异宝", "兵法"];
    ModelShengJieMJ.isSelfTeam = false;
    ModelShengJieMJ.hpArr = [];
    return ModelShengJieMJ;
}(BaseModel));
__reflect(ModelShengJieMJ.prototype, "ModelShengJieMJ");
