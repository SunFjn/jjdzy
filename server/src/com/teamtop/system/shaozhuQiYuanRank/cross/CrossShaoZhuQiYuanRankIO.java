package com.teamtop.system.shaozhuQiYuanRank.cross;

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
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.shaozhuQiYuanRank.ShaoZhuQiYuanRankConst;
import com.teamtop.system.shaozhuQiYuanRank.ShaoZhuQiYuanRankEvent;
import com.teamtop.system.shaozhuQiYuanRank.ShaoZhuQiYuanRankFunction;
import com.teamtop.system.shaozhuQiYuanRank.ShaoZhuQiYuanRankSysCache;
import com.teamtop.system.shaozhuQiYuanRank.cross.model.CrossShaoZhuQiYuanRankModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_szqypm_272;
import io.netty.channel.Channel;

public class CrossShaoZhuQiYuanRankIO {
	private static volatile CrossShaoZhuQiYuanRankIO ins = null;

	public static CrossShaoZhuQiYuanRankIO getIns() {
		if (ins == null) {
			synchronized (CrossShaoZhuQiYuanRankIO.class) {
				if (ins == null) {
					ins = new CrossShaoZhuQiYuanRankIO();
				}
			}
		}
		return ins;
	}

	private CrossShaoZhuQiYuanRankIO() {
	}

