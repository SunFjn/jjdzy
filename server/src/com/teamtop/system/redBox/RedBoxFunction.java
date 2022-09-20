package com.teamtop.system.redBox;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redBox.cross.RedBoxCross;
import com.teamtop.system.redBox.cross.RedBoxCrossCache;
import com.teamtop.system.redBox.cross.RedBoxCrossDao;
import com.teamtop.system.redBox.cross.RedBoxGeter;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class RedBoxFunction {
	
	private static volatile RedBoxFunction ins = null;

	public static RedBoxFunction getIns() {
		if (ins == null) {
			synchronized (RedBoxFunction.class) {
				if (ins == null) {
					ins = new RedBoxFunction();
				}
			}
		}
		return ins;
	}

	private RedBoxFunction() {
	}
	
	public RedBoxCross createRedBox(int partid, long hid, int fanum, String name, String boxname, int icon, int frame) {
		try {
			long unitId = RedBoxCrossCache.getAndAddBattleUnitId();
			RedBoxCross crossRedBox=new RedBoxCross();
			crossRedBox.setBoxid(unitId);
			crossRedBox.setSendid(hid);
			crossRedBox.setBelongPartid(partid);
			crossRedBox.setFrame(frame);
			crossRedBox.setIcon(icon);
			crossRedBox.setMaxNum(fanum);
			crossRedBox.setLeftNum(fanum);
			crossRedBox.setName(name);
			crossRedBox.setBoxname(boxname);
			crossRedBox.setRedBoxGetInfo(new HashMap<>());
			List<Integer> randomRedPacketList = randomRedPacketList(fanum);
			crossRedBox.setRandomList(randomRedPacketList);
			
			if (!RedBoxCrossCache.getRedBoxMap().containsKey(partid)) {
				RedBoxCrossCache.getRedBoxMap().put(partid, new ConcurrentHashMap<Long, RedBoxCross>());
			}
			ConcurrentHashMap<Long, RedBoxCross> concurrentHashMap = RedBoxCrossCache.getRedBoxMap().get(partid);
			concurrentHashMap.put(unitId, crossRedBox);
			LogTool.info("createRedBox success:partid:"+partid+" hid:"+hid+" fanum:"+fanum, RedBoxFunction.class);
			//红包缓存变化 通知子服
			RedBoxCrossIO.getIns().CTLRedBoxMapChange(partid, crossRedBox,1);
			return crossRedBox;
		} catch (Exception e) {
			LogTool.error(e, RedBoxFunction.class, "createRedBox has wrong");
		}
		return null;
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
	public List<Integer> randomRedPacketList(int sumNum) {
		List<Integer> randomRedPacketList = new ArrayList<>(RedBoxConst.QIANG_NUM);
		int hbBase = sumNum / 10;
		int restRedPacket = sumNum - hbBase;
		int baseMax = hbBase / RedBoxConst.QIANG_NUM;
		int base = baseMax;
		if (baseMax < 1) {
			// 防止出现100块的红包，20个人抢，出现每个人保底0.5的情况，最少要有1
			base = 1;
			restRedPacket = sumNum - RedBoxConst.QIANG_NUM;
		}

		for (int i = 0; i < RedBoxConst.QIANG_NUM; i++) {
			int restNum = RedBoxConst.QIANG_NUM - i;
			if (restNum <= 1) {
				// 最后一个红包
				randomRedPacketList.add(restRedPacket + base + hbBase % RedBoxConst.QIANG_NUM);
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

	public void getRedBox(Channel channel, CrossData crossData) {
		long hid = crossData.getObject(RedBoxEnum.hid, Long.class);
		String name=crossData.getObject(RedBoxEnum.name, String.class);
		try {
			long boxid=crossData.getObject(RedBoxEnum.goalboxid, Long.class);
			int partid=CrossCache.getPartId(channel);
			crossData.finishGet();
			
			if (!RedBoxCrossCache.getRedBoxMap().containsKey(partid)) {
				crossData.putObject(RedBoxEnum.getboxRest, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return ;
			}
			ConcurrentHashMap<Long, RedBoxCross> concurrentHashMap = RedBoxCrossCache.getRedBoxMap().get(partid);
			RedBoxCross redBoxCross = concurrentHashMap.get(boxid);
			
			if (redBoxCross==null) {
				crossData.putObject(RedBoxEnum.getboxRest, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return ;
			}
			HashMap<Long, RedBoxGeter> redBoxGetInfo = redBoxCross.getRedBoxGetInfo();
			int size = redBoxGetInfo.size();
			if (size>=RedBoxConst.QIANG_NUM) {
				crossData.putObject(RedBoxEnum.getboxRest, 2);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return ;
			}
			if (redBoxGetInfo.containsKey(hid)) {
				crossData.putObject(RedBoxEnum.getboxRest, 3);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return ;
			}
			
			List<Integer> randomList = redBoxCross.getRandomList();
			
			int randomIndex = RandomUtil.getRandomNumInAreas(0, randomList.size() - 1);
			Integer randomNum = randomList.get(randomIndex);
			randomList.remove(randomIndex);
			
			RedBoxGeter redBoxGeter=new RedBoxGeter();
			redBoxGeter.setHid(hid);
			redBoxGeter.setName(name);
			redBoxGeter.setGetnum(randomNum);
			redBoxCross.getRedBoxGetInfo().put(hid, redBoxGeter);
			int leftNum=redBoxCross.getLeftNum()-randomNum;
			if (leftNum<0) {
				leftNum=0;
			}
			redBoxCross.setLeftNum(leftNum);
			
			
			crossData.putObject(RedBoxEnum.getboxRest, 0);
			crossData.putObject(RedBoxEnum.robnum, randomNum);
			
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			
			//红包缓存变化 通知子服
			RedBoxCrossIO.getIns().CTLRedBoxMapChange(partid, redBoxCross,2);
			return ;
			
		} catch (Exception e) {
			LogTool.error(e, RedBoxFunction.class, "getRedBox has wrong hid:"+hid);
		}
		
	}
	
	public void localZero(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REDBOX)) {
				return ;
			}
			RedBox redBox = hero.getRedBox();
			redBox.setSendNum(0);
		} catch (Exception e) {
			LogTool.error(e, RedBoxFunction.class, "localZero has wrong hid:"+hero.getId());
		}
	}
	
	public void localCacheZero() {
		try {
			ConcurrentHashMap<Long, RedBoxCross> redBoxMap = RedBoxLocalCache.getRedBoxMap();
			for (RedBoxCross redBoxCross: redBoxMap.values()) {
				long sendid = redBoxCross.getSendid();
				int zeronId=CommonUtil.getZoneIdById(sendid);
				if (GameProperties.zoneids.contains(zeronId)) {
					if (redBoxCross.getLeftNum()>0) {
						int[][] fujianData= {{GameConst.GOLDYUANBAO_COIN,0,redBoxCross.getLeftNum()}};
						MailFunction.getIns().sendMailWithFujianData2(sendid, MailConst.REDBOX_LEFTREWARD, new Object[] { MailConst.REDBOX_LEFTREWARD}, fujianData);
					}
				}
			}
			RedBoxLocalCache.getRedBoxMap().clear();
		} catch (Exception e) {
			LogTool.error(e, RedBoxFunction.class, "localCacheZero");
		}
	}
	
	public void crossCacheZero() {
		try {
			RedBoxCrossCache.getRedBoxMap().clear();;
			RedBoxCrossDao.getIns().deleteRedBoxCross();
		} catch (Exception e) {
			LogTool.error(e, RedBoxFunction.class, "crossCacheZero");
		}
	}
	
	public void rechargeHandle(Hero hero, int money, int product_id) {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(RedBoxConst.BILI);
		int duiHuanBiLi=struct_xtcs_004.getNum();
		int addNum=money*duiHuanBiLi;
		UseAddUtil.add(hero, GameConst.GOLDYUANBAO_COIN, addNum, SourceGoodConst.GOLDYUANBAO_ADD,true);
	}

}
