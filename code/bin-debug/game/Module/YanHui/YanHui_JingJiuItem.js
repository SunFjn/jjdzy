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
var YanHui_JingJiuItem = (function (_super) {
    __extends(YanHui_JingJiuItem, _super);
    function YanHui_JingJiuItem() {
        return _super.call(this) || this;
    }
    YanHui_JingJiuItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "YanHui_JingJiuItem"));
    };
    YanHui_JingJiuItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YanHui_JingJiuItem.prototype.setVo = function (cfg) {
        var self = this;
        self.vo = cfg;
        self.nameLb.text = cfg.name;
        self.fwLb.text = "氛围值+" + cfg.fw;
        self.grid0.isShowEff = self.grid0.tipEnabled = true;
        self.grid1.isShowEff = self.grid1.tipEnabled = true;
        self.grid0.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
        self.grid1.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1))[0];
        var surNum = GGlobal.modelYanHui.jingJiuData[cfg.id];
        self.surLb.text = "本场剩余:" + HtmlUtil.fontNoSize(surNum + "", Color.getColorStr(surNum <= 0 ? 6 : 1)) + "/" + cfg.time;
        var costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg.consume))[0];
        self.costLb.setImgUrl(costItem.icon);
        self.costLb.setCount(costItem.count);
        self.jjBt.addClickListener(self.jjHandler, self);
    };
    YanHui_JingJiuItem.prototype.jjHandler = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        if (model.jingJiuData[self.vo.id] <= 0) {
            ViewCommonWarn.text("无敬酒次数");
            return;
        }
        if (ConfigHelp.checkEnough(self.vo.consume)) {
            GGlobal.modelYanHui.CG_House_jingjiu_11459(self.vo.id);
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                GGlobal.layerMgr.close2(UIConst.YANHUI_TOAST);
            }));
        }
    };
    YanHui_JingJiuItem.prototype.clean = function () {
        var self = this;
        self.grid0.clean();
        self.grid1.clean();
        self.jjBt.removeClickListener(self.jjHandler, self);
    };
    YanHui_JingJiuItem.URL = "ui://4x7dk3lhgz25t";
    return YanHui_JingJiuItem;
}(fairygui.GComponent));
__reflect(YanHui_JingJiuItem.prototype, "YanHui_JingJiuItem");
