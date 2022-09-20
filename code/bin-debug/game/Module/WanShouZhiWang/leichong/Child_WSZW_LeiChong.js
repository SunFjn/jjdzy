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
/**
 * 万兽之王-累计充值
 */
var Child_WSZW_LeiChong = (function (_super) {
    __extends(Child_WSZW_LeiChong, _super);
    function Child_WSZW_LeiChong() {
        var _this = _super.call(this) || this;
        _this._current = 0;
        _this._awards = [];
        _this.gridsDta = [];
        return _this;
    }
    Child_WSZW_LeiChong.createInstance = function () {
        return (fairygui.UIPackage.createObject("WSZWActLJCZ", "Child_WSZW_LeiChong"));
    };
    Child_WSZW_LeiChong.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_WSZW_LeiChong.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(WSZW_LeiChong_Tab.URL, WSZW_LeiChong_Tab);
    };
    Child_WSZW_LeiChong.prototype.initView = function (pParent) {
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        self.n13.callbackThisObj = self;
        self.n13.itemRenderer = self.awardsRender;
    };
    Child_WSZW_LeiChong.prototype.openPanel = function (pData) {
        this.y = 264;
        this._act = pData;
        this.show();
        GGlobal.modelEightLock.CG4571(UIConst.WSZW_LEICHONG);
    };
    Child_WSZW_LeiChong.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_WSZW_LeiChong.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    /**注销事件 */
    Child_WSZW_LeiChong.prototype.disposePanel = function () {
        var n = this;
        this.n14.showEff(false);
        this.n14.tipEnabled = false;
        n.n15.removeClickListener(n.CG_GET, n);
        n.upGrad.removeClickListener(n.openCharge, n);
        GGlobal.control.remove(UIConst.WSZW_LEICHONG, n.initDta, n);
        n.list.removeEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
        n.n13.numItems = 0;
        IconUtil.setImg(this.n0, null);
        n.list.numItems = 0;
        Timer.instance.remove(n.onUpdate, n);
    };
    Child_WSZW_LeiChong.prototype.show = function () {
        var n = this;
        n.n15.checkNotice = true;
        n.upGrad.checkNotice = false;
        n.n15.addClickListener(n.CG_GET, n);
        n.upGrad.addClickListener(n.openCharge, n);
        IconUtil.setImg(this.n0, Enum_Path.BACK_URL + "wszw.jpg");
        GGlobal.control.listen(UIConst.WSZW_LEICHONG, n.initDta, n);
        n.list.addEventListener(fairygui.ItemEvent.CLICK, n.listHandle, n);
        Timer.instance.listen(n.onUpdate, n);
    };
    Child_WSZW_LeiChong.prototype.onUpdate = function () {
        var end = this._act ? this._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.lbTime.text = "00:00:00";
        }
    };
    Child_WSZW_LeiChong.prototype.itemRender = function (idx, obj) {
        var item = obj;
        var nowdta = this._awards[idx];
        var id = nowdta.id;
        var cfg = Config.wszwlc_284[id];
        var bigAwardName = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0].name;
        item.text = BroadCastManager.reTxt("累充{0}元\n{1}", cfg.lj, bigAwardName);
        item.checkNotice = nowdta.st == 1;
        item.showYlq(nowdta.st == 2);
        item.data = { id: id, idx: idx };
    };
    Child_WSZW_LeiChong.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this.gridsDta[idx + 1];
    };
    Child_WSZW_LeiChong.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        var id = tab.data.idx;
        this._current = id;
        a.updateView();
    };
    Child_WSZW_LeiChong.prototype.openCharge = function () {
        GGlobal.layerMgr.open(UIConst.CHONGZHI);
    };
    Child_WSZW_LeiChong.prototype.updateView = function () {
        var nowdta = this._awards[this._current];
        var m = GGlobal.modelWanShouZhiWang;
        var idx = nowdta.id;
        var cfg = Config.wszwlc_284[idx].reward;
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
    /**领取按钮事件 */
    Child_WSZW_LeiChong.prototype.CG_GET = function () {
        var nowdta = this._awards[this._current];
        GGlobal.modelWanShouZhiWang.CG_LEICHONG_GET(nowdta.id);
    };
    Child_WSZW_LeiChong.prototype.initDta = function () {
        this._current = 0;
        var data = GGlobal.modelWanShouZhiWang.ljcz_data;
        this._awards = data;
        this.list.numItems = data.length;
        this.list.selectedIndex = this._current;
        this.updateView();
    };
    Child_WSZW_LeiChong.pkg = "WSZWActLJCZ";
    Child_WSZW_LeiChong.URL = "ui://61ucuudypvvx2";
    return Child_WSZW_LeiChong;
}(fairygui.GComponent));
__reflect(Child_WSZW_LeiChong.prototype, "Child_WSZW_LeiChong", ["IPanel"]);
