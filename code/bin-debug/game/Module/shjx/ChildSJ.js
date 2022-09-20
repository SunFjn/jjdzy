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
var ChildSJ = (function (_super) {
    __extends(ChildSJ, _super);
    function ChildSJ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tabArr = [];
        return _this;
    }
    ChildSJ.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "ChildSJ"));
    };
    ChildSJ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        CommonManager.parseChildren(sf, sf);
    };
    ChildSJ.prototype.initView = function (pParent) {
    };
    ChildSJ.prototype.openPanel = function (pData) {
        var sf = this;
        IconUtil.setImg(sf.bg, "resource/image/shouling/slBG.png");
        GGlobal.modelsl.CG_OPEN_SHOULING();
        sf.onSel(pData);
        GGlobal.modelSHJX.listen(ModelSH.msg_ui, sf.onUpdate, sf);
        GGlobal.modelSHJX.listen(ModelSH.msg_itemSel, sf.onSel, sf);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, sf.onBagUpdate, sf);
        GGlobal.control.listen(Enum_MsgType.SHOULING_DATA_UPDATE, sf.onUpdate, sf);
        sf.upBt.addClickListener(sf.upHandle, sf);
    };
    ChildSJ.prototype.closePanel = function () {
        var sf = this;
        IconUtil.setImg(sf.bg, null);
        GGlobal.modelSHJX.remove(ModelSH.msg_ui, sf.onUpdate, sf);
        GGlobal.modelSHJX.remove(ModelSH.msg_itemSel, sf.onSel, sf);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, sf.onBagUpdate, sf);
        GGlobal.control.remove(Enum_MsgType.SHOULING_DATA_UPDATE, sf.onUpdate, sf);
        sf.upBt.removeClickListener(sf.upHandle, sf);
        IconUtil.setImg(sf.typeImg, null);
    };
    ChildSJ.prototype.upHandle = function () {
        var a = this;
        if (a.upBt.checkNotice) {
            GGlobal.modelsl.CG_UPGRADE_SHOULING(Model_ShouLing.slArr[a._data.yj - 1]);
        }
        else {
            var cfg = Config.shoulin_704[Model_ShouLing.slArr[a._data.yj - 1]];
            var costArr = JSON.parse(cfg.consume);
            var itemVo = VoItem.create(costArr[0][1]);
            View_CaiLiao_GetPanel.show(itemVo);
        }
    };
    ChildSJ.prototype.onUpdate = function () {
        var a = this;
        if (!a._data) {
            return;
        }
        var cfg = Config.shoulin_704[Model_ShouLing.slArr[a._data.yj - 1]];
        IconUtil.setImg(a.typeImg, "resource/image/shouling/" + a._data.yj + ".png");
        var nextcfg;
        var attArr0;
        var attArr1;
        var attstr0 = "";
        var attstr1 = "";
        a.powerLb.text = cfg.fight + "";
        nextcfg = Config.shoulin_704[cfg.next];
        a.attgroup.visible = false;
        a.upBtGroup.visible = true;
        a.attLb.visible = false;
        a.maxGroup.visible = false;
        a.typeIcon.url = ModelSH.icNameUrls[a._data.yj - 1];
        if (cfg.lv != 0) {
            attArr0 = JSON.parse(cfg.attr);
            a.levelLb.text = cfg.lv + "\n级";
            if (cfg.next > 0) {
                attArr1 = JSON.parse(nextcfg.attr);
                for (var i = 0; i < attArr0.length; i++) {
                    if (i == 0) {
                        attstr0 += Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
                        attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                    else {
                        attstr0 += "\n" + Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
                        attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                    }
                }
                a.curAttLb.text = attstr0;
                a.nextAttLb.text = attstr1;
                a.attgroup.visible = true;
                a.updateCost();
            }
            else {
                for (var i = 0; i < attArr0.length; i++) {
                    if (i == 0) {
                        attstr0 += Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
                    }
                    else {
                        attstr0 += "\n" + Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
                    }
                }
                a.attLb.text = ConfigHelp.attrString(attArr0, "+", Color.getColorStr(1), Color.getColorStr(2));
                a.attLb.visible = true;
                a.maxGroup.visible = true;
                a.upBtGroup.visible = false;
            }
        }
        else {
            a.levelLb.text = "0\n级";
            attArr1 = JSON.parse(nextcfg.attr);
            for (var i = 0; i < attArr1.length; i++) {
                if (i == 0) {
                    attstr0 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                }
                else {
                    attstr0 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
                }
            }
            a.attLb.text = attstr0;
            a.attLb.visible = true;
            a.updateCost();
        }
    };
    ChildSJ.prototype.updateCost = function () {
        var a = this;
        var cfg = Config.shoulin_704[Model_ShouLing.slArr[a._data.yj - 1]];
        var costArr = JSON.parse(cfg.consume);
        var count = Model_Bag.getItemCount(costArr[0][1]);
        var itemVo = VoItem.create(costArr[0][1]);
        if (cfg.next > 0) {
            a.upBt.checkNotice = count >= costArr[0][2];
            a.costItem.setLb(count, costArr[0][2]);
            a.costItem.setImgUrl(itemVo.icon);
        }
        else {
            a.upBt.checkNotice = false;
        }
        a.upBt.text = cfg.lv > 0 ? "升级" : "激活";
    };
    ChildSJ.prototype.onSel = function (data) {
        var sf = this;
        sf._data = data;
        sf.onUpdate();
    };
    ChildSJ.prototype.onBagUpdate = function (items) {
        var sf = this;
        if (items && items[UIConst.SHOULING]) {
            sf.onUpdate();
        }
    };
    ChildSJ.URL = "ui://4aepcdbw811a3";
    return ChildSJ;
}(fairygui.GComponent));
__reflect(ChildSJ.prototype, "ChildSJ", ["IPanel"]);
