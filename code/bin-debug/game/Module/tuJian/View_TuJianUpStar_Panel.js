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
var View_TuJianUpStar_Panel = (function (_super) {
    __extends(View_TuJianUpStar_Panel, _super);
    function View_TuJianUpStar_Panel() {
        var _this = _super.call(this) || this;
        _this.STARMAX = 5;
        _this.childrenCreated();
        return _this;
    }
    View_TuJianUpStar_Panel.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("TuJian", "View_TuJianUpStar_Panel").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandler;
        s.list.foldInvisibleItems = true;
        _super.prototype.childrenCreated.call(this);
        s.upBt.addClickListener(s.upHandle, s);
        Model_TuJian.tuJianStarArr();
    };
    View_TuJianUpStar_Panel.prototype.renderHandler = function (index, obj) {
        var cfg = Model_TuJian.starObj[this.vo.ID][index];
        obj.updateShow(this.vo, cfg);
        obj.visible = cfg.describe != "0";
    };
    View_TuJianUpStar_Panel.prototype.upHandle = function () {
        var s = this;
        if (s.upBt.checkNotice) {
            GGlobal.modelTuJian.CG_TUJIAN_UPSTAR(s.vo.ID);
        }
        else {
            if (s.vo.next_star <= 0) {
                ViewCommonWarn.text("已达升星上限");
            }
            else {
                var itemVo = VoItem.create(s.vo.consume_star[0][1]);
                itemVo.count = s.vo.consume_star[0][2];
                View_CaiLiao_GetPanel.show(itemVo);
            }
        }
    };
    View_TuJianUpStar_Panel.prototype.updateShow = function () {
        var s = this;
        s.vo = s._args;
        if (!s.vo)
            return;
        s.powerLb.text = s.vo.power1 + "";
        var starstr = "";
        var starNum = Math.floor(s.vo.starLv / s.STARMAX);
        var starNum1 = s.vo.starLv % s.STARMAX;
        for (var i = 0; i < s.STARMAX; i++) {
            if (i < starNum1) {
                starstr += "" + (starNum + 1);
            }
            else {
                starstr += "" + starNum;
            }
        }
        s.starLb.text = starstr;
        s.levelLb.text = "等级上限增加至" + s.vo.levelMax;
        s.list.numItems = Model_TuJian.starObj[s.vo.ID].length;
        if (s.vo.next_star > 0) {
            var num = Model_Bag.getItemCount(s.vo.consume_star[0][1]);
            var itemVo = VoItem.create(s.vo.consume_star[0][1]);
            itemVo.count = s.vo.consume_star[0][2];
            s.grid.vo = itemVo;
            var color = num >= itemVo.count ? 2 : 6;
            s.grid.showText = HtmlUtil.fontNoSize(num + "/" + itemVo.count, Color.getColorStr(color));
            s.upBt.checkNotice = num >= itemVo.count;
            s.upstarGroup.visible = true;
            s.maxGroup.visible = false;
        }
        else {
            s.upBt.checkNotice = false;
            s.upstarGroup.visible = false;
            s.maxGroup.visible = true;
        }
    };
    View_TuJianUpStar_Panel.prototype.onShown = function () {
        var s = this;
        s.updateShow();
        GGlobal.control.listen(Enum_MsgType.TUJIAN_DATA_UPDATE, s.updateShow, s);
    };
    View_TuJianUpStar_Panel.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.TUJIAN_UPSTAR);
        GGlobal.control.remove(Enum_MsgType.TUJIAN_DATA_UPDATE, s.updateShow, s);
        s.list.numItems = 0;
    };
    View_TuJianUpStar_Panel.prototype.resetPosition = function () {
        var s = this;
        s.setXY((fairygui.GRoot.inst.width - s.width) / 2, (fairygui.GRoot.inst.height - s.height) / 2);
    };
    View_TuJianUpStar_Panel.URL = "ui://m0rbmsgsrkgc2k";
    return View_TuJianUpStar_Panel;
}(UIModalPanel));
__reflect(View_TuJianUpStar_Panel.prototype, "View_TuJianUpStar_Panel");
