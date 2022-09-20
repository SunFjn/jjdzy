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
var Model_ActNianShou = (function (_super) {
    __extends(Model_ActNianShou, _super);
    function Model_ActNianShou() {
        var _this = _super.call(this) || this;
        _this.nsId = 0; //当前年兽id
        _this.lastHp = 0; //剩余血量
        _this.kingSt = 0; //年兽王状态（0：未召唤，1：召唤，2：已击退）
        _this.bianpaoCt = 0; //鞭炮数
        _this.lastTime = 0; //剩余恢复时间
        _this.point = 0; // 积分
        _this.nsArr = [];
        _this.rewStObj = {};
        return _this;
    }
    //刷新召唤年兽
    Model_ActNianShou.prototype.CG_SUMMON_11551 = function () {
        var bates = this.getBytes();
        this.sendSocket(11551, bates);
    };
    //召唤年兽王
    Model_ActNianShou.prototype.CG_SUMMON_KING_11553 = function () {
        var bates = this.getBytes();
        this.sendSocket(11553, bates);
    };
    //攻击年兽
    Model_ActNianShou.prototype.CG_ATTACT_11555 = function () {
        var bates = this.getBytes();
        this.sendSocket(11555, bates);
    };
    //领取目标奖励 I:目标奖励id
    Model_ActNianShou.prototype.CG_GET_GOAL_REWARD_11557 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11557, bates);
    };
    //领取奖池奖励 B:奖励序号B: 是否使用元宝开启：（0：否，1：是）
    Model_ActNianShou.prototype.CG_GET_REWARD_11559 = function (id, isYB) {
        var bates = this.getBytes();
        bates.writeByte(id);
        bates.writeByte(isYB);
        this.sendSocket(11559, bates);
    };
    //协议处理
    Model_ActNianShou.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(11550, this.GC_OPENUI_11550, this);
        mgr.regHand(11552, this.GC_SUMMON_11552, this);
        mgr.regHand(11554, this.GC_SUMMON_KING_11554, this);
        mgr.regHand(11556, this.GC_ATTACT_11556, this);
        mgr.regHand(11558, this.GC_GET_GOAL_REWARD_11558, this);
        mgr.regHand(11560, this.GC_GET_REWARD_11560, this);
        mgr.regHand(11562, this.GC_ADD_BIAN_PAO_11562, this);
    };
    //返回界面信息 I:当前年兽idI: 剩余血量B:年兽王状态（0：未召唤，1：召唤，2：已击退）I: 鞭炮数I:剩余恢复时间I: 积分[I:奖励的年兽idI: 剩余开启倒计时间]奖池数据[I:已领目标奖励id]已领目标奖励数据
    Model_ActNianShou.prototype.GC_OPENUI_11550 = function (self, data) {
        self.nsId = data.readInt();
        self.lastHp = data.readInt();
        self.kingSt = data.readByte();
        self.bianpaoCt = data.readInt();
        self.lastTime = data.readInt();
        self.point = data.readInt();
        var len = data.readShort();
        self.nsArr = [];
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var time = data.readInt();
            self.nsArr.push({ idx: i + 1, id: id, time: time });
        }
        len = data.readShort();
        self.rewStObj = {};
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            self.rewStObj[id] = 1;
        }
        self.nsReward();
        self.checkNotice();
        self.notify(Model_ActNianShou.openui);
    };
    //刷新结果返回 B:结果：0：失败，1：成功I: 失败：（1：年兽还没击退不能刷新，2：奖池满不能刷新），成功：年兽idI: 剩余血量
    Model_ActNianShou.prototype.GC_SUMMON_11552 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            self.nsId = id;
            self.lastHp = data.readInt();
            self.notify(Model_ActNianShou.openui);
        }
        else {
            ViewCommonWarn.text(["年兽还没击退不能刷新", "奖池满不能刷新"][id - 1]);
        }
    };
    //召唤年兽王 B:结果：0：失败，1：成功I: 失败：（1：年兽王还没击退不能刷新，2：奖池满不能属性），成功：年兽王idI: 剩余血量
    Model_ActNianShou.prototype.GC_SUMMON_KING_11554 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            self.nsId = id;
            self.kingSt = 1;
            self.lastHp = data.readInt();
            self.notify(Model_ActNianShou.openui);
        }
        else {
            ViewCommonWarn.text(["年兽还没击退不能刷新", "奖池满不能刷新", "今天已召唤过", "不在可召唤时段内"][id - 1]);
        }
    };
    //攻击结果 B:结果：0：失败，1：成功I: 失败：（1：未刷出年兽，2：已经击退），成功：年兽idI: 剩余血量I:鞭炮数I: 剩余恢复时间I:积分[I:奖励对应的年兽idI:剩余开启倒计时间]奖励池数据
    Model_ActNianShou.prototype.GC_ATTACT_11556 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            self.nsId = id;
            var lastHp = data.readInt();
            var attact = self.lastHp - lastHp;
            self.lastHp = lastHp;
            self.bianpaoCt = data.readInt();
            self.lastTime = data.readInt();
            self.point = data.readInt();
            self.kingSt = data.readByte();
            ;
            var len = data.readShort();
            var newArr = [];
            for (var i = 0; i < len; i++) {
                var id_1 = data.readInt();
                var time = data.readInt();
                newArr.push({ idx: i + 1, id: id_1, time: time });
            }
            self.notify(Model_ActNianShou.attack, attact);
            if (lastHp <= 0) {
                if (newArr.length > self.nsArr.length) {
                    self.nsArr.push(newArr[newArr.length - 1]);
                }
                self.nsReward();
                self.notify(Model_ActNianShou.ns_die);
                ViewCommonWarn.text("已击杀");
            }
            else {
                self.notify(Model_ActNianShou.openui);
            }
        }
        else {
            self.notify(Model_ActNianShou.attack_fail);
            ViewCommonWarn.text(["未刷出年兽", "已经击退", "鞭炮不足"][id - 1]);
        }
    };
    //领取目标奖励结果 B:结果：0：失败，1：成功I: 失败：（1：已领取，2：积分未达目标），成功：目标奖励id
    Model_ActNianShou.prototype.GC_GET_GOAL_REWARD_11558 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            if (self.rewStObj) {
                self.rewStObj[id] = 1;
            }
            self.notify(Model_ActNianShou.get_goal_reward);
            self.notify(Model_ActNianShou.openui);
        }
        else {
            ViewCommonWarn.text(["已领取", "积分未达目标"][id - 1]);
        }
    };
    //领取奖励结果 B:结果：（1：成功，2：奖励不存在，3：元宝不足，4：倒计时未结束）[I: 奖励对应的年兽idI:剩余开启倒计时间]奖池数据
    Model_ActNianShou.prototype.GC_GET_REWARD_11560 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            var len = data.readShort();
            self.nsArr = [];
            for (var i = 0; i < len; i++) {
                var id = data.readInt();
                var time = data.readInt();
                self.nsArr.push({ idx: i + 1, id: id, time: time });
            }
            self.nsReward();
            self.notify(Model_ActNianShou.openui);
            self.notify(Model_ActNianShou.get_ns_reward);
        }
        else {
            ViewCommonWarn.text(["奖励不存在", "元宝不足", "倒计时未结束"][res - 2]);
        }
    };
    Model_ActNianShou.prototype.GC_ADD_BIAN_PAO_11562 = function (self, data) {
        var ct = data.readInt();
        ViewBroadcastItemText.text("获得" + "【鞭炮】 X" + ct, Color.getColorInt(Color.ORANGE));
    };
    Object.defineProperty(Model_ActNianShou.prototype, "rewardArr", {
        get: function () {
            var s = this;
            if (!s._rewardArr) {
                s._rewardArr = [];
                for (var k in Config.nianpoint_299) {
                    s._rewardArr.push(Config.nianpoint_299[k]);
                }
            }
            return s._rewardArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_ActNianShou.prototype.checkNotice = function () {
        var s = this;
        var reddot = GGlobal.reddot;
        var red = s.checkRed();
        reddot.setCondition(UIConst.ACTCOM_NIANSHOU, 0, red);
        reddot.notifyMsg(UIConst.ACTCOM_NIANSHOU);
    };
    Model_ActNianShou.prototype.nsReward = function () {
        var s = this;
        //年兽奖励
        var hasTime = false;
        for (var i = 0; i < s.nsArr.length; i++) {
            var v = s.nsArr[i];
            if (v.time > 0) {
                Timer.instance.listen(s.upTime, s, 1000);
                hasTime = true;
                return;
            }
        }
        if (!hasTime) {
            Timer.instance.remove(s.upTime, s);
        }
    };
    Model_ActNianShou.prototype.upTime = function () {
        var s = this;
        var hasTi = false;
        for (var i = 0; i < s.nsArr.length; i++) {
            var v = s.nsArr[i];
            if (v.time > 0) {
                v.time--;
                hasTi = true;
            }
        }
        if (!hasTi) {
            Timer.instance.remove(s.upTime, s);
        }
        s.notify(Model_ActNianShou.uptime_ns_rew);
    };
    Model_ActNianShou.prototype.checkRed = function () {
        var s = this;
        //鞭炮数
        if (s.bianpaoCt > 0) {
            return true;
        }
        //可打
        if (s.nsId > 0 && s.lastHp > 0) {
            return true;
        }
        if (s.checkReward()) {
            return true;
        }
        //年兽奖励
        for (var i = 0; i < s.nsArr.length; i++) {
            var v = s.nsArr[i];
            if (v.time <= 0) {
                return true;
            }
        }
        return false;
    };
    Model_ActNianShou.prototype.checkReward = function () {
        var s = this;
        //积分奖励
        for (var i = 0; i < s.rewardArr.length; i++) {
            var v = s.rewardArr[i];
            if (s.point >= v.point && !s.rewStObj[v.id]) {
                return true;
            }
        }
    };
    Model_ActNianShou.getState = function ($start, $end) {
        var begin = $start.split(":");
        var end = $end.split(":");
        var nowT = Model_GlobalMsg.getServerTime();
        // const date = new Date(nowT);
        var beginDate = new Date(nowT);
        beginDate.setHours(begin[0]);
        beginDate.setMinutes(0);
        beginDate.setSeconds(0);
        var endDate = new Date(nowT);
        endDate.setHours(end[0]);
        endDate.setMinutes(0);
        endDate.setSeconds(0);
        if (nowT < endDate.getTime() && nowT > beginDate.getTime()) {
            return true;
        }
        return false;
    };
    Model_ActNianShou.openui = "openui";
    Model_ActNianShou.get_goal_reward = "get_goal_reward";
    Model_ActNianShou.get_ns_reward = "get_ns_reward";
    Model_ActNianShou.uptime_ns_rew = "uptime_ns_rew";
    Model_ActNianShou.attack = "attack"; //打年兽
    Model_ActNianShou.attack_fail = "attack_fail"; //打年兽
    Model_ActNianShou.ns_die = "ns_die"; //年兽死亡
    return Model_ActNianShou;
}(BaseModel));
__reflect(Model_ActNianShou.prototype, "Model_ActNianShou");
