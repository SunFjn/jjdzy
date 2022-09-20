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
/**血战到底 */
var ModelWarToDead = (function (_super) {
    __extends(ModelWarToDead, _super);
    function ModelWarToDead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxLayer = 0;
        return _this;
    }
    ModelWarToDead.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        var self = this;
        wsm.regHand(2802, self.GC2802, self);
        wsm.regHand(2804, self.servCha, self);
        wsm.regHand(2806, self.servAwards, self);
        wsm.regHand(2832, self.GC2832, self);
        wsm.regHand(2834, self.servCha, self);
        wsm.regHand(2836, self.servAwards, self);
        wsm.regHand(4750, self.GC4750, self);
        wsm.regHand(4752, self.servCha, self);
        wsm.regHand(4754, self.servAwards, self);
    };
    /**打开UI */
    ModelWarToDead.prototype.openUI = function () {
        var self = this;
        var bool = TimeUitl.isIn7Days();
        if (bool) {
            self.sendSocket(2801, self.getBytes());
        }
        else {
            self.sendSocket(2831, self.getBytes());
        }
    };
    /**UI数据 */
    ModelWarToDead.prototype.GC2802 = function (self, bytes) {
        self.highestLayer = bytes.readInt();
        GGlobal.reddot.setCondition(UIConst.WARTODEAD_7IN, 0, self.checkNotice());
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        self.notify(ModelWarToDead.msg_datas);
    };
    /**UI数据 */
    ModelWarToDead.prototype.GC2832 = function (self, bytes) {
        self.qiShu = bytes.readInt();
        self.highestLayer = bytes.readInt();
        GGlobal.reddot.setCondition(UIConst.WARTODEAD_7OUT, 0, self.checkNotice());
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        self.notify(ModelWarToDead.msg_datas);
    };
    /**4750 返回界面信息 I:已通过最高层数I:已挑战idI:期数  */
    ModelWarToDead.prototype.GC4750 = function (self, bytes) {
        self.highestLayer = bytes.readInt();
        var hasBatt = bytes.readInt();
        self.qiShu = bytes.readInt();
        GGlobal.reddot.setCondition(UIConst.WARTODEAD1, 0, self.checkNotice());
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        self.notify(ModelWarToDead.msg_datas);
    };
    /**挑战 */
    ModelWarToDead.prototype.challenge = function () {
        var self = this;
        if (GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss()) {
            var bool = TimeUitl.isIn7Days();
            if (bool) {
                self.sendSocket(2803, self.getBytes());
            }
            else {
                self.sendSocket(2833, self.getBytes());
            }
        }
        else {
            ViewCommonWarn.text("副本中，不能挑战!");
        }
    };
    /**挑战 */
    ModelWarToDead.prototype.CG4751 = function () {
        var self = this;
        if (GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss()) {
            self.sendSocket(4751, self.getBytes());
        }
        else {
            ViewCommonWarn.text("副本中，不能挑战!");
        }
    };
    /**挑战返回 */
    ModelWarToDead.prototype.servCha = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 0) {
            self.batLayer = bytes.readInt();
            if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
                bytes.readInt();
            }
            var batState = bytes.readByte() + 1; //战斗结果
            if (batState > 2) {
                batState = 0;
            }
            self.batState = batState;
            GGlobal.mapscene.enterScene(SceneCtrl.WARTODEAD);
            GGlobal.layerMgr.close2(UIConst.CHAOZHIFL);
        }
        else if (state == 1) {
            ViewCommonWarn.text("挑战失败");
        }
        else if (state == 2) {
            Model_RongLian.ALERT_ONEKEY();
        }
    };
    /**获取奖励 */
    ModelWarToDead.prototype.applyAwards = function () {
        var self = this;
        var bool = TimeUitl.isIn7Days();
        if (bool) {
            self.sendSocket(2805, self.getBytes());
        }
        else {
            self.sendSocket(2835, self.getBytes());
        }
    };
    /**获取奖励 */
    ModelWarToDead.prototype.CG4753 = function () {
        var self = this;
        self.sendSocket(4753, self.getBytes());
    };
    /**奖励返回 */
    ModelWarToDead.prototype.servAwards = function (self, bytes) {
        self.dropLayer = bytes.readInt();
        if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            bytes.readInt();
        }
        self.awards = [];
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            self.awards.push([bytes.readByte(), bytes.readInt(), bytes.readInt()]);
        }
        self.notify(ModelWarToDead.msg_jlDrop);
    };
    ModelWarToDead.prototype.dayHasChange = function () {
        return Model_GlobalMsg.kaifuDay != this.$day;
    };
    ModelWarToDead.prototype.getAllDatas = function () {
        if (!this.dayHasChange() && this.$datas && this.$datas.length) {
            return this.$datas;
        }
        else {
            var self_1 = this;
            self_1.maxLayer = 0;
            var lib1 = Config.xzdd1_252;
            var lib2 = Config.xzdd2_252;
            var lib3 = Config.xzdd3_252;
            var bool = TimeUitl.isIn7Days();
            var ret = [];
            if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
                var qishu = this.qiShu;
                for (var key in lib3) {
                    var cfg = lib3[key];
                    if (cfg.qs == qishu) {
                        ret.push(cfg);
                    }
                    if (cfg.id > self_1.maxLayer) {
                        self_1.maxLayer = cfg.id;
                    }
                }
            }
            else if (bool) {
                for (var key in lib1) {
                    var c = lib1[key];
                    if (c.id > this.maxLayer) {
                        this.maxLayer = c.id;
                    }
                    ret.push(c);
                }
            }
            else {
                var act = GGlobal.modelActivity.get(UIConst.CHAOZHIFL, UIConst.WARTODEAD_7OUT);
                if (act) {
                    var qishu = this.qiShu;
                    for (var key in lib2) {
                        var cfg = lib2[key];
                        if (cfg.qs == qishu) {
                            ret.push(cfg);
                        }
                        if (cfg.id > self_1.maxLayer) {
                            self_1.maxLayer = cfg.id;
                        }
                    }
                }
                else {
                    self_1.maxLayer = 0;
                }
            }
            this.$day = Model_GlobalMsg.kaifuDay;
            return this.$datas = ret;
        }
    };
    ModelWarToDead.prototype.checkNotice = function () {
        var self = this;
        var ret = undefined;
        var bool = TimeUitl.isIn7Days();
        if (bool) {
        }
        else if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
        }
        else {
            var act = GGlobal.modelActivity.get(UIConst.CHAOZHIFL, UIConst.WARTODEAD_7OUT);
            if (!act) {
                return;
            }
        }
        var datas = self.getAllDatas();
        var tarLayer = self.highestLayer;
        if (tarLayer >= self.maxLayer) {
            ret = false;
        }
        else {
            for (var i = 0; datas && i < datas.length; i++) {
                var data = datas[i];
                // if (tarLayer == 0) {
                //     tarLayer = TimeUitl.isIn7Days() ? 0 : (self.qiShu - 1) * 1000;
                // }
                var gua = data.id;
                if (self.qiShu >= 2) {
                    gua = gua - (self.qiShu - 1) * 1000;
                }
                if (gua == tarLayer + 1) {
                    ret = data.power <= Model_player.voMine.str;
                    break;
                }
            }
        }
        return ret;
    };
    ModelWarToDead.prototype.warHasEnd = function () {
        var bool = true;
        if (TimeUitl.isIn7Days()) {
            return false;
        }
        else if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            return false;
        }
        var arr = GGlobal.modelActivity.getGroup(UIConst.CHAOZHIFL); //Model_Activity.activityObj[UIConst.CHAOZHIFL];
        for (var i = 0; arr && i < arr.length; i++) {
            var temp = arr[i];
            if (temp.id == UIConst.WARTODEAD_7OUT) {
                bool = false;
                break;
            }
        }
        if (bool) {
            ViewCommonWarn.text("活动已结束");
        }
        return bool;
    };
    ModelWarToDead.msg_datas = "msg_datas";
    ModelWarToDead.msg_jlDrop = "msg_jlDrop";
    return ModelWarToDead;
}(BaseModel));
__reflect(ModelWarToDead.prototype, "ModelWarToDead");
