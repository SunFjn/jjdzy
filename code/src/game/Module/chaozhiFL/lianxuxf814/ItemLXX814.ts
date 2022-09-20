class ItemLXX814 extends fairygui.GComponent {
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
        const model = GGlobal.modelLXX814;
        const info = model.datas[day - 1];
        self._data = day;
        self.tab.text = `第${StrFilter.getChineseNum(day)}天`;
        var costYB = null
        var state = info.state;
        if (info) {
            costYB = Config.lxxf3_737[info.day].xiaohao;
            // state = info.costYB >= costYB && info.state == 0 ? 1 : -1;
        }
        switch (state) {
            case 1:
                self.iconBu.visible = false;
                self.tab.checkNotice = false;
                break;
            case -1:
                var dayHasPassed: boolean = model.day > day;
                self.iconBu.visible = dayHasPassed && info.state == 0;
                self.tab.checkNotice = false;
                break;
            case 0:
                self.iconBu.visible = false;
                self.tab.checkNotice = info.costYB >= costYB && model.day >= day;
                break;
            case 2:
                self.iconBu.visible = true;
                self.tab.checkNotice = false;
                break;

        }
    }
    public get data() {
        return this._data;
    }
    public setSelected(value: boolean) {
        this.tab.selected = value;
    }
}