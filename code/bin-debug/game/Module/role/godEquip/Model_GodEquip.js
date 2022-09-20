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
var Model_GodEquip = (function (_super) {
    __extends(Model_GodEquip, _super);
    function Model_GodEquip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_GodEquip.checkEquipNotice_XL = function (vo) {
        var cfg;
        if (vo) {
            cfg = Config.szxlsx_306[vo.jie];
            if (cfg.xl == 0) {
                return false;
            }
            var costArr = JSON.parse(cfg.cost);
            var costVo = VoItem.create(costArr[0][1]);
            costVo.count = costArr[0][2];
            var count = Model_Bag.getItemCount(costArr[0][1]);
            if (count >= costVo.count && !(vo.xlhp >= cfg.hp && vo.xlatk >= cfg.atk && vo.xldef >= cfg.def)) {
                return true;
            }
        }
        return false;
    };
    Model_GodEquip.getXLJie = function () {
        if (Model_GodEquip._xlJie == -1) {
            for (var keys in Config.szxlsx_306) {
                var c = Config.szxlsx_306[keys];
                if (c.xl > 0) {
                    Model_GodEquip._xlJie = c.id;
                    break;
                }
            }
        }
        return Model_GodEquip._xlJie;
    };
    Model_GodEquip.checkEquipNotice = function (pos, id) {
        var next = Model_Equip.getNextEuipLv(pos, id);
        if (!next) {
            return false;
        }
        var composeArr = JSON.parse(next.compose);
        var needCount = composeArr[0][2];
        var count = Model_Bag.getItemCount(composeArr[0][1]);
        return count >= needCount;
    };
    //协议处理
    Model_GodEquip.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(356, this.GCWearShenEquip, this);
        mgr.regHand(362, this.GCUpgradeOrangeEquip, this);
        mgr.regHand(364, this.GCComposeOrange, this);
        mgr.regHand(366, this.GCDecomposeOrange, this);
        mgr.regHand(368, this.GCgetJieOrange, this);
        mgr.regHand(370, this.GCUpJieOrange, this);
        mgr.regHand(378, this.GC_GODEQUIP_XL, this);
        mgr.regHand(380, this.GC_GODEQUIP_380, this);
    };
    /**377	GC 洗练装备 I:洗练位置 */
    Model_GodEquip.prototype.CG_GODEQUIP_XL = function (pos) {
        var byte = new BaseBytes();
        byte.writeInt(pos);
        this.sendSocket(377, byte);
    };
    /**378	GC 洗练返回 B:0成功 1失败I:装备位置索引I:属性类型I:属性值 */
    Model_GodEquip.prototype.GC_GODEQUIP_XL = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("洗练成功");
            var pos = data.readInt();
            var type = data.readInt();
            var value = data.readInt();
            var role = Model_player.voMine;
            if (type == Enum_Attr.HP) {
                role.equipData[pos].xlhp = value;
            }
            else if (type == Enum_Attr.ATT) {
                role.equipData[pos].xlatk = value;
            }
            else if (type == Enum_Attr.DEF) {
                role.equipData[pos].xldef = value;
            }
            GGlobal.control.notify(Enum_MsgType.GODEQUIP_XILIAN);
        }
    };
    /**379	CG 查看神装部位洗练 */
    Model_GodEquip.prototype.CG_GODEQUIP_379 = function () {
        var byte = new BaseBytes();
        this.sendSocket(379, byte);
    };
    /**380	GC某件神装洗练返回 [I:部位[I:属性类型I:属性值]] */
    Model_GodEquip.prototype.GC_GODEQUIP_380 = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var pos = data.readInt();
            var role = Model_player.voMine;
            for (var j = 0, len1 = data.readShort(); j < len1; j++) {
                var type = data.readInt();
                var value = data.readInt();
                if (type == Enum_Attr.HP) {
                    role.equipData[pos].xlhp = value;
                }
                else if (type == Enum_Attr.ATT) {
                    role.equipData[pos].xlatk = value;
                }
                else if (type == Enum_Attr.DEF) {
                    role.equipData[pos].xldef = value;
                }
            }
        }
        GGlobal.control.notify(Enum_MsgType.GODEQUIP_XILIAN);
    };
    /**356	 穿戴神装返回 B:返回值，0成功，1不成功[L:装备唯一idI:装备系统idB:替换的位置]更换的装备信息*/
    Model_GodEquip.prototype.GCWearShenEquip = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var sid = data.readLong();
                var id = data.readInt();
                var pos = data.readByte();
                var role = Model_player.voMine;
                var vo = role.equipData[pos];
                if (!vo) {
                    vo = VoEquip.create(id);
                }
                else {
                    vo.initLib(id);
                }
                vo.sid = sid;
                vo.ownPos = pos;
                role.equipData[pos] = vo;
            }
            GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
        }
        else {
            ViewCommonWarn.text("穿戴失败");
        }
    };
    /**362
    B-B-B-L-I
    GC 神装升级返回 B:0成功，1等级不足，2材料不足，3已到最高级B:身上位置L:装备唯一idI:装备系统id */
    Model_GodEquip.prototype.GCUpgradeOrangeEquip = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var pos = data.readByte();
            var sid = data.readLong();
            var id = data.readInt();
            var role = Model_player.voMine;
            var vo = role.equipData[pos];
            if (!vo) {
                vo = VoEquip.create(id);
            }
            else {
                vo.initLib(id);
            }
            vo.sid = sid;
            vo.ownPos = pos;
            role.equipData[pos] = vo;
            GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
        }
        else if (result == 1) {
            ViewCommonWarn.text("等级不足");
        }
        else if (result == 2) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_GodEquip.GODCHIP));
        }
        else if (result == 3) {
            ViewCommonWarn.text("已升级到最高等级");
        }
    };
    /**364
    B-B-B-L-I
    GC 橙装合成返回 B:0成功，1等级不足，2材料不足，3合成评分低，4装备不能脱下B:职业B:身上位置L:装备唯一idI:装备系统id */
    Model_GodEquip.prototype.GCComposeOrange = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var pos = data.readByte();
            var sid = data.readLong();
            var id = data.readInt();
            var role = Model_player.voMine;
            var vo = VoEquip.create(id);
            vo.sid = sid;
            vo.ownPos = pos;
            role.equipData[pos] = vo;
            GGlobal.control.notify(Enum_MsgType.MSG_ROLE_EQUIP_UPDATE);
        }
        else if (result == 1) {
            ViewCommonWarn.text("等级不足");
        }
        else if (result == 2) {
            View_CaiLiao_GetPanel.show(VoItem.create(Model_GodEquip.GODCHIP));
        }
        else if (result == 3) {
            ViewCommonWarn.text("合成评分低于当前装备");
        }
        else if (result == 4) {
            ViewCommonWarn.text("背包空间不足，请前往熔炼");
        }
    };
    /**366 GC 橙装分解返回 B:0成功，1不成功L:装备唯一id */
    Model_GodEquip.prototype.GCDecomposeOrange = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var sid = data.readLong();
            Model_RongLian.fenjiePrompt(sid);
            GGlobal.control.notify(Enum_MsgType.GOD_EQUIP_DECOMPOSE);
            GGlobal.control.notify(Enum_MsgType.MSG_BAG_DECOMPOSE_RED);
        }
    };
    Model_GodEquip.prototype.GCgetJieOrange = function (self, data) {
        Model_GodEquip.GOD_JIE = data.readByte();
        Model_GodEquip.hasData = true;
        GGlobal.control.notify(Enum_MsgType.GOD_EQUIP_SUIT_JIE);
    };
    Model_GodEquip.prototype.GCUpJieOrange = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_GodEquip.GOD_JIE = data.readByte();
            GGlobal.control.notify(Enum_MsgType.GOD_EQUIP_SUIT_JIE);
        }
    };
    /**361
    B-B
    CG 身上橙装升级 B:职业B:身上位置 */
    Model_GodEquip.prototype.CGUpgradeOrangeEquip = function (pos) {
        var ba = this.getBytes();
        ba.writeByte(pos);
        this.sendSocket(361, ba);
    };
    /**合成神装 B:身上位置I:装备系统id*/
    Model_GodEquip.prototype.CGComposeOrange = function (pos, id) {
        var ba = this.getBytes();
        ba.writeByte(pos);
        ba.writeInt(id);
        this.sendSocket(363, ba);
    };
    /**橙装分解 L:装备唯一id */
    Model_GodEquip.prototype.CGDeComposeOrange = function (sid) {
        var ba = this.getBytes();
        ba.writeLong(sid);
        this.sendSocket(365, ba);
    };
    /**367	CG 获取神装阶数 */
    Model_GodEquip.prototype.CGGetJieOrange = function () {
        var ba = this.getBytes();
        this.sendSocket(367, ba);
    };
    /**369	CG 获取神装阶数 */
    Model_GodEquip.prototype.CGUpJieOrange = function () {
        var ba = this.getBytes();
        this.sendSocket(369, ba);
    };
    Model_GodEquip.GODCHIP = 410006;
    Model_GodEquip.GOD_JIE = 0;
    Model_GodEquip.hasData = false;
    Model_GodEquip._xlJie = -1;
    return Model_GodEquip;
}(BaseModel));
__reflect(Model_GodEquip.prototype, "Model_GodEquip");
