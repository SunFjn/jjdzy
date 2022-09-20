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
var Child_ActComDbZp = (function (_super) {
    __extends(Child_ActComDbZp, _super);
    function Child_ActComDbZp() {
        var _this = _super.call(this) || this;
        _this._rota = 0;
        _this._award = [];
        return _this;
    }
    Child_ActComDbZp.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComDBZP", "Child_ActComDbZp"));
    };
    Child_ActComDbZp.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_ActComDbZp.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemActComDbZp.URL, ItemActComDbZp);
        f(ItemActComDbZpLabel.URL, ItemActComDbZpLabel);
    };
    Child_ActComDbZp.prototype.initView = function (pParent) {
        var s = this;
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        var cfg = Config.dbflzp_281;
        for (var i in cfg) {
            var item = cfg[i];
            this["lb" + (item.id - 1)].text = (item.cz / 100) + "倍";
        }
    };
    Child_ActComDbZp.prototype.openPanel = function (pData) {
        this.show();
        this.updateView();
        this.y = 264;
    };
    Child_ActComDbZp.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_ActComDbZp.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    Child_ActComDbZp.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._award[idx]);
    };
    Child_ActComDbZp.prototype.updateView = function () {
        var m = GGlobal.model_actCom;
        var self = this;
        self._award = m.single_data;
        self.list.numItems = self._award.length;
        self.lbCount.text = m.single_key + "次";
        self.n57.checkNotice = GGlobal.model_actCom.single_key > 0;
        self.n57.setNoticeXY(100, 20);
    };
    Child_ActComDbZp.prototype.openDes = function (evt) {
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHAOZHU_SINGLE);
    };
    Child_ActComDbZp.prototype.openLog = function (evt) {
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.ACTCOM_DBZP_LOG);
    };
    Child_ActComDbZp.prototype.onZhuanP = function () {
        var m = GGlobal.model_actCom;
        if (m.single_key == 0) {
            ViewCommonWarn.text("钥匙不足");
            return;
        }
        if (m._hasRun)
            return;
        m.CG_TURN_SINGLE();
    };
    Child_ActComDbZp.prototype.onTurn = function (opt) {
        var s = this;
        var m = GGlobal.model_actCom;
        m._hasRun = 0;
        var ret = opt.ret;
        s._data = opt;
        if (ret == 2) {
            return;
        }
        var scrTo = m.single_zpPos;
        s.imgArrow.visible = true;
        var endRot = Math.floor(this._rota / 360) * 360 + (scrTo - 1) * 45 + 360 * 2;
        this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
    };
    Child_ActComDbZp.prototype.closeHand = function (endRot) {
        this._rota = endRot;
        GGlobal.layerMgr.open(UIConst.ACTCOM_DBZP_AWARDS, this._data);
        this.updateView();
    };
    Child_ActComDbZp.prototype.onUpdate = function () {
        var end = this._act ? this._act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.labTime.text = "00:00:00";
        }
    };
    Child_ActComDbZp.prototype.disposePanel = function () {
        var self = this;
        GGlobal.model_actCom._hasRun = 0;
        self.list.numItems = 0;
        GGlobal.control.remove(Enum_MsgType.ACTCOM_SINGLE, self.updateView, self);
        GGlobal.control.remove(Enum_MsgType.ACTCOM_SINGLE_TURN, this.onTurn, this);
        self.n57.removeClickListener(self.onZhuanP, self);
        self.lbDes.removeClickListener(self.openDes, self);
        self.lbLog.removeClickListener(self.openLog, self);
        IconUtil.setImg(self.n3, null);
        IconUtil.setImg(self.n55, null);
        Timer.instance.remove(this.onUpdate, this);
    };
    Child_ActComDbZp.prototype.show = function () {
        var n = this;
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_DBZP);
        this._act = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.ACTCOM_DBZP);
        n.n57.addClickListener(n.onZhuanP, n);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_SINGLE, n.updateView, n);
        GGlobal.control.listen(Enum_MsgType.ACTCOM_SINGLE_TURN, this.onTurn, this);
        n.lbLog.addClickListener(n.openLog, n);
        n.lbDes.addClickListener(n.openDes, n);
        IconUtil.setImg(n.n3, Enum_Path.IMAGE_URL + "shaozhuact/zhuanpan.png");
        IconUtil.setImg(n.n55, Enum_Path.IMAGE_URL + "shaozhuact/title.png");
        Timer.instance.listen(this.onUpdate, this);
    };
    Child_ActComDbZp.pkg = "actComDBZP";
    Child_ActComDbZp.URL = "ui://eh3eod8qve5s0";
    return Child_ActComDbZp;
}(fairygui.GComponent));
__reflect(Child_ActComDbZp.prototype, "Child_ActComDbZp", ["IPanel"]);
