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
var YuanXiaoRole = (function (_super) {
    __extends(YuanXiaoRole, _super);
    function YuanXiaoRole() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        return _this;
    }
    YuanXiaoRole.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_YuanXiao", "YuanXiaoRole"));
    };
    YuanXiaoRole.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YuanXiaoRole.prototype.setVo = function (type, vo) {
        var self = this;
        if (vo) {
            self.promptGroup.visible = false;
            self.dataGroup.visible = true;
            self.ldImg.visible = vo.state == 1;
            self.container.setUIRole(vo.job, vo.weapon, vo.ride);
            self.powerLb.text = vo.power + "";
            self.nameLb.text = vo.name;
            self.ldBt.visible = vo.state == 0;
            self.ldBt.addClickListener(self.OnLD, self);
        }
        else {
            self.promptGroup.visible = true;
            self.dataGroup.visible = false;
            self.container.setUIRole(1, 0, 0, 100001);
        }
    };
    YuanXiaoRole.prototype.OnLD = function () {
        var self = this;
        GGlobal.modelyuanxiao.CG_YuanXiaoLocal_battleHid_11633(self.type, self.vo.id);
    };
    YuanXiaoRole.prototype.clean = function () {
        var self = this;
        self.container.setUIRole(null);
    };
    YuanXiaoRole.URL = "ui://ajaichn8wtx2q";
    return YuanXiaoRole;
}(fairygui.GComponent));
__reflect(YuanXiaoRole.prototype, "YuanXiaoRole");
