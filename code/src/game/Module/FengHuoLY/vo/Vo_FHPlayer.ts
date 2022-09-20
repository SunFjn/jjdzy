class Vo_FHPlayer {
	public constructor() {
	}

	id;
	name;
	job;
	/**阵营*/camp;
	head;
	headGrid;
	xx;
	yy;
	godweapon;
	horseId;
	speed = 200;//速度

	/**
	 * 当前征收的城市ID
	 * 9999为状态标识
	 * */
	soakCity = 0;
	public needShowAwatar() {
		let ret = this.soakCity == 0;
		return ret;
	}
}