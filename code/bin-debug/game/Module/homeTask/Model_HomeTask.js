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
var Model_HomeTask = (function (_super) {
    __extends(Model_HomeTask, _super);
    function Model_HomeTask() {
        var _this = _super.call(this) || this;
        /**任务数据*/
        _this.data = [];
        /**宝箱数据*/
        _this.boxData = [0, 0, 0, 0, 0];
        //============================================================
        /**任务数据*/
        _this._dGoal = null;
        _this.progreGoal = {};
        return _this;
    }
    //CG打开府邸日常任务界面
    Model_HomeTask.prototype.CG_OPEN_DAYTASK_11407 = function () {
        var bates = this.getBytes();
        this.sendSocket(11407, bates);
    };
    //获取任务奖励 I: 任务索引
    Model_HomeTask.prototype.CG_GET_TASK_REWARD_11409 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11409, bates);
    };
    //获取宝箱奖励I:宝箱索引
    Model_HomeTask.prototype.CG_GET_BOX_REWARD_11411 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11411, bates);
    };
    //CG打开府邸目标
    Model_HomeTask.prototype.CG_OPEN_GOAL_11413 = function () {
        var bates = this.getBytes();
        this.sendSocket(11413, bates);
    };
    //CG获取目标奖励 I:目标序号
    Model_HomeTask.prototype.CG_GET_GOAL_REWARD_11415 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11415, bates);
    };
    //协议处理
    Model_HomeTask.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(11408, this.GC_OPEN_DAYTASK_11408, this);
        mgr.regHand(11410, this.GC_GET_TASK_REWARD_11410, this);
        mgr.regHand(11412, this.GC_GET_BOX_REWARD_11412, this);
        //目标
        mgr.regHand(11414, this.GC_OPEN_GOAL_11414, this);
        mgr.regHand(11416, this.GC_GET_GOAL_REWARD_11416, this);
        mgr.regHand(11418, this.GC_GOAL_CHANG_11418, this);
    };
    Model_HomeTask.prototype.initLib = function () {
        this.mappingObj = {};
        var lib = Config.fdrc_019;
        for (var i in lib) {
            var vo = new Vo_HomeTask();
            vo.initLib(lib[i]);
            this.mappingObj[vo.id] = vo;
        }
    };
    // public sortTask() {
    // 	this.data.sort(function (a, b) {
    // 		return a.sortIndex < b.sortIndex ? -1 : 1;
    // 	});
    // }
    /**
     * GC 打开府邸日常任务返回 [I:任务idI:奖励完成状态0 1 2][I:宝箱索引I:奖励完成状态0 1 2]
    */
    Model_HomeTask.prototype.GC_OPEN_DAYTASK_11408 = function (s, b) {
        s.data = [];
        if (!s.mappingObj)
            s.initLib();
        var len = b.readShort();
        var vo;
        var id;
        for (var i = 0; i < len; i++) {
            id = b.readInt();
            vo = s.mappingObj[id]; //s.getVoById(id);
            if (vo) {
                vo.state = b.readInt();
                vo.update();
                s.data.push(vo);
            }
        }
        len = b.readShort();
        s.boxData = [];
        for (var i = 0; i < len; i++) {
            s.boxData[b.readInt()] = b.readInt();
        }
        s.sortTask(s.data);
        s.checkNotice();
        s.notify(Model_HomeTask.OPEN_TASK);
    };
    /**
     * 日常任务奖励状态变化 I:任务索引I: 奖励状态
    */
    Model_HomeTask.prototype.GC_GET_TASK_REWARD_11410 = function (s, b) {
        var id = b.readInt();
        if (!s.mappingObj)
            s.initLib();
        var vo = s.mappingObj[id]; //s.getVoById(id);
        vo.state = b.readInt();
        vo.update();
        s.sortTask(s.data);
        s.checkNotice();
        s.notify(Model_HomeTask.OPEN_TASK);
    };
    /**
     *GC每日宝箱奖励变化 I:宝箱索引I: 奖励状态
    */
    Model_HomeTask.prototype.GC_GET_BOX_REWARD_11412 = function (s, b) {
        var id = b.readInt();
        s.boxData[id] = b.readInt();
        s.checkNotice();
        s.notify(Model_HomeTask.UP_TASK);
        s.notify(Model_HomeTask.OPEN_TASK);
    };
    Model_HomeTask.prototype.checkNotice = function () {
        var s = this;
        var red = s.getTaskRed();
        var red1 = s.getGoalRed();
        var reddot = GGlobal.reddot;
        reddot.setCondition(UIConst.HOME_TASK, 0, red || red1);
        reddot.setCondition(UIConst.HOME_TASK, 1, red);
        reddot.setCondition(UIConst.HOME_TASK, 2, red1);
        reddot.notify(UIConst.HOME_TASK);
    };
    Model_HomeTask.prototype.getTaskRed = function () {
        var s = this;
        for (var i = 0; i < s.data.length; i++) {
            if (s.data[i].state == 1) {
                return true;
            }
        }
        for (var i = 0; i < s.boxData.length; i++) {
            if (s.boxData[i] == 1) {
                return true;
            }
        }
        return false;
    };
    Model_HomeTask.prototype.getGoalRed = function () {
        var s = this;
        for (var i = 0; i < s.datGoal.length; i++) {
            for (var j = 0; j < s.datGoal[i].length; j++) {
                if (s.datGoal[i][j].state == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    Object.defineProperty(Model_HomeTask.prototype, "datGoal", {
        get: function () {
            var s = this;
            if (s._dGoal == null) {
                s._dGoal = [];
                s._mapGoal = {};
                for (var k in Config.fdmb_019) {
                    var v = new Vo_HomeGoal();
                    v.initCfg(Config.fdmb_019[k]);
                    s._mapGoal[v.id] = v;
                    if (s._dGoal[v.fenlei - 1] == null) {
                        s._dGoal[v.fenlei - 1] = [];
                    }
                    s._dGoal[v.fenlei - 1].push(v);
                }
            }
            return this._dGoal;
        },
        enumerable: true,
        configurable: true
    });
    Model_HomeTask.prototype.sortTask = function (arr) {
        arr.sort(function (a, b) {
            return a.sortIndex < b.sortIndex ? -1 : 1;
        });
    };
    Model_HomeTask.prototype.sortGOAL = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            v.sort(function (a, b) {
                return a.sortIndex < b.sortIndex ? -1 : 1;
            });
        }
    };
    //GC府邸目标奖励状态返回 [I:目标idI:奖励状态][I:类别I: 任务进度]目标进度按类型
    Model_HomeTask.prototype.GC_OPEN_GOAL_11414 = function (s, b) {
        s.datGoal;
        var len = b.readShort();
        for (var i = 0; i < len; i++) {
            var id = b.readInt();
            var state = b.readInt();
            var v = s._mapGoal[id];
            v.state = state;
            v.update();
        }
        s.sortGOAL(s.datGoal);
        len = b.readShort();
        s.progreGoal = {};
        for (var i = 0; i < len; i++) {
            var type = b.readInt();
            var progress = b.readInt();
            s.progreGoal[type] = progress;
        }
        s.checkNotice();
        s.notify(Model_HomeTask.OPEN_GOAL);
    };
    /**
     * CG 府邸目标奖励变化 I: 目标idI:奖励状态
    */
    Model_HomeTask.prototype.GC_GET_GOAL_REWARD_11416 = function (s, b) {
        var id = b.readInt();
        if (!s._mapGoal)
            s.datGoal;
        var vo = s._mapGoal[id]; //s.getVoById(id);
        vo.state = b.readInt();
        vo.update();
        s.sortGOAL(s.datGoal);
        s.checkNotice();
        s.notify(Model_HomeTask.UP_GOAL);
    };
    /**
     * GC 按类别某些目标组变化 I: 目标分类序号I:目标分类参数变化
    */
    Model_HomeTask.prototype.GC_GOAL_CHANG_11418 = function (s, b) {
        var id = b.readInt();
        if (!s._mapGoal)
            s.datGoal;
        var vo = s._mapGoal[id]; //s.getVoById(id);
        vo.state = b.readInt();
        vo.update();
        s.sortGOAL(s.datGoal);
        s.checkNotice();
        s.notify(Model_HomeTask.UP_GOAL);
    };
    Model_HomeTask.OPEN_TASK = "open_task";
    Model_HomeTask.UP_TASK = "up_task";
    Model_HomeTask.OPEN_GOAL = "open_goal";
    Model_HomeTask.UP_GOAL = "up_goal";
    return Model_HomeTask;
}(BaseModel));
__reflect(Model_HomeTask.prototype, "Model_HomeTask");
