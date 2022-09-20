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
var Child_DuanZao_Streng = (function (_super) {
    __extends(Child_DuanZao_Streng, _super);
    function Child_DuanZao_Streng() {
        return _super.call(this) || this;
    }
    Child_DuanZao_Streng.createInstance = function () {
        return (fairygui.UIPackage.createObject("DuanZao", "Child_DuanZao_Streng"));
    };
    Child_DuanZao_Streng.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_DuanZao_Streng.prototype.openPanel = function (pData) {
        this.setVo(pData);
        this.grid.gridSource = ViewGrid.ROLE;
    };
    Child_DuanZao_Streng.prototype.closePanel = function (pData) {
        this.clean();
    };
    Child_DuanZao_Streng.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.grid.isShowEff = true;
        a.keyStrengBt.addClickListener(a.strengHandle, a);
        a.suitBt.addClickListener(a.suitHandle, a);
    };
    Child_DuanZao_Streng.prototype.suitHandle = function () {
        GGlobal.layerMgr.open(UIConst.DUANZAO_STRENG_SUIT);
    };
    Child_DuanZao_Streng.prototype.strengHandle = function (event) {
        var a = this;
        if (!a.vo) {
            ViewCommonWarn.text("没有装备不能强化");
            return;
        }
        var cfg = Config.dzqianghua_209[a.vo.qh];
        if (a.keyStrengBt.checkNotice) {
            GGlobal.modelDuanZao.CG_DUANZAO_KEYSTRENG();
        }
        else {
            if (cfg.consume == "0") {
                ViewCommonWarn.text("已满级");
            }
            else {
                var gridArr = JSON.parse(cfg.consume);
                var gridNum = Model_Bag.getItemCount(gridArr[1][1]);
                var itemVo = VoItem.create(gridArr[1][1]);
                if (gridNum < gridArr[1][2]) {
                    View_CaiLiao_GetPanel.show(itemVo);
                }
                else {
                    ViewCommonWarn.text("铜币不足");
                }
            }
        }
    };
    Child_DuanZao_Streng.prototype.setVo = function (vo) {
        var a = this;
        a.vo = vo;
        if (vo) {
            a.grid.vo = vo;
            a.grid.tipEnabled = true;
            var cfg = Config.dzqianghua_209[vo.qh];
            var arr = JSON.parse(cfg["attr" + vo.type]);
            a.suitLb.text = Model_DuanZao.suitArr[0] + "阶";
            a.nameLb.text = Model_Equip.getPartName(vo.type);
            a.nameTitle.text = Model_Equip.getPartName(vo.type);
            var nextcfg = Config.dzqianghua_209[vo.qh + 1];
            var attstr0 = "";
            var attstr1 = "";
            if (nextcfg) {
                var arr1 = JSON.parse(nextcfg["attr" + vo.type]);
                for (var i = 0; i < arr.length; i++) {
                    if (i == 0) {
                        attstr0 += Vo_attr.getShowStr(arr[i][0], arr[i][1]);
                        attstr1 += Vo_attr.getShowStr(arr1[i][0], arr1[i][1]);
                    }
                    else {
                        attstr0 += "\n" + Vo_attr.getShowStr(arr[i][0], arr[i][1]);
                        attstr1 += "\n" + Vo_attr.getShowStr(arr1[i][0], arr1[i][1]);
                    }
                }
                var gridArr = JSON.parse(cfg.consume);
                var gridNum = Model_Bag.getItemCount(gridArr[1][1]);
                var costVo = VoItem.create(gridArr[1][1]);
                a.costLb0.setImgUrl("3");
                if (Model_player.voMine.tongbi >= gridArr[0][2]) {
                    a.costLb0.setCount(HtmlUtil.fontNoSize(gridArr[0][2] + "", Color.getColorStr(1)));
                }
                else {
                    a.costLb0.setCount(HtmlUtil.fontNoSize(gridArr[0][2] + "", Color.getColorStr(6)));
                }
                a.costLb1.setImgUrl(costVo.icon);
                if (gridNum >= gridArr[1][2]) {
                    a.costLb1.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(gridNum) + "/" + gridArr[1][2], Color.getColorStr(1)));
                }
                else {
                    a.costLb1.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(gridNum) + "/" + gridArr[1][2], Color.getColorStr(6)));
                }
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    if (i == 0) {
                        attstr0 += Vo_attr.getShowStr(arr[i][0], arr[i][1]);
                    }
                    else {
                        attstr0 += "\n" + Vo_attr.getShowStr(arr[i][0], arr[i][1]);
                    }
                }
                attstr1 = attstr0;
                a.costLb0.setImgUrl();
                a.costLb1.setImgUrl();
                a.costLb0.text = "已满级";
                a.costLb1.getTextField().align = fairygui.AlignType.Center;
                a.costLb1.text = "已满级";
            }
            a.curAttLb.text = attstr0;
            a.nextAttLb.text = attstr1;
            a.keyStrengBt.checkNotice = Model_DuanZao.checkKeyStrengNotice();
            var nextCfg = Config.dzqianghuasuit_209[Model_DuanZao.suitArr[0] + 1];
            if (nextCfg) {
                a.suitBt.checkNotice = Model_DuanZao.strengMinLV >= nextCfg.yaoqiu;
            }
            else {
                a.suitBt.checkNotice = false;
            }
        }
        else {
            a.grid.vo = null;
        }
    };
    Child_DuanZao_Streng.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    Child_DuanZao_Streng.prototype.guide_duanzao_keyStreng = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.keyStrengBt, self.keyStrengBt.width / 2, self.keyStrengBt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.keyStrengBt, self.keyStrengBt.width / 2, 0, -90, -106, -100);
        if (self.keyStrengBt.parent)
            self.keyStrengBt.parent.setChildIndex(self.keyStrengBt, self.keyStrengBt.parent.numChildren - 1);
    };
    //>>>>end
    Child_DuanZao_Streng.URL = "ui://pofv8989z1r81";
    return Child_DuanZao_Streng;
}(fairygui.GComponent));
__reflect(Child_DuanZao_Streng.prototype, "Child_DuanZao_Streng", ["IPanel"]);
