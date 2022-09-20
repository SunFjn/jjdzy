/**扫荡项 */
class ItemSJSD extends fairygui.GComponent {
    public static URL = "ui://yqpfulefrydj47";
    private title:fairygui.GTextField;
    private grids = [];
    protected constructFromXML(xml:any) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
    }
    public setData(value:any) {
        const self = this;
        const id = value.mjId;
        const rewards = value.arr;
        self.title.text = Config.sjmjfb_258[id].name;
        if(self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        self.grids = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(rewards), self, 61, 86, true, false, 4, 120);
        self.justifyHei = self.grids.length < 5 ? 200 : 300;
    }
    private justifyHei = 200;
    public get height() {
        return this.justifyHei;
    }
}