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
var ViewLJCZ = (function (_super) {
    __extends(ViewLJCZ, _super);
    function ViewLJCZ() {
        var _this = _super.call(this) || this;
        _this.datas = [];
        _this.awards = [];
        _this.setSkin("lchk", "lchk_atlas0", "ViewLCHK");
        return _this;
    }
    ViewLJCZ.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ItemLCHK.URL, ItemLCHK);
    };
    ViewLJCZ.prototype.initView = function () {
        var _this = this;
        _super.prototype.initView.call(this);
        for (var key in Config.lchk_744) {
            this.datas.push(Config.lchk_744[key]);
        }
        this.list.itemRenderer = function (i, r) { r.setData(_this.datas[i]); };
        this.list.callbackThisObj = this;
        this.list.addEventListener(fairygui.ItemEvent.CLICK, this.onSel, this);
        this.btnQW.addClickListener(this.onHand, this);
        this.btnGot.addClickListener(this.onHand, this);
        this.btnLeft.displayObject.touchEnabled = true;
        this.btnRight.displayObject.touchEnabled = true;
        CommonManager.listPageChange("ViewLJCZ", this.list, this.btnLeft, this.btnRight, 3, Handler.create(this, this.setPageNotice));
        this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL_END, this.scrollComp, this);
        // for (let i = 0; i < this.list._children.length; i++) {
        //     const item = this.list._children[i];
        //     console.log(item.x, item.y);
        // }
        this.n22.callbackThisObj = this;
        this.n22.itemRenderer = this.awardsRender;
    };
    ViewLJCZ.prototype.awardsRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    ViewLJCZ.prototype.scrollComp = function () {
        var curpage = this.list.getFirstChildInView();
        this.setPageNotice(curpage);
    };
    ViewLJCZ.prototype.setPageNotice = function (_curpage) {
        var sf = this;
        sf.noticeImg1.visible = false;
        sf.noticeImg2.visible = false;
        for (var i = 0; i < this.datas.length; i++) {
            var id = this.datas[i].id;
            var red = GGlobal.modelLCHK.datas[id] == 1;
            if (red && i > _curpage + 2) {
                sf.noticeImg2.visible = true;
            }
            if (red && i < _curpage) {
                sf.noticeImg1.visible = true;
            }
        }
    };
    ViewLJCZ.prototype.onHand = function (evt) {
        switch (evt.currentTarget) {
            case this.btnQW:
                ViewChongZhi.tryToOpenCZ();
                break;
            case this.btnGot:
                GGlobal.modelLCHK.CG4393(this._curSel.id);
                break;
        }
    };
    ViewLJCZ.prototype.onSel = function (evt) {
        var render = evt.itemObject;
        this.setSel(render.getData());
    };
    ViewLJCZ.prototype.setSel = function (value) {
        this._curSel = value;
        if (value) {
            for (var i = 0; i < this.list._children.length; i++) {
                var item = this.list._children[i];
                if (item && item.getData().id == value.id) {
                    if (this._selItem)
                        this._selItem.setSel(false);
                    (this._selItem = item).setSel(true);
                    this.list.scrollToView(i);
                    this.setPageNotice(i);
                    break;
                }
            }
            this.showDetail();
        }
    };
    ViewLJCZ.prototype.showDetail = function () {
        this.txtCZ.text = "\u5DF2\u5145\u503C" + GGlobal.modelLCHK.money + "\u5143";
        var listArr = [];
        var showId = this.datas[0].xianshi;
        for (var i = 0; i < this.datas.length; i++) {
            var cfg = this.datas[i];
            if (GGlobal.modelLCHK.money >= cfg.coin) {
                showId = cfg.xianshi;
                listArr.push(cfg);
            }
            else if (cfg.id <= showId) {
                listArr.push(cfg);
            }
        }
        this.list.numItems = listArr.length;
        this.awards = ConfigHelp.makeItemListArr(JSON.parse(this._curSel.reward));
        this.n22.numItems = this.awards.length;
        IconUtil.setImg(this.iconImg, Enum_Path.PIC_URL + this._curSel.tupian + ".png");
        if (this._curSel) {
            var id = this._curSel.id;
            var state = GGlobal.modelLCHK.datas[id];
            switch (state) {
                case 0:
                    this.btnQW.visible = true;
                    this.btnGot.visible = false;
                    this.iconGot.visible = false;
                    break;
                case 1:
                    this.btnQW.visible = false;
                    this.btnGot.visible = true;
                    this.btnGot.checkNotice = true;
                    this.iconGot.visible = false;
                    break;
                case 2:
                    this.btnQW.visible = false;
                    this.btnGot.visible = false;
                    this.iconGot.visible = true;
                    break;
            }
        }
    };
    ViewLJCZ.prototype.resolveSel = function () {
        this.list.numItems = this.datas.length;
        var id = GGlobal.modelLCHK.canGetId();
        if (!id) {
            this.setSel(this._curSel || this.datas[0]);
        }
        else {
            var data = Config.lchk_744[id];
            this.setSel(data);
        }
    };
    ViewLJCZ.prototype.onServ = function () {
        this.resolveSel();
    };
    ViewLJCZ.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        IconUtil.setImg(this.back, Enum_Path.BACK_URL + "lchk.jpg");
        GGlobal.modelLCHK.listen(ModelLCHK.msg_datas, this.onServ, this);
        GGlobal.modelLCHK.CG4391();
    };
    ViewLJCZ.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this.n22.numItems = 0;
        IconUtil.setImg(this.back, null);
        GGlobal.modelLCHK.remove(ModelLCHK.msg_datas, this.onServ, this);
        GGlobal.layerMgr.close(this.panelId);
        this._curSel = null;
    };
    return ViewLJCZ;
}(UIPanelBase));
__reflect(ViewLJCZ.prototype, "ViewLJCZ");
