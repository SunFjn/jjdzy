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
var Model_YJDQ = (function (_super) {
    __extends(Model_YJDQ, _super);
    function Model_YJDQ() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_YJDQ.checkTabNotice = function () {
        var arr = Model_YJDQ.dataArr;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (Model_YJDQ.checkNoticeByType(i))
                return true;
        }
        if (Model_YJDQ.battleNum > 0)
            return true;
        return false;
    };
    Model_YJDQ.checkNoticeByType = function (type) {
        if (type >= Model_YJDQ.dataArr.length)
            return false;
        var cfg = Config.yiqi_007[Math.floor(Model_YJDQ.dataArr[type][1] / Model_YJDQ.rewardMax + 1) * Model_YJDQ.rewardMax];
        if (cfg) {
            return cfg.index <= Model_YJDQ.passMax;
        }
        return false;
    };
    /**1281 打开一骑当千界面   */
    Model_YJDQ.prototype.CG_OPEN_YJDQ = function () {
        var ba = new BaseBytes();
        this.sendSocket(1281, ba);
    };
    /**1283 请求挑战 B:难度    */
    Model_YJDQ.prototype.CG_YJDQ_BATTLEBYTYPE = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1283, ba);
    };
    /**1285  胜利，打完当前一波怪      */
    Model_YJDQ.prototype.CG_YJDQ_SYSWIN = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1285, ba);
    };
    /**1287  购买挑战次数     */
    Model_YJDQ.prototype.CG_YJDQ_BUY_BATTLENUM = function (ct) {
        var ba = new BaseBytes();
        ba.writeByte(ct);
        this.sendSocket(1287, ba);
    };
    /**1289 领取首通奖励 B:难度     */
    Model_YJDQ.prototype.CG_YJDQ_DRAWREWARD = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1289, ba);
    };
    /**1291  打开排行榜       */
    Model_YJDQ.prototype.CG_YJDQ_OPENRANK = function () {
        var ba = new BaseBytes();
        this.sendSocket(1291, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_YJDQ.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(1282, this.GC_OPEN_YJDQ, this);
        wsm.regHand(1284, this.GC_YJDQ_BATTLEBYTYPE, this);
        wsm.regHand(1286, this.GC_YJDQ_SYSWIN, this);
        wsm.regHand(1288, this.GC_YJDQ_BUY_BATTLENUM, this);
        wsm.regHand(1290, this.GC_YJDQ_DRAWREWARD, this);
        wsm.regHand(1292, this.GC_YJDQ_OPENRANK, this);
    };
    /**1292 排行榜数据返回 [B:排名U:名字B:难度I:波数编号L:战力]排行榜  */
    Model_YJDQ.prototype.GC_YJDQ_OPENRANK = function (self, data) {
        Model_YJDQ.rankData = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var rank = data.readByte();
            var roleName = data.readUTF();
            var type = data.readByte();
            var pass = data.readInt();
            var power = data.readLong();
            Model_YJDQ.rankData[rank - 1] = [rank, roleName, type, pass, power];
        }
        GGlobal.control.notify(Enum_MsgType.YJDQ_RANK_UPDATE);
    };
    /**1290 领取奖励结果 B:0：失败，1：成功I:失败：错误码（1：未通关不能领取），成功：领取关编号  */
    Model_YJDQ.prototype.GC_YJDQ_DRAWREWARD = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var pass = data.readInt();
            var type = Math.floor(pass / 1000);
            Model_YJDQ.dataArr[type - 1][1] = pass;
            GGlobal.control.notify(Enum_MsgType.YJDQ_UPDATE);
        }
    };
    /**1288 购买挑战次数结果 B:0：失败，1：成功I:失败：错误码(1：已达当天购买上限，2：元宝不足)，成功：剩余挑战次数I:已购买挑战次数  */
    Model_YJDQ.prototype.GC_YJDQ_BUY_BATTLENUM = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_YJDQ.battleNum = data.readInt();
            Model_YJDQ.buyNum = data.readInt();
            GGlobal.control.notify(Enum_MsgType.YJDQ_UPDATE);
        }
    };
    /**1286 挑战数据返回 I:下一关编号B:战斗结果（0：失败，1：胜利；2：以前端为准; 3：完成本难度最高波数，4：当前波失败）   */
    Model_YJDQ.prototype.GC_YJDQ_SYSWIN = function (self, data) {
        var pass = data.readInt();
        var result = data.readByte();
        var cfg = Config.yiqi_007[pass];
        if (result == 1 || result == 0 || result == 2) {
            Model_YJDQ.curPass = pass;
            Model_YJDQ.battleRet = result == 1 ? 2 : 1;
            if (GGlobal.sceneType == SceneCtrl.YJDQ) {
                YJDQSceneCtrl.instance.setSt(0);
            }
        }
        else if (result == 3) {
            if (pass > Model_YJDQ.dataArr[cfg.type - 1][0])
                Model_YJDQ.dataArr[cfg.type - 1][0] = pass;
            if (pass > Model_YJDQ.passMax)
                Model_YJDQ.passMax = pass;
            if (cfg.type == Model_YJDQ.type && Model_YJDQ.dataArr[cfg.type])
                Model_YJDQ.type++;
            Model_YJDQ.curPass = pass;
            GGlobal.layerMgr.open(UIConst.FUBEN_YJDQ_WIN, 1);
        }
        else if (result == 4) {
            if (pass - 1 > Model_YJDQ.dataArr[cfg.type - 1][0])
                Model_YJDQ.dataArr[cfg.type - 1][0] = pass - 1;
            if (pass - 1 > Model_YJDQ.passMax)
                Model_YJDQ.passMax = pass - 1;
            Model_YJDQ.curPass = pass - 1;
            if (GGlobal.sceneType == SceneCtrl.YJDQ) {
                GGlobal.layerMgr.open(UIConst.FUBEN_YJDQ_WIN, 2);
            }
        }
        GGlobal.control.notify(Enum_MsgType.YJDQ_UPDATE);
    };
    /**1284 请求挑战失败 B:0：成功，1：难度未开启，2：无挑战次数）  */
    Model_YJDQ.prototype.GC_YJDQ_BATTLEBYTYPE = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_YJDQ.battleNum--;
            GGlobal.mapscene.enterScene(SceneCtrl.YJDQ);
            GGlobal.control.notify(Enum_MsgType.YJDQ_UPDATE);
        }
    };
    /**1282 打开界面数据返回 B:开通的难度I:最高通关编号[B:难度I:今日通关数I:已领取首通奖励波数编号]通关信息I:剩余挑战次数I:已购买挑战次数   */
    Model_YJDQ.prototype.GC_OPEN_YJDQ = function (self, data) {
        Model_YJDQ.isFirstOpen = true;
        var type = data.readByte();
        var passMax = data.readInt();
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var type1 = data.readByte();
            var todayPass = data.readInt();
            var rewardNum = data.readInt();
            if (rewardNum <= 0)
                rewardNum = type1 * 1000;
            Model_YJDQ.dataArr[type1 - 1] = [todayPass, rewardNum];
        }
        var battleNum = data.readInt();
        var buyNum = data.readInt();
        Model_YJDQ.type = type;
        Model_YJDQ.passMax = passMax;
        Model_YJDQ.battleNum = battleNum;
        Model_YJDQ.buyNum = buyNum;
        // GGlobal.control.notify(Enum_MsgType.YJDQ_UPDATE);
        GGlobal.control.notify(Enum_MsgType.YJDQ_INIT_UPDATE);
    };
    Model_YJDQ.curPass = 1001;
    Model_YJDQ.type = 1;
    Model_YJDQ.dataArr = [];
    Model_YJDQ.rankData = [];
    Model_YJDQ.battleRet = 0;
    Model_YJDQ.rewardMax = 20;
    Model_YJDQ.isFirstOpen = false;
    return Model_YJDQ;
}(BaseModel));
__reflect(Model_YJDQ.prototype, "Model_YJDQ");
