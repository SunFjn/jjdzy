class ItemZJYW extends fairygui.GComponent {
    public static URL = "ui://7a366usafxp31";
    public container: EmptyComp;
    public txtName: fairygui.GTextField;
    public iconNoAct: fairygui.GImage;
    public iconSel: fairygui.GImage;
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }
    private _data: IDataZJYW;
    public setData(value: IDataZJYW) {
        this._data = value;
        if (value && value.id) {
            this.container.setUIRole(value.id);
            this.txtName.text = Config.hero_211[value.id].name;
            const tempCfg = Config.hero_211[value.id];
            this.txtName.color = Color.getColorInt(Model_WuJiang.getHeroQuality(tempCfg));
            this.iconNoAct.visible = value.state == 0;
            this.visible = true;
        }else {
            this.visible = false;
        }
    }
    public getData() {
        return this._data;
    }
    public clean() {
        this.container.setUIRole(null);
    }
    public selSel(value: boolean) {
        this.iconSel.visible = value;
    }
    public playSkill(skillId: number) {
        const awatar = this.container.getUIRole();
        if (awatar) {
            awatar.playSkillID(skillId, false);
        }
    }
}