class ViewZJYW extends UIPanelBase {
    public c1: fairygui.Controller;

    public tab0: fairygui.GButton
    public tab1: fairygui.GButton
    public tab2: TabButton
    public tab3: TabButton

    private tabArr: fairygui.GButton[];
    private uiArr: any[];

    public constructor() {
        super();
        this.setSkin("zjyw", "zjyw_atlas0", "ViewZJYW");
    }
    protected setExtends() {
        let f = fairygui.UIObjectFactory
        f.setPackageItemExtension(ItemZJYW.URL, ItemZJYW);
        f.setPackageItemExtension(VChInfo.URL, VChInfo);
        f.setPackageItemExtension(ChildZJYW.URL, ChildZJYW);
        //火烧赤壁
        f.setPackageItemExtension(ChilHSCB.URL, ChilHSCB);
        f.setPackageItemExtension(Item_HSCB_Rank.URL, Item_HSCB_Rank);
        f.setPackageItemExtension(ItemHSCB.URL, ItemHSCB);
        //六出祁山
        f.setPackageItemExtension(ChildLiuChuQS.URL, ChildLiuChuQS);
        f.setPackageItemExtension(ItemLCQSTitle.URL, ItemLCQSTitle);
        f.setPackageItemExtension(ItemLCQSEnter.URL, ItemLCQSEnter);
        //虎牢关
        f.setPackageItemExtension(ChildTigerPass.URL, ChildTigerPass);
        f.setPackageItemExtension(ItemTigPasEmploy.URL, ItemTigPasEmploy);
        f.setPackageItemExtension(ViewTigPasSceneInfo.URL, ViewTigPasSceneInfo);
    }

    protected initView(): void {
        super.initView();
        this.tabArr = [this.tab0, this.tab1, this.tab2, this.tab3];
        this.uiArr = [UIConst.CHILDZJYW, UIConst.CHILD_HSCB, UIConst.CHILD_LCQS, UIConst.CHILD_TIGER_PASS];
    }

    public onShown() {
        let index = 0
        if (this._args) {
            index = this._args
        }
        this.tabArr[index].selected = true;
        this.tabChange(index);
        for (let i = 0; i < this.tabArr.length; i++) {
            this.tabArr[i].addClickListener(this.onTab, this);
        }
        GGlobal.reddot.listen(UIConst.CHILD_LCQS, this.checkNotice, this);
        GGlobal.reddot.listen(UIConst.CHILD_TIGER_PASS, this.checkNotice, this);
        this.checkNotice()
    }

    private onTab(e: egret.TouchEvent) {
        let tag: fairygui.GButton = e.currentTarget as fairygui.GButton
        let index;
        if (tag.id == this.tab0.id) {
            index = 0;
        }
        else if (tag.id == this.tab1.id) {
            index = 1;
        }
        else if (tag.id == this.tab2.id) {
            index = 2;
        }
        else if (tag.id == this.tab3.id){
            index = 3;
        }
        let pre = this.c1.selectedIndex;
        if (index == pre) {
            return;
        }
        if (!ModuleManager.isOpen(this.uiArr[index], true)) {
            tag.selected = false;
            return;
        }
        this.tabArr[pre].selected = false;
        this.tabChange(index);
    }

    private tabChange(c) {
        this.c1.selectedIndex = c
    }
    public onHide() {
        for (let i = 0; i < this.tabArr.length; i++) {
            this.tabArr[i].removeClickListener(this.onTab, this);
        }
        let pre = this.c1.selectedIndex;
        this.tabArr[pre].selected = false
        GGlobal.reddot.remove(UIConst.CHILD_LCQS, this.checkNotice, this);
        GGlobal.reddot.remove(UIConst.CHILD_TIGER_PASS, this.checkNotice, this);
    }

    private checkNotice() {
        let red = GGlobal.reddot;
        this.tab2.checkNotice = red.checkCondition(UIConst.CHILD_LCQS, 0)
        this.tab3.checkNotice = red.checkCondition(UIConst.CHILD_TIGER_PASS, 0)
    }
}