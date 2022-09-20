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
 * 群雄逐鹿商店界面
 * @author: lujiahao
 * @date: 2019-09-30 16:20:30
 */
var ViewShopQxzl = (function (_super) {
    __extends(ViewShopQxzl, _super);
    function ViewShopQxzl() {
        var _this = _super.call(this) || this;
        _this._consumeIdMap = [416002];
        _this.loadRes("qxzl", "qxzl_atlas0");
        return _this;
    }
    ViewShopQxzl.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "ViewShopQxzl"));
    };
    ViewShopQxzl.prototype.childrenCreated = function () {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewShopQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewShopQxzl.prototype.initView = function () {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.resCom.setType(1);
        var t_con0 = VoItem.create(this._consumeIdMap[0]);
        this.resCom.setImgUrl(t_con0.icon);
    };
    //=========================================== API ==========================================
    ViewShopQxzl.prototype.onShown = function () {
        var t = this;
        GGlobal.modelQxzl.CG_QunXiongZhuLu_openBaoKuUI_8957();
        IconUtil.setImg(t.banner, Enum_Path.PIC_URL + "qxzlShopBanner.jpg");
        t.refreshData();
        t.registerEvent(true);
        t.list.scrollToView(0);
    };
    ViewShopQxzl.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        Timer.instance.remove(t.onDateUpdate, t);
        IconUtil.setImg(t.banner, null);
        t.list.numItems = 0;
    };
    ViewShopQxzl.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewShopQxzl.prototype.onItemRender = function (pIndex, pItem) {
        if (this._dataList) {
            pItem.setData(this._dataList[pIndex]);
        }
    };
    ViewShopQxzl.prototype.refreshData = function () {
        var t = this;
        var t_dataList = GGlobal.modelQxzl.getShopVoList();
        var t_showList = t_dataList.concat();
        t._dataList = t_showList;
        t.list.numItems = t_showList.length;
        if (!Timer.instance.has(t.onDateUpdate, t))
            Timer.instance.listen(t.onDateUpdate, t);
        t.refreshShopConCount();
    };
    /** 刷新时间 */
    ViewShopQxzl.prototype.onDateUpdate = function () {
        // let t_dateStr = "";
        // if (this._curActVo) {
        //     let t_end = this._curActVo.end; //s
        //     const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
        //     let t_remainS = t_end - servTime;
        //     if (t_remainS > 0) {
        //         if (t_remainS < 24 * 60 * 60) {
        //             //小于24小时
        //             t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
        //         }
        //         else {
        //             t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
        //         }
        //     }
        //     else {
        //         t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
        //     }
        // }
        // this.tfDate.text = t_dateStr;
    };
    ViewShopQxzl.prototype.refreshShopConCount = function () {
        var t_count0 = Model_Bag.getItemCount(this._consumeIdMap[0]);
        this.resCom.setCount(t_count0);
    };
    ViewShopQxzl.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_SHOP_UPDATE, t.onShopUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
    };
    //======================================== handler =========================================
    ViewShopQxzl.prototype.onShopUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ViewShopQxzl.prototype.onBagUpdate = function () {
        var t = this;
        t.refreshData();
    };
    //>>>>end
    ViewShopQxzl.URL = "ui://6d8dzzdgrak317";
    return ViewShopQxzl;
}(UIModalPanel));
__reflect(ViewShopQxzl.prototype, "ViewShopQxzl");
