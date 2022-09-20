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
var Model_WanShouZhiWang = (function (_super) {
    __extends(Model_WanShouZhiWang, _super);
    function Model_WanShouZhiWang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //活跃
        _this.huoYObj = {};
        //累冲
        _this.ljcz_data = [];
        _this.rechargeVal = 0;
        return _this;
    }
    /**8801 领取奖励 I:配置表id*/
    Model_WanShouZhiWang.prototype.CG_LIANCHONG_GETAWARD = function (id, index) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(8801, ba);
        Model_WanShouZhiWang.id = id;
        Model_WanShouZhiWang.index = index;
    };
    /**9131 领取奖励 B:任务类型I:任务id*/
    Model_WanShouZhiWang.prototype.CG_HUOYUE_GETAWARD = function (type, id) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(id);
        this.sendSocket(9131, ba);
    };
    /**9101 领取奖励 I:要领取的奖励id*/
    Model_WanShouZhiWang.prototype.CG_LEICHONG_GET = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(9101, ba);
    };
    /**10201 领取奖励 I:配置表id*/
    Model_WanShouZhiWang.prototype.CG_GETAWARD10201 = function (id, index) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(10201, ba);
        Model_WanShouZhiWang.id = id;
        Model_WanShouZhiWang.index = index;
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_WanShouZhiWang.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        wsm.regHand(8800, a.GC_LIANCHONG_OPENUI, a);
        wsm.regHand(8802, a.GC_GET_AWARD, a);
        wsm.regHand(9130, a.GC_HUOYUE_OPENUI, a);
        wsm.regHand(9132, a.GC_HUOYUE_GET, a);
        wsm.regHand(9100, a.GC_DAILYADDUP_OPENUI, a);
        wsm.regHand(9102, a.GC_DAILYADDUP_GET, a);
        //新活动-连续充值
        wsm.regHand(10200, a.GC_LIANCHONG_OPENUI, a);
        wsm.regHand(10202, a.GC_GET_AWARD, a);
    };
    /**8800 打开界面返回 [[I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]I:达到天数]奖励列表I:今日充值金额*/
    Model_WanShouZhiWang.prototype.GC_LIANCHONG_OPENUI = function (s, data) {
        Model_WanShouZhiWang.rewardArr = [];
        Model_WanShouZhiWang.days = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var arr = [];
            for (var j = 0, len1 = data.readShort(); j < len1; j++) {
                var vo = new Vo_HuoDong();
                vo.readMsgInt(data);
                arr.push(vo);
            }
            Model_WanShouZhiWang.rewardArr.push(arr);
            Model_WanShouZhiWang.days.push(data.readInt());
        }
        Model_WanShouZhiWang.topUpNum = data.readInt();
        s.checkNoticeLCHL();
        GGlobal.control.notify(UIConst.WSZW_LIANCHONGHAOLI);
    };
    /**8802 领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:配置表id*/
    Model_WanShouZhiWang.prototype.GC_GET_AWARD = function (s, data) {
        var result = data.readByte();
        var id = data.readInt();
        if (result == 1) {
            var arr = Model_WanShouZhiWang.rewardArr[Model_WanShouZhiWang.index];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == Model_WanShouZhiWang.id) {
                    arr[i].status = 2;
                    break;
                }
            }
            s.checkNoticeLCHL();
            GGlobal.control.notify(UIConst.WSZW_LIANCHONGHAOLI);
        }
        else {
            if (result == 0) {
                ViewCommonWarn.text("奖励不存在");
            }
            else if (result == 2) {
                ViewCommonWarn.text("不可领取");
            }
            else if (result == 3) {
                ViewCommonWarn.text("不可重复领取");
            }
        }
    };
    /**9130 返回界面信息 [B:任务类型I:当前数值[I:任务idB:任务状态]]任务数据*/
    Model_WanShouZhiWang.prototype.GC_HUOYUE_OPENUI = function (s, data) {
        s.huoYObj = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var type = data.readByte();
            var val = data.readInt();
            s.huoYObj[type] = [];
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var hd = new Vo_HuoDong();
                hd.readMsgInt(data);
                hd.canCt = val;
                hd.hasCt = type;
                s.huoYObj[type].push(hd);
            }
        }
        GGlobal.control.notify(UIConst.WSZW_HUOYUE);
    };
    /**9132 领取奖励结果 B:结果：0：失败，1：成功B:失败：（1：未完成任务，2：已领取），成功：任务类型I:任务id*/
    Model_WanShouZhiWang.prototype.GC_HUOYUE_GET = function (s, data) {
        var res = data.readByte();
        var type = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            var arr = s.huoYObj[type];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr[i].status = 2;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.WSZW_HUOYUE);
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    /**9100 打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表I:充值金额*/
    Model_WanShouZhiWang.prototype.GC_DAILYADDUP_OPENUI = function (self, data) {
        self.ljcz_data = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var obj = {};
            obj["id"] = data.readInt();
            obj["st"] = data.readByte();
            self.ljcz_data.push(obj);
        }
        self.rechargeVal = data.readInt();
        self.ljcz_data.sort(self.sortBySt);
        GGlobal.control.notify(UIConst.WSZW_LEICHONG);
    };
    /**9102 领取奖励结果 B:领取状态，0:没有该奖励，1:成功，2:未达到条件I:领取的奖励id*/
    Model_WanShouZhiWang.prototype.GC_DAILYADDUP_GET = function (self, data) {
        var ret = data.readByte();
        if (ret == 1) {
            var ba = self.ljcz_data;
            var id = data.readInt();
            var len = ba.length;
            for (var i = 0; i < len; i++) {
                var obj = ba[i];
                if (obj["id"] == id) {
                    obj["st"] = 2;
                    break;
                }
            }
            self.ljcz_data.sort(self.sortBySt);
            self.checkNoticeLJCZ();
            GGlobal.control.notify(UIConst.WSZW_LEICHONG);
        }
        else {
            ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到条件", "已领取"][ret]);
        }
    };
    Model_WanShouZhiWang.sortFuc = function (a, b) {
        return a.id - b.id;
    };
    Model_WanShouZhiWang.getListData = function (arr) {
        var len = arr ? arr.length : 0;
        if (arr)
            arr.sort(Model_WanShouZhiWang.sortFuc);
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        for (var i = 0; i < len; i++) {
            var $status = arr ? arr[i].status : 0;
            if ($status == 1) {
                arr1.push(arr[i]);
            }
            else if ($status == 2) {
                arr3.push(arr[i]);
            }
            else {
                arr2.push(arr[i]);
            }
        }
        return arr1.concat(arr2).concat(arr3);
    };
    /**
     * 根据期数和金额获取连充豪礼大奖表的数据
     */
    Model_WanShouZhiWang.getIlchlzs_756 = function (qishu, money) {
        var cfg;
        for (var key in Config.lchlzs_756) {
            cfg = Config.lchlzs_756[key];
            if (cfg.qs == qishu && cfg.rmb == money) {
                return cfg;
            }
        }
        return null;
    };
    /**
     * 根据期数和金额获取连充豪礼大奖表的数据
     */
    Model_WanShouZhiWang.getIIlxczzs_764 = function (qishu, money) {
        var cfg;
        for (var key in Config.lxczzs_764) {
            cfg = Config.lxczzs_764[key];
            if (cfg.qs == qishu && cfg.rmb == money) {
                return cfg;
            }
        }
        return null;
    };
    /**
     * 根据期数获取连充豪礼大奖表的数据
     */
    Model_WanShouZhiWang.getIlchlzs_756s = function (qishu) {
        var arr = [];
        for (var key in Config.lchlzs_756) {
            var cfg = Config.lchlzs_756[key];
            if (cfg.qs == qishu) {
                arr.push(cfg);
            }
        }
        return arr;
    };
    /**
     * 根据期数获取连充豪礼大奖表的数据
     */
    Model_WanShouZhiWang.getIlxczzs_764 = function (qishu) {
        var arr = [];
        for (var key in Config.lxczzs_764) {
            var cfg = Config.lxczzs_764[key];
            if (cfg.qs == qishu) {
                arr.push(cfg);
            }
        }
        return arr;
    };
    /**
     * 检查某个tab红点
     */
    Model_WanShouZhiWang.checkNoticeLCHLByTab = function (index) {
        var bol = false;
        var arr = Model_WanShouZhiWang.rewardArr[index];
        if (!arr)
            return false;
        var len = arr.length;
        var vo;
        for (var i = 0; i < len; i++) {
            vo = arr[i];
            if (vo.status == 1) {
                return true;
            }
        }
        return bol;
    };
    /**检查连冲豪礼的红点 */
    Model_WanShouZhiWang.prototype.checkNoticeLCHL = function () {
        var isNotice = false;
        if (!Model_WanShouZhiWang.rewardArr)
            return;
        var len = Model_WanShouZhiWang.rewardArr.length;
        for (var i = 0; i < len; i++) {
            if (Model_WanShouZhiWang.checkNoticeLCHLByTab(i)) {
                isNotice = true;
                break;
            }
        }
        var r = GGlobal.reddot;
        r.setCondition(UIConst.WSZW_LIANCHONGHAOLI, 0, isNotice);
        r.setCondition(UIConst.XINHD_LXCZ, 0, isNotice);
        r.notify(UIConst.ACTCOM);
    };
    Model_WanShouZhiWang.prototype.sortBySt = function (a, b) {
        var st1 = a.st == 1 ? -1 : a.st;
        var st2 = b.st == 1 ? -1 : b.st;
        if (st1 == st2) {
            return a.id < b.id ? -1 : 1;
        }
        return st1 > st2 ? 1 : -1;
    };
    /**检查累计充值红点 */
    Model_WanShouZhiWang.prototype.checkNoticeLJCZ = function () {
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
        GGlobal.reddot.setCondition(UIConst.WSZW_LEICHONG, 0, red);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    /**检查每日活跃红点 */
    Model_WanShouZhiWang.prototype.checkNoticeMRHY = function (type) {
        var red = false;
        var m = this;
        var data = GGlobal.modelWanShouZhiWang.huoYObj[type];
        if (!data || data.length <= 0)
            return red;
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var vo = data[i];
            if (vo.status == 1) {
                red = true;
                break;
            }
        }
        return red;
    };
    Model_WanShouZhiWang.rewardArr = [];
    Model_WanShouZhiWang.curDay = 0;
    Model_WanShouZhiWang.topUpNum = 0;
    Model_WanShouZhiWang.days = [];
    Model_WanShouZhiWang.id = 0;
    Model_WanShouZhiWang.index = 0;
    return Model_WanShouZhiWang;
}(BaseModel));
__reflect(Model_WanShouZhiWang.prototype, "Model_WanShouZhiWang");
