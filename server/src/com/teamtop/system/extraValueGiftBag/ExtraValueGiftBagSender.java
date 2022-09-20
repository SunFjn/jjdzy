package com.teamtop.system.extraValueGiftBag;

import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;

public class ExtraValueGiftBagSender {

	/**
	 * 打开界面返回
	 * @param qs 期数
	 * @param type 类型
	 * @param buyList 剩余购买次数[id,剩余次数]
	**/
	public static void sendCmd_20002(long hid, int qs, int type, Object[] buyList){
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			return;
		}
		Object[] cmdSendData = new Object[]{qs,type,buyList};
		if(!hero.isCanSend(20002, cmdSendData)){
			return;
		}
		NettyWrite.writeData(hero.getChannel() , cmdSendData, 20002);
	}
	
	/** 
	 * @param giftId 礼包id 
	 * */
	public static void sendCmd_20004(long hid, int giftId){
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			return;
		}
		Object[] cmdSendData = new Object[]{giftId};
		if(!hero.isCanSend(20004, cmdSendData)){
			return;
		}
		NettyWrite.writeData(hero.getChannel() , cmdSendData, 20004);
	}
	
}
