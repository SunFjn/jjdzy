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
var Model_DuanZao = (function (_super) {
    __extends(Model_DuanZao, _super);
    function Model_DuanZao() {
        return _super.call(this) || this;
    }
    Model_DuanZao.getDuanZaoPower = function () {
        var power = 0;
        var equipData = Model_player.voMine.equipData;
        for (var i = 0; i < Model_Equip.EQUIPMAX; i++) {
            var vo = equipData[i];
            if (vo) {
                power += Config.dzqianghua_209[vo.qh].power;
                var len = vo.bs.length;
                for (var i_1 = 0; i_1 < len; i_1++) {
                    if (vo.bs[i_1] > 0) {
                        power += Config.dzgem_209[vo.bs[i_1]].power;
                    }
                }
                power += Math.floor(vo.basePower * Config.dzstar_209[vo.starLv].addition / 100000);
                power += Config.dzsoul_209[vo.zhuHunLv].power;
                for (var i_2 = 0; i_2 < Model_DuanZao.suitArr.length; i_2++) {
                    var suitLv = Model_DuanZao.suitArr[i_2];
                    if (suitLv > 0 && i_2 == 0) {
                        power += Config.dzqianghuasuit_209[suitLv].power;
                    }
                    else if (suitLv > 0 && i_2 == 1) {
                        power += Config.dzgemsuit_209[suitLv].power;
                    }
                    else if (suitLv > 0 && i_2 == 2) {
                        power += Config.dzstarsuit_209[suitLv].power;
                    }
                    var count = Model_DuanZao.drugArr[i_2];
                    if (count > 0) {
                        power += Config.dzinsoul_209[i_2 + 1].power * count;
                    }
                }
            }
        }
        return power;
    };
    /**获取升星总等级 */
    Model_DuanZao.getStarLv = function () {
        var level = 0;
        var equipData = Model_player.voMine.equipData;
        for (var i = 0; i < Model_Equip.EQUIPMAX; i++) {
            var vo = equipData[i];
            if (vo) {
                level += vo.starLv;
            }
        }
        return level;
    };
    Object.defineProperty(Model_DuanZao, "checkStarMinLv", {
        /**获取升星最低等级装备 */
        get: function () {
            var level = 0;
            var equipData = Model_player.voMine.equipData;
            for (var i = 0; i < Model_Equip.EQUIPMAX; i++) {
                var vo = equipData[i];
                if (i == 0) {
                    if (vo) {
                        level = vo.starLv;
                    }
                }
                else {
                    if (vo) {
                        if (vo.starLv < level)
                            level = vo.starLv;
                    }
                    else {
                        level = 0;
                    }
                }
            }
            return level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model_DuanZao, "checkStrengMinLv", {
        /**获取强化最低等级 */
        get: function () {
            var level = 0;
            var equipData = Model_player.voMine.equipData;
            for (var i = 0; i < Model_Equip.EQUIPMAX; i++) {
                var vo = equipData[i];
                if (i == 0) {
                    if (vo) {
                        level = vo.qh;
                    }
                }
                else {
                    if (vo) {
                        if (vo.qh < level)
                            level = vo.qh;
                    }
                    else {
                        level = 0;
                    }
                }
            }
            return level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model_DuanZao, "totStrengLv", {
        /**获取强化总等级 */
        get: function () {
            var level = 0;
            var equipData = Model_player.voMine.equipData;
            for (var key in equipData) {
                if (Model_Equip.isEquip(parseInt(key))) {
                    var vo = equipData[key];
                    level += vo.qh;
                }
            }
            return level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model_DuanZao, "totGemLv", {
        /**获取宝石总等级 */
        get: function () {
            var level = 0;
            var equipData = Model_player.voMine.equipData;
            for (var key in equipData) {
                if (Model_Equip.isEquip(parseInt(key))) {
                    var vo = equipData[key];
                    level += vo.gemLv;
                }
            }
            return level;
        },
        enumerable: true,
        configurable: true
    });
    Model_DuanZao.getZhuHunLv = function () {
        var equipData = Model_player.voMine.equipData;
        var zhuHunMinLV = 0;
        var index = 0;
        for (var key in equipData) {
            if (Model_Equip.isEquip(parseInt(key))) {
                var vo = equipData[key];
                if (index == 0) {
                    zhuHunMinLV = vo.zhuHunLv;
                }
                else if (vo.zhuHunLv < zhuHunMinLV) {
                    zhuHunMinLV = vo.zhuHunLv;
                }
                index++;
            }
        }
        return zhuHunMinLV;
    };
    Model_DuanZao.checkShiHunNotice = function (type) {
        var cfg = Config.dzinsoul_209[type];
        var index = 0;
        var index1 = 0;
        var index2 = 0;
        var arr = JSON.parse(cfg.num);
        var itemArr = JSON.parse(cfg.consume);
        var itemID = itemArr[0][1];
        var num = Model_Bag.getItemCount(itemID);
        var zhuHunMinLV = Model_DuanZao.getZhuHunLv();
        if (zhuHunMinLV < arr[0][0]) {
            index1 = arr[0][0];
            index = arr[0][1];
        }
        else {
            index2++;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][0] <= zhuHunMinLV) {
                    index1 = arr[i][0];
                    index = arr[i][1];
                }
            }
        }
        if (Model_DuanZao.drugArr[type - 1] >= index || index2 == 0) {
            return false;
        }
        else {
            return num > 0;
        }
    };
    Model_DuanZao.checkZhuHunGridNotice = function (vo) {
        var exp = 0;
        for (var i = 0; i < Model_DuanZao.itemIDArr.length; i++) {
            var num = Model_Bag.getItemCount(Model_DuanZao.itemIDArr[i]);
            if (num > 0)
                exp += Model_DuanZao.expArr[i] * num;
        }
        var cfg = Config.dzsoul_209[vo.zhuHunLv];
        if (cfg.exp > 0 && vo.zhuHunExp + exp >= cfg.exp) {
            return true;
        }
        return false;
    };
    Model_DuanZao.checkUpStarTabNotice = function () {
        var equipData = Model_player.voMine.equipData;
        var isShow = false;
        for (var key in equipData) {
            if (Model_Equip.isEquip(parseInt(key)))
                isShow = Model_DuanZao.checkUpStarGridNotice(equipData[key]);
            if (isShow)
                return isShow;
        }
        if (!isShow)
            isShow = Model_DuanZao.checkStarSuitNotice();
        return isShow;
    };
    Model_DuanZao.checkStarSuitNotice = function () {
        var suitLv = Model_DuanZao.suitArr[2];
        if (suitLv > 0) {
            var nextCfg = Config.dzstarsuit_209[suitLv + 1];
            if (nextCfg) {
                return Model_DuanZao.checkStarMinLv >= nextCfg.yaoqiu;
            }
            else {
                return false;
            }
        }
        else {
            var cfg = Config.dzstarsuit_209[1];
            return Model_DuanZao.checkStarMinLv >= cfg.yaoqiu;
        }
    };
    Model_DuanZao.checkUpStarGridNotice = function (vo) {
        var cfg = Config.dzstar_209[vo.starLv];
        if (cfg.consume != "0") {
            var costArr = JSON.parse(cfg.consume);
            var costArr1 = JSON.parse(cfg.consume1);
            var num = Model_Bag.getItemCount(costArr[0][1]);
            if (num >= costArr[0][2]) {
                return true;
            }
            var num1 = Model_Bag.getItemCount(costArr1[0][1]);
            if (num1 >= costArr1[0][2]) {
                return true;
            }
        }
        return false;
    };
    /**宝石标签页红点显示 */
    Model_DuanZao.stoneTabShowNotices = function () {
        var equipData = Model_player.voMine.equipData;
        var isShow = false;
        for (var key in equipData) {
            if (Model_Equip.isEquip(parseInt(key))) {
                isShow = Model_DuanZao.gridShowNotice_Stone(equipData[key]);
                if (isShow)
                    return isShow;
            }
        }
        if (!isShow)
            isShow = Model_DuanZao.checkGemSuitNotice();
        return isShow;
    };
    Model_DuanZao.checkKeyBtNotice = function () {
        var equipData = Model_player.voMine.equipData;
        var ret = false;
        for (var key in equipData) {
            if (Model_Equip.isEquip(parseInt(key))) {
                var vo = equipData[key];
                for (var i = 0; i < vo.bs.length; i++) {
                    var value = Model_DuanZao.gemShowNotice(vo.bs[i], i);
                    if (value == 1)
                        return ret = true;
                }
            }
        }
        return ret;
    };
    Model_DuanZao.checkGemSuitNotice = function () {
        var suitLv = Model_DuanZao.suitArr[1];
        if (suitLv > 0) {
            var nextCfg = Config.dzgemsuit_209[suitLv + 1];
            if (nextCfg) {
                return Model_DuanZao.totGemLv >= nextCfg.lv;
            }
            else {
                return false;
            }
        }
        else {
            var cfg = Config.dzgemsuit_209[1];
            return Model_DuanZao.totGemLv >= cfg.lv;
        }
    };
    /**准备格子显示红点 --宝石标签页 */
    Model_DuanZao.gridShowNotice_Stone = function (vo) {
        for (var i = 0; i < vo.bs.length; i++) {
            var ret = Model_DuanZao.gemShowNotice(vo.bs[i], i);
            if (ret)
                return ret > 0;
        }
        return false;
    };
    /**宝石格子显示红点 */
    Model_DuanZao.gemShowNotice = function (gemId, pos) {
        if (gemId > 0) {
            var arr = Model_Bag.gemList;
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var vo = arr[i];
                var cfg = Config.dzgem_209[gemId];
                var cfg1 = Config.dzgem_209[vo.id];
                if (cfg.next > 0 && cfg.position == cfg1.position) {
                    if (cfg1.lv > cfg.lv) {
                        return 1;
                    }
                    else if (cfg1.lv == cfg.lv && vo.count > 0) {
                        return 2;
                    }
                }
            }
        }
        else {
            var arr = Model_Bag.gemList;
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var vo = arr[i];
                var cfg = Config.dzgem_209[vo.id];
                if (cfg.position == pos + 1) {
                    return 1;
                }
            }
        }
        return 0;
    };
    Model_DuanZao.getStoneHandle = function (vo, self) {
        if (vo.type == 4 || vo.type == 5 || vo.type == 6 || vo.type == 7) {
            return true;
        }
        return false;
    };
    /**强化标签 */
    Model_DuanZao.strengTabShowNotice = function () {
        var equipData = Model_player.voMine.equipData;
        var isShow = false;
        for (var key in equipData) {
            if (Model_Equip.isEquip(parseInt(key)))
                isShow = Model_DuanZao.gridShowNotice_Streng(equipData[key]);
            if (isShow)
                return isShow;
        }
        if (!isShow)
            isShow = Model_DuanZao.checkStrengSuitNotice();
        return isShow;
    };
    Model_DuanZao.checkStrengSuitNotice = function () {
        var strengLv = Model_DuanZao.suitArr[0];
        if (strengLv > 0) {
            var nextCfg = Config.dzqianghuasuit_209[strengLv + 1];
            if (nextCfg) {
                return Model_DuanZao.checkStrengMinLv >= nextCfg.yaoqiu;
            }
            else {
                return false;
            }
        }
        else {
            var cfg = Config.dzqianghuasuit_209[1];
            return Model_DuanZao.checkStrengMinLv >= cfg.yaoqiu;
        }
    };
    Model_DuanZao.checkKeyStrengNotice = function () {
        var equipData = Model_player.voMine.equipData;
        var isShow = false;
        for (var key in equipData) {
            if (Model_Equip.isEquip(parseInt(key)))
                isShow = Model_DuanZao.gridShowNotice_Streng(equipData[key]);
            if (isShow)
                return isShow;
        }
        return isShow;
    };
    /**强化格子 */
    Model_DuanZao.gridShowNotice_Streng = function (vo) {
        var cfg = Config.dzqianghua_209[vo.qh];
        if (cfg.consume != "0") {
            var gridArr = JSON.parse(cfg.consume);
            var num = Model_Bag.getItemCount(gridArr[1][1]);
            if (Model_player.voMine.tongbi >= gridArr[0][2] && num >= gridArr[1][2]) {
                return true;
            }
        }
        return false;
    };
    /**551  CG 获取装备锻造信息   */
    Model_DuanZao.prototype.CG_GET_EQUIPMESSAGE = function () {
        var ba = new BaseBytes();
        this.sendSocket(551, ba);
    };
    /**553 CG 强化 B:要强化的位置   */
    Model_DuanZao.prototype.CG_DUANZAO_STRENG = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(553, ba);
    };
    /**555 CG 宝石镶嵌 B:装备部位B:宝石位置I:宝石id    */
    Model_DuanZao.prototype.CG_DUANZAO_STONE_EQUIP = function (type, part, stoneId) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeByte(part);
        ba.writeInt(stoneId);
        this.sendSocket(555, ba);
    };
    /**557 CG 拆除宝石 B:装备位置B:宝石位置I:宝石id    */
    Model_DuanZao.prototype.CG_DUANZAO_STONE_DEL = function (type, part, stoneId) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeByte(part);
        ba.writeInt(stoneId);
        this.sendSocket(557, ba);
    };
    /**559 CG 在背包内合成 I:目标宝石id     */
    Model_DuanZao.prototype.CG_DUANZAO_STONEID_HECHENG = function (stoneId) {
        var ba = new BaseBytes();
        ba.writeInt(stoneId);
        this.sendSocket(559, ba);
    };
    /**561 CG 合成宝石在装备上 I:宝石idB:装备位置B:宝石类型     */
    Model_DuanZao.prototype.CG_DUANZAO_STONEID_HECHENG_BYEQUIP = function (stoneId, type, stonetype) {
        var ba = new BaseBytes();
        ba.writeInt(stoneId);
        ba.writeByte(type);
        ba.writeByte(stonetype);
        this.sendSocket(561, ba);
    };
    /**563 CG 一键镶嵌    */
    Model_DuanZao.prototype.CG_DUANZAO_STONEID_KEYXQ = function (part) {
        var ba = new BaseBytes();
        ba.writeByte(part);
        this.sendSocket(563, ba);
    };
    /**565 CG 升星 B:装备位置      */
    Model_DuanZao.prototype.CG_DUANZAO_UPGRADESTAR = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(565, ba);
    };
    /**567 CG 铸魂单次铸魂 B:铸魂类型0 1 2B:部位       */
    Model_DuanZao.prototype.CG_DUANZAO_ZHUHUN_ONE = function (type, part) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeByte(part);
        this.sendSocket(567, ba);
    };
    /**569 CG 噬魂 B:第几种噬魂B:1单次噬魂 2一键噬魂       */
    Model_DuanZao.prototype.CG_DUANZAO_SHIHUN = function (type, type1) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeByte(type1);
        this.sendSocket(569, ba);
    };
    /**571  CG 一键强化     */
    Model_DuanZao.prototype.CG_DUANZAO_KEYSTRENG = function () {
        var ba = new BaseBytes();
        this.sendSocket(571, ba);
    };
    /**573 CG 一键铸魂 B:部位B:方式低 中 高   */
    Model_DuanZao.prototype.CG_DUANZAO_KEY_ZHUHUN = function (type, num) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeByte(num);
        this.sendSocket(573, ba);
    };
    /**575 CG 一键合成宝石 I:宝石系统id   */
    Model_DuanZao.prototype.CG_DUANZAO_KEY_HECHENG = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(575, ba);
    };
    /**577 套装升阶 B:1强化套装2宝石套装3升星套装    */
    Model_DuanZao.prototype.CG_DUANZAO_SUIT_UPGRADE = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(577, ba);
    };
    /**579 完美升星 B:装备部位     */
    Model_DuanZao.prototype.CG_DUANZAO_UPSTAR_PERFECT = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(579, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_DuanZao.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(552, this.GC_GET_EQUIPMESSAGE, this);
        wsm.regHand(554, this.GC_DUANZAO_STRENG, this);
        wsm.regHand(556, this.GC_DUANZAO_STONE_EQUIP, this);
        wsm.regHand(558, this.GC_DUANZAO_STONE_DEL, this);
        wsm.regHand(560, this.GC_DUANZAO_STONEID_HECHENG, this);
        wsm.regHand(562, this.GC_DUANZAO_STONEID_HECHENG_BYEQUIP, this);
        wsm.regHand(564, this.GC_DUANZAO_STONEID_KEYXQ, this);
        wsm.regHand(566, this.GC_DUANZAO_UPGRADESTAR, this);
        wsm.regHand(568, this.GC_DUANZAO_ZHUHUN_ONE, this);
        wsm.regHand(570, this.GC_DUANZAO_SHIHUN, this);
        wsm.regHand(572, this.GC_DUANZAO_KEYSTRENG, this);
        wsm.regHand(574, this.GC_DUANZAO_KEY_ZHUHUN, this);
        wsm.regHand(576, this.GC_DUANZAO_KEY_HECHENG, this);
        wsm.regHand(578, this.GC_DUANZAO_SUIT_UPGRADE, this);
        wsm.regHand(580, this.GC_DUANZAO_UPSTAR_PERFECT, this);
        wsm.regHand(582, this.GC_DUANZAO_UPSTARPOWER, this);
    };
    /**582	GC 玩家装备升星战力 I:装备升星总战力[B:装备部位I:升星战力] */
    Model_DuanZao.prototype.GC_DUANZAO_UPSTARPOWER = function (self, data) {
        Model_DuanZao.upstarPower = data.readInt();
        // for (let i = 0, len = data.readShort(); i < len; i++) {
        // 	let pos = data.readByte();
        // 	let power = data.readInt();
        // 	let equipVo = Model_Equip.getRoleEquipByPos(pos);
        // 	equipVo.upstarPower = power;
        // }
        GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
    };
    /**580 完美升星返回 B:1成功0失败B:装备部位B:星级  */
    Model_DuanZao.prototype.GC_DUANZAO_UPSTAR_PERFECT = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var starLv = data.readByte();
            var equip = Model_Equip.getRoleEquipByPos(type);
            if (equip)
                equip.starLv = starLv;
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
        }
    };
    /**578 套装升阶成功返回 B:1成功0失败B:类型B:阶数  */
    Model_DuanZao.prototype.GC_DUANZAO_SUIT_UPGRADE = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var level = data.readByte();
            Model_DuanZao.suitArr[type - 1] = level;
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
        }
    };
    /**576 GC 一键合成宝石返回 B:0成功 1失败I:宝石id  */
    Model_DuanZao.prototype.GC_DUANZAO_KEY_HECHENG = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE);
        }
    };
    /**574 GC 一键铸魂返回 B:1成功 0失败B:部位I:铸魂等级I:铸魂经验  */
    Model_DuanZao.prototype.GC_DUANZAO_KEY_ZHUHUN = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var pos = data.readByte();
            var zhuHunLv = data.readInt();
            var zhuHunExp = data.readInt();
            var vo = Model_player.voMine.equipData[pos];
            vo.zhuHunLv = zhuHunLv;
            vo.zhuHunExp = zhuHunExp;
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
        }
    };
    /**572 GC 一键强化结果影响部位 [B:部位I:等级]  */
    Model_DuanZao.prototype.GC_DUANZAO_KEYSTRENG = function (self, data) {
        var arr = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var pos = data.readByte();
            var vo = Model_player.voMine.equipData[pos];
            var qh = data.readInt();
            if (vo) {
                if (qh > vo.qh) {
                    arr.push(pos);
                }
                vo.qh = qh;
            }
        }
        GGlobal.control.notify(Enum_MsgType.DUANZAO_EFF_UPDATE, arr);
        GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
    };
    /**570 GC 噬魂结果 B:噬魂结果1成功 0失败B:位置I:数量  */
    Model_DuanZao.prototype.GC_DUANZAO_SHIHUN = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var pos = data.readByte();
            var num = data.readInt();
            Model_DuanZao.drugArr[pos - 1] = num;
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
        }
    };
    /**568 GC 铸魂返回 B:铸魂结果1成功 0失败B:部位I:铸魂等级I:铸魂经验  */
    Model_DuanZao.prototype.GC_DUANZAO_ZHUHUN_ONE = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var zhuHunLv = data.readInt();
            var zhuHunExp = data.readInt();
            var equip = Model_Equip.getRoleEquipByPos(type);
            if (equip) {
                equip.zhuHunLv = zhuHunLv;
                equip.zhuHunExp = zhuHunExp;
            }
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
        }
    };
    /**566 GC 升星返回 B:升星 1成功 0失败 2满级 3材料不足B:部位I:星级  */
    Model_DuanZao.prototype.GC_DUANZAO_UPGRADESTAR = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var starLv = data.readInt();
            var equip = Model_Equip.getRoleEquipByPos(type);
            if (equip)
                equip.starLv = starLv;
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
        }
        else if (result == 0) {
            ViewCommonWarn.text("升星失败");
        }
    };
    /**564 GC 一键装备宝石 [B:装备部位[I:宝石等级]]  */
    Model_DuanZao.prototype.GC_DUANZAO_STONEID_KEYXQ = function (self, data) {
        for (var i = 0, len1 = data.readShort(); i < len1; i++) {
            var type = data.readByte();
            var equipVo = Model_Equip.getRoleEquipByPos(type);
            var len = data.readShort();
            for (var i_3 = 0; i_3 < len; i_3++) {
                var stoneId = data.readInt();
                if (stoneId <= 0)
                    continue;
                var cfg = Config.dzgem_209[stoneId];
                equipVo.bs[cfg.position - 1] = stoneId;
            }
        }
        GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
    };
    /**562 GC 合成宝石到装备 B:1成功 0失败B:装备位置B:宝石位置I:宝石id  */
    Model_DuanZao.prototype.GC_DUANZAO_STONEID_HECHENG_BYEQUIP = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var part = data.readByte();
            var stoneId = data.readInt();
            var equipVo = Model_Equip.getRoleEquipByPos(type);
            if (equipVo)
                equipVo.bs[part - 1] = stoneId;
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
            GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, { equipVo: equipVo, stonePart: part - 1, stoneId: stoneId });
        }
    };
    /**560 GC 背包内合成返回 B:合成返回1成功 0失败I:宝石id  */
    Model_DuanZao.prototype.GC_DUANZAO_STONEID_HECHENG = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE);
        }
    };
    /**558 GC 拆宝石返回 B:1成功 0失败B:部位B:宝石部位I:宝石id  */
    Model_DuanZao.prototype.GC_DUANZAO_STONE_DEL = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var part = data.readByte();
            var stoneId = data.readInt();
            var equipVo = Model_Equip.getRoleEquipByPos(type);
            equipVo.bs[part - 1] = 0;
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
            GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, { equipVo: equipVo, stonePart: part - 1, stoneId: 0 });
        }
    };
    /**556 GC 宝石镶嵌返回 B:成功失败标志 1成功、0失败B:装备位置B:宝石位置I:宝石id  */
    Model_DuanZao.prototype.GC_DUANZAO_STONE_EQUIP = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var type = data.readByte();
            var part = data.readByte();
            var stoneId = data.readInt();
            var equipVo = Model_Equip.getRoleEquipByPos(type);
            equipVo.bs[part - 1] = stoneId;
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
            GGlobal.control.notify(Enum_MsgType.DUANZAO_STONEBAG_UPDATE, { equipVo: equipVo, stonePart: part - 1, stoneId: stoneId });
        }
    };
    /**554 GC 1成功，2 位置不对，3、已经满级，4，消耗物品不够强化返回 B:成功失败标志B:位置I:当前级别  */
    Model_DuanZao.prototype.GC_DUANZAO_STRENG = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var arr = [];
            var pos = data.readByte();
            var vo = Model_player.voMine.equipData[pos];
            vo.qh = data.readInt();
            arr = [pos];
            GGlobal.control.notify(Enum_MsgType.DUANZAO_EFF_UPDATE, arr);
            GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
        }
    };
    /**552 GC 后端返回 [B:装备部位I:强化等级[I:宝石id]宝石I:升星I:铸魂等级I:铸魂经验]角色锻造数据[I:噬魂丹数量]B:强化套装阶数B:宝石套装阶数B:升星套装阶数 */
    Model_DuanZao.prototype.GC_GET_EQUIPMESSAGE = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var pos = data.readByte();
            var vo = Model_player.voMine.equipData[pos];
            var qh = data.readInt();
            var len1 = data.readShort();
            for (var j = 0; j < len1; j++) {
                var stoneId = data.readInt();
                if (!vo || stoneId <= 0)
                    continue;
                var itemCfg = Config.daoju_204[stoneId];
                vo.bs[itemCfg.leixing - 4] = stoneId;
            }
            var starLv = data.readInt();
            var zhuHunLv = data.readInt();
            var zhuHunExp = data.readInt();
            if (vo) {
                vo.qh = qh;
                vo.starLv = starLv;
                vo.zhuHunLv = zhuHunLv;
                vo.zhuHunExp = zhuHunExp;
            }
        }
        for (var i = 0, len = data.readShort(); i < len; i++) {
            Model_DuanZao.drugArr[i] = data.readInt();
        }
        Model_DuanZao.suitArr = [data.readByte(), data.readByte(), data.readByte()];
        GGlobal.control.notify(Enum_MsgType.DUANZAO_DATA_UPDATE);
    };
    Model_DuanZao.isGetData = false;
    /***噬魂丹数量 */
    Model_DuanZao.drugArr = [0, 0, 0];
    /***套装阶数 */
    Model_DuanZao.suitArr = [0, 0, 0];
    /**铸魂道具ID */
    Model_DuanZao.itemIDArr = [410003, 410004, 410005];
    /**铸魂道具获得经验 */
    Model_DuanZao.expArr = [10, 50, 100];
    /**升星总战力 */
    Model_DuanZao.upstarPower = 0;
    return Model_DuanZao;
}(BaseModel));
__reflect(Model_DuanZao.prototype, "Model_DuanZao");
