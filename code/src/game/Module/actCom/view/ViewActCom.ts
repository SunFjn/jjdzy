class ViewActCom extends UIPanelBase {

    //>>>>start
    public tabCtrl: fairygui.Controller;
    public frame: frame4;
    public actList: fairygui.GList;
    public btnLeft: Button2;
    public btnRight: Button2;
    public titleIcon: fairygui.GLoader;
    //>>>>end

    public static URL: string = "ui://g8w9swygmvdu0";

    private _actList: Vo_Activity[] = [];

    /** 存储标签类定义 */
    private _panelClassMap: { [actId: number]: any } = {};
    /** 存储标签面板实例化对象 */
    private _panelInstMap: { [actId: number]: IPanel } = {};
    /** 当前标签页 */
    private _curPanel: IPanel;

    /** 当前的活动id */
    private _curActId: number = 0;

    /** 单个icon的宽度+列距，用于计算滚动步进 */
    private ICON_W = 115 + 3;

    public static createInstance(): ViewActCom {
        return <ViewActCom><any>(fairygui.UIPackage.createObject("actCom", "ViewActCom"));
    }

    public constructor() {
        super();
        this.setSkin("actCom", "", "ViewActCom");
        // this.focusable = false;
    }

    protected setExtends() {
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        /**曹操来袭 */
        f(CaoCaoSceneInfo.URL, CaoCaoSceneInfo);
        f(CaoCaotem.URL, CaoCaotem);

        //三国庆典
        f(ItemHLDuiHuan.URL, ItemHLDuiHuan);
        f(ItemXiaoFeiPH.URL, ItemXiaoFeiPH);
        f(ItemJiJin.URL, ItemJiJin);
        f(ItemXFBang.URL, ItemXFBang);
        f(ActiveCourtesyItem.URL, ActiveCourtesyItem);
        f(VZhuanPanReward.URL, VZhuanPanReward);
        f(VZhuanPanLab.URL, VZhuanPanLab);
        f(ChildZhuanPanTargetReward.URL, ChildZhuanPanTargetReward);
        f(QDShopItem.URL, QDShopItem);
        f(item_DanBiJiangLi.URL, item_DanBiJiangLi);
        f(item_DeLuYouJiang.URL, item_DeLuYouJiang);
        f(item_LeiChongFanLiBtn.URL, item_LeiChongFanLiBtn);
    }

    /**
     * 加载bin和altas文件
     * @param pPkg 
     */
    protected async loadFgui(pPkg: string) {
        if (!pPkg)
            return;
        if (!GGlobal.packDic[pPkg]) {
            await RES.getResAsync(pPkg);
            GGlobal.createPack(pPkg);
        }
        let t_atlas = pPkg + "_atlas0";
        if (RES.hasRes(t_atlas)) {
            await RES.getResAsync(t_atlas);
        }
    }

    protected initView(): void {
        super.initView();
        let self = this;
        //标签类定义要放在这里初始化，索引是活动id
        self._panelClassMap =
            {
                7203: ChildCaoCao,
                7207: Child_ShouChong_Reset,
                7201: Child_ActComDbZp,//单笔转盘
                7202: Child_ActComCzZp,//充值转盘
                7205: Child_ActComXfZp,//消费转盘
                7206: ChildXFFP,//消费翻牌
                7208: Child_ActComVipDis,//vip折扣活动
                7210: ChildXianding, //限定武将
                7211: Child_ActComSBZK,//神兵折扣活动      
                7204: Child_ActCom_SGBZ,//三国宝藏   
                7212: Child_ActComBuyLimit,//限时抢购
                7213: Child_ActComDouble,//双倍掉落
                7209: Child_ActCom_CZPH,//充值排行
                7304: ViewYSSL,//异兽送礼
                7301: Child_WSZW_LianChong,//连充豪礼
                7302: Child_WSZW_LeiChong,//累计充值
                7303: Child_WSZW_HuoYue,//每日活跃
                7306: Child_ActCom_Rank,//排行
                7305: Child_LoginYouJiang,//登陆有奖
                5702: ChildXiaoFeiPH,//消费排行
                5703: ChildHLDuiHuan,//豪礼兑换
                5704: ChildJiJin,//基金
                5705: Child_ZhuanPan,//庆典转盘
                5706: ChildHuoYueYouLi,//活跃有礼
                5707: Child_DeLuYouJiang,//登陆有奖
                5708: Child_DanBiFanLi,//单笔返利
                5709: Child_LeiChongFanLi,//累充返利
                5710: Child_QDShop,//三国庆典-商店
                7214: Child_ActCom_Rank,//新活动-鉴定排名
                7215: Child_ActCom_Rank,//新活动-祈愿排名
                7216: Child_ActComSBZK,//神将折扣活动
                7217: Child_ActCom_XFZD,//消费砸蛋     
                7220: ChildXfyt,//消费摇骰
                7221: ChildBalloon,//打气球
                7226: ChildSGZL2, //三国战令（活动）
                7227: ChildBzpt, //宝藏拼图
                7228: ChildCJS, //成就树
                7231: ChildShop12, //双12商城
                7243: ChildGGL, //刮刮乐
                7246: ChildXyfq, //幸运福签
                7501: Child_ActTalent,//龙飞凤舞-天赋修炼
                7502: Child_ActTalentGoal,//龙飞凤舞-天赋目标 
                4521: Child_ActCom_DBCZ,//龙飞凤舞-单笔充值
                7601: Child_DeLuYouJiang,//合服活动-登录有奖
                7603: Child_ActCom_ZFZJ,//合服活动-张飞醉酒
                7604: Child_ActCom_HFSC,//合服活动-合服首充
                7218: Child_ActCom_SJXS,//神将现世
                7602: Child_HeFu_DSSL,//合服活动-大神送礼
                7605: Child_HeFu_CZFL,//合服活动-充值返利
                7712: Child_ActTalent,//运筹帷幄-锦囊妙计
                7715: ViewYSSL,//运筹帷幄-奇策有礼
                7222: Child_WSZW_LianChong,//连续充值
                7219: Child_ActCom_WishTree,//飞龙在天-许愿树（活动）
                7751: Child_ActCom_WishTree,//飞龙在天-许愿树（系统）
                7223: Child_ActCom_ZTXF,//主题消费
                7224: Child_ActLuckTurn,//幸运转盘
                7225: Child_ActQFXF,//全服消费
                7230: Child_ActCom_LJFL,//累计返利
                7232: Child_ActCom_CSSL,//新活动-财神送礼
                7233: ChildLuckyEgg, //幸运扭蛋
                7229: Child_ActCom_JRSC,//节日商城
                7234: Child_ActCom_DDL,//新活动-对对联
                7235: Child_ActCom_TJHB,//天降红包
                7237: Child_ActCom_JSSC,//新活动-金鼠送财
                7236: Child_ActComNianShou,//年兽
                7240: Child_ActCom_TianJiangHL,//天降豪礼
                7242: ChildZZMiBao,//至尊秘宝
                7238: Child_ActComLeiTai,//擂台
                7239: Child_ActCom_YuanXiao,//座元宵
                7241: ChildSuperMarbles,//至尊秘宝
                7244: Child_ActCom_PXSB,//貔貅散宝
                7245: Child_ActCom_WMSZ,//武庙十哲
            };
        for (let k in self._panelClassMap) {
            let t_cls = self._panelClassMap[k];
            if (t_cls && t_cls.URL) {
                fairygui.UIObjectFactory.setPackageItemExtension(t_cls.URL, t_cls);
            }
        }

        self.actList.itemRenderer = self.onItemRender;
        self.actList.callbackThisObj = self;
        // self.actList.setVirtual();
        self.actList.scrollPane.scrollStep = self.ICON_W;
    }

    private onItemRender(pIndex: number, pItem: ComActivityTab) {
        let self = this;
        if (self._actList) {
            pItem.setData(self._actList[pIndex]);
        }
    }

    protected onShown() {
        let self = this;
        self.registerEvent(true);

        self.refreshData();
        self.setNotice();

        let t_tabIndex = 0;
        self.tabCtrl.selectedIndex = -1;
        if (self._args > 0) {
            for (let i = 0; i < self._actList.length; i++) {
                if (self._actList[i].id == self._args) {
                    t_tabIndex = i;
                    break;
                }
            }
        }
        if (self.actList.numItems > 0) {
            self.tabCtrl.selectedIndex = t_tabIndex;
            self.actList.scrollToView(t_tabIndex);
        }
    }

    protected onHide() {
        let self = this;
        self.registerEvent(false);
        IconUtil.setImg(self.titleIcon, null);
        if (self._curPanel) {
            self._curPanel.closePanel();
            if (self._curPanel instanceof fairygui.GObject) {
                self._curPanel.removeFromParent();
            }
            self._curPanel = null;
        }
        self._curActId = 0;
        self.actList.numItems = 0;
    }

    public dispose() {
        let self = this;
        for (let k in self._panelInstMap) {
            let t_panel = self._panelInstMap[k];
            if (t_panel && !t_panel['parent']) {
                t_panel.dispose();
            }
            delete self._panelInstMap[k];
        }

        super.dispose();
    }

    //=========================================== API ==========================================
    //===================================== private method =====================================
    private refreshData() {
        let self = this;
        let layerMgr = GGlobal.layerMgr;
        // if (layerMgr.panelData[self.$skin] == UIConst.ACTCOM || layerMgr.panelData[self.$skin] == UIConst.SANGUOQD) {
        let cfg: Ixitong_001 = Config.xitong_001[layerMgr.panelData[self.$skin]];
        if (cfg.or == 1) {
            self._actList = GGlobal.modelActivity.getGroup(layerMgr.panelData[self.$skin]);
            if (!self._actList) {
                self.hide();
                return;
            }
        } else {
            self._actList = ModelEightLock.getActivity(layerMgr.panelData[self.$skin]);
            if (self._actList.length <= 0) {
                self.hide();
                return;
            }
        }
        self._actList.sort(self.sortFuc);

        self.tabCtrl.clearPages();
        for (let i = 0; i < self._actList.length; i++) {
            self.tabCtrl.addPage();
        }
        self.actList.numItems = self._actList.length;
        if (self._curActId > 0) {
            let findIndex = 0;
            for (let i = 0; i < self._actList.length; i++) {
                if (self._actList[i].id == self._curActId) {
                    findIndex++;
                    break;
                }
            }
            if (findIndex == 0) {
                self.tabCtrl.selectedIndex = -1;
                self.tabCtrl.selectedIndex = 0;
                self.actList.scrollToView(0);
            }
        }
        self.actList.ensureBoundsCorrect();
        self.actList.ensureSizeCorrect();
        self.showLeftRightBtn();
    }

    private sortFuc(a: Vo_Activity, b: Vo_Activity): number {
        return a.sortNum - b.sortNum;
    }

    /**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag 
     */
    private registerEvent(pFlag: boolean): void {
        let self = this;
        GGlobal.reddot.register(pFlag, UIConst.ACTCOM, self.setNotice, self);
        GGlobal.reddot.register(pFlag, UIConst.ACTCOM_TAL, self.setNotice, self);
        GGlobal.modelSGQD.register(pFlag, ModelSGQD.msg_notice, self.setNotice, self);
        GGlobal.reddot.register(pFlag, UIConst.SG_ZHUANPAN, self.setNotice, self);
        GGlobal.control.register(pFlag, Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.setNotice, self);
        GGlobal.control.register(pFlag, Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.refreshData, self);
        GGlobal.control.register(pFlag, Enum_MsgType.SEND_OPEN_DAYS_SYSTEM, self.refreshData, self);
        EventUtil.register(pFlag, self.tabCtrl, fairygui.StateChangeEvent.CHANGED, self.onTabCtrlChangeHandler, self);
        EventUtil.register(pFlag, self.btnLeft, egret.TouchEvent.TOUCH_TAP, self.onArrowClick, self);
        EventUtil.register(pFlag, self.btnRight, egret.TouchEvent.TOUCH_TAP, self.onArrowClick, self);
        EventUtil.register(pFlag, self.actList.scrollPane, fairygui.ScrollPane.SCROLL, self.onScrollUpdate, self);
        EventUtil.register(pFlag, self.actList.scrollPane, fairygui.ScrollPane.SCROLL_END, self.onScrollUpdate, self);
    }

    //======================================== handler =========================================
    private _lastTabIndex: number = 0;
    private async onTabCtrlChangeHandler(e: fairygui.StateChangeEvent) {
        //============ 这段可以直接复制了 ===================
        let self = this;
        if (!(e.currentTarget instanceof fairygui.Controller))
            return;
        let t_selectedIndex = e.currentTarget.selectedIndex;
        if (t_selectedIndex < 0)
            return;

        let t_act = self.getActIdByTabIndex(t_selectedIndex);

        let t_cls = self._panelClassMap[t_act.id];
        if (t_cls) {
            var t_canOpen: boolean = true;
            try {
                t_canOpen = t_cls.checkOpen();
            } catch (error) {
                t_canOpen = true;
            }
        }
        if (!t_canOpen) {
            if (self._panelInstMap[self.getActIdByTabIndex(self._lastTabIndex).id])
                e.currentTarget.setSelectedIndex(self._lastTabIndex);
            else
                e.currentTarget.selectedIndex = self._lastTabIndex;
            return;
        }

        self._lastTabIndex = t_selectedIndex;

        self._curActId = t_act.id; //缓存当前的活动id

        //根据活动id设置标题
        // IconUtil.setImg(self.titleIcon, Enum_Path.ACTCOM_URL + GGlobal.layerMgr.panelData["ViewActCom"] + "_title.png");
        let arr: Vo_Activity[] = GGlobal.modelActivity.getGroup(GGlobal.layerMgr.panelData[self.$skin]);
        if (arr && arr.length > 0) {
            let vo: Vo_Activity = arr[0];
            // let cfg: Ihuodong_009 = GGlobal.modelActivity.gethuodong_009(vo.qs, vo.id);
            let cfg: Ihuodong_009 = Config.huodong_009[vo.index];
            if (cfg) IconUtil.setImg(self.titleIcon, Enum_Path.ACTCOM_URL + cfg.dicon + "_title.png");
        } else {
            IconUtil.setImg(self.titleIcon, Enum_Path.ACTCOM_URL + GGlobal.layerMgr.panelData["ViewActCom"] + "_title.png");
        }
        let t_targetPanel: IPanel = self._panelInstMap[t_act.id];
        if (!t_targetPanel) {
            let t_cls = self._panelClassMap[t_act.id];
            if (t_cls) {
                if (t_canOpen) {
                    await self.loadFgui(t_cls.pkg);
                    if ("setExtends" in t_cls) {
                        t_cls.setExtends(); //绑定ui子类组件
                    }
                    t_targetPanel = t_cls.createInstance();
                    self.view.setSize(self.view.initWidth, self.view.initHeight);
                    t_targetPanel.initView(self.view);
                    self._panelInstMap[t_act.id] = t_targetPanel;
                }
            }
        }
        if (self._curPanel != t_targetPanel) {
            if (self._curPanel) {
                self._curPanel.closePanel();
                if (self._curPanel instanceof fairygui.GObject) {
                    self._curPanel.removeFromParent();
                }
            }
            self._curPanel = t_targetPanel;
        }
        if (self._curPanel) {
            if (!self._curPanel["parent"]) {
                self.view.addChild(<fairygui.GComponent><any>self._curPanel);
            }
            self._curPanel.openPanel(t_act); //传入活动vo_activity
        }
        //============ 这段可以直接复制了 ===================
    }

    /** 通过tabIndex获取活动Vo_Activity */
    private getActIdByTabIndex(pTabIndex: number): Vo_Activity {
        let self = this;
        if (self._actList && self._actList.length > 0) {
            let t_vo = self._actList[pTabIndex];
            if (t_vo) {
                return t_vo;
            }
        }
        return null;
    }

    private onArrowClick(e: egret.TouchEvent) {
        let self = this;
        switch (e.currentTarget) {
            case self.btnLeft:
                self.actList.scrollPane.scrollLeft(~~(self.actList.width / self.ICON_W), true);
                break;
            case self.btnRight:
                self.actList.scrollPane.scrollRight(~~(self.actList.width / self.ICON_W), true);
                break;
        }
    }

    private onScrollUpdate(e: egret.Event) {
        let self = this;
        self.showLeftRightBtn();
    }

    /** 箭头按需显示 */
    private showLeftRightBtn() {
        let self = this;
        let t_posx = self.actList.scrollPane.posX;
        let t_contentW = self.actList.scrollPane.contentWidth;
        let t_viewW = self.actList.scrollPane.viewWidth;
        if (t_contentW > t_viewW) {
            if (t_posx == 0)
                self.btnLeft.visible = false;
            else
                self.btnLeft.visible = true;

            if (t_posx + t_viewW == t_contentW)
                self.btnRight.visible = false;
            else
                self.btnRight.visible = true;

            //检查箭头红点
            self.checkArrowReddot();
        }
        else {
            self.btnLeft.visible = false;
            self.btnRight.visible = false;
        }
    }

    private _tempPoint: egret.Point;
    private _startPoint: egret.Point;
    private _endPoint: egret.Point;
    /** 检查箭头是否有红点 */
    private checkArrowReddot() {
        let self = this;
        if (!self._actList) return;
        if (!self._tempPoint)
            self._tempPoint = egret.Point.create(0, 0);

        self._startPoint = self.actList.localToGlobal(0, 0);
        self._endPoint = self.actList.localToGlobal(self.actList.width, 0);

        let t_leftCount = 0;
        let t_rightCount = 0;
        for (let i = 0; i < self.actList.numItems; i++) {
            let t_btn: ComActivityTab = <any>self.actList.getChildAt(i);
            if (!t_btn || !t_btn.parent || !t_btn.parent.visible)
                continue;
            let t_reddotDis = t_btn.noticeImg;

            if (t_reddotDis && t_reddotDis.visible) {
                t_reddotDis.localToGlobal(0, 0, self._tempPoint);
                if (t_leftCount == 0 && self._tempPoint.x < self._startPoint.x) {
                    t_leftCount++;
                }
                else if (t_rightCount == 0 && self._tempPoint.x + t_reddotDis.width > self._endPoint.x) {
                    t_rightCount++;
                }
                if (t_leftCount > 0 && t_rightCount > 0)
                    break;
            }
        }
        self.btnLeft.noticeImg.visible = t_leftCount > 0;
        self.btnRight.noticeImg.visible = t_rightCount > 0;
    }

    /** 设置图标红点数据 */
    private setNotice(): void {
        let self = this;
        if (!self._actList) return;
        for (let i = 0; i < self.actList._children.length; i++) {
            let btn: ComActivityTab = self.actList._children[i] as ComActivityTab;
            let id = btn.actId;
            // let red = GGlobal.reddot.checkCondition(id, 0);
            let red = false;
            if (id == UIConst.WISHTREE_ACT || id == UIConst.WISHTREE_SYSTEM) {
                red = GGlobal.reddot.checkCondition(id, 0) || GGlobal.reddot.checkCondition(id, 1) ? true : false;
            } else {
                red = GGlobal.reddot.checkCondition(id, 0);
            }
            if (btn) btn.checkNotice = red;
        }
        self.checkArrowReddot();
    }
}