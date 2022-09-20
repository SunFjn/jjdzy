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
var VSJMJBaoXiang = (function (_super) {
    __extends(VSJMJBaoXiang, _super);
    function VSJMJBaoXiang() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        _this.loadRes("crossKing", "crossKing_atlas0");
        return _this;
    }
    VSJMJBaoXiang.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("crossKing");
        this.view = fairygui.UIPackage.createObject("crossKing", "VSJMJBaoXiang").asCom;
        this.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.btnCancal.addClickListener(self.onHand, self);
        self.btnHand.addClickListener(self.onHand, self);
        _super.prototype.childrenCreated.call(this);
    };
    VSJMJBaoXiang.prototype.onHand = function (evt) {
        var tar = evt.currentTarget;
        switch (tar) {
            case this.btnCancal:
                GGlobal.layerMgr.close(UIConst.SJMJ_BX);
                break;
            case this.btnHand:
                GGlobal.modelSJMJ.CG3789(this._args);
                break;
        }
    };
    VSJMJBaoXiang.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "sjmjBX.png");
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_sjmj, this.onUpdate, this);
        this.onUpdate();
    };
    VSJMJBaoXiang.prototype.onHide = function () {
        IconUtil.setImg(this.backImg, null);
        IconUtil.setImg(this.iconCost, null);
        GGlobal.layerMgr.close(UIConst.SJMJ_BX);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_sjmj, this.onUpdate, this);
    };
    VSJMJBaoXiang.prototype.onUpdate = function () {
        var cfg = Config.sjmjfb_258[this._args];
        this.txtTitle.text = "\u9996\u901A" + HtmlUtil.fontNoSize(cfg.name, "#FF9900") + "\u53EF\u5F00\u542F";
        if (GGlobal.modelSJMJ.idBoughts[this._args]) {
            this.c1.setSelectedIndex(1);
        }
        else {
            this.c1.setSelectedIndex(0);
        }
        var rewards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward4));
        var wid = 102 * rewards.length + (rewards.length - 1) * 18;
        var beginX = 593 - wid >> 1;
        if (this.grids) {
            ConfigHelp.cleanGridview(this.grids);
        }
        this.grids = ConfigHelp.addGridview(rewards, this, beginX, 123, true, false, 5, 120);
        var cost = ConfigHelp.makeItemListArr(JSON.parse(cfg.money))[0];
        IconUtil.setImg(this.iconCost, Enum_Path.ICON70_URL + cost.icon + ".png");
        this.txtCost.text = "" + cost.count;
        this.btnHand.checkNotice = true;
        if (Number(cfg.zhekou) > 0) {
            this.imgZhe.visible = true;
            this.lbZhe.text = cfg.zhekou + "折";
        }
        else {
            this.imgZhe.visible = false;
            this.lbZhe.text = "";
        }
    };
    VSJMJBaoXiang.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    VSJMJBaoXiang.URL = "ui://yqpfulefrydj45";
    return VSJMJBaoXiang;
}(UIModalPanel));
__reflect(VSJMJBaoXiang.prototype, "VSJMJBaoXiang");
