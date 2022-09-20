/**活跃有礼 */
class ChildHuoYueYouLi extends fairygui.GComponent implements IPanel {
    public backIcon: fairygui.GLoader;
    public timeLb: fairygui.GRichTextField;
    public item0: ActiveCourtesyItem;
    public item1: ActiveCourtesyItem;
    public item2: ActiveCourtesyItem;

    public static pkg = "sanGuoQingDian";
    public static URL: string = "ui://kdt501v2tq2hp";
    public static createInstance(): ChildHuoYueYouLi {
        return <ChildHuoYueYouLi><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "Child_ActiveCourtesy"));
    }

    public static setExtends() {

    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
    }

    protected _viewParent: fairygui.GObject;
    public initView(pParent: fairygui.GObject) {
        let self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    }


    private times: number;
    private onUpdate() {
        let s = this;
        let vo = s.vo;
        s.times = vo.getSurTime();
        s.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times > 0) {
            Timer.instance.listen(s.timeHandler, s, 1000);
        } else {
            Timer.instance.remove(s.timeHandler, s);
        }
        s.item0.setData((vo.qs - 1) * 3 + 1);
        s.item1.setData((vo.qs - 1) * 3 + 2);
        s.item2.setData((vo.qs - 1) * 3 + 3);
    }

    private timeHandler() {
        let s = this;
        s.times--;
        s.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    }
    private vo: Vo_Activity;
    public openPanel(pData?: Vo_Activity) {
        let self = this;
        self.vo = pData;
        self.timeLb.color = 0x00ff00;
        IconUtil.setImg(self.backIcon, "resource/image/sanGuoQD/5706.jpg");
        self.onUpdate();
        GGlobal.modelSGQD.huoYueYouLi &= 0;
        GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);//点开关闭红点
    }

    public closePanel() {
        let s = this;
        Timer.instance.remove(s.timeHandler, s);
        IconUtil.setImg(s.backIcon, null);
        s.item0.clean();
        s.item1.clean();
        s.item2.clean();
    }
}