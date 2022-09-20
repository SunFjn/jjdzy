package com.teamtop.system.bag;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.equip.EquipConst;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfoFunction;
import com.teamtop.system.event.backstage.events.flowEquip.FlowEquipEvent;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.backstage.events.flowTools.FlowToolEvent;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.event.useAddEvent.MailInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroDataSaver;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_zhuangbei_204;

/**
 * 背包功能接口类
 * @author lobbyer
 * @date 2017年3月27日
 */
public class BagFunction{
	private static Logger log = LoggerFactory.getLogger(BagFunction.class);
	
	private static BagFunction ins;
	public static BagFunction getIns() {
		if(ins == null) {
			ins = new BagFunction();
		}
		return ins;
	}
	
	public Map<Long, BagGrid> getEquipData(Hero hero) {
		Map<Long, BagGrid> equipData= new HashMap<>();
		Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
		if (notOnBodyEquip!=null&&notOnBodyEquip.size()>0) {
			for (Long equipid:notOnBodyEquip.keySet()) {
				Equip equip=notOnBodyEquip.get(equipid);
				BagGrid bagGrid = new BagGrid(equip.getSysId(),equipid,1,0);
				equipData.put(equipid, bagGrid);
			}
		}else {
//			LogTool.warn("getEquipData has wrong:hid "+hero.getId(), BagFunction.class);
		}
		return equipData;
		
	}
	/**
	 * 上线发送背包数据
	 * @author lobbyer
	 * @param hero
	 * @date 2017年3月29日
	 */
	public void sendBagData(Hero hero){
		Bag bag = hero.getBag();
		Map<Long, BagGrid> equipData = getEquipData(hero);
		Map<Integer, BagGrid> itemData = bag.getItemData();
		Object[] eObj = new Object[equipData.size()];
		int i = 0;
		for(BagGrid grid:equipData.values()) {
			eObj[i] = new Object[]{grid.getUnitId(),grid.getSysId()};
			i++;
		}
		Object[] iObj = new Object[itemData.size()];
		i = 0;
		for(BagGrid grid:itemData.values()) {
			iObj[i] = new Object[]{grid.getSysId(),grid.getNum()};
			i++;
		}
		BagSender.sendCmd_200(hero.getId(), eObj, iObj, bag.getOpenGrid());
	}
	
	/**
	 * 获取装备背包格子数
	 * @author lobbyer
	 * @param hero
	 * @param equipData 为null时获取角色空格子
	 * @return
	 * @date 2017年3月27日
	 */
	public int getEquipEmptyGrid(Hero hero,Map<Long, BagGrid> equipData){
		if(equipData == null) equipData =getEquipData(hero);
		if(equipData.size() >= getEquipBagGrid(hero)){
			return 0;
		}
		int bagGrid = getEquipBagGrid(hero);
		return bagGrid - equipData.size();
	}
	
	/**
	 * 获取道具背包格子数
	 * @author lobbyer
	 * @param hero
	 * @param itemData 为null时获取角色空格子
	 * @return
	 * @date 2017年3月27日
	 */
	public int getItemEmptyGrid(Hero hero,Map<Integer, BagGrid> itemData) {
		Bag bag = hero.getBag();
		if(itemData == null) itemData = bag.getItemData();
		if(itemData.size() >= getToolBagGrid(hero)){
			return 0;
		}
		int useNum = 0;
		int bagGrid = getToolBagGrid(hero);
		for(BagGrid grid:itemData.values()) {
			int model = grid.getNum() % BagConst.MAX_OVERLY;
			if(grid.getNum() <= BagConst.MAX_OVERLY) {
				useNum ++;
			}else{
				useNum += (grid.getNum()/BagConst.MAX_OVERLY) + (model==0?0:1);
			}
		}
		return bagGrid - useNum;
	}
	
	/**
	 * 更新背包装备
	 * @author lobbyer
	 * @param hero
	 * @param equipMap (删除时bagGrid的num设为0)
	 * @date 2017年3月28日
	 */
	public void updateEquip(Hero hero,Map<Long, BagGrid> equipMap) {
		Object[] result = new Object[equipMap.size()];
		int i = 0;
		for(BagGrid grid:equipMap.values()) {
			result[i] = new Object[]{grid.getUnitId(),grid.getSysId(),grid.getNum()};
			i++;
		}
		BagSender.sendCmd_204(hero.getId(), result);
	}
	
	/**
	 * 更新背包道具
	 * @author lobbyer
	 * @param hero
	 * @param itemMap (删除时bagGrid的num设为0)
	 * @date 2017年3月28日
	 */
	public void updateItem(Hero hero,Map<Integer, BagGrid> itemMap) {
		Object[] result = new Object[itemMap.size()];
		int i = 0;
		for(BagGrid grid:itemMap.values()) {
			result[i] = new Object[]{grid.getSysId(),grid.getNum()};
			i++;
		}
		BagSender.sendCmd_206(hero.getId(), result);
	}
	/**
	 * 检查能否添加物品
	 * @author lobbyer
	 * @param hid
	 * @param data int[]{sysid,num,uid,type}
	 * @date 2017年3月28日
	 */
	public boolean checkAddGood(long hid,GridTempData[] data){
		Hero hero = HeroCache.getHero(hid);
		try {
			Bag bag = hero.getBag();
			Map<Long, BagGrid> equipData = getEquipData(hero);
			Map<Integer, BagGrid> itemData = bag.getItemData();
			int equipNum = 0;
			int itemEmpty = getItemEmptyGrid(hero, null);
			int tooltotalGrid = getToolBagGrid(hero);
			int equiptotalGrid=getEquipBagGrid(hero);
			//预判可叠加的道具数量
			Map<Integer, Integer> itemNumMap = new HashMap<Integer, Integer>();
			
			for(GridTempData good:data) {
				if(good.getType() == GameConst.TOOL) {
					//道具
					if(Config_daoju_204.getIns().get(good.getSysid()) == null) return false;
					if(itemData.size() >= tooltotalGrid) {
						return false;
					}else{
						Integer num = itemNumMap.get(good.getSysid());
						if(num != null) {
							itemNumMap.put(good.getSysid(),num + good.getNum());
						}else{
							itemNumMap.put(good.getSysid(), good.getNum());
						}
					}
				}
			}
			int itemNum = 0;
			for(GridTempData good:data) {
				if(good.getType() == GameConst.EQUIP) {
					if(equipData.size() + equipNum >= equiptotalGrid) {
						return false;
					}else{
						equipNum += good.getNum();
					}
				}else if(good.getType() == GameConst.TOOL) {
					//道具
					int num = itemNumMap.get(good.getSysid());
					BagGrid bagGrid = itemData.get(good.getSysid());
					if(bagGrid != null) {
						int hasNum = bagGrid.getNum();
						int before = getNeedGrid(hasNum);
						int after = getNeedGrid(hasNum + num);
						itemNum += (after - before);
					}else{
						itemNum += getNeedGrid(num);
					}
				}
				if(itemNum > itemEmpty) return false;
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, this, "checkAddGood hid:"+hero.getId()+" Exception!");
			return false;
		}
	}
	
