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
var Model_Task = (function (_super) {
    __extends(Model_Task, _super);
    function Model_Task() {
        var _this = _super.call(this) || this;
        /***当前活跃度*/
        _this.huoyuedu = 0;
        /**宝箱数据*/
        _this.boxData = [0, 0, 0, 0, 0];
        return _this;
    }
    Model_Task.prototype.initLib = function () {
        this.mappingObj = {};
        var vo;
        var obj;
        var lib = Config.meirirenwu_708;
        for (var i in lib) {
            vo = new VoTask();
            obj = lib[i];
            vo.id = obj["id"];
            vo.lib = obj;
            vo.initLib();
            this.mappingObj[vo.id] = vo;
        }
    };
    Model_Task.prototype.sort = function () {
        this.data.sort(function (a, b) {
            return a.sortIndex < b.sortIndex ? -1 : 1;
        });
    };
    Model_Task.prototype.listenServ = function (sc) {
        this.socket = sc;
        sc.regHand(1050, this.GC_DATA_1050, this);
        sc.regHand(1052, this.GC_INFO_1052, this);
        sc.regHand(1054, this.GC_AWARDS_1054, this);
        sc.regHand(1056, this.GC_BX_1056, this);
    };
    /**
     * 1050
     * I-I-B-B
     * GC I:活跃度I:任务idB:完成数B:奖励状态  更新变化
    */
    Model_Task.prototype.GC_DATA_1050 = function (s, b) {
        if (!s.mappingObj)
            s.initLib();
        s.huoyuedu = b.readInt();
        var id = b.readInt();
        var pro = b.readByte();
        var state = b.readByte();
        var vo = s.mappingObj[id];
        vo.progress = pro;
        vo.state = state;
        vo.update();
        GGlobal.control.notify(Enum_MsgType.MSG_TASK_UP, 0);
    };
    /**CG 打开每日任务ui*/
    Model_Task.prototype.CG_INFO_1051 = function () {
        this.socket.sendCMDBytes(1051, this.getBytes());
    };
    /**
     * 1052
     * I-[I-B-B]-[B-B]
     * GC 获取每日任务ui I:活跃度[I:任务idB:任务完成数B:任务奖励转态][B:宝箱奖励idB:奖励状态]
    */
    Model_Task.prototype.GC_INFO_1052 = function (s, b) {
        s.data = [];
        var d = s.data;
        if (!s.mappingObj)
            s.initLib();
        s.huoyuedu = b.readInt();
        var len = b.readShort();
        var vo;
        var id;
        for (var i = 0; i < len; i++) {
            id = b.readInt();
            vo = s.mappingObj[id]; //s.getVoById(id);
            vo.progress = b.readByte();
            vo.state = b.readByte();
            vo.update();
            d.push(vo);
        }
        len = b.readShort();
        s.boxData = [];
        for (var i = 0; i < len; i++) {
            s.boxData[b.readByte()] = b.readByte();
        }
        s.sort();
        GGlobal.control.notify(Enum_MsgType.MSG_TASK_UP);
    };
    /**
     * 1053
     * i
     * CG 获取每日任务奖励 I:任务id
    */
    Model_Task.prototype.CG_AWARDS_1053 = function (i) {
        var b = this.getBytes();
        b.writeInt(i);
        this.socket.sendCMDBytes(1053, b);
    };
    /**
     * 1054
     * B-I-B
     * GC 获取每日任务奖励 B:0成功 1失败I:任务idB:任务奖励转态
    */
    Model_Task.prototype.GC_AWARDS_1054 = function (s, b) {
        var ret = b.readByte();
        if (ret == 0) {
            var id = b.readInt();
            var vo = s.mappingObj[id]; //s.getVoById(id);
            vo.state = b.readByte();
            vo.update();
            s.sort();
            GGlobal.control.notify(Enum_MsgType.MSG_TASK_UP, 1);
        }
        else
            ViewCommonWarn.text("领取失败");
    };
    /**
     * 1055
     * B
     * 	CG 领取活跃宝箱奖励 B:宝箱id
    */
    Model_Task.prototype.CG_BX_1055 = function (i) {
        var b = this.getBytes();
        b.writeByte(i);
        this.socket.sendCMDBytes(1055, b);
    };
    /**
     * 1056
     * B-B-B
     * GC 获取活跃宝箱返回 B:0成功 1失败B:宝箱indexB:转态
    */
    Model_Task.prototype.GC_BX_1056 = function (s, b) {
        var ret = b.readByte();
        if (ret == 0) {
            var id = b.readByte();
            s.boxData[id] = b.readByte();
            GGlobal.control.notify(Enum_MsgType.MSG_TASK_UP, 2);
        }
        else
            ViewCommonWarn.text("领取失败");
    };
    return Model_Task;
}(BaseModel));
__reflect(Model_Task.prototype, "Model_Task");
