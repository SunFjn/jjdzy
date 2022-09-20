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
 * 城池查看界面
 * @author: lujiahao
 * @date: 2019-09-29 10:35:47
 */
var ViewCityInfoQxzl = (function (_super) {
    __extends(ViewCityInfoQxzl, _super);
    function ViewCityInfoQxzl() {
        var _this = _super.call(this) || this;
        /** 每页显示个数 */
        _this._perPageCount = 9;
        _this._curPage = 1;
        _this.loadRes("qxzl", "qxzl_atlas0");
        return _this;
    }
    ViewCityInfoQxzl.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "ViewCityInfoQxzl"));
    };
    ViewCityInfoQxzl.prototype.childrenCreated = function () {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewCityInfoQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewCityInfoQxzl.prototype.initView = function () {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
    };
    //=========================================== API ==========================================
    ViewCityInfoQxzl.prototype.onShown = function () {
        var t = this;
        var t_arg = t._args;
        if (t_arg) {
            this._curData = GGlobal.modelQxzl.getCityVoById(t_arg.cityId);
        }
        if (this._curData) {
            GGlobal.modelQxzl.CG_QunXiongZhuLu_showCityInfo_8969(this._curData.id, 1);
        }
        t.refreshData(1);
        t.registerEvent(true);
    };
    ViewCityInfoQxzl.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        this._curPageDataList.length = 0;
        t.list.numItems = 0;
    };
    ViewCityInfoQxzl.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewCityInfoQxzl.prototype.onItemRender = function (pIndex, pItem) {
        if (this._curPageDataList) {
            var t_startIndex = (this._curPage - 1) * EnumQxzl.PER_PAGE_COUNT;
            var t_index = t_startIndex + pIndex;
            pItem.setData(t_index, this._curPageDataList[pIndex], this._curData.id);
        }
    };
    ViewCityInfoQxzl.prototype.refreshData = function (pPage) {
        var t = this;
        t._curPage = pPage;
        var t_model = GGlobal.modelQxzl;
        if (t._curData) {
            var t_sourceList = t._curData.playerList;
            t._curPageDataList = ArrayUitl.getDataListByPageNum(pPage, t._perPageCount, t_sourceList);
            t.list.numItems = t._curPageDataList.length;
            if (t._curData.isDouble)
                t.imageSpec.visible = true;
            else
                t.imageSpec.visible = false;
            t.tfPage.text = t._curPage + "/" + t._curData.maxPage;
            if (t._curData.isDouble) {
                t.tfDes.text = ConfigHelp.reTxt("每10分钟可积累获得<font color='#15f234'>{0}鹿角</font>、<font color='#15f234'>{1}积分</font>，并消耗<font color='#ed1414'>{2}体力</font>", t_model.doubleGuardReward[0].count, t_model.doubleGuardPoint, t._curData.cfg.conmuse);
            }
            else {
                t.tfDes.text = ConfigHelp.reTxt("每10分钟可积累获得<font color='#15f234'>{0}鹿角</font>、<font color='#15f234'>{1}积分</font>，并消耗<font color='#ed1414'>{2}体力</font>", t._curData.rewardLujiao, t._curData.cfg.point, t._curData.cfg.conmuse);
            }
            if (t._curData.countryId > 0)
                t.frame.title = ConfigHelp.reTxt("{0} - {1}", t._curData.cfg.name, FastAPI.getCountryName(t._curData.countryId, true));
            else
                t.frame.title = t._curData.cfg.name;
        }
        else {
        }
    };
    ViewCityInfoQxzl.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_CITY_INFO_UPDATE, t.onCityInfoUpdate, t);
        EventUtil.register(pFlag, t.btnLast, egret.TouchEvent.TOUCH_TAP, t.onBtnPageClick, t);
        EventUtil.register(pFlag, t.btnNext, egret.TouchEvent.TOUCH_TAP, t.onBtnPageClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewCityInfoQxzl.prototype.onCityInfoUpdate = function (pData) {
        if (this._curData && pData.cityId == this._curData.id) {
            this.refreshData(pData.curPage);
        }
    };
    ViewCityInfoQxzl.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnReward:
                if (t._curData) {
                    if (t._curData.isDouble) {
                        //庆典显示不同的奖励
                        View_BoxReward_Show.show(GGlobal.modelQxzl.doubleRewardList, "<font color='#FFC344'>（庆典城池）</font>领地奖励22点结算后通过邮件发放", "领地奖励");
                    }
                    else {
                        View_BoxReward_Show.show(t._curData.rewardList, "领地奖励22点结算后通过邮件发放", "领地奖励");
                    }
                }
                break;
        }
    };
    ViewCityInfoQxzl.prototype.onBtnPageClick = function (e) {
        var t = this;
        var t_page = 0;
        switch (e.currentTarget) {
            case t.btnLast:
                if (this._curPage <= 1)
                    return;
                t_page = this._curPage - 1;
                break;
            case t.btnNext:
                if (this._curPage >= this._curData.maxPage)
                    return;
                t_page = this._curPage + 1;
                break;
        }
        GGlobal.modelQxzl.CG_QunXiongZhuLu_showCityInfo_8969(t._curData.id, t_page);
    };
    //>>>>end
    ViewCityInfoQxzl.URL = "ui://6d8dzzdgfmjxv";
    return ViewCityInfoQxzl;
}(UIModalPanel));
__reflect(ViewCityInfoQxzl.prototype, "ViewCityInfoQxzl");
