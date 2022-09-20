class PXSBVO {
	public id:number = 0;//大奖配置表id
	public status:number = 0;//状态：0未达到，1可领取，2已领取
	public day:number = 0;//达到天数
	public arr = [];

	public constructor() {
	}

	public readMsg(data:BaseBytes)
	{
		let self = this;
		self.id = data.readInt();
		self.status = data.readByte();
		self.day = data.readInt();
		self.arr = [];
		let len:number = data.readShort();
		for(let i:number = 0;i < len; i ++)
		{
			let id = data.readInt();
			let status = data.readByte();//状态：0未达到，1可领取，2已领取
			self.arr.push([id, status]);
		}
	}
}