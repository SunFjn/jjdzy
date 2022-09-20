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
var ModelEightLock = (function (_super) {
    __extends(ModelEightLock, _super);
    function ModelEightLock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eightLockTaskDic = {};
        _this.eightLockBigRewDic = {};
        _this.fuwenColDic = {};
        _this.fuwenJDDic = {};
        return _this;
    }
    ModelEightLock.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(4522, this.GC4522, this);
        wsm.regHand(4524, this.GC4524, this);
        wsm.regHand(4526, this.GC4526, this);
        wsm.regHand(4528, this.GC4528, this);
        wsm.regHand(4530, this.GC4530, this);
        wsm.regHand(4532, this.GC4532, this);
        wsm.regHand(4520, this.GC4520, this);
        wsm.regHand(4590, this.GC4590, this);
        wsm.regHand(4592, this.GC4592, this);
        wsm.regHand(4610, this.GC4610, this);
        wsm.regHand(4612, this.GC4612, this);
        wsm.regHand(4570, this.GC4570, this);
        wsm.regHand(4572, this.GC4572, this);
        wsm.regHand(7302, this.GC7302, this);
    };
    ModelEightLock.prototype.getDatas = function () {
        if (!this._datas) {
            this._datas = [];
            var lib = Config.bmjs_262;
            for (var key in lib) {
                this._datas.push(lib[key]);
            }
        }
        return this._datas;
    };
    /**八阵图系统为等级以及开服天数共同控制开启
    ** 开服第8天开启,持续7天(配置系统开启表)
    */
    ModelEightLock.prototype.checkAndOpenIcon = function () {
        var bool = ModelEightLock.hasActInEightLock();
        if (bool) {
            GGlobal.mainUICtr.addIconWithListener(UIConst.EIGHTLOCK);
            if (GGlobal.mainUICtr.getIcon(UIConst.EIGHTLOCK)) {
                GGlobal.mainUICtr.setIconNotice(UIConst.EIGHTLOCK, this.checkAllNoti());
            }
        }
        else {
            if (GGlobal.mainUICtr.getIcon(UIConst.EIGHTLOCK)) {
                GGlobal.mainUICtr.removeIcon(UIConst.EIGHTLOCK);
            }
        }
    };
    ModelEightLock.prototype.getNotice = function (sysID) {
        return GGlobal.reddot.checkCondition(sysID, 0);
    };
    ModelEightLock.prototype.getEightNot = function () {
        var lib = Config.bmjs_262;
        for (var key in lib) {
            var state = this.getState(lib[key].id);
            if (state == 1) {
                return true;
            }
        }
        return false;
    };
    /**通过八门id获取状态 */
    ModelEightLock.prototype.getState = function (id) {
        var preId = id - 1;
        var preCfg = Config.bmjs_262[preId];
        if (this.eightLockBigRewDic[id] && this.eightLockBigRewDic[id].state == 2 && this.allTaskGot(id)) {
            return 0;
        }
        else {
            var bool1 = this.eightLockBigRewDic[id] && this.eightLockBigRewDic[id].state == 1;
            var bool2 = false;
            for (var key in this.eightLockTaskDic) {
                if (Config.bmjsrw_262[key].door == id && this.eightLockTaskDic[key].state == 1) {
                    bool2 = true;
                    break;
                }
            }
            if ((bool1 || bool2) && (!preCfg || (preCfg && this.eightLockBigRewDic[preCfg.id] && this.eightLockBigRewDic[preCfg.id].state == 2))) {
                return 1;
            }
            else {
                if (!preCfg || (preCfg && this.eightLockBigRewDic[preCfg.id] && this.eightLockBigRewDic[preCfg.id].state == 2)) {
                    return 2;
                }
                else {
                    return 3;
                }
            }
        }
    };
    /**所有任务奖励的领取状态 */
    ModelEightLock.prototype.allTaskGot = function (door) {
        var valid = 1;
        for (var key in this.eightLockTaskDic) {
            if (door == Config.bmjsrw_262[key].door) {
                valid &= (this.eightLockTaskDic[key].state == 2 ? 1 : 0);
            }
        }
        return !!valid;
    };
    /**通过任务状态获取状态 */
    ModelEightLock.prototype.getTaskState = function (id) {
        return this.eightLockTaskDic[id] && this.eightLockTaskDic[id].state;
    };
    /**通过八门id获取总任务进度 */
    ModelEightLock.prototype.getTotalTaskProg = function (id) {
        var lib = Config.bmjsrw_262;
        var count = 0;
        for (var key in lib) {
            if (lib[key].door == id) {
                count++;
            }
        }
        var count2 = 0;
        for (var key in this.eightLockTaskDic) {
            if (Config.bmjsrw_262[key].door == id && this.eightLockTaskDic[key].state != 0) {
                count2++;
            }
        }
        return { cur: count2, max: count };
    };
    /**通过任务id获取该任务进度 */
    ModelEightLock.prototype.getTaskProg = function (id) {
        var num = this.eightLockTaskDic[id] ? this.eightLockTaskDic[id].cur : 0;
        return { cur: num, max: Config.bmjsrw_262[id].cs };
    };
    ModelEightLock.prototype.getFWColDatas = function () {
        if (!this._fwColDatas) {
            this._fwColDatas = [];
            var lib = Config.fwsj_263;
            for (var key in lib) {
                this._fwColDatas.push(lib[key]);
            }
        }
        return this._fwColDatas;
    };
    ModelEightLock.prototype.getFWJDDatas = function () {
        if (!this._fwDJDatas) {
            this._fwDJDatas = [];
            var lib = Config.fwjd_264;
            for (var key in lib) {
                this._fwDJDatas.push(lib[key]);
            }
        }
        return this._fwDJDatas;
    };
    ModelEightLock.prototype.getFWYLDatas = function () {
        if (!this._fwYLDatas) {
            this._fwYLDatas = [];
            var lib = Config.fwreward_265;
            for (var key in lib) {
                this._fwYLDatas.push(lib[key]);
            }
        }
        return this._fwYLDatas;
    };
    ModelEightLock.prototype.checkAllNoti = function () {
        var bool1 = GGlobal.reddot.checkCondition(UIConst.EIGHTLOCK, 0);
        var bool2 = GGlobal.reddot.checkCondition(UIConst.FUWENCOLLECT, 0);
        var bool3 = GGlobal.reddot.checkCondition(UIConst.FUWENJIANDING, 0);
        var bool4 = GGlobal.reddot.checkCondition(UIConst.FUWENYOULI, 0);
        var bool5 = GGlobal.reddot.checkCondition(UIConst.AUTHEN_RANK, 0);
        return bool1 || bool2 || bool3 || bool4 || bool5;
    };
    /**打开八门金锁 */
    ModelEightLock.prototype.CG4521 = function () { this.sendSocket(4521, this.getBytes()); };
    ModelEightLock.prototype.GC4522 = function (self, bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readInt();
            self.eightLockTaskDic[id] = { id: id, cur: bytes.readInt(), state: bytes.readByte() };
        }
        len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readInt();
            self.eightLockBigRewDic[id] = { id: id, state: bytes.readByte() };
        }
        ModelEightLock.chongZhiValue = bytes.readInt(); //充值金额
        var not = self.getEightNot();
        GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
        self.checkAndOpenIcon();
        self.notify(ModelEightLock.msg_datas);
    };
    /**领取任务 */
    ModelEightLock.prototype.CG4523 = function (id) {
        var bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4523, bytes);
    };
    ModelEightLock.prototype.GC4524 = function (self, bytes) {
        //4524 GC 领取任务奖励 I:任务idB:领取结果0成功 1失败 
        var taskId = bytes.readInt();
        var result = bytes.readByte();
        if (result == 0) {
            self.eightLockTaskDic[taskId].state = 2;
            var not = self.getEightNot();
            GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
            self.checkAndOpenIcon();
            self.notify(ModelEightLock.msg_datas);
        }
        else {
            ViewCommonWarn.text("领取条件不足!");
        }
    };
    /**领取大奖 */
    ModelEightLock.prototype.CG4525 = function (id) {
        var bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4525, bytes);
    };
    ModelEightLock.prototype.GC4526 = function (self, bytes) {
        //4526 GC 获取大奖结果 I:目标idB:领取结果0成功 1失败 
        var taskId = bytes.readInt();
        var result = bytes.readByte();
        if (result == 0) {
            self.eightLockBigRewDic[taskId].state = 2;
            var not = self.getEightNot();
            GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
            self.checkAndOpenIcon();
            self.notify(ModelEightLock.msg_datas);
        }
        else {
            ViewCommonWarn.text("条件未达");
        }
    };
    /**小任务更新 */
    ModelEightLock.prototype.GC4528 = function (self, bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readInt();
            self.eightLockTaskDic[id] = { id: id, cur: bytes.readInt(), state: bytes.readByte() };
        }
        var not = self.getEightNot();
        GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
        self.checkAndOpenIcon();
        self.notify(ModelEightLock.msg_datas);
    };
    /**大奖变化 */
    ModelEightLock.prototype.GC4530 = function (self, bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readInt();
            self.eightLockBigRewDic[id] = { id: id, state: bytes.readByte() };
        }
        var not = self.getEightNot();
        GGlobal.reddot.setCondition(UIConst.EIGHTLOCK, 0, not);
        self.checkAndOpenIcon();
        self.notify(ModelEightLock.msg_datas);
    };
    ModelEightLock.prototype.GC4532 = function (self, bytes) {
        ModelEightLock.chongZhiValue = bytes.readInt();
        self.notify(ModelEightLock.msg_datas);
    };
    ModelEightLock.prototype.GC4520 = function (self, bytes) {
        //4520	I-B-I-I-IGC 活动情况 I:系统idB:状态0开启中1结束I:期数I:开始时间I:结束时间
        var sysID = bytes.readInt();
        var state = bytes.readByte();
        var qishu = bytes.readInt();
        var start = bytes.readInt();
        var end = bytes.readInt();
        ModelEightLock.originalDatas[sysID] = { sysID: sysID, state: state, qishu: qishu, start: start, end: end };
        self.checkAndOpenIcon();
        GGlobal.control.listen(Enum_MsgType.REDDOT_NOTICE, self.checkAndOpenIcon, self); //红点比这个迟!
    };
    ModelEightLock.hasActInEightLock = function () {
        var datas = this.originalDatas;
        for (var key in datas) {
            var info = datas[key];
            if (info.sysID == UIConst.EIGHTLOCK || info.sysID == UIConst.FUWENCOLLECT || info.sysID == UIConst.FUWENJIANDING || info.sysID == UIConst.FUWENYOULI || info.sysID == UIConst.AUTHEN_RANK) {
                return info.state == 0;
            }
        }
        return false;
    };
    /**是否有每日直购（8-28）活动 */
    ModelEightLock.hasActInZhiGou = function () {
        var datas = this.originalDatas;
        for (var key in datas) {
            var info = datas[key];
            if (info.sysID == UIConst.ZHI_GOU828) {
                return true;
            }
        }
        return false;
    };
    //符文收集
    ModelEightLock.prototype.GC4590 = function (self, bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            self.fuwenColDic[bytes.readInt()] = bytes.readInt(); //1可领 2已领取
        }
        for (var i = 0, len2 = bytes.readShort(); i < len2; i++) {
            ModelEightLock.pinZhiDic[bytes.readInt()] = bytes.readInt();
        }
        GGlobal.reddot.setCondition(UIConst.FUWENCOLLECT, 0, self.noticeFWSJ());
        self.notify(ModelEightLock.msg_fwCol);
    };
    //符文收集-领取奖励
    ModelEightLock.prototype.CG4591 = function (id) {
        var bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4591, bytes);
    };
    ModelEightLock.prototype.GC4592 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            self.fuwenColDic[bytes.readInt()] = 2;
            GGlobal.reddot.setCondition(UIConst.FUWENCOLLECT, 0, self.noticeFWSJ());
            self.notify(ModelEightLock.msg_fwCol);
        }
        else {
            ViewCommonWarn.text("条件未达!");
        }
    };
    /**符文鉴定 */
    ModelEightLock.prototype.GC4610 = function (self, bytes) {
        ModelEightLock.hasJianDing = bytes.readInt();
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            self.fuwenJDDic[bytes.readInt()] = 2;
        }
        GGlobal.reddot.setCondition(UIConst.FUWENJIANDING, 0, self.noticeFWJD());
        self.notify(ModelEightLock.msg_fwJD);
    };
    /**符文鉴定-领取奖励 */
    ModelEightLock.prototype.CG4611 = function (id) {
        var bytes = this.getBytes();
        bytes.writeInt(id);
        this.sendSocket(4611, bytes);
    };
    ModelEightLock.prototype.GC4612 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            self.fuwenJDDic[bytes.readInt()] = 2;
            GGlobal.reddot.setCondition(UIConst.FUWENJIANDING, 0, self.noticeFWJD());
            self.notify(ModelEightLock.msg_fwJD);
        }
        else {
            ViewCommonWarn.text("条件未达!");
        }
    };
    ModelEightLock.prototype.getFWDJState = function (data) {
        var state = GGlobal.modelEightLock.fuwenJDDic[data.id];
        if (state > 1) {
            return state;
        }
        else {
            return ModelEightLock.hasJianDing >= data.time ? 1 : 0;
        }
    };
    /** */
    ModelEightLock.prototype.GC4570 = function (self, bytes) {
        var len = bytes.readShort();
        var servTime = Model_GlobalMsg.getServerTime() / 1000;
        for (var i = 0; i < len; i++) {
            var type = bytes.readInt(); //type 没用 留坑给扩展填
            var sysID = bytes.readInt();
            var qishu = bytes.readInt();
            var start = bytes.readInt();
            var end = bytes.readInt();
            var state = servTime > start && servTime < end ? 1 : 0;
            if (state == 1) {
                ModelEightLock.originalDatas[sysID] = { sysID: sysID, state: state, qishu: qishu, start: start, end: end, type: type };
            }
            else {
                if (ModelEightLock.originalDatas[sysID]) {
                    delete ModelEightLock.originalDatas[sysID];
                }
            }
            ModelEightLock.checkAndOpenAct(type, state);
        }
        // Model_Activity.checkAndOpenAct();
        // GGlobal.modelShaoZhuAct.checkAndOpenIcon();
        GGlobal.control.notify(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM);
    };
    //更新活动状态 B:更新类型：0：结束，1：开启I:分类表唯一idI:系统idI:期数I:开始时间I:结束时间
    ModelEightLock.prototype.GC4572 = function (self, bytes) {
        var state = bytes.readByte();
        var type = bytes.readInt(); //type 没用 留坑给扩展填
        var sysID = bytes.readInt();
        var qishu = bytes.readInt();
        var start = bytes.readInt();
        var end = bytes.readInt();
        if (state == 1) {
            ModelEightLock.originalDatas[sysID] = { sysID: sysID, state: state, qishu: qishu, start: start, end: end, type: type };
        }
        else {
            if (ModelEightLock.originalDatas[sysID]) {
                delete ModelEightLock.originalDatas[sysID];
            }
        }
        ModelEightLock.checkAndOpenAct(type, state);
        // Model_Activity.checkAndOpenAct();
        // GGlobal.modelShaoZhuAct.checkAndOpenIcon();
        GGlobal.control.notify(Enum_MsgType.SEND_OPEN_DAYS_SYSTEM);
    };
    /**打开界面返回 [U:名字I:鉴定次数]排行I:第一名职业时装（job*1000+时装id），没有则为0[I:头像id，没有则为0I:头像框I:国家I:vip等级]第二，第三名头像id，国家，vip等级I:我的鉴定次数I:我的排名I:结束时间*/
    ModelEightLock.prototype.GC7302 = function (self, bytes) {
        ModelEightLock.rankData = [];
        ModelEightLock.headData = [];
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var rank = new AuthenRankVO();
            rank.readMsg(bytes);
            if (rank.jdCount >= Config.xtcs_004[6801].num) {
                ModelEightLock.rankData.push(rank);
            }
        }
        ModelEightLock.modId = bytes.readInt();
        len = bytes.readShort();
        for (var j = 0; j < len; j++) {
            var headVO = new AuthenHeadVO();
            headVO.readMsg(bytes);
            var rank = ModelEightLock.rankData[j + 1];
            if (rank && rank.jdCount >= Config.xtcs_004[6801].num) {
                ModelEightLock.headData.push(headVO);
            }
        }
        ModelEightLock.myjdCount = bytes.readInt();
        ModelEightLock.myRank = bytes.readInt();
        ModelEightLock.endTime = bytes.readInt();
        var not = self.getAuthenNot();
        GGlobal.reddot.setCondition(UIConst.AUTHEN_RANK, 0, not);
        self.notify(ModelEightLock.msg_jdpm);
    };
    /**判断鉴定排行的红点 */
    ModelEightLock.prototype.getAuthenNot = function () {
        var end = ModelEightLock.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (Model_Bag.getItemCount(410046) > 0 && timeRemain > 0) {
            return true;
        }
        return false;
    };
    ModelEightLock.getActivity = function (uiId) {
        var arr = [];
        for (var keys in ModelEightLock.originalDatas) {
            var v = ModelEightLock.originalDatas[keys];
            var cfg = Config.hdfl_012[v.type];
            if (cfg && cfg.type == uiId) {
                var act = new Vo_Activity();
                act.end = v.end;
                act.start = v.start;
                act.id = v.sysID;
                act.groupId = cfg.type;
                act.qs = v.qishu;
                act.sortNum = ~~cfg["px"];
                act.icon = v.sysID + "";
                arr.push(act);
            }
        }
        return arr;
    };
    ModelEightLock.getActVo = function (id) {
        for (var keys in ModelEightLock.originalDatas) {
            var v = ModelEightLock.originalDatas[keys];
            if (v.sysID != id)
                continue;
            var cfg = Config.hdfl_012[v.type];
            if (cfg) {
                var act = new Vo_Activity();
                act.end = v.end;
                act.start = v.start;
                act.id = v.sysID;
                act.groupId = cfg.type;
                act.qs = v.qishu;
                act.sortNum = ~~cfg["px"];
                return act;
            }
        }
        return null;
    };
    /**打开各系统 */
    ModelEightLock.prototype.CG4571 = function (sysID) {
        var bytes = this.getBytes();
        bytes.writeInt(sysID);
        this.sendSocket(4571, bytes);
    };
    /**7301 打开界面 */
    ModelEightLock.prototype.CG_OPEN_UI = function () {
        var bytes = this.getBytes();
        this.sendSocket(7301, bytes);
    };
    /**符文收集红点 */
    ModelEightLock.prototype.noticeFWSJ = function () {
        var bool = false;
        for (var key in Config.fwsj_263) {
            var state = GGlobal.modelEightLock.fuwenColDic[key];
            if (state == 1) {
                bool = true;
                break;
            }
        }
        return bool;
    };
    /**符文鉴定红点 */
    ModelEightLock.prototype.noticeFWJD = function () {
        var bool = false;
        for (var key in Config.fwjd_264) {
            var state = this.getFWDJState(Config.fwjd_264[key]);
            if (state == 1) {
                bool = true;
                break;
            }
        }
        return bool;
    };
    /**图标为等级以及开服天数共同控制开启
    ** 开服第8天开启,持续7天(配置系统开启表)
    */
    ModelEightLock.checkAndOpenAct = function (type, bool) {
        var cfg = Config.hdfl_012[type];
        if (!cfg)
            return;
        var bigActID = cfg.type; //大活动图标id
        var redDot = GGlobal.reddot.checkCondition(bigActID, 0);
        if (bool == 1) {
            GGlobal.mainUICtr.addIconWithListener(bigActID);
            GGlobal.mainUICtr.setIconNotice(bigActID, redDot);
        }
        else {
            var actArr = ModelEightLock.getActivity(bigActID);
            if (actArr.length <= 0 && GGlobal.mainUICtr.getIcon(bigActID)) {
                GGlobal.mainUICtr.removeIcon(bigActID);
            }
        }
    };
    ModelEightLock.msg_datas = "msg_datas";
    ModelEightLock.msg_fwCol = "msg_fwCol";
    ModelEightLock.msg_fwJD = "msg_fwJD";
    ModelEightLock.msg_jdpm = "msg_jdpm";
    ModelEightLock.originalDatas = {};
    /** */
    ModelEightLock.pinZhiDic = {};
    ModelEightLock.hasJianDing = 0;
    ModelEightLock.rankData = [];
    ModelEightLock.modId = 0;
    ModelEightLock.myjdCount = 0;
    ModelEightLock.myRank = 0;
    ModelEightLock.endTime = 0;
    ModelEightLock.headData = [];
    return ModelEightLock;
}(BaseModel));
__reflect(ModelEightLock.prototype, "ModelEightLock");
