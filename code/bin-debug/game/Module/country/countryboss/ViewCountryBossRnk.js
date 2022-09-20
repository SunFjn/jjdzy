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
var ViewCountryBossRnk = (function (_super) {
    __extends(ViewCountryBossRnk, _super);
    function ViewCountryBossRnk() {
        var _this = _super.call(this) || this;
        _this.dta = [];
        fairygui.UIObjectFactory.setPackageItemExtension(CountryBossRnk.URL, CountryBossRnk);
        _this.loadRes("country", "country_atlas0");
        return _this;
    }
    ViewCountryBossRnk.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "ViewCountryBossRnk"));
    };
    ViewCountryBossRnk.prototype.childrenCreated = function () {
        GGlobal.createPack("country");
        var s = this;
        s.view = fairygui.UIPackage.createObject("country", "ViewCountryBossRnk").asCom;
        s.contentPane = s.view;
        this.frame = (s.view.getChild("frame"));
        this.list = (s.view.getChild("list"));
        this.lbMine = (s.view.getChild("lbMine"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewCountryBossRnk.prototype.renderHandle = function (index, obj) {
        var item = obj;
        var d = this.dta;
        item.setdata(d[index], index);
    };
    ViewCountryBossRnk.prototype.update = function () {
        this.dta = GGlobal.modelCtryBoss.battleInfo.others;
        this.list.numItems = this.dta.length;
        if (!this.dta.length) {
            this.lbMine.text = "";
        }
        else {
            var rk = "未上榜";
            var d = this.dta;
            var nm = Model_player.voMine.name;
            for (var i = 0; i < d.length; i++) {
                if (Model_player.isMine(d[i].name)) {
                    rk = (i + 1) + "";
                    break;
                }
            }
            this.lbMine.text = "我的排名：" + rk + "              我的伤害：" + ConfigHelp.getYiWanText(GGlobal.modelCtryBoss.battleInfo.myDamage);
        }
    };
    ViewCountryBossRnk.prototype.onShown = function () {
        this.update();
        GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_batInfo, this.update, this);
    };
    ViewCountryBossRnk.prototype.onHide = function () {
        GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_batInfo, this.update, this);
        GGlobal.layerMgr.close(UIConst.COUNTRYBOSS_RANK1);
        this.list.numItems = 0;
    };
    ViewCountryBossRnk.URL = "ui://uwzc58njofde2l";
    return ViewCountryBossRnk;
}(UIModalPanel));
__reflect(ViewCountryBossRnk.prototype, "ViewCountryBossRnk");
