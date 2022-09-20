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
 * 成就树面板
 * @author: lujiahao
 * @date: 2019-11-20 17:22:19
 */
var ChildCJS = (function (_super) {
    __extends(ChildCJS, _super);
    function ChildCJS() {
        var _this = _super.call(this) || this;
        _this._curLayer = 1;
        _this._iconItemList = [];
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildCJS.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildCJS.URL, ChildCJS);
        f(CJSIconItem.URL, CJSIconItem);
        // f(ViewTaskCJS.URL, ViewTaskCJS);
        f(CJSTaskItem.URL, CJSTaskItem);
        // f(ViewRewardCJS.URL, ViewRewardCJS);
        f(CJSRewardItem.URL, CJSRewardItem);
    };
    ChildCJS.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCJS", "ChildCJS"));
    };
    ChildCJS.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        for (var i = 0; i < 12; i++) {
            var t_iconItem = t.getChild("iconItem" + i);
            t._iconItemList.push(t_iconItem);
        }
    };
    ChildCJS.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildCJS.prototype.openPanel = function (pData) {
        var t = this;
        var t_model = GGlobal.modelCJS;
        t.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_CJS);
        t_model.CG_AchievementTree_openFloorUI_10571();
        t.tfDate.text = "";
        t._curActVo = pData;
        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        t.refreshDataByLayer(t_model.curLayer);
        IconUtil.setImg(t.bgLoader, Enum_Path.BACK_URL + "cjs_bg.jpg");
    };
    ChildCJS.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        IconUtil.setImg(t.bgLoader, null);
        Timer.instance.remove(t.onDateUpdate, t);
    };
    ChildCJS.prototype.dispose = function () {
        var t = this;
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildCJS.prototype.refreshDataByLayer = function (pLayer) {
        var t = this;
        var t_model = GGlobal.modelCJS;
        t._curLayer = pLayer;
        if (t._curActVo) {
            var t_taskList = t_model.getTaskVoListByQsAndLayer(t._curActVo.qs, pLayer);
            var t_completeCount = 0;
            var t_maxCount = 0;
            if (t_taskList) {
                for (var i = 0; i < t._iconItemList.length; i++) {
                    var t_item = t._iconItemList[i];
                    var t_vo = t_taskList[i];
                    t_item.setData(t_vo);
                }
                t_maxCount = t_taskList.length;
                for (var _i = 0, t_taskList_1 = t_taskList; _i < t_taskList_1.length; _i++) {
                    var v = t_taskList_1[_i];
                    if (v.state == 1)
                        t_completeCount++;
                }
            }
            t.btnLast.visible = pLayer > 1;
            var t_maxLayer = t_model.getMaxLayerByQs(t._curActVo.qs);
            t.btnNext.visible = pLayer < t_maxLayer && pLayer < t_model.curLayer + 1;
            var t_strLayer = ConfigHelp.NumberToChinese(t._curLayer);
            t.tfLayer.text = "\u7B2C" + t_strLayer + "\u5C42";
        }
        else {
        }
    };
    /** 刷新时间 */
    ChildCJS.prototype.onDateUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
            var t_remainS = t_end - servTime;
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //小于24小时
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
                }
                else {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
                }
            }
            else {
                t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
            }
        }
        this.tfDate.text = t_dateStr;
    };
    ChildCJS.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.CJS_UPDATE, t.onUpdate, t);
        EventUtil.register(pFlag, t.btnLast, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnNext, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnTarget, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        if (pFlag) {
            ReddotMgr.ins().register(UIConst.ACTCOM_CJS + "|" + 1, t.btnReward.noticeImg);
        }
        else {
            ReddotMgr.ins().unregister(t.btnReward.noticeImg);
        }
    };
    //======================================== handler =========================================
    ChildCJS.prototype.onUpdate = function () {
        var t = this;
        var t_model = GGlobal.modelCJS;
        t.refreshDataByLayer(t_model.curLayer);
    };
    ChildCJS.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelCJS;
        if (!t._curActVo)
            return;
        switch (e.currentTarget) {
            case t.btnLast:
                {
                    var t_layer = t._curLayer - 1;
                    t_layer = t_layer < 1 ? 1 : t_layer;
                    if (t_layer == t._curLayer)
                        return;
                    t.refreshDataByLayer(t_layer);
                }
                break;
            case t.btnNext:
                {
                    var t_layer = t._curLayer + 1;
                    var t_maxLayer = t_model.getMaxLayerByQs(t._curActVo.qs);
                    t_layer = t_layer > t_maxLayer ? t_maxLayer : t_layer;
                    if (t_layer == t._curLayer)
                        return;
                    t.refreshDataByLayer(t_layer);
                }
                break;
            case t.btnReward:
                GGlobal.layerMgr.open(UIConst.ACTCOM_CJS_REWARD);
                break;
            case t.btnTarget:
                GGlobal.layerMgr.open(UIConst.ACTCOM_CJS_TASK, { layer: t._curLayer });
                break;
        }
    };
    //>>>>end
    ChildCJS.URL = "ui://ehocr0vupwnz1";
    /** 设置包名（静态属性） */
    ChildCJS.pkg = "actCJS";
    return ChildCJS;
}(fairygui.GComponent));
__reflect(ChildCJS.prototype, "ChildCJS", ["IPanel"]);
