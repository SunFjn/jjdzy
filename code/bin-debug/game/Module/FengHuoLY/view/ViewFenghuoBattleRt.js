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
var ViewFenghuoBattleRt = (function (_super) {
    __extends(ViewFenghuoBattleRt, _super);
    function ViewFenghuoBattleRt() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewFenghuoBattleRt.prototype.childrenCreated = function () {
        GGlobal.createPack("FengHuoLY");
        var a = this;
        a.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewFenghuoBattleRt").asCom;
        a.contentPane = a.view;
        a.bg1 = (a.view.getChild("bg1"));
        a.btnClose = (a.view.getChild("btnClose"));
        a.n2 = (a.view.getChild("n2"));
        a.n3 = (a.view.getChild("n3"));
        a.lbScore = (a.view.getChild("lbScore"));
        a.n4 = (a.view.getChild("n4"));
        a.n5 = (a.view.getChild("n5"));
        a.list = (a.view.getChild("list"));
        a.lbTip = (a.view.getChild("lbTip"));
        a.n9 = (a.view.getChild("n9"));
        a.n10 = (a.view.getChild("n10"));
        a.n11 = (a.view.getChild("n11"));
        a.list.setVirtual();
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.listRender;
        _super.prototype.childrenCreated.call(this);
    };
    ViewFenghuoBattleRt.prototype.listRender = function (idx, obj) {
        var item = obj;
        item.vo = this.dta[idx];
    };
    ViewFenghuoBattleRt.prototype.onShown = function () {
        var s = this;
        s.timeremain = 5000;
        var idx = this._args.id;
        var type = this._args.type;
        if (type == 1) {
            var cfg = Config.fhly_254[idx];
            var jifen = cfg.potion1 + ConfigHelp.getSystemNum(3901);
            s.lbScore.text = "积分*" + jifen;
            ViewCommonWarn.text("积分+" + jifen);
            s.dta = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
            s.list.numItems = s.dta.length;
        }
        else {
            var cfg = Config.fhly_254[idx];
            var jifen = ConfigHelp.getSystemNum(3901);
            s.lbScore.text = "积分*" + jifen;
            ViewCommonWarn.text("积分+" + jifen);
            s.list.numItems = 0;
        }
        s.updateBtnRemain();
        s.addEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
        s.btnClose.addClickListener(s.finish, s);
    };
    ViewFenghuoBattleRt.prototype.onHide = function () {
        var s = this;
        s.btnClose.removeClickListener(s.finish, s);
        s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
        GGlobal.layerMgr.close(UIConst.FHLY_BATTLE);
        var view = GGlobal.layerMgr.getView(UIConst.FHLY);
        if (view) {
            view.visible = true;
        }
        FengHuoLYCtr.exiteBattle();
        // GGlobal.layerMgr.open(UIConst.FHLY, {type:2});
    };
    ViewFenghuoBattleRt.prototype.onFrame = function (e) {
        var s = this;
        s.timer += GGlobal.mapscene.dt;
        s.timeremain -= GGlobal.mapscene.dt;
        if (s.timer >= 500) {
            s.updateBtnRemain();
            s.timer = 0;
        }
        if (s.timeremain <= 0) {
            s.timeremain = 0;
            s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
            s.finish();
        }
    };
    ViewFenghuoBattleRt.prototype.updateBtnRemain = function () {
        var s = this;
        s.btnClose.text = "退出" + "(" + Math.ceil(s.timeremain / 1000) + ")";
    };
    ViewFenghuoBattleRt.prototype.finish = function () {
        GGlobal.layerMgr.close2(UIConst.FHLY_BATTLE);
    };
    ViewFenghuoBattleRt.URL = "ui://edvdots4srrsb";
    return ViewFenghuoBattleRt;
}(UIModalPanel));
__reflect(ViewFenghuoBattleRt.prototype, "ViewFenghuoBattleRt");
