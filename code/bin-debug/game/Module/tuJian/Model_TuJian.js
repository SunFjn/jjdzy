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
var Model_TuJian = (function (_super) {
    __extends(Model_TuJian, _super);
    function Model_TuJian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_TuJian.checkItemVo = function (v) {
        if (!Model_TuJian.isFirstOpen)
            return false;
        var tuJian = Model_TuJian.getItemTuJian(v.id);
        if (!tuJian)
            return false;
        var len = Model_TuJian.tuJianArr[tuJian.type - 1].length;
        var check = false;
        for (var i = 0; i < len; i++) {
            var vo = Model_TuJian.tuJianArr[tuJian.type - 1][i];
            if (vo.ID == tuJian.ID) {
                if (vo.isJiHuo) {
                    if (vo.next_star > 0) {
                        var costArr0 = vo.consume_star;
                        var costVo0 = VoItem.create(costArr0[0][1]);
                        var count0 = Model_Bag.getItemCount(costArr0[0][1]);
                        if (count0 >= costArr0[0][2]) {
                            check = true;
                            break;
                        }
                    }
                }
                else {
                    var costArr0 = vo.activation_jihuo;
                    var costVo0 = VoItem.create(costArr0[0][1]);
                    costVo0.count = costArr0[0][2];
                    var count = Model_Bag.getItemCount(costArr0[0][1]);
                    if (count >= costVo0.count) {
                        check = true;
                        break;
                    }
                }
                break;
            }
        }
        return check;
    };
    Model_TuJian.checkTabNotice = function (type) {
        var len = Model_TuJian.tuJianArr[type].length;
        var check = false;
        for (var i = 0; i < len; i++) {
            var vo = Model_TuJian.tuJianArr[type][i];
            if (vo.isJiHuo) {
                if (vo.next_star > 0) {
                    var costArr0 = vo.consume_star;
                    var costVo0 = VoItem.create(costArr0[0][1]);
                    var count0 = Model_Bag.getItemCount(costArr0[0][1]);
                    if (count0 >= costArr0[0][2]) {
                        check = true;
                        break;
                    }
                }
                if (!check && vo.level < vo.levelMax) {
                    var costArr1 = vo.consume_level;
                    var costVo1 = VoItem.create(costArr1[0][1]);
                    var count1 = Model_Bag.getItemCount(costArr1[0][1]);
                    if (count1 >= costArr1[0][2]) {
                        check = true;
                        break;
                    }
                }
            }
            else {
                var costArr0 = vo.activation_jihuo;
                var costVo0 = VoItem.create(costArr0[0][1]);
                costVo0.count = costArr0[0][2];
                var count = Model_Bag.getItemCount(costArr0[0][1]);
                if (count >= costVo0.count) {
                    check = true;
                    break;
                }
            }
        }
        if (!check) {
            var vo = Model_TuJian.suitVoArr[type];
            vo.tujianLv = 0;
            for (var i = 0; i < len; i++) {
                var vo1 = Model_TuJian.tuJianArr[type][i];
                if (vo1.isJiHuo) {
                    vo.tujianLv += vo1.level;
                }
            }
            if (vo.suitNext > 0) {
                var nextcfg = Config.picteam_005[vo.suitNext];
                if (vo.tujianLv >= nextcfg.need) {
                    check = true;
                }
            }
        }
        return check;
    };
    Model_TuJian.getTuJianLv = function (type) {
        var vo = Model_TuJian.suitVoArr[type];
        var len = Model_TuJian.tuJianArr[type].length;
        vo.tujianLv = 0;
        for (var i = 0; i < len; i++) {
            var vo1 = Model_TuJian.tuJianArr[type][i];
            if (vo1.isJiHuo) {
                vo.tujianLv += vo1.level;
            }
        }
        return vo.tujianLv;
    };
    Model_TuJian.getTuJianPower = function (type) {
        var len = Model_TuJian.tuJianArr[type].length;
        var power = 0;
        for (var i = 0; i < len; i++) {
            var vo = Model_TuJian.tuJianArr[type][i];
            if (vo.isJiHuo) {
                power += vo.power0 + vo.power1 + vo.power2;
            }
        }
        return power;
    };
    Object.defineProperty(Model_TuJian, "suitVoArr", {
        get: function () {
            if (Model_TuJian._suitVoArr.length <= 0) {
                var arr = [1000, 2000, 3000, 4000];
                for (var i = 0; i < arr.length; i++) {
                    var vo = new Vo_TuJianSuit();
                    vo.suitID = arr[i];
                    Model_TuJian._suitVoArr[Math.floor(arr[i] / 1000) - 1] = vo;
                }
            }
            return Model_TuJian._suitVoArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model_TuJian, "tuJianArr", {
        get: function () {
            if (Model_TuJian._tuJianArr.length <= 0) {
                for (var key in Config.picture_005) {
                    var vo = Vo_TuJian.create(parseInt(key));
                    if (!Model_TuJian._tuJianArr[vo.type - 1])
                        Model_TuJian._tuJianArr[vo.type - 1] = [];
                    Model_TuJian._tuJianArr[vo.type - 1].push(vo);
                }
                for (var key in Model_TuJian._tuJianArr) {
                    Model_TuJian._tuJianArr[key].sort(Model_TuJian.sortByID);
                }
            }
            return Model_TuJian._tuJianArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_TuJian.getItemTuJian = function (itemId) {
        if (Model_TuJian._itemTuJian == null) {
            Model_TuJian._itemTuJian = {};
            for (var key in Config.picture_005) {
                var cfg = Config.picture_005[key];
                var arr = ConfigHelp.SplitStr(cfg.activation);
                Model_TuJian._itemTuJian[Number(arr[0][1])] = cfg;
            }
        }
        return Model_TuJian._itemTuJian[itemId];
    };
    Model_TuJian.sortByID = function (a, b) {
        return a.ID - b.ID;
    };
    Model_TuJian.tuJianStarArr = function () {
        if (!Model_TuJian.starObj) {
            Model_TuJian.starObj = {};
            for (var key in Config.picstar_005) {
                var cfg = Config.picstar_005[key];
                if (!Model_TuJian.starObj[cfg.id])
                    Model_TuJian.starObj[cfg.id] = [];
                Model_TuJian.starObj[cfg.id].push(cfg);
            }
            for (var key in Model_TuJian.starObj) {
                Model_TuJian.starObj[key].sort(Model_TuJian.sortByLevel);
            }
        }
    };
    Model_TuJian.sortByLevel = function (a, b) {
        return a.lv - b.lv;
    };
    /**871  打开图鉴   */
    Model_TuJian.prototype.CG_OPEN_TUJIAN = function () {
        var ba = new BaseBytes();
        this.sendSocket(871, ba);
    };
    /**873 激活图鉴 I:图鉴id    */
    Model_TuJian.prototype.CG_TUJIAN_JIHUO = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(873, ba);
    };
    /**875 升级图鉴 I:图鉴id     */
    Model_TuJian.prototype.CG_TUJIAN_UPGRADE = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(875, ba);
    };
    /**877 图鉴升星 I:图鉴id     */
    Model_TuJian.prototype.CG_TUJIAN_UPSTAR = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(877, ba);
    };
    /**879 套装升级 I:套装id      */
    Model_TuJian.prototype.CG_TUJIAN_UPSUIT = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(879, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_TuJian.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(872, this.GC_OPEN_TUJIAN, this);
        wsm.regHand(874, this.GC_TUJIAN_JIHUO, this);
        wsm.regHand(876, this.GC_TUJIAN_UPGRADE, this);
        wsm.regHand(878, this.GC_TUJIAN_UPSTAR, this);
        wsm.regHand(880, this.GC_TUJIAN_UPSUIT, this);
    };
    /**880 套装升级结果 B:0：失败，1：成功I:失败：错误码（1：未达升级条件），成功：套装id  */
    Model_TuJian.prototype.GC_TUJIAN_UPSUIT = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var suitId = data.readInt();
            var cfg = Config.picteam_005[suitId];
            Model_TuJian.suitVoArr[cfg.type - 1].suitID = suitId;
            GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
        }
    };
    /**878 图鉴升星结果 B:0：失败，1：成功I:失败：错误码（1：未激活该图鉴，1：达到星级上限，2：材料不足），成功：图鉴idI:图鉴星级索引  */
    Model_TuJian.prototype.GC_TUJIAN_UPSTAR = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var starID = data.readInt();
            var cfg = Config.picture_005[id];
            for (var i = 0; i < Model_TuJian.tuJianArr[cfg.type - 1].length; i++) {
                var vo = Model_TuJian.tuJianArr[cfg.type - 1][i];
                if (vo.ID == id) {
                    vo.starID = starID;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
        }
    };
    /**876 图鉴升级结果返回 B:0：失败，1：成功I:失败：错误码（1：未激活该图鉴，2：到达等级上限，3：材料不足），成功：图鉴idI:图鉴等级索引  */
    Model_TuJian.prototype.GC_TUJIAN_UPGRADE = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var levelID = data.readInt();
            var cfg = Config.picture_005[id];
            for (var i = 0; i < Model_TuJian.tuJianArr[cfg.type - 1].length; i++) {
                var vo = Model_TuJian.tuJianArr[cfg.type - 1][i];
                if (vo.ID == id) {
                    vo.levelID = levelID;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
        }
    };
    /**874 激活结果 B:0:失败 ；1:成功I:失败：错误码（1：不可重复激活，2：材料不足），成功:图鉴idI:图鉴等级索引I:图鉴星级索引  */
    Model_TuJian.prototype.GC_TUJIAN_JIHUO = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var id = data.readInt();
            var levelID = data.readInt();
            var starID = data.readInt();
            var cfg = Config.picture_005[id];
            var arr = Model_TuJian.tuJianArr[cfg.type - 1];
            for (var i = 0; i < arr.length; i++) {
                var vo = arr[i];
                if (vo.ID == id) {
                    vo.isJiHuo = true;
                    vo.levelID = levelID;
                    vo.starID = starID;
                    break;
                }
            }
            arr.sort(self.sortTuJian);
            GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
        }
    };
    /**872 界面信息返回 [I:图鉴idS:图鉴等级索引S:图鉴星级索引]图鉴数据[I:套装id]套装信息  */
    Model_TuJian.prototype.GC_OPEN_TUJIAN = function (self, data) {
        Model_TuJian.isFirstOpen = true;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var levelID = data.readShort();
            var starID = data.readShort();
            var cfg = Config.picture_005[id];
            for (var i_1 = 0; i_1 < Model_TuJian.tuJianArr[cfg.type - 1].length; i_1++) {
                var vo = Model_TuJian.tuJianArr[cfg.type - 1][i_1];
                if (vo.ID == id) {
                    vo.isJiHuo = true;
                    vo.levelID = levelID;
                    vo.starID = starID;
                    break;
                }
            }
        }
        var len1 = data.readShort();
        for (var i = 0; i < len1; i++) {
            var suitId = data.readInt();
            var cfg = Config.picteam_005[suitId];
            Model_TuJian.suitVoArr[cfg.type - 1].suitID = suitId;
        }
        for (var i = 0; i < Model_TuJian.tuJianArr.length; i++) {
            Model_TuJian.tuJianArr[i].sort(self.sortTuJian);
        }
        GGlobal.control.notify(Enum_MsgType.TUJIAN_DATA_UPDATE);
    };
    Model_TuJian.prototype.sortTuJian = function (a, b) {
        if ((a.isJiHuo && b.isJiHuo) || (!a.isJiHuo && !b.isJiHuo)) {
            if (a.quality == b.quality) {
                return a.ID - b.ID;
            }
            else {
                return a.quality - b.quality;
            }
        }
        else {
            if (a.isJiHuo) {
                return -1;
            }
            else {
                return 1;
            }
        }
    };
    Model_TuJian.tabArr = ["", "猛将", "谋士", "佳人", "君主"];
    Model_TuJian._suitVoArr = [];
    Model_TuJian._tuJianArr = [];
    Model_TuJian.isFirstOpen = false;
    return Model_TuJian;
}(BaseModel));
__reflect(Model_TuJian.prototype, "Model_TuJian");
