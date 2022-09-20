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
 * ModelYiShouBOSS
 * 异兽BOSS
 */
var ModelYiShouBOSS = (function (_super) {
    __extends(ModelYiShouBOSS, _super);
    function ModelYiShouBOSS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentlayer = 0;
        /*已通关最高关卡*/ _this.crossLayer = 0;
        _this.completeLayer = 0;
        _this.remaindCount = 0;
        _this.nextAddTime = 0;
        _this.myRank = -1;
        _this.revivewTime = 0;
        _this.firstKiler_head = 0;
        _this.firstKiler_Grid = 0;
        _this.hasBuyCount = 0;
        _this.checkNotice = function () {
            var count = _this.remaindCount;
            var itemcount = Model_Bag.getItemCount(410403);
            GGlobal.reddot.setCondition(UIConst.YSBOSS, 0, Boolean(count || itemcount));
            GGlobal.reddot.notifyMsg(UIConst.BOSS);
        };
        /**9431  返回界面信息 */
        _this.CG_SpecialAnimalBoss_openUI_9431 = function () {
            var bates = _this.getBytes();
            _this.sendSocket(9431, bates);
        };
        /**9432 I-I-I-I-I-U 返回界面信息 I:当前关卡nowGqI:已通关最高关卡passGqI:已领取奖励关卡rewardGqI:剩余挑战次数chaNumI:剩余恢复时间leftTimeU:首通玩家名称name*/
        _this.GC_SpecialAnimalBoss_openUI_9432 = function (self, data) {
            self.currentlayer = data.readInt();
            self.crossLayer = data.readInt();
            self.completeLayer = data.readInt();
            self.remaindCount = data.readInt();
            self.nextAddTime = data.readInt() * 1000 + Model_GlobalMsg.getServerTime();
            self.FirstKiller = data.readUTF();
            self.firstKiler_head = data.readInt();
            self.firstKiler_Grid = data.readInt();
            self.hasBuyCount = data.readInt();
            self.checkNotice();
            GGlobal.control.notify(UIConst.YSBOSS);
        };
        /**9433  挑战异兽Boss */
        _this.CG_SpecialAnimalBoss_challengeBoss_9433 = function () {
            var bates = _this.getBytes();
            _this.sendSocket(9433, bates);
        };
        //判断成功I:失败：（1：没有挑战次数，2：未领取通关奖励，3：已通过最高关卡，4：已进入战斗），成功：挑战关卡I:剩余挑战次数I:剩余挑战时间
        /**9434 B-I-I-I 挑战判定返回 B:判断结果：0:判断失败，1判断成功resultI:失败：（1：），成功：挑战关卡nowGqI:剩余挑战次数chaNumI:剩余挑战时间leftTime*/
        _this.GC_SpecialAnimalBoss_challengeBoss_9434 = function (self, data) {
            var ret = data.readByte();
            var retType = data.readInt();
            if (ret) {
                self.remaindCount = data.readInt();
                self.nextAddTime = data.readInt() * 1000 + Model_GlobalMsg.getServerTime();
                GGlobal.layerMgr.close2(UIConst.BOSS);
                GGlobal.mapscene.enterScene(SceneCtrl.YISHOUBOSS);
            }
            else {
                if (retType == 1) {
                    self.warn("没有挑战次数");
                }
                else if (retType == 2) {
                    self.warn("未领取通关奖励");
                }
                else if (retType == 3) {
                    self.warn("已通过最高关卡");
                }
                else if (retType == 4) {
                    self.warn("已进入战斗");
                }
            }
        };
        /**9435 B 发送战斗结果请求结算 B:0:失败，1:成功result*/
        _this.CG_SpecialAnimalBoss_fightEnd_9435 = function (arg1) {
            var bates = _this.getBytes();
            bates.writeByte(arg1);
            _this.sendSocket(9435, bates);
        };
        /**9436 B-[B-I-I] 结算返回 B:0：失败，1：成功rtnCode[B:道具类型I:道具idI:道具数量]奖励reward*/
        _this.GC_SpecialAnimalBoss_fightEnd_9436 = function (self, data) {
            var battleRet = data.readByte();
            var awards = ConfigHelp.parseItemListBa(data);
            GGlobal.control.notify(Enum_MsgType.YSBOSS_RESULT, { ret: battleRet, awards: awards });
        };
        /**9437  复活 */
        _this.CG_SpecialAnimalBoss_relive_9437 = function () {
            var bates = _this.getBytes();
            _this.sendSocket(9437, bates);
        };
        /**9438 B-B 复活结果返回 B:0：失败，1：成功rtnCodeB:失败：（1：元宝不足）type*/
        _this.GC_SpecialAnimalBoss_relive_9438 = function (self, data) {
            var result = data.readByte();
            var type = data.readByte();
            if (result == 1) {
                GGlobal.control.notify(Enum_MsgType.YSBOSS_REVIVE);
            }
            else {
                var warnStr = ["复活失败", "元宝不足"][type];
                DEBUGWARING.log("复活失败");
                ViewCommonWarn.text(warnStr);
            }
        };
        /**9439  领取奖励 */
        _this.CG_SpecialAnimalBoss_getReward_9439 = function () {
            var bates = _this.getBytes();
            _this.sendSocket(9439, bates);
        };
        /**9440 B-I 领取奖励结果 B:0：失败，1：成功rtnCodeI:失败：（1：），成功：当前关卡nowGq*/
        _this.GC_SpecialAnimalBoss_getReward_9440 = function (self, data) {
            var result = data.readByte();
            var newLayer = data.readInt();
            if (result == 1) {
                self.completeLayer = self.currentlayer;
                self.currentlayer = newLayer;
                ViewCommonWarn.text("领取成功");
                self.CG_SpecialAnimalBoss_openUI_9431();
                GGlobal.control.notify(UIConst.YSBOSS);
            }
            else {
                ViewCommonWarn.text("领取失败");
            }
        };
        _this.CG_SpecialAnimalBoss_getRank_9441 = function () {
            var bates = _this.getBytes();
            _this.sendSocket(9441, bates);
        };
        _this.GC_SpecialAnimalBoss_getRank_9442 = function (self, data) {
            var len = data.readShort();
            self.rankdata = [];
            self.myRank = -1;
            for (var i = 0; i < 10; i++) {
                var name_1 = void 0;
                var layer = void 0;
                if (i < len) {
                    name_1 = data.readUTF();
                    layer = data.readInt();
                    if (Model_player.isMine(name_1)) {
                        self.myRank = i + 1;
                    }
                }
                else {
                    name_1 = null;
                    layer = 0;
                }
                self.rankdata[i] = [i + 1, name_1, layer];
            }
            GGlobal.control.notify(UIConst.YSBOSS);
        };
        _this.GC_SpecialAnimalBoss_update_9444 = function (self, data) {
            var updateLayer = data.readInt();
            if (updateLayer == self.currentlayer) {
                self.FirstKiller = data.readUTF();
                self.firstKiler_head = data.readInt();
                self.firstKiler_Grid = data.readInt();
                GGlobal.control.notify(UIConst.YSBOSS);
            }
        };
        _this.CG_SpecialAnimalBoss_BUY_9445 = function (arg) {
            var bates = _this.getBytes();
            bates.writeInt(arg);
            _this.sendSocket(9445, bates);
        };
        _this.GC_SpecialAnimalBoss_BUY_9446 = function (self, data) {
            var ret = data.readByte();
            if (ret == 1) {
                self.remaindCount = data.readInt();
                self.hasBuyCount = data.readInt();
                GGlobal.control.notify(UIConst.YSBOSS);
            }
            else {
                ViewCommonWarn.text("购买失败");
            }
        };
        return _this;
    }
    //协议处理
    ModelYiShouBOSS.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        mgr.regHand(9432, self.GC_SpecialAnimalBoss_openUI_9432, self);
        mgr.regHand(9434, self.GC_SpecialAnimalBoss_challengeBoss_9434, self);
        mgr.regHand(9436, self.GC_SpecialAnimalBoss_fightEnd_9436, self);
        mgr.regHand(9438, self.GC_SpecialAnimalBoss_relive_9438, self);
        mgr.regHand(9440, self.GC_SpecialAnimalBoss_getReward_9440, self);
        mgr.regHand(9442, self.GC_SpecialAnimalBoss_getRank_9442, self);
        mgr.regHand(9444, self.GC_SpecialAnimalBoss_update_9444, self);
        mgr.regHand(9446, self.GC_SpecialAnimalBoss_BUY_9446, self);
    };
    ModelYiShouBOSS._max = 0;
    ModelYiShouBOSS.geMax_buy = function () {
        if (ModelYiShouBOSS._max == 0) {
            var cfg = Config.yscs_759;
            for (var i in cfg) {
                ModelYiShouBOSS._max++;
            }
        }
        return ModelYiShouBOSS._max;
    };
    return ModelYiShouBOSS;
}(BaseModel));
__reflect(ModelYiShouBOSS.prototype, "ModelYiShouBOSS");
