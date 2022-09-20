class Vo_battle {
	public buffData: { [attID: number]: number } = {};
	public mapID = 0;
	public isDrop = false;
	public dropArr = [];
	public sysID = 0;
	public backID = 0;
	public battleRes = 0;
	public bossId = 0;
	public leftArr: Vo_Player[] = [];
	public rightArr: Vo_Player[] = [];
	public enemyArr: { id: number, count: number }[] = [];
	public static create(leftArr: Vo_Player[], rightArr?: Vo_Player[], bossId?: number) {
		let vo = new Vo_battle();
		vo.leftArr = leftArr;
		vo.rightArr = rightArr;
		vo.bossId = bossId;
		return vo;
	}
}