class DDFH_RankItem extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public jifenLb: fairygui.GRichTextField;
	public boxImg: fairygui.GLoader;
	public levelImg: fairygui.GLoader;
	public rankIcon: fairygui.GLoader;

	public static URL: string = "ui://me1skowlr4oge";

	public static createInstance(): DDFH_RankItem {
		return <DDFH_RankItem><any>(fairygui.UIPackage.createObject("Arena", "DDFH_RankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
		a.boxImg.addClickListener(a.boxHandler, a);
	}

	private boxHandler(): void {
		let a = this;
		let arr = Model_DDFH.rankArr;
		let len;
		let cfg;
		if (a.isCross) {
			len = arr[1].length;
			for (let i = 0; i < len; i++) {
				cfg = arr[1][i];
				let arr1 = JSON.parse(cfg.rank);
				if (a.rank >= arr1[0][0] && a.rank <= arr1[0][1]) {
					let arr2 = JSON.parse(cfg.reward);
					GGlobal.layerMgr.open(UIConst.DANDAO_FUHUI_REWARDSHOW, { reward: arr2, num: a.rank, panelId: UIConst.DANDAO_FUHUI_RANK, isCross: a.isCross });
					break;
				}
			}
		} else {
			len = arr[0].length;
			for (let i = 0; i < len; i++) {
				cfg = arr[0][i];
				let arr1 = JSON.parse(cfg.rank);
				if (a.rank >= arr1[0][0] && a.rank <= arr1[0][1]) {
					let arr2 = JSON.parse(cfg.reward);
					GGlobal.layerMgr.open(UIConst.DANDAO_FUHUI_REWARDSHOW, { reward: arr2, num: a.rank, panelId: UIConst.DANDAO_FUHUI_RANK, isCross: a.isCross });
					break;
				}
			}
		}
	}

	private rank: number = 0;
	private isCross: boolean = false;
	//I:排名B:段位L:玩家idU:玩家名字I:积分
	public show(arr: any[], isCross: boolean = false): void {
		let a = this;
		a.isCross = isCross;
		a.rank = arr[0];
		if (arr[0] > 3) {
			a.lbRank.text = arr[0] + "";
			a.rankIcon.visible = false;
		} else {
			a.rankIcon.url = CommonManager.getCommonUrl("rank_" + arr[0]);
			a.rankIcon.visible = true;
			a.lbRank.text = "";
		}
		a.nameLb.text = arr[3];
		a.jifenLb.text = arr[4] + "";
		a.levelImg.url = CommonManager.getUrl("Arena", "grade_" + (arr[1] - 1));
	}
}