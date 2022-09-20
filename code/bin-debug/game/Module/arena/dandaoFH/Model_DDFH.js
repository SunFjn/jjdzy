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
var Model_DDFH = (function (_super) {
    __extends(Model_DDFH, _super);
    function Model_DDFH() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_DDFH.getRankData = function () {
        for (var key in Config.ddfhrank_225) {
            var cfg = Config.ddfhrank_225[key];
            var id = cfg.id;
            if (!Model_DDFH.rankArr[Math.floor(id / 100) - 1])
                Model_DDFH.rankArr[Math.floor(id / 100) - 1] = [];
            Model_DDFH.rankArr[Math.floor(id / 100) - 1].push(cfg);
        }
    };
    /**1611  打开单刀赴会界面   */
    Model_DDFH.prototype.CG_OPEN_DANDAOFH = function () {
        var ba = new BaseBytes();
        this.sendSocket(1611, ba);
    };
    /**1613 领取每日奖励 B:胜利场次奖励项    */
    Model_DDFH.prototype.CG_DANDAOFH_DRAWWINREWARD = function (winNum) {
        var ba = new BaseBytes();
        ba.writeByte(winNum);
        this.sendSocket(1613, ba);
    };
    /**1617 获取排行榜 B:排行榜类型：1：本服，2：跨服  */
    Model_DDFH.prototype.CG_DANDAOFH_RANKDATA = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1617, ba);
    };
    /**1619  购买挑战次数    */
    Model_DDFH.prototype.CG_DANDAOFH_BUY_BATTLENUM = function (count) {
        var ba = new BaseBytes();
        ba.writeByte(count);
        this.sendSocket(1619, ba);
    };
    /**1621 请求匹配     */
    Model_DDFH.prototype.CG_DANDAOFH_MATHENEMY = function () {
        var ba = new BaseBytes();
        this.sendSocket(1621, ba);
        Model_DDFH.enemyArr = []; //清空旧数据
    };
    /**1625 战斗结果，请求结算 B:0：失败，1：胜利      */
    Model_DDFH.prototype.CG_DANDAOFH_BATTLERESULT = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1625, ba);
    };
    /**1627  获取战报 */
    Model_DDFH.prototype.CG_DANDAOFH_BATTLEGROUP = function () {
        var ba = new BaseBytes();
        this.sendSocket(1627, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_DDFH.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(1612, a.GC_OPEN_DANDAOFH, a);
        wsm.regHand(1614, a.GC_DANDAOFH_DRAWWINREWARD, a);
        wsm.regHand(1618, a.GC_DANDAOFH_RANKDATA, a);
        wsm.regHand(1620, a.GC_DANDAOFH_BUY_BATTLENUM, a);
        wsm.regHand(1622, a.GC_DANDAOFH_MATHENEMY, a);
        wsm.regHand(1624, a.GC_DANDAOFH_ENEMYDATA, a);
        wsm.regHand(1626, a.GC_DANDAOFH_BATTLERESULT, a);
        wsm.regHand(1628, a.GC_DANDAOFH_BATTLEGROUP, a);
    };
    /**1628 战报返回 [B:战斗结果：0：失败，1：胜利U:玩家名字I:获得积分]战报数据  */
    Model_DDFH.prototype.GC_DANDAOFH_BATTLEGROUP = function (self, data) {
        Model_DDFH.battleGroupArr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_DDFH.battleGroupArr.push(data.readFmt(["B", "U", "I"]));
        }
        GGlobal.control.notify(Enum_MsgType.DANDAO_FUHUI_BATTLEGROUP);
    };
    /**1626 结算结果返回 B:0：失败，1：胜利[I:物品类型I:道具idI:数量]奖励数据I:当前积分 I:段位 I:排名*/
    Model_DDFH.prototype.GC_DANDAOFH_BATTLERESULT = function (self, data) {
        var result = data.readByte();
        var arr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            arr.push(data.readFmt(["I", "I", "I"]));
        }
        var jifen = data.readInt();
        var level = data.readInt();
        var myRank = data.readInt();
        if (result == 1) {
            ViewCommonWin.show(ConfigHelp.makeItemListArr(arr), 10000);
            Model_DDFH.winNum++;
        }
        else {
            if (GGlobal.sceneType == SceneCtrl.DANDAO_FUHUI) {
                ViewBattleFault.show(10000);
            }
        }
        Model_DDFH.jifen = jifen;
        Model_DDFH.level = level;
        Model_DDFH.myRank = myRank;
        GGlobal.control.notify(Enum_MsgType.DANDAO_FUHUI);
    };
    /**1624 匹配结果 B:0：失败，1：成功L:对手玩家idU:对手名称I:头像I:头像框B:战斗结果：0：失败，1：成功，2：前端判断  */
    Model_DDFH.prototype.GC_DANDAOFH_ENEMYDATA = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_DDFH.battleId = data.readLong();
            var arr = data.readFmt(["U", "I", "I"]);
            Model_DDFH.enemyArr = [[arr[1], arr[2], arr[0]]];
            Model_DDFH.battleRet = data.readByte() + 1;
            if (Model_DDFH.battleRet > 2)
                Model_DDFH.battleRet = 0;
            Model_DDFH.battleNum--;
            GGlobal.control.notify(Enum_MsgType.DANDAO_FUHUI_MATH);
        }
        else {
            ViewCommonWarn.text("匹配不到对手");
            GGlobal.layerMgr.close2(UIConst.DANDAO_FUHUI_MATH);
        }
    };
    /**1622 请求匹配结果 B:0：成功进入匹配，1：已经在匹配中，2：已无挑战次数  */
    Model_DDFH.prototype.GC_DANDAOFH_MATHENEMY = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            GGlobal.layerMgr.open(UIConst.DANDAO_FUHUI_MATH);
        }
    };
    /**1620 购买挑战次数结果 B:0：失败，1：成功I:失败：错误码，成功：挑战次数I:剩余购买次数  */
    Model_DDFH.prototype.GC_DANDAOFH_BUY_BATTLENUM = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            ViewCommonWarn.text("购买成功");
            Model_DDFH.battleNum = data.readInt();
            Model_DDFH.buyNum = data.readInt();
            GGlobal.control.notify(Enum_MsgType.DANDAO_FUHUI);
        }
    };
    /**1618 返回排行榜数据 B:排行榜类型：1：本服，2：跨服[I:排名B:段位L:玩家idU:玩家名字I:积分]排行榜数据I:个人排名B:个人段位  */
    Model_DDFH.prototype.GC_DANDAOFH_RANKDATA = function (self, data) {
        var type = data.readByte();
        var len = data.readShort();
        if (type == 1) {
            Model_DDFH.rankData = [];
        }
        else {
            Model_DDFH.crossRankData = [];
        }
        for (var i = 0; i < len; i++) {
            var arr = data.readFmt(["I", "B", "L", "U", "I"]);
            if (type == 1) {
                Model_DDFH.rankData[arr[0] - 1] = arr;
            }
            else {
                Model_DDFH.crossRankData[arr[0] - 1] = arr;
            }
        }
        if (type == 1) {
            Model_DDFH.myRank = data.readInt();
        }
        else {
            Model_DDFH.myCrossRank = data.readInt();
        }
        Model_DDFH.level = data.readByte();
        GGlobal.control.notify(Enum_MsgType.DANDAO_FUHUI_RANK);
    };
    /**1614 领取每日奖励结果 B:0：失败，1：胜利B:失败：错误码，成功：胜利场次奖励项  */
    Model_DDFH.prototype.GC_DANDAOFH_DRAWWINREWARD = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_DDFH.winRewardArr.push(data.readByte());
            GGlobal.control.notify(Enum_MsgType.DANDAO_FUHUI);
        }
    };
    /**1612 返回界面信息 I:段位（为0时活动未开启）I:积分I:挑战次数I:购买次数I:胜利次数I:个人排名I:活动结束时间[B:胜利场次奖励项]已领取的每日奖励  */
    Model_DDFH.prototype.GC_OPEN_DANDAOFH = function (self, data) {
        Model_DDFH.winRewardArr = [];
        Model_DDFH.level = data.readInt();
        Model_DDFH.jifen = data.readInt();
        Model_DDFH.battleNum = data.readInt();
        Model_DDFH.buyNum = data.readInt();
        Model_DDFH.winNum = data.readInt();
        Model_DDFH.myRank = data.readInt();
        Model_DDFH.overTime = data.readInt();
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_DDFH.winRewardArr.push(data.readByte());
        }
        GGlobal.control.notify(Enum_MsgType.DANDAO_FUHUI);
    };
    /**段位 */
    Model_DDFH.level = 0;
    /**积分 */
    Model_DDFH.jifen = 0;
    /**战斗次数 */
    Model_DDFH.battleNum = 0;
    /**购买次数 */
    Model_DDFH.buyNum = 0;
    /**胜利次数 */
    Model_DDFH.winNum = 0;
    /**个人排名 */
    Model_DDFH.myRank = 0;
    /**个人跨服排名 */
    Model_DDFH.myCrossRank = 0;
    /**活动结束时间 */
    Model_DDFH.overTime = 0;
    /**已领取胜利将次 */
    Model_DDFH.winRewardArr = [];
    Model_DDFH.winNumArr = [3, 5, 7, 10];
    /**本服排行榜数据 */
    Model_DDFH.rankData = [];
    /**跨服排行榜数据 */
    Model_DDFH.crossRankData = [];
    /**战斗人的ID */
    Model_DDFH.battleId = 0;
    /**战斗人结果 */
    Model_DDFH.battleRet = 0;
    /**战斗人数据*/
    Model_DDFH.enemyArr = [];
    /**记录是否勾选自动匹配*/
    Model_DDFH.autoMath = false;
    /**自动匹配倒计时*/
    Model_DDFH.autoTime = 4;
    /**战报数据*/
    Model_DDFH.battleGroupArr = [];
    /**排行榜表 */
    Model_DDFH.rankArr = [];
    return Model_DDFH;
}(BaseModel));
__reflect(Model_DDFH.prototype, "Model_DDFH");
