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
var Model_ActLeiTai = (function (_super) {
    __extends(Model_ActLeiTai, _super);
    function Model_ActLeiTai() {
        var _this = _super.call(this) || this;
        _this.leiTaiArr = null;
        //战斗
        _this.batLeiTai = null;
        _this.batPlyId = 0;
        _this.batDrop = null;
        _this.batSt = 0;
        _this.batCd = 0;
        //战报
        _this.reportArr = [];
        return _this;
    }
    // static ST_CG = "st_cg"//状态改变
    //协议处理
    Model_ActLeiTai.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(11600, this.GC_OPENUI_11600, this);
        mgr.regHand(11602, this.GC_CHALLENGE_11602, this);
        mgr.regHand(11604, this.GC_FIGHTEND_11604, this);
        mgr.regHand(11606, this.GC_ASSIST_11606, this);
        mgr.regHand(11608, this.GC_KICKOUT_11608, this);
        mgr.regHand(11610, this.GC_GETNOTICELIST_11610, this);
        mgr.regHand(11612, this.GC_BAT_ST_11612, this);
        mgr.regHand(11614, this.GC_LOSE_11614, this);
    };
    Model_ActLeiTai.prototype.hasMine = function () {
        var m = this;
        if (!m.leiTaiArr) {
            return false;
        }
        var mineId = Model_player.voMine.id;
        for (var i = 0; i < m.leiTaiArr.length; i++) {
            var v = m.leiTaiArr[i];
            for (var j = 0; j < v.plyArr.length; j++) {
                if (v.plyArr[j] && mineId == v.plyArr[j].plyId) {
                    return true;
                }
            }
        }
        return false;
    };
    /**11600 [I-[L-U-I-I-B-B]] 返回界面信息 [I:擂台id[L:玩家idU:玩家名字I:时装I:神兵B:是否擂主（1：是，0：否）B:协助位置]]擂台数据arenaData*/
    Model_ActLeiTai.prototype.GC_OPENUI_11600 = function (self, data) {
        var len = data.readShort();
        self.leiTaiArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_ActLeiTai();
            v.readMsg(data);
            self.leiTaiArr.push(v);
        }
        self.leiTaiArr.sort(function (a, b) { return a.id - b.id; });
        self.batCd = data.readInt();
        self.checkNotice();
        self.notify(Model_ActLeiTai.OPENUI);
    };
    /**11601 I-L 挑战擂主 I:擂台idarenaIdL:擂主idmasterId*/
    Model_ActLeiTai.prototype.CG_CHALLENGE_11601 = function (id, plyId) {
        if (HomeModel.inHome) {
            this.warn("请先离开府邸");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(id);
        bates.writeLong(plyId);
        this.sendSocket(11601, bates, true);
    };
    /**11602 B-I-L 请求挑战结果 B:结果：0：失败，1：成功，2：直接占领rtnCodeI:失败：（1：不能挑战自己，2：刷新界面信息，3：擂主被挑战中，4：你在被挑战），成功：擂台idarenaIdL:擂主idmasterId*/
    Model_ActLeiTai.prototype.GC_CHALLENGE_11602 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            self.batPlyId = data.readLong();
            for (var i = 0; i < self.leiTaiArr.length; i++) {
                if (self.leiTaiArr[i].id == id) {
                    self.batLeiTai = self.leiTaiArr[i];
                    break;
                }
            }
            GGlobal.mapscene.enterScene(SceneCtrl.ACTCOM_LEITAI);
        }
        else if (res == 0) {
            ViewCommonWarn.text(["不能挑战自己", "刷新界面信息", "擂主被挑战中", "你在被挑战", "不可挑战自己驻守的擂台", "挑战cd中"][id - 1]);
            if (id == 2) {
                GGlobal.modelActivity.CG_OPENACT(self.actId);
            }
        }
        else {
            //直接战领
        }
    };
    /**11603 B 战斗结束 B:战斗结果（0：失败，1：胜利）result*/
    Model_ActLeiTai.prototype.CG_FIGHTEND_11603 = function (res) {
        var bates = this.getBytes();
        bates.writeByte(res);
        this.sendSocket(11603, bates, true);
    };
    /**11604 B-[B-I-I] 战斗结果返回 B:0：失败，1：胜利 2超时result[B:道具类型I:道具idI:道具数量]奖励数据rewardData*/
    Model_ActLeiTai.prototype.GC_FIGHTEND_11604 = function (self, data) {
        self.batRes = data.readByte();
        var len = data.readShort();
        var drop = [];
        for (var i = 0; i < len; i++) {
            var arg2 = data.readByte();
            var arg3 = data.readInt();
            var arg4 = data.readInt();
            drop.push([arg2, arg3, arg4]);
        }
        self.batPlyId = 0;
        self.batDrop = ConfigHelp.makeItemListArr(drop);
        self.notify(Model_ActLeiTai.FIGHTEND);
    };
    /**11605 I-I 协助擂主 I:擂台idarenaIdI:协助位置index*/
    Model_ActLeiTai.prototype.CG_ASSIST_11605 = function (id, pos) {
        var bates = this.getBytes();
        bates.writeInt(id);
        bates.writeInt(pos);
        this.sendSocket(11605, bates, true);
    };
    /**11606 B-I-I 协助结果 B:结果：0：失败，1：成功rtnCodeI:擂台idarenaIdI:擂台位置index*/
    Model_ActLeiTai.prototype.GC_ASSIST_11606 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        var pos = data.readInt();
        if (res == 1) {
            //
            ViewCommonWarn.text("协助成功");
            // self.notify(Model_ActLeiTai.OPENUI);
        }
        else {
            ViewCommonWarn.text(["是擂主不能协助", "已在协助", "不是同服不能协助", "协助位满人", "位置已有人"][id - 1]);
        }
    };
    /**11607 I-I 踢出擂台 I:擂台idarenaIdI:协助位置index*/
    Model_ActLeiTai.prototype.CG_KICKOUT_11607 = function (id, pos) {
        var bates = this.getBytes();
        bates.writeInt(id);
        bates.writeInt(pos);
        this.sendSocket(11607, bates, true);
    };
    /**11608 B-I-I 踢出结果 B:结果：0：失败，1：成功 2：被踢出 I:失败：（1：不是擂主不能操作，2：已关闭），成功：擂台idarenaIdI:协助位置index*/
    Model_ActLeiTai.prototype.GC_KICKOUT_11608 = function (self, data) {
        var res = data.readByte();
        var id = data.readInt();
        var pos = data.readInt();
        if (res == 1) {
            for (var i = 0; i < self.leiTaiArr.length; i++) {
                var v = self.leiTaiArr[i];
                if (v.id == id) {
                    v.plyArr[pos] = null;
                    break;
                }
            }
            self.notify(Model_ActLeiTai.OPENUI);
        }
        else if (res == 0) {
            ViewCommonWarn.text(["不是擂主不能操作", "已关闭"][id - 1]);
        }
        else if (res == 2) {
            ViewCommonWarn.text("你已被请离擂台");
            var mineId = Model_player.voMine.id;
            for (var i = 0; i < self.leiTaiArr.length; i++) {
                var v = self.leiTaiArr[i];
                for (var j = 0; j < v.plyArr.length; j++) {
                    if (v.plyArr[j] && v.plyArr[j].plyId == mineId) {
                        v.plyArr[j] = null;
                        mineId = null;
                        break;
                    }
                }
                if (!mineId) {
                    break;
                }
            }
            self.notify(Model_ActLeiTai.OPENUI);
        }
    };
    /**11609  获取战报 */
    Model_ActLeiTai.prototype.CG_GETNOTICELIST_11609 = function () {
        var bates = this.getBytes();
        this.sendSocket(11609, bates, true);
    };
    /**11610 [B-U] 战报数据返回 [B:0：失败，1：胜利U:玩家名]战报数据noticeData*/
    Model_ActLeiTai.prototype.GC_GETNOTICELIST_11610 = function (self, data) {
        var len = data.readShort();
        self.reportArr = [];
        for (var i = 0; i < len; i++) {
            var arg1 = data.readByte();
            var arg2 = data.readUTF();
            self.reportArr.push({ res: arg1, name: arg2 });
        }
        self.notify(Model_ActLeiTai.REPORT);
        //红点
        var reddot = GGlobal.reddot;
        reddot.setCondition(UIConst.ACTCOM_LEITAI, 1, false);
        self.checkNotice();
    };
    Model_ActLeiTai.prototype.GC_BAT_ST_11612 = function (self, data) {
        self.batSt = data.readByte();
        // self.notify(Model_ActLeiTai.ST_CG)
        var reddot = GGlobal.reddot;
        var red = self.batSt == 1;
        reddot.setCondition(UIConst.ACTCOM_LEITAI, 0, red);
        reddot.notifyMsg(UIConst.ACTCOM_LEITAI);
    };
    Model_ActLeiTai.prototype.GC_LOSE_11614 = function (self, data) {
        GGlobal.mainUICtr.addReportBTN(UIConst.ACTCOM_LEITAI);
        //红点
        var reddot = GGlobal.reddot;
        reddot.setCondition(UIConst.ACTCOM_LEITAI, 0, true);
        reddot.setCondition(UIConst.ACTCOM_LEITAI, 1, true);
        reddot.notifyMsg(UIConst.ACTCOM_LEITAI);
    };
    Model_ActLeiTai.prototype.checkNotice = function () {
        var s = this;
        var reddot = GGlobal.reddot;
        var red = s.isOpenTime();
        reddot.setCondition(UIConst.ACTCOM_LEITAI, 0, red);
        reddot.notifyMsg(UIConst.ACTCOM_LEITAI);
    };
    Model_ActLeiTai.prototype.isOpenTime = function () {
        var s = this;
        //开启期间
        var timeArr = s.leiTaiTime;
        for (var i = 0; i < timeArr.length; i++) {
            var v = timeArr[i];
            if (Model_ActLeiTai.getState(v.start, v.end0, v.end1)) {
                return true;
            }
        }
        return false;
    };
    Model_ActLeiTai.getState = function ($start, $end0, $end1) {
        var nowT = Model_GlobalMsg.getServerTime();
        var beginDate = new Date(nowT);
        beginDate.setHours($start);
        beginDate.setMinutes(0);
        beginDate.setSeconds(0);
        var endDate = new Date(nowT);
        endDate.setHours($end0);
        endDate.setMinutes($end1);
        endDate.setSeconds(0);
        if (nowT < endDate.getTime() && nowT > beginDate.getTime()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(Model_ActLeiTai.prototype, "leiTaiTime", {
        get: function () {
            var s = this;
            if (s._leiTaiTime == null) {
                s._leiTaiTime = [];
                for (var key in Config.leitaitime_500) {
                    var v = Config.leitaitime_500[key];
                    var star = v.star.split(":");
                    var end = v.end.split(":");
                    var vt = { start: Number(star[0]), end0: Number(end[0]), end1: Number(end[1]) };
                    s._leiTaiTime.push(vt);
                }
            }
            return s._leiTaiTime;
        },
        enumerable: true,
        configurable: true
    });
    Model_ActLeiTai.OPENUI = "openui";
    Model_ActLeiTai.REPORT = "report";
    Model_ActLeiTai.FIGHTEND = "fightend";
    return Model_ActLeiTai;
}(BaseModel));
__reflect(Model_ActLeiTai.prototype, "Model_ActLeiTai");
