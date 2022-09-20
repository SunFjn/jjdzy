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
var Model_ActTalent = (function (_super) {
    __extends(Model_ActTalent, _super);
    function Model_ActTalent() {
        var _this = _super.call(this) || this;
        //目标
        _this.muBObj = {};
        return _this;
    }
    /**运筹帷幄-锦囊妙计 领取奖励 I:配置表id*/
    Model_ActTalent.prototype.CG_YCWW_JLMJ_GET = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(9901, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ActTalent.prototype.listenServ = function (wsm) {
        var s = this;
        s.socket = wsm;
        wsm.regHand(9350, s.GC_TALENT_OPENUI9350, s);
        wsm.regHand(9352, s.GC_TALENT_GET_REWARD9352, s);
        wsm.regHand(9400, s.GC_GOAL_OPENUI9400, s);
        wsm.regHand(9402, s.GC_GOAL_GET_REWARD9402, s);
        //运筹帷幄-锦囊妙计
        wsm.regHand(9900, s.GC_YCWW_JLMJ_OPENUI, s);
        wsm.regHand(9902, s.GC_YCWW_JLMJ_GET_REWARD, s);
    };
    //打开界面返回 I:抽奖次数[I:表的序号B:领取状态0未领取 1可领取 2已领取]目标列表
    Model_ActTalent.prototype.GC_TALENT_OPENUI9350 = function (s, data) {
        s.xlCt = data.readInt();
        var len = data.readShort();
        s.xlArr = [];
        for (var i = 0; i < len; i++) {
            var hd = new Vo_HuoDong();
            hd.readMsgInt(data);
            s.xlArr.push(hd);
        }
        GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XILIAN);
        s.checkHolyBXiLian();
    };
    /**领取奖励I:表的序号   */
    Model_ActTalent.prototype.CG_TALENT_GET9351 = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(9351, ba);
    };
    //领取奖励返回 B:状态1未完成任务 2已领取 3成功I:失败返回0，成功返回表的序号
    Model_ActTalent.prototype.GC_TALENT_GET_REWARD9352 = function (s, data) {
        var res = data.readByte();
        if (res == 3) {
            var id = data.readInt();
            for (var i = 0; i < s.xlArr.length; i++) {
                if (s.xlArr[i].id == id) {
                    s.xlArr[i].status = 2;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_XILIAN);
            s.checkHolyBXiLian();
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    Model_ActTalent.prototype.checkHolyBXiLian = function () {
        var sf = GGlobal.reddot;
        sf.setCondition(UIConst.ACTCOM_TALENT, 0, Model_HuoDong.isVoNotice(this.xlArr));
        sf.notifyMsg(UIConst.ACTCOM_TAL);
    };
    //打开界面返回 [B:任务类型[I:任务idB:任务状态0未完成 1可领取 2已完成L:对应的完成值]]任务数据
    Model_ActTalent.prototype.GC_GOAL_OPENUI9400 = function (s, data) {
        s.muBObj = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var type = data.readByte();
            s.muBObj[type] = [];
            var size = data.readShort();
            for (var j = 0; j < size; j++) {
                var hd = new Vo_HuoDong();
                hd.readMsgInt(data);
                hd.canCt = data.readLong();
                hd.hasCt = type;
                s.muBObj[type].push(hd);
            }
        }
        GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_MUBIAO);
        s.checkHolyBMuBiao();
    };
    /**目标 领取奖励  B:任务类型I:任务id*/
    Model_ActTalent.prototype.CG_GOAL_GET9401 = function (type, id) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(id);
        this.sendSocket(9401, ba);
    };
    //领取奖励返回 B:状态0失败 1成功B:失败（1未完成 2已领取），成功返回任务类型I:任务id
    Model_ActTalent.prototype.GC_GOAL_GET_REWARD9402 = function (s, data) {
        var res = data.readByte();
        var type = data.readByte();
        var id = data.readInt();
        if (res == 1) {
            var arr = s.muBObj[type];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr[i].status = 2;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.ACT_HOLYB_MUBIAO);
            s.checkHolyBMuBiao();
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    Model_ActTalent.prototype.checkHolyBMuBiao = function () {
        var sf = GGlobal.reddot;
        var obj = this.muBObj;
        sf.setCondition(UIConst.ACTCOM_TALENT_GOAL, 0, false);
        for (var keys in obj) {
            var arr = obj[keys];
            var red = Model_HuoDong.isVoNotice(arr);
            sf.setCondition(UIConst.ACTCOM_TALENT_GOAL, Number(keys), red);
            if (red)
                sf.setCondition(UIConst.ACTCOM_TALENT_GOAL, 0, true);
        }
        sf.notifyMsg(UIConst.ACTCOM_TAL);
    };
    Model_ActTalent.prototype.checkJLMJ = function () {
        var sf = GGlobal.reddot;
        sf.setCondition(UIConst.YUNCHOUWEIWO_JLMJ, 0, Model_HuoDong.isVoNotice(this.jlmjArr));
        sf.notifyMsg(UIConst.YUNCHOUWEIWO_JLMJ);
    };
    /**运筹帷幄-锦囊妙计 打开界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表I:次数*/
    Model_ActTalent.prototype.GC_YCWW_JLMJ_OPENUI = function (s, data) {
        var len = data.readShort();
        s.jlmjArr = [];
        for (var i = 0; i < len; i++) {
            var hd = new Vo_HuoDong();
            hd.readMsgInt(data);
            s.jlmjArr.push(hd);
        }
        s.jlmjCount = data.readInt();
        GGlobal.control.notify(UIConst.YUNCHOUWEIWO_JLMJ);
        s.checkJLMJ();
    };
    //领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:配置表id
    Model_ActTalent.prototype.GC_YCWW_JLMJ_GET_REWARD = function (s, data) {
        var res = data.readByte();
        if (res == 1) {
            var id = data.readInt();
            for (var i = 0; i < s.jlmjArr.length; i++) {
                if (s.jlmjArr[i].id == id) {
                    s.jlmjArr[i].status = 2;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.YUNCHOUWEIWO_JLMJ);
            s.checkJLMJ();
        }
        else {
            ViewCommonWarn.text("领取失败");
        }
    };
    return Model_ActTalent;
}(BaseModel));
__reflect(Model_ActTalent.prototype, "Model_ActTalent");
