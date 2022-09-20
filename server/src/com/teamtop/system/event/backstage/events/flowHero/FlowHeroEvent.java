package com.teamtop.system.event.backstage.events.flowHero;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xitong_001;

/**
 * 角色相关流水事件类
 * @author hepl
 *
 */
public class FlowHeroEvent extends AbsBackstageEvent {
	
	@Override
	public void executeFiveMin(int currTime) {
		save();
	}

	@Override
	public void shutdownServer() {
		save();
	}
	
	private void save(){
		//经验流水
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExp>> flowExpCache = FlowHeroCache.getFlowExpCache();
		try {
			BackstageDao.insertBatch(flowExpCache);
		} catch (Exception e) {
			LogTool.error(e,this,"FlowHeroEvent save Exception!");
		}
		//战力流水
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroStrength>> flowStrengthCache = FlowHeroCache.getFlowStrengthCache();
		try {
			BackstageDao.insertBatch(flowStrengthCache);
		} catch (Exception e) {
			LogTool.error(e,this,"FlowHeroEvent save Exception!");
		}
		//货币流水(元宝除外)
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroMoney>> flowMoneyCache = FlowHeroCache.getFlowMoneyCache();
		try {
			BackstageDao.insertBatch(flowMoneyCache);
		} catch (Exception e) {
			LogTool.error(e,this,"FlowHeroEvent save Exception!");
		}
		//商城流水
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowShop>> flowAttrCache = FlowHeroCache.getFlowShopCache();
		try {
			BackstageDao.insertBatch(flowAttrCache);
		} catch (Exception e) {
			LogTool.error(e,this,"FlowHeroEvent save Exception!");
		}
		//系统参与流水
		ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowJoinFunction>> flowJionFuncCache = FlowHeroCache.getFlowJionFuncCache();
		try {
			BackstageDao.insertBatch(flowJionFuncCache);
		} catch (Exception e) {
			LogTool.error(e,this,"FlowHeroEvent save Exception! flowJionFuncCache");
		}
		//专属活动流水
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExAct>> flowExtActCache = FlowHeroCache.getFlowExtActCache();
		try {
			BackstageDao.insertBatch(flowExtActCache);
		} catch (Exception e) {
			LogTool.error(e,this,"FlowHeroEvent save Exception! flowExtActCache");
		}
		//元宝流水
		ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroYuanbaoMoney>> flowYuanbaoMoneyCache = FlowHeroCache.getFlowYuanbaoMoneyCache();
		try {
			BackstageDao.insertBatch(flowYuanbaoMoneyCache);
		} catch (Exception e) {
			LogTool.error(e,this,"flowYuanbaoMoneyCache save Exception!");
		}
	}
	
	/**
	 * 添加一条经验流水
	 * @param hid 角色id
	 * @param level 当前等级
	 * @param exp 当前经验值
	 * @param addExp 增加的经验值
	 * @param reason 操作原因
	 * @param zoneid 区号
	 * @param pf 平台代码
	 * @param usesys 注册系统
	 * @param addFlag 1增加，2减少
	 */
	public static void addExpFlow(long hid, int level, int rebornlv, long exp, long addExp, int reason, int zoneid,
			String pf, String usesys, int addFlag, int reincarnationLevel) {
		try {
			ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExp>> flowExpCache = FlowHeroCache.getFlowExpCache();
			ConcurrentLinkedQueue<B_FlowHeroExp> queue = flowExpCache.get(zoneid);
			if(queue == null){
				queue = new ConcurrentLinkedQueue<B_FlowHeroExp>();
				flowExpCache.put(zoneid, queue);
			}
			B_FlowHeroExp flow = new B_FlowHeroExp();
			flow.setHid(hid);
			flow.setLevel(level);
			flow.setExp(exp);
			flow.setAddExp(addExp);
			flow.setReason(reason);
			flow.setZoneid(zoneid);
			flow.setPfcode(pf);
			flow.setUsesys(usesys);
			flow.setAddFlag(addFlag);
			flow.setOperateTime(TimeDateUtil.getCurrentTime());
			flow.setReincarnationLevel(reincarnationLevel);
			queue.add(flow);
			//流水的日志
			//LogFlowUtil.recordLog(flow);
		} catch (Exception e) {
			LogTool.error(e,FlowHeroEvent.class,"FlowHeroEvent addExpFlow error!");
		}
	}
	
