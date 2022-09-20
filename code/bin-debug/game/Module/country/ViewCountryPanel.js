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
var ViewCountryPanel = (function (_super) {
    __extends(ViewCountryPanel, _super);
    function ViewCountryPanel() {
        var _this = _super.call(this) || this;
        _this._first = true;
        _this.setSkin("country", "country_atlas0", "ViewCountryPanel");
        return _this;
    }
    ViewCountryPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "ViewCountryPanel"));
    };
    ViewCountryPanel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(VCountryBtn.URL, VCountryBtn);
    };
    ViewCountryPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    ViewCountryPanel.prototype.onShown = function () {
        var s = this;
        s.addListen();
        s.updateView();
        GGlobal.modelCountry.CG_OPENUI();
        if (s._first) {
            GGlobal.modelCountry.CG_COUNTRY_DONATION();
            s._first = false;
        }
        s.btn00.setIcon(1);
        s.btn01.setIcon(2);
        s.btn10.setIcon(3);
        s.btn11.setIcon(4);
        s.btn20.setIcon(7);
        // s.btn20.touchable = false;
        s.btn21.setIcon(6);
        s.btn21.touchable = false;
        // s.btn21.visible = false;
    };
    ViewCountryPanel.prototype.onHide = function () {
        this.removeListen();
    };
    ViewCountryPanel.prototype.addListen = function () {
        var s = this;
        s.btn00.addClickListener(s.openView00, s);
        s.btn10.addClickListener(s.openView10, s);
        s.btn20.addClickListener(s.openView20, s);
        s.btn01.addClickListener(s.openView01, s);
        s.btn11.addClickListener(s.openView11, s);
        s.btn21.addClickListener(s.openView21, s);
        s.btnSkill.addClickListener(s.openSkill, s);
        GGlobal.control.listen(Enum_MsgType.COUNTRY_OPEN_UI, s.updateView, s);
        GGlobal.control.listen(Enum_MsgType.COUNTRY_DONATE_UPDATE, s.updateView, s);
        GGlobal.reddot.listen(ReddotEvent.CHECK_COUNTRY, s.checkNoticce, s);
        GGlobal.reddot.listen(UIConst.COUNTRY_SKILL, s.checkNoticce, s);
    };
    ViewCountryPanel.prototype.removeListen = function () {
        var s = this;
        s.btn00.removeClickListener(s.openView00, s);
        s.btn10.removeClickListener(s.openView10, s);
        s.btn20.removeClickListener(s.openView20, s);
        s.btn01.removeClickListener(s.openView01, s);
        s.btn11.removeClickListener(s.openView11, s);
        s.btn21.removeClickListener(s.openView21, s);
        s.btnSkill.removeClickListener(s.openSkill, s);
        GGlobal.control.remove(Enum_MsgType.COUNTRY_OPEN_UI, s.updateView, s);
        GGlobal.control.remove(Enum_MsgType.COUNTRY_DONATE_UPDATE, s.updateView, s);
        GGlobal.reddot.remove(ReddotEvent.CHECK_COUNTRY, s.checkNoticce, s);
        GGlobal.reddot.remove(UIConst.COUNTRY_SKILL, s.checkNoticce, s);
        GGlobal.layerMgr.close(UIConst.COUNTRY);
        IconUtil.setImg(s.img, null);
        IconUtil.setImg(s.frame.getChild("icon").asLoader, null);
    };
    ViewCountryPanel.prototype.updateView = function () {
        var s = this;
        IconUtil.setImg(s.frame.getChild("icon").asLoader, Model_Country.getCountryUrl(Model_player.voMine.country));
        s.labName0.text = Model_Country.kingName ? Model_Country.kingName : "虚位以待";
        s.labName1.text = Model_Country.ministerName ? Model_Country.ministerName : "虚位以待";
        s.labName2.text = Model_Country.genName ? Model_Country.genName : "虚位以待";
        var ctrName = Model_Country.getCouNameMin(Model_player.voMine.country);
        s.lab0.text = ctrName + "王";
        s.lab1.text = "【" + ctrName + "】丞相：";
        s.lab2.text = "【" + ctrName + "】大将军：";
        IconUtil.setImg(s.img, s.getCouFlag(Model_player.voMine.country));
        if (Model_Country.kingName) {
            s.viewHead.setdata(Model_Country.kingHead, Model_Country.kingLv, "", -1, false, Model_Country.kingFrame);
        }
        else {
            s.viewHead.setdata(null);
        }
        s.checkNoticce();
    };
    ViewCountryPanel.prototype.checkNoticce = function () {
        var s = this;
        var r = GGlobal.reddot;
        s.btn00.checkNotice = r.checkCondition(UIConst.COUNTRY_DONATE); //Model_Country.checkDonate();
        s.btn10.checkNotice = r.checkCondition(UIConst.NANZHENG_BEIZHAN);
        s.btn11.checkNotice = r.checkCondition(UIConst.COUNTRY_KINGSHIP);
        s.btn20.checkNotice = r.checkCondition(UIConst.COUNTRY_BOSS);
        s.btnSkill.checkNotice = r.checkCondition(UIConst.COUNTRY_SKILL);
    };
    ViewCountryPanel.prototype.getCouFlag = function (c) {
        return Enum_Path.IMAGE_MODULES_URL + "country/countrya" + c + ".png";
    };
    ViewCountryPanel.prototype.openView00 = function (e) {
        GGlobal.layerMgr.open(UIConst.COUNTRY_DONATE);
    };
    ViewCountryPanel.prototype.openView10 = function (e) {
        GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN);
    };
    ViewCountryPanel.prototype.openView20 = function (e) {
        // ViewCommonWarn.text("功能暂未开放");
        GGlobal.layerMgr.open(UIConst.COUNTRY_BOSS);
    };
    ViewCountryPanel.prototype.openView01 = function (e) {
        GGlobal.layerMgr.open(UIConst.SHOP, Config.stroe_218[2].px);
    };
    ViewCountryPanel.prototype.openView11 = function (e) {
        GGlobal.layerMgr.open(UIConst.COUNTRY_KINGSHIP);
    };
    ViewCountryPanel.prototype.openView21 = function (e) {
        ViewCommonWarn.text("功能暂未开放");
    };
    ViewCountryPanel.prototype.openSkill = function () {
        GGlobal.layerMgr.open(UIConst.COUNTRY_SKILL);
    };
    ViewCountryPanel.prototype.guidePage = function (step) {
        var self = this;
        if (step.arg == UIConst.NANZHENG_BEIZHAN) {
            GuideStepManager.instance.showGuide(self.btn10, self.btn10.width / 2, self.btn10.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, self.btn10, self.btn10.width / 2, 0, -90, -106, -100);
            if (self.btn10.parent)
                self.btn10.parent.setChildIndex(self.btn10, self.btn10.parent.numChildren - 1);
        }
    };
    ViewCountryPanel.URL = "ui://uwzc58njhy5r0";
    return ViewCountryPanel;
}(UIPanelBase));
__reflect(ViewCountryPanel.prototype, "ViewCountryPanel");
