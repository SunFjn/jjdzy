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
var ModelChuangGuanYL = (function (_super) {
    __extends(ModelChuangGuanYL, _super);
    function ModelChuangGuanYL() {
        var _this = _super.call(this) || this;
        _this.currentId = 2;
        _this.currentTargetST = 0;
        _this.progress = 0;
        _this.maxProgress = 4;
        _this.currentDta = [];
        _this.nowCurent = 0;
        _this.maxCount = 0;
        return _this;
    }
    ModelChuangGuanYL.prototype.listenServ = function (sc) {
        var s = this;
        s.socket = sc;
        sc.regHand(4152, s.GC_OPEN_4152, s);
        sc.regHand(4154, s.GC_LQ_4154, s);
        sc.regHand(4156, s.GC_LQMB_4156, s);
        sc.regHand(4150, s.GC_SHOWICON_4150, s);
    };
    ModelChuangGuanYL.prototype.CG_OPEN_4151 = function () {
        this.sendSocket(4151, this.getBytes());
    };
    /**4152  S-B-[S-B-I]
     *
     * 打开界面 S:目标IDB:目标领取姿态[S:任务表IDB:状态 0不可领 1可领取 2已领取I:玩家进度]所有目前档ID
    */
    ModelChuangGuanYL.prototype.GC_OPEN_4152 = function (m, ba) {
        m.currentId = ba.readShort();
        m.currentTargetST = ba.readByte();
        m.currentDta = ba.readFmt([["S", "B", "I"]])[0];
        m.currentDta = m.currentDta.sort(function (a, b) { return a[0] > b[0] ? 1 : -1; });
        GGlobal.control.notify(Enum_MsgType.CGYL_OPEN);
        var hasNotice = m.currentTargetST == 1;
        if (!hasNotice) {
            var j = m.currentDta.length;
            for (var i = 0; i < j; i++) {
                hasNotice = m.currentDta[i][1] == 1;
                if (hasNotice)
                    break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.CHUANGGUANYOULI, 0, hasNotice);
        GGlobal.reddot.notify(UIConst.CHUANGGUANYOULI);
    };
    ModelChuangGuanYL.prototype.CG_LQ_4153 = function (idx) {
        var ba = this.getBytes();
        ba.writeShort(idx);
        this.sendSocket(4153, ba);
    };
    /**
     * 4154 B
     * 取任务奖励 B:结果 1成功 2奖励不存在 3该任务不属于本目标 4任务初始化失败 5奖励已领取 6任务未达标 7背包已满
    */
    ModelChuangGuanYL.prototype.GC_LQ_4154 = function (m, ba) {
        var ret = ba.readByte();
        var str = '';
        switch (ret) {
            case 1:
                str = "领取成功";
                GGlobal.control.notify(Enum_MsgType.CGYL_LQ);
                break;
            case 2:
                str = "奖励不存在";
                break;
            case 3:
                str = "任务不属于本目标";
                break;
            case 4:
                str = "任务初始化失败";
                break;
            case 5:
                str = "奖励已领取";
                break;
            case 6:
                str = "任务未达标";
                break;
            case 7:
                str = "背包已满";
                break;
        }
        ViewCommonWarn.text(str);
    };
    ModelChuangGuanYL.prototype.CG_LQMB_4155 = function () {
        var ba = this.getBytes();
        this.sendSocket(4155, ba);
    };
    //领取目标奖励 B:结果 1成功
    ModelChuangGuanYL.prototype.GC_LQMB_4156 = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 1) {
            ViewCommonWarn.text("领取成功");
            GGlobal.control.notify(Enum_MsgType.CGYL_LQ1);
        }
    };
    //入口开关 B:状态 0关 1开 入口开关 B:状态 0关 1开S:当前目标IDS:最大目标ID
    ModelChuangGuanYL.prototype.GC_SHOWICON_4150 = function (m, ba) {
        var ret = ba.readByte();
        var nowCurent = ba.readByte();
        var maxCount = ba.readByte();
        m.currentId = ba.readShort();
        if (ret == 1) {
            if (ModuleManager.isOpen(UIConst.CHUANGGUANYOULI)) {
                ChuangGuanYLIcon.createInstance().show1(nowCurent, maxCount);
            }
            else {
                m.nowCurent = nowCurent;
                m.maxCount = maxCount;
                GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, m.guanQiaUpdate, m);
            }
        }
        else
            ChuangGuanYLIcon.createInstance().hide1();
    };
    ModelChuangGuanYL.prototype.guanQiaUpdate = function () {
        var self = this;
        if (ModuleManager.isOpen(UIConst.CHUANGGUANYOULI)) {
            GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, self.guanQiaUpdate, self);
            ChuangGuanYLIcon.createInstance().show1(self.nowCurent, self.maxCount);
        }
    };
    return ModelChuangGuanYL;
}(BaseModel));
__reflect(ModelChuangGuanYL.prototype, "ModelChuangGuanYL");
