package com.teamtop.system.activity.ativitys.dropRedPacket;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossZone;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dropRedPacket.cross.CrossDropRedPacketSysCache;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacket;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketRecord;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;
import excel.config.Config_tjhb_296;
import excel.config.Config_tjhbsys_296;
import excel.struct.Struct_tjhb_296;
import excel.struct.Struct_tjhbsys_296;

import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;

public class DropRedPacketFunction {

    private static volatile DropRedPacketFunction ins = null;

    public static DropRedPacketFunction getIns() {
        if (ins == null) {
            synchronized (DropRedPacketFunction.class) {
                if (ins == null) {
                    ins = new DropRedPacketFunction();
                }
            }
        }
        return ins;
    }

    private DropRedPacketFunction() {
    }

    /**
     * 任务处理
     *
     * @param hero
     * @param type 任务类型 1充值,2消费,3寻宝,4神将阁
     * @param par  任务参数
     */
    public void taskHandler(Hero hero, int type, int par) {
    	DropRedPacket model=null;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
				return;
			}
			model = (DropRedPacket) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.DROPREDPACKET_NEWACT);
			Map<Integer, Integer[]> taskMap = model.getTaskMap();
			Map<Integer, List<Struct_tjhb_296>> configMap = DropRedPacketSysCache.getConfigMap();
			List<Struct_tjhb_296> configList = configMap.get(type);
			boolean isRedPoint = false;
			for (Struct_tjhb_296 struct_tjhb_296 : configList) {
				Integer[] parState = taskMap.get(struct_tjhb_296.getId());
				if (parState == null) {
					parState = new Integer[] { par, DropRedPacketConst.NOT_REACH };
					taskMap.put(struct_tjhb_296.getId(), parState);
				} else {
					parState[0] += par;
				}
				if (parState[0] >= struct_tjhb_296.getCs() && parState[1] == DropRedPacketConst.NOT_REACH) {
					parState[1] = DropRedPacketConst.CAN;
					isRedPoint = true;
				}
			}
			if (isRedPoint) {
				DropRedPacketFunction.getIns().redPoint_f1(hero, false);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "DropRedPacketFunction taskHandler modelStr:"
					+ JSON.toJSONString(model) + " type:" + type + " par:" + par);
		}
    }

    /**
     * 随机红包列表(旧的),需求参考文档
     *
     * @param id 配置表id
     * @return
     */
    public List<Integer> randomRedPacketListOld(int id) {
        int num = 0;
        int totalAmount = 0;
        int size = Config_tjhbsys_296.getIns().size();
        if (id <= size) {
            Struct_tjhbsys_296 struct_tjhbsys_296 = Config_tjhbsys_296.getIns().get(id);
            num = struct_tjhbsys_296.getSl();
            totalAmount = struct_tjhbsys_296.getHb()[0][2];
        } else {
            Struct_tjhb_296 struct_tjhb_296 = Config_tjhb_296.getIns().get(id);
            num = struct_tjhb_296.getSl();
            totalAmount = struct_tjhb_296.getHb()[0][2];
        }
        int base = totalAmount / 10;
        int rest = totalAmount - base;
        LinkedList<Integer> list = new LinkedList<>();
        double total = 0;
        for (int i = 1; i <= num; i++) {
            int randomDiv = RandomUtil.getRandomNumInAreas(1, 100);
            list.add(randomDiv);
            total += randomDiv;
        }
        Collections.sort(list);
        Integer last = list.getLast();
        double ratio = last / total;
		if (ratio > 0.5 && num > 1) {
			list.pollLast();
			Integer last2 = list.pollLast();
			list.add((last + last2) / 2);
			list.add((last + last2) / 2);
		}
        LinkedList<Integer> randomRedPacketList = new LinkedList<>();
        randomRedPacketList.add(base / num);
        int totalRedPacket = 0;
        for (Integer randomDiv : list) {
            int rankdomNum = (int) (Math.ceil(rest * randomDiv / total));
            randomRedPacketList.add(rankdomNum);
            totalRedPacket += rankdomNum;
        }
        //多出的红包额度，重新除去差额从而满足配置表的红包总额
        int more = totalRedPacket - rest;
        randomRedPacketList.add(randomRedPacketList.pollLast() - more);

        int total1 = 0;
        for (Integer integer : randomRedPacketList) {
            total1 += integer;
        }
        return randomRedPacketList;
    }

    /**
     * 随机红包(旧的)
     *
     * @param id
     * @param list
     * @return
     */
    public int[][] randomRedPacketOld(int id, List<Integer> list) {
        int size = Config_tjhbsys_296.getIns().size();
        int[][] hb = null;
        if (id <= size) {
            Struct_tjhbsys_296 struct_tjhbsys_296 = Config_tjhbsys_296.getIns().get(id);
            hb = struct_tjhbsys_296.getHb();
        } else {
            Struct_tjhb_296 struct_tjhb_296 = Config_tjhb_296.getIns().get(id);
            hb = struct_tjhb_296.getHb();
        }
        if (hb == null) {
            return null;
        }
        Integer base = list.get(0);
        int randomIndex = RandomUtil.getRandomNumInAreas(1, list.size() - 1);
        Integer randomNum = list.get(randomIndex);
        list.remove(randomIndex);
        return new int[][]{new int[]{hb[0][0], hb[0][1], randomNum + base}};
    }
    
	/**
	 * 随机红包列表(新的)，朱老板修改后的
	 *1、初始剩余红包总额=红包总额-保底金额*发放人数
	 *2、保底金额=max(红包总金额*0.1/发放人数,1)
	 *3、随机区间=(0,剩余红包总额/剩余发放人数*2)
	 * @param id
	 * @param list
	 * @return
	 */
	public List<Integer> randomRedPacketList(int id) {
		int num = 0;
		int[][] hb = null;
		int size = Config_tjhbsys_296.getIns().size();
		if (id <= size) {
			Struct_tjhbsys_296 struct_tjhbsys_296 = Config_tjhbsys_296.getIns().get(id);
			num = struct_tjhbsys_296.getSl();
			hb = struct_tjhbsys_296.getHb();
		} else {
			Struct_tjhb_296 struct_tjhb_296 = Config_tjhb_296.getIns().get(id);
			num = struct_tjhb_296.getSl();
			hb = struct_tjhb_296.getHb();
		}
		List<Integer> randomRedPacketList = new ArrayList<>(num);
		int hbBase = hb[0][2] / 10;
		int restRedPacket = hb[0][2] - hbBase;
		int baseMax = hbBase / num;
		int base = baseMax;
		if (baseMax < 1) {
			// 防止出现100块的红包，20个人抢，出现每个人保底0.5的情况，最少要有1
			base = 1;
			restRedPacket = hb[0][2] - num;
		}

		for (int i = 0; i < num; i++) {
			int restNum = num - i;
			if (restNum <= 1) {
				// 最后一个红包
				randomRedPacketList.add(restRedPacket + base + hbBase % num);
				break;
			}
			int randomMax = restRedPacket / restNum * 2;
			int random = 0;
			if (randomMax > 0) {
				random = RandomUtil.getRandomNumInAreas(0, randomMax);
			}
			restRedPacket -= random;
			int redPacket = base + random;
			randomRedPacketList.add(redPacket);
		}
		return randomRedPacketList;
	}
	
	/**
	 * 随机红包(新的)
	 *
	 * @param id
	 * @param list
	 * @return
	 */
	public int[][] randomRedPacket(int id, List<Integer> list) {
		int size = Config_tjhbsys_296.getIns().size();
		int[][] hb = null;
		if (id <= size) {
			Struct_tjhbsys_296 struct_tjhbsys_296 = Config_tjhbsys_296.getIns().get(id);
			hb = struct_tjhbsys_296.getHb();
		} else {
			Struct_tjhb_296 struct_tjhb_296 = Config_tjhb_296.getIns().get(id);
			hb = struct_tjhb_296.getHb();
		}
		if (hb == null) {
			return null;
		}
		int randomIndex = RandomUtil.getRandomNumInAreas(0, list.size() - 1);
		Integer randomNum = list.get(randomIndex);
		list.remove(randomIndex);
		return new int[][] { new int[] { hb[0][0], hb[0][1], randomNum } };
	}

    /**
     * 初始化系统红包配置
     */
    public void initSysConfigMap() {
        List<Struct_tjhbsys_296> sortList = Config_tjhbsys_296.getIns().getSortList();
        TreeMap<Integer, Integer> sysConfigMap = new TreeMap<>();
        for (Struct_tjhbsys_296 struct_tjhbsys_296 : sortList) {
            String timeStr = struct_tjhbsys_296.getTime();
            int time = getTime(timeStr);
            if (time == 0) {
                continue;
            }
            sysConfigMap.put(struct_tjhbsys_296.getId(), time);
        }
        if (CrossZone.isCrossServer()) {
            CrossDropRedPacketSysCache.setSysConfigMap(sysConfigMap);
        } else {
            DropRedPacketSysCache.setSysConfigMap(sysConfigMap);
        }
    }

    public int getTime(String timeStr) {
        try {
            String[] timeArray = timeStr.split(":");
            int hour = Integer.parseInt(timeArray[0]);
            int min = Integer.parseInt(timeArray[1]);
            int sce = Integer.parseInt(timeArray[2]);
            int time = TimeDateUtil.getOneTime(0, hour, min, sce);
            return time;
        } catch (NumberFormatException e) {
            LogTool.error(e, this, "DropRedPacketSysCache getTime timeStr:" + timeStr);
        }
        return 0;
    }

    /**
     * 计算今天是开服第几天。返回值从1开始，例如今天开服，则返回1；(中央服用)
     *
     * @return
     */
    public int betweenOpen(int serverOpenTime) {
        int openDayZero = TimeDateUtil.getOneDayZeroTime(serverOpenTime);
        return ((TimeDateUtil.getTodayZeroTimeReturnInt() - openDayZero) / (3600 * 24)) + 1;

    }

    public long createRedPacketId(long hid, int type) {
        return hid * 1000 + type;
    }

    public long createSysRedPacketId(int type) {
        int currentTime = TimeDateUtil.getCurrentTime();
        String timeStrByInt = TimeDateUtil.getTimeStrByInt(currentTime, "yyyy-MM-dd");
        return Integer.parseInt(timeStrByInt) * 100 + type;
    }
    
	public DropRedPacketModel getRedpacketQueueModel(long id) {
		ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue = DropRedPacketSysCache.getRedpacketQueue();
		for (DropRedPacketModel model : redpacketQueue) {
			if (model.getId() == id) {
				return model;
			}
		}
		return null;
	}

	public DropRedPacketModel getRedpacketNotTimesQueueModel(long id) {
		ConcurrentLinkedQueue<DropRedPacketModel> redpacketNotTimesQueue = DropRedPacketSysCache
				.getRedpacketNotTimesQueue();
		for (DropRedPacketModel model : redpacketNotTimesQueue) {
			if (model.getId() == id) {
				return model;
			}
		}
		return null;
	}

	/**
	 * 红点发送
	 *
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
			return;
		}
		DropRedPacket model = (DropRedPacket) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.DROPREDPACKET_NEWACT);
		Map<Integer, Integer[]> taskMap = model.getTaskMap();
		for (Integer[] value : taskMap.values()) {
			if (value[1] == DropRedPacketConst.CAN) {
				redPoint_f1(hero, isLogin);
				return;
			}
		}
		
		ConcurrentLinkedQueue<DropRedPacketModel> redpacketQueue = DropRedPacketSysCache.getRedpacketQueue();
		for (DropRedPacketModel cacheModel:redpacketQueue) {
			List<DropRedPacketRecord> recordList = cacheModel.getRecordList();
			if (recordList != null) {
				boolean isGetted = recordList.contains(new DropRedPacketRecord(hero.getId()));
				if (!isGetted) {
					redPoint_f1(hero, isLogin);
					return;
				}
			}
		}
	}

	public void redPoint_f1(Hero hero, boolean isLogin) {
		if (isLogin) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.DROPREDPACKET_NEWACT, 1,
					RedPointConst.HAS_RED);
		} else {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.DROPREDPACKET_NEWACT, 1,
					RedPointConst.HAS_RED);
		}
	}

}
