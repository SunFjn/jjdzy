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
var ChildMoneyTreeProgress = (function (_super) {
    __extends(ChildMoneyTreeProgress, _super);
    function ChildMoneyTreeProgress() {
        var _this = _super.call(this) || this;
        _this.autoRemove = true;
        return _this;
    }
    ChildMoneyTreeProgress.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ChildMoneyTreeProgress"));
    };
    ChildMoneyTreeProgress.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ChildMoneyTreeProgress.prototype.update = function (opt) {
        var self = this;
        var model = GGlobal.homemodel;
        var id = model.getBuildCfgIDByType(HomeModel.GOD_HOUSE);
        if (id) {
            var t = JSON.parse(Config.fddc_019[model.home_type].zengjia)[0][2];
            var a = Config.fdjk_019[id];
            self.lbTime.text = ConfigHelp.numToStr(model.god_awards) + "/" + ConfigHelp.numToStr(a.cishu / 600 * t);
            self.lbMoney.text = t * 6 + "/时";
        }
    };
    ChildMoneyTreeProgress.prototype.onAdd = function () {
        var self = this;
        self.setXY(-100, -150);
        self.n10.text = GGlobal.homemodel.isSelfHome ? "领取" : "窃取";
        self.role.headGroup.addChild(self.displayObject);
    };
    ChildMoneyTreeProgress.prototype.onRemove = function () {
        var a = this;
        a.role.headGroup.removeChild(a.displayObject);
        Pool.recover("ChildMoneyTreeProgress", a);
    };
    ChildMoneyTreeProgress.create = function (role) {
        var temp = Pool.getItemByCreateFun("ChildMoneyTreeProgress", ChildMoneyTreeProgress.createInstance);
        temp.role = role;
        return temp;
    };
    ChildMoneyTreeProgress.URL = "ui://y0plc878wy1s1s";
    return ChildMoneyTreeProgress;
}(fairygui.GComponent));
__reflect(ChildMoneyTreeProgress.prototype, "ChildMoneyTreeProgress");
