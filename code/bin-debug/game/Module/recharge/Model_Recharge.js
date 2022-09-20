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
var Model_Recharge = (function (_super) {
    __extends(Model_Recharge, _super);
    function Model_Recharge() {
        var _this = _super.call(this) || this;
        /**首冲状态 */
        _this.scState = 0;
        _this.hasShouchong = false;
        _this.hasMRShouchong = false;
        /**每日首冲状态  */
        _this.mrscState = 0;
        _this.day = 0;
        _this.mrsc = 0;
        _this.mrscBox = [[0], [0], [0]];
        _this.scInfos = {}; //1可领取，2已领取
        _this.scTip = null;
        return _this;
    }
    Model_Recharge.prototype.setFirstChargeState = function () {
        this.scState = 1; //收到红点默认为充值成功
        GGlobal.reddot.remove(UIConst.SHOUCHONG, this.setFirstChargeState, this);
    };
    Model_Recharge.prototype.checkNotice = function () {
        var r = false;
        if (this.mrscState == 1) {
            r = true;
        }
        else {
            for (var i = 0; i < this.mrscBox.length; i++) {
                if (this.mrscBox[i][0] == 1) {
                    r = true;
                    break;
                }
            }
        }
        GGlobal.reddot.setCondition(UIConst.MEIRISHOUCHONG, 0, r);
        GGlobal.mainUICtr.setIconNotice(UIConst.MEIRISHOUCHONG, r);
    };
    Model_Recharge.prototype.setChongZhiState = function (id) {
        if (id == UIConst.SHOUCHONG) {
            GGlobal.modelRecharge.hasShouchong = true;
        }
        else if (id == UIConst.MEIRISHOUCHONG) {
            GGlobal.modelRecharge.hasMRShouchong = true;
        }
    };
    Model_Recharge.prototype.listenServ = function (m) {
        var s = this;
        var c = GGlobal.control;
        this.socket = m;
        m.regHand(1930, this.GC_MRSC_1932, this);
        m.regHand(1932, this.GC_MRSC_1934, this);
        m.regHand(1934, this.GC_MRSC_1936, this);
        m.regHand(1962, this.GC_SC_1962, this);
        m.regHand(1964, this.GC_SC_1964, this);
        m.regHand(2752, this.GC2752, this);
        m.regHand(2754, this.GC2754, this);
        m.regHand(2756, this.GC2756, this);
        GGlobal.reddot.listen(UIConst.SHOUCHONG, s.setFirstChargeState, s);
    };
    /**打开每日首冲界面  */
    Model_Recharge.prototype.CG_MRSC_1931 = function () {
        GGlobal.modelActivity.CG_OPENACT(UIConst.MEIRISHOUCHONG);
        // this.sendSocket(1931, this.getBytes());
    };
    /**
   [B]-B-B 每日首冲打开界面返回 [B:宝箱的状态0未达成1可领取2已领取]宝箱列表B:累计天数B:每日首充奖励领取状态，0：未充值，1：可领取，2：已领取*/
    Model_Recharge.prototype.GC_MRSC_1932 = function (s, b) {
        s.mrscBox = b.readFmt([["B"]])[0];
        s.day = b.readByte();
        s.mrscState = b.readByte();
        s.checkNotice();
        GGlobal.control.notify(Enum_MsgType.MEIRISHOUCHONGUP);
    };
    /**领取宝箱奖励 B:要领取的宝箱id */
    Model_Recharge.prototype.CG_MRSC_1933 = function (i) {
        var b = this.getBytes();
        b.writeByte(i);
        this.sendSocket(1931, b);
    };
    /** B-B  领取宝箱奖励返回 B:状态，1：成功，2：宝箱不存在，3：累计天数不满足，4：不能重复领取B:领取的宝箱id，成功时才返回 */
    Model_Recharge.prototype.GC_MRSC_1934 = function (s, b) {
        var r = b.readByte();
        if (r == 1) {
            var id = b.readByte();
            s.mrscBox[id - 1] = [2];
            s.checkNotice();
            GGlobal.control.notify(Enum_MsgType.MEIRISHOUCHONGUP);
        }
        else if (r == 2) {
            ViewCommonWarn.text("宝箱不存在");
        }
        else if (r == 3) {
            ViewCommonWarn.text("累计天数不满足");
        }
        else if (r == 4) {
            ViewCommonWarn.text("不能重复领取");
        }
    };
    /**每日首充奖励  */
    Model_Recharge.prototype.CG_MRSC_1935 = function () {
        this.sendSocket(1933, this.getBytes());
    };
    /**B 每日首充奖励返回 B:状态，0：首充没达成，不能领取，1：成功，4：不能重复领取 */
    Model_Recharge.prototype.GC_MRSC_1936 = function (s, b) {
        var r = b.readByte();
        if (r == 0) {
            ViewCommonWarn.text("您今日尚未进行充值");
        }
        else if (r == 1) {
            s.mrscState = 2;
            s.checkNotice();
            GGlobal.control.notify(Enum_MsgType.MEIRISHOUCHONGUP);
        }
        else if (r == 4) {
            ViewCommonWarn.text("不能重复领取");
        }
    };
    /**首充奖励返回 B:状态，0：首充没达成，不能领取，1：成功，2：不能重复领取 */
    Model_Recharge.prototype.CG_SC_1961 = function () {
        this.sendSocket(1961, this.getBytes());
    };
    /**首充奖励返回 B:状态，0：首充没达成，不能领取，1：成功，2：不能重复领取 */
    Model_Recharge.prototype.GC_SC_1962 = function (s, b) {
        var r = b.readByte();
        if (r == 1) {
            GGlobal.layerMgr.close2(UIConst.SHOUCHONG);
            s.hasShouchong = false;
            GGlobal.mainUICtr.removeIcon(UIConst.SHOUCHONG);
            GGlobal.control.notify(Enum_MsgType.SHOUCHONGUP);
        }
    };
    /**打开UI */
    Model_Recharge.prototype.CG2751 = function () { this.sendSocket(2751, this.getBytes()); };
    Model_Recharge.prototype.GC2752 = function (self, bytes) {
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var id = bytes.readByte();
            var state = bytes.readByte();
            self.scInfos[id] = state;
        }
        self.notify(Model_Recharge.msg_info);
    };
    /**领取 */
    Model_Recharge.prototype.CG2753 = function (id) {
        var bytes = this.getBytes();
        bytes.writeByte(id);
        this.sendSocket(2753, bytes);
    };
    Model_Recharge.prototype.GC2754 = function (self, bytes) {
        var state = bytes.readByte();
        if (state == 1) {
            var id = bytes.readByte();
            self.scInfos[id] = 2;
            self.notify(Model_Recharge.msg_info);
        }
        else {
            ViewCommonWarn.text("未达领取条件");
        }
    };
    /**是否首充过了 */
    Model_Recharge.prototype.getHasSC = function () {
        return Object.keys(this.scInfos).length > 0;
    };
    /**是否显示图标 */
    Model_Recharge.prototype.disShowIcon = function () {
        var keys = Object.keys(this.scInfos);
        var firstSt = this.scInfos[keys[0]];
        var secondSt = this.scInfos[keys[1]];
        return firstSt == 2 && secondSt == 2;
    };
    /**是否显示图标 */
    Model_Recharge.prototype.isFirstGet = function () {
        var keys = Object.keys(this.scInfos);
        var state1 = this.scInfos["1"];
        var state2 = this.scInfos["2"];
        var state3 = this.scInfos["3"];
        return (state1 == 2 || state2 == 2 || state3 == 2);
    };
    Model_Recharge.prototype.GC_SC_1964 = function (self, bytes) {
        Model_Recharge.heroJob = bytes.readByte();
    };
    Model_Recharge.prototype.GC2756 = function (self) {
        self.showOrHideSC(true);
    };
    /**关闭通知后端 */
    Model_Recharge.prototype.CG2757 = function () { this.sendSocket(2757, this.getBytes()); };
    Model_Recharge.prototype.showOrHideSC = function (value) {
        if (value) {
            if (!this.scTip) {
                var iconSC = GGlobal.mainUICtr.getIcon(UIConst.SHOUCHONG);
                if (iconSC && iconSC.parent) {
                    this.scTip = VSCTip.createInstance();
                    this.scTip.showPanel();
                    iconSC.parent.addChild(this.scTip);
                    this.scTip.x = iconSC.x + 65;
                    this.scTip.y = iconSC.y + 30;
                    var pic = JSON.parse(Config.xsc_731[4].zuo)[0][1];
                    this.scTip.getChild("container").showPic(Enum_Path.PIC_URL + pic + ".png");
                    this.scTip.addClickListener(function () { GGlobal.layerMgr.open(UIConst.SHOUCHONG); });
                }
            }
        }
        else {
            if (this.scTip) {
                this.scTip.parent.removeChild(this.scTip);
                this.scTip.hidePanel();
                this.scTip = null;
            }
        }
        this.visOnChange();
    };
    Model_Recharge.prototype.visOnChange = function () {
        var self = this;
        if (self.scTip) {
            self.scTip.visible = GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss();
            GGlobal.control.listen(Enum_MsgType.SCENE_CHANGE, onSceneChange, self);
        }
        else {
            GGlobal.control.remove(Enum_MsgType.SCENE_CHANGE, onSceneChange, self);
        }
        function onSceneChange() {
            if (self.scTip) {
                self.scTip.visible = GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss();
            }
        }
    };
    //--新首充
    Model_Recharge.msg_info = "msg_info";
    return Model_Recharge;
}(BaseModel));
__reflect(Model_Recharge.prototype, "Model_Recharge");
