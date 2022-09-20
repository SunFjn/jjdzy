class VErBarTZ extends UIModalPanel {
    public iconType: fairygui.GLoader;
    public txtJie: fairygui.GTextField;
    public txtZhanLi: fairygui.GTextField;
    public grpCur: fairygui.GGroup;
    public txtCur: fairygui.GTextField;
    public txtAttr1: fairygui.GTextField;
    public grpNext: fairygui.GGroup;
    public txtNext: fairygui.GTextField;
    public txtAttr2: fairygui.GTextField;
    public btnHand: Button1;
    public constructor() {
        super();
        this.loadRes("shouhunJX", "shouhunJX_atlas0");
    }
    private readonly urls2 = ["ui://4aepcdbwvwaa32", "ui://4aepcdbwvwaa31", "ui://4aepcdbwvwaa34", "ui://4aepcdbwvwaa33"];
    protected childrenCreated() {
        this.view = this.contentPane = fairygui.UIPackage.createObject("shouhunJX", "VErBarTZ").asCom;
        CommonManager.parseChildren(this.view, this);
        this.btnHand.addClickListener(this.onHand, this);
        super.childrenCreated();
    }
    private onHand() {
        const info = ModelSH.servDatas[this._data.yj];
        if (info) {
            GGlobal.modelSHJX.CG867(this._data.yj);
        }
    }
    private names = ["青龙之力", "白虎之力", "朱雀之力", "玄武之力"];
    private onUpdate() {
        this.iconType.icon = this.urls2[this._data.yj - 1];
        const info = ModelSH.servDatas[this._data.yj];
        if (info) {
            let cfg = Config.xjtz_266[info.suJie];
            this.btnHand.text = "升级";
            if (cfg) {
                const fitJi1 = Math.floor(info.suLv % 1000);
                this.txtJie.text = this.names[this._data.yj - 1] + `${info.suJie % 100}级`;
                this.txtZhanLi.text = "战力 +" + cfg.power;
                const nextCfg = Config.xjtz_266[info.suJie + 1];
                this.txtCur.text = HtmlUtil.fontNoSize(`当前阶段  `, "#FFC334") + `星宿达到${Math.floor(cfg.next % 1000 / 10 >> 0)}阶` + HtmlUtil.fontNoSize("(已激活)", "#16f60b");
                this.txtAttr1.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+");
                if (nextCfg) {
                    this.grpNext.visible = true;
                    const fitJi = Math.floor(nextCfg.next % 1000);
                    if (fitJi1 >= fitJi) {
                        this.btnHand.enabled = true;
                        this.btnHand.checkNotice = true;
                        this.txtNext.text = HtmlUtil.fontNoSize(`下一阶段  `, "#FFC334") + `星宿达到${fitJi / 10 >> 0}阶` + HtmlUtil.fontNoSize(`(${fitJi / 10 >> 0}/${fitJi / 10 >> 0})`, "#00ff00");
                    } else {
                        this.btnHand.enabled = false;
                        this.btnHand.checkNotice = false;
                        this.txtNext.text = HtmlUtil.fontNoSize(`下一阶段  `, "#FFC334") + `星宿达到${fitJi / 10 >> 0}阶` + HtmlUtil.fontNoSize(`(${fitJi1 / 10 >> 0}/${fitJi / 10 >> 0})`, "#ff0000");
                    }
                    this.txtAttr2.text = ConfigHelp.attrString(JSON.parse(nextCfg.attr), "+");
                } else {
                    this.grpNext.visible = false;
                    this.btnHand.text = "已满级";
                    this.btnHand.enabled = false;
                    this.btnHand.checkNotice = false;
                }
            } else {
                this.txtJie.text = this.names[this._data.yj - 1] + `0级`;
                this.txtZhanLi.text = "战力 +0";
                this.grpNext.visible = false;
                const id = this._data.yj * 1000 + 1;
                cfg = Config.xjtz_266[id];
                const fitJi = Math.floor(cfg.next % 1000);
                const fitJi1 = Math.floor(info.suLv % 1000);
                if (fitJi1 >= fitJi) {
                    this.btnHand.enabled = true;
                    this.btnHand.checkNotice = true;
                    this.txtCur.text = HtmlUtil.fontNoSize(`当前阶段  `, "#FFC334") + `星宿达到${fitJi / 10 >> 0}阶` + HtmlUtil.fontNoSize(`(${fitJi / 10 >> 0}/${fitJi / 10 >> 0})`, "#00ff00");
                } else {
                    this.btnHand.enabled = false;
                    this.btnHand.checkNotice = false;
                    this.txtCur.text = HtmlUtil.fontNoSize(`当前阶段  `, "#FFC334") + `星宿达到${fitJi / 10 >> 0}阶` + HtmlUtil.fontNoSize(`(${fitJi1 / 10 >> 0}/${fitJi / 10 >> 0})`, "#ff0000");
                }
                this.txtAttr1.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+");
            }
        }
    }
    private _data: Ishjx_266;
    public onShown() {
        this._data = this._args;
        this.onUpdate();
        GGlobal.modelSHJX.listen(ModelSH.msg_xingUpJie, this.onUpdate, this);
    }
    public onHide() {
        GGlobal.layerMgr.close(this.panelId);
        GGlobal.modelSHJX.remove(ModelSH.msg_xingUpJie, this.onUpdate, this);
    }
}