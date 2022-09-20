class IconJie extends fairygui.GComponent {
    public static URL = "ui://jvxpx9ems89q3e5";
    public txtInfo: fairygui.GTextField;
    public constructor() {
        super();
    }
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.txtInfo = this["n1"];
    }
    public setVal(value: number) {
        if (value) {
            this.visible = true;
            const jie = value / 10 >> 0;
            const ji = value % 10 >> 0;
            this.txtInfo.text = HtmlUtil.font(`${jie}阶`, "#FFCC00", 18) + HtmlUtil.font(`${ji}级`, "#FFFFFF", 16);
        }else {
            this.visible = false;
        }
    }
}