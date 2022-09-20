var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AnimationUtil = (function () {
    function AnimationUtil() {
    }
    /**
     * grids 格子
     * t 时间
    */
    AnimationUtil.gridToBag = function (grids, pVoList, t, pShowBg, ease) {
        if (pVoList === void 0) { pVoList = null; }
        if (t === void 0) { t = 1000; }
        if (pShowBg === void 0) { pShowBg = true; }
        if (ease === void 0) { ease = egret.Ease.backIn; }
        var len = grids.length;
        var retPos = ViewMainBottomUI.instance.getBagRootPos();
        for (var i = 0; i < len; i++) {
            var g = ViewGrid.create();
            g.bg.visible = pShowBg;
            var source = grids[i];
            if (source instanceof ViewGrid) {
                g.vo = source.vo;
            }
            else {
                if (pVoList) {
                    g.vo = pVoList[i];
                }
                else
                    continue;
            }
            var startPos = source.localToRoot();
            g.setXY(startPos.x, startPos.y);
            GGlobal.layerMgr.UI_Message.addChild(g);
            egret.Tween.get(g).to({ x: retPos.x, y: retPos.y }, t, ease).call(this.clearGrid, this, [g]);
            ;
        }
    };
    AnimationUtil.clearGrid = function (g) {
        if (g && g.parent) {
            g.removeFromParent();
            g.disposePanel();
        }
    };
    /**
     * grids 格子
     * t 时间
    */
    AnimationUtil.grid2ToBag = function (grids, t, ease) {
        if (t === void 0) { t = 1500; }
        if (ease === void 0) { ease = egret.Ease.backIn; }
        var len = grids.length;
        var retPos = ViewMainBottomUI.instance.getBagRootPos();
        var ax = GGlobal;
        for (var i = 0; i < len; i++) {
            var g = ViewGrid2.create();
            var source = grids[i];
            g.vo = source.vo;
            var startPos = source.localToRoot();
            g.setXY(startPos.x - GGlobal.layerMgr.offx, startPos.y);
            GGlobal.layerMgr.UI_Message.addChild(g);
            egret.Tween.get(g).to({ x: retPos.x - GGlobal.layerMgr.offx, y: retPos.y }, t, ease).call(this.clearGrid2, this, [g]);
            ;
        }
    };
    AnimationUtil.clearGrid2 = function (g) {
        if (g && g.parent) {
            g.disposeGrid();
        }
    };
    return AnimationUtil;
}());
__reflect(AnimationUtil.prototype, "AnimationUtil");
