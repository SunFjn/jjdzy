class ItemXFBang extends fairygui.GComponent {
    public static URL = "ui://kdt501v2tipml";
    public iconPM: fairygui.GLoader;
    public txtPM: fairygui.GTextField;
    public txtName: fairygui.GTextField;
    public iconCost: fairygui.GImage;
    public txtJiFen: fairygui.GTextField;
    public iconXWYD: fairygui.GImage;
    public constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }
    public setData(index: number) {
        this.setIndex(index);
        const player = GGlobal.modelSGQD.paiHangDatas[index];
        if (player && player.name) {
            this.txtName.text = player.name;
            this.txtJiFen.text = player.cost + "";
            this.iconCost.visible = true;
            this.iconXWYD.visible = false;
        } else {
            this.iconXWYD.visible = true;
            this.txtName.text = "";
            this.txtJiFen.text = "";
            this.iconCost.visible = false;
        }
    }
    public setIndex(value: number) {
        if (value < 3) {
            this.iconPM.icon = CommonManager.getUrl("common", `rank_${value + 1}`);
            this.txtPM.text = "";
        } else {
            this.iconPM.icon = null;
            this.txtPM.text = (value + 1) + "";
        }
    }
}