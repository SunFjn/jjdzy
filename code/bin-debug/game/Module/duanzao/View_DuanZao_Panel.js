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
var View_DuanZao_Panel = (function (_super) {
    __extends(View_DuanZao_Panel, _super);
    function View_DuanZao_Panel() {
        var _this = _super.call(this) || this;
        // public tabArr: Array<TabButton> = [];
        _this.gridArr = [];
        _this._uidList = [UIConst.DUANZAO_STRENG, UIConst.DUANZAO_STONE, UIConst.DUANZAO_STAR, UIConst.DUANZAO_ZHUHUN];
        _this.setSkin("DuanZao", "DuanZao_atlas0", "View_DuanZao_Panel");
        return _this;
    }
    View_DuanZao_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(Child_DuanZao_Streng.URL, Child_DuanZao_Streng);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_DuanZao_Stone.URL, Child_DuanZao_Stone);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_DuanZao_UpStar.URL, Child_DuanZao_UpStar);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_DuanZao_ZhuHun.URL, Child_DuanZao_ZhuHun);
        fairygui.UIObjectFactory.setPackageItemExtension(GemBt.URL, GemBt);
    };
    View_DuanZao_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        this._tabContronller = new TabController();
        this._tabContronller.initView(this, this.c1);
        this._tabContronller.setPanelClassMap([
            Child_DuanZao_Streng,
            Child_DuanZao_Stone,
            Child_DuanZao_UpStar,
            Child_DuanZao_ZhuHun,
        ]);
        this._tabContronller.tabChange = this.onTabChange;
        this._tabContronller.tabChangeCaller = this;
        for (var i = 0; i < 10; i++) {
            var grid = a["grid" + i];
            a.gridArr.push(grid);
            grid.addClickListener(a.gridHandle, a);
        }
        a.curGrid = a.gridArr[0];
    };
    View_DuanZao_Panel.prototype.onTabChange = function (pTabIndex, pVo) {
        var arr = this._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        var a = this;
        if (a.curGrid)
            a.curGrid.choose = false;
        a.curGrid = null;
        a.updateEquip();
        //设置传入页面的参数数据
        pVo.data = a.curGrid.vo;
        return true;
    };
    View_DuanZao_Panel.prototype.gridHandle = function (event) {
        var a = this;
        var grid = event.target;
        if (a.curGrid.id == grid.id)
            return;
        a.selectImg.x = grid.x - 10;
        a.selectImg.y = grid.y - 7;
        a.curGrid = grid;
        a.updateShow();
    };
    View_DuanZao_Panel.prototype.updateShow = function () {
        var a = this;
        var vo = a.curGrid.vo;
        if (!vo)
            return;
        var t_curPanel = this._tabContronller.curPanel;
        if (t_curPanel)
            t_curPanel.openPanel(vo);
    };
    View_DuanZao_Panel.prototype.updateEquip = function () {
        var a = this;
        var t_tabBtnList = this._tabContronller.tabBtnList;
        for (var i = 0; i < t_tabBtnList.length; i++) {
            t_tabBtnList[i].btn.checkNotice = GGlobal.reddot.checkCondition(UIConst.DUANZAO_STRENG, i);
        }
        Model_DuanZao.strengMinLV = 0;
        Model_DuanZao.gemLv = 0;
        Model_DuanZao.starMinLv = 0;
        var powerNum = 0;
        var equipData = Model_player.voMine.equipData;
        for (var i = 0; i < a.gridArr.length; i++) {
            var vo = equipData[i];
            a.gridArr[i].vo = vo;
            a.gridArr[i].showEff(true);
            a.gridArr[i].touchable = true;
            if (vo && !a.curGrid) {
                a.curGrid = a.gridArr[i];
            }
            if (!vo) {
                Model_DuanZao.starMinLv = 0;
                Model_DuanZao.strengMinLV = 0;
                continue;
            }
            switch (a.c1.selectedIndex) {
                case 0:
                    a.gridArr[i].checkNotice = Model_DuanZao.gridShowNotice_Streng(vo);
                    a.gridArr[i].showText = vo.qh + "";
                    powerNum += Config.dzqianghua_209[vo.qh].power;
                    if (i == 0) {
                        Model_DuanZao.strengMinLV = vo.qh;
                    }
                    else if (vo.qh < Model_DuanZao.strengMinLV) {
                        Model_DuanZao.strengMinLV = vo.qh;
                    }
                    break;
                case 1:
                    a.gridArr[i].checkNotice = Model_DuanZao.gridShowNotice_Stone(vo);
                    var len = vo.bs.length;
                    for (var i_1 = 0; i_1 < len; i_1++) {
                        if (vo.bs[i_1] > 0) {
                            powerNum += Config.dzgem_209[vo.bs[i_1]].power;
                            Model_DuanZao.gemLv += Config.dzgem_209[vo.bs[i_1]].lv;
                        }
                    }
                    break;
                case 2:
                    a.gridArr[i].checkNotice = Model_DuanZao.checkUpStarGridNotice(vo);
                    a.gridArr[i].showText = vo.starLv + "";
                    if (i == 0) {
                        Model_DuanZao.starMinLv = vo.starLv;
                    }
                    else if (vo.starLv < Model_DuanZao.starMinLv) {
                        Model_DuanZao.starMinLv = vo.starLv;
                    }
                    break;
                case 3:
                    powerNum += Config.dzsoul_209[vo.zhuHunLv].power;
                    a.gridArr[i].showText = vo.zhuHunLv + "阶";
                    break;
            }
        }
        if (a.c1.selectedIndex == 3) {
            powerNum += Config.dzinsoul_209[1].power * Model_DuanZao.drugArr[0];
            powerNum += Config.dzinsoul_209[2].power * Model_DuanZao.drugArr[1];
            powerNum += Config.dzinsoul_209[3].power * Model_DuanZao.drugArr[2];
            for (var i = 0; i < a.gridArr.length; i++) {
                var equipVo = a.gridArr[i].vo;
                a.gridArr[i].touchable = false;
                a.gridArr[i].checkNotice = false;
                if (i == 0) {
                    a.curGrid = a.gridArr[i];
                }
                else if (equipVo.zhuHunLv < a.curGrid.vo.zhuHunLv) {
                    a.curGrid = a.gridArr[i];
                }
            }
        }
        else if (a.c1.selectedIndex == 2) {
            powerNum += Model_DuanZao.upstarPower;
            for (var i = 0; i < a.gridArr.length; i++) {
                var equipVo = a.gridArr[i].vo;
                a.gridArr[i].touchable = false;
                a.gridArr[i].checkNotice = false;
                if (i == 0) {
                    a.curGrid = a.gridArr[i];
                }
                else if (equipVo.starLv < a.curGrid.vo.starLv) {
                    a.curGrid = a.gridArr[i];
                }
            }
        }
        a.powerLb.text = powerNum + "";
        if (a.curGrid && a.curGrid.vo) {
            a.curGrid = a.gridArr[a.curGrid.vo.type];
            if (a.c1.selectedIndex == 3) {
                a.curGrid.checkNotice = Model_DuanZao.checkZhuHunGridNotice(a.curGrid.vo);
            }
            else if (a.c1.selectedIndex == 2) {
                a.curGrid.checkNotice = Model_DuanZao.checkUpStarGridNotice(a.curGrid.vo);
            }
        }
        a.selectImg.x = a.curGrid.x - 10;
        a.selectImg.y = a.curGrid.y - 7;
        // a.updateShow();
    };
    View_DuanZao_Panel.prototype.onShown = function () {
        var a = this;
        a._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (a._args)
            t_selectIndex = a._args;
        a._tabContronller.selectedIndex = -1;
        a._tabContronller.selectedIndex = t_selectIndex;
        IconUtil.setImg(a.backImg, Enum_Path.BACK_URL + "forgingbg.jpg");
        GGlobal.reddot.listen(ReddotEvent.CHECK_DAUNZAO, a.onCheckDuanzao, a);
        GGlobal.control.listen(Enum_MsgType.DUANZAO_EFF_UPDATE, a.showEff, a);
    };
    View_DuanZao_Panel.prototype.onHide = function () {
        var a = this;
        a._tabContronller.registerEvent(false);
        a._tabContronller.close();
        IconUtil.setImg(a.backImg, null);
        GGlobal.layerMgr.close(UIConst.DUANZAO_STRENG);
        GGlobal.reddot.remove(ReddotEvent.CHECK_DAUNZAO, a.onCheckDuanzao, a);
        GGlobal.control.remove(Enum_MsgType.DUANZAO_EFF_UPDATE, a.showEff, a);
        ConfigHelp.cleanGridEff(a.gridArr);
        ConfigHelp.cleanGridEff(a.curGrid);
    };
    View_DuanZao_Panel.prototype.onCheckDuanzao = function () {
        var self = this;
        self.updateEquip();
        self.updateShow();
    };
    View_DuanZao_Panel.prototype.showEff = function (posArr) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
        if (t_panel && t_panel.grid) {
            EffectMgr.addEff("uieff/10027", t_panel.grid.displayListContainer, t_panel.grid.width / 2, t_panel.grid.height / 2, 400, 400, false);
        }
    };
    View_DuanZao_Panel.prototype.check_guideTab = function (arg) {
        return this.c1.selectedIndex == arg;
    };
    View_DuanZao_Panel.prototype.guideTab = function (arg) {
        var tab = this._tabContronller.getTabBtnByIndex(arg);
        if (tab) {
            GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
        }
    };
    View_DuanZao_Panel.prototype.guide_duanzao_keyStreng = function (step) {
        var t_panel = this._tabContronller.getTabPanelInstByIndex(0);
        if (t_panel)
            t_panel.guide_duanzao_keyStreng(step);
    };
    View_DuanZao_Panel.prototype.dispose = function () {
        if (this._tabContronller)
            this._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    View_DuanZao_Panel.prototype.guideClosePanel = function (step) {
        var btn = this.closeButton.asButton;
        GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
        GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
    };
    //>>>>end
    View_DuanZao_Panel.URL = "ui://pofv8989lqbq0";
    return View_DuanZao_Panel;
}(UIPanelBase));
__reflect(View_DuanZao_Panel.prototype, "View_DuanZao_Panel");
