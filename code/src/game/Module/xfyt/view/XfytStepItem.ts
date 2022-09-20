/**
 * @author: lujiahao 
 * @date: 2019-10-30 17:33:51 
 */
class XfytStepItem extends fairygui.GComponent {

    //>>>>start
	public bgCtrl: fairygui.Controller;
	public imageStart: fairygui.GImage;
	public imgIcon: fairygui.GLoader;
	public imgBig: fairygui.GImage;
	public tfCount: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://n5noipr2vpqq6";

    public static createInstance(): XfytStepItem {
        return <XfytStepItem><any>(fairygui.UIPackage.createObject("xfyt", "XfytStepItem"));
    }

    private _curData: CfgRollXfyt;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    public setData(pData: CfgRollXfyt, pInit: boolean) {
        let t = this;
        let t_oldData = t._curData;
        t._curData = pData;
        if (pData) {
            if (pData.pos % 2 == 0) {
                t.bgCtrl.selectedIndex = 0;
            }
            else {
                t.bgCtrl.selectedIndex = 1;
            }

            t.imageStart.visible = false;
            t.imgIcon.visible = false;
            t.tfCount.visible = false;
            t.imgBig.visible = false;
            if (pData.pos == 1) //起点
            {
                t.imageStart.visible = true;
            }
            else {
                if (pData.rewardItem) {
                    let t_showIcon = false;
                    if (pInit) {
                        if (!pData.hasGet) {
                            t_showIcon = true;
                        }
                        else {
                            t_showIcon = false;
                        }
                    }
                    else {
                        t_showIcon = true;
                    }
                    t.tfCount.visible = t.imgIcon.visible = t_showIcon;
                    t.imgBig.visible = pData.cfg.dj && t_showIcon ? true : false;
                    if (pData != t_oldData) {
                        IconUtil.setImg1(Enum_Path.ICON70_URL + pData.rewardItem.icon + ".png", t.imgIcon);
                    }

                    if (pData.rewardItem.count > 1) {
                        t.tfCount.text = ConfigHelp.getYiWanText(pData.rewardItem.count);
                    }
                    else {
                        t.tfCount.text = "";
                    }
                }
            }

            t.registerEvent(true);
        }
        else {
            t.registerEvent(false);
             IconUtil.setImg1(null,t.imgIcon);
        }
    }

    public getData() {
        return this._curData;
    }

    public hideItemIcon() {
        let t = this;
        t.imgBig.visible = t.imgIcon.visible = t.tfCount.visible = false;
    }

    public clean() {
        let t = this;
        t.setData(null, false);
        super.clean();
    }

    public dispose() {
        let t = this;
        t.clean();
        super.dispose();
    }
    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.imgIcon, egret.TouchEvent.TOUCH_TAP, t.onIconClick, t);
    }
    //======================================== handler =========================================
    private onIconClick(e: egret.TouchEvent) {
        let t = this;
        if (t._curData && t._curData.rewardItem) {
            FastAPI.showItemTips(t._curData.rewardItem);
        }
    }
}