class ItemLCHK extends fairygui.GComponent {
    public static URL = "ui://goyve578liti1";
    public txtInfo: fairygui.GTextField;
    public noticeImg: fairygui.GImage;
    public bg: fairygui.GLoader;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }
    private _data:Ilchk_744;
    private readonly UNSEL = "ui://goyve578qnxv6";
    private readonly SEL = "ui://goyve578qnxv3";
    public setData(value:Ilchk_744) {
        this._data = value;
        this.txtInfo.text = `累充${value.coin}元`;
        this.noticeImg.visible = GGlobal.modelLCHK.datas[this._data.id] == 1;
    }
    public getData() {
        return this._data;
    }
    public setSel(value:boolean) {
        this.bg.url = value ? this.SEL : this.UNSEL;
    }
}