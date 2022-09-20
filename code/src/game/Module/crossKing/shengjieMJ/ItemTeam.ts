class ItemTeam extends fairygui.GComponent {
    public static URL = "ui://yqpfulefudgz43";
    private c1: fairygui.Controller;
    private iconLeader: fairygui.GImage;
    private headInfo: ViewHead;
    private iconKick: fairygui.GImage;
    private txtZhanLi: fairygui.GTextField;
    private txtNum: fairygui.GTextField;
    private btnJoin: Button0;
    public constructFromXML(xml: any) {
        super.constructFromXML(xml);
        const self = this;
        CommonManager.parseChildren(self, self);
        self.iconKick.displayObject.touchEnabled = true;
        self.iconKick.addClickListener(self.onHand, self);
        self.btnJoin.addClickListener(self.onHand, self);
    }
    public static curMiJing: ItemMJSel;
    private onHand(evt: egret.Event) {
        const target = evt.currentTarget;
        switch (target) {
            case this.iconKick:
                if(this.data.id == Model_player.voMine.id) {
                    GGlobal.modelSJMJ.CG3771();
                }else {
                    GGlobal.modelSJMJ.CG3767(this.data.id);
                }
                break;
            case this.btnJoin:
                GGlobal.modelSJMJ.CG3773(this.data.teamId, ItemTeam.curMiJing ? ItemTeam.curMiJing.data.id : 0);
                break;
        }
    }
    private _data: ITeamInfo;
    public set data(value: ITeamInfo) {
        const self = this;
        self._data = value;
        self.headInfo.setdata(value.head, 0, value.name, 0, false, value.headBg);
        if (ModelShengJieMJ.isSelfTeam) {
            self.c1.setSelectedIndex(1);
            const isLeader = value.isLeader == 1;
            self.iconLeader.visible = isLeader;
            self.iconKick.visible = GGlobal.modelSJMJ.isLeader();
            self.txtZhanLi.text = `战力: ${ConfigHelp.numToStr(value.zhanLi)}`;  
            self.headInfo.y = 34;
        } else {
            self.c1.setSelectedIndex(0);
            self.txtNum.text = "人数: " + HtmlUtil.fontNoSize( value.count + "/3", "#00ff00");
            self.headInfo.y = 8;
        }
    }
    public get data() {
        return this._data;
    }
}