	/**
	 * 添加一条战力流水
	 * @param hid 角色id
	 * @param level 角色等级
	 * @param rebornlv 转生等级
	 * @param oldStrength 变化前的总战力
	 * @param totalStrength 变化后的总战力
	 * @param reason 操作原因
	 * @param pfCode 平台代码
	 * @param useSys 注册系统
	 * @param zoneid 区号
	 */
	public static void addStrengthFlow(long hid, int level, int rebornlv, long oldStrength, long totalStrength,
			int reason, String pfCode, String useSys, int zoneid, int reincarnationLevel) {
		try {
			ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroStrength>> flowStrengthCache = FlowHeroCache.getFlowStrengthCache();
			ConcurrentLinkedQueue<B_FlowHeroStrength> queue = flowStrengthCache.get(zoneid);
			if(queue == null){
				queue = new ConcurrentLinkedQueue<B_FlowHeroStrength>();
				flowStrengthCache.put(zoneid, queue);
			}
			B_FlowHeroStrength flow = new B_FlowHeroStrength();
			flow.setHid(hid);
			flow.setLevel(level);
			long chargeStrength=totalStrength-oldStrength;
			int addFlag=0;
			if (chargeStrength>0) {
				addFlag=SourceGoodConst.FLOW_OPER_ADD;
			}else if (chargeStrength<0) {
				addFlag=SourceGoodConst.FLOW_OPER_REDUCE;
			}else if(chargeStrength==0){
				addFlag=SourceGoodConst.FLOW_OPER_NO_CHANGE;
			}
			flow.setAddFlag(addFlag);
			flow.setChargeStrength(chargeStrength);
			flow.setOldStrength(oldStrength);
			flow.setTotalStrength(totalStrength);
			flow.setReason(reason);
			flow.setZoneid(zoneid);
			flow.setOperateTime(TimeDateUtil.getCurrentTime());
			flow.setPfcode(pfCode);
			flow.setUsesys(useSys);
			flow.setReincarnationLevel(reincarnationLevel);
			queue.add(flow);
			//流水的日志
			//LogFlowUtil.recordLog(flow);
		} catch (Exception e) {
			LogTool.error(e,FlowHeroEvent.class,"FlowHeroEvent addStrengthFlow error!");
		}
	}
	
	/**
	 * 添加一条货币流水
	 * @param hid 角色id
	 * @param level 角色等级
	 * @param rebornlv 转生等级
	 * @param type 货币类型，银两、绑银、元宝、礼券  (如果是元宝 要入新的货币流水表 )
	 * @param totalNum 货币总值
	 * @param changeNum 货币变化值
	 * @param reason 操作原因
	 * @param zoneid 区号
	 * @param pf 平台代码
	 * @param pd 注册系统
	 * @param addFlag 0增加，1减少
	 */
	public static void addMoneyFlow(long hid, int level, int type, long totalNum, long changeNum, int reason,
			int zoneid, String pf, String usesys, int addFlag, int reincarnationLevel) {
		try {
			if (type==GameConst.YUANBAO) {
				ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroYuanbaoMoney>> flowYuanbaoMoneyCache = FlowHeroCache.getFlowYuanbaoMoneyCache();
				ConcurrentLinkedQueue<B_FlowHeroYuanbaoMoney> queue = flowYuanbaoMoneyCache.get(zoneid);
				if(queue == null){
					queue = new ConcurrentLinkedQueue<B_FlowHeroYuanbaoMoney>();
					flowYuanbaoMoneyCache.put(zoneid, queue);
				}
				B_FlowHeroYuanbaoMoney flow = new B_FlowHeroYuanbaoMoney();
				flow.setHid(hid);
				flow.setLevel(level);
				flow.setType(type);
				flow.setTotalNum(totalNum);
				flow.setChangeNum(changeNum);
				flow.setReason(reason);
				flow.setZoneid(zoneid);
				flow.setPfcode(pf);
				flow.setAddFlag(addFlag);
				flow.setOperateTime(TimeDateUtil.getCurrentTime());
				flow.setUsesys(usesys);
				flow.setReincarnationLevel(reincarnationLevel);
				queue.add(flow);
			}else {
				ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroMoney>> flowMoneyCache = FlowHeroCache.getFlowMoneyCache();
				ConcurrentLinkedQueue<B_FlowHeroMoney> queue = flowMoneyCache.get(zoneid);
				if(queue == null){
					queue = new ConcurrentLinkedQueue<B_FlowHeroMoney>();
					flowMoneyCache.put(zoneid, queue);
				}
				B_FlowHeroMoney flow = new B_FlowHeroMoney();
				flow.setHid(hid);
				flow.setLevel(level);
				flow.setType(type);
				flow.setTotalNum(totalNum);
				flow.setChangeNum(changeNum);
				flow.setReason(reason);
				flow.setZoneid(zoneid);
				flow.setPfcode(pf);
				flow.setAddFlag(addFlag);
				flow.setOperateTime(TimeDateUtil.getCurrentTime());
				flow.setUsesys(usesys);
				flow.setReincarnationLevel(reincarnationLevel);
				queue.add(flow);
				//流水的日志
				//LogFlowUtil.recordLog(flow);
			}
		} catch (Exception e) {
			LogTool.error(e,FlowHeroEvent.class,"FlowHeroEvent addMoneyFlow error!");
		}
	}
	
