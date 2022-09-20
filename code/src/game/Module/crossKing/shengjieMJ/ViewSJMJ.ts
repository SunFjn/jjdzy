/**升阶秘境 */
class ViewSJMJ extends UIPanelBase {
    private listSel: fairygui.GList;
    private listTeam: fairygui.GList;
    private txtXieZhu: fairygui.GTextField;
    private lbPower: fairygui.GTextField;
    private btnHand: Button0;
    private btnXieZhu: Button0;
    private checkBox: fairygui.GButton;
    private iconLeft: fairygui.GImage;
    private iconRight: fairygui.GImage;
    private n2: fairygui.GLoader;
    private btnSaoDang: Button1;
    private chatBt: Button2;
    private c1: fairygui.Controller;
    public listTab: fairygui.GList;
    public battleNumLb: fairygui.GRichTextField;
    public constructor() {
        super();
        this.setSkin("crossKing", "crossKing_atlas0", "ViewSJMJ");
    }
    private grids = [];
    private seconds = 5;
    private isTicking: boolean = false;
    protected initView() {
        super.initView();
        const s = this;
        s.listSel.itemRenderer = s.onSelRender;
        s.listSel.callbackThisObj = s;
        s.listSel.addEventListener(fairygui.ItemEvent.CLICK, s.onDataSel, s);
        s.listSel.setVirtual();
        s.listTeam.itemRenderer = s.onTeamRender;
        s.listTeam.callbackThisObj = s;
        s.listTab.itemRenderer = s.onRenderTab;
        s.listTab.callbackThisObj = s;
        s.listTab.addEventListener(fairygui.ItemEvent.CLICK, s.onTabSel, s);
        s.listTab.setVirtual();
        s.btnHand.addClickListener(s.onHand, s);
        s.btnXieZhu.addClickListener(s.onHand, s);
        s.btnSaoDang.addClickListener(s.onHand, s);
        s.checkBox.addClickListener(s.onHand, s);
        CommonManager.listPageChange("VIEWSJMJ", s.listSel, s.iconLeft, s.iconRight, 3);
        // s.frame["titleIcon"].icon = "ui://yqpfulefgenj3l";
        s.isFullScreen = true;
        s.chatBt.addClickListener(s.chatHandler, s);
        s.initTabs();
    }
    private initTabs() {
        const lib = Config.sjmj_258;
        for (let key in lib) {
            this.tabDatas.push(lib[key]);
        }
        this.tabDatas.sort((a, b) => a.px - b.px);
    }
    private tabDatas: Isjmj_258[] = [];
    private curSelTab: ItemSJMJTab;
    private onRenderTab(index: number, renderer: ItemSJMJTab) {
        renderer.setData(this.tabDatas[index]);
        renderer.selected = this.curSelTab == renderer;
    }
    private onTabSel(evt: fairygui.ItemEvent) {
        if (ModelShengJieMJ.isSelfTeam) {
            ViewCommonWarn.text("退出组队才能更换副本!");
            return;
        }
        const renderer = evt.itemObject as ItemSJMJTab;
        this.setSelTab(renderer.getData());
    }
    public setSelTab(data: Isjmj_258) {
        if (data) {
            if (this.curSelTab && this.curSelTab.getData() != data) {
                this.curSelTab.setSel(false);
            }
            const virArr: any[] = this.listTab["_virtualItems"];
            for (let i = 0; i < virArr.length; i++) {
                const child = virArr[i].obj;
                if (child && child.getData() == data) {
                    (this.curSelTab = child).setSel(true);
                    break;
                }
            }
        } else {
            if (this.curSelTab) {
                this.curSelTab.setSel(false);
            }
        }
    }
    private updateTabs() {
        this.tabDatas.sort(this.onSort);
        this.listTab.numItems = this.tabDatas.length;
    }
    private onSort(a: Isjmj_258, b: Isjmj_258) {
        const openLvA = a.lv;
        const openLvB = b.lv;
        const heroLv = Model_LunHui.realLv;
        const aIndex = a.px + (heroLv < openLvA ? 100 : 0);
        const bIndex = b.px + (heroLv < openLvB ? 100 : 0);
        return aIndex - bIndex;
    }
    private chatHandler() {
        let date: Date = new Date(Model_GlobalMsg.getServerTime());
        let key = UIConst.SJMJ2 + "_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        egret.localStorage.setItem(key, "SJMJ_Chat_Notice");
        this.chatBt.checkNotice = false;
        if (Model_GlobalMsg.kaifuDay > 7) {
            GGlobal.layerMgr.open(UIConst.CHAT);
        } else {
            GGlobal.layerMgr.open(UIConst.CHAT, 1);
        }
    }
    protected setExtends() {
        super.setExtends();
        fairygui.UIObjectFactory.setPackageItemExtension(ItemMJSel.URL, ItemMJSel);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemTeam.URL, ItemTeam);
        fairygui.UIObjectFactory.setPackageItemExtension(ItemSJMJTab.URL, ItemSJMJTab);
    }
    private isCheck: boolean = true;
    private onHand(evt: egret.Event) {
        const self = this;
        const target = evt.currentTarget;
        switch (target) {
            case self.btnHand:
                if (self.btnHand.data == 0) {
                    GGlobal.modelSJMJ.CG3765(self.curSel.data.id);
                } else if (self.btnHand.data == 1) {
                    GGlobal.modelSJMJ.CG3775();
                } else if (self.btnHand.data == 3) {
                    const idAsKey = self.curSel.data.id / 1000 >> 0;
                    const sdCnt = GGlobal.modelSJMJ.sdCntDic[idAsKey];
                    if (sdCnt > 0) {
                        GGlobal.modelSJMJ.CG3765(self.curSel.data.id);
                    } else {
                        ViewCommonWarn.text("挑战次数不足");
                    }
                }
                break;
            case self.btnXieZhu:
                if (self.btnXieZhu.enabled == false) {
                    ViewCommonWarn.text("请稍等!");
                    return;
                }
                GGlobal.modelSJMJ.CG3769();
                break;
            case self.btnSaoDang:
                if (self.btnSaoDang.data == 0) {
                    if (GGlobal.layerMgr.backPanelId == UIConst.CHAT) {
                        self.close3();
                        GGlobal.layerMgr.open(UIConst.CHAT);
                    } else {
                        GGlobal.modelSJMJ.CG3771();
                    }
                } else {
                    GGlobal.modelSJMJ.CG3787(self.curSel.data.id);
                }
                break;
            case self.checkBox:
                self.isCheck = !self.isCheck;
                self.checkBox.selected = self.isCheck;
                self.tickHandle();
                break;
        }
    }
    private datas: Isjmjfb_258[];
    private onSelRender(index: number, renderer: ItemMJSel) {
        renderer.data = this.datas[index];
        renderer.selected = this.curSelID == renderer.data.id;
    }
    private onDataSel(evt: fairygui.ItemEvent) {
        const renderItem = evt.itemObject as ItemMJSel;
        const type = renderItem.data.id / 1000 >> 0;
        if (renderItem.state == 0) {
            ViewCommonWarn.text(ModelShengJieMJ.idToName[type] + "等阶不足");
        } else if (renderItem.state == 1) {
            ViewCommonWarn.text("需要通关上一个副本");
        } else {
            if (ModelShengJieMJ.isSelfTeam) {
                ViewCommonWarn.text("退出组队才能更换副本!");
            } else {
                this.isAutoSel = false;
                this.setDataSel(renderItem.data);
            }
        }
    }
    private curSel: ItemMJSel;
    private curSelID: number;
    protected setDataSel(data: Isjmjfb_258) {
        const self = this;
        const renderers: any[] = self.listSel["_virtualItems"];
        for (let i = 0, len = renderers.length; i < len; i++) {
            const renderer = renderers[i].obj as ItemMJSel;
            if (renderer && renderer.data == data) {
                if (self.curSel) {
                    self.curSel.selected = false;
                }
                (self.curSel = renderer).selected = true;
                self.curSelID = self.curSel.data.id;
                break;
            }
        }
        ItemTeam.curMiJing = self.curSel;
        GGlobal.modelSJMJ.CG3763(self.curSel.data.id);
        self.lbPower.text = self.curSel.data.power + ""
        self.lbPower.color = Model_player.voMine.str > self.curSel.data.power ? Color.GREENINT : Color.REDINT;

    }
    private isAutoSel: boolean = false;
    private onTeamRender(index: number, renderer: ItemTeam) {
        renderer.data = GGlobal.modelSJMJ.teamInfos[index];
    }
    private fubenInfoDic: { [key: string]: Isjmjfb_258[] } = {};
    /**更新通关信息 */
    private updateFBInfo() {
        const self = this;
        const justyId = self._args / 1000 >> 0;
        if (!self.fubenInfoDic[justyId]) {
            const lib = Config.sjmjfb_258;
            var arr = [];
            for (let key in lib) {
                const tempId = Number(key) / 1000 >> 0;
                if (tempId == justyId) {
                    arr.push(lib[key]);
                }
            }
            self.fubenInfoDic[justyId] = arr;
        }
        self.datas = self.fubenInfoDic[justyId];
        self.listSel.numItems = self.datas.length;
        const shouldSel = self.selRender();
        if (self.isAutoSel && shouldSel && self.curSel && shouldSel.data != self.curSel.data && !ViewSJMJ.isInvite && !ShengJieMJSceneCtrl.isBatEnd) {
            ShengJieMJSceneCtrl.isBatEnd = false;
            let temp: number = self.datas.indexOf(shouldSel.data);
            if (temp != 0) {
                temp -= 1
            } else if (temp == self.listSel.numItems) {
                temp = 20
            }
            self.listSel.scrollToView(temp);
            self.setDataSel(shouldSel.data);
        }
    }
    private selRender() {
        const self = this;
        const virArr: any[] = self.listSel["_virtualItems"];
        for (let i = 0; i < virArr.length; i++) {
            let render = virArr[i].obj as ItemMJSel;
            if (render && render.state == 2) {
                return render;
            }
        }
        return null;
    }
    /**更新队伍信息 */
    private updateTeam() {
        this.listTeam.numItems = GGlobal.modelSJMJ.teamInfos.length;
        this.showDetail();
    }
    /**副本详细信息 */
    private showDetail() {
        const self = this;
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        const awars = ConfigHelp.makeItemListArr(JSON.parse(self.curSel.data.kf));
        self.grids = ConfigHelp.addGridview(awars, self, 90, 480, true, false, 5, 80, 0.7);
        const state = self.getState();
        if (state == 3) {
            self.c1.setSelectedIndex(0);
        } else {
            self.c1.setSelectedIndex(state);
        }

        const curCnt = ModelShengJieMJ.xieZhuCnt;
        const maxCnt = ModelShengJieMJ.maxXieZhuCnt;

        let str = ""//没有周卡提示
        if (maxCnt <= 3) {
            str = "（周卡+2）";
        }
        if (maxCnt - curCnt <= 0) {
            self.txtXieZhu.text = HtmlUtil.fontNoSize(`${maxCnt - curCnt}/${maxCnt}`, "#ff0000") + str;
        } else {
            self.txtXieZhu.text = `${maxCnt - curCnt}/${maxCnt}` + str;
        }

        switch (state) {
            case 0://显示创建
            case 3:
                self.btnHand.data = state;
                self.btnHand.text = "创建队伍";
                const idAsKey = self.curSel.data.id / 1000 >> 0;
                const sdCnt = GGlobal.modelSJMJ.sdCntDic[idAsKey];
                self.battleNumLb.setVar("num", sdCnt).flushVars();
                break;
            case 1://显示 挑战 邀请协助
                self.btnHand.data = 1;
                self.btnHand.text = "开始挑战";
                if (self.isCheck && !self.isTicking) {
                    self.tickHandle();
                }
                break;
            case 2:
                if (!self.isLeader() && ModelShengJieMJ.isSelfTeam) {//非队长
                    self.btnSaoDang.data = 0;
                    self.btnSaoDang.text = "退出队伍";
                    self.btnSaoDang.enabled = true;
                } else {//已通关
                    self.btnSaoDang.data = 1;
                    self.btnSaoDang.text = "扫荡";
                    const idAsKey = self.curSel.data.id / 1000 >> 0;
                    const sdCnt = GGlobal.modelSJMJ.sdCntDic[idAsKey];
                    self.btnSaoDang.enabled = 3 - sdCnt > 0;
                }
                break;
        }
    }
    private isLeader() {
        if (ModelShengJieMJ.isSelfTeam) {
            const members = GGlobal.modelSJMJ.teamInfos;
            for (let i = 0, len = members.length; i < len; i++) {
                const member = members[i];
                if (member.id == Model_player.voMine.id && member.isLeader == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }
    private getState() {
        const self = this;
        const curId = self.curSel.data.id;
        const target = self.getTGInfo(curId);
        if (!ModelShengJieMJ.isSelfTeam && ((target == null && (curId % 1000 >> 0) == 1) || (target && curId == target.id + 1))) {
            return 0;
        } else if (self.isLeader()) {
            return 1;
        } else {
            if (ModelShengJieMJ.isSelfTeam && !self.isLeader()) {
                return 2;
            } else if (target && curId <= target.id) {
                return 3;
            }
        }
    }
    private getTGInfo(id: number) {
        const {fubenInfo} = GGlobal.modelSJMJ;
        const idAsKey = id / 1000 >> 0;
        for (let key in fubenInfo) {
            const compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return null;
    }
    private tickHandle() {
        const self = this;
        self.seconds = 5;
        if (self.isCheck && GGlobal.modelSJMJ.teamInfos.length == 3) {
            self.checkBox.text = `满员自动开始(${self.seconds}s)`;
            Timer.instance.listen(this.onTick, this, 1000, 0, false);
        } else {
            self.checkBox.text = `满员自动开始`;
            Timer.instance.remove(this.onTick, this);
        }
    }
    private onTick() {
        const self = this;
        self.seconds--;
        if (self.seconds < 0) {
            GGlobal.modelSJMJ.CG3775();
            Timer.instance.remove(this.onTick, this);
        } else {
            self.checkBox.text = `满员自动开始(${self.seconds}s)`;
        }
    }
    public static isInvite: boolean = false;
    protected onShown() {
        super.onShown();
        const self = this;
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_team, self.updateTeam, self);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_team, self.updateFBInfo, self);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_sjmj, self.updateFBInfo, self);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_invite, self.onInvite, self);
        GGlobal.modelSJMJ.listen(ModelShengJieMJ.msg_datas_sjmj, self.updateTabs, self);
        IconUtil.setImg(self.n2, Enum_Path.BACK_URL + "sjmjBack.png");
        self.updateTabs();
        self.mixHander(this._args);
    }
    /**混乱之治 */
    public mixHander(arg: any) {
        this._args = arg;
        const self = this;
        self.isAutoSel = true;
        self.resolveTab();
        self.updateFBInfo();
        if (ViewSJMJ.isInvite) {
            for (let i = 0; i < self.datas.length; i++) {
                const data = self.datas[i];
                if (data.id == self._args) {
                    let temp = i;
                    if (temp != 0) {
                        temp -= 1
                    } else if (i == self.datas.length - 1) {
                        temp = i;
                    }
                    self.listSel.scrollToView(temp);
                    self.setDataSel(data);
                    break;
                }
            }
        } else {
            for (let i = 0; i < self.datas.length; i++) {
                const data = self.datas[i];
                if (data.id == self.dealWidth(self._args)) {
                    let temp = i;
                    if (temp != 0) {
                        temp -= 1
                    } else if (i == self.datas.length - 1) {
                        temp = i;
                    }
                    self.listSel.scrollToView(temp);
                    self.setDataSel(data);
                    break;
                }
            }
        }
        self.showDetail();
        let date: Date = new Date(Model_GlobalMsg.getServerTime());
        let key = UIConst.SJMJ2 + "_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
        let value = egret.localStorage.getItem(key);
        self.chatBt.checkNotice = !value;
    }
    private resolveTab() {
        const id = this._args ? this._args / 1000 >> 0 : 1;
        for (let i = 0; i < this.tabDatas.length; i++) {
            const data = this.tabDatas[i];
            if (data.id == id) {
                let temp = i;
                if (temp != 0) {
                    temp -= 1
                } else if (i == this.tabDatas.length - 1) {
                    temp = i;
                }
                this.listTab.scrollToView(temp);
                this.setSelTab(data);
                break;
            }
        }
    }
    private dealWidth(enterId: number) {
        var nextId: number = enterId + 1;
        const virArr: any[] = this.listSel["_virtualItems"];
        for (let i = 0; i < virArr.length; i++) {
            const render = virArr[i].obj as ItemMJSel;
            if (render && render.data && render.data.id == nextId && render.state != 0 && render.state != 1) {
                return nextId;
            }
        }
        return enterId;
    }
    private lastTime: number = 0;
    private onInvite(time: number) {
        this.lastTime = time;
        this.btnXieZhu.enabled = false;
        Timer.instance.listen(function onT() {
            this.lastTime--;
            if (this.lastTime < 0) {
                this.btnXieZhu.enabled = true;
                this.btnXieZhu.text = "邀请协助";
                Timer.instance.remove(onT, this);
            } else {
                this.btnXieZhu.text = `等待(${this.lastTime})`;
            }
        }, this, 1000);
    }
    protected onHide() {
        super.onHide();
        const self = this;
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_team, self.updateTeam, self);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_team, self.updateFBInfo, self);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_sjmj, self.updateFBInfo, self);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_invite, self.onInvite, self);
        GGlobal.modelSJMJ.remove(ModelShengJieMJ.msg_datas_sjmj, self.updateTabs, self);
        self.listSel.numItems = 0;
        self.listTeam.numItems = 0;
        Timer.instance.remove(this.onTick, this);
        this.seconds = 5;
        self.curSel = null;
        self.curSelID = 0;
        self.curSelTab = null;
        ViewSJMJ.isInvite = false;
        IconUtil.setImg(self.n2, null);
        GGlobal.layerMgr.close(this.panelId);
    }
    protected closeEventHandler() {
        WorldSocketMgr.instance.close();
        if (GGlobal.layerMgr.backPanelId == 0) {
            GGlobal.layerMgr.open(UIConst.SJMJ1);
        }
        this.hide();
    }
    public close3() {
        WorldSocketMgr.instance.close();
        GGlobal.layerMgr.close2(this.panelId);
    }
}