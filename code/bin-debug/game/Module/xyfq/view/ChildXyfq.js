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
 * @date: 2020-04-07 16:14:13
 */
var ChildXyfq = (function (_super) {
    __extends(ChildXyfq, _super);
    function ChildXyfq() {
        var _this = _super.call(this) || this;
        _this._qianItemList = [];
        _this._loaderQianPool = [];
        _this._flyMap = {};
        _this._waiteList = [];
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildXyfq.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildXyfq.URL, ChildXyfq);
        f(QianItem.URL, QianItem);
        // f(ViewQianUse.URL, ViewQianUse);
        // f(ViewRankXyfq.URL, ViewRankXyfq);
        f(XyfqItemRank.URL, XyfqItemRank);
        // f(ViewTaskXyfq.URL, ViewTaskXyfq);
        f(XyfqItemTask.URL, XyfqItemTask);
        // f(ViewRewardXyfq.URL, ViewRewardXyfq);
        f(XyfqRewardItem.URL, XyfqRewardItem);
        // f(ViewCompoundXyfq.URL, ViewCompoundXyfq);
        f(QianItemGrid.URL, QianItemGrid);
        f(XyfqCompItem.URL, XyfqCompItem);
    };
    ChildXyfq.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "ChildXyfq"));
    };
    ChildXyfq.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.mc = t.getTransition("mc");
        var t_model = GGlobal.modelXyfq;
        t_model.setup();
        for (var i = 0; i < 5; i++) {
            var t_item = t.getChild("item" + i);
            if (t_item)
                t._qianItemList.push(t_item);
        }
    };
    ChildXyfq.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildXyfq.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.XYFQ);
        t.tfDate.text = "";
        t._curActVo = pData;
        t.refreshData();
        IconUtil.setImg(t.loaderBg, Enum_Path.BACK_URL + "xyfq_bg.jpg");
    };
    ChildXyfq.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        t.cleanQainList();
        SimpleTimer.ins().removeTimer(t.startFly, t);
        t.playQianFly(false);
        t._waiteList.length = 0; //清空动画抽签数据列表
        IconUtil.setImg(t.loaderBg, null);
        Timer.instance.remove(t.onDateUpdate, t);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildXyfq.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        if (t._curActVo) {
            if (!Timer.instance.has(t.onDateUpdate, t))
                Timer.instance.listen(t.onDateUpdate, t);
            t.btnCheck.selected = !t_model.isPlayMc;
            t.refreshQianList();
            t.refreshConsume();
        }
        else {
        }
    };
    /** 刷新签数据 */
    ChildXyfq.prototype.refreshQianList = function () {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        var t_dataList = t_model.getQianVoList();
        for (var i = 0; i < t._qianItemList.length; i++) {
            var t_item = t._qianItemList[i];
            t_item.setData(t_dataList[i]);
        }
    };
    ChildXyfq.prototype.cleanQainList = function () {
        var t = this;
        for (var _i = 0, _a = t._qianItemList; _i < _a.length; _i++) {
            var v = _a[_i];
            v.clean();
        }
    };
    ChildXyfq.prototype.refreshConsume = function () {
        var t = this;
        if (!t._curActVo)
            return;
        var t_model = GGlobal.modelXyfq;
        {
            t.resComOne.setItemId(t_model.consumeOne.id);
            var t_bagCount = FastAPI.getItemCount(t_model.consumeOne.id);
            var t_need = t_model.consumeOne.count;
            var t_color = Color.GREENSTR;
            if (t_need > t_bagCount)
                t_color = Color.REDSTR;
            t.resComOne.setCount(HtmlUtil.font(t_need + "", t_color));
        }
        {
            t.resComTen.setItemId(t_model.consumeTen.id);
            var t_bagCount = FastAPI.getItemCount(t_model.consumeTen.id);
            var t_need = t_model.consumeTen.count;
            var t_color = Color.GREENSTR;
            if (t_need > t_bagCount)
                t_color = Color.REDSTR;
            t.resComTen.setCount(HtmlUtil.font(t_need + "", t_color));
        }
    };
    ChildXyfq.prototype.playMc = function (pFlag) {
        var t = this;
        if (pFlag) {
            t.mc.play(t.onMcComplete, t, null, 2);
        }
        else {
            t.mc.stop();
        }
    };
    ChildXyfq.prototype.onMcComplete = function () {
        var t = this;
        //播放逐个签loader飞到下面的动画
        t.playQianFly(true);
    };
    ChildXyfq.prototype.playQianFly = function (pFlag) {
        var t = this;
        if (pFlag) {
            if (!SimpleTimer.ins().isRunning(t.startFly, t))
                SimpleTimer.ins().addTimer(t.startFly, t, 100, 0, null, true);
        }
        else {
            SimpleTimer.ins().removeTimer(t.startFly, t);
            t._waiteList.length = 0;
            for (var k in t._flyMap) {
                var t_loader = t._flyMap[k];
                egret.Tween.removeTweens(t_loader);
                t.recycleLoader(t_loader);
            }
        }
    };
    ChildXyfq.prototype.startFly = function () {
        var t = this;
        if (t._waiteList.length < 1)
            SimpleTimer.ins().removeTimer(t.startFly, t);
        var t_id = t._waiteList.shift();
        if (t_id) {
            var t_loader_1 = t.getLoaderFromPool();
            // t_loader.setXY(0, t.tempQian.y);
            // t_loader.setPivot(0.45, 0.5, true);
            t_loader_1.setXY(t.tempQian.x - 30, t.tempQian.y + 40);
            var t_posId = t_id % 10;
            t_loader_1.url = CommonManager.getUrl("xyfq", "qian_" + t_posId);
            var t_targetItem_1 = t.getTargetItemById(t_id);
            t_targetItem_1.parent.addChild(t_loader_1);
            t._flyMap[t_loader_1.hashCode] = t_loader_1;
            egret.Tween.removeTweens(t_loader_1);
            var tw = egret.Tween.get(t_loader_1);
            tw.to({ y: t_loader_1.y - 100 }, 100)
                .to({ x: t_targetItem_1.x - 60, y: t_targetItem_1.y - 30 }, 500).call(function () {
                t_targetItem_1.addCount(1);
                t.recycleLoader(t_loader_1);
            }, t);
        }
    };
    ChildXyfq.prototype.getTargetItemById = function (pId) {
        var t = this;
        var t_posId = pId % 10;
        return t._qianItemList[t._qianItemList.length - t_posId];
    };
    ChildXyfq.prototype.getLoaderFromPool = function () {
        var t = this;
        var t_loader = t._loaderQianPool.pop();
        if (!t_loader) {
            t_loader = new fairygui.GLoader();
            t_loader.rotation = t.tempQian.rotation;
            t_loader.touchable = false;
        }
        return t_loader;
    };
    ChildXyfq.prototype.recycleLoader = function (pLoader) {
        var t = this;
        delete t._flyMap[pLoader.hashCode];
        pLoader.removeFromParent();
        pLoader.url = null;
        t._loaderQianPool.push(pLoader);
    };
    /** 刷新时间 */
    ChildXyfq.prototype.onDateUpdate = function () {
        var t = this;
        var t_dateStr = "";
        if (t._curActVo) {
            var t_end = t._curActVo.end; //s
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
        t.tfDate.text = t_dateStr;
    };
    ChildXyfq.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_DRAW_SUCCESS, t.onDrawSuccess, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        EventUtil.register(pFlag, t.btnHC, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnHelp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnTarget, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRank, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnOne, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnTen, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        for (var _i = 0, _a = t._qianItemList; _i < _a.length; _i++) {
            var v = _a[_i];
            EventUtil.register(pFlag, v, egret.TouchEvent.TOUCH_TAP, t.onQianItemClick, t);
        }
        if (pFlag) {
            ReddotMgr.ins().register(ReddotEnum.VALUE_XYFQ_CAN_COMP, t.btnHC.noticeImg);
            ReddotMgr.ins().register(ReddotEnum.GROUP_XYFQ_TASK, t.btnTarget.noticeImg);
        }
        else {
            ReddotMgr.ins().unregister(t.btnHC.noticeImg);
            ReddotMgr.ins().unregister(t.btnTarget.noticeImg);
        }
    };
    //======================================== handler =========================================
    ChildXyfq.prototype.onBagUpdate = function () {
        var t = this;
        t.refreshConsume();
    };
    ChildXyfq.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    /** 抽签成功处理 */
    ChildXyfq.prototype.onDrawSuccess = function (pDataList) {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        t.refreshConsume(); //先刷新消耗显示
        if (pDataList) {
            for (var _i = 0, pDataList_1 = pDataList; _i < pDataList_1.length; _i++) {
                var v = pDataList_1[_i];
                var t_id = v[0];
                var t_count = v[1];
                for (var i = 0; i < t_count; i++) {
                    t._waiteList.push(t_id);
                }
            }
        }
        if (t_model.isPlayMc) {
            //播放抽签成功动画
            t.playMc(true);
        }
        else {
            t.playQianFly(true);
        }
    };
    ChildXyfq.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        switch (e.currentTarget) {
            case t.btnHelp:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.XYFQ);
                break;
            case t.btnHC:
                t.playQianFly(false);
                t.refreshQianList(); //开启标签停止动画，强制刷新签数量
                GGlobal.layerMgr.open(UIConst.XYFQ_COMPOUND);
                break;
            case t.btnTarget:
                GGlobal.layerMgr.open(UIConst.XYFQ_TASK);
                break;
            case t.btnReward:
                GGlobal.layerMgr.open(UIConst.XYFQ_REWARD);
                break;
            case t.btnRank:
                GGlobal.layerMgr.open(UIConst.XYFQ_RANK);
                break;
            case t.btnOne:
                t_model.CG_LuckSign_draw_12151(1);
                // t.playMc(true);
                // t.onDrawSuccess(
                //     [
                //         [448001, 2],
                //         [448002, 4],
                //         [448003, 1],
                //         [448004, 3],
                //         [448005, 5],
                //     ]);
                break;
            case t.btnTen:
                t_model.CG_LuckSign_draw_12151(2);
                // t.playMc(false);
                // t.playQianFly(false);
                break;
            case t.btnCheck:
                t_model.isPlayMc = !t.btnCheck.selected;
                break;
        }
    };
    ChildXyfq.prototype.onQianItemClick = function (e) {
        var t = this;
        var t_item = e.currentTarget;
        if (t_item && t_item.curData) {
            t.playQianFly(false);
            t.refreshQianList(); //开启标签停止动画，强制刷新签数量
            GGlobal.layerMgr.open(UIConst.XYFQ_QIAN_USE, t_item.curData);
        }
    };
    //>>>>end
    ChildXyfq.URL = "ui://7hwmix0gbnyp0";
    /** 设置包名（静态属性） */
    ChildXyfq.pkg = "xyfq";
    return ChildXyfq;
}(fairygui.GComponent));
__reflect(ChildXyfq.prototype, "ChildXyfq", ["IPanel"]);
