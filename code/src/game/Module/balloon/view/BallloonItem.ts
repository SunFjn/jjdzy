/**
 * @author: lujiahao 
 * @date: 2019-10-31 21:12:34 
 */
class BallloonItem extends fairygui.GComponent {

    //>>>>start
    public stateCtrl: fairygui.Controller;
    public item: ViewGrid;
    public imgFlash: fairygui.GImage;
    public noticeImg: fairygui.GImage;
    //>>>>end

    public static URL: string = "ui://i1mp7ufxwuwj6";

    public static createInstance(): BallloonItem {
        return <BallloonItem><any>(fairygui.UIPackage.createObject("balloon", "BallloonItem"));
    }

    public curVo: VoBalloon;
    public indexId = 0;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    public setData(pData: VoBalloon, pPlayMc: boolean = false) {
        let t = this;
        t.curVo = pData;
        if (pData) {
            let t_hasItem = false;
            if (pData.rewardItem) {
                t.item.isShowEff = true;
                t.item.tipEnabled = true;
                t.item.vo = pData.rewardItem;

                t.stateCtrl.selectedIndex = 1;
                t_hasItem = true;
            }
            else {
                t.item.vo = null;

                t.stateCtrl.selectedIndex = 0;
            }

            if (pPlayMc) {
                t.playMc();
            }
            else {
                t.imgFlash.visible = false;
                t.item.visible = t_hasItem;
            }
        }
        else {
            t.item.vo = null;
            t.resetState();
        }
    }

    //===================================== private method =====================================
    private playMc() {
        let t = this;
        egret.Tween.removeTweens(t.imgFlash);
        let tw = egret.Tween.get(t.imgFlash);
        t.item.visible = false;
        t.imgFlash.visible = true;
        t.imgFlash.alpha = 1;
        tw.to({ alpha: 0 }, 100)
            .to({ alpha: 1 }, 100)
            .to({ alpha: 0 }, 100)
            // .to({ alpha: 100 }, 100)
            // .to({ alpha: 0 }, 100)
            .call(() => {
                t.imgFlash.visible = false;
                t.item.visible = true;
            }, t);
    }

    private resetState() {
        let t = this;
        egret.Tween.removeTweens(t.imgFlash);
        t.imgFlash.visible = false;
        t.stateCtrl.selectedIndex = 0;
        t.noticeImg.visible = false;
    }

    //======================================== handler =========================================
    public handleClick(e: egret.TouchEvent) {
        let t = this;
        if (t.indexId <= 0)
            return;
        if (!t.curVo)
            return;
        if (t.curVo.rewardItem) {
            //有物品数据则是已经翻过了
        }
        else {
            //无物品数据则可以翻牌
            // t.stateCtrl.selectedIndex = 1;
            // t.playMc();
            GGlobal.modelBalloon.CG_PlayBalloon_shooting_10001(t.indexId);
        }
    }
}