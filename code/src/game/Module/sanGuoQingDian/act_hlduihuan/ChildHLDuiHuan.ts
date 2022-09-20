/**豪礼兑换 */
class ChildHLDuiHuan extends fairygui.GComponent implements IPanel {
    public bg: fairygui.GLoader;
    public txtLeftTime: fairygui.GTextField;
    public list: fairygui.GList;
    public txtCnt1: fairygui.GTextField;
    public txtCnt2: fairygui.GTextField;
    public icon1: fairygui.GLoader;
    public icon2: fairygui.GLoader;


    public static pkg = "sanGuoQingDian";
    public static URL: string = "ui://kdt501v2tipm2";
    public static createInstance(): ChildHLDuiHuan {
        return <ChildHLDuiHuan><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "ChildHLDuiHuan"));
    }

    public static setExtends() {

    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = (i, r) => { r.setData(GGlobal.modelSGQD.getHLDatas()[i]) };
        self.list.numItems = GGlobal.modelSGQD.getHLDatas().length;
        self.list.setVirtual();
    }

    protected _viewParent: fairygui.GObject;
    public initView(pParent: fairygui.GObject) {
        let self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    }

    private onUpdate() {
        const self = this;
        self.list.numItems = GGlobal.modelSGQD.getHLDatas().length;
        for (let i = 0, len = self.list._children.length; i < len; i++) {
            const child = self.list._children[i] as ItemHLDuiHuan;
            child.updateState();
        }
        const voact = self.vo;
        const id = voact.qs + 4605;
        const infos = JSON.parse(Config.xtcs_004[id].other);
        const count1 = Model_Bag.getItemCount(infos[0][1]);
        const count2 = Model_Bag.getItemCount(infos[1][1]);
        IconUtil.setImg(self.icon1, Enum_Path.PIC_URL + infos[0][0] + ".png");
        IconUtil.setImg(self.icon2, Enum_Path.PIC_URL + infos[1][0] + ".png");
        self.txtCnt1.text = count1 + "";
        self.txtCnt2.text = count2 + "";
        self.times = voact.getSurTime();
        self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        if (self.times > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        } else {
            Timer.instance.remove(self.timeHandler, self);
        }
    }

    private vo: Vo_Activity;
    public openPanel(pData?: Vo_Activity) {
        let self = this;
        self.vo = pData;
        GGlobal.modelSGQD.listen(ModelSGQD.msg_datas_hldh, self.onUpdate, self);
        GGlobal.modelSGQD.CG4101();
        IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.HaoLiDuiHuan + ".jpg");
    }


    public closePanel() {
        let self = this;
        GGlobal.modelSGQD.remove(ModelSGQD.msg_datas_hldh, self.onUpdate);
        Timer.instance.remove(self.timeHandler, self);
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.icon1, null);
        IconUtil.setImg(self.icon2, null);
    }

    private times: number;
    private timeHandler() {
        let s = this;
        s.times--;
        s.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    }
}