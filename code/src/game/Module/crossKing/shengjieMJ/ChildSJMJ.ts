class ChildSJMJ extends fairygui.GComponent implements IPanel {
    public static URL = "ui://yqpfulefgenj3w";
    public static createInstance(): ChildSJMJ {
        return <ChildSJMJ><any>(fairygui.UIPackage.createObject("crossKing", "ChildSJMJ"));
    }

    private list: fairygui.GList;
    private btnHand: Button0;
    protected constructFromXML(xml: any) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.onItemRender;
        self.list.callbackThisObj = self;
        self.btnHand.visible = false;
        self.initOrUpdateList();
    }

    public initView(pParent: fairygui.GObject) {

    }

    private onHand() {
        GGlobal.modelSJMJ.CG3787(0);
    }

    private onItemRender(index: number, renderer: ItemSJMJ) {
        const data = this.datas[index];
        renderer.data = data;
        renderer.setBg(index);
    }

    private datas;
    private initOrUpdateList() {
        const self = this;
        if (!self.datas) {
            const lib = Config.sjmj_258;
            const datas = this.datas = [];
            for (let key in lib) {
                datas.push(lib[key]);
            }
        }
        self.datas.sort(self.onSort);
        self.list.numItems = self.datas.length;
        self.list.scrollToView(0);
    }

    private onSort(a: Isjmj_258, b: Isjmj_258) {
        const openLvA = a.lv;
        const openLvB = b.lv;
        const heroLv = Model_LunHui.realLv;
        const aIndex = a.px + (heroLv < openLvA ? 100 : 0);
        const bIndex = b.px + (heroLv < openLvB ? 100 : 0);
        return aIndex - bIndex;
    }

    public openPanel() {
        let s = this
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_sjmj, s.initOrUpdateList, s);
        GGlobal.modelSJMJ.CG3761();
    }

    public closePanel() {
        let s = this
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_sjmj, s.initOrUpdateList, s);
        s.list.numItems = 0;
    }
}