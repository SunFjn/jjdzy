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
 * Model_CaoCaoCome
 * 曹操来袭
 */
var Model_CaoCaoCome = (function (_super) {
    __extends(Model_CaoCaoCome, _super);
    function Model_CaoCaoCome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.myHp = 0;
        _this.bossHp = 0;
        _this.bossMaxHp = 0;
        _this.myHurt = 0;
        _this.rankData = []; // rank name hurt
        _this.bossResult = 0; //当前这场战斗的胜负
        _this.bossAward = [];
        _this.roleCount = 0; //场景角色数量
        _this.CDEnter = 0; //进入冷却时间
        _this.ccSt = 0; //状态 0未开启 1开启
        _this.newBoss = 0;
        _this.lifeTime = 0;
        _this.qmHpMul = 0;
        _this.cc_extra_awards = [];
        return _this;
    }
    //协议处理
    Model_CaoCaoCome.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        var self = this;
        mgr.regHand(8510, self.GC_CaoCaoCome_openUi_8510, self);
        mgr.regHand(8512, self.GC_CaoCaoCome_openRank_8512, self);
        mgr.regHand(8514, self.GC_CaoCaoCome_join_8514, self);
        mgr.regHand(8516, self.GC_CaoCaoCome_quit_8516, self);
        mgr.regHand(8518, self.GC_CaoCaoCome_noticeDieLive_8518, self);
        mgr.regHand(8520, self.GC_CaoCaoCome_bossBoolCharge_8520, self);
        mgr.regHand(8524, self.GC_CaoCaoCome_buyLive_8524, self);
        mgr.regHand(8526, self.GC_CaoCaoCome_isaotufuhuo_8526, self);
        mgr.regHand(8528, self.GC_CAOCAO_AUTOFUHUO, self);
        mgr.regHand(8530, self.GC_CAOCAO_STATE_CHANGE, self);
        mgr.regHand(8532, self.GC_CAOCAO_DEAD, self);
    };
    /**8532	GC boss死亡 */
    Model_CaoCaoCome.prototype.GC_CAOCAO_DEAD = function (self, data) {
        GGlobal.modelCaoCao.bossHp = 0;
        GGlobal.control.notify(Enum_MsgType.CC_CAOCAO_BOSS_DEAD);
    };
    /**8530	GC boss入口状态 B:0关闭了 1开启了 */
    Model_CaoCaoCome.prototype.GC_CAOCAO_STATE_CHANGE = function (self, data) {
        var ccst = data.readByte();
        if (self.ccSt != ccst) {
            GGlobal.control.notify(Enum_MsgType.CC_CAOCAO_BOSS_DEAD);
            if (ccst == 1 && GGlobal.sceneType != SceneCtrl.CAOCAOLAIXI) {
                self.bossHp = self.bossMaxHp;
            }
        }
        self.ccSt = ccst;
        GGlobal.reddot.setCondition(UIConst.CAOCAO_LAIXI, 0, self.ccSt == 1);
        GGlobal.control.notify(UIConst.CAOCAO_LAIXI);
        GGlobal.reddot.notify(UIConst.CAOCAO_LAIXI);
    };
    /**8528	GC 自动复活结果 B:0成功 1失败 */
    Model_CaoCaoCome.prototype.GC_CAOCAO_AUTOFUHUO = function (self, data) {
        var type = data.readByte();
        if (type == 0) {
            ViewCommonWarn.text("复活成功");
        }
        else {
            ViewCommonWarn.text("元宝不足,自动复活失败");
            self.CG_CaoCaoCome_isaotufuhuo_8525(0);
        }
    };
    /**8510 B-L-L-I-I GC 打开活动ui返回 B:boss入口 0关闭1开启stateL:当前血量nowBoolL:最大血量maxBoolI:下一个boss的血量加成addHpNumI:惩罚时间time*/
    Model_CaoCaoCome.prototype.GC_CaoCaoCome_openUi_8510 = function (self, data) {
        self.ccSt = data.readByte();
        self.bossHp = data.readLong();
        self.bossMaxHp = data.readLong();
        self.qmHpMul = data.readInt();
        self.CDEnter = data.readInt();
        GGlobal.reddot.setCondition(UIConst.CAOCAO_LAIXI, 0, self.ccSt == 1);
        GGlobal.control.notify(UIConst.CAOCAO_LAIXI);
        GGlobal.reddot.notify(UIConst.CAOCAO_LAIXI);
    };
    /**8511  CG 打开boss伤害排行榜 */
    Model_CaoCaoCome.prototype.CG_CaoCaoCome_openRank_8511 = function () {
        var bates = this.getBytes();
        this.sendSocket(8511, bates);
    };
    /**8512 [B-U-I] GC 打开排行榜返回 [B:名次U:姓名I:伤害值]rankers*/
    Model_CaoCaoCome.prototype.GC_CaoCaoCome_openRank_8512 = function (self, data) {
        self.rankData = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            self.rankData.push([data.readByte(), data.readUTF(), data.readLong()]);
        }
        for (var i = len; i < 10; i++) {
            self.rankData.push([i + 1, "虚位以待", 0]);
        }
        GGlobal.control.notify(UIConst.CAOCAO_LAIXI_RANK);
    };
    /**8513  进入曹操boss场景 */
    Model_CaoCaoCome.prototype.CG_CaoCaoCome_join_8513 = function () {
        var bates = this.getBytes();
        this.sendSocket(8513, bates);
    };
    /**8514 B-B GC 进入返回 B:成功 1失败 2活动还没开始 3活动已经结束 4惩罚30s时间内restB:自动复活状态 1开启自动复活 0关闭自动state*/
    Model_CaoCaoCome.prototype.GC_CaoCaoCome_join_8514 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            GGlobal.layerMgr.close2(UIConst.ACTCOM);
            GGlobal.mapscene.enterScene(SceneCtrl.CAOCAOLAIXI);
        }
        else if (ret == 1) {
            ViewCommonWarn.text("进入失败");
        }
        else if (ret == 2) {
            ViewCommonWarn.text("活动尚未开始");
        }
        else if (ret == 3) {
            ViewCommonWarn.text("活动已结束");
        }
        else if (ret == 4) {
            ViewCommonWarn.text("正在冷却中");
        }
    };
    /**8515  CG 退出 */
    Model_CaoCaoCome.prototype.CG_CaoCaoCome_quit_8515 = function () {
        var bates = this.getBytes();
        this.sendSocket(8515, bates);
    };
    /**8516 B GC 退出返回 B:GC 离开 B:0离开成功 1失败rest*/
    Model_CaoCaoCome.prototype.GC_CaoCaoCome_quit_8516 = function (self, data) {
        var arg1 = data.readByte();
        if (arg1 == 0) {
            GGlobal.modelScene.returnMainScene();
            GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
            GGlobal.layerMgr.open(UIConst.ACTCOM, UIConst.CAOCAO_LAIXI);
        }
        else {
            ViewCommonWarn.text("退出场景失败");
        }
    };
    /**8518 [L]-B GC 人物死亡或者复活 [L:玩家id]heroidsB:0活着 1死亡dieLive*/
    Model_CaoCaoCome.prototype.GC_CaoCaoCome_noticeDieLive_8518 = function (self, data) {
        var temp = [];
        var hasMine = false;
        var mine = Model_player.voMine.id;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readLong();
            temp.push(id);
            if (id == mine) {
                hasMine = true;
            }
        }
        var ret = data.readByte();
        if (hasMine) {
            if (ret == 1) {
                self.lifeTime = Model_GlobalMsg.getServerTime() + ConfigHelp.getSystemNum(1012) * 1000;
            }
            GGlobal.control.notify(Enum_MsgType.CC_ROLE_LIFE, ret);
        }
        GGlobal.control.notify(Enum_MsgType.CC_SCENE_PLAYER_STATE, { st: ret, list: temp });
    };
    /**8520 L-L-L-L-[U-L] GC 场景刷新个人以及boss数据 L:我的剩余血量myHpL:我的伤害myHurtL:boss气血上限bossHpMaxL:boss当前气血bossCurHp[U:名字L:伤害]伤害排行数据hurtList*/
    Model_CaoCaoCome.prototype.GC_CaoCaoCome_bossBoolCharge_8520 = function (self, data) {
        self.myHp = data.readLong();
        self.myHurt = data.readLong();
        self.bossMaxHp = data.readLong();
        self.bossHp = data.readLong();
        self.rankData = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            self.rankData.push([i + 1, data.readUTF(), data.readLong()]);
        }
        for (var i = len; i < 10; i++) {
            self.rankData.push([i + 1, "虚位以待", 0]);
        }
        GGlobal.control.notify(UIConst.CAOCAO_LAIXI_RANK);
    };
    /**8521  CG 通知后端 我本人死亡了 */
    Model_CaoCaoCome.prototype.CG_CaoCaoCome_cgherodie_8521 = function () {
        var bates = this.getBytes();
        this.sendSocket(8521, bates);
    };
    /**8523 B CG 买活 B:0买活 1申请复活type*/
    Model_CaoCaoCome.prototype.CG_CaoCaoCome_buyLive_8523 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(8523, bates);
    };
    /**8524 B GC 买活返回 B:0成功 1失败 rest*/
    Model_CaoCaoCome.prototype.GC_CaoCaoCome_buyLive_8524 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0)
            GGlobal.control.notify(Enum_MsgType.CC_ROLE_LIFE);
    };
    /**8525 B CG 自动复活状态 B:1开启自动复活 0关闭自动state*/
    Model_CaoCaoCome.prototype.CG_CaoCaoCome_isaotufuhuo_8525 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(8525, bates);
    };
    /**8526 B GC 自动复活状态 B:1开启自动复活 0关闭自动state*/
    Model_CaoCaoCome.prototype.GC_CaoCaoCome_isaotufuhuo_8526 = function (self, data) {
        var type = data.readByte();
        GGlobal.control.notify("revieauto", type);
    };
    return Model_CaoCaoCome;
}(BaseModel));
__reflect(Model_CaoCaoCome.prototype, "Model_CaoCaoCome");
