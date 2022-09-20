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
var Model_YiBao = (function (_super) {
    __extends(Model_YiBao, _super);
    function Model_YiBao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_YiBao.checkYB = function () {
        var len = Model_YiBao.YBArr.length;
        for (var i = 0; i < len; i++) {
            var vo = Model_YiBao.YBArr[i];
            if (Model_YiBao.checkUpStarGridNotice(vo))
                return true;
        }
        return false;
    };
    Model_YiBao.checkUpStarGridNotice = function (vo) {
        var itemVo = VoItem.create(vo.costArr[0][1]);
        var count = Model_Bag.getItemCount(itemVo.id);
        if (count >= vo.costArr[0][2] && vo.starLv < vo.starMax) {
            return true;
        }
        return false;
    };
    Model_YiBao.checkDrugNotice = function () {
        Model_YiBao.drugMax = 0;
        var len = Model_YiBao.YBArr.length;
        for (var i = 0; i < len; i++) {
            var vo = Model_YiBao.YBArr[i];
            if (vo.starLv > 0) {
                Model_YiBao.drugMax += vo.drugMax * vo.starLv;
            }
        }
        if (Model_YiBao.drugCount < Model_YiBao.drugMax) {
            var count = Model_Bag.getItemCount(Model_YiBao.drugId);
            if (count > 0)
                return true;
        }
        return false;
    };
    Object.defineProperty(Model_YiBao, "YBArr", {
        get: function () {
            if (Model_YiBao._YBArr.length <= 0) {
                for (var key in Config.yb_217) {
                    var vo = Vo_YiBao.create(parseInt(key));
                    Model_YiBao._YBArr.push(vo);
                }
                Model_YiBao._YBArr.sort(Model_YiBao.sortYiBao);
            }
            return Model_YiBao._YBArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_YiBao.sortYiBao = function (a, b) {
        if (a.state == b.state) {
            if (a.quality == b.quality) {
                return a.id - b.id;
            }
            else {
                if (a.state == 2) {
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
    /***1041 CG 打开异宝ui    */
    Model_YiBao.prototype.CG_OPEN_YIBAO = function () {
        var ba = new BaseBytes();
        this.sendSocket(1041, ba);
    };
    /**1043 CG 激活/升星异宝 I:异宝id     */
    Model_YiBao.prototype.CG_YIBAO_JIHUO = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(1043, ba);
    };
    /**1045 CG 使用属性丹 B:使用方式0:1颗 1:一键      */
    Model_YiBao.prototype.CG_YIBAO_TUNSHI = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(1045, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_YiBao.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(1042, this.GC_OPEN_YIBAO, this);
        wsm.regHand(1044, this.GC_YIBAO_JIHUO, this);
        wsm.regHand(1046, this.GC_YIBAO_TUNSHI, this);
    };
    /**1046 GC 使用属性丹返回 B:0成功 1失败B:使用方式I:使用丹药数量    */
    Model_YiBao.prototype.GC_YIBAO_TUNSHI = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var type = data.readByte();
            var drugNum = data.readInt();
            Model_YiBao.drugCount = drugNum;
            GGlobal.control.notify(Enum_MsgType.YIBAO_UPDATE);
        }
    };
    /**1044 GC 升星返回 B:0成功 1失败I:异宝idI:星级   */
    Model_YiBao.prototype.GC_YIBAO_JIHUO = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            var id = data.readInt();
            var starLv = data.readInt();
            var len = Model_YiBao.YBArr.length;
            for (var i = 0; i < len; i++) {
                if (Model_YiBao.YBArr[i].id == id) {
                    Model_YiBao.YBArr[i].starLv = starLv;
                    if (starLv >= Model_YiBao.YBArr[i].starMax) {
                        GGlobal.control.notify(UIConst.JUEXING);
                    }
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.YIBAO_UPDATE);
        }
    };
    /***1042 GC 打开异宝 [I:异宝idI:星级]I:属性丹   */
    Model_YiBao.prototype.GC_OPEN_YIBAO = function (self, data) {
        Model_YiBao.isFirstOpen = true;
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var ybId = data.readInt();
            var starLv = data.readInt();
            for (var j = 0; j < Model_YiBao.YBArr.length; j++) {
                var vo = Model_YiBao.YBArr[j];
                if (vo.id == ybId) {
                    vo.starLv = starLv;
                    break;
                }
            }
        }
        Model_YiBao.drugCount = data.readInt();
        GGlobal.control.notify(Enum_MsgType.YIBAO_UPDATE);
    };
    //战甲一键升阶
    Model_YiBao.checkOneKeyUp = function () {
        var jieShu = Model_BySys.sysJie(Model_BySys.YI_BAO);
        var jieExp = Model_BySys.sysExp(Model_BySys.YI_BAO);
        var count = Model_Bag.getItemCount(Model_YiBao.DAN_LEVELUP);
        var exp = count * Model_YiBao.DAN_EXP;
        var clotheslv = Config.yblv_217[jieShu];
        if (clotheslv && clotheslv.exp > 0) {
            if (exp + jieExp >= clotheslv.exp) {
                return true;
            }
        }
        return false;
    };
    //	获取可以穿的武将装备
    Model_YiBao.yiBaoWearArr = function () {
        var arr = Model_Bag.filterEquips(Model_Bag.filterYiBaoEquip, null);
        var d = Model_player.voMine.equipData;
        var sendArr = {};
        for (var i = 0; i < arr.length; i++) {
            var equ = arr[i];
            var jieShu = Model_BySys.sysJie(Model_BySys.YI_BAO);
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
        for (var i = 70; i < 74; i++) {
            if (sendArr[i]) {
                a.push(sendArr[i]);
            }
        }
        return a;
    };
    //技能升级
    Model_YiBao.checkSkill = function (id) {
        var obj = Config.yblvskill_217[id];
        var jieShu = Model_BySys.sysJie(Model_BySys.YI_BAO);
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
    Model_YiBao.checkUpJie = function () {
        if (Model_YiBao.checkOneKeyUp()) {
            return true;
        }
        //技能升级
        var skillArr = Model_BySys.sysSkillArr(Model_BySys.YI_BAO);
        var len = skillArr.length;
        for (var i = 0; i < len; i++) {
            var id = skillArr[i];
            if (Model_YiBao.checkSkill(id)) {
                return true;
            }
        }
        if (Model_YiBao.yiBaoWearArr().length > 0) {
            return true;
        }
        return false;
    };
    Model_YiBao.checkAndShow = function (id) {
        var arr = Model_YiBao.YBArr;
        if (arr == null || arr.length == 0)
            return;
        for (var i = 0, len = arr.length; i < len; i++) {
            var vo = arr[i];
            if (!vo.starLv) {
                var costArr = vo.costArr;
                if (costArr[0][1] == id) {
                    VTipBWJiHuo.add(vo);
                    break;
                }
            }
        }
    };
    /**通过激活材料(升星材料)判断使用该材料的异宝是否已经满星 */
    Model_YiBao.isFullByMat = function (vo) {
        if (this.matToYiBao[vo.id]) {
            var data = this.matToYiBao[vo.id];
            return data.starLv >= data.starMax;
        }
        else {
            var datas = Model_YiBao.YBArr;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var costArr = data.costArr;
                if (costArr) {
                    var id = Number(costArr[0][1]);
                    this.matToYiBao[id] = data;
                    if (id == vo.id) {
                        return data.starLv >= data.starMax;
                    }
                }
            }
        }
        return false;
    };
    Model_YiBao.drugCount = 0;
    /**异宝属性丹 */
    Model_YiBao.drugId = 412011;
    Model_YiBao.drugIndex = 9;
    /**	异宝培养丹 */
    Model_YiBao.DAN_LEVELUP = 411005;
    Model_YiBao.DAN_EXP = 10;
    Model_YiBao._YBArr = [];
    Model_YiBao.isFirstOpen = false;
    /**材料到异宝的映射 */
    Model_YiBao.matToYiBao = {};
    return Model_YiBao;
}(BaseModel));
__reflect(Model_YiBao.prototype, "Model_YiBao");
