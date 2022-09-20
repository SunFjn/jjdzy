package com.teamtop.system.crossMine;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossMine.model.CrossMine;
import com.teamtop.system.crossMine.model.CrossMineAward;
import com.teamtop.system.crossMine.model.CrossMineJoiner;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kfkz_275;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_kfkz_275;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class CrossMineIO {

	private static CrossMineIO ins;

	public static synchronized CrossMineIO getIns() {
		if (ins == null) {
			ins = new CrossMineIO();
		}
		return ins;
	}

	public void CRLgetUIinfo(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_MINE_OPENUI_LC;
			long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
			long helpHid = crossData.getObject(CrossMineEnum.HelpMinerId, Long.class);
			int partId = CrossCache.getPartId(channel);
			CrossMineJoiner crossMineJoiner = crossData.getObject(CrossMineEnum.CrossMineJoiner, CrossMineJoiner.class);
			crossData.finishGet();

			ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
			CrossMine crossMine = mineMap.get(hid);
			CrossMine helpcrossMine = mineMap.get(helpHid);
			if (crossMine == null) {
				// 第一次打开 添加矿
				crossMine = CrossMineFunction.getIns().addCrossMine(crossMineJoiner);
			} else {
				// 还没开始开采刷新矿主战力
				if (crossMine.getStartTime() == -1) {
					CrossMineJoiner myJoiner = null;
					for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
						if (joiner.getHid() == hid) {
							// 刷新矿主战力
							myJoiner = joiner;
							break;
						}
					}
					if (myJoiner != null) {
						CrossMineFunction.getIns().copyToJoiner(myJoiner, crossMineJoiner);
					}
				}

				// fix领取不了奖励
				// 重置矿信息
				boolean isIn = false;
				for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
					if (joiner.getHid() == hid) {
						isIn = true;
						break;
					}
				}
				if(!isIn) {
					// 没有矿主信息
					if(crossMine.getStartTime() == -2) {
						ProbabilityEventModel model = new ProbabilityEventModel();
						for (Struct_kfkz_275 config : Config_kfkz_275.getIns().getSortList()) {
							model.addProbabilityEvent(config.getGl(), config.getId());
						}
						int newPz = (int) ProbabilityEventUtil.getEventByProbability(model);
						// 刷新矿状态
						crossMine.setStartTime(-1);
						crossMine.getMinersInfo().clear();
						crossMineJoiner.setRewards(new ArrayList<>());
						crossMineJoiner.setStartTime(-1);
						crossMine.getMinersInfo().add(crossMineJoiner);
						crossMine.setFightTimes(0);
						crossMine.setStealTimes(0);
						crossMine.setMinerNum(1);
						crossMine.setMineId(newPz);
					}
				}
			}
			crossMine.getMinersInfo().removeAll(Collections.singleton(null));
			crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
			if (helpcrossMine != null) {
				helpcrossMine.getMinersInfo().removeAll(Collections.singleton(null));
				crossData.putObject(CrossMineEnum.HelpCrossMineInfo, helpcrossMine);
				
			}
			crossData.putObject(CrossMineEnum.CrossTime, TimeDateUtil.getCurrentTimeInMillis());
			crossData.putObject(CrossMineEnum.TomorrowCrossTime, TimeDateUtil.getTomorrowZeroTime());

			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLinvitation(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MINE_INVITATION_LC;
		long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		CrossMine crossMine = mineMap.get(hid);
		if (crossMine == null) {
			// 矿藏数据不存在
			crossData.putObject(CrossMineEnum.State, 2);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		crossData.putObject(CrossMineEnum.State, 1);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());

		// 将邀请信息推送到其他子服
		crossData.putObject(CrossMineEnum.Hid, hid);
		crossData.putObject(CrossMineEnum.Name, crossMine.getName());
		crossData.putObject(CrossMineEnum.MineId, crossMine.getMineId());

		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<Channel, List<Integer>> next = iterator.next();
			Channel c = next.getKey();
			NettyWrite.writeXData(c, CrossConst.CROSS_MINE_INVITATION_CL, crossData);
		}
	}

	public void CRLjoinMine(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MINE_JOIN_MINE_LC;
		long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
		CrossMineJoiner crossMineJoiner = crossData.getObject(CrossMineEnum.CrossMineJoiner, CrossMineJoiner.class);
		crossData.finishGet();

		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		CrossMine crossMine = mineMap.get(hid);
		if (crossMine == null) {
			// 矿藏数据不存在
			crossData.putObject(CrossMineEnum.State, 2);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (crossMine.getMinersInfo().size() >= 3) {
			// 满人
			crossData.putObject(CrossMineEnum.State, 3);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (crossMine.getStartTime() == -2) {
			// 已采集完
			crossData.putObject(CrossMineEnum.State, 4);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		crossMine.getMinersInfo().add(crossMineJoiner);

		if (crossMine.getStartTime() != -1) {
			// 设置第一份奖励
			Struct_kfkz_275 config = Config_kfkz_275.getIns().get(crossMine.getMineId());
			if (config == null) {
				return;
			}
			int[][] otherRewards = config.getReward1();
			crossMineJoiner.setRewards(new ArrayList<>());
			for (int j = 0; j < otherRewards.length; j++) {
				CrossMineAward award = new CrossMineAward();
				award.setAwardType(otherRewards[j][0]);
				award.setAwardId(otherRewards[j][1]);
				award.setCount(otherRewards[j][2]);
				award.setLostNum(0);
				crossMineJoiner.getRewards().add(award);
			}
			crossMineJoiner.setStartTime(TimeDateUtil.getCurrentTimeInMillis());
		}

		crossMine.setMinerNum(crossMine.getMinerNum() + 1);

		crossData.putObject(CrossMineEnum.State, 0);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());

		// 用于推送新消息
		List<Long> pushIdList = new ArrayList<>();
		for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
			pushIdList.add(joiner.getHid());
		}
		// 推送信息通知有新矿工加入
		crossData.finishGet();
		crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
		CrossMineFunction.getIns().pushMineInfo(pushIdList, 2, crossMineJoiner.getName(), crossData);
	}

	public void CRLrefreshMine(Channel channel, CrossData crossData) {
		long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
		int type = crossData.getObject(CrossMineEnum.Type, Integer.class);
		crossData.finishGet();
		
		int cmd = CrossConst.CROSS_MINE_REFRESH_MINE_LC;
		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		CrossMine crossMine = mineMap.get(hid);
		if (crossMine == null) {
			// 矿藏数据不存在
			crossData.putObject(CrossMineEnum.State, 1);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		Struct_kfkz_275 config = Config_kfkz_275.getIns().get(crossMine.getMineId());
		if (config == null) {
			crossData.putObject(CrossMineEnum.State, 2);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		if (config.getId() == 5) {
			// 最高品质
			crossData.putObject(CrossMineEnum.State, 3);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		if (type == 1) {
			crossMine.setMineId(5);
			crossMine.setYz(0);
		} else {
			ProbabilityEventModel model = new ProbabilityEventModel();
			for (int[] up : config.getUp()) {
				model.addProbabilityEvent(up[1], up[0]);
			}
			int mineId = (int) ProbabilityEventUtil.getEventByProbability(model);
			if(mineId == crossMine.getMineId()) {
				// 品质不变
				if(crossMine.getYz() >= config.getYz()) {
					// 变下一档品质
					if(mineId != 5) {
						mineId++;
					}
					crossMine.setYz(0);
				}else {
					crossMine.setYz(crossMine.getYz() + config.getAddyz());
				}
			}else {
				crossMine.setYz(0);
			}
			crossMine.setMineId(mineId);
		}
		crossData.putObject(CrossMineEnum.MineId, crossMine.getMineId());
		crossData.putObject(CrossMineEnum.State, 0);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());

		// 用于推送新消息
		List<Long> pushIdList = new ArrayList<>();
		for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
			pushIdList.add(joiner.getHid());
		}
		// 推送信息通知刷新品质
		crossData.finishGet();
		crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
		CrossMineFunction.getIns().pushMineInfo(pushIdList, 4, crossMine.getName(), crossData);
	}

	public void CRLstartMine(Channel channel, CrossData crossData) {
		long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
		CrossMineJoiner crossMineJoiner = crossData.getObject(CrossMineEnum.CrossMineJoiner, CrossMineJoiner.class);
		crossData.finishGet();
		
		int cmd = CrossConst.CROSS_MINE_START_MINE_LC;
		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		CrossMine crossMine = mineMap.get(hid);
		if (crossMine == null) {
			// 矿藏数据不存在
			crossData.putObject(CrossMineEnum.State, 1);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (crossMine.getStartTime() == -2) {
			// 奖励未领取
			crossData.putObject(CrossMineEnum.State, 2);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (crossMine.getStartTime() != -1) {
			// 正在开采中
			crossData.putObject(CrossMineEnum.State, 3);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		crossMine.setStartTime(TimeDateUtil.getCurrentTimeInMillis());
		crossMine.setYz(0);
		// 设置第一份奖励
		Struct_kfkz_275 config = Config_kfkz_275.getIns().get(crossMine.getMineId());
		if (config == null) {
			return;
		}
		int[][] rewards = config.getReward();
		int[][] otherRewards = config.getReward1();
		
		CrossMineJoiner myJoiner = null;
		for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
			if (joiner.getHid() == hid) {
				// 刷新矿主战力
				myJoiner = joiner;
				break;
			}
		}
		if (myJoiner != null) {
			CrossMineFunction.getIns().copyToJoiner(myJoiner, crossMineJoiner);
		}
		for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
			joiner.setStartTime(TimeDateUtil.getCurrentTimeInMillis());
			if (joiner.getHid() == crossMine.getHid()) {
				// 矿主
				joiner.setRewards(new ArrayList<>());
				for (int j = 0; j < rewards.length; j++) {
					CrossMineAward award = new CrossMineAward();
					award.setAwardType(rewards[j][0]);
					award.setAwardId(rewards[j][1]);
					award.setCount(rewards[j][2]);
					award.setLostNum(0);
					joiner.getRewards().add(award);
				}
			} else {
				joiner.setRewards(new ArrayList<>());
				for (int j = 0; j < otherRewards.length; j++) {
					CrossMineAward award = new CrossMineAward();
					award.setAwardType(otherRewards[j][0]);
					award.setAwardId(otherRewards[j][1]);
					award.setCount(otherRewards[j][2]);
					award.setLostNum(0);
					joiner.getRewards().add(award);
				}
			}
		}

		crossData.putObject(CrossMineEnum.State, 0);
		crossData.putObject(CrossMineEnum.mineId, crossMine.getMineId());
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());

		// 用于推送新消息
		List<Long> pushIdList = new ArrayList<>();
		for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
			pushIdList.add(joiner.getHid());
		}
		// 推送信息通知开始开采
		crossData.finishGet();
		crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
		CrossMineFunction.getIns().pushMineInfo(pushIdList, 1, crossMine.getName(), crossData);
	}

	public void CRLkickMiner(Channel channel, CrossData crossData) {
		long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
		long minerId = crossData.getObject(CrossMineEnum.MinerId, Long.class);
		crossData.finishGet();
		
		int cmd = CrossConst.CROSS_MINE_KICK_MINER_LC;
		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		CrossMine crossMine = mineMap.get(hid);
		if (crossMine == null) {
			// 矿藏数据不存在
			crossData.putObject(CrossMineEnum.State, 1);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (crossMine.getStartTime() != -1) {
			// 未开始开采才能踢人
			crossData.putObject(CrossMineEnum.State, 2);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		CrossMineJoiner joiner = null;
		for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
			if (miner.getHid() == minerId) {
				joiner = miner;
				break;
			}
		}
		if (joiner == null) {
			// 矿工不存在
			crossData.putObject(CrossMineEnum.State, 3);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		crossMine.getMinersInfo().remove(joiner);
		crossMine.setMinerNum(crossMine.getMinerNum() - 1);

		crossData.putObject(CrossMineEnum.State, 0);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());

		// 用于推送新消息
		List<Long> pushIdList = new ArrayList<>();
		for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
			pushIdList.add(miner.getHid());
		}
		// 矿主踢人特殊处理
		pushIdList.add(minerId);
		// 推送信息通知矿主踢人
		crossData.finishGet();
		crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
		CrossMineFunction.getIns().pushMineInfo(pushIdList, 3, joiner.getName(), crossData);
	}

	public void CRLleaveMine(Channel channel, CrossData crossData) {
		long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
		long helpMinerId = crossData.getObject(CrossMineEnum.HelpMinerId, Long.class);
		crossData.finishGet();
		
		int cmd = CrossConst.CROSS_MINE_LEAVE_MINE_LC;
		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		CrossMine crossMine = mineMap.get(helpMinerId);
		if (crossMine == null) {
			// 矿藏数据不存在
			crossData.putObject(CrossMineEnum.State, 1);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		if (crossMine.getStartTime() != -1) {
			// 未开始开采才能离开
			crossData.putObject(CrossMineEnum.State, 2);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		CrossMineJoiner joiner = null;
		for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
			if (miner.getHid() == hid) {
				joiner = miner;
				break;
			}
		}
		if (joiner == null) {
			// 矿工不存在
			crossData.putObject(CrossMineEnum.State, 3);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		crossMine.getMinersInfo().remove(joiner);
		crossMine.setMinerNum(crossMine.getMinerNum() - 1);

		crossData.putObject(CrossMineEnum.State, 0);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());

		// 用于推送新消息
		List<Long> pushIdList = new ArrayList<>();
		for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
			pushIdList.add(miner.getHid());
		}
		// 自己离开特殊处理
		pushIdList.add(hid);
		// 推送信息通知主动离开
		crossData.finishGet();
		crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
		CrossMineFunction.getIns().pushMineInfo(pushIdList, 7, joiner.getName(), crossData);
	}

	public void CRLgotoMine(Channel channel, CrossData crossData) {
		Type type = new TypeReference<List<Long>>() {
		}.getType();
		List<Long> mineIdList = crossData.getObject(CrossMineEnum.MineIdList, type);
		crossData.finishGet();

		int cmd = CrossConst.CROSS_MINE_GOTO_MINE_LC;
		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		List<CrossMine> list = new ArrayList<>();
		for (long mineId : mineIdList) {
			CrossMine crossMine = mineMap.get(mineId);
			if (crossMine != null) {
				if (crossMine.getFightTimes() < 3 || crossMine.getStealTimes() < 3) {
					list.add(crossMine);
				}
			}
		}
		crossData.putObject(CrossMineEnum.CrossMineInfos, list);
		crossData.putObject(CrossMineEnum.State, 0);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
	}

	public void CRLsearchMine(Channel channel, CrossData crossData) {
		try {			
			long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
			int belongZoneid = crossData.getObject(CrossMineEnum.belongZoneid, Integer.class);
			long helpMinerId = crossData.getObject(CrossMineEnum.HelpMinerId, Long.class);
			Type type = new TypeReference<List<Long>>() {
			}.getType();
			List<Long> mineIdList = crossData.getObject(CrossMineEnum.MineIdList, type);
			crossData.finishGet();
			List<CrossMine> list = CrossMineFunction.getIns().searchMine(hid, helpMinerId, mineIdList, belongZoneid);
			crossData.putObject(CrossMineEnum.CrossMineInfos, list);
			crossData.putObject(CrossMineEnum.State, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, this, "crossMine CRLsearchMine");
		}
	}

	public void CRLgetMineReward(Channel channel, CrossData crossData) {
		long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
		long mineId = crossData.getObject(CrossMineEnum.MineId, Long.class);
		crossData.finishGet();

		int cmd = CrossConst.CROSS_MINE_GET_AWARD_LC;
		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		CrossMine crossMine = mineMap.get(mineId);
		if (crossMine == null) {
			// 矿藏数据不存在
			crossData.putObject(CrossMineEnum.State, 2);
			crossData.putObject(CrossMineEnum.MineId, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (crossMine.getStartTime() != -2) {
			// 未开采完成
			crossData.putObject(CrossMineEnum.State, 3);
			crossData.putObject(CrossMineEnum.MineId, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		boolean isMyMiner = false;
		if (crossMine.getHid() == hid) {
			isMyMiner = true;
		}
		CrossMineJoiner joiner = null;
		for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
			if (miner.getHid() == hid) {
				joiner = miner;
				break;
			}
		}

		if (joiner == null) {
			// 数据错乱
			crossData.putObject(CrossMineEnum.State, 4);
			crossData.putObject(CrossMineEnum.MineId, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (isMyMiner) {
			// 矿主领奖励矿工发邮件
			ProbabilityEventModel model = new ProbabilityEventModel();
			for (Struct_kfkz_275 config : Config_kfkz_275.getIns().getSortList()) {
				model.addProbabilityEvent(config.getGl(), config.getId());
			}
			int newPz = (int) ProbabilityEventUtil.getEventByProbability(model);
			crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
			crossData.putObject(CrossMineEnum.State, 0);
			crossData.putObject(CrossMineEnum.MineId, newPz);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());

			// 用于推送新消息
			List<Long> pushIdList = new ArrayList<>();
			for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
				if (miner.getHid() != hid)
					pushIdList.add(miner.getHid());
			}
			// 推送信息通知主动离开
			crossData.finishGet();
			crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
			CrossMineFunction.getIns().pushMineInfo(pushIdList, 9, joiner.getName(), crossData);

			// 刷新矿状态
			crossMine.setStartTime(-1);
			crossMine.getMinersInfo().clear();
			joiner.setRewards(new ArrayList<>());
			joiner.setStartTime(-1);
			crossMine.getMinersInfo().add(joiner);
			crossMine.setFightTimes(0);
			crossMine.setStealTimes(0);
			crossMine.setMinerNum(1);
			crossMine.setMineId(newPz);
		} else {
			// 矿工领完奖励滚
			crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
			crossData.putObject(CrossMineEnum.State, 0);
			crossData.putObject(CrossMineEnum.MineId, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());

			crossMine.getMinersInfo().remove(joiner);
			// 用于推送新消息
			List<Long> pushIdList = new ArrayList<>();
			for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
				if (miner.getHid() != hid)
					pushIdList.add(miner.getHid());
			}
			// 推送信息通知主动离开
			crossData.finishGet();
			crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
			CrossMineFunction.getIns().pushMineInfo(pushIdList, 7, joiner.getName(), crossData);
		}

	}

	/**
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void CRLfightMine(Channel channel, CrossData crossData) {
		try {

			long fightMineid = crossData.getObject(CrossMineEnum.fightMineid, Long.class);
			CrossMineJoiner qianer = crossData.getObject(CrossMineEnum.CrossMineJoiner, CrossMineJoiner.class);
			long str = qianer.getStrength();

			int cmd = CrossConst.CROSS_MINE_FightMine;
			int partId = CrossCache.getPartId(channel);
			ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
			CrossMine fightMine = mineMap.get(fightMineid);
			CrossData crossData1 = new CrossData();
			if (fightMine == null) {
				crossData1.putObject(CrossMineEnum.fightRest, 2);
				NettyWrite.writeBlockCallback(channel, crossData1, crossData.getCallbackCmd());
				return;
			} else {
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(6603);
				if (fightMine.getFightTimes() >= struct_xtcs_004.getNum()) {
					crossData1.putObject(CrossMineEnum.fightRest, 1);
					NettyWrite.writeBlockCallback(channel, crossData1, crossData.getCallbackCmd());
					return;
				} else {
					crossData1.putObject(CrossMineEnum.fightRest, 0);
				}

				if (!CrossMineFunction.getIns().canGetAwards(1, fightMine)) {
					crossData1.putObject(CrossMineEnum.fightRest, 3);
					NettyWrite.writeBlockCallback(channel, crossData1, crossData.getCallbackCmd());
					return;
				}

				List<CrossMineJoiner> minersInfo = fightMine.getMinersInfo();
				long maxStrength = 0;
				int index = 0;
				for (int i = 0; i < minersInfo.size(); i++) {
					long strength = minersInfo.get(i).getStrength();
					if (strength > maxStrength) {
						maxStrength = strength;
						index = i;
					}
				}
				int rest = 0;
				Object[] rewards = new Object[] {};
				if (str > maxStrength) {
					rest = 1;
					// 赢了
					rewards = CrossMineFunction.getIns().getMineFightAwards(fightMine, fightMine.getMineId() == 5);
					crossData1.putObject(CrossMineEnum.battleRest, rest);

					fightMine.setFightTimes(fightMine.getFightTimes() + 1);
				} else {
					rest = 2;
					// 输了
					crossData1.putObject(CrossMineEnum.battleRest, rest);
				}
				CrossMineJoiner crossMineJoiner = minersInfo.get(index);
				crossData1.putObject(CrossMineEnum.CrossMineJoiner, crossMineJoiner);
				crossData1.putObject(CrossMineEnum.mineId, fightMine.getMineId());
				crossData1.putObject(CrossMineEnum.qiangReward, rewards);

				NettyWrite.writeBlockCallback(channel, crossData1, crossData.getCallbackCmd());

				CrossData crossData2 = new CrossData();
				crossData2.putObject(CrossMineEnum.battleRest, rest);
				crossData2.putObject(CrossMineEnum.qianger, qianer);
				crossData2.putObject(CrossMineEnum.isqianger, crossMineJoiner);
				crossData2.putObject(CrossMineEnum.qiangReward, rewards);
				crossData2.putObject(CrossMineEnum.mineId, fightMine.getMineId());

				for(CrossMineJoiner joiner : fightMine.getMinersInfo()) {
					crossData2.putObject(CrossMineEnum.fightMineid, joiner.getHid());
					ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
					int zoneid = CommonUtil.getZoneIdById(joiner.getHid());
					channel = zoneidToChannel.get(zoneid);
					NettyWrite.writeXData(channel, CrossConst.CROSS_MINE_NoticeFightMine, crossData2);
				}

				// 用于推送新消息
				List<Long> pushIdList = new ArrayList<>();
				for (CrossMineJoiner joiner : fightMine.getMinersInfo()) {
					pushIdList.add(joiner.getHid());
				}
				// 推送信息通知完成被抢
				crossData = new CrossData();
				crossData.putObject(CrossMineEnum.CrossMineInfo, fightMine);
				CrossMineFunction.getIns().pushMineInfo(pushIdList, 5, qianer.getName(), crossData);
			}

		} catch (Exception e) {
			LogTool.error(e, CrossMineIO.class, "CRLfightMine has wrong");
		}
	}

	public void CRLstealMine(Channel channel, CrossData crossData) {
		try {
			long stealMineNameHid = crossData.getObject(CrossMineEnum.Hid, Long.class);
			String stealMineName = crossData.getObject(CrossMineEnum.name, String.class);
			long goalHid = crossData.getObject(CrossMineEnum.stealMineId, Long.class);

			int cmd = CrossConst.CROSS_MINE_stealMine;
			int partId = CrossCache.getPartId(channel);
			ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
			CrossMine fightMine = mineMap.get(goalHid);
			crossData.finishGet();
			if (fightMine == null) {
				// stealRest,//顺手返回 0成功 1失败 2对方没有次数
				crossData.putObject(CrossMineEnum.stealRest, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			} else {
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(6604);
				if (fightMine.getStealTimes() >= struct_xtcs_004.getNum()) {
					crossData.putObject(CrossMineEnum.stealRest, 2);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}

				if (!CrossMineFunction.getIns().canGetAwards(2, fightMine)) {
					crossData.putObject(CrossMineEnum.stealRest, 3);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}

				fightMine.setStealTimes(fightMine.getStealTimes() + 1);

				Object[] rewards = CrossMineFunction.getIns().getMineStealAwards(fightMine, fightMine.getMineId() == 5);
				crossData.putObject(CrossMineEnum.stealRest, 0);
				crossData.putObject(CrossMineEnum.Hid, stealMineNameHid);
				crossData.putObject(CrossMineEnum.name, stealMineName);
				crossData.putObject(CrossMineEnum.stealReward, rewards);
				// 回调通知小偷
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				// 通知被偷的人
				crossData = new CrossData();
				crossData.putObject(CrossMineEnum.Hid, stealMineNameHid);
				crossData.putObject(CrossMineEnum.name, stealMineName);
				crossData.putObject(CrossMineEnum.mineId, fightMine.getMineId());
				crossData.putObject(CrossMineEnum.stealReward, rewards);
				for(CrossMineJoiner joiner : fightMine.getMinersInfo()) {
					crossData.putObject(CrossMineEnum.fightMineid, joiner.getHid());
					ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
					int zoneid = CommonUtil.getZoneIdById(joiner.getHid());
					channel = zoneidToChannel.get(zoneid);
					NettyWrite.writeXData(channel, CrossConst.CROSS_MINE_NoticeStealMine, crossData);
				}

				// 用于推送新消息
				List<Long> pushIdList = new ArrayList<>();
				for (CrossMineJoiner joiner : fightMine.getMinersInfo()) {
					pushIdList.add(joiner.getHid());
				}
				// 推送信息通知被偷
				crossData = new CrossData();
				crossData.putObject(CrossMineEnum.CrossMineInfo, fightMine);
				CrossMineFunction.getIns().pushMineInfo(pushIdList, 6, stealMineName, crossData);

			}
		} catch (Exception e) {
			LogTool.error(e, CrossMineIO.class, "CRLstealMine has wrong");
		}

	}

	public void CRLChangeName(Channel channel, CrossData crossData) {
		long hid = crossData.getObject(CrossMineEnum.Hid, Long.class);
		long helpHid = crossData.getObject(CrossMineEnum.HelpMinerId, Long.class);
		String name = crossData.getObject(CrossMineEnum.Name, String.class);
		crossData.finishGet();

		int cmd = CrossConst.CROSS_MINE_ChangeName;
		int partId = CrossCache.getPartId(channel);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		CrossMine crossMine = mineMap.get(hid);
		CrossMine helpcrossMine = mineMap.get(helpHid);
		if (crossMine != null) {
			crossMine.setName(name);
			for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
				if (joiner.getHid() == hid) {
					joiner.setName(name);
					break;
				}
			}
			List<Long> pushIdList = new ArrayList<>();
			for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
				pushIdList.add(joiner.getHid());
			}
			// 推送信息通知被偷
			crossData = new CrossData();
			crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
			CrossMineFunction.getIns().pushMineInfo(pushIdList, 10, name, crossData);
		}
		if (helpcrossMine != null) {
			for (CrossMineJoiner joiner : helpcrossMine.getMinersInfo()) {
				if (joiner.getHid() == hid) {
					joiner.setName(name);
					break;
				}
			}
			List<Long> pushIdList = new ArrayList<>();
			for (CrossMineJoiner joiner : helpcrossMine.getMinersInfo()) {
				pushIdList.add(joiner.getHid());
			}
			// 推送信息通知被偷
			crossData = new CrossData();
			crossData.putObject(CrossMineEnum.CrossMineInfo, helpcrossMine);
			CrossMineFunction.getIns().pushMineInfo(pushIdList, 10, name, crossData);
		}
	}

}
