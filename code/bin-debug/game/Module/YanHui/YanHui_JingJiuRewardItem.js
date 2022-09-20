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
var YanHui_JingJiuRewardItem = (function (_super) {
    __extends(YanHui_JingJiuRewardItem, _super);
    function YanHui_JingJiuRewardItem() {
        return _super.call(this) || this;
    }
    YanHui_JingJiuRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "YanHui_JingJiuRewardItem"));
    };
    YanHui_JingJiuRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YanHui_JingJiuRewardItem.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        var cfg = Config.party9_298[vo.jjID];
        self.contentLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(3)) + "\n向全场敬了一杯\n" + HtmlUtil.fontNoSize(cfg.name, Color.getColorStr(cfg.pz));
        self.grid.isShowEff = self.grid.tipEnabled = true;
        self.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1))[0];
        self.drawImg.visible = vo.state == 2;
        self.drawBt.visible = vo.state == 1;
        self.drawBt.checkNotice = vo.state == 1;
        self.drawBt.addClickListener(self.onDraw, self);
    };
    YanHui_JingJiuRewardItem.prototype.onDraw = function () {
        GGlobal.modelYanHui.CG_House_lingjiang_11461(this.vo.id);
    };
    YanHui_JingJiuRewardItem.prototype.clean = function () {
        var self = this;
        self.drawBt.removeClickListener(self.onDraw, self);
        self.grid.clean();
    };
    YanHui_JingJiuRewardItem.URL = "ui://4x7dk3lhgz25v";
    return YanHui_JingJiuRewardItem;
}(fairygui.GComponent));
__reflect(YanHui_JingJiuRewardItem.prototype, "YanHui_JingJiuRewardItem");
