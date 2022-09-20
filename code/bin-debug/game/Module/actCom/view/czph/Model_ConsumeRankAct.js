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
 * Model_ConsumeRankAct
 * 充值排行(活动)
 */
var Model_ConsumeRankAct = (function (_super) {
    __extends(Model_ConsumeRankAct, _super);
    function Model_ConsumeRankAct() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.czphData = [];
        _this.rankArr = [];
        _this.firstJob = 0;
        _this.firstGodWeapon = 0;
        _this.firstHorseId = 0;
        _this.myRank = 0;
        _this.myMoney = 0;
        _this.qishu = 0;
        return _this;
    }
    Model_ConsumeRankAct.prototype.getCZPHData = function () {
        var self = this;
        for (var key in Config.czph_755) {
            var cfg = Config.czph_755[key];
            if (!self.czphData[cfg.qs - 1])
                self.czphData[cfg.qs - 1] = [];
            self.czphData[cfg.qs - 1][parseInt(key) % 10 - 1] = cfg;
        }
    };
    //协议处理
    Model_ConsumeRankAct.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(8690, this.GC_ConsumeRankAct_openUI_8690, this);
    };
    /**8690 [I-U-I]-I-I-I 打开界面返回 [I:排名U:玩家名称I:充值元宝数]充值排行榜rechargeRankI:第一名职业时装（job*1000+时装id），
     * 没有则为0firstModelI:我的排名myRankI:我的充值数myRechargeI:期数I:神兵*/
    Model_ConsumeRankAct.prototype.GC_ConsumeRankAct_openUI_8690 = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < 50; i++) {
            self.rankArr[i] = [i + 1, "", 0];
        }
        for (var i = 0; i < len; i++) {
            var rank = data.readInt();
            var roleName = data.readUTF();
            var money = data.readInt();
            self.rankArr[rank - 1] = [rank, roleName, money];
        }
        self.firstJob = data.readInt();
        self.firstGodWeapon = data.readInt();
        self.myRank = data.readInt();
        self.myMoney = data.readInt();
        self.qishu = data.readInt();
        self.firstHorseId = data.readInt();
        GGlobal.control.notify(UIConst.ACTCOM_CZPH);
    };
    return Model_ConsumeRankAct;
}(BaseModel));
__reflect(Model_ConsumeRankAct.prototype, "Model_ConsumeRankAct");
