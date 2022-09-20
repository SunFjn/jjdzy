class VZhiShengDan extends fairygui.GComponent {
    public static URL = "ui://jvxpx9emkhne3dm";
    private static _inst: VZhiShengDan;
    public static getInst(): VZhiShengDan {
        return fairygui.UIPackage.createObject("common", "VZhiSheng") as VZhiShengDan;
    }
    public iconZS: fairygui.GLoader;
    public txtCount: fairygui.GTextField;
    public c1: fairygui.Controller;
    public iconGrey: fairygui.GLoader;
    protected constructFromXML(xml: any) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.addClickListener(self.onHand, self);
    }
    private onHand() {
        const cfg = Config.zsd_257[this.data.type];
        const tempType = this.c1.selectedIndex;
        if (this.data.isFull) {
            ViewCommonWarn.text("已满阶");
            return;
        }
        switch (tempType) {
            case 0:
                if (this.data.lvl <= 0) {
                    ViewCommonWarn.text("还没激活!");
                    return;
                }
                if (this.data.lvl == cfg.tj) {
                    ViewAlert.show(`已达最佳使用阶级\n使用后可直升一阶!`, Handler.create(this, function func() {
                        GGlobal.modelGlobalMsg.CG3741(this.data.type);
                    }, null, true), ViewAlert.OKANDCANCEL, "使用", "取消", null);
                    let view = GGlobal.layerMgr.getView(UIConst.ALERT) as ViewAlert;
                    if (view) {
                        view.isClosePanel = false;
                    }
                } else if (this.data.lvl < cfg.tj) {
                    const jie = cfg.tj / 10 >> 0;
                    const ji = cfg.tj % 10 >> 0;
                    ViewAlert.show(`未达到最佳使用阶级(${jie}阶${ji}级)\n是否现在使用?`, Handler.create(this, function func() {
                        GGlobal.modelGlobalMsg.CG3741(this.data.type);
                    }, null, true), ViewAlert.OKANDCANCEL, "使用", "取消", null);
                } else {
                    GGlobal.modelGlobalMsg.CG3741(this.data.type);
                }
                break;
            case 1:
                if (TimeUitl.isIn7Days()) {
                    GGlobal.layerMgr.open(UIConst.SYSTEM_ZHI_GOU, { day: cfg.kf, type: 2 });
                } else {
                    const cfg = Config.zsd_257[this.data.type];
                    var vo = new VoItem();
                    vo.initLib(cfg.item);
                    View_CaiLiao_GetPanel.show(vo);
                }
                break;
        }
    }
    public static invalNum: number = 0;//1升阶 2升阶返回
    private _data: { type: number, count: number, lvl: number, isFull: boolean };
    public set data(value: { type: number, count: number, lvl: number, isFull: boolean }) {
        const self = this;
        self._data = value;
        const cfg = Config.zsd_257[value.type];
        if (VZhiShengDan.invalNum == 1) {
            return;
        }
        VZhiShengDan.invalNum = 0;
        if (this.data.lvl == cfg.tj) {
            if (Model_GlobalMsg.kaifuDay <= 7) {
                ViewZSD.show(this.data.type);
            }
        }
        if (value.count > 0) {
            self.visible = true;
            self.c1.setSelectedIndex(0);
            IconUtil.setImg(self.iconZS, `resource/image/zhishengDan/zs_${value.type}.png`);
            self.txtCount.text = value.count + "";
        } else {
            self.c1.setSelectedIndex(1);
            IconUtil.setImg(self.iconGrey, `resource/image/zhishengDan/zs_${value.type}.png`);
            if (cfg.kf == Model_GlobalMsg.kaifuDay) {
                self["n19"].visible = true;
            } else {
                self["n19"].visible = false;
            }
        }
    }
    public get data() {
        return this._data;
    }

    public clean() {
        const self = this;
        IconUtil.setImg(self.iconZS, null);
        IconUtil.setImg(self.iconGrey, null);
    }
}