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
var Model_NZBZ = (function (_super) {
    __extends(Model_NZBZ, _super);
    function Model_NZBZ() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_NZBZ.checkNotice = function () {
        if (Model_NZBZ.isFirstOpen) {
            var isCheck = Model_NZBZ.battleNum > 0;
            if (!isCheck) {
                isCheck = Model_NZBZ.checkJiFenNotice();
            }
            return isCheck;
        }
        return false;
    };
    Model_NZBZ.checkJiFenNotice = function () {
        var arr = Model_NZBZ.jifenArr;
        for (var i = 0; i < arr.length; i++) {
            var vo = arr[i];
            if (Model_NZBZ.drawArr.indexOf(vo.point) == -1 && Model_NZBZ.myJiFen >= vo.point) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(Model_NZBZ, "jifenArr", {
        get: function () {
            if (Model_NZBZ._jifenArr.length <= 0) {
                for (var key in Config.nzbzpoint_226) {
                    var cfg = Config.nzbzpoint_226[key];
                    Model_NZBZ._jifenArr.push(cfg);
                }
                Model_NZBZ._jifenArr.sort(Model_NZBZ.sortJiFen);
            }
            return Model_NZBZ._jifenArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_NZBZ.sortJiFen = function (a, b) {
        if (Model_NZBZ.drawArr.indexOf(a.point) != -1 && Model_NZBZ.drawArr.indexOf(b.point) != -1) {
            return a.point - b.point;
        }
        else if (Model_NZBZ.drawArr.indexOf(a.point) == -1 && Model_NZBZ.drawArr.indexOf(b.point) == -1) {
            return a.point - b.point;
        }
        else {
            if (Model_NZBZ.drawArr.indexOf(a.point) == -1) {
                return -1;
            }
            else {
                return 1;
            }
        }
    };
    /**1571  打开南征北战界面   */
    Model_NZBZ.prototype.CG_OPEN_NZBZ = function () {
        var ba = new BaseBytes();
        this.sendSocket(1571, ba);
    };
    /**1573  获取个人排行榜     */
    Model_NZBZ.prototype.CG_GET_NZBZ_RANK = function () {
        var ba = new BaseBytes();
        this.sendSocket(1573, ba);
    };
    /**1575  获取国家排行       */
    Model_NZBZ.prototype.CG_GET_NZBZ_COUNTRYRANK = function () {
        var ba = new BaseBytes();
        this.sendSocket(1575, ba);
    };
    /**1577  购买挑战次数     */
    Model_NZBZ.prototype.CG_NZBZ_BUY_BATTLENUM = function (count) {
        var ba = new BaseBytes();
        ba.writeByte(count);
        this.sendSocket(1577, ba);
    };
    /**1579 请求挑战 L:被挑战者id      */
    Model_NZBZ.prototype.CG_NZBZ_BATTLE = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(1579, ba);
    };
    /**1581 战斗结果 B:战斗结果，0：失败，1：胜利 */
    Model_NZBZ.prototype.CG_NZBZ_BATTLE_RESULT = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1581, ba);
    };
    /**1583 领取积分奖励 I:奖励项积分  */
    Model_NZBZ.prototype.CG_NZBZ_DRAW_JIFENREWARD = function (jiefenId) {
        var ba = new BaseBytes();
        ba.writeInt(jiefenId);
        this.sendSocket(1583, ba);
    };
    /**1585  刷新对手    */
    Model_NZBZ.prototype.CG_NZBZ_RES_ENEMY = function () {
        var ba = new BaseBytes();
        this.sendSocket(1585, ba);
    };
    /**1587 扫荡 L:被扫荡玩家id    */
    Model_NZBZ.prototype.CG_NZBZ_SAODANG = function (id) {
        var ba = new BaseBytes();
        ba.writeLong(id);
        this.sendSocket(1587, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_NZBZ.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(1570, a.GC_NZNBZ_PROMPT, a);
        wsm.regHand(1572, a.GC_OPEN_NZBZ, a);
        wsm.regHand(1574, a.GC_GET_NZBZ_RANK, a);
        wsm.regHand(1576, a.GC_GET_NZBZ_COUNTRYRANK, a);
        wsm.regHand(1578, a.GC_NZBZ_BUY_BATTLENUM, a);
        wsm.regHand(1580, a.GC_NZBZ_BATTLE, a);
        wsm.regHand(1582, a.GC_NZBZ_BATTLE_RESULT, a);
        wsm.regHand(1584, a.GC_NZBZ_DRAW_JIFENREWARD, a);
        wsm.regHand(1586, a.GC_NZBZ_RES_ENEMY, a);
        wsm.regHand(1588, a.GC_NZBZ_SAODANG, a);
        wsm.regHand(1590, a.GC_NZBZ_UPDATE_BATTLENUM, a);
    };
    /**1570	提示 B:提示类型（1：周结算中不可操作） */
    Model_NZBZ.prototype.GC_NZNBZ_PROMPT = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            ViewCommonWarn.text("周结算中不可操作");
        }
    };
    /**1590 更新剩余挑战次数 I:剩余挑战次数I:冷却时间  */
    Model_NZBZ.prototype.GC_NZBZ_UPDATE_BATTLENUM = function (self, data) {
        var battleNum = data.readInt();
        var coolTime = data.readInt();
        Model_NZBZ.battleNum = battleNum;
        Model_NZBZ.coolTime = coolTime;
        GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
    };
    /**1588 扫荡结果 B:0：失败，1：成功I:失败：错误码， 成功：剩余挑战次数I:冷却时间I:积分B:个人排行[B:物品类型I:道具idI:数量]奖励数据  */
    Model_NZBZ.prototype.GC_NZBZ_SAODANG = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var battleNum = data.readInt();
            var coolTime = data.readInt();
            var jifen = data.readInt();
            var myRank = data.readByte();
            Model_NZBZ.addJiFen = jifen - Model_NZBZ.myJiFen;
            Model_NZBZ.myJiFen = jifen;
            Model_NZBZ.myRank = myRank;
            Model_NZBZ.battleNum = battleNum;
            Model_NZBZ.coolTime = coolTime;
            var arr = [];
            for (var i = 0, len = data.readShort(); i < len; i++) {
                var vo = ConfigHelp.parseItemBa(data);
                arr.push(vo);
                // ConfigHelp.addSerGainText(vo.gType, vo.id, true, vo.count);
            }
            // GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN_SAODANG, arr);
            GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
        }
        else {
        }
    };
    /**1586 刷新对手 [L:玩家idU:玩家名称I:职业I:等级I:头像I:头像框B:国家I:官衔L:战力I:积分奖励常数idI:声望、功勋奖励常数id]对手数据 */
    Model_NZBZ.prototype.GC_NZBZ_RES_ENEMY = function (self, data) {
        Model_NZBZ.enemyArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var id = data.readLong();
            var name_1 = data.readUTF();
            var job = data.readInt();
            var level = data.readInt();
            var headId = data.readInt();
            var framePic = data.readInt();
            var country = data.readByte();
            var guanzhi0 = data.readInt();
            var power = data.readLong();
            var jifenId = data.readInt();
            var constId = data.readInt();
            var vo = new Vo_NZBZ();
            vo.id = id;
            vo.name = name_1;
            vo.job = job;
            vo.level = level;
            vo.headId = headId;
            vo.framePic = framePic;
            vo.country = country;
            vo.guanzhi = guanzhi0;
            vo.power = power;
            vo.jifenId = jifenId;
            vo.constId = constId;
            Model_NZBZ.enemyArr.push(vo);
        }
        GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
    };
    /**1584 领取结果 B:0：失败，1：成功I:失败：错误码，成功：积分奖励项  */
    Model_NZBZ.prototype.GC_NZBZ_DRAW_JIFENREWARD = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_NZBZ.drawArr.push(data.readInt());
            Model_NZBZ.jifenArr.sort(Model_NZBZ.sortJiFen);
            GGlobal.control.notify(Enum_MsgType.NZBZ_JIFENREWARD_UPDATE);
        }
    };
    /**1582战斗结果 B:结果：0：失败，1：胜利I:积分I:个人排行[I:物品类型I:道具idI:数量]奖励数据  */
    Model_NZBZ.prototype.GC_NZBZ_BATTLE_RESULT = function (self, data) {
        var result = data.readByte();
        var jifen = data.readInt();
        var myRank = data.readInt();
        Model_NZBZ.myJiFen = jifen;
        Model_NZBZ.myRank = myRank;
        if (result == 1) {
            var arr = [];
            for (var i = 0, len = data.readShort(); i < len; i++) {
                var type = data.readInt();
                var itemId = data.readInt();
                var count = data.readInt();
                var vo = void 0;
                if (type == Enum_Attr.ITEM) {
                    vo = VoItem.create(itemId);
                }
                else {
                    vo = Vo_Currency.create(type);
                }
                vo.count = count;
                arr.push(vo);
            }
            ViewCommonWin.show(arr, 10000);
        }
        else {
            if (GGlobal.sceneType == SceneCtrl.NANZHENG_BEIZHAN) {
                ViewBattleFault.show(10000);
            }
        }
        GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
    };
    /**1580 请求挑战结果 B:0：失败，1：成功L:被挑战者IdB:战斗结果：0：失败，1：成功，2：前端判断I:剩余挑战次数I:冷却时间 B:是否机器人 0：否，1：是 */
    Model_NZBZ.prototype.GC_NZBZ_BATTLE = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readLong();
            var battleRet = data.readByte();
            var battleNum = data.readInt();
            var coolTime = data.readInt();
            var robot = data.readByte();
            Model_NZBZ.battleRet = battleRet + 1;
            if (Model_NZBZ.battleRet > 2) {
                Model_NZBZ.battleRet = 0;
            }
            Model_NZBZ.battleNum = battleNum;
            Model_NZBZ.coolTime = coolTime;
            Model_NZBZ.battleID = id;
            Model_NZBZ.isRobot = robot;
            if (robot > 0) {
                GGlobal.mapscene.enterScene(SceneCtrl.NANZHENG_BEIZHAN);
            }
            else {
                var battleVo = GGlobal.modelPlayer.playerDetailDic[id];
                if (battleVo) {
                    GGlobal.mapscene.enterScene(SceneCtrl.NANZHENG_BEIZHAN);
                }
                else {
                    GGlobal.control.listen(Enum_MsgType.MSG_ADDROLEDETAIL, self.enterBattle, self);
                }
            }
        }
    };
    Model_NZBZ.prototype.enterBattle = function () {
        var battleVo = GGlobal.modelPlayer.playerDetailDic[Model_NZBZ.battleID];
        if (battleVo) {
            GGlobal.mapscene.enterScene(SceneCtrl.NANZHENG_BEIZHAN);
            GGlobal.control.remove(Enum_MsgType.MSG_ADDROLEDETAIL, this.enterBattle, this);
        }
    };
    /**1578 购买结果返回 B:0：失败，1：成功I:失败：错误码，成功：剩余挑战次数I:剩余购买次数I:冷却时间  */
    Model_NZBZ.prototype.GC_NZBZ_BUY_BATTLENUM = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_NZBZ.battleNum = data.readInt();
            Model_NZBZ.buyNum = data.readInt();
            Model_NZBZ.coolTime = data.readInt();
            GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
        }
    };
    /**1576 返回国家排行 [B:排名B:国家I:积分]国家排行U:君主名称  */
    Model_NZBZ.prototype.GC_GET_NZBZ_COUNTRYRANK = function (self, data) {
        Model_NZBZ.countryRankArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var rank = data.readByte();
            var country = data.readByte();
            var jifen = data.readInt();
            Model_NZBZ.countryRankArr[rank - 1] = [country, jifen];
        }
        var kingName = data.readUTF();
        Model_NZBZ.kingName = kingName;
        GGlobal.control.notify(Enum_MsgType.NZBZ_RANK_UPDATE);
    };
    /***1574 返回个人排行 I:自身排名I:积分[I:排名U:玩家名称B:国家I:积分]排行数据  */
    Model_NZBZ.prototype.GC_GET_NZBZ_RANK = function (self, data) {
        var myRank = data.readInt();
        var myJiFen = data.readInt();
        Model_NZBZ.rankArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var rank = data.readInt();
            var roleName = data.readUTF();
            var country = data.readByte();
            var jifen = data.readInt();
            if (!Model_NZBZ.rankArr[rank - 1])
                Model_NZBZ.rankArr[rank - 1] = [];
            Model_NZBZ.rankArr[rank - 1] = [rank, roleName, country, jifen];
        }
        Model_NZBZ.myRank = myRank;
        Model_NZBZ.myJiFen = myJiFen;
        GGlobal.control.notify(Enum_MsgType.NZBZ_RANK_UPDATE);
    };
    /**1572 南征北战界面信息 I:官衔I:个人排名B:国家排名I:个人积分I:剩余挑战次数I:剩余购买次数I:冷却时间
     * [[L:玩家idU:玩家名称I:职业I:等级I:头像I:头像框B:国家I:官衔L:战力I:积分奖励常数idI:声望、功勋奖励常数id]挑战对手数据[I:已领奖励的积分项]已领取积分奖励数据  */
    Model_NZBZ.prototype.GC_OPEN_NZBZ = function (self, data) {
        Model_NZBZ.isFirstOpen = true;
        var guanzhi = data.readInt();
        var myRank = data.readInt();
        var countryRank = data.readByte();
        var myJiFen = data.readInt();
        var battleNum = data.readInt();
        var buyNum = data.readInt();
        var coolTime = data.readInt();
        GGlobal.modelguanxian.guanzhi = guanzhi;
        Model_NZBZ.myRank = myRank;
        Model_NZBZ.countryRank = countryRank;
        Model_NZBZ.myJiFen = myJiFen;
        Model_NZBZ.battleNum = battleNum;
        Model_NZBZ.buyNum = buyNum;
        Model_NZBZ.coolTime = coolTime;
        Model_NZBZ.enemyArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var id = data.readLong();
            var name_2 = data.readUTF();
            var job = data.readInt();
            var level = data.readInt();
            var headId = data.readInt();
            var framePic = data.readInt();
            var country = data.readByte();
            var guanzhi0 = data.readInt();
            var power = data.readLong();
            var jifenId = data.readInt();
            var constId = data.readInt();
            var vo = new Vo_NZBZ();
            vo.id = id;
            vo.name = name_2;
            vo.job = job;
            vo.level = level;
            vo.headId = headId;
            vo.framePic = framePic;
            vo.country = country;
            vo.guanzhi = guanzhi0;
            vo.power = power;
            vo.jifenId = jifenId;
            vo.constId = constId;
            Model_NZBZ.enemyArr.push(vo);
        }
        Model_NZBZ.drawArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_NZBZ.drawArr.push(data.readInt());
        }
        Model_NZBZ.jifenArr.sort(Model_NZBZ.sortJiFen);
        GGlobal.control.notify(Enum_MsgType.NZBZ_UPDATE);
    };
    Model_NZBZ.addHandler = function () {
        if (Model_NZBZ.buyNum <= 0) {
            ViewCommonWarn.text("已达购买上限");
            return;
        }
        var cost = 100;
        ViewAlertBuy.show(cost, Model_NZBZ.buyNum, Model_NZBZ.buyNum, "", Handler.create(this, Model_NZBZ.okHandle));
    };
    Model_NZBZ.okHandle = function (count) {
        if (Model_player.voMine.yuanbao < 100 * count) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelnzbz.CG_NZBZ_BUY_BATTLENUM(count);
    };
    /**已领取积分项 */
    Model_NZBZ.drawArr = [];
    /**对手信息 */
    Model_NZBZ.enemyArr = [];
    /**个人排行 榜 */
    Model_NZBZ.rankArr = [];
    /** 国家排名 */
    Model_NZBZ.countryRankArr = [];
    Model_NZBZ._jifenArr = [];
    Model_NZBZ.isFirstOpen = false;
    return Model_NZBZ;
}(BaseModel));
__reflect(Model_NZBZ.prototype, "Model_NZBZ");
