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
var Model_ActComDDL = (function (_super) {
    __extends(Model_ActComDDL, _super);
    function Model_ActComDDL() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.xiaLians = [];
        _this.duilianCount = 0;
        _this.remainTime = 0;
        _this.correctCount = 0;
        _this.rewardArr = [];
        _this.rankArr = [];
        _this.myRank = 0;
        _this.myCount = 0;
        return _this;
    }
    /**11321 下联提交 [B:位置，从1开始]下联列表  */
    Model_ActComDDL.prototype.CG_COMMIT = function (arr) {
        var bates = this.getBytes();
        var len = arr.length;
        bates.writeShort(len);
        for (var i = 0; i < len; i++) {
            bates.writeByte(arr[i]);
        }
        this.sendSocket(11321, bates);
    };
    /**11323 打开排行榜  */
    Model_ActComDDL.prototype.CG_OPEN_RANKUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(11323, ba);
    };
    /**11325 领取目标奖励 I:要领取的奖励id   */
    Model_ActComDDL.prototype.CG_GET_TARGETAWARD = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(11325, ba);
    };
    //协议处理
    Model_ActComDDL.prototype.listenServ = function (mgr) {
        var self = this;
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(11320, self.GC_OPEN_UI, self);
        mgr.regHand(11322, self.GC_COMMIT, self);
        mgr.regHand(11324, self.GC_OPEN_RANKUI, self);
        mgr.regHand(11326, self.GC_GET_TARGETAWARD, self);
        mgr.regHand(11328, self.GC_SEND_TIMES, self);
    };
    /**11320  打开界面返回 I:对联id[B:下联id]下联列表I:剩余对联次数I:恢复时间I:正确次数[I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]目标奖励状态列表 */
    Model_ActComDDL.prototype.GC_OPEN_UI = function (s, data) {
        s.id = data.readInt();
        s.xiaLians = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readByte();
            s.xiaLians.push(id);
        }
        s.duilianCount = data.readInt();
        s.remainTime = data.readInt();
        s.correctCount = data.readInt();
        s.rewardArr = [];
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = new DDLVO();
            vo.readAwardMsg(data);
            s.rewardArr.push(vo);
        }
        s.reddotCheck();
        GGlobal.control.notify(UIConst.ACTCOM_DDL, true);
    };
    /**11322 下联提交返回 B:状态:1：对，2：错，3：提交对联字数错误，4：没次数*/
    Model_ActComDDL.prototype.GC_COMMIT = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            ViewCommonWarn.text("回答正确");
            // s.duilianCount --;
            GGlobal.control.notify(UIConst.ACTCOM_DDL, true);
            // s.reddotCheck();
        }
        else if (res == 2) {
            // s.duilianCount --;
            ViewCommonWarn.text("回答错误");
            GGlobal.control.notify(UIConst.ACTCOM_DDL, true);
            // s.reddotCheck();
        }
        else if (res == 3) {
            ViewCommonWarn.text("提交对联字数错误");
        }
        else if (res == 4) {
            ViewCommonWarn.text("对联次数已耗尽");
        }
    };
    /**11324 打开排行榜返回 [B:排名U:玩家名I:对联正确次数]排行榜数据B:我的排名 0未进排行榜 I:我的次数*/
    Model_ActComDDL.prototype.GC_OPEN_RANKUI = function (s, data) {
        s.rankArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var vo = new DDLVO();
            vo.readRankMsg(data);
            s.rankArr.push(vo);
        }
        s.myRank = data.readByte();
        s.myCount = data.readInt();
        GGlobal.control.notify(UIConst.DDL_RANK);
    };
    /**11326 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id*/
    Model_ActComDDL.prototype.GC_GET_TARGETAWARD = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var len = s.rewardArr.length;
            var id = data.readInt();
            for (var i = 0; i < len; i++) {
                var vo = s.rewardArr[i];
                if (vo.id == id) {
                    vo.status = 2;
                }
            }
            GGlobal.control.notify(UIConst.ACTCOM_DDL);
            s.reddotCheck();
        }
        else if (res == 2) {
            ViewCommonWarn.text("未达到条件");
        }
    };
    /**11328   推送次数 I:次数I:恢复时间  */
    Model_ActComDDL.prototype.GC_SEND_TIMES = function (s, data) {
        s.duilianCount = data.readInt();
        s.remainTime = data.readInt();
        s.reddotCheck();
        GGlobal.control.notify(UIConst.ACTCOM_DDL);
    };
    Model_ActComDDL.getddlpmCfg = function (qs, rank) {
        if (Model_ActComDDL._ddlpmCfg == null) {
            Model_ActComDDL._ddlpmCfg = {};
            for (var keys in Config.ddlrank_297) {
                var cfg = Config.ddlrank_297[keys];
                if (Model_ActComDDL._ddlpmCfg[cfg.qs] == null) {
                    Model_ActComDDL._ddlpmCfg[cfg.qs] = {};
                }
                var arr = ConfigHelp.SplitStr(cfg.rank);
                for (var j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
                    Model_ActComDDL._ddlpmCfg[cfg.qs][j] = cfg;
                }
            }
        }
        return Model_ActComDDL._ddlpmCfg[qs] ? Model_ActComDDL._ddlpmCfg[qs][rank] : null;
    };
    /** 检查红点 */
    Model_ActComDDL.prototype.reddotCheck = function () {
        var bol = false;
        var model = GGlobal.model_DDL;
        var count = Model_Bag.getItemCount(410429);
        var sf = GGlobal.reddot;
        if (model.duilianCount > 0 || count > 0) {
            bol = true;
        }
        var len = model.rewardArr.length;
        for (var i = 0; i < len; i++) {
            var vo = model.rewardArr[i];
            if (vo.status == 1) {
                bol = true;
                break;
            }
        }
        sf.setCondition(UIConst.ACTCOM_DDL, 0, bol);
        sf.notifyMsg(UIConst.ACTCOM_DDL);
    };
    return Model_ActComDDL;
}(BaseModel));
__reflect(Model_ActComDDL.prototype, "Model_ActComDDL");
