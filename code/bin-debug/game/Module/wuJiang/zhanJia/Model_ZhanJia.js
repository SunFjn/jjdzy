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
var Model_ZhanJia = (function (_super) {
    __extends(Model_ZhanJia, _super);
    function Model_ZhanJia() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**	801	 获取战甲信息 */
    Model_ZhanJia.prototype.CGGetZhanJiaUi = function () {
        var ba = this.getBytes();
        this.sendSocket(801, ba);
    };
    /**	803	 战甲升阶 B:升阶方式0一颗 1一键 */
    Model_ZhanJia.prototype.CGUpJie = function (type) {
        var ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(803, ba);
    };
    /**	805	CG 战甲激活/升星 B:战甲类型 */
    Model_ZhanJia.prototype.CGZhanJiaStar = function (type) {
        var ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(805, ba);
    };
    /**	807	 激活/升阶战甲套装 B:激活/升阶套装 */
    Model_ZhanJia.prototype.CGUpZJTZ = function (type) {
        var ba = this.getBytes();
        ba.writeByte(type);
        this.sendSocket(807, ba);
    };
    /**	809	CG 激活/升阶战甲技能 B:位置id  */
    Model_ZhanJia.prototype.CGJihuoSkill = function (pos) {
        var ba = this.getBytes();
        ba.writeByte(pos);
        this.sendSocket(809, ba);
    };
    /**	811	CG 使用丹药 B:丹药索引 3属性丹 4资质丹B:使用方式 0 一颗 1一键  */
    Model_ZhanJia.prototype.CGUseDan = function (drug_type, type) {
        var ba = this.getBytes();
        ba.writeByte(drug_type);
        ba.writeByte(type);
        this.sendSocket(811, ba);
    };
    Model_ZhanJia.prototype.CGChange = function (type) {
        var ba = this.getBytes();
        ba.writeInt(type);
        this.sendSocket(813, ba);
    };
    //协议处理
    Model_ZhanJia.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(802, this.GCGetZhanJiaUi, this);
        mgr.regHand(804, this.GCUpJie, this);
        mgr.regHand(806, this.GCZhanJiaStar, this);
        mgr.regHand(808, this.GCUpZJTZ, this);
        mgr.regHand(810, this.GCJihuoSkill, this);
        mgr.regHand(812, this.GCUseDan, this);
        mgr.regHand(814, this.GCChange, this);
    };
    /**打开战甲ui返回 I:战甲阶数I:战甲经验[I:战甲类型I:战甲星级][I:已经激活的套装id][I:技能id0表示没有激活]*/
    Model_ZhanJia.prototype.GCGetZhanJiaUi = function (self, data) {
        Model_ZhanJia.jieShu = data.readInt();
        Model_ZhanJia.exp = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var star = data.readInt();
            Model_ZhanJia.zhanjiaStar[id] = star;
        }
        Model_ZhanJia.actiSuitArr = [];
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            Model_ZhanJia.actiSuitArr.push(data.readInt());
        }
        Model_ZhanJia.skillArr = [];
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            Model_ZhanJia.skillArr.push(data.readInt());
        }
        Model_ZhanJia.danShuxing = data.readInt();
        var danZizhi = data.readInt();
        Model_ZhanJia.hasData = true;
        GGlobal.control.notify(Enum_MsgType.ZHANJIA_OPENUI_UPDATE);
        GGlobal.control.notify(Enum_MsgType.ZHANJIA_CHECK_NOTICE);
    };
    /**升阶返回 B:0成功 1失败I:战甲等阶I:战甲经验除*/
    Model_ZhanJia.prototype.GCUpJie = function (self, data) {
        var result = data.readByte();
        VZhiShengDan.invalNum = 2;
        if (result == 0) {
            Model_ZhanJia.jieShu = data.readInt();
            Model_ZhanJia.exp = data.readInt();
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_UPJIE_UPDATE);
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("升阶失败");
        }
    };
    /**战甲升星返回 B:0成功 1失败 B:战甲类型*/
    Model_ZhanJia.prototype.GCZhanJiaStar = function (self, data) {
        var result = data.readByte();
        var id = data.readByte();
        var star = Model_ZhanJia.zhanjiaStar[id];
        if (star == null) {
            star = 0;
        }
        if (result == 0) {
            Model_ZhanJia.zhanjiaStar[id] = star + 1;
            if (star == 0) {
                // Model_ZhanJia.showType = id;
            }
            for (var i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
                if (Model_ZhanJia.zhanJiaArr[i].id == id) {
                    if (star >= Model_ZhanJia.zhanJiaArr[i].star) {
                        GGlobal.control.notify(UIConst.JUEXING);
                    }
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_UP_STAR);
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_CHECK_NOTICE);
        }
        else {
            if (star == 0) {
                ViewCommonWarn.text("战甲激活失败");
            }
            else {
                ViewCommonWarn.text("战甲升星失败");
            }
        }
    };
    /**激活/升阶套装id B:0成功 1失败B:套装idI:等阶*/
    Model_ZhanJia.prototype.GCUpZJTZ = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var id = data.readByte();
            var level = data.readInt();
            Model_ZhanJia.actiSuitArr[id - 1] = level;
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_UP_SUIT);
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("操作失败");
        }
    };
    /**激活/升级技能返回 B:0成功 1失败B:位置I:技能id*/
    Model_ZhanJia.prototype.GCJihuoSkill = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var pos = data.readByte();
            var id = data.readInt();
            Model_ZhanJia.skillArr[pos - 1] = id;
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_UP_SKILL, [Model_BySys.ZHAN_JIA, id]);
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("升级技能失败");
        }
    };
    /**使用丹药返回 B:0成功 1失败I:战甲属性丹数量I:战甲资质丹数量*/
    Model_ZhanJia.prototype.GCUseDan = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_ZhanJia.danShuxing = data.readInt();
            var danZizhi = data.readInt();
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_OPENUI_UPDATE);
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_CHECK_NOTICE);
        }
        else {
            ViewCommonWarn.text("使用丹药失败");
        }
    };
    /**更换战甲*/
    Model_ZhanJia.prototype.GCChange = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            // Model_ZhanJia.showType = data.readInt()
            GGlobal.control.notify(Enum_MsgType.ZHANJIA_CHANGE);
        }
        else {
            ViewCommonWarn.text("更换战甲失败");
        }
    };
    Object.defineProperty(Model_ZhanJia, "zhanJiaArr", {
        get: function () {
            if (Model_ZhanJia._zhanJiaArr == null) {
                Model_ZhanJia._zhanJiaArr = [];
                for (var keys in Config.clothes_212) {
                    Model_ZhanJia._zhanJiaArr.push(Config.clothes_212[keys]);
                }
            }
            return Model_ZhanJia._zhanJiaArr;
        },
        enumerable: true,
        configurable: true
    });
    // public static get zhanJiaSuitArr(): Array<number> {
    // 	if (Model_ZhanJia._zhanJiaSuitArr == null) {
    // 		Model_ZhanJia._zhanJiaSuitArr = [];
    // 		var suitIdObj = {};
    // 		for (let keys in Config.clothessuit_212) {
    // 			var suitId = Math.floor(Number(keys) / 1000);
    // 			if (suitIdObj[suitId] == null) {
    // 				Model_ZhanJia._zhanJiaSuitArr.push(Number(keys));
    // 				suitIdObj[suitId] = suitId;
    // 			}
    // 		}
    // 	}
    // 	return Model_ZhanJia._zhanJiaSuitArr
    // }
    Model_ZhanJia.sortZhanJia = function (a, b) {
        var aQua = Model_ZhanJia.getZhanJiaQuality(a);
        var bQua = Model_ZhanJia.getZhanJiaQuality(b);
        if (aQua == bQua) {
            return a.id - b.id;
        }
        else {
            return bQua - aQua;
        }
    };
    Model_ZhanJia.sortZhanJia1 = function (a, b) {
        var aQua = Model_ZhanJia.getZhanJiaQuality(a);
        var bQua = Model_ZhanJia.getZhanJiaQuality(b);
        if (aQua == bQua) {
            return a.id - b.id;
        }
        else {
            return aQua - bQua;
        }
    };
    //套装战力
    Model_ZhanJia.getPowerSuit = function () {
        var power = 0;
        if (Model_ZhanJia.actiSuitArr) {
            for (var i = 0; i < Model_ZhanJia.actiSuitArr.length; i++) {
                var suitId = Model_ZhanJia.actiSuitArr[i];
                var suit = Config.clothessuit_212[suitId];
                if (suit) {
                    power += suit ? suit.power : 0;
                }
            }
        }
        return power;
    };
    //单一战甲升星战力
    Model_ZhanJia.getPowerStarVo = function (vo) {
        var power = 0;
        var star = Model_ZhanJia.zhanjiaStar[vo.id];
        if (star) {
            power += Config.clothesstar_212[vo.pinzhi * 1000 + star].power;
        }
        return power;
    };
    //升星战力
    Model_ZhanJia.getPowerStar = function () {
        var power = 0;
        for (var i = 0; i < Model_ZhanJia.zhanJiaArr.length; i++) {
            var vo = Model_ZhanJia.zhanJiaArr[i];
            power += Model_ZhanJia.getPowerStarVo(vo);
        }
        return power;
    };
    //战甲技能升级
    Model_ZhanJia.checkSkill = function (id) {
        var obj = Config.clotheslvskill_212[id];
        if (obj.next == 0) {
            return false;
        }
        else {
            var consumeArr = ConfigHelp.SplitStr(obj.consume);
            var hasCont = Model_Bag.getItemCount(Number(consumeArr[0][1]));
            if (Model_ZhanJia.jieShu >= obj.lv && hasCont >= Number(consumeArr[0][2])) {
                return true;
            }
        }
        return false;
    };
    //战甲一键升阶
    Model_ZhanJia.checkOneKeyUp = function () {
        var count = Model_Bag.getItemCount(Model_ZhanJia.DAN_LEVELUP);
        var exp = count * Model_ZhanJia.DAN_EXP;
        var clotheslv = Config.clotheslv_212[Model_ZhanJia.jieShu];
        if (clotheslv.exp > 0) {
            if (exp + Model_ZhanJia.exp >= clotheslv.exp) {
                return true;
            }
        }
        return false;
    };
    //战甲升阶
    Model_ZhanJia.checkUpJie = function () {
        if (Model_ZhanJia.checkOneKeyUp()) {
            return true;
        }
        //战甲技能升级
        var len = Model_ZhanJia.skillArr.length;
        for (var i = 0; i < len; i++) {
            var id = Model_ZhanJia.skillArr[i];
            if (Model_ZhanJia.checkSkill(id)) {
                return true;
            }
        }
        if (Model_ZhanJia.zhanJWearArr().length > 0) {
            return true;
        }
        return false;
    };
    Model_ZhanJia.checkStarVo = function (zhanJia) {
        var star = Model_ZhanJia.zhanjiaStar[zhanJia.id];
        if (star && star >= zhanJia.star) {
            return false; //满星
        }
        //升星道具
        var consume = ConfigHelp.SplitStr(zhanJia.item);
        var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
        if (hasCount >= Number(consume[0][2])) {
            return true;
        }
        return false;
    };
    Model_ZhanJia.checkUpStar = function () {
        //激活升星
        var len = Model_ZhanJia.zhanJiaArr.length;
        for (var i = 0; i < len; i++) {
            var zhanJia = Model_ZhanJia.zhanJiaArr[i];
            if (Model_ZhanJia.checkStarVo(zhanJia)) {
                return true;
            }
        }
        //吞噬丹
        var maxCount0 = 0;
        var maxCount1 = 0;
        for (var keys in Model_ZhanJia.zhanjiaStar) {
            var star = Model_ZhanJia.zhanjiaStar[keys];
            var zhanjia = Config.clothes_212[keys];
            maxCount0 += zhanjia.max1 * star;
            maxCount1 += zhanjia.max2 * star;
        }
        var count = Model_Bag.getItemCount(Model_ZhanJia.DAN_SHUXING);
        if (count > 0 && Model_ZhanJia.danShuxing < maxCount0) {
            return true;
        }
        // count = Model_Bag.getItemCount(Model_ZhanJia.DAN_ZIZHI)
        // if (count > 0 && Model_ZhanJia.danZizhi < maxCount1) {
        // 	return true;
        // }
        return false;
    };
    // public static checkSuitVo(suitId): boolean {
    // 	let suit = Config.clothessuit_212[suitId];
    // 	if (!suit) {
    // 		return false;
    // 	}
    // 	if (suit.condition == "0") {//已满级
    // 		return false;
    // 	}
    // 	//条件
    // 	let reachBoo = true;
    // 	let conditionArr = ConfigHelp.SplitStr(suit.condition)
    // 	for (let j = 0; j < conditionArr.length; j++) {
    // 		let $id = Number(conditionArr[j][0])
    // 		let $star = Number(conditionArr[j][1])
    // 		let reachStar = Model_ZhanJia.zhanjiaStar[$id]
    // 		if (reachStar == null || reachStar < $star) {
    // 			reachBoo = false;
    // 			break;
    // 		}
    // 	}
    //消耗
    // let consume = ConfigHelp.SplitStr(suit.consume)
    // let needCount = Number(consume[0][2])
    // let hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
    // if (hasCount >= needCount && reachBoo) {
    // 	return true;
    // }
    // 	return false;
    // }
    Model_ZhanJia.checkSuit = function () {
        //套装
        var len = Model_ZhanJia.actiSuitArr.length;
        for (var i = 0; i < len; i++) {
            var suitId = Model_ZhanJia.actiSuitArr[i];
            if (Model_BySys.checkSuitVo(suitId, Model_BySys.JIB_ZHANJIA)) {
                return true;
            }
        }
        return false;
    };
    Model_ZhanJia.checkRed = function () {
        if (Model_ZhanJia.checkUpJie()) {
            return true;
        }
        if (Model_ZhanJia.checkUpStar()) {
            return true;
        }
        if (Model_ZhanJia.checkSuit()) {
            return true;
        }
        return false;
    };
    Model_ZhanJia.getZhanJiaQuality = function (v) {
        if (v == null) {
            return 1;
        }
        if (v.quality == null) {
            var itemArr = ConfigHelp.SplitStr(v.item);
            var quality = Config.daoju_204[itemArr[0][1]].quality;
            v.quality = quality;
        }
        return v.quality;
    };
    //	获取可以穿的武将装备
    Model_ZhanJia.zhanJWearArr = function () {
        var arr = Model_Bag.filterEquips(Model_Bag.filterZhanJEquip, null);
        var d = Model_player.voMine.equipData;
        var sendArr = {};
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            if (Model_ZhanJia.jieShu < equ.jie) {
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
        for (var i = 50; i < 54; i++) {
            if (sendArr[i]) {
                a.push(sendArr[i]);
            }
        }
        return a;
    };
    Model_ZhanJia.checkAndShow = function (id) {
        var arr = this.zhanJiaArr;
        if (arr == null || arr.length == 0)
            return;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            var star = Model_ZhanJia.zhanjiaStar[vo.id];
            if (!star) {
                var costArr = ConfigHelp.SplitStr(vo.item);
                if (Number(costArr[0][1]) == id) {
                    var vzj = new Vo_ZhanJia();
                    vzj.cfg = vo;
                    VTipBWJiHuo.add(vzj);
                    break;
                }
            }
        }
    };
    /**通过激活材料(升星材料)判断使用该材料的战甲是否已经满星 */
    Model_ZhanJia.isFullByMat = function (vo) {
        if (this.matToZhanJia[vo.id]) {
            var data = this.matToZhanJia[vo.id];
            return Model_ZhanJia.zhanjiaStar[data.id] >= data.star;
        }
        else {
            var datas = Model_ZhanJia.zhanJiaArr;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var costArr = JSON.parse(data.item);
                if (costArr) {
                    var id = Number(costArr[0][1]);
                    this.matToZhanJia[data.id] = data;
                    if (id == vo.id) {
                        return Model_ZhanJia.zhanjiaStar[data.id] >= data.star;
                    }
                }
            }
        }
        return false;
    };
    /**	战甲培养丹 */
    Model_ZhanJia.DAN_LEVELUP = 411002;
    Model_ZhanJia.DAN_EXP = 10;
    /**	战甲属性丹 加属性低*/
    Model_ZhanJia.DAN_SHUXING = 412003;
    Model_ZhanJia.DRUG_SHUXING = 3;
    /**	战甲资质丹 加属性高*/
    // public static DAN_ZIZHI = 412004
    // public static DRUG_ZIZHI = 4
    /**	战甲技能书*/
    Model_ZhanJia.SKILL_BOOK = 414002;
    /**	战甲套装升级消耗*/
    Model_ZhanJia.SUIT_STONE = 410012;
    /**	战甲升星最高等级*/
    // public static STAR_MAX = 20
    /**	战甲信息*/
    Model_ZhanJia.jieShu = 1;
    Model_ZhanJia.exp = 0;
    Model_ZhanJia.zhanjiaStar = {};
    Model_ZhanJia.actiSuitArr = [];
    Model_ZhanJia.skillArr = [];
    /**材料到战甲的映射 */
    Model_ZhanJia.matToZhanJia = {};
    return Model_ZhanJia;
}(BaseModel));
__reflect(Model_ZhanJia.prototype, "Model_ZhanJia");
