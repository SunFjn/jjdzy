package com.teamtop.system.eightDoorAppraiseRank.cross;

import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.eightDoorAppraiseRank.EightDoorAppraiseRankConst;
import com.teamtop.system.eightDoorAppraiseRank.EightDoorAppraiseRankEvent;
import com.teamtop.system.eightDoorAppraiseRank.EightDoorAppraiseRankFunction;
import com.teamtop.system.eightDoorAppraiseRank.EightDoorAppraiseRankSysCache;
import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_bmjsjdpm_262;
import excel.struct.Struct_hdfl_012;
import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankIO {
	private static volatile CrossEightDoorAppraiseRankIO ins = null;

	public static CrossEightDoorAppraiseRankIO getIns() {
		if (ins == null) {
			synchronized (CrossEightDoorAppraiseRankIO.class) {
				if (ins == null) {
					ins = new CrossEightDoorAppraiseRankIO();
				}
			}
		}
		return ins;
	}

	private CrossEightDoorAppraiseRankIO() {
	}

	/**
	 * 子服收到连接事件请求,获取排行数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void getRankFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_CONNSENDRANK_CL;
		int endTime = crossData.getObject(CrossEightDoorAppraiseRankEnum.endTime, Integer.class);
//		if (!isOpenSpecialHandler(endTime)) {
//			return;
//		}
		Type classType = new TypeReference<TreeSet<CrossEightDoorAppraiseRankModel>>() {
		}.getType();
		TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = crossData
				.getObject(CrossEightDoorAppraiseRankEnum.rankTreeSet, classType);
		if (rankTreeSet != null) {
			EightDoorAppraiseRankSysCache.setRankTreeSet(rankTreeSet);
		}
		int beginTime = crossData.getObject(CrossEightDoorAppraiseRankEnum.beginTime, Integer.class);
		EightDoorAppraiseRankSysCache.setBeginTime(beginTime);
		EightDoorAppraiseRankSysCache.setEndTime(endTime);
		crossData.finishGet();
		crossData.putObject(CrossEightDoorAppraiseRankEnum.serverOpenTime, GameProperties.serverOpenTime);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	/**
	 * 子服收到同步开始结束时间请求
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void syncTimeFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_SYNCTIME_CL;
		int endTime = crossData.getObject(CrossEightDoorAppraiseRankEnum.endTime, Integer.class);
//		if (!isOpenSpecialHandler(endTime)) {
//			return;
//		}
		int beginTime = crossData.getObject(CrossEightDoorAppraiseRankEnum.beginTime, Integer.class);
		EightDoorAppraiseRankSysCache.setBeginTime(beginTime);
		EightDoorAppraiseRankSysCache.setEndTime(endTime);
		crossData.finishGet();
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			EightDoorAppraiseRankEvent.getIns().login(hero);
		}
	}

	/**
	 * 是否开启(特殊处理)
	 * 
	 * @return
	 */
	private boolean isOpenSpecialHandler(int endTime) {
		List<Struct_hdfl_012> sortList = getSortList();
		int localEndTime = 0;
		int open = 0;
		int end = 0;
		for (Struct_hdfl_012 struct_hdfl_012 : sortList) {
			if (struct_hdfl_012.getId() != SystemIdConst.EIGHTDOOR_APPRAISERANK) {
				continue;
			}
			open = struct_hdfl_012.getOpen();
			end = struct_hdfl_012.getEnd();
			localEndTime = EightDoorAppraiseRankFunction.getIns().getOpenDaysTime(GameProperties.serverOpenTime, end,
					true);
		}
		if (endTime != 0 && ((localEndTime - endTime) >= ((end - open + 1) * TimeDateUtil.ONE_DAY_INT))) {
			String endTimeStr = TimeDateUtil.getTimeStrByInt(endTime, "yyyy-MM-dd HH:mm:ss");
			String localEndTimeStr = TimeDateUtil.getTimeStrByInt(localEndTime, "yyyy-MM-dd HH:mm:ss");
			LogTool.warn("isOpenSpecialHandler endTimeStr:" + endTimeStr + "localEndTimeStr:" + localEndTimeStr, this);
			return false;
		}
		return true;
	}
	
	private List<Struct_hdfl_012> getSortList() {
		 return Config_hdfl_012.getIns().getSortList();
	}

	/**
	 * 中央服收到增加更新排行榜数据通知
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void updateRankFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_ADDUPDATERANK_LC;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				CrossEightDoorAppraiseRankModel addModel = null;
				try {
					addModel = crossData.getObject(CrossEightDoorAppraiseRankEnum.addUpdateRankModel,
							CrossEightDoorAppraiseRankModel.class);
					if (!EightDoorAppraiseRankFunction.getIns().isOpenCen(channel, 0)
							&& addModel.getAppraiseTimes() > 0) {
						crossData.finishGet();
						crossData.putObject(CrossEightDoorAppraiseRankEnum.isUpdateSuccess, false);
						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					if (CrossEightDoorAppraiseRankSysCache.getSendAwardSet(channel)
							.contains(SystemIdConst.EIGHTDOOR_APPRAISERANK) && addModel.getAppraiseTimes() > 0) {
						crossData.finishGet();
						crossData.putObject(CrossEightDoorAppraiseRankEnum.isUpdateSuccess, false);
						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = CrossEightDoorAppraiseRankSysCache
							.getRankTreeSet(channel);
					addModel.setRearchTime(TimeDateUtil.getCurrentTime());
					refreshRank(rankTreeSet, addModel);
					// 中央服向各个子服同步排行
					CrossEightDoorAppraiseRankCL.getIns().syncRankToLocal(channel, addModel);
					crossData.finishGet();
					crossData.putObject(CrossEightDoorAppraiseRankEnum.isUpdateSuccess, true);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				} catch (Exception e) {
					// TODO: handle exception
					if (addModel == null)

					{
						LogTool.error(e, this, "CrossEightDoorAppraiseRankIO  updateRankFromLocal");
					} else {
						LogTool.error(e, this,
								"CrossEightDoorAppraiseRankIO  updateRankFromLocal hid:" + addModel.getHid() + " name:"
										+ addModel.getName() + " appraiseTimes" + addModel.getAppraiseTimes());
					}
					crossData.finishGet();
					crossData.putObject(CrossEightDoorAppraiseRankEnum.isUpdateSuccess, false);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.EIGHTDOOR_APPRAISERANK;
			}

		});

	}

	/**
	 * 更新排行数据
	 * 
	 * @param rankTreeSet
	 * @param addModel
	 */
	public void refreshRank(TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet,
			CrossEightDoorAppraiseRankModel addModel) {
		Iterator<CrossEightDoorAppraiseRankModel> iterator = rankTreeSet.iterator();
		while (iterator.hasNext()) {
			CrossEightDoorAppraiseRankModel rankTreeModel = iterator.next();
			if (rankTreeModel.getHid() == addModel.getHid()) {
				if (addModel.getAppraiseTimes() == 0) {
					// 改名，职业，时装，头像，头像框，国家，vip等级
					rankTreeModel.setName(addModel.getName());
					rankTreeModel.setJob(addModel.getJob());
					rankTreeModel.setBodyId(addModel.getBodyId());
					rankTreeModel.setIcon(addModel.getIcon());
					rankTreeModel.setFrame(addModel.getFrame());
					rankTreeModel.setCountryType(addModel.getCountryType());
					rankTreeModel.setVipLv(addModel.getVipLv());
					rankTreeModel.setMountId(addModel.getMountId());
					return;
				}
				if (addModel.getAppraiseTimes() < rankTreeModel.getAppraiseTimes()) {
					// 增加的比排行里的鉴定次数少,异常情况
					return;
				}
				iterator.remove();
				rankTreeSet.add(addModel);
				return;
			}
		}
		if (addModel.getAppraiseTimes() == 0) {
			return;
		}

		if (rankTreeSet.size() >= EightDoorAppraiseRankConst.RANKMAXNUM) {
			CrossEightDoorAppraiseRankModel lastModel = rankTreeSet.last();
			if (addModel.getAppraiseTimes() <= lastModel.getAppraiseTimes()) {
				return;
			}
			rankTreeSet.remove(lastModel);
		}
		rankTreeSet.add(addModel);
	}

	/**
	 * 子服收到同步排行请求
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void syncRankToLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_ADDUPDATERANK_CL;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				CrossEightDoorAppraiseRankModel addModel = null;
				try {
					TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = EightDoorAppraiseRankSysCache
							.getRankTreeSet();
					addModel = crossData.getObject(CrossEightDoorAppraiseRankEnum.addUpdateRankModel,
							CrossEightDoorAppraiseRankModel.class);
					refreshRank(rankTreeSet, addModel);
				} catch (Exception e) {
					// TODO: handle exception
					if (addModel == null)

					{
						LogTool.error(e, this, "CrossEightDoorAppraiseRankIO  updateRankFromLocal");
					} else {
						LogTool.error(e, this,
								"CrossEightDoorAppraiseRankIO  updateRankFromLocal hid:" + addModel.getHid() + " name:"
										+ addModel.getName() + " appraiseTimes" + addModel.getAppraiseTimes());
					}
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.EIGHTDOOR_APPRAISERANK;
			}
		});
	}

	/**
	 * 子服收到发送邮件奖励通知
	 * 
	 * @param channel
	 * @param crossData
	 */
	@SuppressWarnings("unchecked")
	public void sendMailAwardToLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_SENDMAILAWARD_CL;
		Type classType = new TypeReference<List<CrossEightDoorAppraiseRankModel>>() {
		}.getType();
		List<CrossEightDoorAppraiseRankModel> awardList = (List<CrossEightDoorAppraiseRankModel>) crossData
				.getObject(CrossEightDoorAppraiseRankEnum.awardList, classType);
		int size = awardList.size();
		for (int i = 0; i < size; i++) {
			CrossEightDoorAppraiseRankModel awardModel = awardList.get(i);
			long hid = 0;
			int rank = 0;
			int appraiseTime = 0;
			try {
				hid = awardModel.getHid();
				rank = awardModel.getRank();
				appraiseTime = awardModel.getAppraiseTimes();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn("CrossEightDoorAppraiseRankIO sendMailAwardToLocal hid:" + hid + " rank:" + rank
							+ " appraiseTime:" + appraiseTime, this);
					return;
				}
				Map<Integer, Struct_bmjsjdpm_262> awardConfigMap = EightDoorAppraiseRankSysCache.getAwardConfigMap();
				Struct_bmjsjdpm_262 struct_bmjsjdpm_262 = awardConfigMap.get(rank);
				int[][] reward = struct_bmjsjdpm_262.getReward();
				// 邮件发放排名奖励
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.EIGHTDOOR_APPRAISERANK_RANDAWARD,
						new Object[] { MailConst.EIGHTDOOR_APPRAISERANK_RANDAWARD, rank }, reward);
				int bigAwardMinTimes = Config_xtcs_004.getIns().get(EightDoorAppraiseRankConst.BIGAWARD_MIN_TIMES)
						.getNum();
				if (appraiseTime >= bigAwardMinTimes) {
					// 邮件发放大奖奖励
					int[][] bigReward = struct_bmjsjdpm_262.getBig();
					if (bigReward != null) {
						MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.EIGHTDOOR_APPRAISERANK_BIGAWARD,
								new Object[] { MailConst.EIGHTDOOR_APPRAISERANK_BIGAWARD, rank }, bigReward);
					}
				}
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, "CrossConsumeRankIO sendRankAward" + " hid" + hid + " rank:" + rank
						+ " appraiseTime:" + appraiseTime);
			}
		}
	}

	/**
	 * 中央服收到子服gm清理命令
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void gmFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_GM;
		Integer serverOpenTime = crossData.getObject(CrossEightDoorAppraiseRankEnum.serverOpenTime, Integer.class);

		Integer firstZoneId = 0;
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
		for (Entry<Channel, List<Integer>> entry : channelToZoneid.entrySet()) {
			List<Integer> zoneIdList = entry.getValue();
			Integer zoneId = zoneIdList.get(0);
			if (firstZoneId == 0 || zoneId < firstZoneId) {
				firstZoneId = zoneId;
			}
		}
		Integer zoneId = channelToZoneid.get(channel).get(0);
		if (zoneId == firstZoneId) {
			Map<Integer, Integer> serverOpenTimeMap = CrossEightDoorAppraiseRankSysCache.getServerOpenTimeMap(channel);
			serverOpenTimeMap.put(zoneId, serverOpenTime);
			TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = CrossEightDoorAppraiseRankSysCache
					.getRankTreeSet(channel);
			rankTreeSet.clear();
			Set<Integer> sendAwardSet = CrossEightDoorAppraiseRankSysCache.getSendAwardSet(channel);
			sendAwardSet.clear();
		}
	}

}
