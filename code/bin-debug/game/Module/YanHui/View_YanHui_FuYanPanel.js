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
var View_YanHui_FuYanPanel = (function (_super) {
    __extends(View_YanHui_FuYanPanel, _super);
    function View_YanHui_FuYanPanel() {
        var _this = _super.call(this) || this;
        YanHuiManager.setExtends();
        _this.loadRes("YanHui", "YanHui_atlas0");
        return _this;
    }
    View_YanHui_FuYanPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "View_YanHui_FuYanPanel"));
    };
    View_YanHui_FuYanPanel.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("YanHui");
        self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_FuYanPanel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_YanHui_FuYanPanel.prototype.onShown = function () {
        var self = this;
        if (self._args instanceof Vo_YanHui) {
            self.vo = self._args;
        }
        else if (self._args instanceof Vo_Chat) {
            var arr = self._args.paramCall.split("_");
            var vo = Vo_YanHui.create();
            vo.roleName = arr[0];
            vo.type = Number(arr[1]);
            vo.id = Number(arr[2]);
            vo.isPT = Number(arr[3]);
            self.vo = vo;
        }
        var cfg = Config.party_298[self.vo.type];
        var cfg0 = Config.partylw_298[1];
        var cfg1 = Config.partylw_298[2];
        self.nameLb.text = ConfigHelp.reTxt("{0}正在举办{1}({2})\n选择赴宴礼物", HtmlUtil.fontNoSize(self.vo.roleName, Color.getColorStr(2)), cfg.name, self.vo.num + "/" + cfg.num);
        self.grid0.isShowEff = self.grid0.tipEnabled = true;
        self.grid0.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg0.reward))[0];
        if (!self.vo.isPT) {
            self.costLb0.visible = self.ptBt.visible = true;
            self.promptLb.visible = false;
            var costItem0 = ConfigHelp.makeItemListArr(JSON.parse(cfg0.consume))[0];
            self.costLb0.setImgUrl(costItem0.icon);
            self.costLb0.setCount(costItem0.count);
            self.ptBt.addClickListener(self.OnPT, self);
        }
        else {
            self.costLb0.visible = self.ptBt.visible = false;
            self.promptLb.visible = true;
        }
        self.grid1.isShowEff = self.grid1.tipEnabled = true;
        self.grid1.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg1.reward))[0];
        var costItem1 = ConfigHelp.makeItemListArr(JSON.parse(cfg1.consume))[0];
        self.costLb1.setImgUrl(costItem1.icon);
        self.costLb1.setCount(costItem1.count);
        self.HHBt.addClickListener(self.OnHH, self);
    };
    View_YanHui_FuYanPanel.prototype.OnHH = function () {
        var cfg1 = Config.partylw_298[2];
        if (ConfigHelp.checkEnough(cfg1.consume, false)) {
            GGlobal.modelYanHui.CG_House_fuyan_11455(this.vo.id, 2);
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                GGlobal.layerMgr.close2(UIConst.YANHUI_FUYAN);
                GGlobal.layerMgr.close2(UIConst.YANHUI);
            }));
        }
    };
    View_YanHui_FuYanPanel.prototype.OnPT = function () {
        var cfg0 = Config.partylw_298[1];
        if (ConfigHelp.checkEnough(cfg0.consume, false)) {
            GGlobal.modelYanHui.CG_House_fuyan_11455(this.vo.id, 1);
        }
        else {
            ModelChongZhi.guideToRecharge(Handler.create(self, function () {
                GGlobal.layerMgr.close2(UIConst.YANHUI_FUYAN);
                GGlobal.layerMgr.close2(UIConst.YANHUI);
            }));
        }
    };
    View_YanHui_FuYanPanel.prototype.onHide = function () {
        var self = this;
        self.costLb0.setImgUrl();
        self.costLb1.setImgUrl();
        self.grid0.clean();
        self.grid1.clean();
    };
    View_YanHui_FuYanPanel.URL = "ui://4x7dk3lhh7qe2";
    return View_YanHui_FuYanPanel;
}(UIModalPanel));
__reflect(View_YanHui_FuYanPanel.prototype, "View_YanHui_FuYanPanel");
