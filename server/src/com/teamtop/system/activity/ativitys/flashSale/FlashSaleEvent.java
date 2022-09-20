package com.teamtop.system.activity.ativitys.flashSale;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class FlashSaleEvent extends AbsSystemEvent {
	public static FlashSaleEvent ins;
	public static synchronized FlashSaleEvent getIns() {
		if(ins == null){
			ins = new FlashSaleEvent();
		}
		return ins;
	}
	private FlashSaleEvent() {
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		FlashSaleFunction.getIns().loginRed(hero);
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
		if(CrossZone.isCrossServer()) {
			return;
		}
		if(cmdId==1) {
			FlashSaleFunction.getIns().gb();//每个刷新时间点开始前两分钟，广播全部玩家
		}else if(cmdId==2) {
			FlashSaleFunction.getIns().startToBuy();
		}
	}

}
