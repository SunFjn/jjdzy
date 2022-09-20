var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ViewActCom = (function (_super) {
    __extends(ViewActCom, _super);
    function ViewActCom() {
        var _this = _super.call(this) || this;
        _this._actList = [];
        /** 存储标签类定义 */
        _this._panelClassMap = {};
        /** 存储标签面板实例化对象 */
        _this._panelInstMap = {};
        /** 当前的活动id */
        _this._curActId = 0;
        /** 单个icon的宽度+列距，用于计算滚动步进 */
        _this.ICON_W = 115 + 3;
        //======================================== handler =========================================
        _this._lastTabIndex = 0;
        _this.setSkin("actCom", "", "ViewActCom");
        return _this;
        // this.focusable = false;
    }
    ViewActCom.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCom", "ViewActCom"));
    };
    ViewActCom.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
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
    };
    /**
     * 加载bin和altas文件
     * @param pPkg
     */
    ViewActCom.prototype.loadFgui = function (pPkg) {
        return __awaiter(this, void 0, void 0, function () {
            var t_atlas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!pPkg)
                            return [2 /*return*/];
                        if (!!GGlobal.packDic[pPkg]) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.getResAsync(pPkg)];
                    case 1:
                        _a.sent();
                        GGlobal.createPack(pPkg);
                        _a.label = 2;
                    case 2:
                        t_atlas = pPkg + "_atlas0";
                        if (!RES.hasRes(t_atlas)) return [3 /*break*/, 4];
                        return [4 /*yield*/, RES.getResAsync(t_atlas)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ViewActCom.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        //标签类定义要放在这里初始化，索引是活动id
        self._panelClassMap =
            {
                7203: ChildCaoCao,
                7207: Child_ShouChong_Reset,
                7201: Child_ActComDbZp,
                7202: Child_ActComCzZp,
                7205: Child_ActComXfZp,
                7206: ChildXFFP,
                7208: Child_ActComVipDis,
                7210: ChildXianding,
                7211: Child_ActComSBZK,
                7204: Child_ActCom_SGBZ,
                7212: Child_ActComBuyLimit,
                7213: Child_ActComDouble,
                7209: Child_ActCom_CZPH,
                7304: ViewYSSL,
                7301: Child_WSZW_LianChong,
                7302: Child_WSZW_LeiChong,
                7303: Child_WSZW_HuoYue,
                7306: Child_ActCom_Rank,
                7305: Child_LoginYouJiang,
                5702: ChildXiaoFeiPH,
                5703: ChildHLDuiHuan,
                5704: ChildJiJin,
                5705: Child_ZhuanPan,
                5706: ChildHuoYueYouLi,
                5707: Child_DeLuYouJiang,
                5708: Child_DanBiFanLi,
                5709: Child_LeiChongFanLi,
                5710: Child_QDShop,
                7214: Child_ActCom_Rank,
                7215: Child_ActCom_Rank,
                7216: Child_ActComSBZK,
                7217: Child_ActCom_XFZD,
                7220: ChildXfyt,
                7221: ChildBalloon,
                7226: ChildSGZL2,
                7227: ChildBzpt,
                7228: ChildCJS,
                7231: ChildShop12,
                7243: ChildGGL,
                7246: ChildXyfq,
                7501: Child_ActTalent,
                7502: Child_ActTalentGoal,
                4521: Child_ActCom_DBCZ,
                7601: Child_DeLuYouJiang,
                7603: Child_ActCom_ZFZJ,
                7604: Child_ActCom_HFSC,
                7218: Child_ActCom_SJXS,
                7602: Child_HeFu_DSSL,
                7605: Child_HeFu_CZFL,
                7712: Child_ActTalent,
                7715: ViewYSSL,
                7222: Child_WSZW_LianChong,
                7219: Child_ActCom_WishTree,
                7751: Child_ActCom_WishTree,
                7223: Child_ActCom_ZTXF,
                7224: Child_ActLuckTurn,
                7225: Child_ActQFXF,
                7230: Child_ActCom_LJFL,
                7232: Child_ActCom_CSSL,
                7233: ChildLuckyEgg,
                7229: Child_ActCom_JRSC,
                7234: Child_ActCom_DDL,
                7235: Child_ActCom_TJHB,
                7237: Child_ActCom_JSSC,
                7236: Child_ActComNianShou,
                7240: Child_ActCom_TianJiangHL,
                7242: ChildZZMiBao,
                7238: Child_ActComLeiTai,
                7239: Child_ActCom_YuanXiao,
                7241: ChildSuperMarbles,
                7244: Child_ActCom_PXSB,
                7245: Child_ActCom_WMSZ,
            };
        for (var k in self._panelClassMap) {
            var t_cls = self._panelClassMap[k];
            if (t_cls && t_cls.URL) {
                fairygui.UIObjectFactory.setPackageItemExtension(t_cls.URL, t_cls);
            }
        }
        self.actList.itemRenderer = self.onItemRender;
        self.actList.callbackThisObj = self;
        // self.actList.setVirtual();
        self.actList.scrollPane.scrollStep = self.ICON_W;
    };
    ViewActCom.prototype.onItemRender = function (pIndex, pItem) {
        var self = this;
        if (self._actList) {
            pItem.setData(self._actList[pIndex]);
        }
    };
    ViewActCom.prototype.onShown = function () {
        var self = this;
        self.registerEvent(true);
        self.refreshData();
        self.setNotice();
        var t_tabIndex = 0;
        self.tabCtrl.selectedIndex = -1;
        if (self._args > 0) {
            for (var i = 0; i < self._actList.length; i++) {
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
    };
    ViewActCom.prototype.onHide = function () {
        var self = this;
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
    };
    ViewActCom.prototype.dispose = function () {
        var self = this;
        for (var k in self._panelInstMap) {
            var t_panel = self._panelInstMap[k];
            if (t_panel && !t_panel['parent']) {
                t_panel.dispose();
            }
            delete self._panelInstMap[k];
        }
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ViewActCom.prototype.refreshData = function () {
        var self = this;
        var layerMgr = GGlobal.layerMgr;
        // if (layerMgr.panelData[self.$skin] == UIConst.ACTCOM || layerMgr.panelData[self.$skin] == UIConst.SANGUOQD) {
        var cfg = Config.xitong_001[layerMgr.panelData[self.$skin]];
        if (cfg.or == 1) {
            self._actList = GGlobal.modelActivity.getGroup(layerMgr.panelData[self.$skin]);
            if (!self._actList) {
                self.hide();
                return;
            }
        }
        else {
            self._actList = ModelEightLock.getActivity(layerMgr.panelData[self.$skin]);
            if (self._actList.length <= 0) {
                self.hide();
                return;
            }
        }
        self._actList.sort(self.sortFuc);
        self.tabCtrl.clearPages();
        for (var i = 0; i < self._actList.length; i++) {
            self.tabCtrl.addPage();
        }
        self.actList.numItems = self._actList.length;
        if (self._curActId > 0) {
            var findIndex = 0;
            for (var i = 0; i < self._actList.length; i++) {
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
    };
    ViewActCom.prototype.sortFuc = function (a, b) {
        return a.sortNum - b.sortNum;
    };
    /**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag
     */
    ViewActCom.prototype.registerEvent = function (pFlag) {
        var self = this;
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
    };
    ViewActCom.prototype.onTabCtrlChangeHandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var self, t_selectedIndex, t_act, t_cls, t_canOpen, arr, vo, cfg, t_targetPanel, t_cls_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!(e.currentTarget instanceof fairygui.Controller))
                            return [2 /*return*/];
                        t_selectedIndex = e.currentTarget.selectedIndex;
                        if (t_selectedIndex < 0)
                            return [2 /*return*/];
                        t_act = self.getActIdByTabIndex(t_selectedIndex);
                        t_cls = self._panelClassMap[t_act.id];
                        if (t_cls) {
                            t_canOpen = true;
                            try {
                                t_canOpen = t_cls.checkOpen();
                            }
                            catch (error) {
                                t_canOpen = true;
                            }
                        }
                        if (!t_canOpen) {
                            if (self._panelInstMap[self.getActIdByTabIndex(self._lastTabIndex).id])
                                e.currentTarget.setSelectedIndex(self._lastTabIndex);
                            else
                                e.currentTarget.selectedIndex = self._lastTabIndex;
                            return [2 /*return*/];
                        }
                        self._lastTabIndex = t_selectedIndex;
                        self._curActId = t_act.id; //缓存当前的活动id
                        arr = GGlobal.modelActivity.getGroup(GGlobal.layerMgr.panelData[self.$skin]);
                        if (arr && arr.length > 0) {
                            vo = arr[0];
                            cfg = Config.huodong_009[vo.index];
                            if (cfg)
                                IconUtil.setImg(self.titleIcon, Enum_Path.ACTCOM_URL + cfg.dicon + "_title.png");
                        }
                        else {
                            IconUtil.setImg(self.titleIcon, Enum_Path.ACTCOM_URL + GGlobal.layerMgr.panelData["ViewActCom"] + "_title.png");
                        }
                        t_targetPanel = self._panelInstMap[t_act.id];
                        if (!!t_targetPanel) return [3 /*break*/, 2];
                        t_cls_1 = self._panelClassMap[t_act.id];
                        if (!t_cls_1) return [3 /*break*/, 2];
                        if (!t_canOpen) return [3 /*break*/, 2];
                        return [4 /*yield*/, self.loadFgui(t_cls_1.pkg)];
                    case 1:
                        _a.sent();
                        if ("setExtends" in t_cls_1) {
                            t_cls_1.setExtends(); //绑定ui子类组件
                        }
                        t_targetPanel = t_cls_1.createInstance();
                        self.view.setSize(self.view.initWidth, self.view.initHeight);
                        t_targetPanel.initView(self.view);
                        self._panelInstMap[t_act.id] = t_targetPanel;
                        _a.label = 2;
                    case 2:
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
                                self.view.addChild(self._curPanel);
                            }
                            self._curPanel.openPanel(t_act); //传入活动vo_activity
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 通过tabIndex获取活动Vo_Activity */
    ViewActCom.prototype.getActIdByTabIndex = function (pTabIndex) {
        var self = this;
        if (self._actList && self._actList.length > 0) {
            var t_vo = self._actList[pTabIndex];
            if (t_vo) {
                return t_vo;
            }
        }
        return null;
    };
    ViewActCom.prototype.onArrowClick = function (e) {
        var self = this;
        switch (e.currentTarget) {
            case self.btnLeft:
                self.actList.scrollPane.scrollLeft(~~(self.actList.width / self.ICON_W), true);
                break;
            case self.btnRight:
                self.actList.scrollPane.scrollRight(~~(self.actList.width / self.ICON_W), true);
                break;
        }
    };
    ViewActCom.prototype.onScrollUpdate = function (e) {
        var self = this;
        self.showLeftRightBtn();
    };
    /** 箭头按需显示 */
    ViewActCom.prototype.showLeftRightBtn = function () {
        var self = this;
        var t_posx = self.actList.scrollPane.posX;
        var t_contentW = self.actList.scrollPane.contentWidth;
        var t_viewW = self.actList.scrollPane.viewWidth;
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
    };
    /** 检查箭头是否有红点 */
    ViewActCom.prototype.checkArrowReddot = function () {
        var self = this;
        if (!self._actList)
            return;
        if (!self._tempPoint)
            self._tempPoint = egret.Point.create(0, 0);
        self._startPoint = self.actList.localToGlobal(0, 0);
        self._endPoint = self.actList.localToGlobal(self.actList.width, 0);
        var t_leftCount = 0;
        var t_rightCount = 0;
        for (var i = 0; i < self.actList.numItems; i++) {
            var t_btn = self.actList.getChildAt(i);
            if (!t_btn || !t_btn.parent || !t_btn.parent.visible)
                continue;
            var t_reddotDis = t_btn.noticeImg;
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
    };
    /** 设置图标红点数据 */
    ViewActCom.prototype.setNotice = function () {
        var self = this;
        if (!self._actList)
            return;
        for (var i = 0; i < self.actList._children.length; i++) {
            var btn = self.actList._children[i];
            var id = btn.actId;
            // let red = GGlobal.reddot.checkCondition(id, 0);
            var red = false;
            if (id == UIConst.WISHTREE_ACT || id == UIConst.WISHTREE_SYSTEM) {
                red = GGlobal.reddot.checkCondition(id, 0) || GGlobal.reddot.checkCondition(id, 1) ? true : false;
            }
            else {
                red = GGlobal.reddot.checkCondition(id, 0);
            }
            if (btn)
                btn.checkNotice = red;
        }
        self.checkArrowReddot();
    };
    //>>>>end
    ViewActCom.URL = "ui://g8w9swygmvdu0";
    return ViewActCom;
}(UIPanelBase));
__reflect(ViewActCom.prototype, "ViewActCom");
