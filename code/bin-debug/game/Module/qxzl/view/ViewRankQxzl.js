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
/**
 * 群雄逐鹿排名界面
 * @author: lujiahao
 * @date: 2019-10-08 15:08:27
 */
var ViewRankQxzl = (function (_super) {
    __extends(ViewRankQxzl, _super);
    function ViewRankQxzl() {
        var _this = _super.call(this) || this;
        _this._playerListLen = 0;
        _this._curCountryId = 0;
        _this.loadRes("qxzl", "qxzl_atlas0");
        return _this;
    }
    ViewRankQxzl.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "ViewRankQxzl"));
    };
    ViewRankQxzl.prototype.childrenCreated = function () {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewRankQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRankQxzl.prototype.initView = function () {
        var t = this;
        t.listCountry.itemRenderer = t.onCountryItemRender;
        t.listCountry.callbackThisObj = t;
        t.listCountry.setVirtual();
        t.listPlayer.itemRenderer = t.onPlayerItemRender;
        t.listPlayer.callbackThisObj = t;
        t.listPlayer.setVirtual();
        t.mpvItemList.itemRenderer = t.onMvpItemRender;
        t.mpvItemList.callbackThisObj = t;
        t.mpvItemList.setVirtual();
        t.personList.itemRenderer = t.onPersonItemRender;
        t.personList.callbackThisObj = t;
        t.personList.setVirtual();
        t._playerListLen = GGlobal.modelQxzl.getRankVoListByType(2).length;
        ImageLoader.instance.loader(Enum_Path.TITLE_URL + "chenghao_085.png", t.loaderTitle);
        t.mpvItemList.numItems = GGlobal.modelQxzl.mvpRewardList.length;
    };
    //=========================================== API ==========================================
    ViewRankQxzl.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 4;
    };
    ViewRankQxzl.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
    };
    ViewRankQxzl.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewRankQxzl.prototype.onCountryItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._countryVoList) {
            pItem.setData(t._countryVoList[pIndex]);
        }
    };
    ViewRankQxzl.prototype.onPlayerItemRender = function (pIndex, pItem) {
        var t = this;
        var t_rank = pIndex + 1;
        if (t._curCountryId > 0)
            pItem.setData(t._curCountryId, t_rank);
    };
    ViewRankQxzl.prototype.onMvpItemRender = function (pIndex, pItem) {
        var t_list = GGlobal.modelQxzl.mvpRewardList;
        if (t_list) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    ViewRankQxzl.prototype.onPersonItemRender = function (pIndex, pItem) {
        var t = this;
        var t_rank = pIndex + 1;
        pItem.setData(t._personVoList[pIndex], t_rank);
    };
    ViewRankQxzl.prototype.refreshData = function (pTabIndex) {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        switch (pTabIndex) {
            case 0:
                t._countryVoList = t_model.getCountryVoList().concat();
                t._countryVoList.sort(function (pA, pB) {
                    return pA.rank - pB.rank;
                });
                t.listCountry.numItems = t._countryVoList.length;
                t.headItem.setData(t_model.mvpInfo);
                t.tfScore.text = ConfigHelp.reTxt("积分：{0}", t_model.mvpInfo.score);
                break;
            case 4:
                t._personVoList = t_model.personRankList;
                t._personVoList.sort(function (pA, pB) {
                    return pA.rank - pB.rank;
                });
                t.personList.numItems = 11;
                if (t_model.myPersonRank <= 0) {
                    t.lbMyRank.text = "我的排名：无";
                }
                else if (t_model.myPersonRank > 0 && t_model.myPersonRank <= 10) {
                    t.lbMyRank.text = ConfigHelp.reTxt("我的排名：{0}", t_model.myPersonRank);
                }
                else {
                    t.lbMyRank.text = "我的排名：10+";
                }
                t.lbScore.text = ConfigHelp.reTxt("我的积分：{0}", t_model.myPersonScore);
                break;
            default:
                t.listPlayer.numItems = t._playerListLen;
                t._curCountryId = pTabIndex;
                if (t_model.myCountry == pTabIndex) {
                    if (t_model.myRank > 0) {
                        t.tfMyRank.text = ConfigHelp.reTxt("我的排名：{0}", t_model.myRank);
                    }
                    else {
                        t.tfMyRank.text = ConfigHelp.reTxt("我的排名：{0}", "未上榜");
                    }
                    t.tfMyScore.text = ConfigHelp.reTxt("我的积分：{0}", t_model.myScore);
                }
                else {
                    t.tfMyRank.text = "";
                    t.tfMyScore.text = "";
                }
                break;
        }
    };
    ViewRankQxzl.prototype.getGListByTabIndex = function (pTabIndex) {
        var t = this;
        switch (pTabIndex) {
            case 0:
                return t.listCountry;
            default:
                return t.listPlayer;
        }
    };
    ViewRankQxzl.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_RANK_COUNTRY_UPDATE, t.onRankCountryUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_RANK_PLAYER_UPDATE, t.onRankPlayerUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_RANK_PERSON_UPDATE, t.onRankPersonUpdate, t);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
    };
    //======================================== handler =========================================
    ViewRankQxzl.prototype.onTabChange = function (e) {
        var t = this;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData(t_tabIndex);
        var t_gList = t.getGListByTabIndex(t_tabIndex);
        t_gList.scrollToView(0);
        switch (t_tabIndex) {
            case 0:
                GGlobal.modelQxzl.CG_QunXiongZhuLu_openRankUI_8953();
                break;
            case 4:
                GGlobal.modelQxzl.CG_openPersonRankUI_8983();
                break;
            default:
                GGlobal.modelQxzl.CG_QunXiongZhuLu_openCountryRankUI_8965(t_tabIndex);
                t.refreshData(t_tabIndex);
                break;
        }
    };
    ViewRankQxzl.prototype.onRankCountryUpdate = function () {
        var t = this;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex == 0)
            t.refreshData(t_tabIndex);
    };
    ViewRankQxzl.prototype.onRankPlayerUpdate = function () {
        var t = this;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex == 0)
            return;
        t.refreshData(t_tabIndex);
    };
    ViewRankQxzl.prototype.onRankPersonUpdate = function () {
        var t = this;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex == 4)
            t.refreshData(t_tabIndex);
    };
    //>>>>end
    ViewRankQxzl.URL = "ui://6d8dzzdgcpw919";
    return ViewRankQxzl;
}(UIModalPanel));
__reflect(ViewRankQxzl.prototype, "ViewRankQxzl");
