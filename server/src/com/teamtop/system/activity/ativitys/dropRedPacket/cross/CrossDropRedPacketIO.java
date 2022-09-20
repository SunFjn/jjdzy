package com.teamtop.system.activity.ativitys.dropRedPacket.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ActivityDao;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketConst;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketFunction;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketManager;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketSender;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketSysCache;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketRecord;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossDropRedPacketIO {
	private static volatile CrossDropRedPacketIO ins = null;

	public static CrossDropRedPacketIO getIns() {
		if (ins == null) {
			synchronized (CrossDropRedPacketIO.class) {
				if (ins == null) {
					ins = new CrossDropRedPacketIO();
				}
			}
		}
		return ins;
	}

	private CrossDropRedPacketIO() {
	}

	/**
	 * 子服接收来自中央服的连接事件请求,获取红包数据
	 *
	 * @param channel
	 * @param crossData
	 */
	public void connEventFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_DROPREDPACKET_CON_CL;
		try {
			Type classType = new TypeReference<LinkedHashMap<Long, DropRedPacketModel>>() {
			}.getType();
			LinkedHashMap<Long, DropRedPacketModel> redpacketMap = crossData
					.getObject(CrossDropRedPacketEnum.redpacketMap, classType);
			LinkedHashMap<Long, DropRedPacketModel> redpacketNotTimesMap = crossData
					.getObject(CrossDropRedPacketEnum.redpacketNotTimesMap, classType);
			ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue = new ConcurrentLinkedQueue<>();
			for (DropRedPacketModel model : redpacketMap.values()) {
				redpacketQueue.add(model);
			}
			DropRedPacketSysCache.setRedpacketQueue(redpacketQueue);
			if (redpacketNotTimesMap != null) {
				ConcurrentLinkedQueue<DropRedPacketModel> redpacketNotTimesQueue = new ConcurrentLinkedQueue<>();
				for (DropRedPacketModel model : redpacketNotTimesMap.values()) {
					redpacketNotTimesQueue.add(model);
				}
				DropRedPacketSysCache.setRedpacketNotTimesQueue(redpacketNotTimesQueue);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossDropRedPacketIO connEventFromCen");
		}
		crossData.finishGet();
		crossData.putObject(CrossDropRedPacketEnum.serverOpenTime, GameProperties.serverOpenTime);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	/**
	 * 中央服接收来自子服的发红包事件
	 *
	 * @param channel
	 * @param crossData
	 */
	public void sendRedPacketFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_DROPREDPACKET_SEND_LC;
		DropRedPacketModel model = null;
		try {
			model = crossData.getObject(CrossDropRedPacketEnum.send, DropRedPacketModel.class);
			int endTimeCen = CrossDropRedPacketSysCache.getEndTime(channel);
			LogTool.info(model.getHid(), model.getName(), "CrossDropRedPacketIO sendRedPacketFromLocal" + " endTimeCen="
					+ endTimeCen + " type:" + model.getType(), this);
			LinkedHashMap<Long, DropRedPacketModel> redpacketMap = CrossDropRedPacketSysCache.getRedpacketMap(channel);
			List<Integer> randomList = null;
			int[][] redPacket = null;
			synchronized (redpacketMap) {
				randomList = DropRedPacketFunction.getIns().randomRedPacketList(model.getType());
				model.setRandomList(randomList);
//				redPacket = DropRedPacketFunction.getIns().randomRedPacket(model.getType(), randomList);
//				List<DropRedPacketRecord> recordList = model.getRecordList();
				long id = CrossDropRedPacketSysCache.getAddId(channel);
				model.setId(id);
//				DropRedPacketRecord record = new DropRedPacketRecord(model.getHid(), model.getName(), redPacket[0][2]);
//				recordList.add(record);
				sendRedpacketHandler(redpacketMap, model);
//				model.setNum(model.getNum() - 1);
//				if (model.getNum() <= 0) {
//					redpacketMap.remove(id);
//					CrossDropRedPacketSysCache.addRedpacketNotTimesMap(channel, model);
//				}
				CrossDropRedPacketCL.getIns().updateSendToLocal(channel, model);
			}
			crossData.finishGet();
			crossData.putObject(CrossDropRedPacketEnum.sendState, DropRedPacketConst.SUCCESS);
//			crossData.putObject(CrossDropRedPacketEnum.send, redPacket);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			// TODO: handle exception
			crossData.finishGet();
			crossData.putObject(CrossDropRedPacketEnum.sendState, DropRedPacketConst.FAILURE_EXCEPT);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, this, "CrossDropRedPacketIO sendRedPacketFromLocal crossData:" + crossData == null ? ""
					: JSON.toJSONString(crossData));
		}

	}

	/**
	 * 中央服接收来自子服的抢红包事件
	 *
	 * @param channel
	 * @param crossData
	 */
	public void getRedPacketFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_DROPREDPACKET_GET_LC;
		try {
			Long id = crossData.getObject(CrossDropRedPacketEnum.id, Long.class);
			Long hid = crossData.getObject(CrossDropRedPacketEnum.hid, Long.class);
			String name = crossData.getObject(CrossDropRedPacketEnum.name, String.class);
			LinkedHashMap<Long, DropRedPacketModel> redpacketMap = CrossDropRedPacketSysCache.getRedpacketMap(channel);
			DropRedPacketModel model;
			int[][] redPacket = null;
			synchronized (redpacketMap) {
				model = redpacketMap.get(id);
				if (model == null) {
					crossData.finishGet();
					crossData.putObject(CrossDropRedPacketEnum.getState, DropRedPacketConst.FAILURE_EXCEPT);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					LogTool.info(hid,name,"getRedPacketFromLocal: branch:0" ,this);
					return;
				}
				List<DropRedPacketRecord> recordList = model.getRecordList();
				DropRedPacketRecord record = new DropRedPacketRecord(hid);
				if (recordList.contains(record)) {
					crossData.finishGet();
					crossData.putObject(CrossDropRedPacketEnum.getState, DropRedPacketConst.FAILURE_NOT_REP);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				int num = model.getNum();
				if (num <= 0) {
					crossData.finishGet();
					crossData.putObject(CrossDropRedPacketEnum.getState, DropRedPacketConst.FAILURE_NOT_NUM);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				redPacket = DropRedPacketFunction.getIns().randomRedPacket(model.getType(), model.getRandomList());
				if (redPacket == null) {
					crossData.finishGet();
					crossData.putObject(CrossDropRedPacketEnum.getState, DropRedPacketConst.FAILURE_EXCEPT);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					LogTool.info(hid,name,"getRedPacketFromLocal: branch:1, modelStr:"+JSON.toJSONString(model) ,this);
					return;
				}
				model.setNum(num - 1);
				recordList.add(new DropRedPacketRecord(hid, name, redPacket[0][2]));
				CrossDropRedPacketCL.getIns().updateGetToLocal(channel, model, hid, name, redPacket);
				if (model.getNum() <= 0) {
					redpacketMap.remove(id);
					CrossDropRedPacketSysCache.addRedpacketNotTimesMap(channel, model);
				}
			}
			crossData.finishGet();
			crossData.putObject(CrossDropRedPacketEnum.getState, DropRedPacketConst.SUCCESS);
			crossData.putObject(CrossDropRedPacketEnum.send, redPacket);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossDropRedPacketIO getRedPacketFromLocal crossData:" + crossData == null ? ""
					: JSON.toJSONString(crossData));
			crossData.finishGet();
			crossData.putObject(CrossDropRedPacketEnum.getState, DropRedPacketConst.FAILURE_EXCEPT);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		}

	}

	/**
	 * 各个子服收到来自中央服发红包数据
	 *
	 * @param channel
	 * @param crossData
	 */
	public void updateSendFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_DROPREDPACKET_SEND_CL;
		DropRedPacketModel model = null;
		try {
			model = crossData.getObject(CrossDropRedPacketEnum.send, DropRedPacketModel.class);
			ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue = DropRedPacketSysCache.getRedpacketQueue();
			synchronized (redpacketQueue) {
//				if (model.getNum() <= 0) {
//					DropRedPacketSysCache.addRedpacketNotTimesMap(model);
//					return;
//				}
				sendRedpacketHandler(redpacketQueue, model);
			}
			for (Hero hero : HeroCache.getHeroMap().values()) {
				boolean online = HeroFunction.getIns().isOnline(hero.getId());
				if (!online) {
					continue;
				}
				if (hero.getId() == model.getHid()) {
					DropRedPacketManager.getIns().openUI(hero);
					DropRedPacketSender.sendCmd_11380(hero.getId());
				} else {
					if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
						DropRedPacketSender.sendCmd_11380(hero.getId());
					}
				}
				DropRedPacketFunction.getIns().redPoint_f1(hero, false);
			}
			if (ActivityFunction.getIns().checkActOpen(ActivitySysId.DROPREDPACKET_NEWACT)) {
				if (model.getHid() == 0) {
					// 系统红包
					// 聊天
					ChatManager.getIns().broadCast(ChatConst.DROPREDPACKET_NEWACT_SYS_CHAT,
							new Object[] { " ActivitySysId.DROPREDPACKET_NEWACT" });
					// 广播
					ChatManager.getIns().broadCast(ChatConst.DROPREDPACKET_NEWACT_SYS, new Object[] {});
				} else {
					// 聊天
					ChatManager.getIns().broadCast(ChatConst.DROPREDPACKET_NEWACT_CHAT,
							new Object[] { model.getName(), ActivitySysId.DROPREDPACKET_NEWACT });
					// 广播
					ChatManager.getIns().broadCast(ChatConst.DROPREDPACKET_NEWACT, new Object[] { model.getName() });
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "CrossDropRedPacketIO updateSendFromCen" + " modelStr:" + JSON.toJSONString(model));
		}
	}

	/**
	 * 各个子服收到来自中央服抢红包数据
	 *
	 * @param channel
	 * @param crossData
	 */
	public void updateGetFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_DROPREDPACKET_GET_CL;
		Long id = null;
		Long hid = null;
		Integer num = null;
		int[][] redPacket = null;
		String name = null;
		try {
			id = crossData.getObject(CrossDropRedPacketEnum.id, Long.class);
			hid = crossData.getObject(CrossDropRedPacketEnum.hid, Long.class);
			num = crossData.getObject(CrossDropRedPacketEnum.num, Integer.class);
			redPacket = crossData.getObject(CrossDropRedPacketEnum.redPacket, int[][].class);
			name = crossData.getObject(CrossDropRedPacketEnum.name, String.class);
			ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue = DropRedPacketSysCache.getRedpacketQueue();
			synchronized (redpacketQueue) {
				DropRedPacketModel findModel = DropRedPacketFunction.getIns().getRedpacketQueueModel(id);
				if (findModel == null) {
					return;
				}
				findModel.setNum(num);
				findModel.getRecordList().add(new DropRedPacketRecord(hid, name, redPacket[0][2]));
				if (findModel.getNum() <= 0) {
					redpacketQueue.remove(new DropRedPacketModel(id));
					DropRedPacketSysCache.addRedpacketNotTimesQueue(findModel);
				}
			}
//			boolean online = HeroFunction.getIns().isOnline(hid);
//			if (online) {
//				Hero hero = HeroCache.getHero(hid);
//				if (hero != null) {
//					DropRedPacketManager.getIns().openUI(hero);
//				}
//			}
		} catch (Exception e) {
			LogTool.error(e, this, "CrossDropRedPacketIO updateGetFromCen" + " id:" + id + " hid:" + hid + "name:"
					+ name + " num:" + num + " redPacket:" + redPacket[0][2]);
		}
	}

	public void sendRedpacketHandler(Map<Long, DropRedPacketModel> redpacketMap, DropRedPacketModel model) {
		addCacheBeforeMore(DropRedPacketConst.CACHE_MAXNUM, redpacketMap.size(), redpacketMap.values().iterator(),
				model);
		redpacketMap.put(model.getId(), model);
	}

	public void sendRedpacketHandler(ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue,
			DropRedPacketModel model) {
		addCacheBeforeMore(DropRedPacketConst.CACHE_MAXNUM, redpacketQueue.size(), redpacketQueue.iterator(), model);
		redpacketQueue.add(model);
	}

