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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ChildShaoZhuLJCZ = (function (_super) {
    __extends(ChildShaoZhuLJCZ, _super);
    function ChildShaoZhuLJCZ() {
        var _this = _super.call(this) || this;
        _this._max = 0;
        _this._awards = [];
        _this.gridsDta = [];
        _this._current = 0;
        return _this;
    }
    Object.defineProperty(ChildShaoZhuLJCZ, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = (fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuLJCZ"));
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildShaoZhuLJCZ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        self.n13.callbackThisObj = self;
        self.n13.itemRenderer = self.awardsRender;
    };
    ChildShaoZhuLJCZ.prototype.itemRender = function (idx, obj) {
        var item = obj;
        var nowdta = this._awards[idx];
        var id = nowdta.id;
        var cfg = Config.scljcz_272[id];
        var bigAwardName = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0].name;
        item.text = BroadCastManager.reTxt("累充{0}元\n{1}", cfg.lj, bigAwardName);
        item.checkNotice = nowdta.st == 1;
        item.showYlq(nowdta.st == 2);
        item.data = { id: id, idx: idx };
    };
    ChildShaoZhuLJCZ.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this.gridsDta[idx + 1];
    };
    ChildShaoZhuLJCZ.prototype.updateView = function () {
        var nowdta = this._awards[this._current];
        var m = GGlobal.modelShaoZhuAct;
        var idx = nowdta.id;
        var cfg = Config.scljcz_272[idx].reward;
        this.gridsDta = ConfigHelp.makeItemListArr(JSON.parse(cfg));
        this.n14.vo = this.gridsDta[0];
        this.n14.showEff(true);
        this.n14.tipEnabled = true;
        this.n13.numItems = this.gridsDta.length - 1;
        this.ylq.visible = nowdta.st == 2;
        this.upGrad.visible = nowdta.st == 0;
        this.n15.visible = nowdta.st == 1;
        this.n22.text = ConfigHelp.getItemColorName(this.gridsDta[0].id);
        this.desc.text = BroadCastManager.reTxt("已充值{0}元", m.rechargeVal);
    };
    ChildShaoZhuLJCZ.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        var id = tab.data.idx;
        this._current = id;
        a.updateView();
    };
    ChildShaoZhuLJCZ.prototype.initDta = function () {
        this._current = 0;
        var data = GGlobal.modelShaoZhuAct.ljcz_data;
        this._awards = data;
        this.list.numItems = data.length;
        this.list.selectedIndex = this._current;
        this.updateView();
    };
    ChildShaoZhuLJCZ.prototype.openCharge = function () {
        GGlobal.layerMgr.open(UIConst.CHONGZHI);
    };
    ChildShaoZhuLJCZ.prototype.CG_GET = function () {
        var nowdta = this._awards[this._current];
        GGlobal.modelShaoZhuAct.CG_GET_LJCZ(nowdta.id);
    };
    ChildShaoZhuLJCZ.prototype.onUpdate = function () {
        var datas = GGlobal.modelEightLock.getDatas();
        var act = ModelEightLock.originalDatas[UIConst.SHAOZHU_RECHARGE];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.lbTime.text = "00:00:00";
        }
    };
    ChildShaoZhuLJCZ.prototype.disposePanel = function () {
        var n = this;
        this.n14.showEff(false);
        this.n14.tipEnabled = false;
        n.n15.removeClickListener(n.CG_GET, n);
        n.upGrad.removeClickListener(n.openCharge, n);
        GGlobal.control.remove(UIConst.SHAOZHU_RECHARGE, n.initDta, n);
        n.list.removeEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
        n.n13.numItems = 0;
        IconUtil.setImg(this.n0, null);
        n.list.numItems = 0;
    };
    ChildShaoZhuLJCZ.prototype.show = function () {
        var n = this;
        n.n15.checkNotice = true;
        n.upGrad.checkNotice = false;
        n.n15.addClickListener(n.CG_GET, n);
        n.upGrad.addClickListener(n.openCharge, n);
        IconUtil.setImg(this.n0, Enum_Path.BACK_URL + "ljcz.jpg");
        GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_RECHARGE);
        GGlobal.control.listen(UIConst.SHAOZHU_RECHARGE, n.initDta, n);
        n.list.addEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
    };
    ChildShaoZhuLJCZ.URL = "ui://w5ll6n5jykxm6";
    return ChildShaoZhuLJCZ;
}(fairygui.GComponent));
__reflect(ChildShaoZhuLJCZ.prototype, "ChildShaoZhuLJCZ");
