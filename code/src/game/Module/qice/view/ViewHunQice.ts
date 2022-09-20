/**
 * 奇策兵魂吞噬界面
 * @author: lujiahao 
 * @date: 2019-10-23 14:43:15 
 */
class ViewHunQice extends UIModalPanel {
    //>>>>start
	public frame: frame1;
	public g22: fairygui.GImage;
	public labName: fairygui.GRichTextField;
	public labHas: fairygui.GRichTextField;
	public labCount: fairygui.GRichTextField;
	public lab1: fairygui.GRichTextField;
	public labAttr: fairygui.GRichTextField;
	public lab: fairygui.GRichTextField;
	public btnEat: Button0;
	public btnOneKey: Button1;
	public grid: ViewGrid;
	//>>>>end

    public static URL: string = "ui://jvxpx9emur2m3da";

    private _curVo: VoQice;
    private _hunType = 0;

    constructor() {
        super();
        this.childrenCreated();
    }

    protected childrenCreated(): void {
        this.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
        this.contentPane = this.view;

        CommonManager.parseChildren(this.view, this);

        super.childrenCreated();
    }

    protected onShown(): void {
        let t = this;
        let t_arg: { id: number, hunType: number } = t._args;
        if (t_arg) {
            t._curVo = GGlobal.modelQice.getVoById(t_arg.id);
            t._hunType = t_arg.hunType;
        }
        t.registerEvent(true);
        t.refreshData();
    }

    protected onHide(): void {
        let t = this;
        t.registerEvent(false);
        t.grid.clean();
    }

    //=========================================== API ==========================================
    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        if (t._curVo) {
            let t_cfg = Config.qcts_760[t._hunType];
            if (!t_cfg)
                return;
            let t_itemCfg = Config.daoju_204[t_cfg.id];
            if (!t_itemCfg)
                return;
            let itvo = VoItem.create(t_cfg.id)
            t.grid.tipEnabled = false;
            t.grid.isShowEff = true;
            t.grid.vo = itvo
            // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + t_itemCfg.quality + ".png", this.bg);
            // ImageLoader.instance.loader(Enum_Path.ICON70_URL + t_itemCfg.icon + ".png", this.imgIcon);
            t.lab.text = "奇策激活（升星）可增加吞噬上限";
            t.lab1.text = ConfigHelp.reTxt("已永久增加{0}属性", HtmlUtil.font(t._curVo.cfg.name, Color.getColorStr(t._curVo.cfg.pz)));
            t.labName.text = FastAPI.getItemName(t_itemCfg.id, true);
            let t_bagCount = Model_Bag.getItemCount(t_itemCfg.id);
            t.labCount.text = "拥有数量：" + t_bagCount;

            let t_hunCount = 0;
            let t_hunMax = 0;
            let attstr = "";
            switch (t._hunType) {
                case EnumQice.HUN_TYPE_BH:
                    t_hunCount = t._curVo.bHun;
                    t_hunMax = t._curVo.bhMax;

                    let attArr1: Array<any> = JSON.parse(t_cfg.attr1);
                    for (let i = 0; i < attArr1.length; i++) {
                        if (i == 0) {
                            attstr += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1] * t_hunCount);
                        } else {
                            attstr += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1] * t_hunCount);
                        }
                    }
                    break;

                case EnumQice.HUN_TYPE_JH:
                    t_hunCount = t._curVo.jHun;
                    t_hunMax = t._curVo.jhMax;

                    let t_value = (~~t_cfg.attr2) * 100 * t_hunCount / 100000;
                    attstr += "升星属性 +" + t_value + "%";
                    attstr += "\n升阶属性 +" + t_value + "%";
                    break;
            }
            t.labHas.text = "已吞噬：" + t_hunCount + "/" + t_hunMax;


            t.labAttr.text = attstr;

            if (t_hunCount >= t_hunMax)
                t.btnOneKey.checkNotice = t.btnEat.checkNotice = false;
            else
                t.btnOneKey.checkNotice = t.btnEat.checkNotice = t_bagCount > 0;
        }
        else {
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnEat, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnOneKey, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        GGlobal.control.register(pFlag, Enum_MsgType.QICE_HUN_CHANGE, t.onHunChange, t);
    }

    //======================================== handler =========================================
    private onHunChange() {
        let t = this;
        t.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelQice
        switch (e.currentTarget) {
            case t.btnEat:
                if (t._curVo) {
                    t_model.CG_QiCe_eatDan_9707(0, t._curVo.id, t._hunType);
                }
                break;
            case t.btnOneKey:
                if (t._curVo) {
                    t_model.CG_QiCe_eatDan_9707(1, t._curVo.id, t._hunType);
                }
                break;
        }
    }
}