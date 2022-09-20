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
var Model_CountrySkill = (function (_super) {
    __extends(Model_CountrySkill, _super);
    function Model_CountrySkill() {
        var _this = _super.call(this) || this;
        _this.shengwang = 0;
        _this.status = 1; //B:王位之争活动开启状态，0：未开启，1：已开启
        _this.skillArr = [];
        return _this;
    }
    /**打开界面 */
    Model_CountrySkill.prototype.CG_OPENUI = function () {
        var bates = this.getBytes();
        this.sendSocket(6001, bates);
    };
    /**激活或升级 I:技能idB:状态：1：激活，2：升级 */
    Model_CountrySkill.prototype.CG_JIHUO_OR_UPLV = function (skillId) {
        var bates = this.getBytes();
        bates.writeInt(skillId);
        this.sendSocket(6003, bates);
    };
    //协议处理
    Model_CountrySkill.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(6002, this.GC_OPENUI_6002, this);
        mgr.regHand(6004, this.GC_JIHUO_OR_UPLV_6004, this);
    };
    //打开界面返回 [I:技能idB:是否激活，0：未激活，1：激活]技能列表I:国家战力I:国家声望
    Model_CountrySkill.prototype.GC_OPENUI_6002 = function (self, data) {
        self.skillArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var skillId = data.readInt();
            var isAct = data.readByte();
            var cfg = Config.gjjn_748[skillId];
            self.skillArr[cfg.wz - 1] = { skillId: skillId, isAct: isAct, cfg: cfg };
        }
        self.shengwang = data.readLong();
        self.status = data.readByte();
        GGlobal.control.notify(Enum_MsgType.COUNTRY_SKILL_OPEN_UI);
        GGlobal.control.notify(Enum_MsgType.COUNTRY_SKILL_RED);
    };
    //激活或升级返回 B:状态：0：失败，1：成功，2：未满足条件field: state I:技能id
    Model_CountrySkill.prototype.GC_JIHUO_OR_UPLV_6004 = function (self, data) {
        var res = data.readByte();
        var skillId = data.readInt();
        self.shengwang = data.readLong();
        if (res == 1) {
            var v = Config.gjjn_748[skillId];
            self.skillArr[v.wz - 1].skillId = skillId;
            self.skillArr[v.wz - 1].cfg = v;
            self.skillArr[v.wz - 1].isAct = 1;
            GGlobal.control.notify(Enum_MsgType.COUNTRY_SKILL_UP);
            GGlobal.control.notify(Enum_MsgType.COUNTRY_SKILL_RED);
        }
        else {
            ViewCommonWarn.text("升级失败");
        }
    };
    Model_CountrySkill.prototype.checkRed = function () {
        if (!this.canUpSkill()) {
            return false;
        }
        var arr = this.skillArr;
        for (var i = 0; i < arr.length; i++) {
            var red = this.checkRedVo(arr[i].skillId);
            if (red)
                return true;
        }
        return false;
    };
    Model_CountrySkill.prototype.checkRedVo = function (id) {
        if (!this.canUpSkill()) {
            return false;
        }
        var cfg = Config.gjjn_748[id];
        var red1 = false; //总等级满足
        if (cfg.tj > 0) {
            var total = 0;
            for (var i = 0; i < this.skillArr.length; i++) {
                var v = this.skillArr[i];
                total += (v.skillId % 1000);
            }
            red1 = total >= cfg.tj;
        }
        else {
            red1 = true;
        }
        //消耗满足
        var red2 = false;
        if (cfg.consume != "0") {
            var consume = JSON.parse(cfg.consume);
            red2 = this.shengwang >= Number(consume[0][2]);
        }
        return red1 && red2;
    };
    Model_CountrySkill.prototype.canUpSkill = function () {
        if (Model_Country.kingName == "") {
            return false;
        }
        if (Model_Country.kingName != Model_player.voMine.name) {
            return false;
        }
        if (GGlobal.modelCouSkill.status == 1) {
            return false;
        }
        return true;
    };
    return Model_CountrySkill;
}(BaseModel));
__reflect(Model_CountrySkill.prototype, "Model_CountrySkill");
