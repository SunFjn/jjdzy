/**基金 */
class ChildJiJin extends fairygui.GComponent implements IPanel {
    public txtLeftTm: fairygui.GTextField;
    public btnHand: Button0;
    public list: fairygui.GList;
    public bg: fairygui.GLoader;

    public static pkg = "sanGuoQingDian";
    public static URL: string = "ui://kdt501v2tipmm";
    public static createInstance(): ChildJiJin {
        return <ChildJiJin><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "ChildJiJin"));
    }

    public static setExtends() {

    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = (i, r) => { r.setData(self.datas[i]) };
        self.list.callbackThisObj = self;
        self.btnHand.addClickListener(self.onHand, self);
        self.btnHand.checkNotice = false;
        self.btnHand.text = Config.shop_011[41].explain;
    }

    protected _viewParent: fairygui.GObject;
    public initView(pParent: fairygui.GObject) {
        let self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    }

    private onHand() {
        const cfgId = 41;
        const cfg = Config.shop_011[cfgId];//用统一的商品表去兼容不一样的系统和平台
        ModelChongZhi.recharge(cfg.rmb, cfg.Index, cfg.name);
        GGlobal.modelchongzhi.CG_CHONGZHI_135(cfgId, null, false);
    }


    private datas;
    private initList() {
        const lib = Config.qdjj_742;
        this.datas = [];
        const voact = GGlobal.modelActivity.get(UIConst.SANGUOQD, UIConst.JiJin);
        for (let key in lib) {
            const cfg = lib[key];
            if (cfg.qishu == voact.qs) {
                this.datas.push(cfg);
            }
        }
        this.list.numItems = this.datas.length;
    }
    private onUpdate() {
        let self = this;
        self.datas.sort((a: Iqdjj_742, b: Iqdjj_742) => {
            const stateA = GGlobal.modelSGQD.jiJinInfo.states[a.id];
            const stateB = GGlobal.modelSGQD.jiJinInfo.states[b.id];
            const indexA = stateA == 1 ? 3 : (stateA == 0 ? 2 : 1);
            const indexB = stateB == 1 ? 3 : (stateB == 0 ? 2 : 1);
            return indexB - indexA;
        });
        self.list.numItems = this.datas.length;
        const info = GGlobal.modelSGQD.jiJinInfo;
        const states = info.states;
        for (let i = 0; i < self.list._children.length; i++) {
            const child = self.list._children[i] as ItemJiJin;
            const id = child.getData().id;
            child.setState(states[id]);
        }
        if (GGlobal.modelSGQD.jiJinInfo.state == 0) {
            self.btnHand.visible = true;
        } else {
            self.btnHand.visible = false;
        }
        // ActTimeCtrl.getInst().setInfo({ txt: this.txtLeftTm, groupId: UIConst.SANGUOQD, actId: UIConst.JiJin });
        let vo = self.vo;
        self.times = vo.getSurTime();
        self.txtLeftTm.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        if (self.times > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        } else {
            Timer.instance.remove(self.timeHandler, self);
        }
    }

    private upImage() {
        const voact = GGlobal.modelActivity.get(UIConst.SANGUOQD, UIConst.JiJin);
        IconUtil.setImg(this.bg, "resource/image/sanGuoQD/" + UIConst.JiJin + "" + voact.qs + ".jpg");
    }
    private times;
    private _kfDay: number = -1;
    private vo: Vo_Activity;
    public openPanel(pData?: Vo_Activity) {
        let self = this;
        self.vo = pData;
        if (Model_GlobalMsg.kaifuDay != self._kfDay) {
            self._kfDay = Model_GlobalMsg.kaifuDay;
            self.initList();
        }
        GGlobal.modelSGQD.listen(ModelSGQD.msg_datas_jijin, self.onUpdate, self);
        GGlobal.modelSGQD.CG4081();
        self.upImage()
    }

    public closePanel() {
        let self = this;
        GGlobal.modelSGQD.remove(ModelSGQD.msg_datas_jijin, self.onUpdate, self);
        IconUtil.setImg(self.bg, null);
        Timer.instance.remove(self.timeHandler, self);
    }

    private timeHandler() {
        let s = this;
        s.times--;
        s.txtLeftTm.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    }
}