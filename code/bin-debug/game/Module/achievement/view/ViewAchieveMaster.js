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
 * @author: lujiahao
 * @date: 2019-11-08 16:03:21
 */
var ViewAchieveMaster = (function (_super) {
    __extends(ViewAchieveMaster, _super);
    function ViewAchieveMaster() {
        var _this = _super.call(this) || this;
        _this._dataList = [];
        _this._isShowed = false;
        _this.loadRes("rebirth", "rebirth_atlas0");
        return _this;
    }
    ViewAchieveMaster.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "ViewAchieveMaster"));
    };
    ViewAchieveMaster.prototype.childrenCreated = function () {
        GGlobal.createPack("rebirth");
        this.view = fairygui.UIPackage.createObject("rebirth", "ViewAchieveMaster").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewAchieveMaster.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.foldInvisibleItems = true;
    };
    //=========================================== API ==========================================
    ViewAchieveMaster.prototype.onShown = function () {
        var t = this;
        t._isShowed = true;
        t.registerEvent(true);
        t.refreshData();
    };
    ViewAchieveMaster.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t._isShowed = false;
        t.list.numItems = 0;
    };
    ViewAchieveMaster.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewAchieveMaster.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewAchieveMaster.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelAchievement;
        t._curData = t_model.curMasterVo;
        if (t._curData) {
            //已激活
            if (t_model.nextMasterVo) {
                t.btnUp.title = "升阶";
            }
            else {
                t.btnUp.title = "已满阶";
            }
            t.powerCom.title = t._curData.cfg.zl + "";
            t.tfName.text = "\u6210\u5C31\u5927\u5E08" + t._curData.id + "\u9636";
        }
        else {
            //尚未激活
            t.powerCom.title = 0 + "";
            t.btnUp.title = "激活";
            t.tfName.text = "\u6210\u5C31\u5927\u5E080\u9636";
        }
        if (t_model.checkMasterCanUp(false)) {
            t.btnUp.grayed = false;
            t.btnUp.noticeImg.visible = true;
        }
        else {
            t.btnUp.grayed = true;
            t.btnUp.noticeImg.visible = false;
        }
        t._dataList.length = 0;
        {
            var t_vo = t_model.curMasterVo;
            if (t_vo)
                t._dataList.push(t_vo);
        }
        {
            var t_vo = t_model.nextMasterVo;
            if (t_vo)
                t._dataList.push(t_vo);
        }
        t.list.numItems = t._dataList.length;
        // t.list.ensureBoundsCorrect();
        // t.list.ensureSizeCorrect();
        // t.list.resizeToFit();
        egret.setTimeout(function () {
            if (t._isShowed) {
                t.list.ensureBoundsCorrect();
                t.list.ensureSizeCorrect();
                t.list.resizeToFit();
            }
        }, t, 100);
    };
    ViewAchieveMaster.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.ACHIEVEMENT_UPDATE, t.onUpdate, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewAchieveMaster.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ViewAchieveMaster.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                GGlobal.modelAchievement.CG_Achievement_upAchievement_10329();
                break;
        }
    };
    //>>>>end
    ViewAchieveMaster.URL = "ui://dllc71i9g7h328";
    return ViewAchieveMaster;
}(UIModalPanel));
__reflect(ViewAchieveMaster.prototype, "ViewAchieveMaster");
