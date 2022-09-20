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
/**
 * 少主护送人物模型
 */
var EscortUIRole = (function (_super) {
    __extends(EscortUIRole, _super);
    function EscortUIRole() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    EscortUIRole.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "EscortUIRole"));
    };
    EscortUIRole.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.addClickListener(self.clickRole, self);
        GGlobal.control.listen("GC_INTER_SHAOZHUESCORT", self.updateInterState, self);
    };
    EscortUIRole.prototype.setVo = function (value, vo) {
        if (vo === void 0) { vo = null; }
        var self = this;
        self._data = vo;
        if (!self.awatar) {
            self.awatar = UIRole.create();
        }
        self.awatar.uiparent = self.displayListContainer;
        self.awatar.setPos(self.width / 2, self.height);
        self.awatar.setScaleXY(0.8, 0.8);
        self.awatar.setBody(value);
        self.awatar.setDir(1);
        self.awatar.setWeapon(value);
        self.awatar.onAdd();
        self.awatar.setAction(1);
        if (vo.state == 1 && Model_player.voMine.id != vo.playerId) {
            self.interImg.visible = true;
        }
        else {
            self.interImg.visible = false;
        }
        self.nameTxt.text = vo.playerName;
        self.nameTxt.color = Model_player.voMine.id == vo.playerId ? Color.YELLOWINT : Color.WHITEINT;
        var end = vo.timeRemain;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            self.timeTxt.text = DateUtil.getMSBySec3(end - servTime);
            Timer.instance.listen(self.onTick, self, 1000);
        }
        else {
            self.timeTxt.text = DateUtil.getMSBySec3(0);
        }
        if (!self.shaozhuUI) {
            self.shaozhuUI = UIRole.create();
        }
        self.shaozhuUI.setPos(0, self.height);
        self.shaozhuUI.setScaleXY(0.8, 0.8);
        self.shaozhuUI.setBody(300001);
        self.shaozhuUI.uiparent = self.displayListContainer;
        self.shaozhuUI.onAdd();
        self.shaozhuUI.setAction(1);
    };
    EscortUIRole.prototype.onTick = function () {
        var end = this._data.timeRemain;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            this.timeTxt.text = DateUtil.getMSBySec3(end - servTime);
        }
        else {
            this.timeTxt.text = DateUtil.getMSBySec3(0);
            // Timer.instance.remove(this.onTick, this);
            this.remove();
        }
    };
    /**
     * 更新拦截状态图标
     */
    EscortUIRole.prototype.updateInterState = function () {
        if (Model_ShaoZhuEscort.winerid == Model_player.voMine.id && Model_ShaoZhuEscort.interPlayerId == this._data.playerId) {
            this.interImg.visible = false;
        }
    };
    EscortUIRole.prototype.remove = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        if (self.interImg) {
            self.interImg.visible = false;
            self.interImg = null;
        }
        if (self.shaozhuUI) {
            self.shaozhuUI.onRemove();
            self.shaozhuUI = null;
        }
        if (self.timeTxt) {
            self.timeTxt.text = "";
            self.timeTxt = null;
        }
        if (self.nameTxt) {
            self.nameTxt.text = "";
            self.nameTxt = null;
        }
        self.removeClickListener(self.clickRole, self);
        Timer.instance.remove(self.onTick, self);
        GGlobal.control.remove("GC_INTER_SHAOZHUESCORT", self.updateInterState, self);
    };
    /**
     * 打开拦截界面
     */
    EscortUIRole.prototype.clickRole = function () {
        if (Model_player.voMine.id == this._data.playerId)
            return;
        GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_INTER, this._data);
    };
    EscortUIRole.URL = "ui://lnw94ki2n8o7s";
    return EscortUIRole;
}(fairygui.GComponent));
__reflect(EscortUIRole.prototype, "EscortUIRole");
