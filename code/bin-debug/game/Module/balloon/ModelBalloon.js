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
 * 打气球数据管理器
 * @author: lujiahao
 * @date: 2019-10-31 19:55:03
 */
var ModelBalloon = (function (_super) {
    __extends(ModelBalloon, _super);
    function ModelBalloon() {
        var _this = _super.call(this) || this;
        _this._voMap = {};
        /** 当前消费额 */
        _this.curChangeValue = 0;
        /** 当前期数 */
        _this.curQs = 1;
        /** 剩余次数 */
        _this.remain = 0;
        _this._setupFlag = false;
        _this._cfgListMap = {};
        _this._rewardListMap = {};
        return _this;
    }
    ModelBalloon.prototype.setup = function () {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
        for (var i = 0; i < EnumBalloon.BALL_COUNT; i++) {
            var t_vo = new VoBalloon();
            t_vo.id = i + 1;
            this._voMap[t_vo.id] = t_vo;
        }
    };
    //========================================= 协议相关 ========================================
    //协议处理
    ModelBalloon.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        //注册GC方法
        mgr.regHand(10000, this.GC_PlayBalloon_openUI_10000, this);
        mgr.regHand(10002, this.GC_PlayBalloon_shooting_10002, this);
    };
    /**10000 [B-B-I-I]-I-I-I 打开打气球返回 [B:射击编号B:道具类型I:道具IDI:数量]气球信息 itemListI:剩余子弹数量numI:当前消费元宝yuanbaoI:期数qs*/
    ModelBalloon.prototype.GC_PlayBalloon_openUI_10000 = function (self, data) {
        var t_change = false;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg1 = data.readByte(); //编号id
            var arg2 = data.readByte(); //道具类型
            var arg3 = data.readInt(); //道具id
            var arg4 = data.readInt(); //道具数量
            var t_vo = self.getVoById(arg1);
            if (t_vo && t_vo.update(arg2, arg3, arg4)) {
                t_change = true;
            }
        }
        var arg5 = data.readInt(); //剩余次数
        var arg6 = data.readInt(); //消费元宝数
        var arg7 = data.readInt(); //期数
        if (self.remain != arg5) {
            self.remain = arg5;
            t_change = true;
        }
        if (self.curChangeValue != arg6) {
            self.curChangeValue = arg6;
            t_change = true;
        }
        if (self.curQs != arg7) {
            self.curQs = arg7;
            t_change = true;
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.BALLOON_UPDATE);
        }
    };
    /**10001 B 射击 B:射击编号id(1-12),最小编号为1，最大编号为气球数index*/
    ModelBalloon.prototype.CG_PlayBalloon_shooting_10001 = function (pId) {
        var bates = this.getBytes();
        bates.writeByte(pId);
        this.sendSocket(10001, bates);
    };
    /**10002 B-B-B-I-I-I 射击返回 B:状态：1.成功 2.参数错误 3.背包已满 4.该位置已被射击 5.剩余次数不足stateB:射击编号indexB:道具类型typeI:道具IDidI:数量numI:剩余子弹次数surplusNum*/
    ModelBalloon.prototype.GC_PlayBalloon_shooting_10002 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte(); //结果状态
        var arg2 = data.readByte(); //编号id
        var arg3 = data.readByte(); //道具类型
        var arg4 = data.readInt(); //道具id
        var arg5 = data.readInt(); //道具数量
        var arg6 = data.readInt(); //剩余次数
        switch (arg1) {
            case 1://成功
                var t_vo = self.getVoById(arg2);
                if (t_vo && t_vo.update(arg3, arg4, arg5)) {
                    t_change = true;
                }
                if (self.remain != arg6) {
                    self.remain = arg6;
                    t_change = true;
                }
                break;
            case 2:
                ViewCommonWarn.text("参数错误");
                break;
            case 3:
                ViewCommonWarn.text("背包已满");
                break;
            case 4:
                ViewCommonWarn.text("该气球已经射过了");
                break;
            case 5:
                ViewCommonWarn.text("剩余次数不足");
                break;
        }
        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.BALLOON_SUCCESS, { id: arg2 });
        }
    };
    //=========================================== API ==========================================
    ModelBalloon.prototype.getVoById = function (pId) {
        return this._voMap[pId];
    };
    ModelBalloon.prototype.getCfgListByQs = function (pQs) {
        var t_list = this._cfgListMap[pQs];
        if (!t_list) {
            this._cfgListMap[pQs] = t_list = [];
            for (var k in Config.dqq_765) {
                var t_cfg = Config.dqq_765[k];
                if (t_cfg.qs == pQs) {
                    t_list.push(t_cfg);
                }
            }
        }
        return t_list;
    };
    /** 获取区间的最大元宝数 */
    ModelBalloon.prototype.getMaxValue = function () {
        var t = this;
        var t_cfgList = t.getCfgListByQs(t.curQs);
        var t_max = 0;
        for (var i = 0; i < t_cfgList.length; i++) {
            t_max = t_cfgList[i].yb;
            if (t.curChangeValue < t_max)
                break;
        }
        return t_max;
    };
    /**
     * 通过期数获取展示奖励列表
     * @param pQs
     */
    ModelBalloon.prototype.getRewardListByQs = function (pQs) {
        var t_rewardList = this._rewardListMap[pQs];
        if (t_rewardList === undefined) {
            var t_cfg = Config.dqqzs_765[pQs];
            if (t_cfg) {
                this._rewardListMap[pQs] = t_rewardList = ConfigHelp.makeItemListArr(t_cfg.zs);
            }
            else
                t_rewardList = [];
        }
        return t_rewardList;
    };
    //===================================== private method =====================================
    ModelBalloon.prototype.reddotCheck = function () {
        var t = this;
        var t_value = t.remain > 0;
        GGlobal.reddot.setCondition(UIConst.ACTCOM_BALLOON, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    return ModelBalloon;
}(BaseModel));
__reflect(ModelBalloon.prototype, "ModelBalloon");
