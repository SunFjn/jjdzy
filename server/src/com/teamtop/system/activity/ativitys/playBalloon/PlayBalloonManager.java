package com.teamtop.system.activity.ativitys.playBalloon;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.playBalloon.model.PlayBalloon;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_dqq_765;

public class PlayBalloonManager extends AbstractActivityManager {
	private static PlayBalloonManager ins = null;
	public static PlayBalloonManager getIns() {
		if (ins == null) {
			ins = new PlayBalloonManager();
		}
		return ins;
	}
	private PlayBalloonManager() {
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_PLAYBALLOON)) return;
			
			PlayBalloon playBalloon = (PlayBalloon) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_PLAYBALLOON);//个人数据
			int qs = playBalloon.getPeriods();
			int yuanbao = playBalloon.getConsume();//活动期间消费元宝
			int useNum = playBalloon.getNum();
			
			Map<Integer, int[]> balloonMap = playBalloon.getBalloonMap();
			
			int sysNum = 0;//总次数
			List<Object[]> itemList = new ArrayList<>();
			Map<Integer, Struct_dqq_765> map = PlayBalloonCache.playBalloonConfig.get(qs);
			for(int i=1; i<=map.size(); i++) {
				int[] balloon = balloonMap.get(i);
				if(balloon == null) {
					itemList.add(new Object[] {i,0,0,0});
				}else {
					itemList.add(new Object[] {i,balloon[0],balloon[1],balloon[2]});
				}
				Struct_dqq_765 struct_dqq_765 = map.get(i);
				if(yuanbao >= struct_dqq_765.getYb()) {
					sysNum = struct_dqq_765.getCs();
				}
			}
			
			int num = sysNum - useNum;//剩余子弹数量
			PlayBalloonSender.sendCmd_10000(hero.getId(), itemList.toArray(), num, yuanbao, qs);
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "PlayBalloonManager.openUI 打开打气球界面 异常");
		}
	}
	
	public void shooting(Hero hero, int index) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_PLAYBALLOON)) return;
			
			PlayBalloon playBalloon = (PlayBalloon) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_PLAYBALLOON);//个人数据
			int qs = playBalloon.getPeriods();
			int yuanbao = playBalloon.getConsume();//活动期间消费元宝
			int useNum = playBalloon.getNum();
			Map<Integer, int[]> balloonMap = playBalloon.getBalloonMap();
			
			Map<Integer, Struct_dqq_765> map = PlayBalloonCache.playBalloonConfig.get(qs);
			int size = map.size();
			if(index<1 || index>size) {//参数错误
				PlayBalloonSender.sendCmd_10002(hero.getId(), PlayBalloonConst.PARA_FAILURE, index, 0, 0, 0, 0); return;
			}
			
			int[] balloon = balloonMap.get(index);
			if(balloon != null) {//该位置已被射击
				PlayBalloonSender.sendCmd_10002(hero.getId(), PlayBalloonConst.HAS_HIT, index, 0, 0, 0, 0); return;
			}
			
			int num = PlayBalloonFunction.getIns().getNum(hero);//剩余次数
			if(num <= 0) {//没有剩余次数
				PlayBalloonSender.sendCmd_10002(hero.getId(), PlayBalloonConst.NOT_HAVE_NUM, index, 0, 0, 0, 0); return;
			}
			
			int nextNum = useNum+1;//当前射击次数
			
			ProbabilityEventModel pm = PlayBalloonCache.awardMap.get(qs).get(nextNum);
			int[] genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
			
			int[] item = new int[] {genAward[0], genAward[1],genAward[2]};
			int[][] items = new int[][] {item};
			boolean canAdd = UseAddUtil.canAdd(hero, items, false);
			if(!canAdd){//背包已满
				PlayBalloonSender.sendCmd_10002(hero.getId(), PlayBalloonConst.FULL, index, 0, 0, 0, 0); return;
			}
			
			playBalloon.setNum(nextNum);
			balloon = new int[] {genAward[0], genAward[1],genAward[2]};
			balloonMap.put(index, balloon);
			
			UseAddUtil.add(hero, items, SourceGoodConst.PLAYBALLOON_ADD, UseAddUtil.getDefaultMail(), true);
			PlayBalloonSender.sendCmd_10002(hero.getId(), PlayBalloonConst.SUCCESS, index, genAward[0], genAward[1],genAward[2], num-1);
			if(genAward[4] == 1) {
				ChatManager.getIns().broadCast(ChatConst.PLAYBALLOON,new Object[] {hero.getName(),genAward[1],genAward[2]}); // 全服广播
			}
			LogTool.info("hid:"+hero.getId()+" PlayBalloonManager.shooting 打气球射击活动：  qs:"+qs +" yuanbao:"+yuanbao, this);//日志
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "PlayBalloonManager.openUI 打气球射击 异常");
		}
	}

	@Override
	public void actOpen() {
	}

	@Override
	public void heroActOpen(Hero hero) {
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		PlayBalloon PlayBalloon = new PlayBalloon(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(), activityInfo.getPeriods());
		PlayBalloon.setConsume(0);
		PlayBalloon.setNum(0);
		PlayBalloon.setBalloonMap(new HashMap<Integer, int[]>());
		return PlayBalloon;
	}

	@Override
	public Class<?> getActivityData() {
		return PlayBalloon.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return PlayBalloonEvent.getIns();
	}
}
