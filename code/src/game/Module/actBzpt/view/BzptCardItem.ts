/**
 * @author: lujiahao 
 * @date: 2019-11-26 19:40:14 
 */
class BzptCardItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public tfContent: fairygui.GRichTextField;
	public btnGo: fairygui.GButton;
	public noticeImg: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://twm3bfyglplob";

    public static createInstance(): BzptCardItem {
        return <BzptCardItem><any>(fairygui.UIPackage.createObject("actBzpt", "BzptCardItem"));
    }

    private _curData: VoTaskBzpt;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
        t.tfContent.wordWrap = true;
    }

    //=========================================== API ==========================================
    public setData(pData: VoTaskBzpt) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);

            t.skewY = 0;
            t.stateCtrl.selectedIndex = pData.state;

            let t_color = Color.GREENSTR;
            if (pData.count < pData.cfg.cs)
                t_color = Color.REDSTR;
            t.tfContent.text = `${pData.cfg.sm}\n<font color='${t_color}'>(${pData.count}/${pData.cfg.cs})</font>`;
        }
        else {
            t.registerEvent(false);
        }
    }

    public playMc(pComplete: Function, pCall: any) {
        let t = this;
        egret.Tween.removeTweens(t);
        t.skewY = 0;
        let tw = egret.Tween.get(t);
        tw.to({ skewY: -90 }, 250).call(() => {
            t.stateCtrl.selectedIndex = 2;
            if (pComplete) {
                pComplete.apply(pCall);
            }
        })
    }

    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    }
    //======================================== handler =========================================
    private onClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelBzpt;
        switch (e.currentTarget) {
            case t:
                if (!t._curData)
                    return;
                switch (t._curData.state) {
                    case 0: //前往
                        let t_openId = t._curData.cfg.tz;
                        if (t_openId == UIConst.CHONGZHI) //任务类型为充值
                        {
                            //需要判断充值过没有，没有充值过的话，都是打开首充界面
                            ViewChongZhi.tryToOpenCZ();
                        }
                        else {
                            let t_cla = GGlobal.layerMgr.getClassById(t_openId);
                            if (t_cla == ViewActCom) {
                                //先关闭当前面板
                                GGlobal.layerMgr.close2(UIConst.ACTCOM);
                            }
                            GGlobal.layerMgr.open(t_openId);
                        }
                        break;

                    case 1: //领取
                        t_model.CG_BaoZangPinTu_activate_10651(t._curData.id);
                        break;
                }
                break;
        }
    }
}