package com.teamtop.system.crossSJMiJing.cross;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingFunction;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

/**
 * 子服和中央服通讯IO
 * 
 * @author Administrator
 *
 */
public class CrossSJMiJingIO {
	private static CrossSJMiJingIO ins = null;

	public static CrossSJMiJingIO getIns() {
		if (ins == null) {
			ins = new CrossSJMiJingIO();
		}
		return ins;
	}

	/**
	 * 广播队伍信息到子服
	 */
	public void sendNewTeamDataCL(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_S_J_MI_JING_VOICE_CL;
		String name = data.getObject(CrossEnum.name, String.class);
		int fubenID = data.getObject(CrossEnum.FUBEN_ID, Integer.class);
		int teamID = data.getObject(CrossEnum.teamid, Integer.class);

		ChatManager.getIns().broadCast(ChatConst.CROSS_S_J_MI_JING, new Object[] { name, fubenID, teamID });
	}

	/**
	 * 检查队伍是否存在
	 */
	public void checkTeamIDLC(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_S_J_MI_JING_CHACK_TEAM_LC;
		long hid = data.getObject(CrossEnum.hid, Long.class);
		int teamID = data.getObject(CrossEnum.teamid, Integer.class);
		int mjID = data.getObject(CrossEnum.FUBEN_ID, Integer.class);
		boolean chackTeamID = CrossSJMiJingFunction.getIns().chackTeamID(mjID, teamID);
		data.putObject(CrossEnum.data1, chackTeamID);
		NettyWrite.writeCallbackData(channel, data, data.getCallbackCmd());
	}

	/**
	 * 中央服同步数据到子服
	 */
	public void saveBattleDataCL(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_S_J_MI_JING_SAVE_DATA_CL;
		try {
			Long hid = data.getObject(CrossEnum.hid, Long.class);
			int mjID = data.getObject(CrossEnum.data1, Integer.class);
			int numHelpAwards = data.getObject(CrossEnum.data2, Integer.class);
			int typeByID = data.getObject(CrossEnum.data3, Integer.class);
			int[][] drops = data.getObject(CrossEnum.DATA4, int[][].class);
			Type jType = new TypeReference<List<Object[]>>() {
			}.getType();
			List<Object[]> dropTips = data.getObject(CrossEnum.DATA5, jType);
			List<Object[]> dropChatTips = data.getObject(CrossEnum.DATA6, jType);
			Hero hero = HeroCache.getHero(hid);
			if (hero != null) {
				int type = CrossSJMiJingFunction.getIns().getTypeByID(mjID);
				if (type == 1) {
					// 武将任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_50, 1);
				} else if (type == 3) {
					// 宝物任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_51, 1);
				} else if (type == 4) {
					// 天书任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_52, 1);
				}
				CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
				if(mjID != -1) {
					Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
					miJingIDMap.remove( mjID-1);
					miJingIDMap.put( mjID, 0);
				}
				if(numHelpAwards != -1) {
					crossSJMiJing.setNumHelpAwards(crossSJMiJing.getNumHelpAwards() + 1);
					// 限定武将
					WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_7, 1);
				}
				if (typeByID != -1) {
					Integer nowNum  = crossSJMiJing.getSaoDangMap().get(typeByID);
					if(nowNum == null) {
						nowNum = 0;
					}
					crossSJMiJing.getSaoDangMap().put(typeByID, nowNum + 1);
				}
				if (drops != null) {
					UseAddUtil.add(hero, drops, SourceGoodConst.CROSS_S_J_MI_JING_TIAO_ZHAN,
							UseAddUtil.getDefaultMail(), true);
					if(numHelpAwards == -1) {
						// 犒赏三军(活动)
						WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_11, 1);
						// 犒赏三军(开服)
						WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_11, 1);
					}
				}
				if (dropTips != null) {
					// 弹出胜利界面
					GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
				}
				if (dropChatTips != null) {
					// 广播
					for (Object[] tempObj : dropChatTips) {
						long phid = (long) tempObj[0];
						String name = (String) tempObj[1];
						int equipID = (int) tempObj[2];
						int zid = CommonUtil.getZoneIdById(hid);
						if (GameProperties.zoneids.contains(zid)) {
							ChatManager.getIns().broadCast(ChatConst.CROSS_S_J_MI_JING_GET_RED_EQUIP,
									new Object[] { name, equipID });
						}
					}
				}
			}
			CrossSJMiJingFunction.getIns().sendRed(hero);
			LogTool.info("SJMJ.SaveBattleDataCL.hid:" + hid + " numHelpAwards:" + numHelpAwards + " hero:" + hero,
					this);
		} catch (Exception e) {
			LogTool.error(e, this, "SJMJ connEvent Exception!");
		}
	}
	
	/**
	 * 0点 子服同步数据到中央服
	 */
	public void saveBattleDataLC(Channel channel, CrossData data) {
		try {
			Long hid = data.getObject(CrossEnum.hid, Long.class);
			Map<Integer, Integer> miJingIDMap = data.getObject(CrossEnum.data1,
					new TypeReference<Map<Integer, Integer>>() {
					}.getType());
			int numHelpAwards = data.getObject(CrossEnum.data2, Integer.class);
			
			Map<Integer, Integer> saoDangMap = data.getObject(CrossEnum.data3,
					new TypeReference<Map<Integer, Integer>>() {
					}.getType());
			Hero hero = HeroCache.getHero(hid);
			if (hero != null) {
				CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
				if(crossSJMiJing==null) {
					return;
				}
				crossSJMiJing.setMiJingIDMap(miJingIDMap);
				crossSJMiJing.setNumHelpAwards(numHelpAwards);
				crossSJMiJing.setSaoDangMap(saoDangMap);
			}
//			CrossSJMiJingFunction.getIns().sendRed(hero);
			LogTool.info("SJMJ.saveBattleDataLC.hid:" + hid + " numHelpAwards:" + numHelpAwards + " hero:" + hero,
					this);
		} catch (Exception e) {
			LogTool.error(e, this, "SJMJ connEvent Exception!");
		}
	}

	/**
	 * 进入副本
	 */
	public void battleCL(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_S_J_MI_JING_REFLASH_BATTLE_LC;
		long hid = data.getObject(CrossEnum.hid, Long.class);
		boolean online = HeroFunction.getIns().isOnline(hid);
		if (!online) {
			return;
		}
		Hero hero = HeroCache.getHero(hid);
		// 每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE23);
	}

	/**
	 * 获得红色装备广播
	 */
	public void voiceRedEquipCL(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_S_J_MI_JING_VOICE_RED_EQUIP_LC;
		String name = data.getObject(CrossEnum.name, String.class);
		Integer equipID = data.getObject(CrossEnum.data1, Integer.class);
		ChatManager.getIns().broadCast(ChatConst.CROSS_S_J_MI_JING_GET_RED_EQUIP, new Object[] { name, equipID });
	}
}