	/**
	 * 子服收到连接事件请求,获取排行数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void getRankFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_SHAOZHU_QIYUANRANK_CONNSENDRANK_CL;
		int endTime = crossData.getObject(CrossShaoZhuQiYuanRankEnum.endTime, Integer.class);
//		if (!isOpenSpecialHandler(endTime)) {
//			return;
//		}
		Type classType = new TypeReference<TreeSet<CrossShaoZhuQiYuanRankModel>>() {
		}.getType();
		TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet = crossData.getObject(CrossShaoZhuQiYuanRankEnum.rankTreeSet,
				classType);
		if (rankTreeSet != null) {
			ShaoZhuQiYuanRankSysCache.setRankTreeSet(rankTreeSet);
		}
		int beginTime = crossData.getObject(CrossShaoZhuQiYuanRankEnum.beginTime, Integer.class);
		ShaoZhuQiYuanRankSysCache.setBeginTime(beginTime);
		ShaoZhuQiYuanRankSysCache.setEndTime(endTime);
		crossData.finishGet();
		crossData.putObject(CrossShaoZhuQiYuanRankEnum.serverOpenTime, GameProperties.serverOpenTime);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	/**
	 * 子服收到同步开始结束时间请求
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void syncTimeFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_SHAOZHU_QIYUANRANK_SYNCTIME_CL;
		int endTime = crossData.getObject(CrossShaoZhuQiYuanRankEnum.endTime, Integer.class);
//		if (!isOpenSpecialHandler(endTime)) {
//			return;
//		}
		int beginTime = crossData.getObject(CrossShaoZhuQiYuanRankEnum.beginTime, Integer.class);
		ShaoZhuQiYuanRankSysCache.setBeginTime(beginTime);
		ShaoZhuQiYuanRankSysCache.setEndTime(endTime);
		crossData.finishGet();
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			ShaoZhuQiYuanRankEvent.getIns().login(hero);
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
			if (struct_hdfl_012.getId() != SystemIdConst.SHAOZHU_SEVENDAYTARGET) {
				continue;
			}
			open = struct_hdfl_012.getOpen();
			end = struct_hdfl_012.getEnd();
			localEndTime = ShaoZhuQiYuanRankFunction.getIns().getOpenDaysTime(GameProperties.serverOpenTime, end, true);
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
		int cmd = CrossConst.CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_LC;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				CrossShaoZhuQiYuanRankModel addModel = null;
				try {
					addModel = crossData.getObject(CrossShaoZhuQiYuanRankEnum.addUpdateRankModel,
							CrossShaoZhuQiYuanRankModel.class);
					if (!ShaoZhuQiYuanRankFunction.getIns().isOpenCen(channel, 0) && addModel.getQiyuanTimes() > 0) {
						crossData.finishGet();
						crossData.putObject(CrossShaoZhuQiYuanRankEnum.isUpdateSuccess, false);
						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					if (CrossShaoZhuQiYuanRankSysCache.getSendAwardSet(channel)
							.contains(SystemIdConst.SHAOZHU_QIYUANRANK) && addModel.getQiyuanTimes() > 0) {
						crossData.finishGet();
						crossData.putObject(CrossShaoZhuQiYuanRankEnum.isUpdateSuccess, false);
						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet = CrossShaoZhuQiYuanRankSysCache
							.getRankTreeSet(channel);
					addModel.setRearchTime(TimeDateUtil.getCurrentTime());
					refreshRank(rankTreeSet, addModel);
					// 中央服向各个子服同步排行
					CrossShaoZhuQiYuanRankCL.getIns().syncRankToLocal(channel, addModel);
					crossData.finishGet();
					crossData.putObject(CrossShaoZhuQiYuanRankEnum.isUpdateSuccess, true);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				} catch (Exception e) {
					// TODO: handle exception
					if (addModel == null)

					{
						LogTool.error(e, this, "CrossShaoZhuQiYuanRankIO  updateRankFromLocal");
					} else {
						LogTool.error(e, this, "CrossShaoZhuQiYuanRankIO  updateRankFromLocal hid:" + addModel.getHid()
								+ " name:" + addModel.getName() + " qiyuanTimes" + addModel.getQiyuanTimes());
					}
					crossData.finishGet();
					crossData.putObject(CrossShaoZhuQiYuanRankEnum.isUpdateSuccess, false);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.SHAOZHU_QIYUANRANK;
			}

		});

	}

	/**
	 * 更新排行数据
	 * 
	 * @param rankTreeSet
	 * @param addModel
	 */
	public void refreshRank(TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet, CrossShaoZhuQiYuanRankModel addModel) {
		Iterator<CrossShaoZhuQiYuanRankModel> iterator = rankTreeSet.iterator();
		while (iterator.hasNext()) {
			CrossShaoZhuQiYuanRankModel rankTreeModel = iterator.next();
			if (rankTreeModel.getHid() == addModel.getHid()) {
				if (addModel.getQiyuanTimes() == 0) {
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
				if (addModel.getQiyuanTimes() < rankTreeModel.getQiyuanTimes()) {
					// 增加的比排行里的鉴定次数少,异常情况
					return;
				}
				iterator.remove();
				rankTreeSet.add(addModel);
				return;
			}
		}
		if (addModel.getQiyuanTimes() == 0) {
			return;
		}

		if (rankTreeSet.size() >= ShaoZhuQiYuanRankConst.RANKMAXNUM) {
			CrossShaoZhuQiYuanRankModel lastModel = rankTreeSet.last();
			if (addModel.getQiyuanTimes() <= lastModel.getQiyuanTimes()) {
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
		int cmd = CrossConst.CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_CL;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				CrossShaoZhuQiYuanRankModel addModel = null;
				try {
					TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet = ShaoZhuQiYuanRankSysCache.getRankTreeSet();
					addModel = crossData.getObject(CrossShaoZhuQiYuanRankEnum.addUpdateRankModel,
							CrossShaoZhuQiYuanRankModel.class);
					refreshRank(rankTreeSet, addModel);
				} catch (Exception e) {
					// TODO: handle exception
					if (addModel == null)

					{
						LogTool.error(e, this, "CrossShaoZhuQiYuanRankIO  updateRankFromLocal");
					} else {
						LogTool.error(e, this, "CrossShaoZhuQiYuanRankIO  updateRankFromLocal hid:" + addModel.getHid()
								+ " name:" + addModel.getName() + " qiyuanTimes" + addModel.getQiyuanTimes());
					}
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.SHAOZHU_QIYUANRANK;
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
		int cmd = CrossConst.CROSS_SHAOZHU_QIYUANRANK_SENDMAILAWARD_CL;
		Type classType = new TypeReference<List<CrossShaoZhuQiYuanRankModel>>() {
		}.getType();
		List<CrossShaoZhuQiYuanRankModel> awardList = (List<CrossShaoZhuQiYuanRankModel>) crossData
				.getObject(CrossShaoZhuQiYuanRankEnum.awardList, classType);
		int size = awardList.size();
		LogTool.info("CrossShaoZhuQiYuanRankIO awardList size=" + size, this);
		for (int i = 0; i < size; i++) {
			CrossShaoZhuQiYuanRankModel awardModel = awardList.get(i);
			long hid = 0;
			int rank = 0;
			int qiyuanTimes = 0;
			try {
				hid = awardModel.getHid();
				rank = awardModel.getRank();
				qiyuanTimes = awardModel.getQiyuanTimes();
				LogTool.info("CrossShaoZhuQiYuanRankIO start hid=" + hid + ", rank=" + rank, this);
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn("CrossShaoZhuQiYuanRankIO sendMailAwardToLocal hid:" + hid + " rank:" + rank
							+ " qiyuanTimes:" + qiyuanTimes, this);
					return;
				}
				Map<Integer, Struct_szqypm_272> awardConfigMap = ShaoZhuQiYuanRankSysCache.getAwardConfigMap();
				Struct_szqypm_272 struct_bmjsjdpm_262 = awardConfigMap.get(rank);
				int[][] reward = struct_bmjsjdpm_262.getReward();
				// 邮件发放排名奖励
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.SHAOZHU_QIYUANRANK_RANDAWARD,
						new Object[] { MailConst.SHAOZHU_QIYUANRANK_RANDAWARD, rank }, reward);
				int bigAwardMinTimes = Config_xtcs_004.getIns().get(ShaoZhuQiYuanRankConst.BIGAWARD_MIN_TIMES).getNum();
				if (qiyuanTimes >= bigAwardMinTimes) {
					// 邮件发放大奖奖励
					int[][] bigReward = struct_bmjsjdpm_262.getBig();
					if (bigReward != null) {
						MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.SHAOZHU_QIYUANRANK_BIGAWARD,
								new Object[] { MailConst.SHAOZHU_QIYUANRANK_BIGAWARD, rank }, bigReward);
					}
				}
				LogTool.info("CrossShaoZhuQiYuanRankIO end hid=" + hid + ", rank=" + rank, this);
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, "CrossConsumeRankIO sendRankAward" + " hid" + hid + " rank:" + rank
						+ " qiyuanTimes:" + qiyuanTimes);
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
		int cmd = CrossConst.CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_GM;
		Integer serverOpenTime = crossData.getObject(CrossShaoZhuQiYuanRankEnum.serverOpenTime, Integer.class);

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
			Map<Integer, Integer> serverOpenTimeMap = CrossShaoZhuQiYuanRankSysCache.getServerOpenTimeMap(channel);
			serverOpenTimeMap.put(zoneId, serverOpenTime);
			TreeSet<CrossShaoZhuQiYuanRankModel> rankTreeSet = CrossShaoZhuQiYuanRankSysCache.getRankTreeSet(channel);
			rankTreeSet.clear();
			Set<Integer> sendAwardSet = CrossShaoZhuQiYuanRankSysCache.getSendAwardSet(channel);
			sendAwardSet.clear();
		}
	}

}
