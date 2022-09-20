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
 * 幸运福签管理器
 * @author: lujiahao
 * @date: 2020-04-07 10:49:36
 */
var ModelXyfq = (function (_super) {
    __extends(ModelXyfq, _super);
    function ModelXyfq() {
        var _this = _super.call(this) || this;
        _this.countDaily = 0;
        _this.countTotal = 0;
        _this._taskVoMap = {};
        /** 我的排名 */
        _this.myRankId = 0;
        /** 我的排行抽签次数 */
        _this.myRankCount = 0;
        /** 是否播放动画 */
        _this.isPlayMc = true;
        /** 福签id列表 */
        _this.qianIdList = [
            448005,
            448004,
            448003,
            448002,
            448001,
        ];
        _this._setupFlag = false;
        _this._qianVoMap = {};
        _this._taskVoListTypeMap = {};
        _this._rankCfgListMap = {};
        return _this;
    }
    ModelXyfq.prototype.setup = function () {
        var t = this;
        if (t._setupFlag)
            return;
        t._setupFlag = true;
        {
            var t_cfg = Config.xyfqmr_508;
            for (var k in t_cfg) {
                var t_id = ~~k;
                var t_vo = new VoTaskXyfq();
                t_vo.type = 2;
                t_vo.id = t_id;
                t_vo.key = StringUtil.combinKey([t_vo.type, t_vo.id]);
                t._taskVoMap[t_vo.key] = t_vo;
            }
        }
        {
            var t_cfg = Config.xyfqhd_508;
            for (var k in t_cfg) {
                var t_id = ~~k;
                var t_vo = new VoTaskXyfq();
                t_vo.type = 1;
                t_vo.id = t_id;
                t_vo.key = StringUtil.combinKey([t_vo.type, t_vo.id]);
                t._taskVoMap[t_vo.key] = t_vo;
            }
        }
    };
    //========================================= 协议相关 ========================================
    ModelXyfq.prototype.listenServ = function (mgr) {
        _super.prototype.listenServ.call(this, mgr);
        //注册GC方法
        mgr.regHand(12150, this.GC_LuckSign_openUI_12150, this);
        mgr.regHand(12152, this.GC_LuckSign_draw_12152, this);
        mgr.regHand(12154, this.GC_LuckSign_openRankUI_12154, this);
        mgr.regHand(12156, this.GC_LuckSign_getTargetAward_12156, this);
        mgr.regHand(12158, this.GC_LuckSign_getAward_12158, this);
        mgr.regHand(12160, this.GC_LuckSign_openLuckSign_12160, this);
    };
    /**12150 [I-B]-[I-B]-I-I 打开界面返回 [I:总的目标奖励idB:状态0不可领取 1可领取 2已领取]总的目标奖励数据awardList[I:每日目标奖励idB:状态0不可领取 1可领取 2已领取]每日目标奖励数据awardList1I:总抽签次数numI:每日抽签次数dayNum*/
    ModelXyfq.prototype.GC_LuckSign_openUI_12150 = function (self, data) {
        var t_change = false;
        var t_type = 1;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readInt();
            var arg2 = data.readByte();
            var t_vo = self.getTaskVoByTypeAndId(t_type, arg1);
            if (t_vo && t_vo.update({ state: arg2 })) {
                t_change = true;
            }
        }
        t_type = 2;
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg3 = data.readInt();
            var arg4 = data.readByte();
            var t_vo = self.getTaskVoByTypeAndId(t_type, arg3);
            if (t_vo && t_vo.update({ state: arg4 })) {
                t_change = true;
            }
        }
        var arg5 = data.readInt();
        var arg6 = data.readInt();
        if (self.countTotal != arg5) {
            self.countTotal = arg5;
            t_change = true;
        }
        if (self.countDaily != arg6) {
            self.countDaily = arg6;
            t_change = true;
        }
        self.reddotCheckComp();
        self.reddotCheckOpen();
        self.reddotCheckTask();
        ReddotMgr.ins().setValue(UIConst.XYFQ + "|" + 1, 0); //灭了后端红点
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XYFQ_UPDATE);
        }
    };
    /**12151 B 抽福签 B:抽奖次数 1代表1次 2代表10次type*/
    ModelXyfq.prototype.CG_LuckSign_draw_12151 = function (pType) {
        var t = this;
        var bates = this.getBytes();
        var t_consume;
        if (pType == 1) {
            t_consume = t.consumeOne;
        }
        else {
            t_consume = t.consumeTen;
        }
        if (!FastAPI.checkItemEnough(t_consume.id, t_consume.count, true))
            return;
        bates.writeByte(pType);
        this.sendSocket(12151, bates);
    };
    /**12152 B-[B-I-I]-I-I 抽福签返回 B:状态 0成功 1元宝不足state[B:道具类型I:道具idI:道具数量]道具数据awardListI:总抽签次数numI:每日抽签次数dayNum*/
    ModelXyfq.prototype.GC_LuckSign_draw_12152 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        switch (arg1) {
            case 0://成功
                break;
            case 1://元宝不足
                return;
        }
        var t_list = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg2 = data.readByte();
            var arg3 = data.readInt(); //id
            var arg4 = data.readInt(); //数量
            t_list.push([arg3, arg4]);
        }
        var arg5 = data.readInt();
        var arg6 = data.readInt();
        if (self.countTotal != arg5) {
            self.countTotal = arg5;
            t_change = true;
        }
        if (self.countDaily != arg6) {
            self.countDaily = arg6;
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XYFQ_DRAW_SUCCESS, t_list);
            self.reddotCheckOpen();
            self.reddotCheckComp();
            self.reddotCheckTask();
        }
    };
    /**12153  打开排行 */
    ModelXyfq.prototype.CG_LuckSign_openRankUI_12153 = function () {
        var bates = this.getBytes();
        this.sendSocket(12153, bates);
    };
    /**12154 [S-U-I]-S-I 打开排行返回 [S:排名U:玩家名字I:抽福袋次数]排行数据awardListS:我的排名myRankI:我的次数myTimes*/
    ModelXyfq.prototype.GC_LuckSign_openRankUI_12154 = function (self, data) {
        var t_change = false;
        var t_rankVoList = self.getRankCfgList();
        var t_checkMap = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readShort(); //排名 从1开始
            var arg2 = data.readUTF(); //名字
            var arg3 = data.readInt(); //抽签次数
            var t_vo = t_rankVoList[arg1 - 1];
            if (t_vo) {
                //存在则修改原有数据
                t_checkMap[arg1] = true;
                if (t_vo.update({ name: arg2, count: arg3 })) {
                    t_change = true;
                }
            }
        }
        for (var _i = 0, t_rankVoList_1 = t_rankVoList; _i < t_rankVoList_1.length; _i++) {
            var v = t_rankVoList_1[_i];
            if (t_checkMap[v.rank])
                continue;
            if (v.reset())
                t_change = true;
        }
        var arg4 = data.readShort(); //我的排名
        var arg5 = data.readInt(); //我的抽签次数
        if (self.myRankId != arg4) {
            self.myRankId = arg4;
            t_change = true;
        }
        if (self.myRankCount != arg5) {
            self.myRankCount = arg5;
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XYFQ_RANK_UPDATE);
        }
    };
    /**12155 B-I 领取目标奖励 B:领取类型 1是总的目标类型 2是每日目标类型sysIdI:配置表idawardId*/
    ModelXyfq.prototype.CG_LuckSign_getTargetAward_12155 = function (pType, pId) {
        var bates = this.getBytes();
        bates.writeByte(pType);
        bates.writeInt(pId);
        this.sendSocket(12155, bates);
    };
    /**12156 B-B-I 领取目标奖励返回 B:状态 0成功 1配置表不存在 2期数不对 3不可领取 4已领取stateB:领取类型 1是总的目标类型 2是每日目标类型sysIdI:目标表idid*/
    ModelXyfq.prototype.GC_LuckSign_getTargetAward_12156 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readByte();
        var arg3 = data.readInt();
        switch (arg1) {
            case 0://成功
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
        var t_vo = self.getTaskVoByTypeAndId(arg2, arg3);
        if (t_vo && t_vo.hasGet == false) {
            t_vo.hasGet = true;
            t_change = true;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XYFQ_TASK_UPDATE, { type: arg2 });
            self.reddotCheckTask();
        }
    };
    /**12157 I-I 合成福签 I:配置表ididI:合成的数量num*/
    ModelXyfq.prototype.CG_LuckSign_getAward_12157 = function (pItemId, pCount) {
        var t = this;
        if (pCount <= 0)
            return;
        var t_vo = t.getQianVoById(pItemId);
        if (!t_vo)
            return;
        if (!t_vo.checkCanComp(true, pCount))
            return;
        var bates = this.getBytes();
        bates.writeInt(pItemId);
        bates.writeInt(pCount);
        this.sendSocket(12157, bates);
    };
    /**12158 B 合成福签返回 B:状态 0成功 1配置表不存在 2道具不足state*/
    ModelXyfq.prototype.GC_LuckSign_getAward_12158 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 0://成功
                self.reddotCheckOpen();
                self.reddotCheckComp();
                GGlobal.control.notify(Enum_MsgType.XYFQ_UPDATE);
                break;
        }
    };
    /**12159 I-I 开启福签 I:配置表idindexI:道具数量count*/
    ModelXyfq.prototype.CG_LuckSign_openLuckSign_12159 = function (arg1, pCount) {
        var t = this;
        if (pCount <= 0) {
            ViewCommonWarn.text("请选择数量");
            return;
        }
        var bates = this.getBytes();
        bates.writeInt(arg1);
        bates.writeInt(pCount);
        this.sendSocket(12159, bates);
    };
    /**12160 B-[B-I-I-B] 开启福签返回 B:状态 0成功 1道具不足 2配置表不存在state[B:道具类型I:道具idI:道具数量B:是否大奖 0不是 1是]道具数据awardList*/
    ModelXyfq.prototype.GC_LuckSign_openLuckSign_12160 = function (self, data) {
        var arg1 = data.readByte();
        switch (arg1) {
            case 0://成功
                break;
            default:
                return;
        }
        var t_list = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg2 = data.readByte();
            var arg3 = data.readInt();
            var arg4 = data.readInt();
            var arg5 = data.readByte();
            var t_item = ConfigHelp.makeItem([arg2, arg3, arg4]);
            t_item.extra = arg5 ? 5 : 0;
            t_list.push(t_item);
        }
        if (t_list.length) {
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, t_list);
        }
        self.reddotCheckComp();
        self.reddotCheckOpen();
        //更新标签数量
        GGlobal.control.notify(Enum_MsgType.XYFQ_UPDATE);
    };
    Object.defineProperty(ModelXyfq.prototype, "curQs", {
        //=========================================== API ==========================================
        /** 当前活动期数 */
        get: function () {
            var t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.XYFQ);
            if (t_actVo)
                return t_actVo.qs;
            else
                return 1;
        },
        enumerable: true,
        configurable: true
    });
    /** 获取福签数据列表 */
    ModelXyfq.prototype.getQianVoList = function () {
        var t = this;
        if (t._qianVoList === undefined) {
            t._qianVoList = [];
            for (var _i = 0, _a = t.qianIdList; _i < _a.length; _i++) {
                var id = _a[_i];
                var t_vo = new VoQianXyfq();
                t_vo.id = id;
                t._qianVoList.push(t_vo);
                t._qianVoMap[id] = t_vo;
            }
        }
        return t._qianVoList;
    };
    /** 获取合成的福签数据列表 */
    ModelXyfq.prototype.getCompQianVoList = function () {
        var t = this;
        var t_source = t.getQianVoList();
        var t_list = [];
        for (var _i = 0, t_source_1 = t_source; _i < t_source_1.length; _i++) {
            var v = t_source_1[_i];
            if (Config.xyfqhc_508[v.id]) {
                t_list.push(v);
            }
        }
        return t_list;
    };
    ModelXyfq.prototype.getQianVoById = function (pId) {
        var t = this;
        t.getQianVoList();
        return t._qianVoMap[pId];
    };
    /**
     * 通过类型获取当前期数的任务目标列表
     * @param pType 1总目标 2每日目标
     */
    ModelXyfq.prototype.getTaskVoListByType = function (pType) {
        var t = this;
        var t_qs = t.curQs;
        var t_map = t._taskVoListTypeMap[pType];
        if (t_map === undefined) {
            t._taskVoListTypeMap[pType] = t_map = {};
        }
        var t_list = t_map[t_qs];
        if (t_list === undefined) {
            t_map[t_qs] = t_list = [];
            for (var k in t._taskVoMap) {
                var t_vo = t._taskVoMap[k];
                if (t_vo && t_vo.type == pType && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    ModelXyfq.prototype.getTaskVoByTypeAndId = function (pType, pId) {
        var t = this;
        var t_key = StringUtil.combinKey([pType, pId]);
        return t._taskVoMap[t_key];
    };
    /** 获取排行榜位置vo列表 */
    ModelXyfq.prototype.getRankCfgList = function () {
        var t = this;
        var t_qs = t.curQs;
        var t_list = t._rankCfgListMap[t_qs];
        if (t_list === undefined) {
            t._rankCfgListMap[t_qs] = t_list = [];
            var t_cfg = Config.xyfqrank_508;
            for (var k in t_cfg) {
                var t_obj = t_cfg[k];
                if (t_obj.qs != t_qs)
                    continue;
                var t_rankList = JSON.parse(t_obj.rank);
                var t_min = ~~t_rankList[0][0];
                var t_max = ~~t_rankList[0][1];
                for (var i = t_min; i <= t_max; i++) {
                    var t_vo = new VoRankXyfq();
                    t_vo.id = ~~k;
                    t_vo.rank = i;
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    Object.defineProperty(ModelXyfq.prototype, "consumeOne", {
        /** 抽单次消耗 */
        get: function () {
            var t = this;
            if (t._consumeOne === undefined) {
                var t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7952));
                t._consumeOne = t_list[0];
            }
            return t._consumeOne;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelXyfq.prototype, "consumeTen", {
        /** 抽十次消耗 */
        get: function () {
            var t = this;
            if (t._consumeTen === undefined) {
                var t_list = ConfigHelp.makeItemListArr(FastAPI.getSystemValue(7953));
                t._consumeTen = t_list[0];
            }
            return t._consumeTen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelXyfq.prototype, "rankRequire", {
        /** 排行前三要求 */
        get: function () {
            var t = this;
            if (t._rankRequire === undefined) {
                t._rankRequire = ~~FastAPI.getSystemValue(7954);
            }
            return t._rankRequire;
        },
        enumerable: true,
        configurable: true
    });
    //===================================== private method =====================================
    ModelXyfq.prototype.reddotCheckComp = function () {
        var t = this;
        var t_value = 0;
        var t_list = t.getCompQianVoList();
        for (var _i = 0, t_list_1 = t_list; _i < t_list_1.length; _i++) {
            var v = t_list_1[_i];
            if (v.checkCanComp(false)) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(ReddotEnum.VALUE_XYFQ_CAN_COMP, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    ModelXyfq.prototype.reddotCheckOpen = function () {
        var t = this;
        var t_value = 0;
        var t_list = t.getQianVoList();
        for (var _i = 0, t_list_2 = t_list; _i < t_list_2.length; _i++) {
            var v = t_list_2[_i];
            if (v.checkCanOpen(false)) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(ReddotEnum.VALUE_XYFQ_CAN_OPEN, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    ModelXyfq.prototype.reddotCheckTask = function () {
        var t = this;
        {
            var t_value = 0;
            var t_list = t.getTaskVoListByType(1);
            for (var _i = 0, t_list_3 = t_list; _i < t_list_3.length; _i++) {
                var v = t_list_3[_i];
                if (v.state == 1) {
                    t_value = 1;
                    break;
                }
            }
            ReddotMgr.ins().setValue(ReddotEnum.VALUE_XYFQ_TASK_TOTAL, t_value);
        }
        {
            var t_value = 0;
            var t_list = t.getTaskVoListByType(2);
            for (var _a = 0, t_list_4 = t_list; _a < t_list_4.length; _a++) {
                var v = t_list_4[_a];
                if (v.state == 1) {
                    t_value = 1;
                    break;
                }
            }
            ReddotMgr.ins().setValue(ReddotEnum.VALUE_XYFQ_TASK_DAILY, t_value);
        }
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    return ModelXyfq;
}(BaseModel));
__reflect(ModelXyfq.prototype, "ModelXyfq");
