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
var View_JiangHun_Panel = (function (_super) {
    __extends(View_JiangHun_Panel, _super);
    function View_JiangHun_Panel() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        _this.lineArr = [];
        _this.lineArr1 = [];
        _this.gridArr = [];
        _this.setSkin("role", "role_atlas0", "View_JiangHun_Panel");
        return _this;
    }
    View_JiangHun_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(JiangHunGrid.URL, JiangHunGrid);
    };
    View_JiangHun_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        for (var i = 0; i < 9; i++) {
            var grid = self["grid" + i];
            self.gridArr.push(grid);
            if (i > 0) {
                var line = self["line" + i];
                self.lineArr.push(line);
                var line1 = self["line_" + i];
                self.lineArr1.push(line1);
            }
            if (i < 4) {
                var tab = self["tab" + i];
                self.tabArr.push(tab);
            }
        }
        GGlobal.modeljh.CG_OPEN_JIANGHUN();
        GGlobal.modelRunMan.CG_OPENUI();
    };
    View_JiangHun_Panel.prototype.gridHandle = function (event) {
        var grid = event.target;
        if (grid.vo.isJiHuo) {
            GGlobal.layerMgr.open(UIConst.JIANGHUN_UP, grid.vo);
        }
    };
    View_JiangHun_Panel.prototype.suitHandle = function () {
        GGlobal.layerMgr.open(UIConst.JIANGHUN_SUIT, this.c1.selectedIndex + 1);
    };
    View_JiangHun_Panel.prototype.updateShow = function () {
        var self = this;
        Model_JiangHun.openIndex = 0;
        Model_JiangHun.level = 0;
        var power = 0;
        var arr = Model_JiangHun.jianghunArr[self.c1.selectedIndex];
        var cfg = Config.genteam_006[Model_JiangHun.suitIdArr[self.c1.selectedIndex]];
        this.promptLb.visible = false;
        for (var i = 0; i < self.gridArr.length; i++) {
            var vo = arr[i];
            self.gridArr[i].vo = vo;
            if (vo.isJiHuo == false) {
                if (Model_JiangHun.openIndex == 0) {
                    var type = vo.activationArr[0][0];
                    var pass = vo.activationArr[0][1];
                    self.promptLb.text = HtmlUtil.fontNoSize(Model_RunMan.getTypeName(type) + "·过关斩将", Color.getColorStr(type + 1)) + "通过" +
                        HtmlUtil.fontNoSize(pass + "关", Color.getColorStr(2)) + "可激活" + HtmlUtil.fontNoSize("“" + vo.name + "”", Color.getColorStr(vo.quality));
                    self.promptLb.visible = true;
                }
                Model_JiangHun.openIndex++;
            }
            Model_JiangHun.level += vo.level;
            power += vo.power;
            if (i != 0) {
                if (arr[i].isJiHuo) {
                    self.lineArr[i - 1].visible = true;
                    self.lineArr1[i - 1].visible = false;
                }
                else {
                    self.lineArr[i - 1].visible = false;
                    self.lineArr1[i - 1].visible = true;
                }
            }
        }
        if (cfg) {
            self.suitLb.text = cfg.lv + "阶";
            power += cfg.power;
            if (cfg.next > 0 && Model_JiangHun.level >= Config.genteam_006[cfg.next].need) {
                self.suitBt.checkNotice = true;
            }
            else {
                self.suitBt.checkNotice = false;
            }
        }
        else {
            self.suitLb.text = "0阶";
            self.suitBt.checkNotice = false;
        }
        self.powerLb.text = power + "";
        self.moneyLb.text = Model_player.voMine.hunhuo + "";
    };
    View_JiangHun_Panel.prototype.checkTabNotice = function () {
        var self = this;
        for (var i = 0; i < self.tabArr.length; i++) {
            if (i == 0) {
                self.tabArr[i].checkNotice = Model_JiangHun.checkTabNotice(0);
            }
            else {
                self.tabArr[i].checkNotice = GGlobal.reddot.checkCondition(UIConst.JIANGHUN, i);
            }
        }
        self.updateShow();
    };
    View_JiangHun_Panel.prototype.eventFunction = function (type) {
        var self = this;
        var event = EventUtil.register;
        for (var i = 0; i < 9; i++) {
            var grid = self.gridArr[i];
            event(type, grid, EventUtil.TOUCH, self.gridHandle, self);
        }
        event(type, self.suitBt, EventUtil.TOUCH, self.suitHandle, self);
        event(type, self.c1, fairygui.StateChangeEvent.CHANGED, self.checkTabNotice, self);
    };
    View_JiangHun_Panel.prototype.onShown = function () {
        var self = this;
        if (self.c1.selectedIndex == 0) {
            self.checkTabNotice();
        }
        else {
            self.c1.selectedIndex = 0;
        }
        GGlobal.reddot.listen(ReddotEvent.CHECK_JIANGHUN, self.checkTabNotice, self);
    };
    View_JiangHun_Panel.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.JIANGHUN);
        GGlobal.reddot.remove(ReddotEvent.CHECK_JIANGHUN, self.checkTabNotice, self);
    };
    View_JiangHun_Panel.URL = "ui://3tzqotadk8oze";
    return View_JiangHun_Panel;
}(UIPanelBase));
__reflect(View_JiangHun_Panel.prototype, "View_JiangHun_Panel");
