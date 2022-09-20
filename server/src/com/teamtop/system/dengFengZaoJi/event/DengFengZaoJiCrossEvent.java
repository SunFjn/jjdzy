package com.teamtop.system.dengFengZaoJi.event;

import com.teamtop.system.dengFengZaoJi.cross.DengFengZaoJiCrossFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 */
public class DengFengZaoJiCrossEvent extends AbsSystemEvent {
	private static DengFengZaoJiCrossEvent ins;
	public static DengFengZaoJiCrossEvent getIns(){
		if(ins == null) {
			ins = new DengFengZaoJiCrossEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
	}

	@Override
	public void loginReset(Hero hero, int now) {
		super.loginReset(hero, now);
	}

	@Override
	public void logout(Hero hero) {
	}

	@Override
	public void fixTime(int cmdId, int now) {
		now = TimeDateUtil.getCurrentTime();

		LogTool.info("DengFengZaoJiCrossEvent.FixTime bigan.cmd:"+cmdId, this);
		if( cmdId==1){
			//周五24点
			DengFengZaoJiCrossFunction.getIns().finalHero();//筛选决赛玩家
			DengFengZaoJiCrossFunction.getIns().sendRankAwards(0);//发海选排行奖励
		}else if( cmdId==2){
			//周日24点,发决赛排行奖励
			DengFengZaoJiCrossFunction.getIns().sendRankAwards(1);
		}else if( cmdId==3){
			//周日22点,通知子服发下注奖励
			DengFengZaoJiCrossFunction.getIns().sendBetAwards();
		}
		LogTool.info("DengFengZaoJiCrossEvent.FixTime.cmd:"+cmdId, this);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
	}

	@Override
	public void zeroPub(int now) {
	}
}
