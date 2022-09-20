class ViewLJCZ extends UIPanelBase {
    public back: fairygui.GLoader;
    public btnQW: Button1;
    public btnGot: Button0;
    public iconGot: fairygui.GImage;
    public list: fairygui.GList;
    public container: EmptyComp;
    public txtCZ: fairygui.GTextField;
    public btnLeft: fairygui.GImage;
    public btnRight: fairygui.GImage;
    public noticeImg1: fairygui.GImage;
    public noticeImg2: fairygui.GImage;
    public iconImg: fairygui.GLoader;
    public n22: fairygui.GList;
    public constructor() {
        super();
        this.setSkin("lchk", "lchk_atlas0", "ViewLCHK");
    }
    protected setExtends() {
        fairygui.UIObjectFactory.setPackageItemExtension(ItemLCHK.URL, ItemLCHK);
    }
    private datas: Ilchk_744[] = [];
    protected initView() {
        super.initView();
        for (let key in Config.lchk_744) {
            this.datas.push(Config.lchk_744[key]);
        }
        this.list.itemRenderer = (i, r) => { r.setData(this.datas[i]) };
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
    }

    private awards = [];
    private awardsRender(idx, obj) {
        let item: ViewGrid = obj as ViewGrid;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    }

    private scrollComp(): void {
        let curpage: number = this.list.getFirstChildInView();
        this.setPageNotice(curpage);
    }

    private setPageNotice(_curpage): void {
        const sf = this;
        sf.noticeImg1.visible = false;
        sf.noticeImg2.visible = false;
        for (let i = 0; i < this.datas.length; i++) {
            let id = this.datas[i].id;
            let red = GGlobal.modelLCHK.datas[id] == 1;
            if (red && i > _curpage + 2) {
                sf.noticeImg2.visible = true;
            }
            if (red && i < _curpage) {
                sf.noticeImg1.visible = true;
            }
        }
    }
    private onHand(evt: egret.TouchEvent) {
        switch (evt.currentTarget) {
            case this.btnQW:
                ViewChongZhi.tryToOpenCZ();
                break;
            case this.btnGot:
                GGlobal.modelLCHK.CG4393(this._curSel.id);
                break;
        }
    }
    private onSel(evt: fairygui.ItemEvent) {
        const render = evt.itemObject as ItemLCHK;
        this.setSel(render.getData());
    }
    private _curSel: Ilchk_744;
    private _selItem: ItemLCHK;
    public setSel(value: Ilchk_744) {
        this._curSel = value;
        if (value) {
            for (let i = 0; i < this.list._children.length; i++) {
                const item = this.list._children[i] as ItemLCHK;
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
    }
    private showDetail() {
        this.txtCZ.text = `已充值${GGlobal.modelLCHK.money}元`;
        let listArr = [];
        let showId = this.datas[0].xianshi;
        for (let i = 0; i < this.datas.length; i++) {
            let cfg = this.datas[i];
            if (GGlobal.modelLCHK.money >= cfg.coin) {
                showId = cfg.xianshi;
                listArr.push(cfg);
            } else if (cfg.id <= showId) {
                listArr.push(cfg);
            }
        }
        this.list.numItems = listArr.length;
        this.awards = ConfigHelp.makeItemListArr(JSON.parse(this._curSel.reward));
        this.n22.numItems = this.awards.length;
        IconUtil.setImg(this.iconImg, Enum_Path.PIC_URL + this._curSel.tupian + ".png");
        if (this._curSel) {
            const id = this._curSel.id;
            const state = GGlobal.modelLCHK.datas[id];
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
    }
    private resolveSel() {
        this.list.numItems = this.datas.length;
        const id = GGlobal.modelLCHK.canGetId();
        if (!id) {
            this.setSel(this._curSel || this.datas[0]);
        } else {
            const data = Config.lchk_744[id];
            this.setSel(data);
        }
    }
    private onServ() {
        this.resolveSel();
    }
    public onShown() {
        super.onShown();
        IconUtil.setImg(this.back, Enum_Path.BACK_URL + "lchk.jpg");
        GGlobal.modelLCHK.listen(ModelLCHK.msg_datas, this.onServ, this);
        GGlobal.modelLCHK.CG4391();
    }
    public onHide() {
        super.onHide();
         this.n22.numItems = 0;
        IconUtil.setImg(this.back, null);
        GGlobal.modelLCHK.remove(ModelLCHK.msg_datas, this.onServ, this);
        GGlobal.layerMgr.close(this.panelId);
        this._curSel = null;
    }
}