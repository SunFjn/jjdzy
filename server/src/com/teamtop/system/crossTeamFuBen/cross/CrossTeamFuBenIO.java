package com.teamtop.system.crossTeamFuBen.cross;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenFunction;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenManager;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

/**
 * 子服和中央服通讯IO
 * 
 * @author Administrator
 *
 */
public class CrossTeamFuBenIO {
	private static CrossTeamFuBenIO ins = null;

	public static CrossTeamFuBenIO getIns() {
		if (ins == null) {
			ins = new CrossTeamFuBenIO();
		}
		return ins;
	}

	/**
	 * 中央服收到子服请求，然后请求其他子服
	 * 
	 * @param channel
	 * @param data
	 */
	public void saveBattleTimesCL(Channel channel, CrossData data) {
		@SuppressWarnings("unused")
		int cmd = CrossConst.CROSS_TEAM_FUBEN_SAVE_BATTLE_TIMES_CL;
		try {
			int times = data.getObject(CrossEnum.data1, Integer.class);
			Long hid = data.getObject(CrossEnum.hid, Long.class);
			Hero hero = HeroCache.getHero(hid);
			LogTool.info("CrossTeamFuben.SaveBattleTimesCL.hid:" + hid + " times:" + times + " hero:" + hero, this);
			if (hero == null)
				return;

			CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
			crossTeamFuBen.setTimesBattled(crossTeamFuBen.getTimesBattled() + 1);
			//八门金锁
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_7, 1);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_4, 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_8, 1, 0);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_12, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_12, 1);
		} catch (Exception e) {
			LogTool.error(e, this, "CrossBossFunction connEvent Exception!");
		}
	}

	/**
	 * 广播队伍信息到子服
	 */
	public void sendNewTeamDataCL(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAM_FUBEN_VOICE_CL;
		String name = data.getObject(CrossEnum.name, String.class);
		int fubenID = data.getObject(CrossEnum.FUBEN_ID, Integer.class);
		int teamID = data.getObject(CrossEnum.teamid, Integer.class);

		ChatManager.getIns().broadCast(ChatConst.CROSS_TEAM_FUBEN, new Object[] { name, fubenID, teamID });
	}

	/**
	 * 检查队伍是否存在
	 */
	public void checkTeamIDLC(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAM_FUBEN_CHACK_TEAM_LC;
		long hid = data.getObject(CrossEnum.hid, Long.class);
		int teamID = data.getObject(CrossEnum.teamid, Integer.class);
		int fubenID = data.getObject(CrossEnum.FUBEN_ID, Integer.class);
		boolean chackTeamID = CrossTeamFubenFunction.getIns().chackTeamID(fubenID, teamID);
		data.putObject(CrossEnum.data1, chackTeamID);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	/**
	 * 刷新调整次数
	 */
	public void reflashNumLC(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAM_FUBEN_REFLASH_NUM_LC;
		long hid = data.getObject(CrossEnum.hid, Long.class);
		int num = data.getObject(CrossEnum.data1, Integer.class);
		int addTimes = data.getObject(CrossEnum.data2, Integer.class);
		boolean online = HeroFunction.getIns().isOnline(hid);
		if (!online) {
			return;
		}
		Hero hero = HeroCache.getHero(hid);
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		if(crossTeamFuBen==null)
			return;
		crossTeamFuBen.setTimesBattled(num);
		crossTeamFuBen.setAddTimes(addTimes);
		CrossTeamFubenManager.getIns().sendData(hero);
	}

	/**
	 * 刷新增加的奖励次数
	 */
	public void reflashAddTimes(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAM_FUBEN_REFLASH_ADDTIMES_LC;
		long hid = data.getObject(CrossEnum.hid, Long.class);
		int addTimes = data.getObject(CrossEnum.data1, Integer.class);
		boolean online = HeroFunction.getIns().isOnline(hid);
		if (!online) {
			return;
		}
		Hero hero = HeroCache.getHero(hid);
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		if (crossTeamFuBen == null)
			return;
		crossTeamFuBen.setAddTimes(addTimes);
		CrossTeamFubenManager.getIns().sendData(hero);
	}

	/**
	 * 进入副本
	 */
	public void battleCL(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAM_FUBEN_REFLASH_BATTLE_LC;
		long hid = data.getObject(CrossEnum.hid, Long.class);
		boolean online = HeroFunction.getIns().isOnline(hid);
		if (!online) {
			return;
		}
		Hero hero = HeroCache.getHero(hid);
		// 每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE22);
	}
}
