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
var ViewCouSelectPanel = (function (_super) {
    __extends(ViewCouSelectPanel, _super);
    function ViewCouSelectPanel() {
        var _this = _super.call(this) || this;
        _this.setSkin("country", "country_atlas0", "ViewCouSelectPanel");
        return _this;
    }
    ViewCouSelectPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "ViewCouSelectPanel"));
    };
    ViewCouSelectPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    ViewCouSelectPanel.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.tab0.getChild("n0").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/countrybg.png");
        IconUtil.setImg(self.tab1.getChild("n0").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/countrybg.png");
        IconUtil.setImg(self.tab2.getChild("n0").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/countrybg.png");
        IconUtil.setImg(self.tab0.getChild("icon").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/country1.png");
        IconUtil.setImg(self.tab1.getChild("icon").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/country2.png");
        IconUtil.setImg(self.tab2.getChild("icon").asLoader, Enum_Path.IMAGE_MODULES_URL + "country/country3.png");
        self.addListen();
        self.updateView();
    };
    ViewCouSelectPanel.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.tab0.getChild("n0").asLoader, null);
        IconUtil.setImg(self.tab1.getChild("n0").asLoader, null);
        IconUtil.setImg(self.tab2.getChild("n0").asLoader, null);
        IconUtil.setImg(self.tab0.getChild("icon").asLoader, null);
        IconUtil.setImg(self.tab1.getChild("icon").asLoader, null);
        IconUtil.setImg(self.tab2.getChild("icon").asLoader, null);
        this.removeListen();
    };
    ViewCouSelectPanel.prototype.addListen = function () {
        this.btnJion.addClickListener(this.onJoin, this);
        this.btnRandom.addClickListener(this.onRandom, this);
        GGlobal.control.listen(Enum_MsgType.COUNTRY_UPDATE, this.onHide, this);
    };
    ViewCouSelectPanel.prototype.removeListen = function () {
        this.btnJion.removeClickListener(this.onJoin, this);
        this.btnRandom.removeClickListener(this.onRandom, this);
        GGlobal.control.remove(Enum_MsgType.COUNTRY_UPDATE, this.onHide, this);
        GGlobal.layerMgr.close(UIConst.COUNTRY_SELECT);
    };
    ViewCouSelectPanel.prototype.updateView = function () {
        this.labReward.text = ConfigHelp.getSystemNum(3401) + "";
    };
    ViewCouSelectPanel.prototype.onJoin = function () {
        ViewAlert.show("确定加入" + Model_Country.getCountryName(this.c1.selectedIndex + 1) + "？", Handler.create(this, function func() {
            GGlobal.modelCountry.CG_SELECT_COUNTRY(this.c1.selectedIndex + 1);
        }, null, true), ViewAlert.OKANDCANCEL, "确定", "取消");
    };
    ViewCouSelectPanel.prototype.onRandom = function () {
        GGlobal.modelCountry.CG_RANDOM_COUNTRY();
    };
    ViewCouSelectPanel.prototype.guide_country_random_join = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.btnRandom, self.btnRandom.width / 2, self.btnRandom.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.btnRandom, self.btnRandom.width / 2, 0, -90, -106, -100);
        if (self.btnRandom.parent)
            self.btnRandom.parent.setChildIndex(self.btnRandom, self.btnRandom.parent.numChildren - 1);
    };
    ViewCouSelectPanel.URL = "ui://uwzc58njlz1x1";
    return ViewCouSelectPanel;
}(UIPanelBase));
__reflect(ViewCouSelectPanel.prototype, "ViewCouSelectPanel");
