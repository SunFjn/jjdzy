class ViewEightLock extends UIPanelBase {
    public list: fairygui.GList;
    public container: EmptyComp;
    public constructor() {
        super();
        this.setSkin("eightLock", "eightLock_atlas0", "ViewEightLock");
    }
    protected setExtends() {
        let f = fairygui.UIObjectFactory.setPackageItemExtension
        f(ItemEILock.URL, ItemEILock);
        f(ItemFWCol.URL, ItemFWCol);
        f(ItemFWJD.URL, ItemFWJD);
        f(ItemFWYL.URL, ItemFWYL);
        f(ItemAuthenRank1.URL, ItemAuthenRank1);
        f(ItemAuthenRank2.URL, ItemAuthenRank2);
        f(AuthenListGrid.URL, AuthenListGrid);
    }
    private datas;
    protected initView() {
        super.initView();
        let self = this;
        if (ModelEightLock.originalDatas[UIConst.AUTHEN_RANK]) {
            self.datas = [UIConst.AUTHEN_RANK, UIConst.EIGHTLOCK, UIConst.FUWENCOLLECT, UIConst.FUWENJIANDING, UIConst.FUWENYOULI];
        } else {
            self.datas = [UIConst.EIGHTLOCK, UIConst.FUWENCOLLECT, UIConst.FUWENJIANDING, UIConst.FUWENYOULI];
        }
        self.list.itemRenderer = (i, r: ComActivityTab) => {
            r.data = self.datas[i];
            if (self.datas[i] == UIConst.EIGHTLOCK) {
                r.setActivityIcon(610101);
            } else {
                r.setActivityIcon(self.datas[i]);
            }
            r.checkNotice = GGlobal.modelEightLock.getNotice(self.datas[i]);
        };
        self.list.callbackThisObj = self;
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        self.list.numItems = self.datas.length;
        if (!self.curTab) {
            self.list.selectedIndex = 0;
            self.curTab = self.list._children[0] as ComActivityTab;
        }
    }

    private curTab: ComActivityTab;
    private onSel(evt: fairygui.ItemEvent) {
        let self = this;
        const render = evt.itemObject as ComActivityTab;
        if (self.curTab && render.data == self.curTab.data) return;
        self.curTab = render;
        self.setSel(render.data);
    }

    private _curId: number;
    public setSel(id: number) {
        let self = this;
        const tabs = self.list._children as ComActivityTab[];
        switch (self._curId) {
            case UIConst.AUTHEN_RANK:
                self.container.removeChild(Singleton.getInst<ChildAuthenRank>(ChildAuthenRank));
                break;
            case UIConst.EIGHTLOCK:
                self.container.removeChild(Singleton.getInst<ChildEightLock>(ChildEightLock));
                break;
            case UIConst.FUWENCOLLECT:
                self.container.removeChild(Singleton.getInst<ChildFuWenCol>(ChildFuWenCol));
                break;
            case UIConst.FUWENJIANDING:
                self.container.removeChild(Singleton.getInst<ChildFuWenJD>(ChildFuWenJD));
                break;
            case UIConst.FUWENYOULI:
                self.container.removeChild(Singleton.getInst<ChildFuWenYL>(ChildFuWenYL));
                break;
        }
        switch (id) {
            case UIConst.AUTHEN_RANK:
                self.container.addChild(Singleton.getInst<ChildAuthenRank>(ChildAuthenRank));
                break;
            case UIConst.EIGHTLOCK:
                self.container.addChild(Singleton.getInst<ChildEightLock>(ChildEightLock));
                break;
            case UIConst.FUWENCOLLECT:
                self.container.addChild(Singleton.getInst<ChildFuWenCol>(ChildFuWenCol));
                break;
            case UIConst.FUWENJIANDING:
                self.container.addChild(Singleton.getInst<ChildFuWenJD>(ChildFuWenJD));
                break;
            case UIConst.FUWENYOULI:
                self.container.addChild(Singleton.getInst<ChildFuWenYL>(ChildFuWenYL));
                break;
        }
        self._curId = id;
    }
    private onUpdate() {
        let self = this;
        if (ModelEightLock.originalDatas[UIConst.AUTHEN_RANK]) {
            self.datas = [UIConst.AUTHEN_RANK, UIConst.EIGHTLOCK, UIConst.FUWENCOLLECT, UIConst.FUWENJIANDING, UIConst.FUWENYOULI];
        } else {
            self.datas = [UIConst.EIGHTLOCK, UIConst.FUWENCOLLECT, UIConst.FUWENJIANDING, UIConst.FUWENYOULI];
            if (self._curId == UIConst.AUTHEN_RANK) {
                self._curId = UIConst.EIGHTLOCK;
            }
        }
        self.list.numItems = self.datas.length;
        if (!self.curTab) {
            self.list.selectedIndex = 0;
            self.curTab = self.list._children[0] as ComActivityTab;
        }
    }
    public onShown() {
        let self = this;
        super.onShown();
        if (ModelEightLock.originalDatas[UIConst.AUTHEN_RANK]) {
            self.setSel(self._args == null ? UIConst.AUTHEN_RANK : self._args);
        } else {
            self.setSel(self._args == null ? UIConst.EIGHTLOCK : self._args);
        }
        self.registerEvent(true);
    }
    public onHide() {
        super.onHide();
        let self = this;
        self.setSel(-1);
        if (self.curTab) self.curTab.selected = false;
        self.registerEvent(false);
    }

    /**
    * 注册事件的统一入口，最好能集中在这里写
    * @param pFlag 
    */
    private registerEvent(pFlag: boolean): void {
        let self = this;
        let model = GGlobal.modelEightLock;
        model.register(pFlag, ModelEightLock.msg_datas, self.onUpdate, self);
        model.register(pFlag, ModelEightLock.msg_fwCol, self.onUpdate, self);
        model.register(pFlag, ModelEightLock.msg_fwJD, self.onUpdate, self);
        model.register(pFlag, ModelEightLock.msg_jdpm, self.onUpdate, self);
    }
}