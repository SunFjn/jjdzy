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
var View_QuickBuy_Panel = (function (_super) {
    __extends(View_QuickBuy_Panel, _super);
    function View_QuickBuy_Panel() {
        var _this = _super.call(this) || this;
        _this.max = 0;
        _this.price = 0;
        _this.childrenCreated();
        return _this;
    }
    View_QuickBuy_Panel.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "View_QuickBuy_Panel").asCom;
        self.contentPane = self.view;
        self.btnMin = (self.view.getChild("btnMin"));
        self.btnReduce = (self.view.getChild("btnReduce"));
        self.btnAdd = (self.view.getChild("btnAdd"));
        self.lbCount = (self.view.getChild("lbCount"));
        self.btnMax = (self.view.getChild("btnMax"));
        self.groupUse = (self.view.getChild("groupUse"));
        self.btnEsc = (self.view.getChild("btnEsc"));
        self.btnBuy = (self.view.getChild("btnBuy"));
        self.surLb = (self.view.getChild("surLb"));
        self.grid = (self.view.getChild("grid"));
        self.grid.isShowEff = true;
        self.nameLb = (self.view.getChild("nameLb"));
        self.costLb = (self.view.getChild("costLb"));
        self.btnMin.addClickListener(self.btnHandler, self);
        self.btnReduce.addClickListener(self.btnHandler, self);
        self.btnAdd.addClickListener(self.btnHandler, self);
        self.btnMax.addClickListener(self.btnHandler, self);
        self.btnEsc.addClickListener(self.closeEventHandler, self);
        self.btnBuy.addClickListener(self.buyHandler, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_QuickBuy_Panel.prototype.buyHandler = function () {
        var self = this;
        var cfg = self._args[0];
        var num = parseInt(self.lbCount.text);
        if (Model_player.voMine.yuanbao >= num * self.price) {
            GGlobal.modelshop.CG_QUICKBUY_BUY_5251(cfg.id, num);
            self.doHideAnimation();
        }
        else {
            ModelChongZhi.guideToRecharge();
        }
    };
    View_QuickBuy_Panel.prototype.btnHandler = function (evt) {
        var self = this;
        var bt = evt.target;
        var num = parseInt(self.lbCount.text);
        switch (bt.id) {
            case self.btnMin.id:
                if (num <= 1)
                    return;
                if (num <= 10) {
                    num = 1;
                }
                else {
                    num -= 10;
                }
                break;
            case self.btnReduce.id:
                if (num <= 1)
                    return;
                num -= 1;
                break;
            case self.btnAdd.id:
                if (num >= self.max)
                    return;
                num++;
                break;
            case self.btnMax.id:
                if (num >= self.max)
                    return;
                if (num + 10 >= self.max) {
                    num = self.max;
                }
                else {
                    num += 10;
                }
                break;
        }
        self.lbCount.text = num + "";
        if (Model_player.voMine.yuanbao >= num * self.price) {
            self.costLb.text = "总价：      " + HtmlUtil.fontNoSize(self.price * num + "", Color.getColorStr(2));
        }
        else {
            self.costLb.text = "总价：      " + HtmlUtil.fontNoSize(self.price * num + "", Color.getColorStr(6));
        }
    };
    View_QuickBuy_Panel.prototype.onShown = function () {
        var self = this;
        var cfg = self._args[0];
        var ct = self._args[1];
        var vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.store))[0];
        self.grid.vo = vo;
        self.grid.tipEnabled = true;
        self.nameLb.text = vo.name;
        self.nameLb.color = vo.qColor;
        var vo1 = ConfigHelp.makeItemListArr(JSON.parse(cfg.conmuse))[0];
        self.price = vo1.count;
        if (cfg.max == 0) {
            self.max = View_QuickBuy_Panel.LAST_MAX;
            self.surLb.text = "单次购买上限：" + HtmlUtil.fontNoSize(self.max + "", Color.getColorStr(2));
        }
        else {
            self.max = Model_Shop.buyArr[cfg.id] ? cfg.max - Model_Shop.buyArr[cfg.id] : cfg.max;
            self.surLb.text = "今日剩余购买次数：" + HtmlUtil.fontNoSize(self.max + "", Color.getColorStr(2));
        }
        self.lbCount.text = "" + ct;
        if (Model_player.voMine.yuanbao >= ct * self.price) {
            self.costLb.text = "总价：      " + HtmlUtil.fontNoSize(self.price * ct + "", Color.getColorStr(2));
        }
        else {
            self.costLb.text = "总价：      " + HtmlUtil.fontNoSize(self.price * ct + "", Color.getColorStr(6));
        }
    };
    View_QuickBuy_Panel.prototype.onHide = function () {
        this.grid.clean();
        GGlobal.layerMgr.close(UIConst.QUICK_BUY);
    };
    //ct  建议购买数量
    View_QuickBuy_Panel.show = function (vo, ct) {
        if (vo === void 0) { vo = null; }
        if (ct === void 0) { ct = 1; }
        if (View_QuickBuy_Panel.isFirt) {
            View_QuickBuy_Panel.itemVo = vo;
            View_QuickBuy_Panel.ct = ct;
            GGlobal.modelshop.CG_OPEN_QUICKBUY_5253();
        }
        else {
            if (vo)
                View_QuickBuy_Panel.itemVo = vo;
            // View_QuickBuy_Panel.ct = ct;
            for (var key in Config.buy_269) {
                var cfg = Config.buy_269[key];
                if (View_QuickBuy_Panel.itemVo.id == JSON.parse(cfg.store)[0][1]) {
                    if (cfg.max != 0 && Model_Shop.buyArr[cfg.id] && Model_Shop.buyArr[cfg.id] >= cfg.max) {
                        ViewCommonWarn.text("已达购买上限");
                    }
                    else {
                        var lastCt = void 0; //剩余 可购买
                        if (cfg.max == 0) {
                            lastCt = View_QuickBuy_Panel.LAST_MAX;
                        }
                        else {
                            lastCt = Model_Shop.buyArr[cfg.id] ? cfg.max - Model_Shop.buyArr[cfg.id] : cfg.max;
                        }
                        if (ct > lastCt) {
                            ct = lastCt;
                        }
                        if (ct <= 0) {
                            ct = 1;
                        }
                        GGlobal.layerMgr.open(UIConst.QUICK_BUY, [cfg, ct]);
                    }
                    break;
                }
            }
        }
    };
    View_QuickBuy_Panel.URL = "ui://jvxpx9emnbrv3fm";
    View_QuickBuy_Panel.LAST_MAX = 9999;
    View_QuickBuy_Panel.isFirt = true;
    return View_QuickBuy_Panel;
}(UIModalPanel));
__reflect(View_QuickBuy_Panel.prototype, "View_QuickBuy_Panel");
