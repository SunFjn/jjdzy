package com.teamtop.system.activity.ativitys.dropRedPacket;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dropRedPacket.cross.CrossDropRedPacketLC;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacket;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketRecord;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import excel.config.Config_tjhb_296;
import excel.config.Config_tjhbsys_296;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_tjhb_296;

import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class DropRedPacketManager extends AbstractActivityManager {
	private static volatile DropRedPacketManager ins = null;

	public static DropRedPacketManager getIns() {
		if (ins == null) {
			synchronized (DropRedPacketManager.class) {
				if (ins == null) {
					ins = new DropRedPacketManager();
				}
			}
		}
		return ins;
	}

	private DropRedPacketManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
			return;
		}
		DropRedPacket model = (DropRedPacket) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.DROPREDPACKET_NEWACT);
		int nextSysRedPacketId = DropRedPacketSysCache.getSysRedPacketId() + 1;
		if (!DropRedPacketSysCache.getSysConfigMap().containsKey(nextSysRedPacketId)) {
			nextSysRedPacketId = 1;
		}
		Object[] openUIObjArray = createObjectArray(hero);
		int gettedTimes = model.getGettedTimes();
		int everydayTimes = Config_xtcs_004.getIns().get(DropRedPacketConst.EVERYDAYTIMES).getNum();
		int restTimes = everydayTimes - gettedTimes;
		DropRedPacketSender.sendCmd_11370(hero.getId(), openUIObjArray, nextSysRedPacketId, restTimes < 0 ? 0 : restTimes);
	}

	public Object[] createObjectArray(Hero hero) {
		ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue = DropRedPacketSysCache.getRedpacketQueue();
		ConcurrentLinkedQueue<DropRedPacketModel> redpacketNotTimesQueue = DropRedPacketSysCache
				.getRedpacketNotTimesQueue();
		if (redpacketQueue.size() <= 0 && redpacketNotTimesQueue.size() <= 0) {
			return null;
		}
		LinkedList<Object[]> list = new LinkedList<>();
		LinkedList<DropRedPacketModel> gettedList = new LinkedList<>();
		int size = Config_tjhbsys_296.getIns().getSortList().size();
		int redpacketNum = 0;
		int maxNum = Config_xtcs_004.getIns().get(DropRedPacketConst.MAXNUM).getNum();
		try {
			for (DropRedPacketModel model : redpacketQueue) {
				if (redpacketNum >= maxNum) {
					return list.toArray();
				}
				long id = model.getId();
				int num = model.getNum();
				List<DropRedPacketRecord> recordList = model.getRecordList();
				if (recordList != null) {
					boolean isGetted = recordList.contains(new DropRedPacketRecord(hero.getId()));
					if (isGetted) {
						gettedList.addFirst(model);
						continue;
					}
				}
				list.addFirst(new Object[] { (byte) (model.getType() <= size ? 1 : 0), 1, id, model.getType(),
						model.getName(), model.getIcon(), model.getFrame(), model.getNum(), 0 });
				redpacketNum++;
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(),
					"DropRedPacketManager createObjectArray redpacketMapStr:" + JSON.toJSONString(redpacketQueue));
		}
//		if (redpacketNum >= DropRedPacketConst.MAXNUM) {
//			return list.toArray();
//		}
		for (DropRedPacketModel model : gettedList) {
			if (redpacketNum >= maxNum) {
				return list.toArray();
			}
			long id = model.getId();
			List<DropRedPacketRecord> recordList = model.getRecordList();
			int index = recordList.indexOf(new DropRedPacketRecord(hero.getId()));
			if (index < 0) {
				continue;
			}
			DropRedPacketRecord record = recordList.get(index);
			int redPacket = record.getRedPacket();
			list.add(new Object[] { (byte) (model.getType() <= size ? 1 : 0), 2, id, model.getType(), model.getName(),
					model.getIcon(), model.getFrame(), model.getNum(), redPacket });
			redpacketNum++;
		}
		for (DropRedPacketModel model : redpacketNotTimesQueue) {
			if (redpacketNum >= maxNum) {
				return list.toArray();
			}
			long id = model.getId();
			list.add(new Object[] { (byte) (model.getType() <= size ? 1 : 0), 0, id, model.getType(), model.getName(),
					model.getIcon(), model.getFrame(), model.getNum(), 0 });
			redpacketNum++;
		}
		return list.toArray();
	}

	public void sendUI(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
			return;
		}
		DropRedPacket model = (DropRedPacket) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.DROPREDPACKET_NEWACT);
		Map<Integer, Integer[]> taskMap = model.getTaskMap();
		List<Struct_tjhb_296> sortList = Config_tjhb_296.getIns().getSortList();
		ArrayList<Object[]> objects = new ArrayList<>(sortList.size());
		for (Struct_tjhb_296 struct_tjhb_296 : sortList) {
			int id = struct_tjhb_296.getId();
			Integer[] parState = Optional.ofNullable(taskMap).map(mapper -> mapper.get(id))
					.orElse(DropRedPacketConst.DEFATE_INTARRAY);
			objects.add(new Object[] { id, parState[0], parState[1] });
		}
		DropRedPacketSender.sendCmd_11372(hero.getId(), objects.toArray());
	}

	public void send(Hero hero, int id) {
		DropRedPacket model = null;
		try {
			Struct_tjhb_296 struct_tjhb_296 = Config_tjhb_296.getIns().get(id);
			if (struct_tjhb_296 == null) {
				DropRedPacketSender.sendCmd_11374(hero.getId(), DropRedPacketConst.FAILURE_NOT);
				return;
			}
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
				return;
			}
			model = (DropRedPacket) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.DROPREDPACKET_NEWACT);
			Map<Integer, Integer[]> taskMap = model.getTaskMap();
			Integer[] parState = Optional.ofNullable(taskMap).map(mapper -> mapper.get(id))
					.orElse(DropRedPacketConst.DEFATE_INTARRAY);
			int state = parState[1];
			if (state == DropRedPacketConst.NOT_REACH) {
				DropRedPacketSender.sendCmd_11374(hero.getId(), DropRedPacketConst.FAILURE_NOT_REACH);
				return;
			}
			if (state == DropRedPacketConst.SENDED) {
				DropRedPacketSender.sendCmd_11374(hero.getId(), DropRedPacketConst.FAILURE_NOT_REP);
				return;
			}
			parState[1] = DropRedPacketConst.SENDED;
			DropRedPacketSender.sendCmd_11374(hero.getId(), DropRedPacketConst.SUCCESS);
			CrossDropRedPacketLC.getIns().sendToCen(hero, id, model);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"DropRedPacketManager send modelStr:" + JSON.toJSONString(model) + " id:" + id);
		}
	}

	public void get(Hero hero, long id) {
		DropRedPacket model = null;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
				return;
			}
			model = (DropRedPacket) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.DROPREDPACKET_NEWACT);
			int gettedTimes = model.getGettedTimes();
			int everydayTimes = Config_xtcs_004.getIns().get(DropRedPacketConst.EVERYDAYTIMES).getNum();
			if (gettedTimes >= everydayTimes) {
				DropRedPacketSender.sendCmd_11376(hero.getId(), DropRedPacketConst.FAILURE_OVER_TIMES, 0, 0);
				return;
			}
			DropRedPacketModel findModel = DropRedPacketFunction.getIns().getRedpacketQueueModel(id);
			if (findModel == null || findModel.getNum() <= 0) {
				DropRedPacketSender.sendCmd_11376(hero.getId(), DropRedPacketConst.FAILURE_NOT_NUM, 0,0);
				return;
			}
			if (findModel.getRecordList().contains(new DropRedPacketRecord(hero.getId()))) {
				DropRedPacketSender.sendCmd_11376(hero.getId(), DropRedPacketConst.FAILURE_NOT_REP, 0,0);
				return;
			}
			CrossDropRedPacketLC.getIns().getToCen(hero, id, model);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"DropRedPacketManager get modelStr:" + JSON.toJSONString(model) + " id:" + id);
		}
	}

	public void openRecordUI(Hero hero, long id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
			return;
		}
		DropRedPacketModel findModel = DropRedPacketFunction.getIns().getRedpacketQueueModel(id);
		if (findModel == null) {
			findModel = DropRedPacketFunction.getIns().getRedpacketNotTimesQueueModel(id);
			if (findModel == null) {
				DropRedPacketSender.sendCmd_11378(hero.getId(), null);
				return;
			}
		}
		List<DropRedPacketRecord> recordList = findModel.getRecordList();
		int size = recordList.size();
		ArrayList<Object[]> objects = new ArrayList<>(size);
		for (int i = 0; i < size; i++) {
			DropRedPacketRecord record = recordList.get(i);
			byte isHero = 0;
			if (record.getHid() == hero.getId()) {
				isHero = 1;
			}
			objects.add(new Object[] { record.getName(), record.getRedPacket(), isHero });
		}
		DropRedPacketSender.sendCmd_11378(hero.getId(), objects.toArray());
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		DropRedPacketSysCache.getRedpacketQueue().clear();
		DropRedPacketSysCache.getRedpacketNotTimesQueue().clear();
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		int oneDayRecharge = hero.getOneDayRecharge();
		if (oneDayRecharge > 0) {
			DropRedPacketFunction.getIns().taskHandler(hero, 1, oneDayRecharge);
		}
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		DropRedPacketSysCache.getRedpacketQueue().clear();
		DropRedPacketSysCache.getRedpacketNotTimesQueue().clear();
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		DropRedPacket model = new DropRedPacket(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		model.setTaskMap(new HashMap<>());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return DropRedPacket.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		DropRedPacketFunction.getIns().taskHandler(hero, 1, money);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return DropRedPacketEvent.getIns();
	}

}