	/**
	 * 添加一条商城流水记录
	 * @param hid 角色id
	 * @param level 角色等级
	 * @param shoptype 商城类型（神秘 vip 声望）
	 * @param itemid   物品id
	 * @param itemcost 物品单价	
	 * @param buynum   购买数量
	 * @param sumcost  消费总金额
	 * @param costtype 消耗钱币类型	
	 * @param zoneid 区号
	 * @param pf 平台代码
	 * @param usesys 注册系统
	 */
	public static void addShopFlow(long hid, int level, int shoptype, int itemid, int itemcost, int buynum,
			int costtype, int zoneid, String pfcode, String usesys, int reincarnationLevel) {
		try {
			ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowShop>> flowAttrCache = FlowHeroCache.getFlowShopCache();
			ConcurrentLinkedQueue<B_FlowShop> queue = flowAttrCache.get(zoneid);
			if(queue == null){
				queue = new ConcurrentLinkedQueue<B_FlowShop>();
				flowAttrCache.put(zoneid, queue);
			}
			B_FlowShop flow = new B_FlowShop();
			flow.setHid(hid);
			flow.setLevel(level);
			flow.setShoptype(shoptype);
			flow.setItemid(itemid);
			flow.setItemcost(itemcost);
			flow.setBuynum(buynum);
			flow.setSumcost(itemcost*buynum);
			flow.setCosttype(costtype);
			flow.setZoneid(zoneid);
			flow.setPfcode(pfcode);
			flow.setUsesys(usesys);
			flow.setOperateTime(TimeDateUtil.getCurrentTime());
			flow.setReincarnationLevel(reincarnationLevel);
			queue.add(flow);
			//流水的日志
			//LogFlowUtil.recordLog(flow);
		} catch (Exception e) {
			LogTool.error(e,FlowHeroEvent.class,"FlowHeroEvent addShopFlow error!");
		}
	}
	
	/**
	 * 添加一条系统参与流水
	 * @param hid		角色id
	 * @param level		等级
	 * @param vipLevel	vip等级
	 * @param createJob	职业
	 * @param strength	战力
	 * @param sysId		系统id
	 * @param zoneid	区号
	 * @param pfcode 	平台代码
	 * @param usesys 	注册系统
	 */
	public static void addJoinSystemFlow(long hid, int level, int vipLevel, int createJob, long strength, int sysId,
			int zoneid, String pfcode, String usesys, int reincarnationLevel) {
		try {
			ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowJoinFunction>> flowJionFuncCache = FlowHeroCache.getFlowJionFuncCache();
			ConcurrentLinkedQueue<B_FlowJoinFunction> queue = flowJionFuncCache.get(zoneid);
			if(queue == null){
				queue = new ConcurrentLinkedQueue<B_FlowJoinFunction>();
				flowJionFuncCache.put(zoneid, queue);
			}
			B_FlowJoinFunction flow = new B_FlowJoinFunction();
			flow.setHid(hid);
			flow.setLevel(level);
			flow.setVipLevel(vipLevel);
			flow.setCreateJob(createJob);
			flow.setStrength(strength);
			flow.setSysId(sysId);
			String sysName = Config_xitong_001.getIns().get(sysId).getName();
			flow.setSysName(sysName);
			flow.setZoneid(zoneid);
			flow.setPfcode(pfcode);
			flow.setUsesys(usesys);
			flow.setJoinTime(TimeDateUtil.getCurrentTime());
			flow.setReincarnationLevel(reincarnationLevel);
			queue.add(flow);
		} catch (Exception e) {
			LogTool.error(e, FlowHeroEvent.class, "FlowHeroEvent addJoinSystemFlow error!  hid=" + hid);
		}
	}

	/**
	 * 添加一条专属活动领取奖励记录
	 * @param hid
	 * @param zoneid
	 * @param name
	 * @param level
	 * @param viplv
	 * @param exActId
	 * @param actId
	 * @param openid
	 * @param loginIp
	 * @param opType
	 * @param pfcode
	 * @param usesys
	 * @param time
	 * @param reward
	 */
	public static void addHeroExActFlow(long hid, int zoneid, String name, int level, int viplv, int exActId, int actId,
			String openid, String loginIp, int opType, String pfcode, String usesys, String reward, long money,
			int num, int reincarnationLevel) {
		try {
			ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowHeroExAct>> flowExtActCache = FlowHeroCache
					.getFlowExtActCache();
			ConcurrentLinkedQueue<B_FlowHeroExAct> queue = flowExtActCache.get(zoneid);
			if (queue == null) {
				queue = new ConcurrentLinkedQueue<>();
				flowExtActCache.put(zoneid, queue);
			}
			B_FlowHeroExAct flow = new B_FlowHeroExAct();
			flow.setHid(hid);
			flow.setName(name);
			flow.setLevel(level);
			flow.setViplv(viplv);
			flow.setZoneid(zoneid);
			flow.setExActId(exActId);
			flow.setActId(actId);
			flow.setLoginIp(loginIp);
			flow.setOpenid(openid);
			flow.setOpType(opType);
			flow.setPfcode(pfcode);
			flow.setUsesys(usesys);
			flow.setTime(TimeDateUtil.getCurrentTime());
			flow.setReward(reward);
			flow.setMoney(money);
			flow.setNum(num);
			flow.setReincarnationLevel(reincarnationLevel);
			queue.add(flow);
		} catch (Exception e) {
			LogTool.error(e, FlowHeroEvent.class, "FlowHeroEvent addHeroExActFlow error! hid=" + hid);
		}
	}
}
