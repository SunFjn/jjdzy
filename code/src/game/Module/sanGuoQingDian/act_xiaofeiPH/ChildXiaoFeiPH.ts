/**消费排行 */
class ChildXiaoFeiPH extends fairygui.GComponent implements IPanel {
    private container: EmptyComp;
    private txtLeftTm: fairygui.GTextField;
    private txtFirName: fairygui.GTextField;
    private items: ItemXiaoFeiPH[];
    private txtMinePH: fairygui.GTextField;
    private txtMineCost: fairygui.GTextField;
    public bg: fairygui.GLoader;
    public iconXWYD: fairygui.GImage;

    public static pkg = "sanGuoQingDian";
    public static URL: string = "ui://kdt501v2tipm1";
    public static createInstance(): ChildXiaoFeiPH {
        return <ChildXiaoFeiPH><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "ChildXiaoFeiPH"));
    }

    public static setExtends() {

    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.items = [];
        for (let i = 0; i < 5; i++) {
            const item = self[`item${i}`];
            item.setIndex(i);
            self.items.push(self[`item${i}`]);
        }
        self["n16"].text = `前5名需要消费${HtmlUtil.fontNoSize("100000元宝", "#ff0000")}以上方能上榜`;
        self["n9"].text = `消费${HtmlUtil.fontNoSize("前5名", "#ffff00")}活动结束后按一定比例${HtmlUtil.fontNoSize("返还", "#ff0000")}活动期间消费的元宝`;
    }

    protected _viewParent: fairygui.GObject;
    public initView(pParent: fairygui.GObject) {
        let self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    }

    private onUpdate(info?: { paiming: number, cost: number }) {
        const self = this;
        const voAct = self.vo;
        if (!voAct) {
            return;
        }
        if (info && info.paiming != 0) {
            self.txtMinePH.text = `我的排名: ` + HtmlUtil.fontNoSize(`${info.paiming}`, "#00ff00");
            self.txtMineCost.text = `我的消费: ` + HtmlUtil.fontNoSize(`${info.cost}元宝`, "#00ff00");
        } else {
            self.txtMinePH.text = `我的排名: ` + HtmlUtil.fontNoSize(`未上榜`, "#00ff00");
            self.txtMineCost.text = `我的消费: ` + HtmlUtil.fontNoSize(`${info.cost}元宝`, "#00ff00");
        }
        const lib = Config.sgxfph_261;
        var arr = [];
        for (let key in lib) {
            const cfg = lib[key];
            if (cfg.qs == voAct.qs) {
                arr.push(cfg);
            }
        }
        for (let i = 0; i < self.items.length; i++) {
            self.items[i].setData(arr[i]);
        }
        const first = GGlobal.modelSGQD.paiHangDatas[0];

        if (first && first.name) {
            self.txtFirName.text = first.name;
            self.iconXWYD.visible = false;
            self.container.setUIRole(first.modId, first.godWeapon, first.horseId);
            let uiRole = self.container.getUIRole()
            if (uiRole) {
                var cfg = Config.mod_200[uiRole.body];
                if (cfg && cfg.h) {
                    self.txtFirName.y = self.container.y - cfg.h - 25;
                }
                if (uiRole.horseId) {
                    uiRole.setScaleXY(0.6, 0.6);
                } else {
                    uiRole.setScaleXY(1, 1);
                }
            }
        } else {
            self.txtFirName.y = 150;
            self.iconXWYD.visible = true;
            self.txtFirName.text = "";
        }
        let vo = self.vo;
        self.times = vo.getSurTime();
        if (self.times <= 0) {
            self.txtLeftTm.text = "活动已结束";
        } else {
            self.txtLeftTm.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        }
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
        GGlobal.modelSGQD.listen(ModelSGQD.msg_datas_xfph, self.onUpdate, self);
        GGlobal.modelActivity.CG_OPENACT(UIConst.XIAOFEIPH);
        IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.XIAOFEIPH + ".png");
    }

    public closePanel() {
        let self = this;
        GGlobal.modelSGQD.remove(ModelSGQD.msg_datas_xfph, self.onUpdate, self);
        this.container.setUIRole(null);
        Timer.instance.remove(self.timeHandler, self);
        IconUtil.setImg(self.bg, null);
    }

    private times: number;
    private timeHandler() {
        let s = this;
        s.times--;
        if (s.times <= 0) {
            this.txtLeftTm.text = "活动已结束";
            Timer.instance.remove(s.timeHandler, s);
        } else {
            s.txtLeftTm.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        }
    }
}