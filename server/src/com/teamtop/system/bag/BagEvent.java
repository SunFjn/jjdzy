package com.teamtop.system.bag;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.material.baodi.GiftBaodiData;
import com.teamtop.util.log.LogTool;
/**
 * 背包个人事件
 * @author lobbyer
 * @date 2017年3月28日
 */
public class BagEvent extends AbsSystemEvent{
	private static BagEvent bagEvent;
	private BagEvent(){}
	public static BagEvent getIns() {
		if(bagEvent == null) {
			bagEvent = new BagEvent();
		}
		return bagEvent;
	}

	@Override
	public void init(Hero hero) {
		try{
			Bag bag = hero.getBag();
			//当新建角色时初始化背包格子和仓库格子
			if(bag==null){
				bag = new Bag();
				hero.setBag(bag);
				bag.setHid(hero.getId());
				bag.setItemData(new HashMap<Integer, BagGrid>());
				bag.setSecondPsd("");
				bag.setCreate(true);
			}
			GiftBaodiData giftBaodiData = hero.getGiftBaodiData();
			if (giftBaodiData == null) {
				giftBaodiData = new GiftBaodiData();
				giftBaodiData.setHid(hero.getId());
				hero.setGiftBaodiData(giftBaodiData);
			}
		}catch(Exception e) {
			LogTool.error(e, this,hero.getId(), hero.getName(), "init bagData exception.");
		}
	}
	
	@Override
	public void login(Hero hero) {
		Bag bag = hero.getBag();
		if(bag==null){
			init(hero);
			bag = hero.getBag();
		}
		BagFunction.getIns().sendBagData(hero);
	}

	@Override
	public void loginReset(Hero hero,int now) {
		Bag bag = hero.getBag();
		if (bag != null) {
			bag.getDailyItemNum().clear();
		}
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		Bag bag = hero.getBag();
		if (bag != null) {
			bag.getDailyItemNum().clear();
		}
	}

	@Override
	public void logout(Hero hero) {
		if(hero.getTempVariables() != null)
			hero.getTempVariables().setDealBagTime(false);
	}
	
}
