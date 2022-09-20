class ViewLBGetJL extends UIModalPanel {
    public list:fairygui.GList;
    public btnGet:Button0;
    public buttonClose:fairygui.GButton;
    public iconGot:fairygui.GImage;
    public constructor() {
        super();
        this.loadRes("LvBuComeUp", "LvBuComeUp_atlas0");
    }
    protected childrenCreated() {
        GGlobal.createPack("LvBuComeUp");
        const self = this;
        self.view = self.contentPane = fairygui.UIPackage.createObject("LvBuComeUp", "ViewGetJL").asCom;
        self.list = self.view.getChild("list").asList;
        self.btnGet = self.view.getChild("btnGet") as Button0;
        self.iconGot = self.view.getChild("iconGot") as fairygui.GImage;
        self.buttonClose = self.view.getChild("frame").asCom.getChild("closeButton").asButton;
        self.view.getChild("frame").asCom.getChild("title").text = "奖 励";
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.onItemRender;
        self.list.setVirtual();
        self.buttonClose.addClickListener(self.closeEventHandler, self);
        self.btnGet.addClickListener(self.onHand, self);
        super.childrenCreated();
    }
    private onHand() {
        if(this.btnGet.enabled == false) {
            return;
        }
        GGlobal.modelLvBuCompup.CG2715(this.$data.cfgId);
    }
    private onItemRender(index:number, item:ViewGrid) {
        var data = this.awards[index];
        item.vo = data;
        item.tipEnabled = true;
        item.showEff(true);
    }
    private awards:IGridImpl[];
    protected onShown() {
        super.onShown();
        this.update(this._args);
    }
    private $data;
    public update(data) {
        const self = this;
        self.$data = data;
        self.btnGet.visible = true;
        switch(data.state) {
            case 0:
                self.btnGet.enabled = false;
                self.btnGet.text = "不可领取";
                self.btnGet.checkNotice = false;
                self.iconGot.visible = false;
                break;
            case 1:
                self.btnGet.enabled = true;
                self.btnGet.text = "领取";
                self.btnGet.checkNotice = true;
                self.iconGot.visible = false;
                break;
            case 2:
                self.btnGet.enabled = false;
                self.btnGet.text = "已领取";
                self.btnGet.checkNotice = false;
                self.iconGot.visible = true;
                self.btnGet.visible = false;
                break;
        }
        var arr = JSON.parse(data.awards);
        self.awards = ConfigHelp.makeItemListArr(arr);
        self.list.numItems = self.awards.length;
    }
    protected onHide() {
        super.onHide();
        GGlobal.layerMgr.close(UIConst.VIEWLBGETJL);
        this.list.numItems = 0;
    }
}