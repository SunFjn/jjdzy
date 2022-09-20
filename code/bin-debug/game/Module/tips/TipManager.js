var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TipManager = (function () {
    function TipManager() {
    }
    TipManager.update = function (info, type) {
        if (type === void 0) { type = 1; }
        if (!info)
            return;
        var _tip;
        switch (info.type) {
        }
        if (_tip != TipManager.view_tip)
            TipManager.hide();
        if (!_tip)
            return;
        TipManager.view_tip = _tip;
        _tip.show(info.data, type);
        if (TipManager.view_tip.parent == null)
            GGlobal.layerMgr.UI_Tips.addChild(TipManager.view_tip);
    };
    TipManager.hide = function () {
        if (TipManager.view_tip) {
            TipManager.view_tip.clear();
            TipManager.view_tip = null;
            TipManager.curTargetCode = null;
        }
    };
    /**
     * 设置控件的tip
     *  target 目标
     *  str {type:tip的类型, data:数据}
     *  type 点击类型
     */
    TipManager.bind = function (target, str, type) {
        if (type === void 0) { type = 1; }
        if (TipManager.targetDic[target.hashCode] == null) {
            target.addClickListener(TipManager.rollOver, target);
            App.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, TipManager.rollOut, target);
        }
        str.clickType = type;
        TipManager.targetDic[target.hashCode] = str;
        if (TipManager.curTargetCode == target.hashCode)
            TipManager.update(str, type);
    };
    TipManager.unBind = function (target) {
        if (!TipManager.targetDic[target.hashCode])
            return;
        target.removeClickListener(TipManager.rollOver, target);
        App.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, TipManager.rollOut, target);
        if (TipManager.curTargetCode == target.hashCode)
            TipManager.hide();
        delete TipManager.targetDic[target.hashCode];
    };
    TipManager.rollOver = function (e) {
        if (TipManager.curTargetCode == e.currentTarget.hashCode)
            return;
        e.stopPropagation();
        var obj = e.currentTarget;
        if (TipManager.targetDic[obj.hashCode]) {
            TipManager.update(TipManager.targetDic[obj.hashCode], TipManager.targetDic[obj.hashCode].clickType);
            TipManager.curTargetCode = obj.hashCode;
            if (TipManager.view_tip == null)
                return;
            var type = TipManager.targetDic[obj.hashCode].type;
            // if (false) {
            TipManager.view_tip.setXY((fairygui.GRoot.inst.width - TipManager.view_tip.width) / 2, (fairygui.GRoot.inst.height - TipManager.view_tip.height) / 2);
            // } else {
            // 	var point: egret.Point = obj.localToRoot(obj.x, obj.y);
            // 	TipManager.view_tip.x = (point.x + (obj.width - TipManager.view_tip.width) / 2 - obj.x);
            // 	if (TipManager.view_tip.x < 0)
            // 		TipManager.view_tip.x = 0;
            // 	if (TipManager.view_tip.x + TipManager.view_tip.width > fairygui.GRoot.inst.width) {
            // 		TipManager.view_tip.x = fairygui.GRoot.inst.width - TipManager.view_tip.width;
            // 	}
            // 	TipManager.view_tip.y = point.y - TipManager.view_tip.height - obj.y;
            // 	if (TipManager.view_tip.y < 0)
            // 		TipManager.view_tip.y = 0;
            // }
        }
    };
    TipManager.rollOut = function (e) {
        if (TipManager.view_tip) {
            var toBubble = e.target;
            while (toBubble && toBubble != App.stage) {
                if (toBubble == TipManager.view_tip) {
                    return;
                }
                else {
                    toBubble = toBubble.parent;
                }
            }
        }
        TipManager.hide();
    };
    TipManager.targetDic = {};
    return TipManager;
}());
__reflect(TipManager.prototype, "TipManager");
