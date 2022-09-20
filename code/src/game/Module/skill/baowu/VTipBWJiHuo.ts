class VTipBWJiHuo extends UIModalPanel {
    public bwIcon: fairygui.GLoader;
    public nameLb: fairygui.GLabel;
    public txtEff: fairygui.GRichTextField;
    public txtInfo: fairygui.GRichTextField;
    public btnHand: Button0;
    public txtType: fairygui.GTextField;
    public txtSJ: fairygui.GTextField;
    public n11: fairygui.GLoader;
    public constructor() {
        super();
        this.childrenCreated();
    }
    protected childrenCreated() {
        const self = this;
        self.view = fairygui.UIPackage.createObject("common", "VTipBWJiHuoSkin").asCom;
        self.contentPane = self.view;
        var children = self.view._children;
        for (let i = 0; i < children.length; i++) {
            var child = children[i];
            self[child.name] = child;
        }
        self.txtEff.wordWrap = true;
        self.btnHand.addClickListener(self.closeEventHandler, self);
        super.childrenCreated();
        this.showDetail(VTipBWJiHuo.datas.shift());
    }
    protected closeEventHandler() {
        const datas = VTipBWJiHuo.datas;
        if (datas.length > 0) {
            this.showDetail(datas.shift());
        } else {
            super.closeEventHandler(null);
        }
    }

    private godWeaponEff: Part;
    private bwEff: Part;
    private showDetail(vo: Vo_BaoWu | Vo_ShenJian | VoTianShu | Vo_ZhanJia | VoBingFa | Vo_YiBao | Vo_ZSGodWeapon) {
        const self = this;
        self.txtSJ.text = "";
        if (self.godWeaponEff) {
            EffectMgr.instance.removeEff(self.godWeaponEff);
            self.godWeaponEff = null;
        }
        let effID = 0;
        if (vo instanceof Vo_BaoWu) {
            self.txtType.text = "宝物效果:";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-宝物]</font>可激活新宝物并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.imageID + ".png");
            self.txtEff.text = SkillUtil.getSkillDes(vo.skillVo, 3);
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "baowu.png");
            self.nameLb.text = vo.name;
        } else if (vo instanceof Vo_ShenJian) {
            effID = vo.cfg.tptx;
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-神剑]</font>可激活新神剑并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.id + ".png");
            self.txtEff.text = "";
            self.txtSJ.text = HtmlUtil.fontNoSize("神剑效果: ", "#FFC344") + HtmlUtil.fontNoSize(vo.miaoshu, "#FFFFFF");
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "shenjian.png");
            self.nameLb.text = vo.name;
        } else if (vo instanceof VoTianShu) {
            self.txtType.text = "天书效果:";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-天书]</font>可激活新天书并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.pic + ".png");
            self.txtEff.text = vo.desc;
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "tianshu.png");
            self.nameLb.text = vo.name;
        } else if (vo instanceof Vo_ZhanJia) {//战甲
            effID = vo.cfg.tptx;
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-战甲]</font>可激活新战甲并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.cfg.pic + ".png");
            self.txtEff.text = "";
            self.n11.url = CommonManager.getUrl("Skill", "zhanjia");
            self.nameLb.text = vo.cfg.name;
        } else if (vo instanceof VoBingFa) {//兵法
            effID = vo.lib.tptx;
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-兵法]</font>可激活新兵法并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.pic + ".png");
            self.txtEff.text = "";
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "bingfa.png");
            self.nameLb.text = vo.name;
        } else if (vo instanceof Vo_YiBao) {//异宝
            effID = vo.cfg.tptx;
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[角色-异宝]</font>可激活新异宝并使用";
            IconUtil.setImg(self.bwIcon, Enum_Path.PIC_URL + vo.imageID + ".png");
            self.txtEff.text = "";
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "yibao.png");
            self.nameLb.text = vo.name;
        } else if (vo instanceof Vo_ZSGodWeapon) {//异宝
            self.txtType.text = "";
            self.txtInfo.text = "点击<font color='#FFC344'>[武将-神兵]</font>可激活新神兵并使用";
            IconUtil.setImg(self.bwIcon, null);
            self.godWeaponEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.bwIcon.displayObject as fairygui.UIContainer, self.bwIcon.width / 2, self.bwIcon.height / 2 + 50, 1000);
            self.txtEff.text = "";
            IconUtil.setImg(self.n11, Enum_Path.JIBAN_URL + "shenbing.png");
            self.nameLb.text = vo.cfg.name;
        }

        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
        if (effID > 0) {
            if (!self.bwEff) {
                self.bwEff = EffectMgr.addEff("uieff/" + effID, self.bwIcon.displayObject as fairygui.UIContainer, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000, -1, true);
            }
        }
    }
    protected onHide() {
        let self = this;
        GGlobal.layerMgr.close(UIConst.BAOWU_GETTIPS);
        IconUtil.setImg(self.bwIcon, null);
        IconUtil.setImg(self.n11, null);
        if (self.godWeaponEff) {
            EffectMgr.instance.removeEff(self.godWeaponEff);
            self.godWeaponEff = null;
        }
        if (self.bwEff) {
            EffectMgr.instance.removeEff(self.bwEff);
            self.bwEff = null;
        }
    }
    private static datas: (Vo_BaoWu | Vo_ShenJian | VoTianShu | Vo_ZhanJia | VoBingFa | Vo_YiBao | Vo_ZSGodWeapon)[] = [];
    public static add(vo: Vo_BaoWu | Vo_ShenJian | VoTianShu | Vo_ZhanJia | VoBingFa | Vo_YiBao | Vo_ZSGodWeapon) {
        this.datas.push(vo);
        if (!GGlobal.layerMgr.isOpenView(UIConst.BAOWU_GETTIPS)) {
            GGlobal.layerMgr.open(UIConst.BAOWU_GETTIPS);
        }
        const view: VTipBWJiHuo = GGlobal.layerMgr.getView(UIConst.BAOWU_GETTIPS);
        if (view.isInit && this.datas.length > 0) {
            view.showDetail(this.datas.shift());
        }
    }
}