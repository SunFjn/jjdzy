class ItemLXXF extends fairygui.GComponent {
    public static URL = "ui://qzsojhcrtt6c15";
    public constructor() {
        super();
    }
    public tab: TabButton1;
    public iconBu: fairygui.GImage;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }
    private _data: number;
    public set data(day: number) {
        const self = this;
        const model = GGlobal.modelLXXF;
        self._data = day;
        self.tab.text = `第${StrFilter.getChineseNum(day)}天`;
        const info = model.datas[day];
        const costYB = TimeUitl.isIn7Days() ? Config.lxxf1_737[info.day].xiaohao : Config.lxxf2_737[info.day].xiaohao;
        const state = info.costYB >= costYB && info.state == 0 ? 1 : -1;
        switch (state) {
            case 1:
                self.iconBu.visible = false;
                self.tab.checkNotice = true;
                break;
            case -1:
                if (TimeUitl.isIn7Days()) {
                    var dayHasPassed: boolean = Model_GlobalMsg.kaifuDay > day;
                } else {
                    const kfDay = model.kaifuDay;
                    const realDay = kfDay % 7 == 0 ? 7 : kfDay % 7 >> 0;
                    dayHasPassed = realDay > day;
                }
                self.iconBu.visible = dayHasPassed && info.state == 0;
                self.tab.checkNotice = false;
                break;
        }
        // if (day == model.DAY_SEVEN) {
        //     const dayFined = model.dayFinished();
        //     self.tab.checkNotice = dayFined == model.DAY_SEVEN && model.bigGiftGotSt == 0;
        // }
    }
    public get data() {
        return this._data;
    }
    public setSelected(value: boolean) {
        this.tab.selected = value;
    }
}