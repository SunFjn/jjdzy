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
var ModelYSSL = (function (_super) {
    __extends(ModelYSSL, _super);
    function ModelYSSL() {
        var _this = _super.call(this) || this;
        /**激活数据*/
        _this.act_data = {};
        /**taskdata*/
        _this.task_data = {};
        _this.qs = 1;
        _this.today_recharge_val = 0;
        //根据 配置去获取
        _this._lastqs = 1;
        //根据 配置去获取
        _this._lastQcylQs = 1;
        /**激活数据*/
        _this.qcyl_act_data = {};
        /**taskdata*/
        _this.qcyl_task_data = {};
        _this.qcyl_qs = 1;
        _this.qcyl_recharge_val = 0;
        return _this;
    }
    ModelYSSL.prototype.getCFGByIndex = function (type) {
        var s = this;
        var lib = Config.ysslrw_018;
        var nowQS = s.qs;
        if (!s._typeConfigData || nowQS != s._lastqs) {
            s._lastqs = nowQS;
            var temp = [];
            for (var i in lib) {
                var item = lib[i];
                if (item.qishu != nowQS)
                    continue;
                var lx = item.leixing;
                if (!temp[lx]) {
                    temp[lx] = [];
                    s.act_data[lx] = 0;
                }
                temp[lx].push(item);
                s.task_data[item.id] = { st: 4, count: 0 };
            }
            temp.forEach(function (val, idx, array) {
                if (val) {
                    Array(val).sort(function (a, b) {
                        return a.id > b.id ? 1 : -1;
                    });
                }
            });
            s._typeConfigData = temp;
        }
        return s._typeConfigData[type];
    };
    ModelYSSL.prototype.getCFGByIndex1 = function (type, qs) {
        var s = this;
        var lib = Config.qcylrw_327;
        var nowQS = qs;
        if (!s._typeConfigDataByQcyl || nowQS != s._lastQcylQs) {
            s._lastQcylQs = nowQS;
            var temp = [];
            for (var i in lib) {
                var item = lib[i];
                if (item.qishu != nowQS)
                    continue;
                var lx = item.leixing;
                if (!temp[lx]) {
                    temp[lx] = [];
                    s.qcyl_act_data[lx] = 0;
                }
                temp[lx].push(item);
                s.qcyl_task_data[item.id] = { st: 4, count: 0 };
            }
            temp.forEach(function (val, idx, array) {
                if (val) {
                    Array(val).sort(function (a, b) {
                        return a.id > b.id ? 1 : -1;
                    });
                }
            });
            s._typeConfigDataByQcyl = temp;
        }
        return s._typeConfigDataByQcyl[type];
    };
    ModelYSSL.prototype.getPriceByType = function (type) {
        var s = this;
        var nowQS = s.qs;
        if (!s._priceConfigData || nowQS != s._qs1) {
            s._qs1 = nowQS;
            var lib = Config.yssljh_018;
            s._priceConfigData = [];
            for (var i in lib) {
                var item = lib[i];
                if (item.qishu == nowQS) {
                    s._priceConfigData[item.dengji] = item;
                }
            }
        }
        return s._priceConfigData[type];
    };
    ModelYSSL.prototype.getPriceByType1 = function (type) {
        var s = this;
        var nowQS = s.qcyl_qs;
        if (!s._qcyl_priceConfigData || nowQS != s._qcyl_qs1) {
            s._qcyl_qs1 = nowQS;
            var lib = Config.qcyljh_327;
            s._qcyl_priceConfigData = [];
            for (var i in lib) {
                var item = lib[i];
                if (item.qishu == nowQS) {
                    s._qcyl_priceConfigData[item.dengji] = item;
                }
            }
        }
        return s._qcyl_priceConfigData[type];
    };
    ModelYSSL.prototype.checkNotice = function (actId) {
        // let task = this.task_data;
        // let act = this.act_data;
        var task;
        var act;
        var recharge = 0;
        if (actId == UIConst.YSSL) {
            task = this.task_data;
            act = this.act_data;
            recharge = this.today_recharge_val;
        }
        else if (actId == UIConst.YUNCHOUWEIWO_QCYL) {
            task = this.qcyl_task_data;
            act = this.qcyl_act_data;
            recharge = this.qcyl_recharge_val;
        }
        var reddot = {}; //type:value
        for (var i in task) {
            var item = task[i];
            var id = Number(i);
            // let cfg = Config.ysslrw_018[id];
            var cfg = void 0;
            if (actId == UIConst.YSSL) {
                cfg = Config.ysslrw_018[id];
            }
            else if (actId == UIConst.YUNCHOUWEIWO_QCYL) {
                cfg = Config.qcylrw_327[id];
            }
            if (reddot[cfg.leixing]) {
                continue;
            }
            // if (!act[cfg.leixing]) {
            // 	DEBUGWARING.log("not active id：" + id);
            // 	continue;
            // }
            if (!reddot[cfg.leixing]) {
                reddot[cfg.leixing] = 0;
            }
            if (item.st == 1) {
                reddot[cfg.leixing] = 1;
            }
        }
        var priceCFG;
        var main_reddot = 0;
        for (var i in reddot) {
            if (reddot[i] == 0) {
                if (actId == UIConst.YSSL) {
                    priceCFG = this.getPriceByType(Number(i));
                }
                else if (actId == UIConst.YUNCHOUWEIWO_QCYL) {
                    priceCFG = this.getPriceByType1(Number(i));
                }
                if (act[Number(i)] == 0 && recharge >= priceCFG.rmb) {
                    reddot[i] = 1;
                }
            }
            if (!main_reddot)
                main_reddot = reddot[i];
            // GGlobal.reddot.setCondition(UIConst.YSSL, Number(i), reddot[i]);
            GGlobal.reddot.setCondition(actId, Number(i), reddot[i]);
        }
        // GGlobal.reddot.setCondition(UIConst.YSSL, 0, main_reddot == 1);
        // GGlobal.reddot.notify(UIConst.YSSL);
        GGlobal.reddot.setCondition(actId, 0, main_reddot == 1);
        // GGlobal.reddot.notify(actId);
        GGlobal.reddot.notifyMsg(actId);
    };
    //协议处理
    ModelYSSL.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(9220, this.GC_SpecialAnimalSendGift_openUI_9220, this);
        mgr.regHand(9222, this.GC_SpecialAnimalSendGift_active_9222, this);
        mgr.regHand(9224, this.GC_SpecialAnimalSendGift_getAward_9224, this);
        //运筹帷幄-奇策有礼
        mgr.regHand(9950, this.GC_YCWW_QCYL_openUI, this);
        mgr.regHand(9952, this.GC_YCWW_QCYL_active, this);
        mgr.regHand(9954, this.GC_YCWW_QCYL_getAward, this);
    };
    /**9220 [I-B-I-[I-B]]-I-B 打开界面返回 [I:任务类型B:是否激活 0未激活，1激活I:参数[I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]]奖励列表awardListI:累计充值数totalRechargeB:期数qishu*/
    ModelYSSL.prototype.GC_SpecialAnimalSendGift_openUI_9220 = function (self, data) {
        self.act_data = {};
        self.task_data = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var type = data.readInt();
            var act_st = data.readByte();
            var pro = data.readInt();
            var len1 = data.readShort();
            self.act_data[type] = act_st;
            for (var i_1 = 0; i_1 < len1; i_1++) {
                var ids = data.readInt();
                var state = data.readByte();
                state = act_st == 0 ? 4 : state; //未开放默认为4的状态未激活
                self.task_data[ids] = { st: state, count: pro };
            }
        }
        self.today_recharge_val = data.readInt();
        self.qs = data.readByte();
        self.checkNotice(UIConst.YSSL);
        GGlobal.control.notify(ModelYSSL.OPEN);
    };
    /**9221 B 激活 B:任务类型type*/
    ModelYSSL.prototype.CG_SpecialAnimalSendGift_active_9221 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(9221, bates);
    };
    /**9222 B-B 激活返回 B:领取状态，1:成功，2:未达到条件，3:已激活stateB:任务类型type*/
    ModelYSSL.prototype.GC_SpecialAnimalSendGift_active_9222 = function (self, data) {
        var st = data.readByte();
        var type = data.readByte();
        if (st == 1)
            self.act_data[type] = st;
        GGlobal.control.notify(ModelYSSL.OPEN);
    };
    /**9223 I 领取奖励 I:配置表idid*/
    ModelYSSL.prototype.CG_SpecialAnimalSendGift_getAward_9223 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(9223, bates);
    };
    /**9224 B-I 领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取stateI:配置表idid*/
    ModelYSSL.prototype.GC_SpecialAnimalSendGift_getAward_9224 = function (self, data) {
        var st = data.readByte();
        if (st == 1) {
            var id = data.readInt();
            self.task_data[id].st = 2;
            self.checkNotice(UIConst.YSSL);
            GGlobal.control.notify(ModelYSSL.OPEN);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    /**9950 打开界面返回 [B:任务类型B:是否激活 0未激活，1激活I:参数[I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]]奖励列表I:累计充值数*/
    ModelYSSL.prototype.GC_YCWW_QCYL_openUI = function (self, data) {
        self.qcyl_act_data = {};
        self.qcyl_task_data = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var type = data.readByte();
            var act_st = data.readByte();
            var pro = data.readInt();
            var len1 = data.readShort();
            self.qcyl_act_data[type] = act_st;
            for (var i_2 = 0; i_2 < len1; i_2++) {
                var ids = data.readInt();
                var state = data.readByte();
                state = act_st == 0 ? 4 : state; //未开放默认为4的状态未激活
                self.qcyl_task_data[ids] = { st: state, count: pro };
            }
        }
        self.qcyl_recharge_val = data.readInt();
        self.checkNotice(UIConst.YUNCHOUWEIWO_QCYL);
        GGlobal.control.notify(ModelYSSL.QCYL_OPEN);
    };
    /**9951 B 激活 B:任务类型type*/
    ModelYSSL.prototype.CG_YCWW_QCYL_active = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(9951, bates);
    };
    /**9952 激活返回 B:领取状态，1:成功，2:未达到条件，3:已激活B:任务类型*/
    ModelYSSL.prototype.GC_YCWW_QCYL_active = function (self, data) {
        var st = data.readByte();
        var type = data.readByte();
        if (st == 1)
            self.qcyl_act_data[type] = st;
        GGlobal.control.notify(ModelYSSL.QCYL_OPEN);
    };
    /**9953 领取奖励 I:配置表id*/
    ModelYSSL.prototype.CG_YCWW_QCYL_getAward = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(9953, bates);
    };
    /**9954  领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:配置表id */
    ModelYSSL.prototype.GC_YCWW_QCYL_getAward = function (self, data) {
        var st = data.readByte();
        if (st == 1) {
            var id = data.readInt();
            self.qcyl_task_data[id].st = 2;
            self.checkNotice(UIConst.YUNCHOUWEIWO_QCYL);
            GGlobal.control.notify(ModelYSSL.QCYL_OPEN);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    ModelYSSL.OPEN = "open_yssl";
    ModelYSSL.QCYL_OPEN = "open_qcyl";
    return ModelYSSL;
}(BaseModel));
__reflect(ModelYSSL.prototype, "ModelYSSL");
