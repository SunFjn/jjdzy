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
 * 少主护送主界面
 */
var ShaoZhuEscortView = (function (_super) {
    __extends(ShaoZhuEscortView, _super);
    function ShaoZhuEscortView() {
        var _this = _super.call(this) || this;
        _this.localX = 0;
        _this.radomPointArr = [[-131, 74], [-46, 218], [-177, 372], [-268, 74], [-359, 377], [-459, 74], [-353, 218], [-541, 375]]; //随机出生点数组
        _this.radomIndexArr = [];
        _this.roleArr = [];
        _this.setSkin("ShaoZhuEscort", "ShaoZhuEscort_atlas0", "ShaoZhuEscortView");
        return _this;
    }
    ShaoZhuEscortView.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "ShaoZhuEscortView"));
    };
    ShaoZhuEscortView.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(EscortUIRole.URL, EscortUIRole);
    };
    ShaoZhuEscortView.prototype.initView = function () {
    };
    ShaoZhuEscortView.prototype.onShown = function () {
        var s = this;
        IconUtil.setImg1(Enum_Path.PIC_URL + "shaozhuEscort.jpg", this.bgImg);
        GGlobal.modelShaoZhuEscort.CG_OPEN_UI();
        this.addListen();
    };
    ShaoZhuEscortView.prototype.onHide = function () {
        var s = this;
        s.removeListen();
        GGlobal.layerMgr.close(UIConst.SHAOZHU_ESCORT);
        IconUtil.setImg1(null, this.bgImg);
    };
    /**
     * 添加事件
     */
    ShaoZhuEscortView.prototype.addListen = function () {
        var self = this;
        GGlobal.control.listen(UIConst.SHAOZHU_ESCORT, self.updatePage, self);
        self.escortBtn.addClickListener(this.openRefreshView, this);
        self.btnReport.addClickListener(this.onReport, this);
        self.addEventListener(egret.Event.ENTER_FRAME, self.onEnterFrame, self);
        GGlobal.reddot.listen(UIConst.SHAOZHU_ESCORT, self.checkNotice, self);
        GGlobal.control.listen("GC_INTER_SHAOZHUESCORT", self.updateTxt, self);
    };
    /**
     * 删除事件
     */
    ShaoZhuEscortView.prototype.removeListen = function () {
        var self = this;
        Timer.instance.remove(self.onTick, self);
        GGlobal.control.remove(UIConst.SHAOZHU_ESCORT, self.updatePage, self);
        self.escortBtn.removeClickListener(this.openRefreshView, this);
        self.btnReport.removeClickListener(this.onReport, this);
        self.removeEventListener(egret.Event.ENTER_FRAME, self.onEnterFrame, self);
        self.removeAllRole();
        GGlobal.reddot.remove(UIConst.SHAOZHU_ESCORT, self.checkNotice, self);
        GGlobal.control.remove("GC_INTER_SHAOZHUESCORT", self.updateTxt, self);
    };
    ShaoZhuEscortView.prototype.onEnterFrame = function (e) {
        if (!this.roleArr || this.roleArr.length <= 0)
            return;
        var len = this.roleArr.length;
        for (var i = 0; i < len; i++) {
            var role = this.roleArr[i];
            if (role) {
                var x = role.x + 0.5;
                if (x >= 600) {
                    x = -100;
                }
                role.x = x;
            }
        }
    };
    /**
     * 更新数据
     */
    ShaoZhuEscortView.prototype.updatePage = function () {
        var self = this;
        self.updateTxt();
        var end = Model_ShaoZhuEscort.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySec3(end - servTime);
            Timer.instance.listen(self.onTick, self, 1000);
        }
        else {
            self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySec3(0);
        }
        if (Model_ShaoZhuEscort.state == 0) {
            self.c1.selectedIndex = 0;
        }
        else {
            self.c1.selectedIndex = 1;
        }
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_ESCORT, 0, Model_ShaoZhuEscort.isGetAward);
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_ESCORT, 2, Model_ShaoZhuEscort.checkEscortNotice());
        self.escortBtn.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_ESCORT, 2);
        self.btnReport.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_ESCORT, 1);
        if (Model_ShaoZhuEscort.isGetAward) {
            ShaoZhuEscortRewardView.show();
        }
        self.refreshRole();
    };
    /**
     * 更新文本
     */
    ShaoZhuEscortView.prototype.updateTxt = function () {
        var self = this;
        var color0 = Model_ShaoZhuEscort.escort > 0 ? 2 : 6;
        var color1 = Model_ShaoZhuEscort.inter > 0 ? 2 : 6;
        self.escortTxt.text = "护送次数：" + HtmlUtil.fontNoSize(Model_ShaoZhuEscort.escort + "/" + Config.xtcs_004[7002].num, Color.getColorStr(color0));
        self.interTxt.text = "拦截次数：" + HtmlUtil.fontNoSize(Model_ShaoZhuEscort.inter + "/" + Config.xtcs_004[7003].num, Color.getColorStr(color1));
    };
    ShaoZhuEscortView.prototype.onTick = function () {
        var end = Model_ShaoZhuEscort.endTime;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        var timeRemain = end - servTime;
        if (timeRemain > 0) {
            this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySec3(end - servTime);
        }
        else {
            this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySec3(0);
            Timer.instance.remove(this.onTick, this);
        }
    };
    /**
     * 随机刷新人物
     */
    ShaoZhuEscortView.prototype.refreshRole = function () {
        this.removeAllRole(); //先移除所有人物模型
        if (!Model_ShaoZhuEscort.roleArr || Model_ShaoZhuEscort.roleArr.length <= 0)
            return;
        var len = Model_ShaoZhuEscort.roleArr.length;
        for (var i = 0; i < len; i++) {
            var vo = Model_ShaoZhuEscort.roleArr[i];
            var cfg = Config.szhs_401[vo.guardId];
            var role = EscortUIRole.createInstance();
            role.setVo(cfg.pfmx, vo);
            if (Model_player.voMine.id != vo.playerId) {
                // role.x = Math.random() * -325;
                // role.y = 150 + Math.random() * 100;
                var arr = this.radomPoint(i);
                role.x = arr[0];
                role.y = arr[1];
            }
            else {
                role.x = this.maskBg.width / 2 - role.width / 2;
                role.y = this.maskBg.height / 2 - role.height / 2;
            }
            this.maskBg.addChild(role);
            this.roleArr.push(role);
        }
    };
    /**
     * 移除场景所有人物模型
     */
    ShaoZhuEscortView.prototype.removeAllRole = function () {
        var self = this;
        if (self.roleArr && self.roleArr.length > 0) {
            var len = self.roleArr.length;
            for (var i = 0; i < len; i++) {
                var role = self.roleArr[i];
                role.remove();
                this.maskBg.removeChild(role);
                role = null;
            }
        }
        self.roleArr = [];
        self.radomIndexArr = [];
    };
    /**
     * 随机不重复坐标点
     */
    ShaoZhuEscortView.prototype.radomPoint = function (index) {
        var self = this;
        var radom;
        if (index == 0) {
            radom = Math.floor(Math.random() * 2);
        }
        else {
            radom = Math.floor(Math.random() * 8);
        }
        while (self.radomIndexArr.indexOf(radom) != -1) {
            radom = Math.floor(Math.random() * 8);
        }
        self.radomIndexArr.push(radom);
        var arr = self.radomPointArr[radom];
        return arr;
    };
    /**
     * 护送按钮事件
     */
    ShaoZhuEscortView.prototype.openRefreshView = function () {
        if (Model_ShaoZhuEscort.escort <= 0) {
            ViewCommonWarn.text("今日护送次数已耗尽");
            return;
        }
        GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_GUARD);
    };
    /**
     * 打开战报界面
     */
    ShaoZhuEscortView.prototype.onReport = function () {
        GGlobal.reddot.setCondition(UIConst.SHAOZHU_ESCORT, 1, false);
        this.btnReport.checkNotice = false;
        GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_REPORT);
    };
    /**
     * 打开拦截界面
     */
    ShaoZhuEscortView.prototype.openInterView = function (e) {
        var role = e.currentTarget;
        GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_REPORT, role.data);
    };
    /**
     * 战报红点
     */
    ShaoZhuEscortView.prototype.checkNotice = function () {
        this.btnReport.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_ESCORT, 1);
    };
    ShaoZhuEscortView.URL = "ui://lnw94ki2lnit6";
    return ShaoZhuEscortView;
}(UIPanelBase));
__reflect(ShaoZhuEscortView.prototype, "ShaoZhuEscortView");
