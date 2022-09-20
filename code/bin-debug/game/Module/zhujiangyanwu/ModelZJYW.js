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
var ModelZJYW = (function (_super) {
    __extends(ModelZJYW, _super);
    function ModelZJYW() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModelZJYW.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(4712, this.GC4712, this);
        wsm.regHand(4714, this.GC4714, this);
        wsm.regHand(4716, this.GC4716, this);
        wsm.regHand(4718, this.GC4718, this);
    };
    ModelZJYW.prototype.GC4712 = function (self, bytes) {
        ModelZJYW.actState = bytes.readByte();
        self.notify(ModelZJYW.msg_act_state, ModelZJYW.actState == 1);
    };
    /**打开界面 */
    ModelZJYW.prototype.CG4713 = function () { this.sendSocket(4713, this.getBytes()); };
    ModelZJYW.prototype.GC4714 = function (self, bytes) {
        var state = bytes.readByte();
        var len = bytes.readShort();
        ModelZJYW.datas.length = 0;
        for (var i = 0; i < len; i++) {
            var pos = bytes.readShort();
            var id = bytes.readShort();
            var state_1 = bytes.readByte();
            ModelZJYW.datas.push({ pos: pos, id: id, state: state_1 });
        }
        ModelZJYW.remainCnt = bytes.readByte();
        GGlobal.reddot.setCondition(UIConst.CHILDZJYW, 0, self.getNotice());
        self.notify(ModelZJYW.msg_datas);
    };
    /**挑战 */
    ModelZJYW.prototype.CG4715 = function (id) {
        var bytes = this.getBytes();
        bytes.writeShort(id);
        ModelZJYW.curBoss = id;
        this.sendSocket(4715, bytes);
    };
    ModelZJYW.prototype.GC4716 = function (self, bytes) {
        var state = bytes.readByte();
        ModelZJYW.enemyid = bytes.readLong();
        if (state == 1) {
            // self.enterBattle();
            GGlobal.mapscene.enterScene(SceneCtrl.ZJYWBAT);
        }
        else {
            //1开打 2该位置不存在 3没有挑战次数 4该位置今天没有武将 5活动未开启 6未激活，演武令不足
            ViewCommonWarn.text(["", "", "该位置不存在", "没有挑战次数", "该位置今天没有武将", "活动未开启", "未激活"][state]);
        }
    };
    /**挑战结果 */
    ModelZJYW.prototype.CG4717 = function (pos, state) {
        var bytes = this.getBytes();
        bytes.writeShort(pos);
        bytes.writeByte(state);
        this.sendSocket(4717, bytes);
    };
    ModelZJYW.prototype.GC4718 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            // var scenectrl: ZJYWSceneCtrl = SceneCtrl.getCtrl(SceneCtrl.ZJYWBAT) as ZJYWSceneCtrl;
            // scenectrl.truelyExit();
        }
        else {
            //1成功 2该位置不存在 3没有挑战次数 4该位置今天没有武将 5活动未开启 6未激活，演武令不足 7战斗失败
            ViewCommonWarn.text(["", "", "该位置不存在", "没有挑战次数", '该位置今天没有武将', "活动未开启", "未激活, 演武令不足", "战斗失败"][state]);
        }
    };
    ModelZJYW.prototype.getNotice = function () {
        var datas = ModelZJYW.datas;
        if (ModelZJYW.remainCnt <= 0) {
            return false;
        }
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.state == 1 && ModelZJYW.remainCnt > 0) {
                return true;
            }
            else if (data.state == 0) {
                var cnt = Model_Bag.getItemCount(410100);
                var cfg = Config.zjywdl_005[data.id];
                if (cfg) {
                    var cost = cfg.cost;
                    if (cnt >= cost) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    ModelZJYW.getInfoByPos = function (pos) {
        var datas = this.datas;
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.pos == pos) {
                return data;
            }
        }
        return null;
    };
    ModelZJYW.msg_act_state = "msg_act_state";
    ModelZJYW.msg_datas = "msg_datas";
    ModelZJYW.datas = [];
    ModelZJYW.result = 0;
    ModelZJYW.enemyid = 0;
    return ModelZJYW;
}(BaseModel));
__reflect(ModelZJYW.prototype, "ModelZJYW");
