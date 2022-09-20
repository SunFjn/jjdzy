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
var ModelCtryBoss = (function (_super) {
    __extends(ModelCtryBoss, _super);
    function ModelCtryBoss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = { curBossId: 1, bossMaxHp: 0, bossHp: 0, killers: [], leftCount: 5, states: [], remainLeftCnt: 5 };
        /**战斗信息 */
        _this.battleInfo = { bossHp: 1 };
        _this.myRankArr = [];
        _this.countryRankArr = [];
        _this.bossID = 0;
        _this.myhurt = 0;
        _this._maxBossId = 0;
        return _this;
    }
    ModelCtryBoss.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        var self = this;
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
    };
    /**3219	GC 打开国家排行 */
    ModelCtryBoss.prototype.CG_OPEN_COUNTRYRANK = function () {
        var ba = new BaseBytes();
        this.sendSocket(3219, ba);
    };
    /**3220	GC 国家排行 [I:国家idI:国家boss]国家排行 */
    ModelCtryBoss.prototype.GC_OPEN_COUNTRYRANK = function (self, bytes) {
        self.countryRankArr = [];
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var countryId = bytes.readInt();
            var countryNum = bytes.readInt();
            self.countryRankArr[i] = { countryId: countryId, countryNum: countryNum };
        }
        GGlobal.control.notify(Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE);
    };
    /**3218	GC打开排行榜 B:boss序号[L:玩家idU:玩家姓名L:玩家伤害]伤害排行数组[I:国家idI:国家boss进度]国家排行L:我的伤害 */
    ModelCtryBoss.prototype.GC_OPEN_COUNTRYBOSS_RANK = function (self, bytes) {
        self.bossID = bytes.readByte();
        self.myRankArr = [];
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var playerId = bytes.readLong();
            var name_1 = bytes.readUTF();
            var hurt = bytes.readLong();
            self.myRankArr[i] = { playerId: playerId, name: name_1, hurt: hurt };
        }
        self.myhurt = bytes.readLong();
        GGlobal.control.notify(Enum_MsgType.COUNTRY_BOSS_RANK_UPDATE);
    };
    /**3217	CG 打开某个国家boss排行榜 B:boss序号 */
    ModelCtryBoss.prototype.CG_OPEN_COUNTRYBOSS_RANK = function (bossId) {
        var ba = new BaseBytes();
        ba.writeByte(bossId);
        this.sendSocket(3217, ba);
    };
    /**打开UI */
    ModelCtryBoss.prototype.CG3201 = function () { this.sendSocket(3201, this.getBytes()); };
    /**I:当前boss序号L:boss最大气血L:boss当前气血[I:已经击杀boss序号U:击杀者姓名]I:我的剩余boss挑战数I:今日购买次数[I:boss序号B:奖励状态 0不可 1可以 2领完] */
    ModelCtryBoss.prototype.GC3202 = function (self, bytes) {
        self.data = self.data || {};
        var temp = self.data;
        temp.curBossId = Math.min(self.maxBossId(), bytes.readInt());
        temp.bossMaxHp = bytes.readLong();
        temp.bossHp = Math.max(0, bytes.readLong());
        temp.killers = {};
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            temp.killers[bytes.readInt()] = bytes.readUTF();
        }
        temp.leftCount = bytes.readInt();
        temp.remainLeftCnt = bytes.readInt();
        temp.states = {};
        len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            temp.states[bytes.readInt()] = bytes.readByte();
        }
        GGlobal.reddot.setCondition(1505, 0, self.checkNotice());
        self.notify(ModelCtryBoss.msg_datas);
        GGlobal.reddot.notify(ReddotEvent.CHECK_COUNTRY);
    };
    /**挑战Boss B:0成功 1次数不够 2boss已经死亡 3你已经在副本中*/
    ModelCtryBoss.prototype.CG3203 = function (bossId) {
        var bytes = this.getBytes();
        bytes.writeInt(bossId);
        ModelCtryBoss.curBossID = bossId;
        this.sendSocket(3203, bytes);
    };
    ModelCtryBoss.prototype.GC3204 = function (self, bytes) {
        var state = bytes.readByte();
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
    };
    /**场景中伤害数据同步 L:我的气血L:boss最大气血L:boss当前血量L:我的伤害值[U:玩家idL:玩家伤害] */
    ModelCtryBoss.prototype.GC3206 = function (self, bytes) {
        self.battleInfo = self.battleInfo || {};
        bytes.readLong();
        self.battleInfo.bossMaxHp = bytes.readLong();
        self.battleInfo.bossHp = bytes.readLong();
        self.battleInfo.myDamage = bytes.readLong();
        self.battleInfo.others = [];
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            self.battleInfo.others.push({ name: bytes.readUTF(), demage: bytes.readLong() });
        }
        self.notify(ModelCtryBoss.msg_batInfo);
        if (Model_player.voMine.sceneChar && Model_player.voMine.sceneChar.curhp <= 0) {
            self.CG3207();
        }
    };
    /**请求退出国家boss */
    ModelCtryBoss.prototype.CG3207 = function () {
        this.sendSocket(3207, this.getBytes());
    };
    ModelCtryBoss.prototype.GC3208 = function (self, bytes) {
        var state = bytes.readByte();
        switch (state) {
            case 0://成功
                var awards = Config.xtcs_004[3815].other;
                var drops = ConfigHelp.makeItemListArr(JSON.parse(awards));
                if (self.battleInfo && self.battleInfo.bossHp > 0) {
                    if (!GGlobal.layerMgr.isOpenView(UIConst.COMMON_FAIL)) {
                        ViewCommonFail.show(5000, self, "离开", self.realQuit, null, drops);
                    }
                }
                else {
                    if (!GGlobal.layerMgr.isOpenView(UIConst.COMMON_WIN)) {
                        ViewCommonWin.show(drops, 10000, self, "退出", self.realQuit);
                    }
                }
                break;
            case 1://失败
                ViewCommonWarn.text("退出失败!");
                break;
        }
    };
    ModelCtryBoss.prototype.realQuit = function () {
        GGlobal.modelScene.returnMainScene();
        GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.COUNTRY_BOSS);
    };
    /**被击杀的玩家id */
    ModelCtryBoss.prototype.GC3210 = function (self, bytes) {
        var temp = [];
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            temp.push(bytes.readLong());
        }
        self.notify(ModelCtryBoss.msg_beenKiller, temp);
    };
    /**广播副本内玩家boss已死亡 */
    ModelCtryBoss.prototype.GC3212 = function (self) {
        ViewBroadcastText.showMsg("国家BOSS已经死亡，领奖励去吧!");
        self.notify(ModelCtryBoss.msg_bossBeenKill);
    };
    /**购买挑战次数 */
    ModelCtryBoss.prototype.CG3213 = function (count) {
        var bytes = this.getBytes();
        bytes.writeByte(count);
        this.sendSocket(3213, bytes);
    };
    ModelCtryBoss.prototype.GC3214 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 0) {
            //不读下一个字段了，直接刷新界面数据
            self.CG3201();
        }
        else {
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
    };
    /**获取boss通过奖励 */
    ModelCtryBoss.prototype.CG3215 = function (bossId) {
        var bytes = this.getBytes();
        bytes.writeInt(bossId);
        this.sendSocket(3215, bytes);
    };
    ModelCtryBoss.prototype.GC3216 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 0) {
            //成功
            ViewCtryBoss.isGetAwardBack = true;
            self.CG3201(); //直接刷新
        }
        else {
            if (state == 2) {
                Model_RongLian.ALERT_ONEKEY();
            }
            else {
                ViewCommonWarn.text("失败!");
            }
        }
    };
    ModelCtryBoss.prototype.checkNotice = function () {
        var data = this.data;
        if (!data) {
            return false;
        }
        var curBossId = data.curBossId;
        for (var key in data.states) {
            if (data.states[key] == 1) {
                return true;
            }
        }
        if (!data.killers[data.curBossId] && data.leftCount > 0) {
            return true;
        }
        return false;
    };
    ModelCtryBoss.prototype.maxBossId = function () {
        if (this._maxBossId > 0) {
            return this._maxBossId;
        }
        else {
            for (var key in Config.gjboss_738) {
                this._maxBossId = Math.max(Config.gjboss_738[key].cengshu, this._maxBossId);
            }
            return this._maxBossId;
        }
    };
    ModelCtryBoss.msg_datas = "msg_datas";
    ModelCtryBoss.msg_batInfo = "msg_batInfo";
    ModelCtryBoss.msg_beenKiller = "msg_beenKiller"; //更新被杀的玩家
    ModelCtryBoss.msg_bossBeenKill = "msg_bossBeenKill"; //boss已被杀
    return ModelCtryBoss;
}(BaseModel));
__reflect(ModelCtryBoss.prototype, "ModelCtryBoss");
