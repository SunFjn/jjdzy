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
var ChildShaoZhuDanBi = (function (_super) {
    __extends(ChildShaoZhuDanBi, _super);
    function ChildShaoZhuDanBi() {
        var _this = _super.call(this) || this;
        _this._award = [];
        _this._rota = 0;
        return _this;
    }
    Object.defineProperty(ChildShaoZhuDanBi, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = (fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuDanBi"));
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildShaoZhuDanBi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.itemRender;
        var cfg = Config.scdnflzp_272;
        for (var i in cfg) {
            var item = cfg[i];
            this["lb" + (item.id - 1)].text = (item.cz / 100) + "倍";
        }
    };
    ChildShaoZhuDanBi.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._award[idx]);
    };
    ChildShaoZhuDanBi.prototype.updateView = function () {
        var m = GGlobal.modelShaoZhuAct;
        var self = this;
        self._award = m.single_data;
        self.list.numItems = self._award.length;
        self.lbCount.text = m.single_key + "次";
        self.n57.checkNotice = GGlobal.modelShaoZhuAct.single_key > 0;
        self.n57.setNoticeXY(100, 20);
    };
    ChildShaoZhuDanBi.prototype.openDes = function (evt) {
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHAOZHU_SINGLE);
    };
    ChildShaoZhuDanBi.prototype.openLog = function (evt) {
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.SHAOZHU_SINGLE_LOG);
    };
    ChildShaoZhuDanBi.prototype.onZhuanP = function () {
        if (GGlobal.modelShaoZhuAct.single_key == 0) {
            ViewCommonWarn.text("钥匙不足");
            return;
        }
        if (GGlobal.modelShaoZhuAct._hasRun)
            return;
        GGlobal.modelShaoZhuAct.CG_TURN_SINGLE();
    };
    ChildShaoZhuDanBi.prototype.onTurn = function (opt) {
        var s = this;
        GGlobal.modelShaoZhuAct._hasRun = 0;
        var ret = opt.ret;
        s._data = opt;
        if (ret == 2) {
            return;
        }
        var model = GGlobal.modelShaoZhuAct;
        var scrTo = model.zpPos;
        s.imgArrow.visible = true;
        var endRot = Math.floor(this._rota / 360) * 360 + (scrTo - 1) * 45 + 360 * 2;
        this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
    };
    ChildShaoZhuDanBi.prototype.closeHand = function (endRot) {
        this._rota = endRot;
        GGlobal.layerMgr.open(UIConst.SHAOZHU_SINGLE_AWARDS, this._data);
        this.updateView();
    };
    ChildShaoZhuDanBi.prototype.onUpdate = function () {
        var datas = GGlobal.modelEightLock.getDatas();
        var act = ModelEightLock.originalDatas[UIConst.SHAOZHU_SINGLE];
        var end = act ? act.end : 0;
        var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
        }
        else {
            this.labTime.text = "00:00:00";
        }
    };
    ChildShaoZhuDanBi.prototype.disposePanel = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.SHAOZHU_SINGLE, self.updateView, self);
        GGlobal.control.remove(Enum_MsgType.SHAOZHU_SINGLE_TURN, this.onTurn, this);
        self.n57.removeClickListener(self.onZhuanP, self);
        self.lbDes.removeClickListener(self.openDes, self);
        self.lbLog.removeClickListener(self.openLog, self);
        IconUtil.setImg(self.n3, null);
        IconUtil.setImg(self.n55, null);
    };
    ChildShaoZhuDanBi.prototype.show = function () {
        var n = this;
        GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_SINGLE);
        n.n57.addClickListener(n.onZhuanP, n);
        GGlobal.control.listen(UIConst.SHAOZHU_SINGLE, n.updateView, n);
        GGlobal.control.listen(Enum_MsgType.SHAOZHU_SINGLE_TURN, this.onTurn, this);
        n.lbLog.addClickListener(n.openLog, n);
        n.lbDes.addClickListener(n.openDes, n);
        IconUtil.setImg(n.n3, Enum_Path.IMAGE_URL + "shaozhuact/zhuanpan.png");
        IconUtil.setImg(n.n55, Enum_Path.IMAGE_URL + "shaozhuact/title.png");
    };
    ChildShaoZhuDanBi.URL = "ui://w5ll6n5jykxm9";
    return ChildShaoZhuDanBi;
}(fairygui.GComponent));
__reflect(ChildShaoZhuDanBi.prototype, "ChildShaoZhuDanBi");
