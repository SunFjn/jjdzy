package com.teamtop.system.dengFengZaoJi.event;

import java.util.HashMap;

import com.teamtop.system.dengFengZaoJi.DengFengZaoJiCache;
import com.teamtop.system.dengFengZaoJi.DengFengZaoJiFunction;
import com.teamtop.system.dengFengZaoJi.DengFengZaoJiSender;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJi;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class DengFengZaoJiEvent extends AbsSystemEvent  {

	private static DengFengZaoJiEvent ins;
	public static DengFengZaoJiEvent getIns(){
		if(ins == null) {
			ins = new DengFengZaoJiEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
		if(dengFengZaoJi == null) {
			dengFengZaoJi = new DengFengZaoJi();
			dengFengZaoJi.setHid(hero.getId());
			dengFengZaoJi.setDengFengZaoJiModel(new HashMap<Integer, DengFengZaoJiModel>());
			dengFengZaoJi.setHasReceiveScoreReward(new HashMap<Integer,Integer>());
			hero.setDengFengZaoJi(dengFengZaoJi);
		}
	}

	@Override
	public void login(Hero hero) {
		DengFengZaoJiFunction.getIns().sendBetReward(hero);//发下注奖励
		DengFengZaoJiFunction.getIns().reset(hero);//重置
		if(DengFengZaoJiCache.isStart_haixuan) {
			DengFengZaoJiFunction.getIns().activityStart(1);
		}
		if(DengFengZaoJiCache.isStart_juesai) {
			DengFengZaoJiFunction.getIns().activityStart(2);
		}
		DengFengZaoJiFunction.getIns().loginRed(hero);//红点
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	/**零点个人结义信息重置处理*/
	@Override
	public void zeroHero(Hero hero,int now){
		DengFengZaoJi dengFengZaoJi = hero.getDengFengZaoJi();
		HashMap<Integer, DengFengZaoJiModel> dengFengZaoJiModelMap = dengFengZaoJi.getDengFengZaoJiModel();
		for(DengFengZaoJiModel dengFengZaoJiModel : dengFengZaoJiModelMap.values()) {
			dengFengZaoJiModel.setResetBuyNum(0);
		}
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
		if(cmdId == 1){
			//每周一 10:00
			DengFengZaoJiFunction.getIns().upData();
			DengFengZaoJiCache.isStart_haixuan = true;
			DengFengZaoJiCache.isStart_juesai = false;
			DengFengZaoJiFunction.getIns().activityStart(1);
		}else if(cmdId == 2){
			//周五 22:00,发积分奖励
			DengFengZaoJiCache.isStart_haixuan = false;
			for (Hero hero:HeroCache.getHeroMap().values()) {
				if (hero.isOnline()) {
					DengFengZaoJiSender.sendCmd_11972(hero.getId(), 0);
					DengFengZaoJiFunction.getIns().sendScoreReward(hero);
				}
			}
		}else if(cmdId == 3){
			//每周六 10:00
			DengFengZaoJiCache.isStart_juesai = true;
			DengFengZaoJiCache.isStart_haixuan = false;
			DengFengZaoJiFunction.getIns().activityStart(2);
		}else if(cmdId == 4){
			//周日 22:00
			DengFengZaoJiCache.isStart_juesai = false;
			DengFengZaoJiFunction.getIns().activityStart(0);
		}
		LogTool.info("DengFengZaoJiEvent.fixTime cmdId:"+cmdId+" time:"+TimeDateUtil.printTime(now), this);
	}
	
	@Override
	public void logout(Hero hero){
		
	}

}
