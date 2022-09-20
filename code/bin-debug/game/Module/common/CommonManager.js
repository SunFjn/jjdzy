var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonManager = (function () {
    function CommonManager() {
    }
    /**获取当前包里资源 pkgname 包名 resName资源名*/
    CommonManager.getUrl = function (pkgname, resName) {
        var url = fairygui.UIPackage.getItemURL(pkgname, resName);
        return url;
    };
    /**获取公共文件夹资源 */
    CommonManager.getCommonUrl = function (str) {
        var url = fairygui.UIPackage.getItemURL(GGlobal.COMMON, str);
        return url;
    };
    /**获取战斗力数字资源 */
    CommonManager.getPowerNumUrl = function (str) {
        var url = fairygui.UIPackage.getItemURL(GGlobal.NUM, "power" + str);
        return url;
    };
    /**获取货币对应的url*/
    CommonManager.getMoneyUrl = function (moneyType, itemID) {
        if (itemID === void 0) { itemID = 0; }
        var url = "";
        switch (moneyType) {
            case Enum_Attr.yuanBao:
                url = "ui://jvxpx9embwmw3y";
                break;
            case Enum_Attr.TONGBI:
                url = "ui://jvxpx9emltpm59";
                break;
            case Enum_Attr.PRESTIGE:
                url = "ui://jvxpx9emf50e9x";
                break;
            case Enum_Attr.ITEM:
                if (itemID == Model_Shop.itemID) {
                    url = "ui://1f2dgazv73mnh";
                }
                break;
            case Enum_Attr.BOSSJF:
                url = "ui://1f2dgazvoefgj";
                break;
        }
        return url;
    };
    CommonManager.parseChildren = function (source, target) {
        var children = source._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child._name in target && !(target[child._name] === undefined))
                continue;
            target[child._name] = child;
        }
        var controllers = source._controllers;
        for (var i = 0; i < controllers.length; i++) {
            var ctrl = controllers[i];
            if (ctrl.name in target && !(target[ctrl._name] === undefined))
                continue;
            target[ctrl.name] = ctrl;
        }
    };
    CommonManager.listPageChange = function (key, list, leftBtn, rightBtn, numPerPage, changeBackHandler) {
        if (changeBackHandler === void 0) { changeBackHandler = null; }
        var SELF = CommonManager;
        if (!SELF.lstPgChMap[key]) {
            var tempObj = SELF.lstPgChMap[key] = { leftBtn: leftBtn, rightBtn: rightBtn, list: list, numPerPage: numPerPage, changeBackHandler: changeBackHandler };
            leftBtn.addClickListener(SELF.onPageChange, tempObj);
            rightBtn.addClickListener(SELF.onPageChange, tempObj);
        }
    };
    CommonManager.onPageChange = function (evt) {
        var btn = evt.target;
        var info = this;
        var leftBtn = info.leftBtn;
        var righBtn = info.rightBtn;
        var changeBackHandler = info.changeBackHandler;
        var list = info.list;
        var numPerPage = info.numPerPage;
        var curpage = list.getFirstChildInView();
        switch (btn.id) {
            case leftBtn.id:
                if (curpage > 0) {
                    curpage = curpage - numPerPage;
                    if (curpage < 0)
                        curpage = 0;
                }
                break;
            case righBtn.id:
                if (curpage < list.numItems - 1) {
                    curpage = curpage + numPerPage;
                    if (curpage >= list.numItems - 1)
                        curpage = list.numItems - 1;
                }
                break;
        }
        if (list.numItems > 0) {
            list.scrollToView(curpage, true, true);
        }
        if (changeBackHandler) {
            changeBackHandler.runWith(curpage);
        }
    };
    CommonManager.lstPgChMap = {};
    return CommonManager;
}());
__reflect(CommonManager.prototype, "CommonManager");
