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
var Model_RongLian = (function (_super) {
    __extends(Model_RongLian, _super);
    function Model_RongLian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_RongLian.fenjiePrompt = function (sid, cout) {
        if (cout === void 0) { cout = 1; }
        var g = Model_RongLian.fenjieObj[sid];
        var decompose = Config.decompose_204[g.id];
        var arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(decompose.reward));
        for (var i = 0; i < arr.length; i++) {
            arr[i].count = cout * arr[i].count;
            ConfigHelp.addSerGainText(arr[i].gType, arr[i].id, true, arr[i].count);
        }
        // ViewCommonPrompt.textItemList(arr);
    };
    /**普通熔练*/
    Model_RongLian.MATCH_RONGLIAN_PUTONG_EQUIP = function (voe, slef) {
        if (slef === void 0) { slef = null; }
        if (voe.cfg.reward == "0") {
            return false;
        }
        return true;
    };
    /**熔炉*/
    Model_RongLian.MATCH_RONGLU_EQUIP = function (voe, slef) {
        if (slef === void 0) { slef = null; }
        var type = voe.type;
        if (type != 7 && type != 11 && type != 12 && type != 13 && type != 14) {
            return false;
        }
        return true;
    };
    /**神兵装备 */
    Model_RongLian.MATCH_RONGLU_SHENBING = function (voe) {
        var type = voe.type;
        if (type != 11 && type != 12 && type != 13 && type != 14) {
            return false;
        }
        return true;
    };
    /**601 CG申请熔炼数据 */
    Model_RongLian.prototype.CG_RL_INFO = function () {
        var bates = this.getBytes();
        this.sendSocket(601, bates);
    };
    /**603 B-[L] CG熔炼装备 B:1普通2特殊[L:装备唯一id]装备集合 */
    Model_RongLian.prototype.CG_RL_EQUIP_LIST = function (type, equipList) {
        var bates = this.getBytes();
        bates.writeByte(type);
        var len = equipList.length;
        bates.writeShort(len);
        for (var i = 0; i < len; i++) {
            var voe = equipList[i];
            bates.writeLong(voe.sid);
        }
        this.sendSocket(603, bates);
    };
    /**2651 CG 合成道具 I:目标idI:合成数量 */
    Model_RongLian.prototype.CG_HE_CHENG = function (id, count) {
        var bates = this.getBytes();
        bates.writeInt(id);
        bates.writeInt(count);
        this.sendSocket(2651, bates);
    };
    //协议处理
    Model_RongLian.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(602, this.GC_RL_INFO, this);
        mgr.regHand(604, this.GC_RL_EQUIP_RESULT, this);
        mgr.regHand(606, this.GC_RL_ONEKEY, this);
        mgr.regHand(2652, this.GC_HE_CHENG, this);
    };
    //602 S-S GC返回熔炼信息 S:熔炼等级 S:熔炼进度
    Model_RongLian.prototype.GC_RL_INFO = function (self, data) {
        Model_RongLian.rl_level = data.readShort();
        Model_RongLian.rl_progress = data.readInt();
        GGlobal.control.notify(Enum_MsgType.MSG_RL_INOF);
    };
    /**604 B-B GC熔炼返回 B:1普通2特殊B:0失败1成功2背包已满*/
    Model_RongLian.prototype.GC_RL_EQUIP_RESULT = function (self, data) {
        var type = data.readByte();
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("Error失败");
        }
        else if (result == 1) {
            Model_RongLian.FULL_EXP = data.readByte() == 1; //B:1今天经验已满 0没有满
            if (type == 1) {
                GGlobal.control.notify(Enum_MsgType.MSG_RL_REFLASH1);
            }
            else if (type == 2) {
                // GGlobal.control.notify(Enum_MsgType.MSG_RL_REFLASH2);
            }
        }
        else if (result == 2) {
            ViewCommonWarn.text("背包空间不足");
        }
        else if (result == 3) {
            ViewCommonWarn.text("熔炼已达最大等级");
        }
        else if (result == 4) {
            ViewCommonWarn.text("没有装备可熔炼");
        }
    };
    //背包已满  提示
    Model_RongLian.prototype.GC_RL_ONEKEY = function (self, data) {
        Model_RongLian.ALERT_ONEKEY();
    };
    //GC 合成道具返回 B:0成功 1失败I:目标idI:合成数量
    Model_RongLian.prototype.GC_HE_CHENG = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var id = data.readInt();
            var count = data.readInt();
            GGlobal.control.notify(Enum_MsgType.HE_CHENG_SUCCESS);
            ViewCommonWarn.text("合成成功");
        }
        else {
            if (result == 2) {
                ViewCommonWarn.text("VIP等级不足");
            }
            else if (result == 1) {
                ViewCommonWarn.text("材料不足");
            }
        }
    };
    Model_RongLian.ALERT_ONEKEY = function () {
        ViewAlert.show("背包空间已满，是否一键熔炼", Handler.create(this, function func() {
            Model_RongLian.onekeyRongLian();
        }, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
    };
    //一键熔炼
    Model_RongLian.onekeyRongLian = function () {
        var ret = Model_RongLian.onekeyRongLianArr();
        if (ret.length == 0) {
            ViewCommonWarn.text("没有装备可熔炼");
            return;
        }
        GGlobal.modelRL.CG_RL_EQUIP_LIST(1, ret);
        setTimeout(function () {
            ViewCommonWarn.text("熔炼成功");
        }, 500);
    };
    Model_RongLian.autoFilter = function (voe, self) {
        var ret = Model_RongLian.MATCH_RONGLIAN_PUTONG_EQUIP(voe); //是装备
        if (ret) {
            //评分小
            var plyEq = Model_player.voMine.equipData[voe.type];
            if (plyEq && plyEq.getPower() >= voe.getPower()) {
                return true;
            }
            return false;
        }
        else {
            return false;
        }
    };
    Model_RongLian.onekeyRongLianArr = function () {
        var ret = [];
        var list = Model_Bag.equipList;
        var len = Model_Bag.equipList.length;
        Model_RongLian.equipBest = {};
        for (var i = 0; i < len; i++) {
            var voe = list[i];
            var isEqu = Model_RongLian.MATCH_RONGLIAN_PUTONG_EQUIP(voe); //是装备
            if (isEqu) {
                //评分小
                var plyEq = null; //身上装备 或要保留的装备
                var shPower = 0;
                if (voe.type >= 110 && voe.type < 150) {
                    shPower = ModelSH.canRongLian(voe.type); //穿在身上的战力
                }
                else {
                    plyEq = Model_player.voMine.equipData[voe.type];
                }
                if (shPower > 0 && shPower >= voe.basePower) {
                    ret.push(voe);
                }
                else if (plyEq && plyEq.basePower >= voe.basePower) {
                    ret.push(voe);
                }
                else {
                    var plyEqStore = Model_RongLian.equipBest[voe.type];
                    if (plyEqStore == null) {
                        plyEqStore = {};
                        Model_RongLian.equipBest[voe.type] = plyEqStore;
                    }
                    //取最强的装备
                    if (voe.jie > 0) {
                        if (!Model_BySys.canWearEqVo(voe)) {
                            plyEq = plyEqStore[voe.jie];
                        }
                        else {
                            plyEq = plyEqStore[0];
                        }
                    }
                    else if (voe.zs > 0) {
                        if (voe.zs > Model_player.voMine.zsID) {
                            plyEq = plyEqStore[voe.zs];
                        }
                        else {
                            plyEq = plyEqStore[0];
                        }
                    }
                    else if (voe.level > 1) {
                        if (voe.level > Model_LunHui.realLv) {
                            plyEq = plyEqStore[voe.level];
                        }
                        else {
                            plyEq = plyEqStore[0];
                        }
                    }
                    else {
                        plyEq = plyEqStore[0];
                    }
                    //存最强的装备
                    if (plyEq == null || plyEq.basePower < voe.basePower) {
                        if (plyEq) {
                            ret.push(plyEq);
                        }
                        if (voe.jie > 0) {
                            if (!Model_BySys.canWearEqVo(voe)) {
                                plyEqStore[voe.jie] = voe;
                            }
                            else {
                                plyEqStore[0] = voe;
                            }
                        }
                        else if (voe.zs > 0) {
                            if (voe.zs > Model_player.voMine.zsID) {
                                plyEqStore[voe.zs] = voe;
                            }
                            else {
                                plyEqStore[0] = voe;
                            }
                        }
                        else if (voe.level > 1) {
                            if (voe.level > Model_LunHui.realLv) {
                                plyEqStore[voe.level] = voe;
                            }
                            else {
                                plyEqStore[0] = voe;
                            }
                        }
                        else {
                            plyEqStore[0] = voe;
                        }
                    }
                    else {
                        ret.push(voe);
                    }
                }
            }
        }
        return ret;
    };
    Model_RongLian.checkFJEqu = function (voEquip) {
        var equ = Model_player.voMine.equipData[voEquip.type];
        if (equ == null || equ.basePower < voEquip.basePower) {
            return false;
        }
        return true;
    };
    Model_RongLian.checkFenJie = function () {
        //装备  神装 将印
        var arr0 = [];
        for (var i = 0; i < Model_Bag.equipList.length; i++) {
            var voEquip = Model_Bag.equipList[i];
            if (voEquip && Config.decompose_204[voEquip.id]) {
                if (Model_RongLian.checkFJEqu(voEquip)) {
                    return true;
                }
            }
        }
        var arr1 = [];
        //道具  
        for (var i = 0; i < Model_Bag.itemList.length; i++) {
            var voItem = Model_Bag.itemList[i];
            if (voItem && Config.decompose_204[voItem.id]) {
                return true;
            }
        }
        return false;
    };
    Model_RongLian.getHeCheng = function (type) {
        if (type === void 0) { type = 1; }
        var ret = this.dataDic[type];
        if (ret == null) {
            ret = this.dataDic[type] = [];
            for (var key in Config.compose_245) {
                var cfg = Config.compose_245[key];
                if (cfg.type == type) {
                    ret.push(cfg);
                }
            }
        }
        return ret;
    };
    Model_RongLian.getNotByType = function (type) {
        var arr = this.getHeCheng(type);
        for (var i = 0; i < arr.length; i++) {
            var bool = Model_RongLian.checkHeChengVo(arr[i]);
            if (bool) {
                return true;
            }
        }
        return false;
    };
    Model_RongLian.getHCItem = function (vo) {
        if (vo.hcItem == null) {
            vo.hcItem = VoItem.create(vo.id);
        }
        return vo.hcItem;
    };
    Model_RongLian.checkHeCheng = function () {
        var bool1 = this.getNotByType(1);
        var bool2 = this.getNotByType(2);
        return bool1 || bool2;
    };
    Model_RongLian.checkHeChengVo = function (v) {
        var vip = v.vip;
        if (Model_player.voMine.viplv < vip) {
            return false;
        }
        var iArr = ConfigHelp.SplitStr(v.item);
        for (var j = 0; j < iArr.length; j++) {
            if (Number(iArr[j][0]) == Enum_Attr.ITEM) {
                if (Model_Bag.getItemCount(Number(iArr[j][1])) < Number(iArr[j][2])) {
                    return false;
                }
            }
            else {
                if (Model_player.getCurrencyCount(Number(iArr[j][0])) < Number(iArr[j][2])) {
                    return false;
                }
            }
        }
        return true;
    };
    Model_RongLian.rl_level = 0;
    Model_RongLian.rl_progress = 0;
    // public static rlEquipArr: Array<VoEquip>;
    Model_RongLian.fenjieObj = {};
    Model_RongLian.dataDic = {};
    return Model_RongLian;
}(BaseModel));
__reflect(Model_RongLian.prototype, "Model_RongLian");
