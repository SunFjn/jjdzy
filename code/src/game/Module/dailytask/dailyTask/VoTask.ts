class VoTask {
	public constructor() {
	}
	id:number = 0;
	//0不可 1可令 2领完
	state:number = 0;
	progress:number = 0;
	sortIndex:number = 0;

	lib;
	name:string;
	condition;
	huoyuedu:number;
	icon;
	award:string;
	link;
	max:number;

	public initLib(){
		let s= this;
		s.name = s.lib.name;
		s.condition = s.lib.open;
		s.huoyuedu = s.lib.add;
		s.max = 1;
		s.award = s.lib.award;
		s.icon = s.lib.icon;
		s.link = s.lib.nextto;
	}

	public update(){
		this.sortIndex = this.lib.px;
		if(this.state == 1){//可领取
			this.sortIndex = this.sortIndex - 1000;
		}else if(this.state == 2){//已领取
			this.sortIndex = this.sortIndex + 1000;
		}
	}
}