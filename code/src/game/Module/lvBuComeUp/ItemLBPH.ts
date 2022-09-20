class ItemLBPH extends fairygui.GComponent {
    public iconPM:fairygui.GLoader;
    public txtPM:fairygui.GTextField;
    public txtName:fairygui.GTextField;
    public txtJiFen:fairygui.GTextField;
    public constructor() {
        super();
    }
    public static URL:string = "ui://01fuz6zc100umh";
    public constructFromXML(xml:any) {
        super.constructFromXML(xml);
        this.iconPM = <any>this.getChild("iconPM");
        this.txtPM = <any>this.getChild("txtPM");
        this.txtName = <any>this.getChild("txtName");
        this.txtJiFen = <any>this.getChild("txtJiFen");
    }
    public set vo(data:any[]) {
        this.txtName.text = data[1];
        this.txtJiFen.text = data[2];
    }
    public set index(value:number) {
        if(value < 3) {
            this.iconPM.url = CommonManager.getUrl("common", `rank_${value + 1}`);
            this.txtPM.text = "";
        }else {
            this.iconPM.icon = null;
            this.txtPM.text = (value + 1) + "";
        }
    }
}