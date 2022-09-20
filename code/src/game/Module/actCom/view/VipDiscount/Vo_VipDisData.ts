/**
 * vip折扣数据
 */
class Vo_VipDisData {
	/**vip等级 */
	public vip:number = 0;
	/**现价 */
	public curPrice:number = 0;
	/**购买次数 */
	public buyCount:number = 0;

	public constructor() {
	}

	public initDate(data: BaseBytes) {
		let self = this;
		self.vip = data.readByte();
		self.curPrice = data.readInt();
		self.buyCount = data.readByte();
	}
}