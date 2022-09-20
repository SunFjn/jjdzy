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
var Model_BaoWu = (function (_super) {
    __extends(Model_BaoWu, _super);
    function Model_BaoWu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_BaoWu.checkUpStarNotice = function () {
        var len = Model_BaoWu.baowuArr.length;
        for (var i = 0; i < len; i++) {
            var vo = Model_BaoWu.baowuArr[i];
            if (Model_BaoWu.checkUpStarGridNotice(vo))
                return true;
        }
        return false;
    };
    Model_BaoWu.checkUpStarGridNotice = function (vo) {
        var itemVo = VoItem.create(vo.costArr[0][1]);
        var count = Model_Bag.getItemCount(itemVo.id);
        if (count >= vo.costArr[0][2] && vo.starLv < vo.starMax) {
            return true;
        }
        return false;
    };
    // public static checkUpLevelNotice(): boolean {
    // 	let cfg = Config.baolv_214[Model_BaoWu.level];
    // 	if (cfg) {
    // 		let count = Model_Bag.getItemCount(Model_BaoWu.itemId);
    // 		if (count * 10 + Model_BaoWu.exp >= cfg.exp && cfg.exp > 0) {
    // 			return true;
    // 		}
    // 	}
    // 	return false;
    // }
    /**更换按钮红点 */
    Model_BaoWu.checkChangeBtNotice = function (type) {
        if (Model_BaoWu.equipBWIDArr[type] <= 0) {
            for (var i = 0; i < Model_BaoWu.baowuArr.length; i++) {
                var vo = Model_BaoWu.baowuArr[i];
                if (vo.state == 2) {
                    return true;
                }
            }
        }
        return false;
    };
    Model_BaoWu.checkDrugNotice = function () {
        var len = Model_BaoWu.baowuArr.length;
        Model_BaoWu.drugMax = 0;
        for (var i = 0; i < len; i++) {
            var vo = Model_BaoWu.baowuArr[i];
            if (vo.starLv > 0) {
                Model_BaoWu.drugMax += vo.drugMax * vo.starLv;
            }
        }
        if (Model_BaoWu.drugNum < Model_BaoWu.drugMax) {
            var count = Model_Bag.getItemCount(Model_BaoWu.drugId);
            if (count > 0)
                return true;
        }
        return false;
    };
    Model_BaoWu.skillVo = function (type) {
        var len = Model_BaoWu.baowuArr.length;
        var vo;
        if (Model_BaoWu.equipBWIDArr[type] > 0) {
            for (var i = 0; i < len; i++) {
                if (Model_BaoWu.baowuArr[i].id == Model_BaoWu.equipBWIDArr[type]) {
                    return Model_BaoWu.baowuArr[i].skillVo;
                }
            }
        }
        return null;
    };
    Object.defineProperty(Model_BaoWu, "BWPower", {
        get: function () {
            var power = 0;
            Model_BaoWu.drugMax = 0;
            var len = Model_BaoWu.baowuArr.length;
            //宝物星级战力
            for (var i = 0; i < len; i++) {
                var vo = Model_BaoWu.baowuArr[i];
                if (vo.starLv > 0) {
                    power += vo.power + vo.starPower * (vo.starLv - 1);
                    Model_BaoWu.drugMax += vo.drugMax * vo.starLv;
                }
            }
            /**宝物等级战力 */
            var cfg = Config.baolv_214[Model_BaoWu.level];
            if (cfg) {
                power += cfg.power;
            }
            /**宝物属性丹战力 */
            power += Config.drug_200[Model_BaoWu.drugIndex].power * Model_BaoWu.drugNum;
            return power;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model_BaoWu, "baowuArr", {
        get: function () {
            if (Model_BaoWu._baowuArr.length <= 0) {
                for (var key in Config.bao_214) {
                    var vo = Vo_BaoWu.create(parseInt(key));
                    vo.state = 4;
                    Model_BaoWu._baowuArr.push(vo);
                }
            }
            return Model_BaoWu._baowuArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_BaoWu.sortBaoWu = function (a, b) {
        if (a.state == b.state) {
            if (a.quality == b.quality) {
                return a.id - b.id;
            }
            else {
                if (a.state == 4) {
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
    Model_BaoWu.isBaoWuJHItem = function (id) {
        return Config.daoju_204[id] && Config.daoju_204[id].sys == UIConst.BAOWU;
    };
    Model_BaoWu.checkAndShow = function (id) {
        var arr = this.baowuArr;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            if (vo.state == 4) {
                var costArr = vo.costArr;
                if (costArr[0][1] == id) {
                    // GGlobal.layerMgr.open(UIConst.BAOWU_GETTIPS, vo);
                    VTipBWJiHuo.add(vo);
                    break;
                }
            }
        }
    };
    Model_BaoWu.mustAndShow = function (id) {
        var arr = this.baowuArr;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            var costArr = vo.costArr;
            if (costArr[0][1] == id) {
                VTipBWJiHuo.add(vo);
                break;
            }
        }
    };
    /**941  打开宝物界面   */
    Model_BaoWu.prototype.CG_OPEN_BAOWU = function () {
        var ba = new BaseBytes();
        this.sendSocket(941, ba);
    };
    /**943 切换宝物 B:位置I:要切换的宝物id    */
    Model_BaoWu.prototype.CG_CHANGE_BAOWU = function (pos, id) {
        var ba = new BaseBytes();
        ba.writeByte(pos);
        ba.writeInt(id);
        this.sendSocket(943, ba);
    };
    /**945  升级等级  */
    Model_BaoWu.prototype.CG_BAOWU_UPGRADE = function () {
        var ba = new BaseBytes();
        this.sendSocket(945, ba);
    };
    /**947  一键升级    */
    Model_BaoWu.prototype.CG_BAOWU_KEYUPGRADE = function () {
        var ba = new BaseBytes();
        this.sendSocket(947, ba);
    };
    /**949 激活宝物 I:宝物id     */
    Model_BaoWu.prototype.CG_BAOWU_JIHUO = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(949, ba);
    };
    /**951 宝物升星 I:宝物id     */
    Model_BaoWu.prototype.CG_BAOWU_UPSTAR = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(951, ba);
    };
    /**953 吞噬宝物属性丹 B:吞噬类型：0：吞噬，1：一键吞噬    */
    Model_BaoWu.prototype.CG_BAOWU_TUNSHI = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(953, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_BaoWu.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(942, this.GC_OPEN_BAOWU, this);
        wsm.regHand(944, this.GC_CHANGE_BAOWU, this);
        wsm.regHand(946, this.GC_BAOWU_UPGRADE, this);
        wsm.regHand(950, this.GC_BAOWU_JIHUO, this);
        wsm.regHand(952, this.GC_BAOWU_UPSTAR, this);
        wsm.regHand(954, this.GC_BAOWU_TUNSHI, this);
    };
    /**954 吞噬结果 B:吞噬结果：0：失败，1成功I:失败：错误码（1：材料不足，2：达可使用数量上限），成功：已使用宝物属性丹数量   */
    Model_BaoWu.prototype.GC_BAOWU_TUNSHI = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var drugNum = data.readInt();
            Model_BaoWu.drugNum = drugNum;
            GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
        }
    };
    /**952 升星结果 B:0：失败，1：成功I:失败：错误码（1：宝物不存在，2：已到达最高星级，3：材料不足），成功：宝物idI:宝物星级  */
    Model_BaoWu.prototype.GC_BAOWU_UPSTAR = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var starLv = data.readInt();
            var len = Model_BaoWu.baowuArr.length;
            for (var i = 0; i < len; i++) {
                if (Model_BaoWu.baowuArr[i].id == id) {
                    Model_BaoWu.baowuArr[i].starLv = starLv;
                    if (starLv >= Model_BaoWu.baowuArr[i].starMax) {
                        GGlobal.control.notify(UIConst.JUEXING);
                    }
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
        }
    };
    /**950 激活宝物结果 B:0：失败，1：成功I:失败：错误码（1：宝物不存在，2：材料不足），成功：宝物idI:星级  */
    Model_BaoWu.prototype.GC_BAOWU_JIHUO = function (self, data) {
        var result = data.readByte();
        var id = data.readInt();
        if (result == 1) {
            var starLv = data.readInt();
            var len = Model_BaoWu.baowuArr.length;
            for (var i = 0; i < len; i++) {
                if (Model_BaoWu.baowuArr[i].id == id) {
                    Model_BaoWu.baowuArr[i].starLv = starLv;
                    Model_BaoWu.baowuArr[i].state = 3;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
        }
    };
    /**946 升级结果返回 B:0：失败，1：成功I:失败：错误码（1：材料不足），成功：等级I:经  */
    Model_BaoWu.prototype.GC_BAOWU_UPGRADE = function (self, data) {
        var result = data.readByte();
        VZhiShengDan.invalNum = 2;
        if (result == 1) {
            var level = data.readInt();
            var exp = data.readInt();
            Model_BaoWu.level = level;
            Model_BaoWu.exp = exp;
            GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
        }
    };
    /*944 切换宝物结果 B:0：失败，1:成功B:失败：错误码（1：未激活宝物），成功：位置I:宝物id */
    Model_BaoWu.prototype.GC_CHANGE_BAOWU = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var pos = data.readByte();
            var id = data.readInt();
            if (Model_BaoWu.equipBWIDArr[0] == id) {
                Model_BaoWu.equipBWIDArr[0] = 0;
            }
            if (Model_BaoWu.equipBWIDArr[1] == id) {
                Model_BaoWu.equipBWIDArr[1] = 0;
            }
            Model_BaoWu.equipBWIDArr[pos - 1] = id;
            for (var j = 0; j < Model_BaoWu.baowuArr.length; j++) {
                var vo = Model_BaoWu.baowuArr[j];
                if (vo.id == Model_BaoWu.equipBWIDArr[0]) {
                    vo.state = 0;
                }
                else if (vo.id == Model_BaoWu.equipBWIDArr[1]) {
                    vo.state = 1;
                }
                else if (vo.starLv > 0) {
                    vo.state = 3;
                }
                else {
                    if (Model_BaoWu.checkUpStarGridNotice(vo)) {
                        vo.state = 2;
                    }
                    else {
                        vo.state = 4;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
            GGlobal.control.notify(Enum_MsgType.BAOWU_SKILL_UPDATE);
        }
    };
    /**942 宝物信息返回 I:装备宝物id（位置1）I:装备宝物id（位置2）I:等级I:经验I:已使用宝物属性丹个数[I:宝物idI:星级]拥有的宝物信息  */
    Model_BaoWu.prototype.GC_OPEN_BAOWU = function (self, data) {
        var bwId0 = data.readInt();
        var bwId1 = data.readInt();
        var level = data.readInt();
        var exp = data.readInt();
        var drugCount = data.readInt();
        Model_BaoWu.level = level;
        Model_BaoWu.exp = exp;
        Model_BaoWu.drugNum = drugCount;
        Model_BaoWu.equipBWIDArr = [bwId0, bwId1];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var bwID = data.readInt();
            var starLv = data.readInt();
            for (var j = 0; j < Model_BaoWu.baowuArr.length; j++) {
                var vo = Model_BaoWu.baowuArr[j];
                if (vo.id == bwID) {
                    if (bwID == bwId0) {
                        vo.state = 0;
                    }
                    else if (bwID == bwId1) {
                        vo.state = 1;
                    }
                    else if (starLv > 0) {
                        vo.state = 3;
                    }
                    else {
                        if (Model_BaoWu.checkUpStarGridNotice(vo)) {
                            vo.state = 2;
                        }
                        else {
                            vo.state = 4;
                        }
                    }
                    vo.starLv = starLv;
                    break;
                }
            }
        }
        GGlobal.control.notify(Enum_MsgType.BAOWU_DATA_UPDATE);
        GGlobal.control.notify(Enum_MsgType.BAOWU_SKILL_UPDATE);
    };
    //一键升阶
    Model_BaoWu.checkOneKeyUp = function () {
        var jieShu = Model_BaoWu.level;
        var jieExp = Model_BaoWu.exp;
        var count = Model_Bag.getItemCount(Model_BaoWu.DAN_LEVELUP);
        var exp = count * Model_BaoWu.DAN_EXP;
        var clotheslv = Config.baolv_214[jieShu];
        if (clotheslv.exp > 0) {
            if (exp + jieExp >= clotheslv.exp) {
                return true;
            }
        }
        return false;
    };
    //	获取可以穿的武将装备
    Model_BaoWu.baoWuWearArr = function () {
        var arr = Model_Bag.filterEquips(Model_Bag.filterBaoWuEquip, null);
        var d = Model_player.voMine.equipData;
        var sendArr = {};
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            var jieShu = Model_BaoWu.level;
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
        for (var i = 90; i < 94; i++) {
            if (sendArr[i]) {
                a.push(sendArr[i]);
            }
        }
        return a;
    };
    //技能升级
    Model_BaoWu.checkSkill = function (id) {
        var obj = Config.baolvskill_214[id];
        var jieShu = Model_BaoWu.level;
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
    Model_BaoWu.checkUpJie = function () {
        if (Model_BaoWu.checkOneKeyUp()) {
            return true;
        }
        //技能升级
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.BAO_WU);
        var len = skillArr.length;
        for (var i = 0; i < len; i++) {
            var id = skillArr[i];
            if (Model_BaoWu.checkSkill(id)) {
                return true;
            }
        }
        if (Model_BaoWu.baoWuWearArr().length > 0) {
            return true;
        }
        return false;
    };
    /**通过激活材料(升星材料)判断使用该材料的宝物是否已经满星 */
    Model_BaoWu.isFullByMat = function (vo) {
        if (this.matToBaoWu[vo.id]) {
            var data = this.matToBaoWu[vo.id];
            return data.starLv >= data.starMax;
        }
        else {
            var datas = this.baowuArr;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var id = Number(data.costArr[0][1]);
                this.matToBaoWu[id] = data;
                if (id == vo.id) {
                    return data.starLv >= data.starMax;
                }
            }
        }
        return false;
    };
    Model_BaoWu.equipBWIDArr = [0, 0];
    Model_BaoWu.level = 1;
    Model_BaoWu.exp = 0;
    Model_BaoWu.drugNum = 0;
    /**宝物培养丹ID */
    Model_BaoWu.itemId = 411003;
    /**宝物属性丹ID */
    Model_BaoWu.drugId = 412005;
    /**宝物属性丹索引 */
    Model_BaoWu.drugIndex = 5;
    /**属性丹吞噬上限 */
    Model_BaoWu.drugMax = 0;
    /**宝物培养丹 */
    Model_BaoWu.DAN_LEVELUP = 411003;
    Model_BaoWu.DAN_EXP = 10;
    Model_BaoWu._baowuArr = [];
    /**材料到宝物的映射 */
    Model_BaoWu.matToBaoWu = {};
    return Model_BaoWu;
}(BaseModel));
__reflect(Model_BaoWu.prototype, "Model_BaoWu");
