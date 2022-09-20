class VShouHunJX extends UIPanelBase {
    public tab1: TabButton;
    public tab2: TabButton;
    public tab3: TabButton;
    public tab4: TabButton;
    public c1: fairygui.Controller;
    public list: fairygui.GList;
    public p0: ChildSJ;
    public p1: ChildJX;
    public p2: ChildEBS;
    public p3: Child_ActHolyBXunB;
    public constructor() {
        super();
        this.setSkin("shouhunJX", "shouhunJX_atlas0", "VShouHunJX");
    }
    protected setExtends() {
        let f = fairygui.UIObjectFactory
        f.setPackageItemExtension(ChildSJ.URL, ChildSJ);
        f.setPackageItemExtension(ChildJX.URL, ChildJX);
        f.setPackageItemExtension(ChildEBS.URL, ChildEBS);
        f.setPackageItemExtension(ItemSHJX.URL, ItemSHJX);
        f.setPackageItemExtension(ItemYinJi.URL, ItemYinJi);
        f.setPackageItemExtension(ItemMeti.URL, ItemMeti);
        f.setPackageItemExtension(VSHStarItem.URL, VSHStarItem);

        f.setPackageItemExtension(Child_ActHolyBXunB.URL, Child_ActHolyBXunB);
        f.setPackageItemExtension(VActHolyBRank.URL, VActHolyBRank);
        f.setPackageItemExtension(VActHolyBMuB.URL, VActHolyBMuB);
        f.setPackageItemExtension(VActHolyBGrid.URL, VActHolyBGrid);
        f.setPackageItemExtension(VActHolyBHead.URL, VActHolyBHead);
        f.setPackageItemExtension(ActHolyBXunBGrid.URL, ActHolyBXunBGrid);
    }
    private datas: Ishjx_266[] = [];
    private _tabContronller: TabController;
    protected initView() {
        super.initView();
        let self = this;
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap(
            [
                ChildSJ,
                ChildJX,
                ChildEBS,
                Child_ActHolyBXunB,
            ]
        );

        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;

        self.list.itemRenderer = (i, r: ComActivityTab) => {
            r.data = self.datas[i];
            switch (self.c1.selectedIndex) {
                case 0:
                    r.checkNotice = ModelSH.checkSJ(self.datas[i].yj);
                    break;
                case 1:
                    let red = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, self.datas[i].yj - 1);
                    r.checkNotice = red || ModelSH.checkJX(self.datas[i].yj);
                    break;
                case 2:
                    r.checkNotice = ModelSH.checkXS(self.datas[i].yj);
                    break;
            }
            r.setIcon("resource/image/shouling/icon" + self.datas[i].yj + ".png");
        };
        self.list.callbackThisObj = self;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        self.onUpdate();
    }

    private listIndex = 0;
    private _uidList = [UIConst.SHOULING, UIConst.SHJX, UIConst.ERBASU, UIConst.ACTHB_XUNBAO];
    private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
        let self = this;
        let arr = self._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        if (self._render) self._render.selected = false;
        pVo.data = self.datas[self.listIndex];
        if (self.datas[self.listIndex]) {
            self.list.scrollToView(self.listIndex);
            self._render = self.list._children[self.listIndex] as ComActivityTab;
            self._render.selected = true;
            self.listIndex = 0;
        }
        return true;
    }

    private onSel(evt: fairygui.ItemEvent) {
        const item = evt.itemObject as ComActivityTab;
        this.setSel(item.data);
    }

    private _render: ComActivityTab;
    private setSel(data: Ishjx_266) {
        let self = this;
        let render: ComActivityTab;
        if (self._render) self._render.selected = false;
        if (data) {
            let index = data.yj - 1;
            self.list.scrollToView(index);
            render = self.list._children[index] as ComActivityTab;
            render.selected = true;
        }
        self._render = render;
        if (data) {
            GGlobal.modelSHJX.notify(ModelSH.msg_itemSel, data);
        }
    }
    private onUpdate() {
        let self = this;
        if (!self.datas.length) {
            const dicDatas = ModelSH.getOrigDatas();
            for (let key in dicDatas) {
                const tempArr = dicDatas[key];
                self.datas.push(tempArr[0]);
            }
        }
        self.list.numItems = self.datas.length;
        self.updateNot();
    }
    private onBagUpdate(items: any) {
        if (items[UIConst.SHOULING] || items["equip12"] || items[UIConst.SHJX]) {
            this.onUpdate();
        }
    }
    private updateNot() {
        let self = this;
        let red = false
        for (let i = 0; i < 4; i++) {
            red = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, i);
            if (red) {
                break;
            }
        }
        self.tab1.checkNotice = ModelSH.checkSJ(1) || ModelSH.checkSJ(2) || ModelSH.checkSJ(3) || ModelSH.checkSJ(4);
        self.tab2.checkNotice = ModelSH.checkJX(1) || ModelSH.checkJX(2) || ModelSH.checkJX(3) || ModelSH.checkJX(4) || red;
        self.tab3.checkNotice = ModelSH.checkXS(1) || ModelSH.checkXS(2) || ModelSH.checkXS(3) || ModelSH.checkXS(4);
        self.tab4.checkNotice = GGlobal.reddot.checkCondition(UIConst.ACTHB_XUNBAO, 0);
    }

    public onShown() {
        let self = this;
        self.onUpdate();
        self._tabContronller.registerEvent(true);
        let t_selectIndex = 0;
        if (self._args) {
            if (typeof self._args == "number") {
                t_selectIndex = self._args;
                self.listIndex = 0;
            } else {
                t_selectIndex = self._args.tabIndex;
                self.listIndex = self._args.listIndex;
            }
        }
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;

        GGlobal.modelSHJX.listen(ModelSH.msg_notice, self.onUpdate, self);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.onBagUpdate, self);
        GGlobal.control.listen(Enum_MsgType.SHOULING_DATA_UPDATE, self.onUpdate, self);
        let r = GGlobal.reddot
        r.listen(UIConst.ACTHB_XUNBAO, self.updateNot, self);
        r.listen(UIConst.SH_HUANX, self.onUpdate, self);
    }
    public onHide() {
        let self = this;
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
        self.setSel(null);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.onBagUpdate, self);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, self.onBagUpdate, self);
        GGlobal.control.remove(Enum_MsgType.SHOULING_DATA_UPDATE, self.onUpdate, self);
        GGlobal.modelSHJX.remove(ModelSH.msg_notice, self.onUpdate, self);
        let r = GGlobal.reddot
        r.remove(UIConst.ACTHB_XUNBAO, self.updateNot, self);
        r.remove(UIConst.SH_HUANX, self.onUpdate, self);
        self.list.numItems = 0;
    }
}