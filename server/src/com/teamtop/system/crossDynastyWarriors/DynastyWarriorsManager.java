package com.teamtop.system.crossDynastyWarriors;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossDynastyWarriors.cross.DynastyWarriorsCrossType;
import com.teamtop.system.crossDynastyWarriors.model.DynastyWarriorsModel;
import com.teamtop.system.crossDynastyWarriors.model.PondData;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.godWeapon.GodWeapon;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_doublereward_230;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_doublereward_230;
import io.netty.channel.Channel;

/**
 * 三国无双
 * 
 * @author hzp
 *
 */
public class DynastyWarriorsManager {

	private static DynastyWarriorsManager dynastyWarriorsManager;

	private DynastyWarriorsManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized DynastyWarriorsManager getIns() {
		if (dynastyWarriorsManager == null) {
			dynastyWarriorsManager = new DynastyWarriorsManager();
		}
		return dynastyWarriorsManager;
	}

	/**
	 * 打开三国无双界面
	 * 
	 * @param hero
	 */
	public void openDynastyWarriors(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			DynastyWarriorsModel model = hero.getDynastyWarriorsModel();
			if (model == null) {
				return;
			}
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			Map<Integer, Long> betMap = model.getBetMap();
			Map<Integer, List<List<Long>>> matchMap = dwCache.getMatchMap();
			Map<Long, CrossHeroBaseModel> figtherMap = dwCache.getFighterMap();
			List<Object[]> matchData = new ArrayList<>();
			int betState = 0;
			for (int i = DynastyWarriorsConst.ROUND_1; i <= DynastyWarriorsConst.ROUND_5; i++) {
				List<List<Long>> list = matchMap.get(i);
				if (list == null) {
					continue;
				}
				List<Object[]> groupData = new ArrayList<>();
				int groupId = 1;
				for (List<Long> group : list) {
					List<Object[]> figtherData = new ArrayList<>();
					for (long id : group) {
						betState = 0;
//						CrossHeroBaseModel chb = figtherMap.get(id);
//						figtherData.add(new Object[] { id, chb.getNameZoneid(), chb.getIcon(), chb.getFrame() });
						if (betMap.containsKey(i)) {
							long betHid = betMap.get(i);
							if (id == betHid) {
								betState = 1;
							}
						}
						figtherData.add(new Object[] { id, betState });
					}
					groupData.add(new Object[] { groupId, figtherData.toArray() });
					groupId++;
				}
				matchData.add(new Object[] { i, groupData.toArray() });
			}
			List<Object[]> playerData = new ArrayList<>();
			Iterator<CrossHeroBaseModel> iterator = figtherMap.values().iterator();
			for (; iterator.hasNext();) {
				CrossHeroBaseModel chb = iterator.next();
				playerData.add(new Object[] { chb.getId(), chb.getNameZoneid(), chb.getIcon(), chb.getFrame(),
						chb.getOfficial(), chb.getTotalStrength() });
			}
			int round = dwCache.getActRound();
			int state = dwCache.getActState();
			List<List<Long>> list = matchMap.get(DynastyWarriorsConst.ROUND_5);
			long topId = 0;
			String topName = "";
			int topIcon = 0;
			int topFrame = 0;
			if (list != null) {
				topId = list.get(0).get(0);
				CrossHeroBaseModel chb = figtherMap.get(topId);
				topName = chb.getNameZoneid();
				topIcon = chb.getIcon();
				topFrame = chb.getFrame();
			}
			int leftTime = 0;
			if (state == DynastyWarriorsConst.READY_STATE) {
				leftTime = getLeftTime();
			}
			DynastyWarriorsSender.sendCmd_1832(hid, round, state, leftTime, matchData.toArray(), playerData.toArray(),
					topId, topName, topIcon, topFrame);
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsManager.class, hero.getId(), hero.getName(), "DynastyWarriors ");
		}
	}

	private int getLeftTime() {
		int startTime = TimeDateUtil.getOneTime(0, DynastyWarriorsConst.StartTime_Hour,
				DynastyWarriorsConst.StartTime_Minute, 0);
		int currentTime = TimeDateUtil.getCurrentTime();
		int partId = CrossCache.getlocalPartId();
		DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
		int stateEnd = startTime + DynastyWarriorsConst.ROUND_TIME * (dwCache.getActRound() - 1)
				+ DynastyWarriorsConst.READY_TIME;
		int leftTime = stateEnd - currentTime;
		return leftTime;
	}

	/**
	 * 下注
	 * 
	 * @param hero
	 * @param beBetId
	 */
	public void bet(Hero hero, long beBetId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			DynastyWarriorsModel model = hero.getDynastyWarriorsModel();
			if (model == null) {
				return;
			}
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			int round = dwCache.getActRound();
			Map<Integer, Long> betMap = model.getBetMap();
			Long alBetId = betMap.get(round);
			if (alBetId != null) {
				// 本轮已经下注过
				DynastyWarriorsSender.sendCmd_1834(hid, 0, 1);
				return;
			}
			int state = dwCache.getActState();
			if (state == DynastyWarriorsConst.FIGHT_STATE) {
				// 准备期才能下注
				DynastyWarriorsSender.sendCmd_1834(hid, 0, 2);
				return;
			}
			int cost = Config_xtcs_004.getIns().get(DynastyWarriorsConst.BET_COST).getNum();
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, cost)) {
				// 元宝不足
				DynastyWarriorsSender.sendCmd_1834(hid, 0, 3);
				return;
			}
			UseAddUtil.use(hero, GameConst.YUANBAO, cost, SourceGoodConst.DYNASTY_WARRIORS_BET_COST, true);
			betMap.put(round, beBetId);
			Map<Long, Set<Long>> roundBetMap = dwCache.getBetMap().get(round);
			roundBetMap.get(beBetId).add(hid);
			DynastyWarriorsSender.sendCmd_1834(hid, 1, beBetId);
			LogTool.info(hid, hero.getName(), "DynastyWarriorsManager bet, beBetId=" + beBetId + ", round=" + round,
					DynastyWarriorsManager.class);
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsManager.class, hero.getId(), hero.getName(), "DynastyWarriors ");
		}
	}

	/**
	 * 获取奖池奖励
	 * 
	 * @param hero
	 * @param pondId
	 */
	public void getPondAward(final Hero hero, final int pondId) {
		if (hero == null) {
			return;
		}
		try {
			final long hid = hero.getId();
			DynastyWarriorsModel model = hero.getDynastyWarriorsModel();
			if (model == null) {
				return;
			}
			Struct_doublereward_230 pondAwardData = Config_doublereward_230.getIns().get(pondId);
			if (pondAwardData == null) {
				return;
			}
			int partId = CrossCache.getlocalPartId();
			final DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			if (pondId >= dwCache.getActRound()) {
				// 未到对应阶段不能领取
				DynastyWarriorsSender.sendCmd_1838(hid, 0, 1, 0);
				return;
			}
			final Map<Integer, Integer> pondAward = model.getPondAward();
			if (pondAward.containsKey(pondId)) {
				// 已经领取过
				DynastyWarriorsSender.sendCmd_1838(hid, 0, 2, 0);
				return;
			}
			PondData pondData = dwCache.getPondMap().get(pondId);
			if (pondData.getPlayerNum() >= pondAwardData.getNum()) {
				// 已被全部领取
				DynastyWarriorsSender.sendCmd_1838(hid, 0, 3, 0);
				return;
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(DynastyWarriorsCrossType.PONDID, pondId);
			crossData.putObject(DynastyWarriorsCrossType.HID, hid);
			crossData.putObject(DynastyWarriorsCrossType.NAME, hero.getNameZoneid());
			NettyWrite.writeXData(crossChannel, CrossConst.DYNASTYWARRIORS_SG_GETPONDAWARD, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					Integer isSend = crossData.getObject(DynastyWarriorsCrossType.IS_SEND, Integer.class);
					Integer pondMoney = crossData.getObject(DynastyWarriorsCrossType.PONDAWARD, Integer.class);
					if (isSend!=null&&isSend == 1) {
						Type type = new TypeReference<Map<Integer, PondData>>() {}.getType();
						Map<Integer, PondData> pondData = crossData.getObject(DynastyWarriorsCrossType.POND_DATA, type);
						dwCache.setPondMap(pondData);
						openPond(hero);
					}
					int crossResult = crossData.getObject(DynastyWarriorsCrossType.GET_POND_RESULT, Integer.class);
					if (crossResult == 1) {
						// 已被全部领取
						DynastyWarriorsSender.sendCmd_1838(hid, 0, 3, 0);
						return;
					}
					if (pondMoney != null && pondMoney > 0) {
						UseAddUtil.add(hero, GameConst.YUANBAO, pondMoney, SourceGoodConst.DYNASTY_WARRIORS_POND_AWARD,
								true);
						pondAward.put(pondId, pondMoney);
					}
					DynastyWarriorsSender.sendCmd_1838(hid, 1, pondId, pondMoney);
					LogTool.info(hid, hero.getName(), "DynastyWarriorsManager getPondAward pondId="+pondId+", pondMoney="+pondMoney, DynastyWarriorsManager.class);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsManager.class, hero.getId(), hero.getName(), "DynastyWarriors ");
		}
	}

	/**
	 * 打开奖池界面
	 * 
	 * @param hero
	 */
	public void openPond(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			DynastyWarriorsModel model = hero.getDynastyWarriorsModel();
			if (model == null) {
				return;
			}
			Map<Integer, Integer> pondAward = model.getPondAward();
			int partId = CrossCache.getlocalPartId();
			Map<Integer, PondData> pondMap = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId).getPondMap();
			if(pondMap.size()==0) {
				return;
			}
			List<Object[]> pondDataList = new ArrayList<>();
			List<Struct_doublereward_230> sortList = Config_doublereward_230.getIns().getSortList();
			int size = sortList.size();
			Struct_doublereward_230 pondAwardData = null;
			PondData pondData = null;
			Integer myMoney = null;
			for (int i = 0; i < size; i++) {
				pondAwardData = sortList.get(i);
				myMoney = pondAward.get(pondAwardData.getId());
				pondData = pondMap.get(pondAwardData.getId());
				if (myMoney == null) {
					myMoney = 0;
				}
				String name = pondData.getName();
				pondDataList.add(new Object[] { pondData.getId(), pondData.getPlayerNum(), myMoney,
						pondData.getLuckyId(), name==null?"":name, pondData.getMoney() });
			}
			DynastyWarriorsSender.sendCmd_1836(hid, pondDataList.toArray());
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsManager.class, hero.getId(), hero.getName(), "DynastyWarriors ");
		}
	}
	
	/**
	 * 查看录像
	 */
	public void getVideoData(Hero hero, int round, int groupId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			DynastyWarriorsModel model = hero.getDynastyWarriorsModel();
			if (model == null) {
				return;
			}
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			Map<Integer, Map<Integer, List<CrossHeroBaseModel>>> matchVideoMap = dwCache.getMatchVideoMap();
			Map<Integer, List<CrossHeroBaseModel>> map = matchVideoMap.get(round);
			if(map==null) {
				return;
			}
			List<CrossHeroBaseModel> list = map.get(groupId);
			List<Object[]> datas = new ArrayList<>();
			int size = list.size();
			CrossHeroBaseModel chbModel = null;
			for(int i=0;i<size;i++) {
				chbModel = list.get(i);
				Map<Integer, SkillInfo> skillMap = chbModel.getSkill().getSkillMap();
				List<Object[]> attrData = new ArrayList<Object[]>();
				FinalFightAttr attr = chbModel.getFinalFightAttr();
				// 技能数据
				List<Object[]> skillData = new ArrayList<Object[]>();
				for (Entry<Integer, SkillInfo> entry : skillMap.entrySet()) {
					int index = entry.getKey();
					SkillInfo skillInfo = entry.getValue();
					skillData.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel() });
				}
				int fashionID = 0;
				// L:唯一id，第一个跟hid一样B:武将类型I:生命I:内力I:攻击I:物防I:法防I:暴击率I:抗暴率I:暴击伤害I:伤害加成I:伤害减免I:pvp伤害加成I:pvp伤害减免I:移动速度I:战力[S:技能等级S:技能觉醒等级]技能数据
				List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(attr);
				int godWeapon=0;
				GodWeapon godWeaponData = chbModel.getGodWeapon();
				if(godWeaponData != null) {
					int type = chbModel.getJob();
					if(type > 1000) {
						type /= 1000;
					}
					if(godWeaponData.getWeaponIdByWuJiang().get(type)!= null) {
						godWeapon = godWeaponData.getWeaponIdByWuJiang().get(type).getWearWeapon();
					}
				}
				attrData.add(new Object[] { attr.getUid(), chbModel.getJob(), godWeapon, attrSendData.toArray(), skillData.toArray(), fashionID });
				datas.add(new Object[] {chbModel.getId(), chbModel.getNameZoneid(), attrData.toArray(), chbModel.getTotalStrength()});
				HeroFunction.getIns().sendBattleHeroAttr(hero, chbModel);
			}
			DynastyWarriorsSender.sendCmd_1842(hid, datas.toArray());
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsManager.class, hero.getId(), hero.getName(), "DynastyWarriors getVideoData");
		}
	}

}
