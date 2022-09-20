class VGQInfo extends fairygui.GComponent {
    public iconMap: fairygui.GLoader;
    public txtFinProg: fairygui.GTextField;
    public iconNot: fairygui.GImage;
    public bar: fairygui.GProgressBar;
    public static URL = "ui://r92dp953h0zq1w";
    public constructor() {
        super();
    }
    private readonly PROG_WIDTH = 103;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.addClickListener(() => { ViewGQDetail.trytoOpen(); }, this);
    }
    public setData(value: Idgq_205) {
        let self = this;
        const curGQ = GGlobal.modelGuanQia.curGuanQiaLv;
        const infoArr = JSON.parse(value.guanqia);
        const low = infoArr[0][0],
            max = infoArr[0][1];
        const maxLen = max - low + 1;
        self.bar.value = Math.min((curGQ - low + 1), maxLen);
        self.bar.max = maxLen;
        IconUtil.setImg(this.iconMap, `resource/image/guanqia/${value.tupian}.png`);
        this.txtFinProg.text = `${value.mingcheng}【${value.ID}-${Math.min((curGQ - low + 1), maxLen)}】`;
        this.iconNot.visible = GGlobal.modelGuanQia.guanQiaNot();
    }

    public clean() {
        IconUtil.setImg(this.iconMap, null);
    }
}