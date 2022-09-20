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
var Model_ShenJian = (function (_super) {
    __extends(Model_ShenJian, _super);
    function Model_ShenJian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_ShenJian.checkUpStarNotice = function () {
        var len = Model_ShenJian.shenjianArr.length;
        for (var i = 0; i < len; i++) {
            var vo = Model_ShenJian.shenjianArr[i];
            if (Model_ShenJian.checkUpStarGridNotice(vo))
                return true;
        }
        return false;
    };
    Model_ShenJian.checkUpStarGridNotice = function (vo) {
        var itemVo = VoItem.create(vo.costArr[0][1]);
        var count = Model_Bag.getItemCount(itemVo.id);
        if (count >= vo.costArr[0][2] && vo.starLv < vo.starMax) {
            return true;
        }
        return false;
    };
    Model_ShenJian.checkDrugNotice = function () {
        Model_ShenJian.drugMax = 0;
        var len = Model_ShenJian.shenjianArr.length;
        for (var i = 0; i < len; i++) {
            var vo = Model_ShenJian.shenjianArr[i];
            if (vo.starLv > 0) {
                Model_ShenJian.drugMax += vo.drugMax * vo.starLv;
            }
        }
        if (Model_ShenJian.drugCount < Model_ShenJian.drugMax) {
            var count = Model_Bag.getItemCount(Model_ShenJian.drugId);
            if (count > 0)
                return true;
        }
        return false;
    };
    Object.defineProperty(Model_ShenJian, "shenjianArr", {
        get: function () {
            if (Model_ShenJian._shenjianArr.length <= 0) {
                for (var key in Config.sword_216) {
                    var vo = Vo_ShenJian.create(parseInt(key));
                    Model_ShenJian._shenjianArr.push(vo);
                }
                Model_ShenJian._shenjianArr.sort(Model_ShenJian.sortShenJian);
            }
            return Model_ShenJian._shenjianArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_ShenJian.sortShenJian = function (a, b) {
        if (a.state == b.state) {
            if (a.quality == b.quality) {
                return a.id - b.id;
            }
            else {
                if (a.state == 3) {
                    return a.quality - b.quality;
                }
                else {
                    return b.quality - a.quality;
                }
            }
        }
        else {
            return a.state - b.state;
        }
    };
    Model_ShenJian.isShenJianJHItem = function (id) {
        return Config.daoju_204[id] && Config.daoju_204[id].sys == UIConst.SHEN_JIAN;
    };
    Model_ShenJian.checkAndShow = function (id) {
        var arr = this.shenjianArr;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            if (vo.starLv == 0) {
                var costArr = vo.costArr;
                if (costArr[0][1] == id) {
                    // GGlobal.layerMgr.open(UIConst.BAOWU_GETTIPS, vo);
                    VTipBWJiHuo.add(vo);
                    break;
                }
            }
        }
    };
    /***1001 打开神剑界面   */
    Model_ShenJian.prototype.CG_OPEN_SHENJIAN = function () {
        var ba = new BaseBytes();
        this.sendSocket(1001, ba);
    };
    /**1003 激活神剑 I:神剑id    */
    Model_ShenJian.prototype.CG_SHENJIAN_JIHUO = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1003, ba);
    };
    /**1005 神剑升星 I:神剑id     */
    Model_ShenJian.prototype.CG_SHENJIAN_UPSTAR = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1005, ba);
    };
    /**1007 吞噬神剑属性丹 B:0：吞噬，1：一键吞噬     */
    Model_ShenJian.prototype.CG_SHENJIAN_TUNSHI = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1007, ba);
    };
    /**1009 神剑操作 B:操作类型: 1：装备上，2：卸下I:神剑id      */
    Model_ShenJian.prototype.CG_SHENJIAN_EQUIP = function (type, id) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(id);
        this.sendSocket(1009, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ShenJian.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(1002, this.GC_OPEN_SHENJIAN, this);
        wsm.regHand(1004, this.GC_SHENJIAN_JIHUO, this);
        wsm.regHand(1006, this.GC_SHENJIAN_UPSTAR, this);
        wsm.regHand(1008, this.GC_SHENJIAN_TUNSHI, this);
        wsm.regHand(1010, this.GC_SHENJIAN_EQUIP, this);
    };
    /**1010 神剑操作结果 B:0：失败，1：成功B:失败：错误码（1：未激活，2：已装备，3：未装备），成功：操作类型I:神剑id  */
    Model_ShenJian.prototype.GC_SHENJIAN_EQUIP = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var shenJianID = data.readInt();
            if (type == 1) {
                Model_player.voMine.setShenJian(shenJianID);
                Model_ShenJian.shenJianId = shenJianID;
            }
            else {
                Model_ShenJian.shenJianId = 0;
                Model_player.voMine.setShenJian(0);
            }
            GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
        }
    };
    /**1008 吞噬结果 B:0：失败，1：成功I:失败：错误码（1：材料不足，2：达使用上限），成功：已使用剑神属性丹数    */
    Model_ShenJian.prototype.GC_SHENJIAN_TUNSHI = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var drugNum = data.readInt();
            Model_ShenJian.drugCount = drugNum;
            GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
        }
    };
    /**1006 升星结果 B:0：失败，1：成功I:失败：错误码（1：未激活，2：神剑不存在，3：材料不足），成功：神剑idI:星级   */
    Model_ShenJian.prototype.GC_SHENJIAN_UPSTAR = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var starLv = data.readInt();
            var len = Model_ShenJian.shenjianArr.length;
            for (var i = 0; i < len; i++) {
                if (Model_ShenJian.shenjianArr[i].id == id) {
                    Model_ShenJian.shenjianArr[i].starLv = starLv;
                    if (starLv >= Model_ShenJian.shenjianArr[i].starMax) {
                        GGlobal.control.notify(UIConst.JUEXING);
                    }
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
        }
    };
    /**1004 激活神剑结果 B:0：失败，1：成功I:失败：错误码（1：神剑不存在，2：材料不足），成功：神剑idI:星级  */
    Model_ShenJian.prototype.GC_SHENJIAN_JIHUO = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var starLv = data.readInt();
            var len = Model_ShenJian.shenjianArr.length;
            for (var i = 0; i < len; i++) {
                if (Model_ShenJian.shenjianArr[i].id == id) {
                    Model_ShenJian.shenjianArr[i].starLv = starLv;
                    break;
                }
            }
            self.CG_SHENJIAN_EQUIP(1, id);
            GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
        }
    };
    /***1002 神剑信息返回 I:装备的神剑idI:已使用的神剑属性丹数量[I:神剑idI:星级]拥有的神剑信息  */
    Model_ShenJian.prototype.GC_OPEN_SHENJIAN = function (self, data) {
        Model_ShenJian.isFirstOpen = true;
        Model_ShenJian.shenJianId = data.readInt();
        Model_player.voMine.setShenJian(Model_ShenJian.shenJianId);
        Model_ShenJian.drugCount = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var shenJianId = data.readInt();
            var starLv = data.readInt();
            for (var j = 0; j < Model_ShenJian.shenjianArr.length; j++) {
                var vo = Model_ShenJian.shenjianArr[j];
                if (vo.id == shenJianId) {
                    vo.starLv = starLv;
                    break;
                }
            }
        }
        GGlobal.control.notify(Enum_MsgType.SHENJIAN_DATA_UPDATE);
    };
    //一键升阶
    Model_ShenJian.checkOneKeyUp = function () {
        var jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
        var jieExp = Model_BySys.sysExp(Model_BySys.SHEN_JIAN);
        var count = Model_Bag.getItemCount(Model_ShenJian.DAN_LEVELUP);
        var exp = count * Model_ShenJian.DAN_EXP;
        var clotheslv = Config.swordlv_216[jieShu];
        if (clotheslv && clotheslv.exp > 0) {
            if (exp + jieExp >= clotheslv.exp) {
                return true;
            }
        }
        return false;
    };
    //	获取可以穿的武将装备
    Model_ShenJian.shenJianWearArr = function () {
        var arr = Model_Bag.filterEquips(Model_Bag.filterShenJianEquip, null);
        var d = Model_player.voMine.equipData;
        var sendArr = {};
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            var jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
            if (jieShu < equ.jie) {
                continue;
            }
            var ownE = d[equ.type];
            if (ownE == null && sendArr[equ.type] == null) {
                sendArr[equ.type] = equ;
            }
            else {
                var boo = true;
                if (ownE && equ.basePower <= ownE.basePower) {
                    boo = false;
                }
                if (sendArr[equ.type] && equ.basePower <= sendArr[equ.type].basePower) {
                    boo = false;
                }
                if (boo) {
                    sendArr[equ.type] = equ;
                }
            }
        }
        var a = [];
        for (var i = 60; i < 64; i++) {
            if (sendArr[i]) {
                a.push(sendArr[i]);
            }
        }
        return a;
    };
    //技能升级
    Model_ShenJian.checkSkill = function (id) {
        var obj = Config.swordlvskill_216[id];
        var jieShu = Model_BySys.sysJie(Model_BySys.SHEN_JIAN);
        if (obj.next == 0) {
            return false;
        }
        else {
            var consumeArr = ConfigHelp.SplitStr(obj.consume);
            var hasCont = Model_Bag.getItemCount(Number(consumeArr[0][1]));
            if (jieShu >= obj.lv && hasCont >= Number(consumeArr[0][2])) {
                return true;
            }
        }
        return false;
    };
    //升阶
    Model_ShenJian.checkUpJie = function () {
        if (Model_ShenJian.checkOneKeyUp()) {
            return true;
        }
        //技能升级
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.SHEN_JIAN);
        var len = skillArr.length;
        for (var i = 0; i < len; i++) {
            var id = skillArr[i];
            if (Model_ShenJian.checkSkill(id)) {
                return true;
            }
        }
        if (Model_ShenJian.shenJianWearArr().length > 0) {
            return true;
        }
        return false;
    };
    /**通过激活材料(升星材料)判断使用该材料的神剑是否已经满星 */
    Model_ShenJian.isFullByMat = function (vo) {
        if (this.matToShenJian[vo.id]) {
            var data = this.matToShenJian[vo.id];
            return data.starLv >= data.starMax;
        }
        else {
            var datas = Model_ShenJian.shenjianArr;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var costArr = data.costArr;
                if (costArr) {
                    var id = Number(costArr[0][1]);
                    this.matToShenJian[id] = data;
                    if (id == vo.id) {
                        return data.starLv >= data.starMax;
                    }
                }
            }
        }
        return false;
    };
    Model_ShenJian.shenJianId = 0;
    Model_ShenJian.drugCount = 0;
    /**神剑属性丹 */
    Model_ShenJian.drugId = 412009;
    Model_ShenJian.drugIndex = 7;
    Model_ShenJian.DAN_LEVELUP = 411007;
    Model_ShenJian.DAN_EXP = 10;
    Model_ShenJian._shenjianArr = [];
    Model_ShenJian.isFirstOpen = false;
    /**材料到神剑的映射 */
    Model_ShenJian.matToShenJian = {};
    return Model_ShenJian;
}(BaseModel));
__reflect(Model_ShenJian.prototype, "Model_ShenJian");
