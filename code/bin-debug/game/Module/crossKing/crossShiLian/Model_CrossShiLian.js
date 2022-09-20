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
var Model_CrossShiLian = (function (_super) {
    __extends(Model_CrossShiLian, _super);
    function Model_CrossShiLian() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**试炼劵ID */
        _this.trialQuan = 410412;
        _this.floor = 0;
        _this.pass = 0;
        _this.trialNum = 0;
        _this.chestNum = 0;
        _this.roleData = [];
        _this.buffData = [];
        _this.hasBuffData = {};
        _this.battleRoleId = 0;
        _this.selectBuffArr = [];
        _this.maxFloor = 0;
        return _this;
    }
    Model_CrossShiLian.prototype.getBattleCfg = function () {
        var self = this;
        var cfg = Config.kfsl_767[self.floor];
        return Config.slzd_767[cfg.lx];
    };
    //协议处理
    Model_CrossShiLian.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        //注册GC方法
        mgr.regHand(10472, self.GC_CrossTrial_openUI_10472, self);
        mgr.regHand(10474, self.GC_CrossTrial_challenge_10474, self);
        mgr.regHand(10476, self.GC_CrossTrial_fightEnd_10476, self);
        mgr.regHand(10478, self.GC_CrossTrial_selectBuff_10478, self);
        mgr.regHand(10480, self.GC_CrossTrial_getChest_10480, self);
        mgr.regHand(10482, self.GC_CrossTrial_nextFloor_10482, self);
        mgr.regHand(10484, self.GC_CROSSTRIAL_SAODANG_10484, self);
    };
    /**10483 扫荡 B:扫荡类型（1：普通，2：困难，3：噩梦）  */
    Model_CrossShiLian.prototype.CG_CROSSTRIAL_SAODANG_10483 = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(10483, bates);
    };
    /**10484 扫荡结果返回 [B:道具类型I:道具idI:道具数量]通关奖励  */
    Model_CrossShiLian.prototype.GC_CROSSTRIAL_SAODANG_10484 = function (self, data) {
        ViewCommonWarn.text("扫荡成功");
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var itemVo = ConfigHelp.parseItemBa(data);
            ViewBroadcastItemText.text("获得【" + itemVo.name + "】 X" + itemVo.count, itemVo.qColor);
        }
        if (Config.kfsl_767[self.floor + 1]) {
            self.floor++;
        }
        GGlobal.control.notify(UIConst.CROSS_SHILIAN);
    };
    /**10471  打开界面 */
    Model_CrossShiLian.prototype.CG_CrossTrial_openUI_10471 = function () {
        var bates = this.getBytes();
        this.sendSocket(10471, bates);
    };
    /**10472 I-I-I-B-[L-B-U-L-I] 返回界面信息 I:当前层floorI:已通关层passFloorI:历史最高层I:试炼点B:已领宝箱数量chestNum
     * [:玩家idB:typeU:玩家名L:战力I:时装I:神兵]对手数据enemyData[B:类型（1初级，2中级，3高级）I:属性idI:属性值B:是否已选：（0：否，1：已选）]buff数据
     * buff数据[I:属性idI:属性值]自身buff数据*/
    Model_CrossShiLian.prototype.GC_CrossTrial_openUI_10472 = function (self, data) {
        self.roleData = [];
        self.buffData = [];
        self.hasBuffData = {};
        self.selectBuffArr = [];
        self.floor = data.readInt();
        self.pass = data.readInt();
        self.maxFloor = data.readInt();
        self.trialNum = data.readInt();
        self.chestNum = data.readByte();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg5 = data.readLong();
            var arg6 = data.readByte();
            var arg7 = data.readUTF();
            var arg8 = data.readLong();
            var job = data.readInt();
            var godWeapon = data.readInt();
            var horseId = data.readInt();
            self.roleData[arg6 - 1] = { id: arg5, type: arg6, name: arg7, power: arg8, job: job, godWeapon: godWeapon, horseId: horseId };
        }
        var len1 = data.readShort();
        for (var i = 0; i < len1; i++) {
            var type = data.readByte();
            var attID = data.readInt();
            var attNum = data.readInt();
            var isChoose = data.readByte();
            self.buffData[type - 1] = { attID: attID, type: type, attNum: attNum, isChoose: isChoose };
        }
        var len2 = data.readShort();
        for (var i = 0; i < len2; i++) {
            var attID = data.readInt();
            var attNum = data.readInt();
            attNum = Vo_attr.getRealNum(attID, attNum);
            if (!self.hasBuffData[attID])
                self.hasBuffData[attID] = 0;
            self.hasBuffData[attID] += attNum;
        }
        GGlobal.control.notify(UIConst.CROSS_SHILIAN);
    };
    /**10473 B 挑战 B:挑战类型（1：普通，2：困难，3：噩梦）type*/
    Model_CrossShiLian.prototype.CG_CrossTrial_challenge_10473 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(10473, bates);
    };
    /**10474 B-L 挑战结果返回 B:结果：0：失败，1：成功rtnCodeL:挑战玩家idid*/
    Model_CrossShiLian.prototype.GC_CrossTrial_challenge_10474 = function (self, data) {
        var result = data.readByte();
        self.battleRoleId = data.readLong();
        if (result == 1) {
            var battleVo = GGlobal.modelPlayer.playerDetailDic[self.battleRoleId];
            if (battleVo) {
                self.enterBattle();
            }
            else {
                GGlobal.control.listen(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
            }
        }
        else if (result == 0) {
            if (self.battleRoleId == 4) {
                ViewCommonWarn.text("未到挑战时间");
            }
        }
    };
    Model_CrossShiLian.prototype.enterBattle = function () {
        var self = this;
        var battleVo = GGlobal.modelPlayer.playerDetailDic[self.battleRoleId];
        if (battleVo) {
            var vo = Vo_battle.create([Model_player.voMine], [battleVo]);
            vo.mapID = self.getBattleCfg().dt;
            vo.sysID = vo.backID = UIConst.CROSS_SHILIAN;
            vo.buffData = self.hasBuffData;
            Model_battle.battleVo = vo;
            GGlobal.mapscene.enterScene(SceneCtrl.CLIENT_BATTLE);
            GGlobal.control.remove(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
        }
    };
    /**10475 B 战斗结束 B:战斗结果(0：失败，1：胜利)result*/
    Model_CrossShiLian.prototype.CG_CrossTrial_fightEnd_10475 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(10475, bates);
    };
    /**10476 B-[B-I-I] 战斗结束返回 B:战斗结果：0：失败，1：胜利result[B:道具类型I:道具idI:道具数量]通关奖励rewardData*/
    Model_CrossShiLian.prototype.GC_CrossTrial_fightEnd_10476 = function (self, data) {
        var result = data.readByte();
        var rewardData = ConfigHelp.parseItemListBa(data);
        if (result == 1) {
            ViewCommonWin.show(rewardData, 5000);
        }
        else {
            ViewCommonFail.show(5000, self, "退出", self.exitHanlder);
        }
    };
    Model_CrossShiLian.prototype.exitHanlder = function () {
        GGlobal.modelScene.returnMainScene();
        GGlobal.layerMgr.open(UIConst.CROSS_SHILIAN);
    };
    /**10477 buff层选择或取消加成buff [B:类型（1：初级，2：中级，3：高级）]选择的buff）*/
    Model_CrossShiLian.prototype.CG_CrossTrial_selectBuff_10477 = function (arg1) {
        var bates = this.getBytes();
        var len = arg1.length;
        bates.writeShort(len);
        for (var i = 0; i < len; i++) {
            bates.writeByte(arg1[i]);
        }
        this.sendSocket(10477, bates);
    };
    /**10478选择buff操作结果 B:操作结果：0：失败，1：成功[B:buff类型]buff数据*/
    Model_CrossShiLian.prototype.GC_CrossTrial_selectBuff_10478 = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var len = data.readShort();
            var cfg = Config.kfsl_767[self.floor];
            var cfg1 = Config.slbuff_767[cfg.lx];
            for (var i = 0; i < len; i++) {
                var type = data.readByte();
                self.trialNum -= cfg1["dj" + type];
                self.buffData[type - 1].isChoose = 1;
                for (var j = 0; j < self.buffData.length; j++) {
                    if (type == self.buffData[j].type) {
                        if (!self.hasBuffData[self.buffData[j].attID])
                            self.hasBuffData[self.buffData[j].attID] = 0;
                        self.hasBuffData[self.buffData[j].attID] += Vo_attr.getRealNum(self.buffData[j].attID, self.buffData[j].attNum);
                        break;
                    }
                }
            }
            GGlobal.control.notify(UIConst.CROSS_SHILIAN);
        }
    };
    /**10479  领取宝箱奖励 */
    Model_CrossShiLian.prototype.CG_CrossTrial_getChest_10479 = function () {
        var bates = this.getBytes();
        this.sendSocket(10479, bates);
    };
    /**10480 B-B-[B-I-I] 领取宝箱奖励结果 B:结果：0：失败，1：成功rtnCodeB:失败：（），成功：已领取宝箱数据量chestNum[B:道具类型I:道具idI:道具数量]宝箱物品rewardData*/
    Model_CrossShiLian.prototype.GC_CrossTrial_getChest_10480 = function (self, data) {
        var result = data.readByte();
        self.chestNum = data.readByte();
        var rewardArr = ConfigHelp.parseItemListBa(data);
        var cfg = Config.kfsl_767[self.floor];
        var cfg1 = Config.slbx_767[cfg.lx];
        if (cfg1.sx - self.chestNum > 0) {
            View_Reward_Show2.show(UIConst.CROSS_SHILIAN, 1, Handler.create(self, function () {
                if (ConfigHelp.checkEnough(cfg1.xh, false)) {
                    GGlobal.modelkfsl.CG_CrossTrial_getChest_10479();
                }
                else {
                    ModelChongZhi.guideToRecharge();
                }
            }), rewardArr, JSON.parse(cfg1.xh)[0][2], 0, 0);
        }
        else {
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, rewardArr);
        }
        GGlobal.control.notify(UIConst.CROSS_SHILIAN);
    };
    /**10481  下一关 */
    Model_CrossShiLian.prototype.CG_CrossTrial_nextFloor_10481 = function () {
        var bates = this.getBytes();
        this.sendSocket(10481, bates);
    };
    /**10482 B-B 下一关结果 B:结果：0：失败，1：成功rtnCodeB:失败（1：已达最高层）type*/
    Model_CrossShiLian.prototype.GC_CrossTrial_nextFloor_10482 = function (self, data) {
        var result = data.readByte();
        var type = data.readByte();
        if (result == 1) {
            self.floor++;
            GGlobal.control.notify(UIConst.CROSS_SHILIAN);
        }
        else {
            if (type == 1) {
                ViewCommonWarn.text("已达最高层");
            }
        }
    };
    return Model_CrossShiLian;
}(BaseModel));
__reflect(Model_CrossShiLian.prototype, "Model_CrossShiLian");
