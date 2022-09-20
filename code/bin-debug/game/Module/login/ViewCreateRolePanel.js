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
var ViewCreateRolePanel = (function (_super) {
    __extends(ViewCreateRolePanel, _super);
    function ViewCreateRolePanel() {
        var _this = _super.call(this) || this;
        _this.currentState = -1;
        // private nameReg = /[^0-9a-zA-Z\u4E00-\u9FCB\u706c\u4e36\u4e3f\u4e44\u4e28\uff06\u222f\u27b7\u27b9\u221d\u2534\u306e\u30c7\u039f\u042d\u30b7\u224c\uffe1\u3049\u3005\u03b2\u0025\u3084]/g;
        _this.nameReg = /[^0-9a-zA-Z\u4E00-\u9fa50]/g;
        _this.isShowOpenAnimation = false;
        _this.setSkin("createRole", "createRole_atlas0", "ViewCreateRolePanel");
        return _this;
    }
    ViewCreateRolePanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("createRole", "ViewCreateRolePanel"));
    };
    ViewCreateRolePanel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ChildRoleBtn.URL, ChildRoleBtn);
    };
    ViewCreateRolePanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        // this.labName.restrict = "0-9a-zA-Z\u4E00-\u9FCB";
        self.c1.selectedIndex = -1;
        if (GGlobal.sdk)
            GGlobal.sdk.RegisterReport();
        GGlobal.modelLogin.CG_CreateEnter_Complete();
        self.btn1.vo = 1;
        self.btn2.vo = 2;
        self.btn3.vo = 3;
        if (!Model_GlobalMsg.rename) {
            self.labName.touchable = false;
        }
        GGlobal.layerMgr.addChildMainBg();
        self.onrelize();
        GGlobal.control.listen(Enum_MsgType.ONRESIZE, self.onrelize, self);
    };
    ViewCreateRolePanel.prototype.onrelize = function () {
        var sc = LayerManager.getFullScreenSc();
        this.setScale(sc, sc);
        var xx = (App.stage.stageWidth - this.width * sc) >> 1;
        var yy = (App.stage.stageHeight - this.height * sc) >> 1;
        this.setXY(xx, yy); //不考虑横屏
    };
    ViewCreateRolePanel.prototype.onShown = function () {
        GGlobal.main.hideLoadBg();
        this.addListen();
        this.updateView();
    };
    ViewCreateRolePanel.prototype.onHide = function () {
        this.removeListen();
        if (this.roleEff) {
            EffectMgr.instance.removeEff(this.roleEff);
            this.roleEff = null;
        }
        if (this.eff) {
            EffectMgr.instance.removeEff(this.eff);
            this.eff = null;
        }
        GGlobal.control.remove(Enum_MsgType.ONRESIZE, this.onrelize, this);
        IconUtil.setImg(this.imgSelect, null);
    };
    ViewCreateRolePanel.prototype.onFocusOut = function () {
        window.scrollTo(0, 0);
    };
    ViewCreateRolePanel.prototype.addListen = function () {
        var self = this;
        self.registerEvent(true);
    };
    ViewCreateRolePanel.prototype.registerEvent = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.onSelectJob, self);
        EventUtil.register(pFlag, self.labName, egret.TextEvent.CHANGE, self.onInput, self);
        EventUtil.register(pFlag, self, egret.Event.ENTER_FRAME, self.onframe, self);
        EventUtil.register(pFlag, self.btnRandom, egret.TouchEvent.TOUCH_TAP, self.onRandomName, self);
        EventUtil.register(pFlag, self.btnEnter, egret.TouchEvent.TOUCH_TAP, self.onEnter, self);
        GGlobal.modelLogin.register(pFlag, "createRoleResult", self.enterResult, self);
        if (PlatformManager.isTanWan && GGlobal.loginArg && GGlobal.loginArg.os == "ios") {
            EventUtil.register(pFlag, self.labName, egret.FocusEvent.FOCUS_OUT, self.onFocusOut, self);
        }
    };
    ViewCreateRolePanel.prototype.removeListen = function () {
        var self = this;
        self.registerEvent(false);
    };
    ViewCreateRolePanel.prototype.updateView = function () {
        var job = RandomName.getRndStr([1, 3]);
        this.c1.selectedIndex = job - 1;
        this.onRandomName();
        if (!this.eff) {
            var effImg = this["n29"];
            this.eff = EffectMgr.addEff("uieff/10015", this.displayListContainer, effImg.x + effImg.width / 2, effImg.y + effImg.height / 2 - 250, 600);
        }
    };
    ViewCreateRolePanel.prototype.onSelectJob = function () {
        if (this.currentState == this.c1.selectedIndex) {
            return;
        }
        this.currentState = this.c1.selectedIndex;
        this.enterTime = egret.getTimer() + 60000;
        IconUtil.setImg(this.imgSelect, Enum_Path.BACK_URL + "crero" + (this.currentState + 1) + ".png");
        var urlArr = [10013, 10014, 10012];
        var posY = [0, 87, 0];
        var posX = [0, -28, 0];
        if (this.roleEff) {
            EffectMgr.instance.removeEff(this.roleEff);
            this.roleEff = null;
        }
        this.roleEff = EffectMgr.addEff("uieff/" + urlArr[this.currentState], this.displayListContainer, this.imgSelect.x + this.imgSelect.width / 2 + posX[this.currentState], this.imgSelect.y + this.imgSelect.height / 2 + posY[this.currentState], 1000);
    };
    ViewCreateRolePanel.prototype.onRandomName = function () {
        this.selName = RandomName.getName();
        this.labName.text = this.selName;
        this.enterTime = egret.getTimer() + 60000;
    };
    ViewCreateRolePanel.prototype.onEnter = function () {
        this.enterTime = 0;
        var name = this.labName.text;
        // var name = this.selName;
        name = name.replace(/\s+/g, ''); //过滤空格
        if (name == "") {
            this.enterResult(-1);
            return;
        }
        var len = this.getStrByteLen(name);
        if (len > 12) {
            this.enterResult(-4);
            return;
        }
        var state = this.c1.selectedIndex + 1;
        ModelLogin.roleName = name;
        GGlobal.modelLogin.requestCreateRole(state, name);
    };
    ViewCreateRolePanel.prototype.onInput = function () {
        // var name = this.labName.text;
        // name = name.replace(/\s+/g, "");//去掉所有空格
        // var len = this.getStrByteLen(name);
        // if (len > 12) {
        // 	// name = this.selName;
        // }
        // this.enterTime = egret.getTimer() + 60000;
        // if (name != this.labName.text) {
        // 	this.labName.text = name;
        // }
        var e = this, t = e.labName.text, n = t.length;
        if (t.length > 0) {
            var o = t.charAt(n - 1), i = o.match(e.nameReg);
            if (null == i)
                return;
            t = t.substr(0, n - 1);
        }
        var n = this.getStrByteLen(t);
        e.enterTime = egret.getTimer() + 60000;
        if (t != e.labName.text) {
            e.labName.text = t;
        }
    };
    ViewCreateRolePanel.prototype.getStrByteLen = function (str) {
        var len = str.replace(/[^x00-xFF]/g, '**').length;
        return len;
    };
    /**-1空字符 -2名字重复 -3名字中含有非法字符 -4输入过长*/
    ViewCreateRolePanel.prototype.enterResult = function (type) {
        this.enterTime = type;
        this.labTime.color = 0xFF0000;
        if (type == -1) {
            this.labTime.text = "请输入名字";
        }
        else if (type == -2) {
            this.labTime.text = "名字已存在";
        }
        else if (type == -3) {
            this.labTime.text = "名字中含有非法字符";
        }
        else if (type == -4) {
            this.labTime.text = "名字长度不能超过6个汉字或12个英文数字";
        }
    };
    ViewCreateRolePanel.prototype.onframe = function () {
        if (this.enterTime > 0) {
            var now = egret.getTimer();
            var time = this.enterTime - now;
            this.labTime.color = 0x00FF00;
            if (time > 0) {
                time = Math.ceil(time / 1000);
                this.labTime.text = time + "秒后自动进入游戏";
            }
            else {
                this.labTime.text = "";
                this.onEnter();
            }
        }
    };
    ViewCreateRolePanel.URL = "ui://hpazy1tefurkg";
    return ViewCreateRolePanel;
}(UIPanelBase));
__reflect(ViewCreateRolePanel.prototype, "ViewCreateRolePanel");
