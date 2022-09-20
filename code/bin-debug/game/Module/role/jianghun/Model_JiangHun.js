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
var Model_JiangHun = (function (_super) {
    __extends(Model_JiangHun, _super);
    function Model_JiangHun() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_JiangHun.checkTabNotice = function (type) {
        var arr = Model_JiangHun.jianghunArr[type];
        var level = 0;
        var ret = false;
        for (var i = 0; i < arr.length; i++) {
            var vo = arr[i];
            if (vo.level > 0)
                level += vo.level;
            if (vo.level > 0 && vo.next > 0) {
                if (vo.exp + Model_player.voMine.hunhuo >= vo.consumeArr[0][2] && vo.next > 0) {
                    ret = true;
                    break;
                }
            }
        }
        if (!ret) {
            var cfg = Config.genteam_006[Model_JiangHun.suitIdArr[type]];
            if (cfg.next > 0 && level >= Config.genteam_006[cfg.next].need) {
                ret = true;
            }
        }
        return ret;
    };
    Model_JiangHun.jiangHunLvByType = function (type) {
        var len = Model_JiangHun.jianghunArr[type].length;
        var level = 0;
        for (var i = 0; i < len; i++) {
            var vo = Model_JiangHun.jianghunArr[type - 1][i];
            if (vo.isJiHuo) {
                level += vo.level;
            }
        }
        return level;
    };
    Object.defineProperty(Model_JiangHun, "jianghunArr", {
        get: function () {
            if (Model_JiangHun._jiangHunArr.length <= 0) {
                for (var key in Config.general_006) {
                    var vo = Vo_JiangHun.create(parseInt(key));
                    if (!Model_JiangHun._jiangHunArr[vo.type - 1]) {
                        Model_JiangHun._jiangHunArr[vo.type - 1] = [];
                    }
                    Model_JiangHun._jiangHunArr[vo.type - 1].push(vo);
                }
            }
            return Model_JiangHun._jiangHunArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_JiangHun.sortJiangHun = function (a, b) {
        return a.ID - b.ID;
    };
    /**1151  打开将魂   */
    Model_JiangHun.prototype.CG_OPEN_JIANGHUN = function () {
        var ba = new BaseBytes();
        this.sendSocket(1151, ba);
    };
    /**1153 升级将魂 I:将魂id    */
    Model_JiangHun.prototype.CG_JIANGHUN_UP = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1153, ba);
    };
    /**1155 套装升阶 I:套装id     */
    Model_JiangHun.prototype.CG_JIANGHUN_SUIT = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1155, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_JiangHun.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(1152, this.GC_OPEN_JIANGHUN, this);
        wsm.regHand(1154, this.GC_JIANGHUN_UP, this);
        wsm.regHand(1156, this.GC_JIANGHUN_SUIT, this);
        wsm.regHand(1158, this.GC_JIANGHUN_JIHUO_UPDATE, this);
    };
    /***1158 激活新将魂 I:将魂id  */
    Model_JiangHun.prototype.GC_JIANGHUN_JIHUO_UPDATE = function (self, data) {
        var id = data.readInt();
        var cfg = Config.general_006[id];
        var len1 = Model_JiangHun.jianghunArr[cfg.type - 1].length;
        for (var j = 0; j < len1; j++) {
            var vo = Model_JiangHun.jianghunArr[cfg.type - 1][j];
            if (vo.ID == id) {
                vo.level = vo.type * 10000 + vo.quality * 1000 + 1;
                vo.exp = 0;
                break;
            }
        }
        GGlobal.control.notify(Enum_MsgType.JIANGHUN_DATA_UPDATE);
    };
    /**1156 套装升阶结果 B:0：失败，1：成功I:套装id  */
    Model_JiangHun.prototype.GC_JIANGHUN_SUIT = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var suitID = data.readInt();
            var type = Math.floor(suitID / 1000);
            Model_JiangHun.suitIdArr[type - 1] = suitID;
            GGlobal.control.notify(Enum_MsgType.JIANGHUN_DATA_UPDATE);
        }
    };
    /**1154 将魂升级结果 B:0：失败，1：成功I:将魂idI:等级索引idI:经验  */
    Model_JiangHun.prototype.GC_JIANGHUN_UP = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var level = data.readInt();
            var exp = data.readInt();
            var cfg = Config.general_006[id];
            var len1 = Model_JiangHun.jianghunArr[cfg.type - 1].length;
            for (var j = 0; j < len1; j++) {
                var vo = Model_JiangHun.jianghunArr[cfg.type - 1][j];
                if (vo.ID == id) {
                    vo.level = level;
                    vo.exp = exp;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.JIANGHUN_DATA_UPDATE);
        }
    };
    /**1152 返回将魂界面数据 [I:将魂idI:等级I:经验]将魂数据[I:套装id]套装数据  */
    Model_JiangHun.prototype.GC_OPEN_JIANGHUN = function (self, data) {
        Model_JiangHun.isFirstOpen = true;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var level = data.readInt();
            var exp = data.readInt();
            var cfg = Config.general_006[id];
            var len1 = Model_JiangHun.jianghunArr[cfg.type - 1].length;
            for (var j = 0; j < len1; j++) {
                var vo = Model_JiangHun.jianghunArr[cfg.type - 1][j];
                if (vo.ID == id) {
                    vo.level = level;
                    vo.exp = exp;
                    break;
                }
            }
        }
        var len2 = data.readShort();
        for (var i = 0; i < len2; i++) {
            var suitId = data.readInt();
            if (suitId <= 0)
                continue;
            var cfg = Config.genteam_006[suitId];
            Model_JiangHun.suitIdArr[cfg.type - 1] = suitId;
        }
        GGlobal.control.notify(Enum_MsgType.JIANGHUN_DATA_UPDATE);
    };
    Model_JiangHun.suitIdArr = [1000, 2000, 3000, 4000];
    /**开启将魂判断 */
    Model_JiangHun.openIndex = 0;
    /**当前页将魂总等级 */
    Model_JiangHun.level = 0;
    Model_JiangHun._jiangHunArr = [];
    Model_JiangHun.isFirstOpen = false;
    return Model_JiangHun;
}(BaseModel));
__reflect(Model_JiangHun.prototype, "Model_JiangHun");