//	public void sendRedpacketHandler_f1(List<DropRedPacketModel> redpacketList, DropRedPacketModel model) {
//		int size = redpacketList.size();
//		if (size >= DropRedPacketConst.MAXNUM) {
//			Iterator<DropRedPacketModel> iterator = redpacketList.iterator();
//			boolean isRemove = false;
//			while (iterator.hasNext()) {
//				DropRedPacketModel next = iterator.next();
//				int num = next.getNum();
//				if (num <= 0) {
//					iterator.remove();
//					isRemove = true;
//				}
//			}
//			if (!isRemove) {
//				Iterator<DropRedPacketModel> iterator1 = redpacketList.iterator();
//				DropRedPacketModel next = iterator1.next();
//				iterator1.remove();
//			}
//
//		}
//		redpacketList.add(model);
//	}

	public void addCacheBeforeMore(int max, int size, Iterator<DropRedPacketModel> iterator, DropRedPacketModel model) {
		if (size >= max) {
			if (iterator.hasNext()) {
				iterator.next();
				iterator.remove();
			}
		}
	}

//    /**
//     * 中央服收到子服发送的期数
//     *
//     * @param channel
//     * @param crossData
//     */
//    public void sendQSFromLocal(Channel channel, CrossData crossData) {
//        int cmd = CrossConst.CROSS_DROPREDPACKET_START_LC;
//        Integer qs = crossData
//                .getObject(CrossDropRedPacketEnum.qs, Integer.class);
//        if (qs == null || qs == 0) {
//            return;
//        }
//        LinkedHashMap<Long, DropRedPacketModel> redpacketMap = CrossDropRedPacketSysCache.getRedpacketMap(channel);
//        synchronized (redpacketMap) {
//            int crossQs = CrossDropRedPacketSysCache.getQs(channel);
//            if (crossQs != qs) {
//                Integer endTime = CrossDropRedPacketSysCache.getQsEndTimeMap().get(qs);
//                CrossDropRedPacketSysCache.setEndTime(channel, endTime);
//                CrossDropRedPacketSysCache.setQs(channel, qs);
//            }
//        }
//    }

	/**
	 * 中央服收到子服gm清理命令
	 *
	 * @param channel
	 * @param crossData
	 */
	public void gmFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_DROPREDPACKET_GM_LC;
		CrossDropRedPacketSysCache.getRedpacketMap(channel).clear();
		CrossDropRedPacketSysCache.getRedpacketNotTimesMap(channel).clear();
		CrossDropRedPacketSysCache.clearId(channel);
		DropRedPacketFunction.getIns().initSysConfigMap();
		CrossDropRedPacketSysCache.setSysRedPacketId(0);
		CrossDropRedPacketSysCache.setSysRedPacketTime(0);
		CrossDropRedPacketEvent.getIns().sysRedPacketIdHandler();
		Iterator<ConcurrentHashMap<Channel, List<Integer>>> iterator = CrossCache.getPchToZoneMap().values().iterator();
		for (; iterator.hasNext();) {
			ConcurrentHashMap<Channel, List<Integer>> map = iterator.next();
			for (Channel channel1 : map.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.CROSS_DROPREDPACKET_GM_CL, crossData);
			}
		}
	}

	/**
	 * 子服收到中央服gm清理命令
	 *
	 * @param channel
	 * @param crossData
	 */
	public void gmFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_DROPREDPACKET_GM_CL;
		DropRedPacketSysCache.getRedpacketQueue().clear();
		DropRedPacketSysCache.getRedpacketNotTimesQueue().clear();
		DropRedPacketFunction.getIns().initSysConfigMap();
		DropRedPacketSysCache.setSysRedPacketId(0);
		// 删除区服所有玩家对应活动数据
		ActivityDao.getIns().deleteActGM(ActivitySysId.DROPREDPACKET_NEWACT);

		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			boolean online = HeroFunction.getIns().isOnline(hero.getId());
			if (!online) {
				continue;
			}
			hero.setOneDayRecharge(0);
			Map<Integer, ActivityData> activityDataMap = hero.getHeroActivityData().getActivityDataMap();
			activityDataMap.remove(ActivitySysId.DROPREDPACKET_NEWACT);
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			ActivityInfo activityInfo = activityMap.get(ActivitySysId.DROPREDPACKET_NEWACT);
			if (activityInfo != null) {
				// 活动在开，清空数据
				ActivityData activityData = DropRedPacketManager.getIns().getActivityData(hero, activityInfo);
				activityDataMap.put(ActivitySysId.DROPREDPACKET_NEWACT, activityData);
			}
		}
	}
}
