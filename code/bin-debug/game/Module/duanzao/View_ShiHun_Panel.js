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
var View_ShiHun_Panel = (function (_super) {
    __extends(View_ShiHun_Panel, _super);
    function View_ShiHun_Panel() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    View_ShiHun_Panel.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("DuanZao", "View_ShiHun_Panel").asCom;
        s.contentPane = s.view;
        s.tunshiBt = (s.view.getChild("tunshiBt"));
        s.grid = (s.view.getChild("grid"));
        s.messageLb = (s.view.getChild("messageLb"));
        s.messageLb.leading = 11;
        s.desLb = (s.view.getChild("desLb"));
        s.attLb = (s.view.getChild("attLb"));
        s.promptLb = (s.view.getChild("promptLb"));
        s.keyBtn = (s.view.getChild("keyBtn"));
        s.upgroup = (s.view.getChild("upgroup"));
        _super.prototype.childrenCreated.call(this);
        s.tunshiBt.addClickListener(s.tunshiHandle, this);
        s.keyBtn.addClickListener(s.tunshiHandle, this);
    };
    View_ShiHun_Panel.prototype.tunshiHandle = function (event) {
        var s = this;
        switch (event.target.id) {
            case s.tunshiBt.id:
                if (s.tunshiBt.checkNotice) {
                    GGlobal.modelDuanZao.CG_DUANZAO_SHIHUN(s._args.id, 1);
                }
                else {
                    var cfg = Config.dzinsoul_209[s._args.id];
                    var itemArr = JSON.parse(cfg.consume);
                    var itemID = itemArr[0][1];
                    var num = Model_Bag.getItemCount(itemID);
                    if (num == 0) {
                        View_CaiLiao_GetPanel.show(VoItem.create(itemID));
                    }
                    else {
                        ViewCommonWarn.text("已达吞噬上限");
                    }
                }
                break;
            case s.keyBtn.id:
                if (s.keyBtn.checkNotice) {
                    GGlobal.modelDuanZao.CG_DUANZAO_SHIHUN(s._args.id, 2);
                }
                else {
                    var cfg = Config.dzinsoul_209[s._args.id];
                    var itemArr = JSON.parse(cfg.consume);
                    var itemID = itemArr[0][1];
                    var num = Model_Bag.getItemCount(itemID);
                    if (num == 0) {
                        View_CaiLiao_GetPanel.show(VoItem.create(itemID));
                    }
                    else {
                        ViewCommonWarn.text("已达吞噬上限");
                    }
                }
                break;
        }
    };
    View_ShiHun_Panel.prototype.updateShow = function () {
        var s = this;
        var cfg = Config.dzinsoul_209[s._args.id];
        var itemArr = JSON.parse(cfg.consume);
        var itemID = itemArr[0][1];
        s.itemVo = VoItem.create(itemID);
        s.grid.vo = s.itemVo;
        var num = Model_Bag.getItemCount(itemID);
        s.desLb.text = s.itemVo.cfg.miaoshu;
        var attArr = JSON.parse(cfg.attr);
        var attstr = "";
        for (var i = 0; i < attArr.length; i++) {
            if (i == 0) {
                attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1] * Model_DuanZao.drugArr[cfg.id - 1]);
            }
            else {
                attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1] * Model_DuanZao.drugArr[cfg.id - 1]);
            }
        }
        s.attLb.text = attstr;
        var index = 0;
        var index1 = 0;
        var index2 = 0;
        var arr = JSON.parse(cfg.num);
        var zhuHunMinLV = Model_DuanZao.getZhuHunLv();
        if (zhuHunMinLV < arr[0][0]) {
            index1 = arr[0][0];
            index = arr[0][1];
        }
        else {
            index2++;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][0] <= zhuHunMinLV) {
                    index = arr[i][1];
                }
                else {
                    index1 = arr[i][0];
                    index2 = arr[i][1];
                    break;
                }
            }
        }
        s.messageLb.setVar("name", "[color=" + Color.getColorStr(s.itemVo.quality) + "]" + s.itemVo.name + "[/color]").setVar("count ", Model_DuanZao.drugArr[cfg.id - 1] + "").setVar("max", index + "").setVar("num", num + "").flushVars();
        if (Model_DuanZao.drugArr[s._args.id - 1] >= index || index2 == 0) {
            if (index1 != 0) {
                s.promptLb.visible = true;
                if (index2 == 0) {
                    s.promptLb.text = "全身铸魂" + index1 + "阶开启";
                }
                else {
                    s.promptLb.text = "全身铸魂" + index1 + "阶可提升吞噬上限" + (index2 - index) + "颗";
                }
            }
            else {
                s.promptLb.visible = false;
            }
            s.tunshiBt.visible = s.keyBtn.visible = false;
        }
        else {
            s.promptLb.visible = false;
            s.tunshiBt.visible = s.keyBtn.visible = true;
            s.keyBtn.checkNotice = s.tunshiBt.checkNotice = num > 0;
        }
        s.upgroup.y = s.attLb.y + s.attLb.height + 20;
    };
    View_ShiHun_Panel.prototype.onShown = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, this);
        s.updateShow();
    };
    View_ShiHun_Panel.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.DUANZAO_ZHUHUN_SHIHUN);
        GGlobal.control.remove(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, this);
    };
    View_ShiHun_Panel.URL = "ui://pofv8989tlm32d";
    return View_ShiHun_Panel;
}(UIModalPanel));
__reflect(View_ShiHun_Panel.prototype, "View_ShiHun_Panel");
