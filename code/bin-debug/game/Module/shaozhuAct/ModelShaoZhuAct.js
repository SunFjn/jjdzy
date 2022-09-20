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
var ModelShaoZhuAct = (function (_super) {
    __extends(ModelShaoZhuAct, _super);
    function ModelShaoZhuAct() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //少主七日充值。==========================
        _this.target_data = [];
        //累计充值=========================
        _this.ljcz_data = [];
        _this.rechargeVal = 0;
        //单笔 =======================
        _this.single_data = [];
        _this.single_logData = [];
        _this.single_key = 0;
        _this.zpPos = 2;
        _this._hasRun = 0;
        //红包===================
        _this.hongbao_data = [];
        _this.hongbao_log = [];
        _this.hongbaoDay = 1;
        _this.silverst = 0;
        _this.goldst = 0;
        _this.headst = 0;
        _this.yuanbaoAddGod = 0;
        _this.yuanbaoAddsilver = 0;
        _this.GodPigtask_data = [];
        _this.silverPigtask_data = [];
        _this.silverCompleteCount = 0;
        _this.goldompleteCount = 0;
        _this._maxTask = 0;
        return _this;
    }
    ModelShaoZhuAct.prototype.checkAndOpenIcon = function () {
        var bool = ModelShaoZhuAct.hasAct();
        if (bool) {
            GGlobal.mainUICtr.addIconWithListener(UIConst.SHAOZHU_ACT);
        }
        else {
            if (GGlobal.mainUICtr.getIcon(UIConst.SHAOZHU_ACT)) {
                GGlobal.mainUICtr.removeIcon(UIConst.SHAOZHU_ACT);
            }
        }
    };
    ModelShaoZhuAct.hasAct = function () {
        var datas = ModelEightLock.originalDatas;
        for (var key in datas) {
            var info = datas[key];
            if (info.sysID == UIConst.SHAOZHU_PIG || info.sysID == UIConst.SHAOZHU_HONGBAO || info.sysID == UIConst.SHAOZHU_RECHARGE || info.sysID == UIConst.SHAOZHU_SINGLE || info.sysID == UIConst.SHAOZHU_TARGET || info.sysID == UIConst.SHAOZHU_QY_RANK) {
                return info.state == 1;
            }
        }
        return false;
    };
    ModelShaoZhuAct.prototype.checkNoticeTagrget = function (type) {
        type = (type / 1000) >> 0;
        var data = this.target_data;
        var len = data.length;
        var red = false;
        for (var i = 0; i < len; i++) {
            if (data[i].st == 1) {
                red = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_TARGET, type - 1, red);
        GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
    };
    ModelShaoZhuAct.prototype.checkNoticeLJCZ = function () {
        var red = false;
        var m = this;
        var data = this.ljcz_data;
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var obj = data[i];
            if (obj["st"] == 1) {
                red = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_RECHARGE, 0, red);
        GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
    };
    ModelShaoZhuAct.prototype.checkNoticeSingle = function () {
        var m = this;
        var data = m.single_data;
        var len = data.length;
        var isNotice = false;
        for (var i = 0; i < len; i++) {
            if (data[i].st == 1) {
                isNotice = true;
                break;
            }
        }
        if (!isNotice)
            isNotice = this.single_key > 0;
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_SINGLE, 0, isNotice);
        GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
    };
    ModelShaoZhuAct.prototype.checkNoticeHongBao = function () {
        var m = this;
        var data = m.hongbao_data;
        var len = data.length;
        var isNotice = false;
        for (var i = 1; i < len; i++) {
            if (data[i].st == 1) {
                isNotice = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_HONGBAO, 0, isNotice);
        GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
    };
    Object.defineProperty(ModelShaoZhuAct.prototype, "maxTask", {
        get: function () {
            if (this._maxTask == 0) {
                var cfg = Config.pigrw_272;
                for (var i in cfg) {
                    this._maxTask++;
                }
            }
            return this._maxTask;
        },
        enumerable: true,
        configurable: true
    });
    ModelShaoZhuAct.prototype.sortBySt = function (a, b) {
        var st1 = a.st == 1 ? -1 : a.st;
        var st2 = b.st == 1 ? -1 : b.st;
        if (st1 == st2) {
            return a.id < b.id ? -1 : 1;
        }
        return st1 > st2 ? 1 : -1;
    };
    ModelShaoZhuAct.prototype.checkNoticePig = function () {
        var m = this;
        var isNotice = m.headst == 1;
        if (!isNotice && m.silverst != 0) {
            var data = m.silverPigtask_data;
            var len = data.length;
            for (var i = 0; i < len; i++) {
                if (data[i].st == 1) {
                    isNotice = true;
                    break;
                }
            }
        }
        if (!isNotice && m.goldst != 0) {
            var data = m.GodPigtask_data;
            var len = data.length;
            for (var i = 0; i < len; i++) {
                if (data[i].st == 1) {
                    isNotice = true;
                    break;
                }
            }
        }
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_PIG, 0, isNotice);
        GGlobal.reddot.notify(UIConst.SHAOZHU_ACT);
    };
    //===============↓↓↓↓↓↓↓↓↓ CMD ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    ModelShaoZhuAct.prototype.listenServ = function (s) {
        var a = this;
        this.socket = s;
        s.regHand(5412, a.GC_OPEN_5412, a);
        s.regHand(5414, a.GC_GET_5114, a);
        s.regHand(5472, a.GC_OPEN_HONGBAO, a);
        s.regHand(5474, a.GC_GET_HONGBAO, a);
        s.regHand(5592, a.GC_OPEN_LJCZ, a);
        s.regHand(5594, a.GC_GET_LJCZ, a);
        s.regHand(5492, a.GC_open_PIG, a);
        s.regHand(5494, a.GC_GETHEAD_PIG, a);
        s.regHand(5496, a.GC_GET_PIG, a);
        s.regHand(5642, a.GC_OPEN_SINGLE, a);
        s.regHand(5644, a.GC_GET_SINGLE, a);
        s.regHand(5646, a.GC_TURN_SINGLE, a);
        s.regHand(5648, a.GC_LOG_SINGLE, a);
        s.regHand(7402, a.GC_OPEN_UI, a);
    };
    ModelShaoZhuAct.prototype.CG_OPEN_TARGET = function (i) {
        var b = this.getBytes();
        b.writeInt(i);
        this.sendSocket(5411, b);
    };
    ModelShaoZhuAct.prototype.CG_GET_TAGERT = function (i) {
        var b = this.getBytes();
        b.writeInt(i);
        this.sendSocket(5413, b);
    };
    /**7401 打开界面 */
    ModelShaoZhuAct.prototype.CG_OPEN_UI = function () {
        var b = this.getBytes();
        this.sendSocket(7401, b);
    };
    /**
     * 5412 	[I-B-I]
     * 打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取I:完成度]奖励状态列表
    */
    ModelShaoZhuAct.prototype.GC_OPEN_5412 = function (s, b) {
        var data = [];
        var len = b.readShort();
        for (var i = 0; i < len; i++) {
            data.push({ "id": b.readInt(), "st": b.readByte(), "pro": b.readInt() });
        }
        s.target_data = data.sort(s.sortBySt);
        s.checkNoticeTagrget(s.target_data[0].id);
        GGlobal.control.notify(UIConst.SHAOZHU_TARGET);
    };
    /**
     * 5414 	B-I
     *领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励
    */
    ModelShaoZhuAct.prototype.GC_GET_5114 = function (s, b) {
        var ret = b.readByte();
        var id = b.readInt();
        if (ret == 1) {
            var data = s.target_data;
            var len = data.length;
            var type = 1;
            for (var i = 0; i < len; i++) {
                if (data[i].id == id) {
                    data[i].st = 2;
                    type = data[i].id;
                    break;
                }
            }
            s.target_data.sort(s.sortBySt);
            s.checkNoticeTagrget(type);
            GGlobal.control.notify(UIConst.SHAOZHU_TARGET);
        }
        else {
            ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到领取条件", "已领取"][ret]);
        }
    };
    //===============七日目标
    //===============红包
    ModelShaoZhuAct.prototype.CG_OPEN_HONGBAO = function () {
        var b = this.getBytes();
        this.sendSocket(5471, b);
    };
    ModelShaoZhuAct.prototype.CG_GET_HONGBAO = function (day) {
        var b = this.getBytes();
        b.writeByte(day);
        this.sendSocket(5473, b);
    };
    /**
     * 5472 [B-B-[B-I-I-B]][U-B-I-I]-B
     * 打开页面 [B:天数B:奖励 0未领取 1可领取 2已领取[B:道具类型I:道具idI:道具数量B:大奖 0普通奖励 1大奖]道具奖励]所有数据[U:玩家名字B:道具类型I:道具IDI:道具数量]公告列表B:当前活动天数
    */
    ModelShaoZhuAct.prototype.GC_OPEN_HONGBAO = function (m, ba) {
        m.hongbao_data = [];
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            var data = {};
            data.day = ba.readByte();
            data.st = ba.readByte();
            data.items = [];
            var len1 = ba.readShort();
            for (var j = 0; j < len1; j++) {
                data.items.push([ba.readByte(), ba.readInt(), ba.readInt(), ba.readByte()]);
            }
            m.hongbao_data[data.day] = data;
        }
        var len2 = ba.readShort();
        m.hongbao_log = [];
        for (var k = 0; k < len2; k++) {
            m.hongbao_log.push([ba.readUTF(), ba.readByte(), ba.readInt(), ba.readInt()]);
        }
        m.hongbaoDay = ba.readByte();
        m.checkNoticeHongBao();
        GGlobal.control.notify(UIConst.SHAOZHU_HONGBAO);
    };
    /**
     * 5714 B-[B-I-I-B]-B
     * 领取奖励 B:1成功 2异常 3开服天数不足 4配置表不存在 5奖励已领取 6背包已满[B:道具类型I:道具idI:道具数量B:大奖 0普通奖励 1大奖]领取物品B:天数
    */
    ModelShaoZhuAct.prototype.GC_GET_HONGBAO = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 1) {
            var temp = [];
            var name_1 = Model_player.voMine.name;
            var len = ba.readShort();
            for (var i = 0; i < len; i++) {
                temp.push([ba.readByte(), ba.readInt(), ba.readInt(), ba.readByte()]);
                if (temp[i][3] == 1) {
                    if (m.hongbao_log.length > 2) {
                        m.hongbao_log.shift();
                    }
                    m.hongbao_log.push([name_1].concat(temp[i]));
                }
            }
            var day = ba.readByte();
            var data = {};
            data.day = day;
            data.st = 2;
            data.items = temp;
            m.hongbao_data[day] = data;
            m.checkNoticeHongBao();
            GGlobal.control.notify(UIConst.SHAOZHU_HONGBAO_AWARDS, temp);
        }
        else {
            ViewCommonWarn.text(["异常", "开服天数不足", "不存在此奖励", "已领取", "背包已满"][ret]);
        }
    };
    //===============红包
    //===============累计充值
    ModelShaoZhuAct.prototype.CG_GET_LJCZ = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(5593, ba);
    };
    /**
     * 5592  [I-B]-I
     * 打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表I:充值金额
    */
    ModelShaoZhuAct.prototype.GC_OPEN_LJCZ = function (m, ba) {
        m.ljcz_data = [];
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            var obj = {};
            obj["id"] = ba.readInt();
            obj["st"] = ba.readByte();
            m.ljcz_data.push(obj);
        }
        m.rechargeVal = ba.readInt();
        m.ljcz_data.sort(m.sortBySt);
        m.checkNoticeLJCZ();
        GGlobal.control.notify(UIConst.SHAOZHU_RECHARGE);
    };
    /**
     * 5594 B-I
     * 领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id
    */
    ModelShaoZhuAct.prototype.GC_GET_LJCZ = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 1) {
            var data = m.ljcz_data;
            var id = ba.readInt();
            var len = data.length;
            for (var i = 0; i < len; i++) {
                var obj = data[i];
                if (obj["id"] == id) {
                    obj["st"] = 2;
                    break;
                }
            }
            m.ljcz_data.sort(m.sortBySt);
            m.checkNoticeLJCZ();
            GGlobal.control.notify(UIConst.SHAOZHU_RECHARGE);
        }
        else {
            ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到条件", "已领取"][ret]);
        }
    };
    //===============累计充值
    //===============居居居居老板
    ModelShaoZhuAct.prototype.CG_OPEN_PIG = function () {
        this.sendSocket(5491, this.getBytes());
    };
    ModelShaoZhuAct.prototype.CG_GETHEAD_PIG = function () {
        this.sendSocket(5493, this.getBytes());
    };
    ModelShaoZhuAct.prototype.Cg_GET_PIG = function (id, type) {
        var ba = this.getBytes();
        ba.writeInt(id);
        ba.writeByte(type);
        this.sendSocket(5495, ba);
    };
    /**5492 B-B-B-B-B-[I-B-L-I-I]
     * 打开界面返回 B:金猪状态-0:未购买,1:已购买B:银猪状态-0:未购买,1:已购买B:头像奖励状态-0:未领取,1:可领取 2已领取B:元宝增幅数值
     * [I:任务idB:任务状态（0：未完成，1:已全部完成）L:对应条件数值I:金猪当前任务idI:银猪当前任务id]任务数据
    */
    ModelShaoZhuAct.prototype.GC_open_PIG = function (m, ba) {
        m.goldst = ba.readByte();
        m.silverst = ba.readByte();
        m.headst = ba.readByte();
        m.yuanbaoAddGod = ba.readInt();
        m.yuanbaoAddsilver = ba.readInt();
        m.GodPigtask_data = [];
        m.silverPigtask_data = [];
        m.silverCompleteCount = 0;
        m.goldompleteCount = 0;
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            var id = ba.readInt();
            var st = ba.readByte();
            var count = ba.readLong();
            var gid = ba.readInt();
            var sid = ba.readInt();
            var god = {};
            god.id = (gid == 0 || gid == -1) ? id : gid;
            god.st = getRealSt(id, gid, st);
            god.count = count;
            god.type = ModelShaoZhuAct.GOLD;
            m.GodPigtask_data.push(god);
            var num = god.id % 1000;
            m.goldompleteCount += num;
            if (god.st != 2) {
                m.goldompleteCount--;
            }
            var silver = {};
            silver.id = (sid == 0 || sid == -1) ? id : sid;
            silver.st = getRealSt(id, sid, st);
            silver.count = count;
            silver.type = ModelShaoZhuAct.SILVER;
            m.silverPigtask_data.push(silver);
            num = silver.id % 1000;
            m.silverCompleteCount += num;
            if (silver.st != 2) {
                m.silverCompleteCount--;
            }
        }
        function getRealSt(baseid, id, st) {
            if (id == -1)
                return 2;
            if (baseid > id) {
                return 1;
            }
            else if (baseid == id) {
                return st;
            }
            return 2;
        }
        m.GodPigtask_data.sort(m.sortBySt);
        m.silverPigtask_data.sort(m.sortBySt);
        m.checkNoticePig();
        GGlobal.control.notify(UIConst.SHAOZHU_PIG);
    };
    /**5494 B
     * 领取头像奖励返回 B:领取状态-0:成功,1:已领取,2:未达成
    */
    ModelShaoZhuAct.prototype.GC_GETHEAD_PIG = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 0)
            m.headst = 2;
        ViewCommonWarn.text(["领取成功", "已领取", "未达到条件"][ret]);
        GGlobal.control.notify(UIConst.SHAOZHU_PIG);
    };
    /**5496 B-B-I-B-S
     * 领取元宝增幅返回 B:领取状态-0:成功,1:已领取,2:未达成B:任务类型：1金猪2银猪I:领取idB:下一个任务的状态
    */
    ModelShaoZhuAct.prototype.GC_GET_PIG = function (m, ba) {
        var ret = ba.readByte();
        var type = ba.readByte();
        var id = ba.readInt();
        var st = ba.readByte();
        var add = ba.readInt();
        if (ret == 0) {
            var data = void 0;
            if (type == ModelShaoZhuAct.GOLD) {
                data = m.GodPigtask_data;
                m.yuanbaoAddGod = add;
                m.goldompleteCount++;
            }
            else {
                data = m.silverPigtask_data;
                m.yuanbaoAddsilver = add;
                m.silverCompleteCount++;
            }
            var cfg = Config.pigrw_272;
            var len = data.length;
            for (var i = 0; i < len; i++) {
                var obj = data[i];
                if (obj["id"] == id) {
                    var nextTask = cfg[id + 1];
                    if (nextTask) {
                        obj["id"] = id + 1; //判断下一个任务是否存在， 存在就覆盖
                        obj["st"] = nextTask.cs > obj["count"] ? 0 : 1;
                    }
                    else {
                        obj["st"] = 2;
                    }
                    break;
                }
            }
            m.checkNoticePig();
            m.GodPigtask_data.sort(m.sortBySt);
            m.silverPigtask_data.sort(m.sortBySt);
            GGlobal.control.notify(UIConst.SHAOZHU_PIG);
        }
        else {
            ViewCommonWarn.text(["领取成功", "已领取", "未达到条件"][ret]);
        }
    };
    /**金猪======================================*/
    /**单笔充值======================================*/
    ModelShaoZhuAct.prototype.CG_GET_SINGLE = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(5643, ba);
    };
    ModelShaoZhuAct.prototype.CG_TURN_SINGLE = function () {
        var ba = this.getBytes();
        this.sendSocket(5645, ba);
        GGlobal.modelShaoZhuAct._hasRun = 1;
    };
    ModelShaoZhuAct.prototype.CG_LOG_SINGLE = function () {
        var ba = this.getBytes();
        this.sendSocket(5647, ba);
    };
    /**5642   [I-B-I-I]-I
     *打开界面返回 [I:索引idB:奖励状态，0:未达到，1:可领取，2:已领完I:背包中该钥匙数量I:玩家累计获得该钥匙数量]钥匙列表I:背包中钥匙总数
    */
    ModelShaoZhuAct.prototype.GC_OPEN_SINGLE = function (m, ba) {
        m.single_data = [];
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            var opt = {};
            opt.id = ba.readInt();
            opt.st = ba.readByte();
            opt.count = ba.readInt();
            opt.maxCount = ba.readInt();
            m.single_data.push(opt);
        }
        m.single_key = ba.readInt();
        m.single_data.sort(m.sortBySt);
        m.checkNoticeSingle();
        GGlobal.control.notify(UIConst.SHAOZHU_SINGLE);
    };
    /**5644   B-I-I-B
     *领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领完I:领取的奖励idI:背包中该钥匙数量B:对应的奖励是否可领取，0:不可领，2:可领
    */
    ModelShaoZhuAct.prototype.GC_GET_SINGLE = function (m, ba) {
        var data = m.single_data;
        var len = data.length;
        var ret = ba.readByte();
        var id = ba.readInt();
        var count = ba.readInt();
        var st = ba.readByte();
        if (ret == 1) {
            m.single_key++;
            for (var i = 0; i < len; i++) {
                var opt = data[i];
                if (opt.id == id) {
                    opt.st = st;
                    opt.count = count;
                    opt.maxCount++;
                    break;
                }
            }
            m.single_data.sort(m.sortBySt);
            m.checkNoticeSingle();
            GGlobal.control.notify(UIConst.SHAOZHU_SINGLE);
        }
        ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到条件", "已领取"][ret]);
    };
    /**5646  B-I-I-I-I
     *转盘返回 B:状态，1：成功，2：钥匙不足I:抽奖抽到的倍数I:剩余钥匙总数量I:消耗的对应索引idI:背包中该钥匙数量
    */
    ModelShaoZhuAct.prototype.GC_TURN_SINGLE = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 2)
            ViewCommonWarn.text("钥匙不足");
        var cfgid = ba.readInt();
        m.single_key = ba.readInt();
        var id = ba.readInt();
        var count = ba.readInt();
        m.zpPos = cfgid;
        var obj = {};
        obj.cfgid = cfgid;
        obj.ret = ret;
        obj.id = id;
        var data = m.single_data;
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var opt = data[i];
            if (opt.id == id) {
                opt.count = count;
                break;
            }
        }
        GGlobal.control.notify(Enum_MsgType.SHAOZHU_SINGLE_TURN, obj);
    };
    /**5648  [I-I]
     *打开记录界面返回 [I:消耗奖励索引idI:倍数]记录列表
    */
    ModelShaoZhuAct.prototype.GC_LOG_SINGLE = function (m, ba) {
        var data = [];
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            data.push([ba.readInt(), ba.readInt()]);
        }
        m.single_logData = data;
        GGlobal.control.notify(UIConst.SHAOZHU_SINGLE_LOG);
    };
    /**7402 打开界面返回 [U:名字I:祈愿]排行I:第一名职业时装（job*1000+时装id），没有则为0[I:头像id，没有则为0I:头像框I:国家I:vip等级]第二，第三名头像id，头像框，国家，vip等级I:我的祈愿I:我的排名I:结束时间*/
    ModelShaoZhuAct.prototype.GC_OPEN_UI = function (m, ba) {
        ModelShaoZhuAct.rankData = [];
        ModelShaoZhuAct.headData = [];
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            var rank = new QiYuanRankVO();
            rank.readMsg(ba);
            if (rank.jdCount >= Config.xtcs_004[6203].num) {
                ModelShaoZhuAct.rankData.push(rank);
            }
        }
        ModelShaoZhuAct.modId = ba.readInt();
        len = ba.readShort();
        for (var j = 0; j < len; j++) {
            var headVO = new QiYuanHeadVO();
            headVO.readMsg(ba);
            var rank = ModelShaoZhuAct.rankData[j + 1];
            if (rank && rank.jdCount >= Config.xtcs_004[6203].num) {
                ModelShaoZhuAct.headData.push(headVO);
            }
        }
        ModelShaoZhuAct.myjdCount = ba.readInt();
        ModelShaoZhuAct.myRank = ba.readInt();
        ModelShaoZhuAct.endTime = ba.readInt();
        GGlobal.control.notify(UIConst.SHAOZHU_QY_RANK);
    };
    //jujujuju=======================
    ModelShaoZhuAct.GOLD = 1;
    ModelShaoZhuAct.SILVER = 2;
    ModelShaoZhuAct.rankData = [];
    ModelShaoZhuAct.modId = 0;
    ModelShaoZhuAct.myjdCount = 0;
    ModelShaoZhuAct.myRank = 0;
    ModelShaoZhuAct.endTime = 0;
    ModelShaoZhuAct.headData = [];
    return ModelShaoZhuAct;
}(BaseModel));
__reflect(ModelShaoZhuAct.prototype, "ModelShaoZhuAct");
