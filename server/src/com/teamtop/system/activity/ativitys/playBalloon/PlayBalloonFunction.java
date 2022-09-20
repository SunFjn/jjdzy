package com.teamtop.system.activity.ativitys.playBalloon;

import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.playBalloon.model.PlayBalloon;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_dqq_765;

public class PlayBalloonFunction {
	private static PlayBalloonFunction ins;

	private PlayBalloonFunction() {
	}

	public static PlayBalloonFunction getIns() {
		if (ins == null) {
			ins = new PlayBalloonFunction();
		}
		return ins;
	}
	
	/**
	 * 登录推送红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_PLAYBALLOON)) return;
			int num = getNum(hero);
			if(num > 0) {
				RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.ACT_PLAYBALLOON, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "PlayBalloonFunction loginRed 登录推送红点  异常");
		}
	}
	
	/**
	 * 消费记录及推送红点
	 * @param hero
	 */
	public void consume(Hero hero, int consumeNum) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_PLAYBALLOON)) return;
			PlayBalloon playBalloon = (PlayBalloon) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_PLAYBALLOON);//个人数据
			playBalloon.setConsume(playBalloon.getConsume()+consumeNum);
			
			int num = getNum(hero);
			if(num > 0) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_PLAYBALLOON, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "PlayBalloonFunction consumeRed 消费推送红点 异常");
		}
	}
	
	
	/**
	 * 获得射击剩余次数
	 * @param hero
	 * @return
	 */
	public int getNum(Hero hero) {
		PlayBalloon playBalloon = (PlayBalloon) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_PLAYBALLOON);//个人数据
		if(playBalloon == null) return 0;
		
		int qs = playBalloon.getPeriods();
		int yuanbao = playBalloon.getConsume();//活动期间消费元宝
		int useNum = playBalloon.getNum();
		
		Map<Integer, Struct_dqq_765> map = PlayBalloonCache.playBalloonConfig.get(qs);
		int size = map.size();
		
		int sysNum = 0;//总次数
		for(int i=1; i<=size; i++) {
			Struct_dqq_765 struct_dqq_765 = map.get(i);
			if(yuanbao >= struct_dqq_765.getYb()) {
				sysNum = struct_dqq_765.getCs();
			}
		}
		 
		int num = sysNum-useNum;
		return num;
	}
}
