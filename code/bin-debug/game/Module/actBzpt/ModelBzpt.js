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
 * 宝藏拼图管理器
 * @author: lujiahao
 * @date: 2019-11-22 19:07:21
 */
var ModelBzpt = (function (_super) {
    __extends(ModelBzpt, _super);
    function ModelBzpt() {
        var _this = _super.call(this) || this;
        _this._taskVoMap = {};
        _this._boxVoMap = {};
        _this._setupFlag = false;
        _this._taskVoListMap = {};
        _this._boxVoListMap = {};
        return _this;
    }
    ModelBzpt.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        {
            var t_cfg = Config.bzptrwb_333;
            for (var k in t_cfg) {
                var t_id = ~~k;
                var t_vo = new VoTaskBzpt();
                t_vo.id = t_id;
                this._taskVoMap[t_id] = t_vo;
            }
        }
        {
            var t_cfg = Config.bzptjlb_333;
            for (var k in t_cfg) {
                var t_id = ~~k;
                var t_vo = new VoBoxBzpt();
                t_vo.id = t_id;
                this._boxVoMap[t_id] = t_vo;
            }
        }
    };
    //========================================= 协议相关 ========================================
    //协议处理
    ModelBzpt.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10650, this.GC_BaoZangPinTu_openUI_10650, this);
        mgr.regHand(10652, this.GC_BaoZangPinTu_activate_10652, this);
        mgr.regHand(10654, this.GC_BaoZangPinTu_gotAward_10654, this);
    };
    /**10650 [I-B-I]-[I-B] 打开界面返回 [I:任务idB:任务状态I:任务参数]任务信息taskInfos[I:宝箱idB:宝箱状态]宝箱信息boxInfos*/
    ModelBzpt.prototype.GC_BaoZangPinTu_openUI_10650 = function (self, data) {
        var t_change = false;
        {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var arg1 = data.readInt();
                var arg2 = data.readByte();
                var arg3 = data.readInt();
                var t_vo = self.getTaskVoById(arg1);
                if (t_vo && t_vo.update({ state: arg2, count: arg3 })) {
                    t_change = true;
                }
            }
        }
        {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var arg4 = data.readInt();
                var arg5 = data.readByte();
                var t_vo = self.getBoxVoById(arg4);
                if (t_vo && t_vo.update({ state: arg5 })) {
                    t_change = true;
                }
            }
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.BZPT_UPDATE);
        }
    };
    /**10651 I 激活拼图 I:任务配置idcfgId*/
    ModelBzpt.prototype.CG_BaoZangPinTu_activate_10651 = function (pTaskId) {
        var bates = this.getBytes();
        bates.writeInt(pTaskId);
        this.sendSocket(10651, bates);
    };
    /**10652 B-I-B 激活拼图返回 B:状态:0-成功,1-失败stateI:任务idcfgIdB:任务状态taskState*/
    ModelBzpt.prototype.GC_BaoZangPinTu_activate_10652 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        var arg3 = data.readByte();
        switch (arg1) {
            case 0://成功
                var t_vo = self.getTaskVoById(arg2);
                if (t_vo && t_vo.update({ state: arg3 })) {
                    t_change = true;
                    var t_boxList = self.getBoxVoList();
                    for (var _i = 0, t_boxList_1 = t_boxList; _i < t_boxList_1.length; _i++) {
                        var v = t_boxList_1[_i];
                        if (v.state == 0 && v.curCount >= v.maxCount) {
                            v.update({ state: 1 });
                        }
                    }
                }
                break;
            case 1:
                ViewCommonWarn.text("激活失败");
                break;
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.BZPT_CARD_OPEN, { id: arg2 });
        }
    };
    /**10653 I 领取宝箱奖励 I:宝箱配置idcfgId*/
    ModelBzpt.prototype.CG_BaoZangPinTu_gotAward_10653 = function (pBoxId) {
        var t = this;
        var t_vo = t.getBoxVoById(pBoxId);
        if (!t_vo)
            return;
        if (t_vo.state != 1)
            return;
        var bates = this.getBytes();
        bates.writeInt(pBoxId);
        this.sendSocket(10653, bates);
    };
    /**10654 B-I 领取宝箱奖励返回 B:状态:0-成功,1-失败stateI:宝箱idcfgId*/
    ModelBzpt.prototype.GC_BaoZangPinTu_gotAward_10654 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        switch (arg1) {
            case 0://成功
                var t_vo = self.getBoxVoById(arg2);
                if (t_vo && t_vo.update({ state: 2 })) {
                    t_change = true;
                }
                break;
            case 1://失败
                break;
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.BZPT_BOX_OPEN, { id: arg2 });
        }
    };
    //=========================================== API ==========================================
    /** 获取当前活动期数 */
    ModelBzpt.prototype.getCurQs = function () {
        var t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_BZPT);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    };
    ModelBzpt.prototype.getTaskVoById = function (pId) {
        return this._taskVoMap[pId];
    };
    ModelBzpt.prototype.getBoxVoById = function (pId) {
        return this._boxVoMap[pId];
    };
    /**
     * 获取当期的任务数据列表
     */
    ModelBzpt.prototype.getTaskVoList = function () {
        var t = this;
        var t_qs = t.getCurQs();
        var t_list = t._taskVoListMap[t_qs];
        if (t_list === undefined) {
            t._taskVoListMap[t_qs] = t_list = [];
            for (var k in t._taskVoMap) {
                var t_vo = t._taskVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    /**
     * 获取当期宝箱列表
     */
    ModelBzpt.prototype.getBoxVoList = function () {
        var t = this;
        var t_qs = t.getCurQs();
        var t_list = t._boxVoListMap[t_qs];
        if (t_list === undefined) {
            t._boxVoListMap[t_qs] = t_list = [];
            for (var k in t._boxVoMap) {
                var t_vo = t._boxVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    };
    //===================================== private method =====================================
    ModelBzpt.prototype.reddotCheck = function () {
        var t = this;
        var t_value = false;
        var t_voList = t.getTaskVoList();
        for (var _i = 0, t_voList_1 = t_voList; _i < t_voList_1.length; _i++) {
            var v = t_voList_1[_i];
            if (v.state == 1) {
                t_value = true;
                break;
            }
        }
        var t_boxList = t.getBoxVoList();
        for (var _a = 0, t_boxList_2 = t_boxList; _a < t_boxList_2.length; _a++) {
            var v = t_boxList_2[_a];
            if (v.state == 1) {
                t_value = true;
                break;
            }
        }
        // console.log("++++++++", t_value);
        GGlobal.reddot.setCondition(UIConst.ACTCOM_BZPT, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    return ModelBzpt;
}(BaseModel));
__reflect(ModelBzpt.prototype, "ModelBzpt");
