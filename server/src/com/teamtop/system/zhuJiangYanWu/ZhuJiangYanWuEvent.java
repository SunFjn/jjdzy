package com.teamtop.system.zhuJiangYanWu;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
public class ZhuJiangYanWuEvent extends AbsSystemEvent{
	private static ZhuJiangYanWuEvent ins = null;

	public static ZhuJiangYanWuEvent getIns() {
		if (ins == null) {
			ins = new ZhuJiangYanWuEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		ZhuJiangYanWu zhuJiangYanWu = hero.getZhuJiangYanWu();
		if(zhuJiangYanWu==null) {
			zhuJiangYanWu = new ZhuJiangYanWu();
			hero.setZhuJiangYanWu(zhuJiangYanWu);
		}
		zhuJiangYanWu.setHid(hero.getId());
	}

	@Override
	public void login(Hero hero) {
		ZhuJiangYanWuManager.getIns().login(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		ZhuJiangYanWu zhuJiangYanWu = hero.getZhuJiangYanWu();
		zhuJiangYanWu.setNumBattled( 0);
		ZhuJiangYanWuManager.getIns().openUI(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		loginReset(hero, now);
	}

	@Override
	public void fixTime(int cmdId, int now) {
	}

	@Override
	public void zeroPub(int now) {
		//初始化武将
		ZhuJiangYanWuManager.getIns().initWJ();
		//刷新所有玩家入口
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Entry<Long, Hero>> iterator = heroMap.entrySet().iterator();
		while(iterator.hasNext()) {
			Entry<Long, Hero> next = iterator.next();
			Hero hero = next.getValue();
			ZhuJiangYanWuManager.getIns().login(hero);
			ZhuJiangYanWuManager.getIns().openUI(hero);
		}
		//广播
		Map<Integer, Integer> indexMap = ZhuJiangYanWuCache.getIndexZhuJiangYanWuMap();
		Integer idBoss = indexMap.get( ZhuJiangYanWuConst.CHAT_BOSS_INDEX);
		if( idBoss==null|| idBoss==0) {
			ChatManager.getIns().broadCast( ChatConst.ZHU_JIANG_YAN_WU_NO_BOSS, new Object[] { });
		}else {
			ChatManager.getIns().broadCast( ChatConst.ZHU_JIANG_YAN_WU, new Object[] { idBoss});
		}
	}

	
}