	/**
	 * 获取道具数量需要的格子数
	 * @author lobbyer
	 * @param num 道具数量
	 * @return
	 * @date 2017年3月28日
	 */
	public int getNeedGrid(int num){
		if(num <= BagConst.MAX_OVERLY) return 1;
		return (num/BagConst.MAX_OVERLY+(num%BagConst.MAX_OVERLY==0?0:1));
	}
	
	/**
	 * 存放物品到背包
	 * @param data 待存放的物品集合  
	 * @param hid 角色id
	 * @param isNew 是否为新物品 ture为新物品
	 * @param reason 操作原因,用于后台流水记录
	 * @param dealOnline true处理未入背包数据
	 * @return boolean true 存放成功 false 存放失败
	 */
	public Map<Integer, BagGrid> storeGoodsToBag(GridTempData[] data,long hid,int reason, boolean notice, boolean dealOnline, List<Long> createIdList){
		//校验参数
		if(hid<=0){
			return null;
		}
		//检验放入的物品
		if(!checkGoodData(data)){
			log.warn(hid+" put to bag data is vildate please check it, bag data is "+Arrays.deepToString(data));
			return null;
		}
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			log.warn(hid+" hero is null storeGoodsToBag fail  ");
			return null;			
		}
		Bag bag = hero.getBag();
		if(bag==null){
			log.warn(hid+" bag object is null storeGoodsToBag fail  ");
			return null;			
		}
		Map<Integer, Integer> oldNumMap = new HashMap<>();
		for (GridTempData td : data) {
			if (td == null) {
				continue;
			}
			int sysid = td.getSysid();
			if (oldNumMap.containsKey(sysid)) {
				continue;
			}
			int num = getGoodsNumBySysId(hid, sysid);
			oldNumMap.put(sysid, num);
		}
		Map<Integer, BagGrid> addGoodsToBag = addGoodsToBag(hid, data, reason, createIdList, notice);
		boolean online = HeroFunction.getIns().isOnline(hid);
		if(dealOnline && !addGoodsToBag.isEmpty() && !online) {
			/*//处理离线收益
			List<int[]> soldData = new ArrayList<int[]>();
			for(BagGrid grid:addGoodsToBag.values()) {
				Struct_zhuangbei_602 sysEq = Config_zhuangbei_602.getIns().get(grid.getSysId());
				if(sysEq != null) {
					int level = sysEq.getC()[1]*1000+sysEq.getC()[0];
					List<Struct_ronglian_602> levelList = SmeltCache.getLevelList(level);
					Struct_ronglian_602 struct = levelList.get(sysEq.getQ()-1);
					int[] sold = struct.getSold();
					soldData.add(sold);
				}
			}
			if(soldData.size() > 0) {
				int[][] goods = new int[soldData.size()][];
				soldData.toArray(goods);
				UseAddUtil.add(hero, goods, reason, null, false);
			}*/
		}
		// checkToolLimit(hid, data);
		checkToolLimit(hid, oldNumMap, bag);
		return addGoodsToBag;
	}
	
	private void checkToolLimit(long hid, GridTempData[] data) {
//		try {
//			Map<Integer, Struct_daoju_204> map = Config_daoju_204.getIns().getMap();
//			List<String> list = new ArrayList<>();
//			for(GridTempData gt : data) {
//				int sysId = gt.getSysid();
//				int num = getGoodsNumBySysId(hid, sysId);
//				Struct_daoju_204 tool = map.get(sysId);
//				if(tool==null) {
//					continue;
//				}
//				int bj = tool.getBj();
//				if (bj > 0 && num >= bj) {
//					list.add("道具id：" + tool.getId() + ", 道具名：" + tool.getName() + ", 道具数量：" + num);
//				}
//			}
//			if (list.size() > 0) {
//				AlarmSystemFunction.getIns().alarmSend(AlarmType.TOOL_WARN, hid,
//						new Object[] { JSON.toJSONString(list) });
//			}
//		} catch (Exception e) {
//			LogTool.error(e, BagFunction.class, hid, "", "checkToolLimit");
//		}
	}

	private void checkToolLimit(long hid, Map<Integer, Integer> oldNumMap, Bag bag) {
		try {
			Map<Integer, Long> dailyItemNum = bag.getDailyItemNum();
			Map<Integer, Struct_daoju_204> map = Config_daoju_204.getIns().getMap();
			List<String> list = new ArrayList<>();
			Set<Integer> alarmSet = new HashSet<>();
			Iterator<Integer> iterator = oldNumMap.keySet().iterator();
			for (; iterator.hasNext();) {
				Integer sysId = iterator.next();
				if (sysId == null) {
					continue;
				}
				Struct_daoju_204 tool = map.get(sysId);
				if (tool == null) {
					continue;
				}
				int bj = tool.getBj();
				if (bj == 0) {
					continue;
				}
				int num = getGoodsNumBySysId(hid, sysId);
				Integer oldNum = oldNumMap.get(sysId);
				if (oldNum == null) {
					continue;
				}
				int addNum = num - oldNum;
				Long dailyNum = dailyItemNum.get(sysId);
				if (dailyNum == null) {
					dailyNum = 0L;
				}
				if (addNum > 0) {
					dailyNum += addNum;
					dailyItemNum.put(sysId, dailyNum);
				}
				if (bj > 0 && dailyNum >= bj) {
					list.add("道具id：" + tool.getId() + ", 道具名：" + tool.getName() + ", 道具数量：" + num);
					alarmSet.add(sysId);
				}
			}
			if (list.size() > 0) {
				AlarmSystemFunction.getIns().alarmSend(AlarmType.TOOL_WARN, hid,
						new Object[] { JSON.toJSONString(list), alarmSet });
			}
		} catch (Exception e) {
			LogTool.error(e, BagFunction.class, hid, "", "checkToolLimit");
		}
	}

	/**
	 * 存放物品到背包如果背包已满则发送邮件
	 * 邮件id为系统共用的1034
	 * @author lobbyer
	 * @param data 待存放的物品集合  
	 * @param hid 角色id
	 * @param reason 操作原因,用于后台流水记录
	 * @param sendmail 邮件信息
	 * @date 2017年3月28日
	 */
	public void storeGoodsToBagOrSendMail(final GridTempData[] data,final long hid,int reason,boolean notice,MailInfo sendmail){
		try{
			if(ArrayUtils.isEmpty(data))return;
			storeGoodsToBagOrSendMail(data, hid, reason, sendmail.getMailId(), notice, sendmail.getMailContent());
		}catch(Exception e){
			LogTool.error(e, this,"storeGoodsToBagOrSendMail hid:"+hid+" exception:");
		}
	}
	
	/**
	 * 存放物品到背包如果背包已满则发送邮件
	 * 需要传入邮件id参数
	 * @author lobbyer
	 * @param data 待存放的物品集合  
	 * @param hid 角色id
	 * @param reason 操作原因,用于后台流水记录
	 * @param mailId 邮件编号
	 * @param notice 是否提示 true 右下角提示 false 不提示
	 * @param mailParam 邮件内容参数
	 * @date 2017年3月30日
	 */
	public void storeGoodsToBagOrSendMail(final GridTempData[] data,final long hid,
			int reason,int mailId,boolean notice,Object[] mailParam){
		try{
			List<Long> createIdList = new ArrayList<Long>();
			Map<Integer, BagGrid> storeGoodsToBag = storeGoodsToBag(data, hid, reason, notice, false, createIdList);
			//放入背包不成功则发送邮件
			if(storeGoodsToBag != null && !storeGoodsToBag.isEmpty()){
				boolean isSucc = false;
				GridTempData[] mailData = transferBagData2MailData(storeGoodsToBag);
				GridTempData[] temp = null;
				int size = mailData.length;
				if(size>5){
					int len = size/5+(size%5>0?1:0);
					int posLen = 0;
					for(int i=0;i<len;i++){
						if(len==i+1){
							posLen=size%5==0?5:size%5;
						}else{
							posLen = 5;
						}
						temp = new GridTempData[posLen];
						System.arraycopy(mailData,i*5,temp,0,posLen);
						isSucc = MailFunction.getIns().sendMailWithGridTempData(hid, mailId, mailParam,temp);
						if(!isSucc)throw new Exception("send mail fail");
					}
				}else{
					isSucc = MailFunction.getIns().sendMailWithGridTempData(hid, mailId, mailParam,mailData);
					if(!isSucc)throw new Exception("send mail fail");
				}
			}
		}catch(Exception e){
			LogTool.error(e, this, "storeGoodsToBagOrSendMail hid:"+hid+" exception.");
		}
	}
	
	/**
	 * 未入背包物品转换成邮件附件格式
	 * @author lobbyer
	 * @param data
	 * @return
	 * @date 2017年3月30日
	 */
	public GridTempData[] transferBagData2MailData(Map<Integer, BagGrid> data){
		List<GridTempData> dataList = new ArrayList<GridTempData>();
		for(Integer sysId:data.keySet()) {
			BagGrid grid = data.get(sysId);
			if(grid.getType() == GameConst.EQUIP) {
				for(int i = 1; i <= grid.getNum(); i ++) {
					dataList.add(new GridTempData(grid.getSysId(),1,grid.getUnitId(),grid.getType()));
				}
			}else{
				dataList.add(new GridTempData(grid.getSysId(),grid.getNum(),grid.getUnitId(),grid.getType()));
			}
		}
		GridTempData[] gridTempData = new GridTempData[dataList.size()];
		dataList.toArray(gridTempData);
		return gridTempData;
	}
	
	/**
	 * 添加新物品（装备没有唯一id）
	 * @author lobbyer
	 * @param hero
	 * @param data 传入的数据
	 * @param reason 原因
	 * @param createIdList 新建的装备
	 * @param reason 是否提示
	 * @return 返回入包失败的物品
	 * @date 2017年3月27日
	 */
	public Map<Integer, BagGrid> addGoodsToBag(long hid,GridTempData[] data,int reason,List<Long> createIdList,boolean notice) {
		Hero hero = HeroCache.getHero(hid);
		String pfcode="";
		String usesys="";
		if (hero.getTempData()!=null&&hero.getTempData().getAccount()!=null) {
			pfcode=hero.getTempData().getAccount().getPfcode();
			usesys=hero.getTempData().getAccount().getUsesys();
		}
		Map<Integer, BagGrid> faultMap = new HashMap<Integer, BagGrid>();
		Map<Long, BagGrid> updateEquip = new HashMap<Long, BagGrid>();
		Map<Integer, BagGrid> updateItem = new HashMap<Integer, BagGrid>();
		try {
			List<GridTempData> flowData = new ArrayList<GridTempData>();
			Map<Integer, Integer> addMap = new HashMap<Integer, Integer>();
			Bag bag = hero.getBag();
			Map<Long, BagGrid> equipData = getEquipData(hero);
			Map<Integer, BagGrid> itemData = bag.getItemData();
			List<GridTempData> equipSysidList = new ArrayList<GridTempData>();
			//int tooltotalGrid = getToolBagGrid(hero);
			int equiptotalGrid= getEquipBagGrid(hero);
			for(GridTempData good:data) {
				BagGrid faultNum = faultMap.get(good.getSysid());
				if(faultNum == null) faultNum = new BagGrid(good.getSysid(), good.getUnitId(), 0, 0);
				if(good.getType() == GameConst.EQUIP) {
					//装备
					faultNum.setType(GameConst.EQUIP);
					if(equipData.size() + equipSysidList.size() >= equiptotalGrid) {
						faultNum.setNum(faultNum.getNum()+good.getNum());
						faultMap.put(good.getSysid(), faultNum);
						continue;
					}else{
						long uid = good.getUnitId();
						if(uid == 0) {
							equipSysidList.add(good);
							continue;
							//创建装备进缓存 返回id
//							uid = EquipFunction.getIns().createEquip(hero, good.getSysid(), EquipConst.IN_BAG, 0, 0);
//							if(uid == 0){
//								faultNum.setNum(faultNum.getNum()+good.getNum());
//								faultMap.put(good.getSysid(), faultNum);
//								continue;
//							}
//							createIdList.add(uid);
						}
						BagGrid bagGrid = new BagGrid(good.getSysid(),uid,1,0);
						equipData.put(uid, bagGrid);
						updateEquip.put(uid, bagGrid);
						Equip equip = hero.getNotOnBodyEquip(uid);
						if(equip != null) equip.setState(EquipConst.IN_BAG);
						FlowEquipEvent.addEquipFlow(hero.getId(), hero.getJob(), equip, SourceGoodConst.FLOW_OPER_ADD, reason, hero.getZoneid(),pfcode,usesys);
					}
				}else if(good.getType() == GameConst.TOOL) {
					//道具
					faultNum.setType(GameConst.TOOL);
					int canAddNum = checkCanAddNum(hero, good.getSysid(), good.getNum());
					if(canAddNum <= 0) {
						faultNum.setNum(faultNum.getNum()+good.getNum());
						faultMap.put(good.getSysid(), faultNum);
						continue;
					}else{
						if(good.getNum() > canAddNum){
							faultNum.setNum(faultNum.getNum()+good.getNum()-canAddNum);
							faultMap.put(good.getSysid(), faultNum);
							good.setNum(canAddNum);
						}
					}
					BagGrid bagGrid = itemData.get(good.getSysid());
					if(bagGrid != null) {
						bagGrid.setNum(bagGrid.getNum() + good.getNum());
					}else{
						bagGrid = new BagGrid(good.getSysid(),0,good.getNum(),0);
						itemData.put(good.getSysid(), bagGrid);
					}
					updateItem.put(good.getSysid(), bagGrid);
					//添加道具流水
					flowData.add(good);
				}
				Integer addNum = addMap.get(good.getSysid());
				if(addNum == null) addNum = 0;
				addMap.put(good.getSysid(), addNum + good.getNum());
			}
			//批量生成装备
			if(!equipSysidList.isEmpty()){
				List<Equip> equipUidList = EquipFunction.getIns().createManyEquip(hero, equipSysidList, EquipConst.IN_BAG);
				if(!equipSysidList.isEmpty()){
					for(GridTempData tempData : equipSysidList){
//					for(Integer sysid : equipSysidList){
						BagGrid faultNum = faultMap.get(tempData.getSysid());
						if(faultNum == null) faultNum = new BagGrid(tempData.getSysid(), 0, 0, 0);
						faultNum.setNum(faultNum.getNum()+1);
						faultMap.put(tempData.getSysid(), faultNum);
					}
				}
				if(!equipUidList.isEmpty()){
					Long uid = 0l;
					for(Equip equip : equipUidList){
						uid = equip.getId();
						createIdList.add(uid);
						BagGrid bagGrid = new BagGrid(equip.getSysId(),uid,1,0);
						equipData.put(uid, bagGrid);
						updateEquip.put(uid, bagGrid);
						FlowEquipEvent.addEquipFlow(hero.getId(), hero.getJob(), equip, SourceGoodConst.FLOW_OPER_ADD, reason, hero.getZoneid(),pfcode,usesys);
						Integer addNum = addMap.get(equip.getSysId());
						if(addNum == null) addNum = 0;
						addMap.put(equip.getSysId(), addNum + 1);
					}
				}
			}
			//后台物品流水
			FlowToolEvent.addFlow(hero.getId(), flowData.toArray(new GridTempData[flowData.size()]), SourceGoodConst.FLOW_OPER_ADD, reason, hero.getZoneid(),pfcode,usesys);
			//得到东西事件提醒
			if(notice)
				notice(addMap,hid,false);
			//通知前端更新
			if(!createIdList.isEmpty()){
				//装备更新
				EquipFunction.getIns().sendEquipDataNewCreated(createIdList,hero);
			}
			if(!updateEquip.isEmpty()) updateEquip(hero, updateEquip);
			if(!updateItem.isEmpty()) updateItem(hero, updateItem);
			updateEquip.clear();
			updateItem.clear();
			flowData.clear();
		} catch (Exception e) {
			LogTool.error(e, this, "addGoods hid:"+hero.getId()+" Exception!");
		}
		return faultMap;
	}
	
	/**
	 * 返回可以添加的数量
	 * @author lobbyer
	 * @param hero
	 * @param sysId
	 * @param num
	 * @return
	 * @date 2017年4月6日
	 */
	public int checkCanAddNum(Hero hero,int sysId,int num) {
		int itemNum = 0;
		int itemEmpty = getItemEmptyGrid(hero, null);
		Map<Integer, BagGrid> itemData = hero.getBag().getItemData();
		BagGrid bagGrid = itemData.get(sysId);
		int hasNum = 0;
		int overNum = 0;
		if(bagGrid != null) {
			hasNum = bagGrid.getNum();
			int before = getNeedGrid(hasNum);
			overNum = BagConst.MAX_OVERLY - hasNum%BagConst.MAX_OVERLY;
			if(overNum == BagConst.MAX_OVERLY) overNum = 0;
			int after = getNeedGrid(hasNum + num);
			itemNum += (after - before);
		}else{
			itemNum += getNeedGrid(num);
		}
		if(itemNum <= itemEmpty) return num; 
		if(itemNum > itemEmpty) {
			int canAdd = itemEmpty * BagConst.MAX_OVERLY + overNum;
			return canAdd;
		}
		int canAdd = (itemEmpty - itemNum) * BagConst.MAX_OVERLY + overNum;
		return canAdd;
	}
	
	
	/**
	 * 预判能否加入背包
	 * @author lobbyer
	 * @param hid
	 * @param data
	 * @return
	 * @date 2017年3月28日
	 */
	public boolean checkUseEquip(long hid,List<Long> idList,int reason) {
		try {
			int len = idList.size();
			GridTempData[] data = new GridTempData[len];
			for(int i = 0; i < len; i ++) {
				data[i] = new GridTempData(0, 1, idList.get(0), GameConst.EQUIP);
			}
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				log.warn(hid+" hero object is null takeOutGoodsByUintid fail ");
				return false;
			}
			Bag bag = hero.getBag();
			if(bag==null){
				log.warn(hid+" bagData object is null takeOutGoodsByUintid fail ");
				return false;
			}
			//判断数量是否足够
			int isEnough = isEnoughGood(hero,data);
			if(isEnough!=1){
				return false;
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, this, "takeOutEquipByUintid hid:"+hid+" type:"+reason+" Exception!");
			return false;
		}
	}
	
	/**
	 * 从背包中取出装备集合
	 * @param hid 角色id
	 * @param idList 装备的id集合
	 * @param canDel true删除装备缓存 false只拿出装备
	 * @param reason 原因
	 * @param notice 是否提示物品提示
	 */
	public boolean takeOutEquipByUintid(long hid,List<Long> idList,boolean canDel,int reason,boolean notice){
		try {
			int len = idList.size();
			GridTempData[] data = new GridTempData[len];
			for(int i = 0; i < len; i ++) {
				data[i] = new GridTempData(0, 1, idList.get(i), GameConst.EQUIP);
			}
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				log.warn(hid+" hero object is null takeOutGoodsByUintid fail ");
				return false;
			}
			String pfcode="";
			String usesys="";
			if (hero.getTempData()!=null&&hero.getTempData().getAccount()!=null) {
				pfcode=hero.getTempData().getAccount().getPfcode();
				usesys=hero.getTempData().getAccount().getUsesys();
			}
			Bag bag = hero.getBag();
			if(bag==null){
				log.warn(hid+" bagData object is null takeOutGoodsByUintid fail ");
				return false;
			}
			//保存需要清空的格子
			Map<Long,BagGrid> upadateGrid = new HashMap<Long, BagGrid>();
			//判断数量是否足够
			int isEnough = isEnoughGood(hero,data);
			//背包提示协议 5  数量不够
			if(isEnough!=1){
				//BagSender.sendCmd_208(hid, 5);
				return false;
			}
			Map<Integer, Integer> useMap = new HashMap<Integer, Integer>();
			Map<Long, BagGrid> equipData = getEquipData(hero);
			GridTempData tempData =null;
			for(int i=0;i<data.length;i++){
				tempData = data[i];
				BagGrid bagGrid = equipData.remove(tempData.getUnitId());
				if(bagGrid != null) {
					//添加流水
					Equip equip = hero.getNotOnBodyEquip(bagGrid.getUnitId());
					FlowEquipEvent.addEquipFlow(hero.getId(), hero.getJob(), equip, SourceGoodConst.FLOW_OPER_REDUCE, reason, hero.getZoneid(),pfcode,usesys);
					bagGrid.setNum(0);
					upadateGrid.put(tempData.getUnitId(), bagGrid);
					Integer useNum = useMap.get(bagGrid.getSysId());
					if(useNum == null) useNum = 0;
					useMap.put(bagGrid.getSysId(), useNum + tempData.getNum());
				}
				if( canDel){
					hero.removeNotOnBodyEquip( tempData.getUnitId());
				}
			}
//			if(canDel)
//				EquipFunction.getIns().deleteManyEquip(hero, idList);
			if(!upadateGrid.isEmpty()){
				updateEquip(hero, upadateGrid);
				//使用东西事件提醒
				notice(useMap,hid,true);
			}
			upadateGrid.clear();
			return true;
		} catch (Exception e) {
			LogTool.error(e, this, "takeOutEquipByUintid hid:"+hid+" type:"+reason+" Exception!");
			return false;
		}
	}
	
	/**
	 * 取出物品使用 
	 * @param hid 角色id
	 * @param data
	 * @param isPrompt true 物品不够时候提示  false 物品不够不提示
	 * @param reason 操作原因,用于后台流水记录
	 * @return 1 成功  0 物品不够  -1 意外
	 */
	public boolean takeOutGoodsBySysId(long hid,int[][] data,boolean isPrompt,int reason){
		try {
			int len = data.length;
			GridTempData[] tempData = new GridTempData[len];
			for(int i = 0; i < len; i ++) {
				int[] subData = data[i];
				if(subData.length != 2) {
					return false;
				}
				tempData[i] = new GridTempData(subData[0], subData[1], 0, GameConst.TOOL);
			}
			if(hid<=0||!checkUseGoodsParam(tempData)){
				return false;
			}
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				log.warn(hid+" hero object is null takeOutGoodsBySysId fail ");
				return false;
			}
			String pfcode="";
			String usesys="";
			if (hero.getTempData()!=null&&hero.getTempData().getAccount()!=null) {
				pfcode=hero.getTempData().getAccount().getPfcode();
				usesys=hero.getTempData().getAccount().getUsesys();
			}
			Bag bag = hero.getBag();
			if(bag==null){
				log.warn(hid+" bagData object is null takeOutGoodsBySysId fail ");
				return false;
			}
			int sysId = 0;
			//保存需要清空的格子
			Map<Integer,BagGrid> upadateGrid = new HashMap<Integer, BagGrid>();
			//判断数量是否足够
			int isEnough = isEnoughGood(hero,tempData);
			//背包提示协议 5  数量不够
			if(isEnough!=1){
				if(isPrompt)NettyWrite.writeData(hid,new Object[]{5},111);
				return false;
			}
			Map<Integer, Integer> useMap = new HashMap<Integer, Integer>();
			GridTempData temp =null;
			for(int i=0;i<data.length;i++){
				temp = tempData[i];
				if(tempData == null||temp.getSysid() == 0){
					continue;
				}
				sysId = temp.getSysid();
				useOneGood(hero, temp.getNum(), sysId, upadateGrid);
				Integer useNum = useMap.get(temp.getSysid());
				if(useNum == null) useNum = 0;
				useMap.put(temp.getSysid(), useNum + temp.getNum());
			}
			if(!upadateGrid.isEmpty()){
				updateItem(hero, upadateGrid);
				//使用东西事件提醒
				notice(useMap,hid,true);
				//添加删除流水
				FlowToolEvent.addFlow(hid, tempData, SourceGoodConst.FLOW_OPER_REDUCE, reason, hero.getZoneid(),pfcode,usesys);
			}
			upadateGrid.clear();
			return true;
		} catch (Exception e) {
			LogTool.error(e, this, "takeOutGoodsBySysId hid:"+hid+" type:"+reason+" Exception!");
			return false;
		}
		
	}
	
	/**
	 * 背包放物品提醒
	 * @param data 待存放的物品集合  
	 * @param hid
	 * @param isUse true 使用物品 false 获得物品
	 */
	public void notice(Map<Integer,Integer> data,long hid,boolean isUse){
		if(data.isEmpty() || isUse)return;
		try{
			//合并相同类型的物品
			int useOrNo = isUse?0:1;
			int i = 0;
			Object[] result = new Object[data.size()];
			for(Integer sysId:data.keySet()){
				result[i] = new Object[]{sysId,data.get(sysId),useOrNo};
				i++;
			}
			BagSender.sendCmd_210(hid, result);
			data.clear();
		}catch(Exception e){
			LogTool.error(e, this, "bagThingPrompt hid:"+hid+" exception:");
		}
	}
	
	/**
	 * 一类物品的使用
	 * @param updatesGrid 修改了的格子集合
	 * @param grids 背包格子集合
	 * @param num 数量
	 * @param sysId 系统id
	 * @param hid 角色id
	 * @param clearGrids 待清空的格子集合
	 * @return 返回待扣除的物品数量 0 表示已扣完 >0 表示还未扣完数量
	 */
	public int useOneGood(Hero hero,int num,int sysId,Map<Integer,BagGrid> clearGrids){
		Map<Integer, BagGrid> itemData = hero.getBag().getItemData();
		BagGrid bagGrid = itemData.get(sysId);
		bagGrid.setNum(bagGrid.getNum() - num);
		if(bagGrid.getNum() <= 0) {
			bagGrid.setNum(0);
			itemData.remove(sysId);
		}
		clearGrids.put(sysId, bagGrid);
		return num;
	}
	
	/**
	 * 根据物品的系统id查找背包中的数量
	 * @param hid 角色id
	 * @param sysId 系统id
	 * @return
	 */
	public int getGoodsNumBySysId(final long hid,final int sysId){
		int result = 0 ;
		if(hid<=0)return result;
		Hero hero = HeroCache.getHero(hid);
		if(hero==null)return result;
		Bag bag = hero.getBag();
		if(bag==null || sysId <= 0)return result;
		Map<Long, BagGrid> equipData = getEquipData(hero);
		for(BagGrid grid:equipData.values()){
			if(grid.getSysId()==sysId){
				result+=grid.getNum();
			}
		}
		if(result == 0) {
			Map<Integer, BagGrid> itemData = bag.getItemData();
			BagGrid grid = itemData.get(sysId);
			if(grid != null) result += grid.getNum();
		}
		return result;
	}
	
	/**
	 * 清空背包逻辑处理方法
	 * 提供给GM调用
	 * @param hid 角色id
	 */
	public void clearBag(long hid){
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			log.warn(hid+" this hero is null clearBag opt end");
			return;
		}
		Bag bag = hero.getBag();
		try {
//			List<Long> delIdList = new ArrayList<Long>();
//			Map<Long, BagGrid> equipData = getEquipData(hero);
//			delIdList.addAll(equipData.keySet());
//			if(!delIdList.isEmpty())
//				EquipFunction.getIns().deleteManyEquip(hero, delIdList);
//			equipData.clear();
			hero.clearNotOnBodyEquip();
			bag.getItemData().clear();
			sendBagData(hero);
			//可能需要添加删除流水
			LogTool.info(hid+" name:"+hero.getNameZoneid()+",success clear bag",this);
		} catch (Exception e) {
			LogTool.error(e, this, hid, hero.getName(), "clearPawnShop exception:");
			return;
		}
	}
	
	
	
	/**
	 * 从背包删除一个特定的物品id
	 * 注意：此方法调用只适合于登录的时候并且在bagEvent.login方法之前调用
	 * @param hid 角色id
	 * @param sysId 物品id
	 * @param num 0为全部 >0指定数量
	 * @param reason 操作原因
	 * @return > 0 有删除  =0没有物品
	 */
	public int deleteGoodsInBag(long hid,int sysId,int num,int reason){
		//删除物品：背包
		Hero hero = HeroCache.getHero(hid);
		String pfcode="";
		String usesys="";
		if (hero.getTempData().getAccount()!=null) {
			pfcode=hero.getTempData().getAccount().getPfcode();
			usesys=hero.getTempData().getAccount().getUsesys();
		}
		Bag bag = hero.getBag();
		Map<Long, BagGrid> equipData = getEquipData(hero);
		Map<Long, BagGrid> updateEquip = new HashMap<Long, BagGrid>();
		Map<Integer, BagGrid> updateItem = new HashMap<Integer, BagGrid>();
		int size = 0 ;
		List<Long> delList = new ArrayList<Long>();
		Iterator<Entry<Long, BagGrid>> iter = equipData.entrySet().iterator();
		while(iter.hasNext()) {
			BagGrid grid = iter.next().getValue();
			if(grid.getSysId() == sysId) {
				size += 1;
				grid.setNum(0);
				updateEquip.put(grid.getUnitId(), grid);
				iter.remove();
				//添加流水
				delList.add(grid.getUnitId());
				Equip equip = hero.removeNotOnBodyEquip(grid.getUnitId());
				FlowEquipEvent.addEquipFlow(hero.getId(), hero.getJob(), equip, SourceGoodConst.FLOW_OPER_REDUCE, reason, hero.getZoneid(),pfcode,usesys);
				if(num == 0) continue;
				if(size == num) break;
			}
		}
		if(size == 0) {
			Map<Integer, BagGrid> itemData = bag.getItemData();
			BagGrid grid = itemData.get(sysId);
			if(grid != null) {
				if(num == 0) {
					size += grid.getNum();
					grid.setNum(0);
					itemData.remove(sysId);
				}else{
					if(num > grid.getNum()) num = grid.getNum();
					size += num;
					grid.setNum(grid.getNum() - num);
				}
				updateItem.put(sysId, grid);
				//添加删除流水
				FlowToolEvent.addFlow(hid,GameConst.TOOL, grid.getSysId(), num, SourceGoodConst.FLOW_OPER_REDUCE, reason, hero.getZoneid(),true,pfcode,usesys);
			}
		}
//		if(!delList.isEmpty()) {
//			EquipFunction.getIns().deleteManyEquip(hero, delList);
//		}
		return size;
	}
	
	/**
	 * 后台背包删除
	 * 
	 * @param hid
	 * @param sysId
	 * @param num
	 * @return
	 */
	public boolean houtaiBagDel(long hid, int sysId, int num) {
		Hero hero = HeroCache.getHero(hid);
		boolean hascache = true;
		if (hero == null) {
			hascache = false;
			// 需要从数据库查找
			try {
				hero = HeroDao.getIns().find(hid, null);
				HeroCache.removeTempHero(hid);
				HeroCache.putHero(hero);
				SystemEventFunction.triggerInitEvent(hero);
			} catch (Exception e) {
				LogTool.info(hid, hero.getName(), " getHero by houtaiBagDel is wrong", this);
				return false;
			}

		}
		try {
			String pfcode = "";
			String usesys = "";
//			if (hero.getTempData().getAccount() != null) {
//				pfcode = hero.getTempData().getAccount().getPfcode();
//				usesys = hero.getTempData().getAccount().getUsesys();
//			}
			if (sysId <= 0 || num < 0) {
				LogTool.info(hid, hero.getName(),
						" delete goods by houtaiBagDel, input param is wrong,sysId:" + sysId + " num:" + num, this);
				return false;
			}
			String typeStr = GameConst.huobiMap.get(sysId);
			if (typeStr != null) {
				long huobi;
				if (GameConst.YUANBAO == sysId) {
					huobi = hero.getYuanbao() - num;
					if (huobi < 0) {
						huobi = 0;
					}
					hero.setYuanbao(huobi);
				} else if (GameConst.COIN == sysId) {
					huobi = hero.getCoin() - num;
					if (huobi < 0) {
						huobi = 0;
					}
					hero.setCoin(huobi);
				} else {
					return false;
				}
				boolean online = HeroFunction.getIns().isOnline(hero.getId());
				if (online) {
					HeroFunction.getIns().sendChange120(hero, typeStr, huobi);
				}
				if (hero.getTempData() != null && hero.getTempData().getAccount() != null) {
					pfcode = hero.getTempData().getAccount().getPfcode();
					usesys = hero.getTempData().getAccount().getUsesys();
				}
				FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), sysId, hero.getYuanbao(), num,
						SourceGoodConst.USE_HOUTAI, hero.getZoneid(), hero.getLoginPf(),
						usesys, SourceGoodConst.FLOW_OPER_REDUCE, hero.getReincarnationLevel());
				// 角色表数据
				B_RoleInfoFunction.getIns().addM_RoleInfo(hero);

			} else {
				Bag bag = hero.getBag();
				if (bag == null) {
					LogTool.warn(hid + " " + hero.getNameZoneid() + " delete goods by houtaiBagDel, bag is null,sysId:"
							+ sysId + " num:" + num, this);
					return false;
				}
				GridTempData data = new GridTempData(sysId, num);
				Struct_daoju_204 struct_i = Config_daoju_204.getIns().get(sysId);
				if (struct_i != null) {
					data.setType(GameConst.TOOL);
				} else {
					LogTool.warn(hid + " " + hero.getNameZoneid() + " delete goods by houtaiBagDel, good is null,sysId:"
							+ sysId + " num:" + num, this);
					return false;
				}
				List<BagGrid> getList = getBagEquipByUnitIdOrSysId(hero, data);
				if (getList.size() == 0) {
					return true;
				}

				BagGrid grid = getList.get(0);
				if (num > grid.getNum())
					num = grid.getNum();
				grid.setNum(grid.getNum() - num);
				if (grid.getNum() <= 0) {
					bag.getItemData().remove(grid.getSysId());
				}
				if (hero.getTempData() != null && hero.getTempData().getAccount() != null) {
					pfcode = hero.getTempData().getAccount().getPfcode();
					usesys = hero.getTempData().getAccount().getUsesys();
				}
				FlowToolEvent.addFlow(hid, GameConst.TOOL, grid.getSysId(), num, SourceGoodConst.FLOW_OPER_REDUCE,
						SourceGoodConst.USE_HOUTAI, hero.getZoneid(), true, pfcode, usesys);

			}
			// 后台流水记录
			LogTool.info(hid, hero.getNameZoneid(),
					" delete goods by blackstage," + " success! num:" + num + " sysId: " + sysId, this);
			if (!hascache) {
				HeroDataSaver.addLogoutSaver(hero);
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, this, hid, hero.getNameZoneid(), " delete goods by houtaiBagDel, had exception");
			return false;
		}
	}
	
	/**
	 * 后台操作移除物品的数据
	 * 删除背包仓库里的物品
	 * @param sysId 物品id
	 * @param num 要删除的数量
	 * @param num 数量
	 */
	public boolean deleteFromBlackstage(long hid,int sysId,int num){
		Hero hero = HeroCache.getHero(hid);
		if(hero == null ){
			LogTool.info(hid, null, " delete goods by blackstage, hero is null,sysId:"+sysId+" num:"+num,this);
			return false;
		}
		String pfcode="";
		String usesys="";
		if (hero.getTempData()!=null&&hero.getTempData().getAccount()!=null) {
			pfcode=hero.getTempData().getAccount().getPfcode();
			usesys=hero.getTempData().getAccount().getUsesys();
		}
		try {
			if(sysId<=0||num<0){
				LogTool.info(hid, hero.getName()," delete goods by blackstage, input param is wrong,sysId:"+sysId+" num:"+num,this);
				return false;
			}
			Bag bag = hero.getBag();
			if(bag==null){
				LogTool.warn(hid+" "+hero.getNameZoneid()+" delete goods by blackstage, bag is null,sysId:"+sysId+" num:"+num,this);
				return false;
			}
			GridTempData data = new GridTempData(sysId, num);
			Struct_daoju_204 struct_i = Config_daoju_204.getIns().get(sysId);
			if(struct_i != null) {
				data.setType(GameConst.TOOL);
			}else {
				Struct_zhuangbei_204 struct_e = Config_zhuangbei_204.getIns().get(sysId);
				if(struct_e != null) {
					data.setType(GameConst.EQUIP);
				}else{
					LogTool.warn(hid+" "+hero.getNameZoneid()+" delete goods by blackstage, good is null,sysId:"+sysId+" num:"+num,this);
					return false;
				}
			}
			List<BagGrid> getList = getBagEquipByUnitIdOrSysId(hero, data);
			if(getList.size() == 0) {
				LogTool.warn(hid+" "+hero.getNameZoneid()+" delete goods by blackstage, bagNum is null,sysId:"+sysId+" num:"+num,this);
				return false;
			}
			if(data.getType() == GameConst.EQUIP) {
				List<Long> delList = new ArrayList<Long>();
				if(num > getList.size()) num = getList.size();
				int i = 1;
				Map<Long, BagGrid> equipData = getEquipData(hero);
				for(BagGrid grid:getList) {
					if(i >= num) break;
					grid.setNum(0);
					equipData.remove(grid.getUnitId());
					delList.add(grid.getUnitId());
					Equip equip = hero.removeNotOnBodyEquip(grid.getUnitId());
					FlowEquipEvent.addEquipFlow(hero.getId(), hero.getJob(), equip, SourceGoodConst.FLOW_OPER_REDUCE, SourceGoodConst.USE_HOUTAI, hero.getZoneid(),pfcode,usesys);
					i++;
				}
//				if(!delList.isEmpty()) {
//					EquipFunction.getIns().deleteManyEquip(hero, delList);
//				}
			}else{
				BagGrid grid = getList.get(0);
				if(num > grid.getNum()) num = grid.getNum();
				grid.setNum(grid.getNum() - num);
				if(grid.getNum() <= 0) {
					bag.getItemData().remove(grid.getSysId());
				}
				FlowToolEvent.addFlow(hid,GameConst.TOOL, grid.getSysId(), num, SourceGoodConst.FLOW_OPER_REDUCE, SourceGoodConst.USE_HOUTAI, hero.getZoneid(),true,pfcode,usesys);
			}
			//后台流水记录
			LogTool.info(hid, hero.getNameZoneid(), " delete goods by blackstage,"+" success! num:"+ num+" sysId: "+sysId,this);
		} catch (Exception e) {
			LogTool.error(e, this, hid, hero.getNameZoneid(), " delete goods by blackstage, had exception");
			return false;
		}
		return true;
	}
	
	/**
	 * 把对象数组转换为格子对象
	 * @param data
	 * @return
	 */
	public BagGrid ObjectArrayToBagGrid(Object[] data){
		if(data==null||data.length<5)return null;
		BagGrid grid = new BagGrid();
		grid.setNum((Integer)data[3]);
		grid.setSysId((Integer)data[0]);
		grid.setType((Integer)data[4]);
		grid.setUnitId(NumberUtils.toLong(data[1]+""));
		return grid;
	}
	
	/**
	 * 判断取出的物品背包中是否足够
	 * @name isEnoughGood
	 * @condition 提供给其他模块调用取出物品使用时候
	 * @param gridStr 背包格子对象字符串
	 * @param data GridTempData 背包格子临时数据
	 * @return  int 返回3时候表示，需要的物品不够   1  的时候表示够 
	 * 			0  的时候表示传入的参数为空或者发生意外
	 * @date 2017年3月28日
	 */
	public int isEnoughGood(Hero hero,GridTempData[] data) {
		if(ArrayUtils.isEmpty(data))return 0;
		try{
			Object tempObj = null;
			GridTempData tempData = null;
			for(int i=0;i<data.length;i++){
				tempObj = data[i];
				if(tempObj==null)continue;
				tempData = data[i];
				List<BagGrid> getList = getBagEquipByUnitIdOrSysId(hero, tempData);
				if(tempData.getType() == GameConst.EQUIP) {
					if(getList.size() < tempData.getNum()) return 3; 
				}else{
					if(getList.size() == 0) return 3;
					BagGrid bagGrid = getList.get(0);
					if(bagGrid.getNum() < tempData.getNum()) return 3;
				}
			}
			return 1;
		}catch(Exception e){
			LogTool.error(e, this, "checkStoreData ocurs an error.");
		}
		return 0;
	}
	
	/**
	 * 通过唯一id 或者 装备系统id 获取数量
	 * @author lobbyer
	 * @param hero
	 * @param data
	 * @return
	 * @date 2017年3月28日
	 */
	public List<BagGrid> getBagEquipByUnitIdOrSysId(Hero hero,GridTempData data) {
		Bag bag = hero.getBag();
		Map<Long, BagGrid> equipData = getEquipData(hero);
		List<BagGrid> getList = new ArrayList<BagGrid>();
		if(data.getType() == GameConst.EQUIP) {
			for(BagGrid grid:equipData.values()) {
				if(grid.getUnitId() != 0) {
					if(data.getUnitId() == grid.getUnitId()) {
						getList.add(grid);
					}
				}else{
					if(data.getSysid() == data.getSysid()) {
						getList.add(grid);
					}
				}
			}
		}else{
			BagGrid bagGrid = bag.getItemData().get(data.getSysid());
			if(bagGrid != null) {
				getList.add(bagGrid);
			}
		}
		return getList;
	}

	/**
	 * 清空一个格子
	 * @name clearOneGrid
	 * @param grid 格子对象
	 */
	public void clearOneGrid(BagGrid grid){
		grid.setNum(0);
		grid.setSysId(0);
		grid.setType(0);
		grid.setUnitId(0);
		grid.setExpirationTime(0);
	}
	
	/**
	 * 校验放入背包中数据是否符合要求
	 * @param data 传入的数据
	 * @return true 符合要求 false 不符合要求
	 */
	public boolean checkGoodData(GridTempData[] data){
		try{
			if(ArrayUtils.isEmpty(data))return false;
			int size = data.length;
			for(int i=0;i<size;i++){
				GridTempData gridData = data[i];
				if(gridData==null){
					LogTool.info("checkGoodData data is null",this);
					return false;
				}
				int num = gridData.getNum();
				if(num<=0 || num >= Integer.MAX_VALUE){
					LogTool.info("checkGoodData num:"+num,this);
					return false;
				}
				int type = gridData.getType();
				int sysId = gridData.getSysid();
				if(type==GameConst.TOOL){
					Struct_daoju_204 itemSys = Config_daoju_204.getIns().get(sysId);
					if(itemSys == null){
						LogTool.info("checkGoodData wrong toolID:"+sysId+" 道具不存在",this);
						return false;
					}
				}else if(type==GameConst.EQUIP){
					Struct_zhuangbei_204 equipSys = Config_zhuangbei_204.getIns().get(sysId);
					if(equipSys == null){
						LogTool.info("checkGoodData wrong equipID:"+sysId,this);
						return false;
					}
				}else{
					return false;
				}
			}
		}catch(Exception e){
			LogTool.error(e, this, "checkStoreData ocurs an error.");
			return false;
		}
		return true;
	}
	
	/**
	 * 检查使用物品：根据系统id、根据格子ID传入的参数是否合法
	 * 用于根据系统id以及数量取物品：
	 * bagfunction.takeOutGoodsBySysId 方法
	 * @param data 传入的参数
	 * @return true  合法   false不合法
	 */
	public boolean checkUseGoodsParam(GridTempData[] data){
		if(ArrayUtils.isEmpty(data))return false;
		for(GridTempData gridData:data){
			if(gridData==null)continue;
			if(gridData.getSysid() == 0)
				return false;
		}
		return true;
	}
	
	/**
	 * 获取装备背包已开启的格子数
	 * @author lobbyer
	 * @param hero
	 * @return
	 * @date 2017年3月29日
	 */
	public int getEquipBagGrid(Hero hero) {
		int base = BagConst.BASE_EQUIP_GRID;
		int carNum = 0;
		int vipNum = VipFunction.getIns().getVipNum(hero, VipAddType.bagEquipNum);
		try {
			int state = 0;
			if(state == 3) {
				carNum = BagConst.ADXCARD_GRID;
			}else if(state == 2) {
				carNum = BagConst.ADXCARD_GRID;
			}else if(state == 1) {
				carNum = BagConst.MOONCARD_GRID;
			}
		} catch (Exception e) {
			LogTool.error(e, this, "hid:"+hero.getId()+" getBagGrid Exception!");
		}
		Bag bag = hero.getBag();
		return base+carNum+vipNum+bag.getOpenGrid();
	}
	
	/**
	 * 获取道具背包已开启的格子数
	 * @author lobbyer
	 * @param hero
	 * @return
	 * @date 2017年3月29日
	 */
	public int getToolBagGrid(Hero hero) {
		int base = BagConst.BASE_TOOL_GRID;
		int carNum = 0;
		int vipNum = 0;
		try {
			int state = 0;
			if(state == 3) {
				carNum = BagConst.ADXCARD_GRID;
			}else if(state == 2) {
				carNum = BagConst.ADXCARD_GRID;
			}else if(state == 1) {
				carNum = BagConst.MOONCARD_GRID;
			}
		} catch (Exception e) {
			LogTool.error(e, this, "hid:"+hero.getId()+" getBagGrid Exception!");
		}
		Bag bag = hero.getBag();
		return base+carNum+vipNum+bag.getOpenGrid();
	}
	
	
	
	/**
	 * 开启关闭月卡或升级vip、会开启格子
	 * @author lobbyer
	 * @param hero
	 * @date 2017年3月29日
	 */
	public void changeCardOrVip(long hid){
		if(HeroFunction.getIns().isOnline(hid)) {
			Hero hero = HeroCache.getHero(hid);
			BagSender.sendCmd_202(hero.getId(), 2, hero.getBag().getOpenGrid());
		}
	}
	
	/**
	 * 遍历背包 记录数量超过3000的道具
	 * @param hero
	 */
	public Map<Integer, Integer> checkBagNum(Hero hero){
		HashMap<Integer, Integer> bugNum=new HashMap<Integer, Integer>();
		try {
			Bag bag=hero.getBag();
			if(bag == null) return null;
			Map<Long, BagGrid> eData=getEquipData(hero);
			Map<Integer, BagGrid> iData= bag.getItemData();
			
			List<Integer> ietmId=new ArrayList<Integer>();
			Map<Integer, Integer> illegalMap = BagCache.getIllegalMap().get(hero.getId());
			//装备
			for (BagGrid bagGrid:eData.values()) {
				if (!ietmId.contains(bagGrid.getSysId())) {
					ietmId.add(bagGrid.getSysId());
				}
			}
			//道具
			for (BagGrid bagGrid:iData.values()) {
				if (!ietmId.contains(bagGrid.getSysId())) {
					ietmId.add(bagGrid.getSysId());
				}
			}
			if (ietmId!=null&&ietmId.size()>0) {
				for (int i = 0; i < ietmId.size(); i++) {
					int itemSysId=ietmId.get(i);
					if(illegalMap!=null){
						Integer count = illegalMap.get(itemSysId);
						if(count!=null && count>=BagCache.ILLEGAL_NUM){
							continue;
						}
					}
					int bagNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemSysId);
				    int sum=bagNum; 
				    Integer num = 100;
				    Struct_daoju_204 struct_Item_501 = Config_daoju_204.getIns().get(itemSysId);
				    if(struct_Item_501!=null){
				    	int dshuliang = BagConst.MAX_OVERLY;
				    	num  = BagCache.specialList.get(itemSysId);
				    	if(num==null){
				    		if(dshuliang==BagConst.MAX_OVERLY){
				    			num = BagConst.MAX_OVERLY*2;
				    		}else{
				    			num = 3000;
				    		}
				    	}
				    	if(40250001==itemSysId){
			    			num = 20000;
			    		}else if(40650001==itemSysId){
			    			num = 46000;
			    		}else if(40040002==itemSysId){
			    			num = 20000;
			    		}
				    }
				    if (sum>=num) {
						bugNum.put(itemSysId, sum);
						log.info(hero.getId()+" num:"+num+",id:"+itemSysId+",sum:"+sum);
					}
				}
			}
			
			
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(), "checkBagNum has wrong");
		}
		return bugNum;
	}
	/**
	 * boss掉落
	 * @param awards  List<Object>
	 * @param dropArr
	 * @param pelist
	 */
	public void getBossDrop(Hero hero,List<Object> awards, List<int[]> dropArr, List<ProbabilityEventModel> pelist) {
		try {
			int size = pelist.size();
			for (int i = 0; i < size; i++) {
				ProbabilityEventModel pe = pelist.get(i);
				int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
				if (js != null) {
					int itemtype = js[0];
					if (itemtype == GameConst.GENDROP) {
						int num = js[2];
						ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
						for (int j = 1; j <= num; j++) {
							js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
							dropArr.add(js);
							awards.add(new Object[] { js[0], js[1], js[2] });
						}
					} else {
						dropArr.add(js);
						awards.add(new Object[] { js[0], js[1], js[2] });
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "getBossDrop has wrong");
		}
	}

}