class ItemLvBuAward extends fairygui.GComponent {
    public txtJiFen: fairygui.GTextField;
    public noticeImg: fairygui.GImage;
    public iconGot:fairygui.GImage;
    public constructor() {
        super();
    }
    public static URL = "ui://01fuz6zcsivqe";
    public constructFromXML(xml: any) {
        super.constructFromXML(xml);
        this.txtJiFen = this.getChild("txtJiFen").asTextField;
        this.noticeImg = this.getChild("noticeImg").asImage;
        this.iconGot = this.getChild("iconGot").asImage;
        this.addClickListener(this.onHand, this);
    }
    private onHand() {
        GGlobal.layerMgr.open(UIConst.VIEWLBGETJL, this._vo);
    }
    private _vo;
    public set vo(value: IAwardGet) {
        const self = this;
        self._vo = value;
        self.txtJiFen.text = "积分: " + value.jifen;
        switch(value.state) {
            case 0:
                self.noticeImg.visible = false;
                self.iconGot.visible = false;
                break;
            case 1:
                self.noticeImg.visible = true;
                self.iconGot.visible = false;
                break;
            case 2:
                self.noticeImg.visible = false;
                self.iconGot.visible = true;
                break;
        }
    }
    public get vo() {
        return this._vo;
    }
}