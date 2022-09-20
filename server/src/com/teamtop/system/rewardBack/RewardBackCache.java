package com.teamtop.system.rewardBack;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.battleVixens.BattleVixensConst;
import com.teamtop.system.boss.countryBoss.CountryBossConst;
import com.teamtop.system.boss.personalBoss.PersonalBossConst;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.materialFuben.MaterialFubenConst;
import com.teamtop.system.rewardBack.imp.BattleVixensRewardBackImp;
import com.teamtop.system.rewardBack.imp.CountryBossRewardBackImp;
import com.teamtop.system.rewardBack.imp.CrossBossRewardBackImp;
import com.teamtop.system.rewardBack.imp.CrossSJMiJingRewardBackImp;
import com.teamtop.system.rewardBack.imp.CrossTeamFubenRewardBackImp;
import com.teamtop.system.rewardBack.imp.MaterialFubenRewardBackImp;
import com.teamtop.system.rewardBack.imp.PersonalBossRewardBackImp;
import com.teamtop.system.rewardBack.imp.RebornFBRewardBackImp;
import com.teamtop.system.rewardBack.imp.RunningManRewardBackImp;

import excel.config.Config_rewardback_270;
import excel.struct.Struct_rewardback_270;

public class RewardBackCache extends AbsServerEvent {
	/** 奖励找回表配置 第一层key：所属系统id 第二层key：子副本id */
	private static Map<Integer, Map<Integer, Struct_rewardback_270>> configMap = new HashMap<>();
	/** 奖励找回各系统实现缓存 */
	private static Map<Integer, RewardBackAbs> rewardBackAbsMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_rewardback_270>> getConfigMap() {
		return configMap;
	}

	public static Map<Integer, RewardBackAbs> getRewardBackAbsMap() {
		return rewardBackAbsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		rewardBackAbsMap.put(PersonalBossConst.SysId, new PersonalBossRewardBackImp());
		rewardBackAbsMap.put(SystemIdConst.FUN_CROSS_BOSS_MH, new CrossBossRewardBackImp());
		rewardBackAbsMap.put(MaterialFubenConst.SYSID, new MaterialFubenRewardBackImp());
		rewardBackAbsMap.put(BattleVixensConst.SysId, new BattleVixensRewardBackImp());
		rewardBackAbsMap.put(SystemIdConst.RUNNINGMAN, new RunningManRewardBackImp());
		rewardBackAbsMap.put(SystemIdConst.FUN_CROSS_TEAM_FU_BEN, new CrossTeamFubenRewardBackImp());
		rewardBackAbsMap.put(SystemIdConst.CROSS_S_J_MI_JING, new CrossSJMiJingRewardBackImp());
		rewardBackAbsMap.put(CountryBossConst.SYS_ID, new CountryBossRewardBackImp());
		rewardBackAbsMap.put(SystemIdConst.REBORN_FB, new RebornFBRewardBackImp());
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configMap.clear();
		List<Struct_rewardback_270> sortList = Config_rewardback_270.getIns().getSortList();
		for (Struct_rewardback_270 struct_rewardback_270 : sortList) {
			int sysId = struct_rewardback_270.getSys();
			Map<Integer, Struct_rewardback_270> map = configMap.get(sysId);
			if (map == null) {
				map = new HashMap<>();
				configMap.put(sysId, map);
			}
			map.put(struct_rewardback_270.getFb(), struct_rewardback_270);
		}
	}

}
