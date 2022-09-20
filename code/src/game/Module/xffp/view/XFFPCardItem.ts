/**
 * 消费翻牌卡片组件
 * @author: lujiahao 
 * @date: 2019-09-07 11:35:36 
 */
class XFFPCardItem extends fairygui.GComponent {

	//>>>>start
	public ctrlState: fairygui.Controller;
	public frontCtrl: fairygui.Controller;
	public item: ViewGrid;
	public noticeImg: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://791nthw5mej8g";

	public index = -1;
	public curVo: VoXffpReward;

	public static createInstance(): XFFPCardItem {
		return <XFFPCardItem><any>(fairygui.UIPackage.createObject("xffp", "XFFPCardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	//=========================================== API ==========================================
	/**
	 * 设置数据
	 * @param pData 
	 * @param pPlayMc 是否播放动画，默认false不播放
	 */
	public setData(pData: VoXffpReward, pPlayMc: boolean = false) {
		this.curVo = pData;
		if (pData) {
			this.item.isShowEff = true;
			this.item.tipEnabled = true;
			this.item.vo = pData.rewardList[0];

			if (pData.cfg.big)
				this.frontCtrl.selectedIndex = 1;
			else
				this.frontCtrl.selectedIndex = 0;

			if (pPlayMc) {
				this.playMc();
			}
			else {
				this.ctrlState.selectedIndex = 1;
			}
		}
		else {
			this.item.vo = null;
			this.resetState();
		}
	}

	//===================================== private method =====================================
	private playMc() {
		egret.Tween.removeTweens(this);
		this.ctrlState.selectedIndex = 0;
		this.scaleX = 1;
		let tw = egret.Tween.get(this);
		tw.to({ scaleX: 0 }, 150).call(() => {
			this.ctrlState.selectedIndex = 1;
		}, this)
			.to({ scaleX: 1 }, 150).wait(100).call(() => {
				if (this.curVo) {
					GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, this.curVo.rewardList);
				}
			}, this);
	}

	private resetState() {
		egret.Tween.removeTweens(this);
		this.scaleX = 1;
		this.ctrlState.selectedIndex = 0;
		this.noticeImg.visible = false;
	}

	private registerEvent(pFlag: boolean): void {
	}

	//======================================== handler =========================================
	public handleClick(e: egret.TouchEvent) {
		// this.playMc();
		if (this.index < 0)
			return;
		if (this.curVo) {
			//有数据则是已经翻过了
		}
		else {
			//无数据则是翻牌
			if (this.index > -1)
				GGlobal.modelXFFP.cmdSendFlopCard(this.index);
		}
	}
}