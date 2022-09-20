class VChInfo extends fairygui.GComponent {
    public static URL = "ui://7a366usafxp32";
    public txtReward: fairygui.GTextField;
    public grid: ViewGrid;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }
    private _data: IDataZJYW;
    public setData(value: IDataZJYW) {
        this._data = value;
        const cfg = Config.zjywdl_005[value.id];
        if (cfg) {
            const drops = cfg.fw.split("_");
            const type = Number(drops[0]);
            let vo: IGridImpl;
            if (type == 1) {
                vo = VoItem.create(drops[1]);
            } else if (type == 2) {
                vo = VoEquip.create(drops[1]);
            }
            const low = drops[2];
            const high = drops[3];
            this.grid.vo = vo;
            this.grid.tipEnabled = true;
            this.txtReward.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.quality)) + low + "~" + high + "个";
        }
    }
    public getData() {
        return this._data;
    }
    public clean() {
        ConfigHelp.cleanGridEff([this.grid]);
    }
}