class VoWarOrder {
	public constructor() {
	}


	/** 是否进阶过 */
	public upgradeFlag = 0;
	/** 战令等级id */
	public levelId = 0;
	/** 当前战令经验 */
	public curExp = 0;
	/** 已经购买次数 */
	public buyNum = 0;


	//活动id
	public hdId = 0
	public hAct: Vo_Activity

	public update(pData: { upgradeFlag?, levelId?, curExp?, buyNum?}) {
		return ObjectUtils.modifyObject(this, pData);
	}
}