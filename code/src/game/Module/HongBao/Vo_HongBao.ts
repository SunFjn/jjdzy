class Vo_HongBao {
	/**L:红包唯一id */
	public id: number = 0;
	/**U:发送者名字 */
	public name: string = "";
	/**头像id */
	public headId: number = 0;
	/**I:头像框 */
	public frameId: number = 0;
	/**B:已经领取人数 */
	public drawNum = 0;
	/**I:领取了多少 0是没有领取 >0领取了*/
	public robNum: number = 0;
	/**I:红包总金额 */
	public moneyNum = 0;
	/**U:红包名称 */
	public hbName = "";

	/**L:红包唯一idU:发送者名字U:红包名称I:头像idI:头像框B:已经领取人数I:领取了多少 0是没有领取 >0领取了I:红包总金额 */
	public readData(data: BaseBytes) {
		let self = this;
		self.id = data.readLong();
		self.name = data.readUTF();
		self.hbName = data.readUTF();
		self.headId = data.readInt();
		self.frameId = data.readInt();
		self.drawNum = data.readByte();
		self.robNum = data.readInt();
		self.moneyNum = data.readInt();
	}
	public recordName: string = "";//名字
	public money: number = 0;//红包金额
	public isMyself: number = 0;//是否玩家本人,1是,0不是
	public readRecord(data: BaseBytes) {
		let self = this;
		self.recordName = data.readUTF();
		self.money = data.readLong();
		self.isMyself = data.readByte();
	}
}