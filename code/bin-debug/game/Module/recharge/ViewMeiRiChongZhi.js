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
var ViewMeiRiChongZhi = (function (_super) {
    __extends(ViewMeiRiChongZhi, _super);
    function ViewMeiRiChongZhi() {
        var _this = _super.call(this) || this;
        _this.boxArr = [];
        _this.awards0 = [];
        _this.awards = [];
        _this.st = 0;
        _this.grids = [];
        _this.setSkin("shouchong", "shouchong_atlas0", "ViewMeiRiChongZhi");
        return _this;
    }
    ViewMeiRiChongZhi.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouchong", "ViewMeiRiChongZhi"));
    };
    ViewMeiRiChongZhi.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(MRBox.URL, MRBox);
    };
    ViewMeiRiChongZhi.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.g0.ids = 1;
        s.g1.ids = 2;
        s.g2.ids = 3;
        s.boxArr = [s.g0, s.g1, s.g2];
        s.bar.max = 6;
        s.n21.callbackThisObj = s;
        s.n21.itemRenderer = s.listRender;
        s.n19.callbackThisObj = s;
        s.n19.itemRenderer = s.listRenderTop;
    };
    ViewMeiRiChongZhi.prototype.listRenderTop = function (idx, obj) {
        var item = obj;
        item.vo = this.awards0[idx];
        item.tipEnabled = true;
        item.grid.showEff(true);
    };
    ViewMeiRiChongZhi.prototype.listRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.grid.showEff(true);
    };
    ViewMeiRiChongZhi.prototype.lqHandler = function () {
        if (this.st == 1) {
            GGlobal.modelRecharge.CG_MRSC_1935();
        }
        else {
            GGlobal.layerMgr.close2(UIConst.MEIRISHOUCHONG);
            ViewChongZhi.tryToOpenCZ();
        }
    };
    ViewMeiRiChongZhi.prototype.update = function () {
        var m = GGlobal.modelRecharge;
        var s = this;
        var st = s.st = m.mrscState;
        s.btn.checkNotice = st == 1;
        s.btn.text = st == 1 ? "领取" : "充点小钱";
        s.btn.visible = st != 2;
        s.imgYLQ.visible = st == 2;
        for (var i = 0; i < 3; i++) {
            var b = this.boxArr[i];
            b.setSt(m.mrscBox[i][0]);
        }
        this.bar.value = m.day;
    };
    ViewMeiRiChongZhi.prototype.onShown = function () {
        var s = this;
        var a = Config.meirishouchong_715[1].AWARD;
        a = JSON.parse(a);
        var tempAward = ConfigHelp.makeItemListArr(a);
        this.awards = tempAward.slice(0, 2);
        this.awards0 = tempAward.slice(2, tempAward.length);
        s.n19.numItems = this.awards0.length;
        s.n21.numItems = this.awards.length;
        s.btn.addClickListener(s.lqHandler, s);
        // ImageLoader.instance.loader(Enum_Path.PIC_URL+"shouchong.jpg", s.bg2);
        IconUtil.setImg(s.bg2, Enum_Path.PIC_URL + "shouchong.jpg");
        GGlobal.control.listen(Enum_MsgType.MEIRISHOUCHONGUP, s.update, s);
        GGlobal.modelRecharge.CG_MRSC_1931();
    };
    ViewMeiRiChongZhi.prototype.onHide = function () {
        var s = this;
        IconUtil.setImg(s.bg2, null);
        this.n19.numItems = 0;
        this.n21.numItems = 0;
        GGlobal.layerMgr.close2(UIConst.MEIRISHOUCHONG);
        GGlobal.control.remove(Enum_MsgType.MEIRISHOUCHONGUP, s.update, s);
        this.btn.removeClickListener(s.lqHandler, s);
    };
    ViewMeiRiChongZhi.URL = "ui://zzz8io3rrh401";
    return ViewMeiRiChongZhi;
}(UIPanelBase));
__reflect(ViewMeiRiChongZhi.prototype, "ViewMeiRiChongZhi");
