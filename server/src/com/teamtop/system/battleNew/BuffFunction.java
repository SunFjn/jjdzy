package com.teamtop.system.battleNew;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.battleNew.model.BuffInfo;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_buff_011;
import excel.struct.Struct_buff_011;

public class BuffFunction {

	private static BuffFunction buffFunction;

	private BuffFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BuffFunction getIns() {
		if (buffFunction == null) {
			buffFunction = new BuffFunction();
		}
		return buffFunction;
	}

	/**
	 * buff处理
	 * 
	 * @param hero
	 * @param buffId
	 */
	public void buffEffectHandle(int buffId, int lv, FinalFightAttr finalFightAttr, TeamMember member) {
		try {
			Map<Integer, Struct_buff_011> sysBuffMap = Config_buff_011.getIns().getMap();
			Struct_buff_011 buff_011 = sysBuffMap.get(buffId);
			if (buff_011 == null) {
				return;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			int cf = buff_011.getCf();
			int cd = buff_011.getCd();
			int[][] xiaoguo = buff_011.getXiaoguo();// 效果
			int[][] cz = buff_011.getCz();// 效果成长
			int cz1 = buff_011.getCz1();// 概率成长
			int gl = buff_011.getGl();// 概率
			int shijian = buff_011.getShijian();// 持续时间
			int sjcz = buff_011.getSjcz();// 时间成长
			int totalShijian = shijian + sjcz * lv;
			int buffPercent = gl;
			long cdEndTime = currentTime + cd;
			long effectEndTime = currentTime + totalShijian;
			// 触发类型
			if (cf == 1) {

			}
			if (lv > 0) {
				buffPercent = gl + cz1 * lv;
			}
			int random = RandomUtil.getRandomNumInAreas(1, 100000);
			if (random > buffPercent) {
				return;
			}
			Map<Integer, BuffInfo> buffMap = member.getBuffMap();
			if (buff_011.getType() == 2) {// 复活
				if (buffMap.containsKey(buff_011.getID())) {
					return;
				}
				if (lv > 0) {
					int[][] allcz = CommonUtil.copyArrayAndNum(cz, lv, 1);
					int[][] arrayPlusArrays = CommonUtil.arrayPlusArrays(xiaoguo, allcz);
					long hpMax = finalFightAttr.getHpMax();
					long reliveHp = hpMax * arrayPlusArrays[0][1] / 100000;
					finalFightAttr.setHp(reliveHp);
				}
			}
			if (lv > 0) {
				if (buff_011.getType() == 1) {// 属性类型
					int[][] allcz = CommonUtil.copyArrayAndNum(cz, lv, 1);
					int[][] arrayPlusArrays = CommonUtil.arrayPlusArrays(xiaoguo, allcz);
					member.getBuffTempAttrMap().put(buffId, arrayPlusArrays);
				}
			}
			BuffInfo bInfo = new BuffInfo();
			bInfo.setBuffId(buffId);
			bInfo.setCdEndTime(cdEndTime);
			bInfo.setEffectEndTime(effectEndTime);
			buffMap.put(buffId, bInfo);
			List<Object[]> data = new ArrayList<>();
			data.add(new Object[] { buffId, BattleNewConst.BUFF_STATE_START });
			List<Object[]> buffData = new ArrayList<>();
			long hid = member.getHid();
			buffData.add(new Object[] { hid, data.toArray() });

			LogTool.info("BuffFunction.sendCmd_3866 99, totalShijian=" + totalShijian + ", shijian=" + shijian, this);
			BattleNewSender.sendCmd_3866(hid, buffData.toArray());

		} catch (Exception e) {
			LogTool.error(e, BuffFunction.class, member.getHid(), member.getName(), "BuffFunction buffEffectHandle");
		}
	}

	/**
	 * 检测buff处理
	 * @param currentTime
	 * @param team
	 */
	public void checkBuffHandle(long currentTime, Team team) {
		try {
			Map<Integer, Struct_buff_011> sysBuffMap = Config_buff_011.getIns().getMap();
			Map<Long, TeamMember> members = team.getMembers();
			for (TeamMember member : members.values()) {
				Map<Integer, BuffInfo> buffMap = member.getBuffMap();
				Map<Integer, int[][]> buffTempAttrMap = member.getBuffTempAttrMap();
				Iterator<Entry<Integer, BuffInfo>> buffIterator = buffMap.entrySet().iterator();
				Entry<Integer, BuffInfo> entry = null;
				Struct_buff_011 buff_011 = null;
				int buffId = 0;
				long effectEndTime = 0;
				int[][] xiaoguo = null;
				for (; buffIterator.hasNext();) {
					entry = buffIterator.next();
					buffId = entry.getKey();
					BuffInfo info = entry.getValue();
					effectEndTime = info.getEffectEndTime();
					buff_011 = sysBuffMap.get(buffId);
					xiaoguo = buff_011.getXiaoguo();
					if (buff_011.getType() == 2) {
						continue;
					}
					if (currentTime > effectEndTime) {
						buffIterator.remove();
						buffTempAttrMap.remove(buffId);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, BuffFunction.class, "BuffFunction checkBuffHandle");
		}
	}

	/**
	 * 检测buff处理
	 * @param currentTime
	 * @param team
	 */
	public void checkBuffHandleMember(long currentTime, TeamMember member) {
		try {
			Map<Integer, Struct_buff_011> sysBuffMap = Config_buff_011.getIns().getMap();
			Map<Integer, BuffInfo> buffMap = member.getBuffMap();
			Map<Integer, int[][]> buffTempAttrMap = member.getBuffTempAttrMap();
			Iterator<Entry<Integer, BuffInfo>> buffIterator = buffMap.entrySet().iterator();
			Entry<Integer, BuffInfo> entry = null;
			Struct_buff_011 buff_011 = null;
			int buffId = 0;
			long effectEndTime = 0;
			int[][] xiaoguo = null;
			for (; buffIterator.hasNext();) {
				entry = buffIterator.next();
				buffId = entry.getKey();
				BuffInfo info = entry.getValue();
				effectEndTime = info.getEffectEndTime();
				buff_011 = sysBuffMap.get(buffId);
				xiaoguo = buff_011.getXiaoguo();
				if (buff_011.getType() == 2) {
					continue;
				}
				if (currentTime > effectEndTime) {
					buffIterator.remove();
					buffTempAttrMap.remove(buffId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, BuffFunction.class, "BuffFunction checkBuffHandleMember");
		}
	}

	/**
	 * 获取临时属性
	 * @param member
	 * @return
	 */
	public int[][] getBuffTempAttr(TeamMember member) {
		try {
			int[][] myTempAttr = new int[0][];
			if (member == null) {
				return myTempAttr;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			Map<Integer, BuffInfo> buffMap = member.getBuffMap();
			Map<Integer, int[][]> buffTempAttrMap = member.getBuffTempAttrMap();
			for (int buffId : buffMap.keySet()) {
				BuffInfo buffInfo = buffMap.get(buffId);
				if (currentTime < buffInfo.getEffectEndTime()) {
					int[][] attr = buffTempAttrMap.get(buffId);
					if (attr == null) {
						continue;
					}
					myTempAttr = CommonUtil.arrayPlusArrays(myTempAttr, attr);
				}
			}
			return myTempAttr;
		} catch (Exception e) {
			LogTool.error(e, BuffFunction.class, "BuffFunction getBuffTempAttr");
		}
		return null;
	}

}
