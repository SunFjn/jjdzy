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
var Model_Horse = (function (_super) {
    __extends(Model_Horse, _super);
    function Model_Horse() {
        var _this = _super.call(this) || this;
        /** 当前骑乘的坐骑id */
        _this.rideId = 0;
        _this._typeVoList = {};
        return _this;
    }
    //打开界面
    Model_Horse.prototype.CG_OPENUI_11021 = function () {
        var bates = this.getBytes();
        this.sendSocket(11021, bates);
    };
    //骑乘 坐骑id(0.取消骑乘)
    Model_Horse.prototype.CG_RIDE_11023 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11023, bates);
    };
    //激活或升星 I:坐骑id
    Model_Horse.prototype.CG_UPSTAR_11025 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11025, bates);
    };
    //坐骑升级 I:坐骑id
    Model_Horse.prototype.CG_UPLV_11027 = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11027, bates);
    };
    Object.defineProperty(Model_Horse.prototype, "horseArr", {
        get: function () {
            var m = this;
            if (m._horseArr == null) {
                m._horseArr = [];
                m._horseObj = {};
                for (var k in Config.zq_773) {
                    var vv = new Vo_Horse();
                    vv.init(Config.zq_773[k]);
                    m._horseArr.push(vv);
                    m._horseObj[vv.id] = vv;
                }
            }
            return m._horseArr;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 通过类型获取坐骑数据列表
     * @param pType 类型（EnumHorse.ts有对应的类型枚举） 0普通坐骑 1幻化坐骑
     */
    Model_Horse.prototype.getHorseListByType = function (pType) {
        var t = this;
        var t_list = t._typeVoList[pType];
        if (t_list === undefined) {
            t._typeVoList[pType] = t_list = [];
            var t_all = t.horseArr;
            for (var _i = 0, t_all_1 = t_all; _i < t_all_1.length; _i++) {
                var v = t_all_1[_i];
                if (v.cfg.type == pType) {
                    t_list.push(v);
                }
            }
        }
        return t_list;
    };
    /**
     * 通过坐骑id获取vo
     * @param pId 坐骑id
     */
    Model_Horse.prototype.getHorseVoById = function (pId) {
        var t = this;
        t.horseArr;
        return t._horseObj[pId];
    };
    //协议处理
    Model_Horse.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(11022, this.GC_OPENUI_11022, this);
        mgr.regHand(11024, this.GC_RIDE_11024, this);
        mgr.regHand(11026, this.GC_UPSTAR_11026, this);
        mgr.regHand(11028, this.GC_UPLV_11028, this);
        //幻化
        mgr.regHand(11030, this.GC_Mount_openMountUnrealUI_11030, this);
        mgr.regHand(11032, this.GC_Mount_rideUnreal_11032, this);
        mgr.regHand(11034, this.GC_Mount_activation_11034, this);
        mgr.regHand(11036, this.GC_Mount_upMountUnrealLv_11036, this);
    };
    //打开坐骑界面返回 I:骑乘坐骑id[I:坐骑id I:坐骑升星id I:坐骑升级id]所有已激活的坐骑
    Model_Horse.prototype.GC_OPENUI_11022 = function (self, data) {
        self.rideId = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var star = data.readInt();
            var lv = data.readInt();
            var vv = self.getHorseVoById(id);
            if (vv) {
                vv.isAct = true;
                vv.setStar(star);
                vv.setLv(lv);
            }
        }
        self.checkNotice();
        self.notify(Model_Horse.openui);
    };
    // /骑乘返回 B:1.成功 2.坐骑未激活 3.未达到星级I:坐骑id
    Model_Horse.prototype.GC_RIDE_11024 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            self.rideId = data.readInt();
            Model_player.voMine.setHorseId(self.rideId);
            Model_player.voMine.speed = Model_Horse.getSpeed();
            self.notify(Model_Horse.openui);
        }
        else {
            ViewCommonWarn.text(["坐骑未激活", "未达到星级"][res - 2]);
        }
    };
    // 激活或升星返回 B:1.成功 2.道具不足 3.已满星 4.参数错误 5.已达升星上限I:坐骑idI: 升星id
    Model_Horse.prototype.GC_UPSTAR_11026 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            var id = data.readInt();
            var star = data.readInt();
            var t_vo = self.getHorseVoById(id);
            if (t_vo) {
                t_vo.isAct = true;
                t_vo.setStar(star);
            }
            self.checkNotice();
            Model_player.voMine.speed = Model_Horse.getSpeed();
            self.notify(Model_Horse.openui);
        }
        else {
            ViewCommonWarn.text(["道具不足", "已满星", "参数错误", "已达升星上限"][res - 2]);
        }
    };
    //坐骑升级返回 B:1.成功 2.坐骑未激活 3.道具不足 4.已满级I:坐骑idI: 升级id
    Model_Horse.prototype.GC_UPLV_11028 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            var id = data.readInt();
            var lv = data.readInt();
            var t_vo = self.getHorseVoById(id);
            if (t_vo) {
                t_vo.setLv(lv);
            }
            self.checkNotice();
            self.notify(Model_Horse.openui);
        }
        else {
            ViewCommonWarn.text(["坐骑未激活", "道具不足", "已满级"][res - 2]);
        }
    };
    Model_Horse.prototype.checkNotice = function () {
        var s = this;
        var reddot = GGlobal.reddot;
        var red1 = false;
        var red2 = false;
        var arr = s.getHorseListByType(EnumHorse.TYPE_COMMON);
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            var redStar = s.checkVoStar(v);
            var redLv = s.checkVoLv(v);
            reddot.setCondition(UIConst.HORSE, v.id * 10 + 0, redStar);
            reddot.setCondition(UIConst.HORSE, v.id * 10 + 1, redLv);
            if (!red1)
                red1 = redStar;
            if (!red2)
                red2 = redLv;
        }
        reddot.setCondition(UIConst.HORSE, 0, red1 || red2);
        reddot.setCondition(UIConst.HORSE, 1, red1);
        reddot.setCondition(UIConst.HORSE, 2, red2);
        s.checkHHReddot();
        reddot.notify(UIConst.HORSE);
    };
    //可升星
    Model_Horse.prototype.checkVoStar = function (v) {
        if (!v.cfgStar) {
            return false;
        }
        if (v.cfgStar.next != 0) {
            //可升星
            var consume = JSON.parse(v.cfg.activation);
            var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
            var count = Number(consume[0][2]);
            if (hasCount >= count) {
                return true;
            }
        }
        return false;
    };
    //可升级
    Model_Horse.prototype.checkVoLv = function (v) {
        if (!v.isAct) {
            return false;
        }
        if (v.cfgLv.next != 0) {
            //可升级
            var consume = JSON.parse(v.cfgLv.exp);
            var hasCount = Model_Bag.getItemCount(Number(consume[0][1]));
            var count = Number(consume[0][2]);
            if (hasCount >= count) {
                return true;
            }
        }
        return false;
    };
    /** 检查幻化红点 */
    Model_Horse.prototype.checkHHReddot = function () {
        var t = this;
        var t_value = 0;
        var t_list = t.getHorseListByType(EnumHorse.TYPE_HH);
        for (var _i = 0, t_list_1 = t_list; _i < t_list_1.length; _i++) {
            var v = t_list_1[_i];
            if (v.checkUpConditionHH(false) && v.checkConsumeHH(false)) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(UIConst.HORSE_HH + "|" + 1, t_value);
    };
    Model_Horse.getSpeed = function () {
        var horseId = GGlobal.model_Horse.rideId;
        var speedAdd = 0;
        if (horseId > 0) {
            var t_vo = GGlobal.model_Horse.getHorseVoById(horseId);
            if (t_vo) {
                speedAdd = t_vo.speed;
            }
        }
        return Config.changshu_101[77].num + speedAdd;
    };
    //==================== 幻化相关 ==================
    /**11029  打开坐骑幻化界面 */
    Model_Horse.prototype.CG_Mount_openMountUnrealUI_11029 = function () {
        var bates = this.getBytes();
        this.sendSocket(11029, bates);
    };
    /**11030 I-[I-I] 打开坐骑幻化界面 I:骑乘坐骑idmountId[I:坐骑id I:阶级id(坐骑幻化培养id)]所有已激活的幻化坐骑mountList*/
    Model_Horse.prototype.GC_Mount_openMountUnrealUI_11030 = function (self, data) {
        var t_change = false;
        var arg1 = data.readInt();
        if (self.rideId != arg1) {
            self.rideId = arg1;
            t_change = false;
        }
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var arg2 = data.readInt();
            var arg3 = data.readInt();
            var t_vo = self.getHorseVoById(arg2);
            if (t_vo) {
                if (t_vo.hhId != arg3 && arg3 != 0) {
                    t_vo.hhId = arg3;
                    t_change = true;
                }
                if (!t_vo.isAct) {
                    t_vo.isAct = true;
                    t_change = true;
                }
            }
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.HORSE_HH_UPDATE);
        }
        self.checkHHReddot();
    };
    /**11031 I 骑乘(幻化) I:坐骑id(0.取消骑乘)mountId*/
    Model_Horse.prototype.CG_Mount_rideUnreal_11031 = function (pId) {
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(11031, bates);
    };
    /**11032 B-I 骑乘返回(幻化) B:1.成功 2.坐骑未激活 3.未达到阶级stateI:坐骑idmountId*/
    Model_Horse.prototype.GC_Mount_rideUnreal_11032 = function (self, data) {
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        switch (arg1) {
            case 1://成功
                self.rideId = arg2;
                Model_player.voMine.setHorseId(self.rideId);
                Model_player.voMine.speed = Model_Horse.getSpeed();
                self.notify(Model_Horse.openui);
                break;
            case 2:
                ViewCommonWarn.text("坐骑未激活");
                break;
            case 3:
                ViewCommonWarn.text("未满足条件");
                break;
            default:
                break;
        }
    };
    /**11033 I 激活坐骑(幻化) I:坐骑idmountId*/
    Model_Horse.prototype.CG_Mount_activation_11033 = function (pId) {
        var t = this;
        var t_vo = t.getHorseVoById(pId);
        if (!t_vo)
            return;
        if (t_vo.isAct)
            return;
        if (!t_vo.checkUpConditionHH(true))
            return;
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(11033, bates);
    };
    /**11034 B-I-I 激活坐骑(幻化)返回 B:1.成功 2.激活条件不足  3.参数错误stateI:坐骑idmountIdI:阶级idlevId*/
    Model_Horse.prototype.GC_Mount_activation_11034 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        var arg3 = data.readInt();
        switch (arg1) {
            case 1://成功
                var t_vo = self.getHorseVoById(arg2);
                if (t_vo && !t_vo.isAct) {
                    t_vo.isAct = true;
                    t_change = true;
                }
                break;
            case 2:
                break;
            case 3:
                break;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.HORSE_HH_UPGRADE_CHANGE, { id: arg2 });
            self.checkHHReddot();
        }
    };
    /**11035 I 坐骑幻化升阶 I:坐骑idmountId*/
    Model_Horse.prototype.CG_Mount_upMountUnrealLv_11035 = function (pId) {
        var t = this;
        var t_vo = t.getHorseVoById(pId);
        if (!t_vo)
            return;
        if (!t_vo.checkUpConditionHH(true))
            return;
        if (!t_vo.checkConsumeHH(true))
            return;
        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(11035, bates);
    };
    /**11036 B-I-I 坐骑幻化升阶返回 B:1.成功 2.坐骑未激活 3.道具不足 4.已满级stateI:坐骑idmountIdI:阶级idlevId*/
    Model_Horse.prototype.GC_Mount_upMountUnrealLv_11036 = function (self, data) {
        var t_change = false;
        var arg1 = data.readByte();
        var arg2 = data.readInt();
        var arg3 = data.readInt();
        switch (arg1) {
            case 1://成功
                var t_vo = self.getHorseVoById(arg2);
                if (t_vo && t_vo.hhId != arg3) {
                    t_vo.hhId = arg3;
                    t_change = true;
                }
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.HORSE_HH_UPGRADE_CHANGE, { id: arg2 });
            self.checkHHReddot();
        }
    };
    Model_Horse.openui = "openui";
    return Model_Horse;
}(BaseModel));
__reflect(Model_Horse.prototype, "Model_Horse");
