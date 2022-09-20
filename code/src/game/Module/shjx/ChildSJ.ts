class ChildSJ extends fairygui.GComponent implements IPanel {
    public static URL = "ui://4aepcdbw811a3";
    public static createInstance(): ChildSJ {
		return <ChildSJ><any>(fairygui.UIPackage.createObject("shouhunJX", "ChildSJ"));
	}

    public bg: fairygui.GLoader;
    public curAttLb: fairygui.GRichTextField;
    public nextAttLb: fairygui.GRichTextField;
    public costItem: ViewResource;
    public powerLb: fairygui.GLabel;
    public upBt: Button0;
    public tabArr: Array<TabButton> = [];
    public typeImg: fairygui.GLoader;
    public upBtGroup: fairygui.GGroup;
    public attgroup: fairygui.GGroup;
    public maxGroup: fairygui.GGroup;
    public attLb: fairygui.GRichTextField;
    public levelLb: fairygui.GRichTextField;
    public typeIcon: fairygui.GLoader;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        const sf = this;
        CommonManager.parseChildren(sf, sf);
    }

    public initView(pParent: fairygui.GObject) {

    }
    public openPanel(pData?: Ishjx_266) {
        const sf = this;
        IconUtil.setImg(sf.bg, "resource/image/shouling/slBG.png");
        GGlobal.modelsl.CG_OPEN_SHOULING();
        sf.onSel(pData);
        GGlobal.modelSHJX.listen(ModelSH.msg_ui, sf.onUpdate, sf);
        GGlobal.modelSHJX.listen(ModelSH.msg_itemSel, sf.onSel, sf);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, sf.onBagUpdate, sf);
        GGlobal.control.listen(Enum_MsgType.SHOULING_DATA_UPDATE, sf.onUpdate, sf);
        sf.upBt.addClickListener(sf.upHandle, sf);
    }
    public closePanel() {
        const sf = this;
        IconUtil.setImg(sf.bg, null);
        GGlobal.modelSHJX.remove(ModelSH.msg_ui, sf.onUpdate, sf);
        GGlobal.modelSHJX.remove(ModelSH.msg_itemSel, sf.onSel, sf);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, sf.onBagUpdate, sf);
        GGlobal.control.remove(Enum_MsgType.SHOULING_DATA_UPDATE, sf.onUpdate, sf);
        sf.upBt.removeClickListener(sf.upHandle, sf);
        IconUtil.setImg(sf.typeImg, null);
    }

    public upHandle(): void {
        let a = this;
        if (a.upBt.checkNotice) {
            GGlobal.modelsl.CG_UPGRADE_SHOULING(Model_ShouLing.slArr[a._data.yj - 1]);
        } else {
            let cfg = Config.shoulin_704[Model_ShouLing.slArr[a._data.yj - 1]];
            let costArr: Array<any> = JSON.parse(cfg.consume);
            let itemVo: VoItem = VoItem.create(costArr[0][1]);
            View_CaiLiao_GetPanel.show(itemVo);
        }
    }
    private _data: Ishjx_266;
    protected onUpdate() {
        let a = this;
        if (!a._data) {
            return;
        }
        let cfg = Config.shoulin_704[Model_ShouLing.slArr[a._data.yj - 1]];
        IconUtil.setImg(a.typeImg, "resource/image/shouling/" + a._data.yj + ".png");
        let nextcfg;
        let attArr0: Array<any>;
        let attArr1: Array<any>;
        let attstr0: string = "";
        let attstr1: string = "";
        a.powerLb.text = cfg.fight + "";
        nextcfg = Config.shoulin_704[cfg.next];
        a.attgroup.visible = false;
        a.upBtGroup.visible = true;
        a.attLb.visible = false;
        a.maxGroup.visible = false;
        a.typeIcon.url = ModelSH.icNameUrls[a._data.yj - 1];
        if (cfg.lv != 0) {
            attArr0 = JSON.parse(cfg.attr);
            a.levelLb.text = cfg.lv + "\n级";
            if (cfg.next > 0) {
                attArr1 = JSON.parse(nextcfg.attr);
                for (let i = 0; i < attArr0.length; i++) {
                    if (i == 0) {
                        attstr0 += Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
                        attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    } else {
                        attstr0 += "\n" + Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
                        attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                }
                a.curAttLb.text = attstr0;
                a.nextAttLb.text = attstr1;
                a.attgroup.visible = true;
                a.updateCost();
            } else {
                for (let i = 0; i < attArr0.length; i++) {
                    if (i == 0) {
                        attstr0 += Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
                    } else {
                        attstr0 += "\n" + Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
                    }
                }
                a.attLb.text = ConfigHelp.attrString(attArr0, "+", Color.getColorStr(1), Color.getColorStr(2));
                a.attLb.visible = true;
                a.maxGroup.visible = true;
                a.upBtGroup.visible = false;
            }
        } else {
            a.levelLb.text = "0\n级";
            attArr1 = JSON.parse(nextcfg.attr);
            for (let i = 0; i < attArr1.length; i++) {
                if (i == 0) {
                    attstr0 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                } else {
                    attstr0 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                }
            }
            a.attLb.text = attstr0;
            a.attLb.visible = true;
            a.updateCost();
        }
    }
    private updateCost() {
        const a = this;
        let cfg = Config.shoulin_704[Model_ShouLing.slArr[a._data.yj - 1]];
        let costArr: Array<any> = JSON.parse(cfg.consume);
        let count = Model_Bag.getItemCount(costArr[0][1]);
        let itemVo: VoItem = VoItem.create(costArr[0][1]);
        if (cfg.next > 0) {
            a.upBt.checkNotice = count >= costArr[0][2];
            a.costItem.setLb(count, costArr[0][2]);
            a.costItem.setImgUrl(itemVo.icon);
        } else {
            a.upBt.checkNotice = false;
        }
        a.upBt.text = cfg.lv > 0 ? "升级" : "激活";
    }
    protected onSel(data: Ishjx_266) {
        const sf = this;
        sf._data = data;
        sf.onUpdate();
    }
    private onBagUpdate(items: any) {
        const sf = this;
        if (items && items[UIConst.SHOULING]) {
            sf.onUpdate();
        }
    }
}