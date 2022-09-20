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
var Model_SGZS = (function (_super) {
    __extends(Model_SGZS, _super);
    function Model_SGZS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Model_SGZS, "shopArr", {
        get: function () {
            if (Model_SGZS._shopArr.length <= 0) {
                for (var key in Config.warstore_222) {
                    var cfg = Config.warstore_222[key];
                    Model_SGZS._shopArr[parseInt(key) - 1] = cfg;
                }
            }
            return Model_SGZS._shopArr;
        },
        enumerable: true,
        configurable: true
    });
    /**1401  打开三国战神界面  */
    Model_SGZS.prototype.CG_OPEN_SANGUO_ZHANSHEN = function () {
        var ba = new BaseBytes();
        this.sendSocket(1401, ba);
    };
    /**1403 购买挑战次数    */
    Model_SGZS.prototype.CG_BUYNUM_SANGUO_ZHANSHEN = function (count) {
        var ba = new BaseBytes();
        ba.writeByte(count);
        this.sendSocket(1403, ba);
    };
    /**1405  刷新对手   */
    Model_SGZS.prototype.CG_RESENEMY_SANGUO_ZHANSHEN = function () {
        var ba = new BaseBytes();
        this.sendSocket(1405, ba);
    };
    /**1407 挑战 L:被挑战玩家IdI:排名  */
    Model_SGZS.prototype.CG_BATTLE_SANGUO_ZHANSHEN = function (id, rank) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        ba.writeInt(rank);
        this.sendSocket(1407, ba);
    };
    /**1409 挑战战斗结果 B:0：失败，1：胜利  2退出 */
    Model_SGZS.prototype.CG_BATTLE_RESULT_SANGUO_ZHANSHEN = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1409, ba);
    };
    /**1411 扫荡 L:被扫荡玩家  */
    Model_SGZS.prototype.CG_SANGUO_ZHANSHEN_SAODANG = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(1411, ba);
    };
    /**1413	打开宝藏界面  */
    Model_SGZS.prototype.CG_SANGUO_ZHANSHEN_OPEN_BZ = function () {
        var ba = new BaseBytes();
        this.sendSocket(1413, ba);
    };
    /**1415	购买商品 I:商品id  */
    Model_SGZS.prototype.CG_SANGUO_ZHANSHEN_BUY_BZ = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1415, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_SGZS.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(1402, this.GC_OPEN_SANGUO_ZHANSHEN, this);
        wsm.regHand(1404, this.GC_BUYNUM_SANGUO_ZHANSHEN, this);
        wsm.regHand(1406, this.GC_RESENEMY_SANGUO_ZHANSHEN, this);
        wsm.regHand(1408, this.GC_BATTLE_SANGUO_ZHANSHEN, this);
        wsm.regHand(1410, this.GC_BATTLE_RESULT_SANGUO_ZHANSHEN, this);
        wsm.regHand(1412, this.GC_SANGUO_ZHANSHEN_SAODANG, this);
        wsm.regHand(1414, this.GC_SANGUO_ZHANSHEN_OPEN_BZ, this);
        wsm.regHand(1416, this.GC_SANGUO_ZHANSHEN_BUY_BZ, this);
    };
    /**1416	购买结果 B:结果：0：失败，1：成功I:失败：错误码，成功：商品id */
    Model_SGZS.prototype.GC_SANGUO_ZHANSHEN_BUY_BZ = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_SGZS.buyShopArr.push(data.readInt());
            Model_SGZS.shopArr.sort(self.sortShop);
            GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_SHOP);
        }
    };
    /**1414	宝藏数据返回 [I:已购买的id]已购买商品数据 */
    Model_SGZS.prototype.GC_SANGUO_ZHANSHEN_OPEN_BZ = function (self, data) {
        Model_SGZS.buyShopArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var goodsId = data.readInt();
            Model_SGZS.buyShopArr.push(goodsId);
        }
        Model_SGZS.isFirstOpenBZ = true;
        Model_SGZS.shopArr.sort(self.sortShop);
        GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_SHOP);
    };
    Model_SGZS.prototype.sortShop = function (a, b) {
        if ((Model_SGZS.buyShopArr.indexOf(a.id) != -1 && Model_SGZS.buyShopArr.indexOf(b.id) != -1) ||
            (Model_SGZS.buyShopArr.indexOf(a.id) == -1 && Model_SGZS.buyShopArr.indexOf(b.id) == -1)) {
            return a.id - b.id;
        }
        else {
            if (Model_SGZS.buyShopArr.indexOf(a.id) != -1) {
                return 1;
            }
            else {
                return -1;
            }
        }
    };
    /**1412 扫荡结果 B:0：失败，1：成功I:失败：错误码（1:不能扫荡自己，2：没有挑战次数，3：只能扫荡排行低于自己的），成功：剩余挑战次数I:冷却时间  */
    Model_SGZS.prototype.GC_SANGUO_ZHANSHEN_SAODANG = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_SGZS.battleNum = data.readInt();
            Model_SGZS.coolTime = data.readInt();
            GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE);
            GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_TIME);
        }
    };
    /**1410 挑战结算结果 B:0：失败，1：成功I:当前排名[B:类型I:道具idI:数量]排名晋级奖励  */
    Model_SGZS.prototype.GC_BATTLE_RESULT_SANGUO_ZHANSHEN = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_SGZS.battleRewardArr = [];
            var rank = data.readInt();
            for (var i = 0, len = data.readShort(); i < len; i++) {
                var type = data.readByte();
                var itemId = data.readInt();
                var count = data.readInt();
                Model_SGZS.lastMoney = count;
            }
            Model_SGZS.myRank = rank;
            var cfg = void 0;
            var rewardArr = void 0;
            for (var key in Config.warreward_222) {
                cfg = Config.warreward_222[key];
                var arr = JSON.parse(cfg.rank);
                if (arr[0][0] <= rank && arr[0][1] >= rank) {
                    rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward3));
                    break;
                }
            }
            ViewCommonWin.show(rewardArr, 10000, self, "退出", self.exitSanGuo);
        }
        else {
            if (GGlobal.sceneType == SceneCtrl.SANGUO_ZHANSHEN) {
                ViewBattleFault.show(10000);
            }
        }
    };
    Model_SGZS.prototype.exitSanGuo = function () {
        if (Model_SGZS.myRank < Model_SGZS.lastRank || Model_SGZS.lastRank == 0) {
            Model_SGZS.lastRank = Model_SGZS.myRank;
            GGlobal.layerMgr.open(UIConst.SANGUO_ZHANSHEN_RANK_REWARD);
        }
        GGlobal.modelScene.returnMainScene();
    };
    /**1408 请求挑战结果 B:0：失败， 1：成功L:失败：错误码（1：前10才能挑战前3，2：没有挑战次数，3：对方在战斗中暂时不可挑战，4：自身被挑战中不可挑战，5：排行变化刷新），
     * 成功：被挑战玩家IDI:机器人idI:剩余挑战次数I:冷却时间B:战斗结果0：失败，1：成功，2：前端判定  */
    Model_SGZS.prototype.GC_BATTLE_SANGUO_ZHANSHEN = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_SGZS.battleId = data.readLong();
            Model_SGZS.robotId = data.readInt();
            Model_SGZS.battleNum = data.readInt();
            Model_SGZS.coolTime = data.readInt();
            var battleRet = data.readByte();
            Model_SGZS.battleRet = battleRet + 1;
            if (Model_SGZS.battleRet > 2)
                Model_SGZS.battleRet = 0;
            if (Model_SGZS.robotId > 0) {
                GGlobal.mapscene.enterScene(SceneCtrl.SANGUO_ZHANSHEN);
            }
            else {
                var battleVo = GGlobal.modelPlayer.playerDetailDic[Model_SGZS.battleId];
                if (battleVo) {
                    GGlobal.mapscene.enterScene(SceneCtrl.SANGUO_ZHANSHEN);
                }
                else {
                    GGlobal.control.listen(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
                }
            }
            GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE);
            GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_TIME);
        }
        else if (result == 0) {
            var ret = data.readLong();
            var arr = ["", "前10才能挑战前3", "没有挑战次数", "对方正在战斗中", "正在被挑战", "对方排名变化"];
            ViewCommonWarn.text(arr[ret]);
        }
    };
    Model_SGZS.prototype.enterBattle = function () {
        var battleVo = GGlobal.modelPlayer.playerDetailDic[Model_NZBZ.battleID];
        if (battleVo) {
            GGlobal.mapscene.enterScene(SceneCtrl.SANGUO_ZHANSHEN);
            GGlobal.control.remove(Enum_MsgType.MSG_ADDROLEDETAIL, this.enterBattle, this);
        }
    };
    /**1406 刷新对手 [I:排名L:玩家idU:玩家名字I:职业L:战力]对手数据 */
    Model_SGZS.prototype.GC_RESENEMY_SANGUO_ZHANSHEN = function (self, data) {
        Model_SGZS.roleVoArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var rank = data.readInt();
            var roleId = data.readLong();
            var roleName = data.readUTF();
            var job = data.readInt();
            var godWeapon = data.readInt();
            var headId = data.readInt();
            var frameId = data.readInt();
            var power = data.readLong();
            var horseId = data.readInt();
            var vo = new Vo_SGZS();
            vo.rank = rank;
            vo.roleId = roleId;
            vo.name = roleName;
            vo.job = job;
            vo.godWeapon = godWeapon;
            vo.headId = headId;
            vo.frameId = frameId;
            vo.power = power;
            vo.horseId = horseId;
            Model_SGZS.roleVoArr.push(vo);
        }
        Model_SGZS.roleVoArr.sort(self.sortByRank);
        GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE);
    };
    /**1404 购买结果返回 B:0：失败，1：成功I:失败：错误码（1：积累挑战次数满，2：达今日购买上限，3：元宝不足），成功：剩余挑战次数I:剩余冷却时间I:剩余购买次数 */
    Model_SGZS.prototype.GC_BUYNUM_SANGUO_ZHANSHEN = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_SGZS.battleNum = data.readInt();
            Model_SGZS.coolTime = data.readInt();
            Model_SGZS.buyNum = data.readInt();
            GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_TIME);
        }
    };
    /**1402 界面数据返回 [I:排名I:robltIdL:玩家idU:玩家名字I:职业I:头像I:头像框L:战力]对手数据I:我的排名I:最高排名I:剩余挑战次数I:剩余冷却时间I:剩余购买挑战次数  */
    Model_SGZS.prototype.GC_OPEN_SANGUO_ZHANSHEN = function (self, data) {
        Model_SGZS.roleVoArr = [];
        Model_SGZS.isFirstOpen = true;
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var rank = data.readInt();
            var robotID = data.readInt();
            var roleId = data.readLong();
            var roleName = data.readUTF();
            var job = data.readInt();
            var godWeapon = data.readInt();
            var headId = data.readInt();
            var frameId = data.readInt();
            var power = data.readLong();
            var horseId = data.readInt();
            var vo = new Vo_SGZS();
            vo.rank = rank;
            vo.robotID = robotID;
            vo.roleId = roleId;
            vo.name = roleName;
            vo.job = job;
            vo.godWeapon = godWeapon;
            vo.headId = headId;
            vo.frameId = frameId;
            vo.power = power;
            vo.horseId = horseId;
            Model_SGZS.roleVoArr.push(vo);
        }
        Model_SGZS.roleVoArr.sort(self.sortByRank);
        Model_SGZS.myRank = data.readInt();
        Model_SGZS.lastRank = data.readInt();
        Model_SGZS.battleNum = data.readInt();
        Model_SGZS.coolTime = data.readInt();
        Model_SGZS.buyNum = data.readInt();
        GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_UPDATE);
        GGlobal.control.notify(Enum_MsgType.SANGUO_ZHANSHEN_TIME);
    };
    Model_SGZS.prototype.sortByRank = function (a, b) {
        return a.rank - b.rank;
    };
    /**挑战次数 */
    Model_SGZS.battleNum = 0;
    /**角色数组 */
    Model_SGZS.roleVoArr = [];
    /**战斗胜利奖励 */
    Model_SGZS.battleRewardArr = [];
    Model_SGZS.buyShopArr = [];
    Model_SGZS._shopArr = [];
    //三国战神挑战令
    Model_SGZS.ITEM_ID = 416017;
    Model_SGZS.isFirstOpenBZ = false;
    Model_SGZS.isFirstOpen = false;
    return Model_SGZS;
}(BaseModel));
__reflect(Model_SGZS.prototype, "Model_SGZS");
