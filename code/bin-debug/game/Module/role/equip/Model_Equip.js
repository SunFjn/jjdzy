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
var Model_Equip = (function (_super) {
    __extends(Model_Equip, _super);
    function Model_Equip() {
        return _super.call(this) || this;
    }
    /**获取一件装备的总战力 包过宝石和强化图腾等*/
    Model_Equip.getEquipPower = function (vo) {
        var power = vo.getPower();
        return power;
    };
    //**********************************************//
    //*****************提示检测*********************//
    /**根据位置获取人物身上的装备 */
    Model_Equip.getRoleEquipByPos = function (type) {
        return Model_player.voMine.equipData[type];
    };
    /**获取背包该位置最合适装备 */
    Model_Equip.getBagScoreMaxEquip = function (pos) {
        var list = this.getBagEquipByType(pos);
        var vo;
        var score = 0;
        var myLev = Model_LunHui.realLv;
        var zs = Model_player.voMine.zsID;
        for (var key in list) {
            var vo1 = void 0;
            if (!vo) {
                vo = list[key];
            }
            else {
                vo1 = list[key];
                if (myLev >= vo.level && zs >= vo.zs) {
                    if (vo1.getPower() > vo.getPower()) {
                        vo = vo1;
                    }
                }
            }
        }
        return vo;
    };
    /**装备界面将领对应的位置装备是否可以替换 */
    Model_Equip.checkNoticeReplace = function (pos) {
        var bo = false;
        var role = Model_player.voMine;
        var ret;
        if (role) {
            var vo = role.equipData[pos];
            var type = this.getPosType(pos);
            var myLev = Model_LunHui.realLv;
            var zs = Model_player.voMine.zsID;
            var score = 0;
            if (vo) {
                score = vo.getPower();
            }
            var list = this.getBagEquipByType(pos);
            for (var key in list) {
                vo = list[key];
                if (myLev >= vo.level && zs >= vo.zs) {
                    if (ret) {
                        if (vo.getPower() > ret.getPower()) {
                            ret = vo;
                        }
                    }
                    else {
                        if (vo.getPower() > score) {
                            bo = true;
                            ret = vo;
                        }
                    }
                }
            }
        }
        return ret;
    };
    /**检测某个职业将领背包中是否有装备可以替换 */
    Model_Equip.checkNoticeReplaceByJob = function (job) {
        var bo = false;
        var role = Model_player.voMine;
        if (role) {
            for (var i = 0; i < 9; i++) {
                if (Model_Equip.checkNoticeReplace(i)) {
                    bo = true;
                    break;
                }
            }
        }
        return bo;
    };
    /**获取背包中的对应类型的装备
     * isNormal 是否加上通用的
    */
    Model_Equip.getBagEquipByType = function (type, isNormal) {
        if (isNormal === void 0) { isNormal = true; }
        var list = [];
        var vo;
        for (var key in Model_Bag.equipList) {
            vo = Model_Bag.equipList[key];
            if (vo.type == type) {
                list.push(vo);
            }
        }
        return list;
    };
    /**装备位置对应存放的装备类型
     * pos装备位置
    */
    Model_Equip.getPosType = function (pos) {
        var type = 0;
        var info = this.posSaveArr;
        type = info[pos];
        return type;
    };
    Model_Equip.isEquip = function (type) {
        var bo = false;
        if (type >= 0 && type <= 9) {
            bo = true;
        }
        return bo;
    };
    /**装备部件类型对应的名称
     * type 装备部件类型
     * 0：武器1：衣服2：护腕3：裤子4：鞋子5：帽子6：项链7：手镯8：戒指9：饰品
     * 10：神装武器11：神装衣服12：神装护腕13：神装裤子14：神装鞋子15：神装帽子16：神装项链17：神装手镯18：神装戒指19：神装饰品
     */
    Model_Equip.getPartName = function (type) {
        var str = "";
        switch (type) {
            case 0:
                str = "武器";
                break;
            case 1:
                str = "衣服";
                break;
            case 2:
                str = "护腕";
                break;
            case 3:
                str = "裤子";
                break;
            case 4:
                str = "鞋子";
                break;
            case 5:
                str = "帽子";
                break;
            case 6:
                str = "项链";
                break;
            case 7:
                str = "手镯";
                break;
            case 8:
                str = "戒指";
                break;
            case 9:
                str = "饰品";
                break;
            case 10:
                str = "神装武器";
                break;
            case 11:
                str = "神装衣服";
                break;
            case 12:
                str = "神装护腕";
                break;
            case 13:
                str = "神装裤子";
                break;
            case 14:
                str = "神装鞋子";
                break;
            case 15:
                str = "神装帽子";
                break;
            case 16:
                str = "神装项链";
                break;
            case 17:
                str = "神装手镯";
                break;
            case 18:
                str = "神装戒指";
                break;
            case 19:
                str = "神装饰品";
                break;
        }
        return str;
    };
    //*************************协议处理*******************************//
    /**协议*/
    Model_Equip.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(350, this.GCPutOnEquip, this);
        mgr.regHand(352, this.GCBagEquip, this);
        mgr.regHand(354, this.GCPutOnResult, this);
        mgr.regHand(372, this.GCWearEquipByid, this);
        //转生装备穿戴
        mgr.regHand(374, this.GCWearReBornEquip, this);
        //一键穿戴装备通过系统 B:1武将2战甲3神剑4异宝5兵法6宝物7天书
        mgr.regHand(376, this.GCWearbypart, this);
        //转生装备升阶
        mgr.regHand(584, this.GCLHDaShiLv, this);
        mgr.regHand(586, this.GCAddLHDaShiLv, this);
        mgr.regHand(588, this.GCAddLHLv, this);
    };
    /**375
    CG 一键穿戴装备通过系统 B:1武将2战甲3神剑4异宝5兵法6宝物7天书[L:装备id]*/
    Model_Equip.prototype.CGWearbypart = function (type, arr) {
        if (!arr || arr.length == 0) {
            return;
        }
        var ba = this.getBytes();
        ba.writeByte(type);
        ba.writeShort(arr.length);
        for (var i = 0; i < arr.length; i++) {
            ba.writeLong(arr[i]);
        }
        this.sendSocket(375, ba);
    };
    /**583
    CG 获取转生装备炼魂大师等级经验*/
    Model_Equip.prototype.lHDaShiLv = function () {
        var ba = this.getBytes();
        this.sendSocket(583, ba);
    };
    /**584
    GC 炼魂大师等级 B:等级[B:位置I:等级I:经验]转生装备炼魂经验等级*/
    Model_Equip.prototype.GCLHDaShiLv = function (self, data) {
        Model_Equip.lhLevel = data.readByte();
        Model_Equip.lhArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new VoRebirthLH();
            v.readMsg(data);
            Model_Equip.lhArr[v.pos - 30] = v;
        }
        GGlobal.control.notify(Enum_MsgType.REBIRTH_EQUIP_UPDATA);
    };
    /**585
    CG 提升炼魂大师*/
    Model_Equip.prototype.addLHDaShiLv = function () {
        var ba = this.getBytes();
        this.sendSocket(585, ba);
    };
    /**586
    GC 提升炼魂大师等级返回 B:0成功 1失败B:等级大师等级*/
    Model_Equip.prototype.GCAddLHDaShiLv = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_Equip.lhLevel = data.readByte();
            ViewCommonWarn.text("提升炼魂大师成功");
            GGlobal.control.notify(Enum_MsgType.REBIRTH_EQUIP_UPDATA);
        }
        else {
            ViewCommonWarn.text("提升炼魂大师失败");
        }
    };
    /**587
    CG 增加某件转生装备炼魂等级 B:装备位置B:炼魂方式*/
    Model_Equip.prototype.addLHLv = function (pos, type) {
        var ba = this.getBytes();
        ba.writeByte(pos);
        ba.writeByte(type);
        this.sendSocket(587, ba);
    };
    /**588
    GC 炼魂返回 B:0成功1失败B:位置I:等级I:经验*/
    Model_Equip.prototype.GCAddLHLv = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var pos = data.readByte();
            var lv = data.readInt();
            var exp = data.readInt();
            var lh = Model_Equip.lhArr[pos - 30];
            if (lh) {
                lh.lv = lv;
                lh.exp = exp;
            }
            GGlobal.control.notify(Enum_MsgType.REBIRTH_EQUIP_UPDATA);
        }
    };
    /**373
    一键穿戴转生装备 [L:装备唯一id]需要替换的装备数组*/
    Model_Equip.prototype.wearReBornEquip = function (arr) {
        if (arr == null || arr.length == 0)
            return;
        var ba = this.getBytes();
        ba.writeShort(arr.length);
        for (var i = 0; i < arr.length; i++) {
            ba.writeLong(arr[i]);
        }
        this.sendSocket(373, ba);
    };
    /**374
    一键穿戴装备返回 B:返回值，0成功，1不成功[L:装备唯一idI:装备系统idB:替换的位置]更换的装备信息*/
    Model_Equip.prototype.GCWearReBornEquip = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("穿戴成功");
            var len = data.readShort();
            var role = Model_player.voMine;
            for (var i = 0; i < len; i++) {
                var sid = data.readLong();
                var id = data.readInt();
                var pos = data.readByte();
                var vo = VoEquip.create(id);
                vo.sid = sid;
                vo.ownPos = pos;
                if (role) {
                    role.equipData[pos] = vo;
                }
            }
            GGlobal.control.notify(Enum_MsgType.REBIRTH_EQUIP_UPDATA);
        }
        else {
            ViewCommonWarn.text("穿戴失败");
        }
    };
    /**376
    GC一键穿戴装备通过系统 B:0成功1失败B:系统[L:装备唯一idI:系统idB:替换位置]更换的装备信息*/
    Model_Equip.prototype.GCWearbypart = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            // ViewCommonWarn.text("穿戴成功")
            var type = data.readByte();
            var len = data.readShort();
            var role = Model_player.voMine;
            var itemInitMap = {};
            for (var i = 0; i < len; i++) {
                var sid = data.readLong();
                var id = data.readInt();
                var pos = data.readByte();
                var vo = VoEquip.create(id);
                vo.sid = sid;
                vo.ownPos = pos;
                if (role) {
                    role.equipData[pos] = vo;
                }
                GGlobal.modelBag.getItemInitMap(itemInitMap, vo);
            }
            GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
            GGlobal.control.notify(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, itemInitMap); //换低阶装备会有红点
        }
        else {
            // ViewCommonWarn.text("穿戴失败")
        }
    };
    /**350
    [L-B-I]
    GC 身上装备数据 [L:装备唯一idB:身上位置I:装备系统id]装备数据
    */
    Model_Equip.prototype.GCPutOnEquip = function (self, data) {
        var pos;
        var sid;
        var id;
        var role = Model_player.voMine;
        ;
        var vo;
        var equipArr = [910000, 910001, 910002, 910003, 910004, 910005, 910006, 910007, 910008, 910009];
        if (role && !role.equipData[0]) {
            for (var i = 0; i < 10; i++) {
                sid = i;
                pos = i;
                id = equipArr[i];
                vo = VoEquip.create(id);
                vo.sid = sid;
                vo.ownPos = pos;
                role.equipData[pos] = vo;
            }
        }
        // let voE: VoEquipEx;
        for (var i = 0, len = data.readShort(); i < len; i++) {
            sid = data.readLong();
            pos = data.readByte();
            id = data.readInt();
            vo = role.equipData[pos];
            if (vo) {
                vo.initLib(id);
            }
            else {
                vo = VoEquip.create(id);
            }
            vo.sid = sid;
            vo.ownPos = pos;
            role.equipData[pos] = vo;
        }
        GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
    };
    /**352
    [L-I-B]
    GC 不在身上装备数据 [L:装备唯一idI:装备系统idB:附加属性系数]装备数据 */
    Model_Equip.prototype.GCBagEquip = function (self, data) {
        var sid;
        var id;
        var ex;
        for (var i = 0, len = data.readShort(); i < len; i++) {
            sid = data.readLong();
            id = data.readInt();
        }
        //GGlobal.control.notify(Enum_MsgType.MSG_BAG_EQUIP_UPDATE);
        // self.notify("bagEquipUpdate");
    };
    /**354
    B-B-[L-I-B]
    GC 一键穿戴装备返回 B:返回值，0成功，1不成功[L:装备唯一idI:装备系统idB:替换的位置]更换的装备信息*/
    Model_Equip.prototype.GCPutOnResult = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var role = Model_player.voMine;
            var posArr = [];
            var pos = void 0;
            var sid = void 0;
            var id = void 0;
            var vo = void 0;
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                sid = data.readLong();
                id = data.readInt();
                pos = data.readByte();
                var vo1 = role.equipData[pos];
                vo = VoEquip.create(id);
                vo.sid = sid;
                vo.ownPos = pos;
                if (vo1) {
                    vo.qh = vo1.qh;
                    vo.bs = vo1.bs;
                    vo.starLv = vo1.starLv;
                    vo.zhuHunLv = vo1.zhuHunLv;
                    vo.zhuHunExp = vo1.zhuHunExp;
                }
                if (pos < 8) {
                }
                role.equipData[pos] = vo;
                posArr.push(pos);
            }
            GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
            self.notify("putOnResult", posArr);
        }
    };
    Model_Equip.prototype.GCWearEquipByid = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("穿戴成功");
        }
        else {
            ViewCommonWarn.text("穿戴失败");
        }
    };
    /**353
    B
    CG 一键穿戴装备 B:职业 */
    Model_Equip.prototype.CGPutOnEquip = function (arr) {
        if (GGlobal.loginArg.ip == "noServer" || arr.length == 0) {
            return;
        }
        var ba = this.getBytes();
        var len = arr.length;
        ba.writeShort(len);
        for (var i = 0; i < len; i++) {
            ba.writeLong(arr[i]);
        }
        this.sendSocket(353, ba);
    };
    /**351
    B:装备状态 0不在身上1身上普通装备2神装3武将将印*/
    Model_Equip.prototype.CGGetEquips = function (type) {
        var ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(351, ba);
    };
    Model_Equip.wearEquip = function (vo) {
        var zs = Model_player.voMine.zsID;
        if (zs < vo.zs) {
            ViewCommonWarn.text("转数不足");
            return false;
        }
        if (Model_LunHui.realLv < vo.level) {
            ViewCommonWarn.text("等级不足");
            return false;
        }
        if (vo.type >= 10 && vo.type < 20) {
            if (!ModuleManager.isOpen(UIConst.GOD_EQUIP)) {
                var lib = Config.xitong_001[UIConst.GOD_EQUIP];
                if (lib["open"] != "0") {
                    var condition = JSON.parse(lib["open"]);
                    var val = condition[0][1];
                    ViewCommonWarn.text("神装第" + val + "关开启");
                }
                return false;
            }
        }
        GGlobal.modelEquip.CGWearEquipByid(vo.sid);
        return true;
    };
    /**通过唯一id穿（装备神装将印） L:装备唯一id*/
    Model_Equip.prototype.CGWearEquipByid = function (id) {
        var ba = this.getBytes();
        ba.writeLong(id);
        this.sendSocket(371, ba);
    };
    /**装备升级 获取装备升级下一级对象 pos 部位, sid 装备id 无0*/
    Model_Equip.getNextEuipLv = function (pos, sid) {
        if (Model_Equip._eqiuplv == null) {
            Model_Equip._eqiuplv = {};
            for (var key in Config.eqiuplv_204) {
                var $eqiuplv = Config.eqiuplv_204[key];
                if (Model_Equip._eqiuplv[$eqiuplv.buwei] == null) {
                    Model_Equip._eqiuplv[$eqiuplv.buwei] = {};
                }
                Model_Equip._eqiuplv[$eqiuplv.buwei][$eqiuplv.up] = $eqiuplv;
            }
        }
        return Model_Equip._eqiuplv[pos][sid];
    };
    //	获取可以穿的转生装备
    Model_Equip.zSWearArr = function () {
        var arr = Model_Bag.filterEquips(Model_Bag.filterZsEquip, null);
        var d = Model_player.voMine.equipData;
        var sendArr = [];
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            if (Model_player.voMine.zsID < equ.zs) {
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
        return sendArr;
    };
    //	转生大师红点
    Model_Equip.zSDaShiRed = function () {
        var lv = Model_Equip.lhLevel;
        var curCfg = Config.zhuanshenglhds_256[lv];
        var nextCfg = Config.zhuanshenglhds_256[lv + 1];
        var boo = true;
        if (!nextCfg || Model_Equip.lhArr.length == 0) {
            boo = false;
        }
        else {
            for (var i = 0; i < Model_Equip.lhArr.length; i++) {
                if (Model_Equip.lhArr[i].lv < nextCfg.lv) {
                    boo = false;
                    break;
                }
            }
        }
        return boo;
    };
    //	转生装备可以炼魂
    Model_Equip.zSEquipLh = function () {
        var d = Model_player.voMine.equipData;
        var has = Model_Bag.getItemCount(Model_Equip.lhItemId);
        for (var i = 30; i < 34; i++) {
            var lh = Model_Equip.lhArr[i - 30];
            if (lh == null || d[i] == null)
                continue;
            var lhCfg = Config.zhuanshenglh_256[lh.lv];
            if ((has * 10 + lh.exp >= lhCfg.exp) && lhCfg.exp != 0) {
                return true;
            }
        }
        return false;
    };
    /**角色装备数量 */
    Model_Equip.EQUIPMAX = 10;
    Model_Equip.posSaveArr = [1, 3, 5, 6, 2, 4, 5, 6, 7, 0, 0, 11, 12, 13, 14];
    Model_Equip.lhLevel = 0;
    Model_Equip.lhArr = [];
    Model_Equip.lhItemId = 411009; //炼魂石id
    Model_Equip.lhAddExp = 10; //炼魂石 增加经验
    return Model_Equip;
}(BaseModel));
__reflect(Model_Equip.prototype, "Model_Equip");
