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
var ViewActComDbZpAwards = (function (_super) {
    __extends(ViewActComDbZpAwards, _super);
    function ViewActComDbZpAwards() {
        var _this = _super.call(this) || this;
        _this.times = 10;
        _this.loadRes();
        return _this;
    }
    ViewActComDbZpAwards.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("actComDBZP");
        self.view = fairygui.UIPackage.createObject("actComDBZP", "ViewActComDbZpAwards").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewActComDbZpAwards.prototype.closeHD = function () {
        GGlobal.layerMgr.close2(UIConst.ACTCOM_DBZP_AWARDS);
    };
    ViewActComDbZpAwards.prototype.onShown = function () {
        this.times = 11;
        var id = this._args.id;
        var cfgid = this._args.cfgid;
        var cfgzp = Config.dbflzp_281[cfgid];
        var beishu = cfgzp.cz / 100;
        var cfg = Config.dbfl_281[id];
        var voi = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
        var awards = JSON.parse(cfg.yb)[0][2];
        var vo = VoItem.create(4);
        vo.count = awards * beishu;
        this.n11.vo = vo;
        this.n11.grid.showEff(true);
        this.n11.grid.tipEnabled = true;
        this.closeButton.addClickListener(this.closeHD, this);
        this.surebt.addClickListener(this.closeHD, this);
        this.continuebt.addClickListener(this.oneceMore, this);
        Timer.instance.listen(this.timeHandler, this, 1000);
        var s = this;
        s.lab.text = GGlobal.model_actCom.single_key + "/1";
        this.lb.text = "本次钥匙：" + voi.name;
        this.lbAwards.text = BroadCastManager.reTxt("本次转盘：<font color='#ffc334'>{0}倍元宝</font>", beishu);
        IconUtil.setImg(this.n0, Enum_Path.BACK_URL + "awardsbg.png");
    };
    ViewActComDbZpAwards.prototype.onHide = function () {
        IconUtil.setImg(this.n0, null);
        this.n11.grid.showEff(false);
        this.n11.grid.tipEnabled = false;
        this.closeButton.removeClickListener(this.closeHD, this);
        this.surebt.removeClickListener(this.closeHD, this);
        this.continuebt.removeClickListener(this.oneceMore, this);
        Timer.instance.remove(this.timeHandler, this);
    };
    ViewActComDbZpAwards.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewActComDbZpAwards.prototype.oneceMore = function () {
        this.doHideAnimation();
        if (GGlobal.layerMgr.isOpenView(UIConst.ACTCOM) == false) {
            ViewCommonWarn.text("请先打开活动界面");
            return;
        }
        var m = GGlobal.model_actCom;
        if (m.single_key > 0) {
            m.CG_TURN_SINGLE();
        }
        else {
            ViewCommonWarn.text("钥匙不足");
        }
        this.closeHD();
    };
    ViewActComDbZpAwards.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    ViewActComDbZpAwards.URL = "ui://eh3eod8qve5s3";
    return ViewActComDbZpAwards;
}(UIModalPanel));
__reflect(ViewActComDbZpAwards.prototype, "ViewActComDbZpAwards");
