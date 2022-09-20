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
var Model_CaiLiao = (function (_super) {
    __extends(Model_CaiLiao, _super);
    function Model_CaiLiao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Model_CaiLiao, "caiLiaoArr", {
        get: function () {
            if (Model_CaiLiao._clArr.length <= 0) {
                for (var key in Config.cailiaofuben_709) {
                    var vo = Vo_CaiLiaoFB.create(parseInt(key));
                    Model_CaiLiao._clArr[Math.floor(vo.id / 1000) - 1] = vo;
                }
            }
            return Model_CaiLiao._clArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_CaiLiao.checkNotice = function () {
        for (var i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
            var vo = Model_CaiLiao.caiLiaoArr[i];
            if (vo.battleNum > 0 && (vo.startcondition == "0" || Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(vo.startcondition), vo.id))) {
                return true;
            }
        }
        return false;
    };
    /**特殊处理 [[1,x],[2,y],[3,z]]
    1:达到关卡
    2:转生
    3:等级
    y=转生ID*/
    Model_CaiLiao.checkCoditionOpenHandler = function (condition, id) {
        var ret = true;
        if (!Model_player.voMine)
            return false;
        var cl = condition.length;
        var b;
        var msg;
        var m = GGlobal.modelGuanQia;
        for (var i = 0; i < cl; i++) {
            var tp = condition[i][0];
            var val = condition[i][1];
            switch (tp) {
                case 1:
                    b = m.curGuanQiaLv >= val;
                    break; //关卡
                case 2:
                    b = Model_player.voMine.zsID >= val;
                    break; //转生等级
                case 3:
                    b = Model_player.voMine.maxLv >= val;
                    break;
            }
            var bo = true;
            var lib = Config.cailiaofuben_709;
            if (lib) {
                var info = lib[id];
                if (info && info.day) {
                    var d = info.day;
                    var d1 = 0;
                    if (Model_GlobalMsg.kaifuDay == 0) {
                        bo = false;
                    }
                    else {
                        if (d <= Model_GlobalMsg.kaifuDay) {
                            bo = true;
                        }
                        else {
                            bo = false;
                        }
                    }
                }
            }
            if (!b || !bo) {
                ret = false;
                break;
            }
        }
        return ret;
    };
    /**1431 CG 请求材料副本信息   */
    Model_CaiLiao.prototype.CG_OPEN_CAILIAOFUBEN = function () {
        var ba = new BaseBytes();
        this.sendSocket(1431, ba);
    };
    /**1433 CG 请求进入某个材料副本 I:副本id    */
    Model_CaiLiao.prototype.CG_ENTER_CAILIAOFUBEN = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1433, ba);
    };
    /**1435 CG 请求材料副本奖励 I:副本id    */
    Model_CaiLiao.prototype.CG_REAWARD_CAILIAOFUBEN = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1435, ba);
    };
    /**1437  CG 扫荡副本      */
    Model_CaiLiao.prototype.CG_CAILIAOFUBEN_SAODANG = function () {
        var ba = new BaseBytes();
        this.sendSocket(1437, ba);
    };
    /**1439 CG 购买材料副本的次数 I:副本id       */
    Model_CaiLiao.prototype.CG_CAILIAOFUBEN_BUYNUM = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1439, ba);
    };
    /**1441  CG 一键购买材料副本   */
    Model_CaiLiao.prototype.CG_CAILIAOFUBEN_BUYKEY = function () {
        var ba = new BaseBytes();
        this.sendSocket(1441, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_CaiLiao.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(1432, this.GC_OPEN_CAILIAOFUBEN, this);
        wsm.regHand(1434, this.GC_ENTER_CAILIAOFUBEN, this);
        wsm.regHand(1436, this.GC_REAWARD_CAILIAOFUBEN, this);
        wsm.regHand(1438, this.GC_CAILIAOFUBEN_SAODANG, this);
        wsm.regHand(1440, this.GC_CAILIAOFUBEN_BUYNUM, this);
        wsm.regHand(1442, this.GC_CAILIAOFUBEN_BUYKEY, this);
    };
    /**1442 GC 购买材料副本返回 B:0成功 1失败  */
    Model_CaiLiao.prototype.GC_CAILIAOFUBEN_BUYKEY = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("购买成功");
        }
    };
    /**1440 GC 购买次数 B:0成功 1失败 I:副本idI:已经购买次数   */
    Model_CaiLiao.prototype.GC_CAILIAOFUBEN_BUYNUM = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var fubenID = data.readInt();
            var buyNum = data.readInt();
            for (var i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
                if (fubenID == Model_CaiLiao.caiLiaoArr[i].id) {
                    Model_CaiLiao.caiLiaoArr[i].battleNum++;
                    Model_CaiLiao.caiLiaoArr[i].buyNum = buyNum;
                    break;
                }
            }
            Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
            for (var i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
                if (fubenID == Model_CaiLiao.caiLiaoArr[i].id) {
                    Model_CaiLiao.curSelIndex = i;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_BATTLENUM_UPDATE);
            GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_UPDATE);
        }
    };
    /**1438 GC 扫荡返回 B:0成功 1失败  */
    Model_CaiLiao.prototype.GC_CAILIAOFUBEN_SAODANG = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            ViewCommonWarn.text("扫荡成功");
            for (var i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
                var vo = Model_CaiLiao.caiLiaoArr[i];
                if (vo.pass == 1 && (vo.startcondition == "0" || Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(vo.startcondition), vo.id))) {
                    vo.battleNum = 0;
                }
            }
            Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
            GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_UPDATE);
        }
    };
    /**1436 GC 请求材料副本奖励 B:0成功 1失败 2背包不足I:副本id[B:类型I:idI:数量]  */
    Model_CaiLiao.prototype.GC_REAWARD_CAILIAOFUBEN = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var fubenID = data.readInt();
            for (var i = 0; i < Model_CaiLiao.caiLiaoArr.length; i++) {
                if (fubenID == Model_CaiLiao.caiLiaoArr[i].id) {
                    Model_CaiLiao.caiLiaoArr[i].battleNum--;
                    Model_CaiLiao.caiLiaoArr[i].pass = 1;
                    break;
                }
            }
            var arr = [];
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var type = data.readByte();
                var id = data.readInt();
                var count = data.readInt();
                var vo = void 0;
                if (type == Enum_Attr.ITEM) {
                    vo = VoItem.create(id);
                }
                else if (type == Enum_Attr.EQUIP) {
                    vo = VoEquip.create(id);
                }
                else {
                    vo = Vo_Currency.create(type);
                }
                vo.count = count;
                arr.push(vo);
            }
            ViewCommonWin.show(arr, 10000);
            Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
            GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_UPDATE);
        }
    };
    /**1434 GC 请求进入某个材料副本 B:0成功 1失败 2背包不足 3没有次数B:战斗结果0:失败，1：成功，2：以前端结果为准I:副本id  */
    Model_CaiLiao.prototype.GC_ENTER_CAILIAOFUBEN = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var battleRet = data.readByte();
            var fubenId = data.readInt();
            Model_CaiLiao.curFuBenId = fubenId;
            if (battleRet == 2) {
                Model_CaiLiao.battleRet = 0;
            }
            else {
                Model_CaiLiao.battleRet = battleRet == 1 ? 2 : 1;
            }
            GGlobal.mapscene.enterScene(SceneCtrl.CAILIAO_FUBEN);
        }
    };
    /***1432 GC 剩余材料副本次数 [I:副本索引B:剩余次数B:已经购买次数B:是否已通过 0没有1有]  */
    Model_CaiLiao.prototype.GC_OPEN_CAILIAOFUBEN = function (self, data) {
        Model_CaiLiao.isFirstOpen = true;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var fubenId = data.readInt();
            var num = data.readByte();
            var buyNum = data.readByte();
            var pass = data.readByte();
            for (var j = 0; j < Model_CaiLiao.caiLiaoArr.length; j++) {
                if (fubenId == Model_CaiLiao.caiLiaoArr[j].id) {
                    Model_CaiLiao.caiLiaoArr[j].battleNum = num;
                    Model_CaiLiao.caiLiaoArr[j].buyNum = buyNum;
                    Model_CaiLiao.caiLiaoArr[j].pass = pass;
                    break;
                }
            }
        }
        Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
        GGlobal.control.notify(Enum_MsgType.FUBEN_CAILIAO_UPDATE);
    };
    Model_CaiLiao.sortList = function (a, b) {
        if ((a.startcondition == "0" || Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(a.startcondition), a.id)) &&
            (b.startcondition == "0" || Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(b.startcondition), b.id))) {
            if (a.battleNum <= 0 && b.battleNum <= 0) {
                return a.paixu - b.paixu;
            }
            else if (a.battleNum > 0 && b.battleNum > 0) {
                return a.paixu - b.paixu;
            }
            else {
                return b.battleNum - a.battleNum;
            }
        }
        else if (a.startcondition != "0" && !Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(a.startcondition), a.id) && b.startcondition != "0" && !Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(b.startcondition), b.id)) {
            return a.paixu - b.paixu;
        }
        else {
            if (a.startcondition != "0" && !Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(a.startcondition), a.id)) {
                return 1;
            }
            else {
                return -1;
            }
        }
    };
    Model_CaiLiao.curFuBenId = 0;
    Model_CaiLiao._clArr = [];
    Model_CaiLiao.isFirstOpen = false;
    return Model_CaiLiao;
}(BaseModel));
__reflect(Model_CaiLiao.prototype, "Model_CaiLiao");
