package com.teamtop.system.wanyuanhongbao;

import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;

public class WanyuanHongbaoSender {
	
	/**
	 * 打开界面返回
	 * @param awardsStateList 奖励状态列表
	**/
	public static void sendCmd_20012(long hid, int type, int totalRecharge, Object[] awardsStateList ){
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			return;
		}
		Object[] cmdSendData = new Object[]{type,totalRecharge,awardsStateList};
		if(!hero.isCanSend(100012, cmdSendData)){
			return;
		}
		NettyWrite.writeData(hero.getChannel() , cmdSendData, 20012);
	}

	/**
	 * 领取奖励返回
	 * @param state 状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取，4：礼包未购买，不能领取
	 * @param awardsId 领取的奖励id
	**/
	public static void sendCmd_20014(long hid, int state){
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			return;
		}
		Object[] cmdSendData = new Object[]{state};
		if(!hero.isCanSend(100014, cmdSendData)){
			return;
		}
		NettyWrite.writeData(hero.getChannel() , cmdSendData, 20014);
	}
	
}
