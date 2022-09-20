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
var YanHui_ToumamentItem = (function (_super) {
    __extends(YanHui_ToumamentItem, _super);
    function YanHui_ToumamentItem() {
        return _super.call(this) || this;
    }
    YanHui_ToumamentItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "YanHui_ToumamentItem"));
    };
    YanHui_ToumamentItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YanHui_ToumamentItem.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        var cfg = Config.NPC_200[vo.id];
        self.nameLb.text = cfg.name;
        self.head.setdata(RoleUtil.getHeadImg(cfg.head), -1, "", -1, true);
        self.fwLb.text = "氛围值+" + vo.fw + "/人";
        var rewardVo0 = ConfigHelp.makeItemListArr(JSON.parse(vo.reward))[0];
        self.grid0.isShowEff = self.grid0.tipEnabled = true;
        self.grid0.vo = rewardVo0;
        var rewardVo1 = ConfigHelp.makeItemListArr(JSON.parse(vo.reward1))[0];
        self.grid1.isShowEff = self.grid1.tipEnabled = true;
        self.grid1.vo = rewardVo1;
        var costVo = ConfigHelp.makeItemListArr(JSON.parse(vo.consume))[0];
        self.costLb.setImgUrl(costVo.icon);
        self.costLb.setCount(costVo.count);
        self.openBt.visible = GGlobal.modelYanHui.bossData[vo.id] == 0;
        self.openImg.visible = GGlobal.modelYanHui.bossData[vo.id] == 1;
        self.openBt.addClickListener(self.onOpen, self);
    };
    YanHui_ToumamentItem.prototype.onOpen = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        if (model.roleID != Model_player.voMine.id) {
            return ViewCommonWarn.text("比武只有主人才可开启");
        }
        if (ConfigHelp.checkEnough(self.vo.consume, true)) {
            GGlobal.modelYanHui.CG_House_kaiqiBiwu_11463(this.vo.id);
        }
    };
    YanHui_ToumamentItem.prototype.clean = function () {
        var self = this;
        self.openBt.removeClickListener(self.onOpen, self);
        self.grid0.clean();
        self.grid1.clean();
    };
    YanHui_ToumamentItem.URL = "ui://4x7dk3lhgz25m";
    return YanHui_ToumamentItem;
}(fairygui.GComponent));
__reflect(YanHui_ToumamentItem.prototype, "YanHui_ToumamentItem");
