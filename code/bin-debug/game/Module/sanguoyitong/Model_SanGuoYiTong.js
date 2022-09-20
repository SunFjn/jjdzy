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
var Model_SanGuoYiTong = (function (_super) {
    __extends(Model_SanGuoYiTong, _super);
    function Model_SanGuoYiTong() {
        var _this = _super.call(this) || this;
        _this.state = 0;
        _this.times = 0;
        /**活动时间 */
        _this.activityTime = 0;
        /**刷新CD */
        _this.resCD = 0;
        _this.roleData = { id: 0, fashion: 0, name: "", power: 0, shouhun: 0 };
        _this.jifenArr = [];
        _this.monsterID = 0;
        _this.serverMonsterID = 0;
        return _this;
    }
    /**5819	打开三国一统界面 */
    Model_SanGuoYiTong.prototype.CG_OPENUI_5819 = function () {
        var ba = new BaseBytes();
        this.sendSocket(5819, ba);
    };
    /**5801 CG 进入三国一统 */
    Model_SanGuoYiTong.prototype.CG_ENTER_SCENE_5801 = function () {
        var ba = new BaseBytes();
        this.sendSocket(5801, ba);
    };
    /**5803 CG 退出三国一 */
    Model_SanGuoYiTong.prototype.CG_EXIT_SCENE_5803 = function () {
        var ba = new BaseBytes();
        this.sendSocket(5803, ba);
    };
    /**5805	CG采集宝箱 L:宝箱唯一id */
    Model_SanGuoYiTong.prototype.CG_YITONG_COLLECT_5805 = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(5805, ba);
    };
    /**5807	CG 终止采集 L:宝箱唯一id */
    Model_SanGuoYiTong.prototype.CG_YITONG_STOP_COLLECT_5807 = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(5807, ba);
    };
    /**5809	CG 采集成功获取奖励 L:宝箱唯一id */
    Model_SanGuoYiTong.prototype.CG_YITONG_COLLECT_RESULT_5809 = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(5809, ba);
    };
    /**5811	请求挑战怪物 L:怪物唯一id */
    Model_SanGuoYiTong.prototype.CG_YITONG_BATTLE_MONEST_5811 = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(5811, ba);
    };
    /**5813	CG 通知后端pve战斗结果获取奖励与否 L:怪物idB:0输了 1赢了 */
    Model_SanGuoYiTong.prototype.CG_YITONG_BATTLE_RESULT_5813 = function (id, result) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        ba.writeByte(id);
        this.sendSocket(5813, ba);
    };
    /**5815	CG 怼某个玩家 L:玩家id */
    Model_SanGuoYiTong.prototype.CG_YITONG_BATTLEPLAYER_5815 = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(5815, ba);
    };
    /**5825	GC 获取个人积分排行 个人奖励领取情况 B:0:个人积分排行 1个人奖励领取情况 */
    Model_SanGuoYiTong.prototype.CG_YITONG_ROLE_JIEFENRANK = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(5825, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_SanGuoYiTong.prototype.listenServ = function (wsm) {
        var self = this;
        self.socket = wsm;
        wsm.regHand(5820, self.GC_OPENUI_5820, self);
        wsm.regHand(5800, self.GC_SANGUO_YITONG_STATE_5800, self);
        wsm.regHand(5802, self.GC_ENTER_SCENE_5802, self);
        wsm.regHand(5804, self.GC_ENTER_SCENE_5804, self);
        wsm.regHand(5806, self.GC_YITONG_COLLECT_5806, self);
        wsm.regHand(5808, self.GC_YITONG_STOP_COLLECT_5808, self);
        wsm.regHand(5810, self.GC_YITONG_COLLECT_RESULT_5810, self);
        wsm.regHand(5812, self.GC_YITONG_BATTLE_MONEST_5812, self);
        wsm.regHand(5814, self.GC_YITONG_BATTLE_RESULT_5814, self);
        wsm.regHand(5816, self.GC_YITONG_BATTLEPLAYER_5816, self);
        wsm.regHand(5818, self.GC_YITONG_JIFEN_CHANGE_5818, self);
        wsm.regHand(5822, self.GC_YITONG_SCENEROLESTATE_CHANGE_5822, self);
        wsm.regHand(5824, self.GC_YITONG_ROLEJIFEN_CHANGE_5824, self);
        wsm.regHand(5826, self.GC_YITONG_RANK_5826, self);
        wsm.regHand(5828, self.GC_YITONG_REWARDDRAW_5828, self);
    };
    /**5828	GC 个人积分领取情况 [I:奖励索引B:奖励状态] */
    Model_SanGuoYiTong.prototype.GC_YITONG_REWARDDRAW_5828 = function (self, data) {
    };
    /**5826	GC 个人排行 I:我的积分B:我的名次[U:名字B:国家分类I:积分] */
    Model_SanGuoYiTong.prototype.GC_YITONG_RANK_5826 = function (self, data) {
    };
    /**5824	GC 玩家积分和积分奖励变化 I:本人积分I:奖励索引I:奖励状态 */
    Model_SanGuoYiTong.prototype.GC_YITONG_ROLEJIFEN_CHANGE_5824 = function (self, data) {
    };
    /**5822	GC 地图上参与者/宝箱/怪物状态变化 [B:0参与者 1宝箱 2怪物L:唯一idB:状态 0无状态 1采集中/被采集中 2pvp/中被两人抢夺中 3pve中 4pvp抢到宝箱中 5重生保护罩] */
    Model_SanGuoYiTong.prototype.GC_YITONG_SCENEROLESTATE_CHANGE_5822 = function (self, data) {
    };
    /**5818	GC 三个国家积分变化 I:魏国I:蜀国I:吴国 */
    Model_SanGuoYiTong.prototype.GC_YITONG_JIFEN_CHANGE_5818 = function (self, data) {
        self.jifenArr = [data.readInt(), data.readInt(), data.readInt()];
        GGlobal.control.notify(UIConst.SANGUO_YITONG);
    };
    /**5816	GC 怼某个玩家返回 B:0开打 1对方正在战斗 2对方重生保护罩中 */
    Model_SanGuoYiTong.prototype.GC_YITONG_BATTLEPLAYER_5816 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
        }
        else if (result == 1) {
            ViewCommonWarn.text("对方正在战斗");
        }
        else if (result == 2) {
            ViewCommonWarn.text("对方重生保护罩中");
        }
    };
    /**5814	GC pve返回战斗结束界面 L:怪物唯一idB:0输了 1赢了[I:奖励类型I:系统idI:数量] */
    Model_SanGuoYiTong.prototype.GC_YITONG_BATTLE_RESULT_5814 = function (self, data) {
        var monestID = data.readLong();
        var result = data.readByte();
        var rewardArr = ConfigHelp.parseItemListBa(data);
        SanGuoYTManager.battleEnd(result, rewardArr);
        SanGuoYTManager.enter();
    };
    /**5812	GC 请求挑战怪物返回 B:0成功 1失败 2怪物战斗中L:怪物唯一的id */
    Model_SanGuoYiTong.prototype.GC_YITONG_BATTLE_MONEST_5812 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            self.serverMonsterID = data.readLong();
            var npc = GameUnitManager.findUnitByID(self.serverMonsterID);
            self.monsterID = npc.cfgID;
            GGlobal.mapscene.enterScene(SceneCtrl.SANGUO_YITONG);
        }
    };
    /**5810	GC 获取宝箱奖励 B:0成功1失败 2采集时间未到L:箱子唯一id */
    Model_SanGuoYiTong.prototype.GC_YITONG_COLLECT_RESULT_5810 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("采集成功");
        }
    };
    /**5808	GC 终止采集返回 B:0终止成功 1终止失败L:宝箱唯一id */
    Model_SanGuoYiTong.prototype.GC_YITONG_STOP_COLLECT_5808 = function (self, data) {
        var state = data.readByte();
        if (state == 0) {
            var npcID = data.readLong();
            CollectManager.end();
        }
    };
    /**5806	GC 采集宝箱返回 B:0可以采集 1有1人采集战斗 2有两个人正在抢夺中L:采集双方id 0没有L:采集双方id 0没有 */
    Model_SanGuoYiTong.prototype.GC_YITONG_COLLECT_5806 = function (self, data) {
        var state = data.readByte();
        if (state == 0) {
            var npcID = data.readLong();
            var npc = GameUnitManager.findUnit(npcID, UnitType.NPC);
            CollectManager.begin(npc, 10000, Handler.create(self, self.collectHandler, [[npcID]], true));
        }
    };
    Model_SanGuoYiTong.prototype.collectHandler = function (data) {
        this.CG_YITONG_COLLECT_RESULT_5809(data[0]);
    };
    /**5804	GC 退出场景返回 B:0成功 1失败 */
    Model_SanGuoYiTong.prototype.GC_ENTER_SCENE_5804 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            SanGuoYTManager.exite();
        }
    };
    /**5802	GC 进入三国一统返回 B:0成功 1失败 2已经在副本内（重登试试)I:魏国积分I:蜀国积分I:吴国积分I:活动时间I:宝箱刷新cd */
    Model_SanGuoYiTong.prototype.GC_ENTER_SCENE_5802 = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            self.jifenArr = [data.readInt(), data.readInt(), data.readInt()];
            self.activityTime = data.readInt();
            self.resCD = data.readInt();
            SanGuoYTManager.enter();
        }
    };
    /**5800 GC 通知前段活动状态 B:0没开 1开了 */
    Model_SanGuoYiTong.prototype.GC_SANGUO_YITONG_STATE_5800 = function (self, data) {
        self.state = data.readByte();
    };
    /**5820	GC界面数据返回 L:玩家IDI:职业时装U:名字L:战力I:兽魂 I:活动结束剩余时间*/
    Model_SanGuoYiTong.prototype.GC_OPENUI_5820 = function (self, data) {
        self.roleData = { id: 0, fashion: 0, name: "", power: 0, shouhun: 0 };
        self.roleData.id = data.readLong();
        self.roleData.fashion = data.readInt();
        self.roleData.name = data.readUTF();
        self.roleData.power = data.readLong();
        self.roleData.shouhun = data.readInt();
        self.times = data.readInt();
        GGlobal.control.notify(UIConst.SANGUO_YITONG);
    };
    return Model_SanGuoYiTong;
}(BaseModel));
__reflect(Model_SanGuoYiTong.prototype, "Model_SanGuoYiTong");
