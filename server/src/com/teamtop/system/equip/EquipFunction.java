package com.teamtop.system.equip;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bag.GridTempData;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.equip.model.EquipData;
import com.teamtop.system.equip.model.ShengEquipClear;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.forge.ForgeFightEvent;
import com.teamtop.system.forge.ForgeSender;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_dzgem_209;
import excel.config.Config_dzgemsuit_209;
import excel.config.Config_dzinsoul_209;
import excel.config.Config_dzqianghua_209;
import excel.config.Config_dzqianghuasuit_209;
import excel.config.Config_dzsoul_209;
import excel.config.Config_dzstar_209;
import excel.config.Config_dzstarsuit_209;
import excel.config.Config_godequipsuit_208;
import excel.config.Config_szxlsx_306;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_dzgem_209;
import excel.struct.Struct_eqiuplv_204;
import excel.struct.Struct_szxlsx_306;
import excel.struct.Struct_zhuangbei_204;

/**
 * 装备系统功能类
 * @author hepl
 *
 */
public class EquipFunction {

	private static EquipFunction ins = null;
	
	public static EquipFunction getIns(){
		if(ins == null){
			ins = new EquipFunction();
		}
		return ins;
	}
	
	/**
	 * 新建一件装备
	 * @param hero 角色对象
	 * @param sysId 装备系统id
	 * @param place 1在背包，3在身上
	 * @param job 默认0，在身上的话则需要对应职业，1战，2谋，3扇
	 * @param bodyIndex 默认0，在身上的话则需要值EquipConst里
	 * @return
	 */
	public long createEquip(Hero hero, int sysId, int place, int job, int bodyIndex){
		long id = 0;
		try {
			Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(sysId);
			if(zhuangbei_602 == null){
				return id;
			}
			Equip equip = new Equip();
			equip.setHid(hero.getId());
			equip.setSysId(sysId);
//			equip.setQuality(zhuangbei_602.getQ());
			//附加属性
//			int attrAdd = 0;
//			equip.setAttrAdd(attrAdd);
			equip.setState(place); //装备生成位置
//			equip.setPart(zhuangbei_602.getPart());
//			equip.setCreateTime(TimeDateUtil.getCurrentTime());
			//计算装备评分
			//int score = calcEquipScore(sysId, attrAdd);
//			equip.setScore(zhuangbei_602.getZhanli());
//			equip.setJob(job);
			equip.setBodyIndex(bodyIndex);
			//装备唯一id
			equip.setId(EquipCache.getAndAddBattleUnitId());
			//装备入库
//			EquipDao.getIns().insert(equip, hero.getZoneid());
			//装备唯一id
			id = equip.getId();
			if(place == EquipConst.ON_BODY){
				Map<Integer, Equip> map = hero.getOnbodyEquip();
				map.put(bodyIndex, equip);
			}else {
				//添加到不在身上的装备缓存
				hero.setNotOnBodyEquip(id, equip);
			}
		} catch (Exception e) {
			LogTool.error(e, EquipFunction.class, "createEquip error!");
		}
		return id;
	}
	
	/**
	 * 生成多件装备，不能生成身上的装备
	 * @param hero
	 * @param data [sysId] 装备系统id
	 * @param place 位置1在背包2在仓库
	 * @return
	 */
	public List<Equip> createManyEquip(Hero hero, List<GridTempData> sysIdList, int place){
		List<Equip> idList = new ArrayList<Equip>();
		try {
			if(!sysIdList.isEmpty()){
				int size = sysIdList.size();
				List<Equip> equipList = new ArrayList<Equip>();
				List<GridTempData> tempList = new ArrayList<GridTempData>();
				GridTempData tempData;
				for(int i=0; i<size; i++){
					tempData = sysIdList.get(i);
					Integer sysId = tempData.getSysid();
					Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(sysId);
					if(zhuangbei_602 == null){
						continue;
					}
					Equip equip = new Equip();
					equip.setHid(hero.getId());
					equip.setSysId(sysId);
//					equip.setQuality(zhuangbei_602.getQ());
//					int attrAdd = 0;
					/*//附加属性
					//如果没有指定过附加属性的话
					if(attrAdd == -1){
						if(zhuangbei_602.getQ() == EquipConst.QA_RED || zhuangbei_602.getQ() == EquipConst.QA_ORANGE){
							attrAdd = EquipConst.ATTR_ADD_MAX;
						}else {
							attrAdd = new Random().nextInt(EquipConst.ATTR_ADD_MAX + 1); //随机系数
						}
					}*/
//					equip.setAttrAdd(attrAdd);
					equip.setState(place); //装备生成位置
//					equip.setPart(zhuangbei_602.getPart());
//					equip.setCreateTime(TimeDateUtil.getCurrentTime());
					//计算装备评分
					//int score = calcEquipScore(sysId, attrAdd);
//					equip.setScore(zhuangbei_602.getZhanli());
//					equip.setJob(0);
					equip.setBodyIndex(0);
					//装备唯一id
					equip.setId(EquipCache.getAndAddBattleUnitId());
					equipList.add(equip);
					tempList.add(tempData);
				}
				//装备入库
//				EquipDao.getIns().insertIntoBatch(equipList, hero.getZoneid());
				long id = 0;
				for(Equip e : equipList){
					//装备唯一id
					id = e.getId();
					idList.add(e);
					//添加到不在身上的装备缓存
					hero.setNotOnBodyEquip(id, e);
					//移除成功生成的装备id
//					sysIdList.remove(Integer.valueOf(e.getSysId()));
				}
				//移除成功生成的装备id
				if(!tempList.isEmpty()){
					sysIdList.removeAll(tempList);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, EquipFunction.class, "createManyEquip error!");
		}
		return idList;
	}
	
	/**
	 * 发送新创建的装备数据到前端，提供给背包使用
	 * @param maxIds
	 * @param hero
	 */
	public void sendEquipDataNewCreated(List<Long> maxIds,Hero hero){
		if(maxIds==null||maxIds.isEmpty()||hero==null)return;
		ArrayList<Object[]> list = new ArrayList<Object[]>();
		for(Long id : maxIds){
			Equip equip =  hero.getNotOnBodyEquip(id);
//			list.add(new Object[]{id, equip.getSysId(), equip.getAttrAdd()});
			list.add(new Object[]{id, equip.getSysId(), 0});
		}
		if(!list.isEmpty()){
			EquipSender.sendCmd_352(hero.getId(), list.toArray());
		}
	}
	
	/**
	 * 推送身上装备数据
	 * @param hero
	 * @param state 0所有在身上装备 1普通装备 2神装 3将印 4转生装备
	 */
	public void sendOnbodyEquip(Hero hero,int state){
		try {
			Map<Integer, Equip> onbodyEquip = hero.getOnbodyEquip();
			ArrayList<Object[]> list = new ArrayList<Object[]>();
			if (state==0) {
				for (Equip equip:onbodyEquip.values()) {
					int sysId = equip.getSysId();
					int equipPart = getEquipPart( sysId);
					if (state==0) {
						list.add(new Object[]{equip.getId(), equipPart, equip.getSysId()});
					}
				}
			}else {
				int startid=0;
				int endid=0;
				switch (state) {
				case 1:
					//身上的普通装备
					 startid=GameConst.INDEX_EQUIP_0;
					 endid=GameConst.INDEX_EQUIP_9;
					break;
				case 2:
					//身上的神装
					 startid=GameConst.INDEX_SHEN_BING_0;
					 endid=GameConst.INDEX_SHEN_BING_9;
					break;
				case 3:
					//身上的将印
					 startid=GameConst.INDEX_WUJING_0;
					 endid=GameConst.INDEX_WUJING_9;
					break;
				case 4:
					//身上的转生
					 startid=GameConst.INDEX_REBORN_0;
					 endid=GameConst.INDEX_REBORN_3;
					break;
				case 5:
					//身上的武将装备
					 startid=GameConst.INDEX_40;
					 endid=GameConst.INDEX_43;
					break;
				case 6:
					//身上的战甲装备
					 startid=GameConst.INDEX_50;
					 endid=GameConst.INDEX_53;
					break;	
				case 7:
					//身上的神剑装备
					 startid=GameConst.INDEX_60;
					 endid=GameConst.INDEX_63;
					break;	
				case 8:
					//身上的异宝装备
					 startid=GameConst.INDEX_70;
					 endid=GameConst.INDEX_73;
					break;
				case 9:
					//身上的兵法装备
					 startid=GameConst.INDEX_80;
					 endid=GameConst.INDEX_83;
					break;
				case 10:
					//身上的宝物装备
					 startid=GameConst.INDEX_90;
					 endid=GameConst.INDEX_93;
					break;	
				case 11:
					//身上的天书装备
					 startid=GameConst.INDEX_100;
					 endid=GameConst.INDEX_103;
					break;		
				default:
					break;
				}
				if (startid!=endid) {
					for (int i = startid; i <=endid; i++) {
						Equip equip = hero.getOnbodyEquip().get(i);
						if (equip!=null) {
							list.add(new Object[]{equip.getId(), i, equip.getSysId()});
						}
					}
				}
			}
			EquipSender.sendCmd_350(hero.getId(), list.toArray());
			return;
		} catch (Exception e) {
			LogTool.error(e, EquipFunction.class, "推送身上装备数据");
		}
	}
	/**
	 * 推送不在身上装备数据
	 * @param hero
	 */
	public void sendOffbodyEquip(Hero hero){
		try {
			Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
			ArrayList<Object[]> list = new ArrayList<Object[]>();
			Iterator<Entry<Long, Equip>> iter = notOnBodyEquip.entrySet().iterator();
			while(iter.hasNext()){
				Entry<Long, Equip> next = iter.next();
				Long id = next.getKey();
				Equip equip = next.getValue();
//				list.add(new Object[]{id, equip.getSysId(), equip.getAttrAdd()});
				list.add(new Object[]{id, equip.getSysId(), 0});
			}
			if(!list.isEmpty()){
				EquipSender.sendCmd_352(hero.getId(), list.toArray());
			}
		} catch (Exception e) {
			LogTool.error(e, EquipFunction.class, "推送不在身上装备数据");
		}
	}
	
	
	/**
	 * 销毁装备，只有在背包中才能销毁
	 * @param hero
	 * @param unitId
	 */
	public void deleteEquip(Hero hero, long unitId){
		hero.removeNotOnBodyEquip(unitId);
		try {
			EquipDao.getIns().delete(unitId, hero.getZoneid());
		} catch (Exception e) {
			LogTool.error(e, EquipFunction.class, hero.getId(), hero.getName(), "deleteEquip error!");
		}
	}
	
	/**
	 * 批量删除装备，只有在背包中才能销毁
	 * @param hero
	 * @param ids
	 */
	public void deleteManyEquip(Hero hero, List<Long> ids){
		for(Long unitId : ids){
			hero.removeNotOnBodyEquip(unitId);
		}
		try {
			EquipDao.getIns().delMany(ids, hero.getZoneid());
		} catch (Exception e) {
			LogTool.error(e, EquipFunction.class, hero.getId(), hero.getName(), "deleteManyEquip error!");
		}
	}
	
	/**
	 * 计算装备评分
	 * @param sysId 装备系统id
	 * @param attrAdd 附件属性系数
	 * @return
	 */
	public int calcEquipScore(int sysId, int attrAdd){
		attrAdd=0;
		int score = 0;
		Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(sysId);
		if(zhuangbei_602 == null){
			return score;
		}
		/*if(zhuangbei_602.getQ() == EquipConst.QA_RED || zhuangbei_602.getQ() == EquipConst.QA_ORANGE){
			attrAdd = EquipConst.ATTR_ADD_MAX;
		}*/
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		int[][] data = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
		if(attrAdd == 0){
			for(int[] d : data){
				d[1] = d[1] + 0;
			}
		}else {
			for(int[] d : data){
				d[1] = (int) Math.ceil(d[1] + d[1]*attrAdd/100d);
			}
		}
		FightCalcFunction.setFightValue(data, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr,0);
		score = (int)finalAttr.getStrength();
		return score;
	}
	/**
	 * 全身装备星级总战力
	 * @param sysId
	 * @param starNum
	 * @return
	 */
	public void getSumEquipStar(Hero hero) {
		int sumStr=0;
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			//升星
			if(hero.getForge().getForgeModelMap().get(i).getStarLevel()>0) {
				Equip equip=hero.getOnbodyEquip().get(i);
				if (equip!=null) {
					int sysId = equip.getSysId();
					int proNum=Config_dzstar_209.getIns().get(hero.getForge().getForgeModelMap().get(i).getStarLevel()).getAddition();
					int starNum=hero.getForge().getForgeModelMap().get(i).getStarLevel();
					int oneEqStr=calcEquipStarScore(sysId, proNum,starNum);
					sumStr=sumStr+oneEqStr;
				}
			}
		}
		ForgeSender.sendCmd_582(hero.getId(), sumStr);
		return ;
	}
	
	
	
	
	/**
	 * 装备星级战力
	 * @param sysId
	 * @param proNum
	 * @param starNum
	 * @return
	 */
	public int calcEquipStarScore(int sysId, int proNum,int starNum) {
		int starStr=0;
		if (proNum==0) {
			return starStr;
		}
		Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(sysId);
		if(zhuangbei_602 == null){
			return starStr;
		}
		FinalFightAttr starfinalAttr = new FinalFightAttr();
		FightAttr starattr = new FightAttr();
		int[][] starData = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
		for(int[] d : starData){
			//max（装备基础属性*（升星增强比例*升星等级），升星等级）
			//攻防血
			int addNum=(int) Math.ceil((double)d[1]*proNum/100000d);
			if (d[0]==GameConst.HP_EXT||d[0]==GameConst.ATT_EXT||d[0]==GameConst.DEF_EXT) {
				if (addNum<starNum) {
					addNum=starNum;
				}
			}
			d[1] =addNum;
		}
		FightCalcFunction.setFightValue(starData, starattr);
		FightCalcFunction.calcEquipAttr(starfinalAttr, starattr,0);
		starStr = (int)starfinalAttr.getStrength();

		return starStr;
	}
	
	
	
	/**
	 * 获取装备转数跟等级
	 * @author lobbyer
	 * @param sysId
	 * @return int[转数,等级] 
	 * @date 2017年4月27日
	 */
	public static int[] getEquipZsLevel(int sysId){
		Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(sysId);
		if(zhuangbei_602 == null){
			return new int[]{0,0};
		}
		//判断穿戴等级，转生等级
		return zhuangbei_602.getLv()[0];
	}
	
	/**
	 * 创角送装备
	 * @author lobbyer
	 * @param hero
	 * @date 2017年5月27日
	 */
	public void sendFreeEquip(Hero hero){
		/*int job = hero.getJob();
		int sysId = 0;
		1级赵云武器  91101 武将
		1级诸葛武器  91106 谋士
		1级貂蝉武器  91111 舞女
		if(job == 1) sysId = 91101;
		else if(job == 2) sysId = 91106;
		else if(job == 3) sysId = 91111;
		UseAddUtil.add(hero, GameConst.EQUIP, 1, sysId, null, SourceGoodConst.CREATE_SEND, false);*/
	}
	
	/**
	 * 获取装备的战力（不包括神装）
	 * @param hero
	 * @return
	 */
	public int getEquipTotalStrength(Hero hero){
		int total = 0;
		for (Equip equip:hero.getOnbodyEquip().values()) {
			int sysId = equip.getSysId();
			int part = getEquipPart(sysId);
			if( part >= GameConst.INDEX_EQUIP_0 && part <= GameConst.INDEX_EQUIP_9){
				int strength = getEquipStrength( sysId);
				total += strength;
			}
		}
		EquipData equipData = hero.getEquipData();
		if( equipData!=null){
			equipData.setStrength( total);
		}
		return total;
	}
	
	/**
	 * 穿戴x件goal品质装备
	 * @param heo
	 * @param goal
	 * @return x
	 */
	public int wearEquipQuality(Hero hero,int goal) {
		int sumNum=0;
		for (Equip equip:hero.getOnbodyEquip().values()) {
			int sysId = equip.getSysId();
			Struct_zhuangbei_204 excel = Config_zhuangbei_204.getIns().get( sysId);
			int quality = excel.getQ();
			int equipPart = getEquipPart(sysId);
			if( equipPart >= GameConst.INDEX_EQUIP_0 && equipPart <= GameConst.INDEX_EQUIP_9&& quality>=goal){
				sumNum=sumNum+1;
			}
		}
		return sumNum;
	}
	
	/**
	 * 获取神装的总战力
	 * @param hero
	 * @return
	 */
	public int getGodEquipTotalStrength(Hero hero){
		int total = 0;
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		ShengEquipClear shengEquipClear = hero.getShengEquipClear();
		Map<Integer, HashMap<Integer, Integer>> clearValues = shengEquipClear.getClearValues();
		//神装套装等级
		if (Config_godequipsuit_208.getIns().get(hero.getForge().getShenLv())!=null) {
			CommonUtil.arrChargeMap(Config_godequipsuit_208.getIns().get(hero.getForge().getShenLv()).getAttr(), attrMap);
		}
		for (Equip equip:hero.getOnbodyEquip().values()) {
			int part = equip.getBodyIndex();
			if( part >= GameConst.INDEX_SHEN_BING_0 && part <= GameConst.INDEX_SHEN_BING_9){				
				Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				int[][] attr = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				CommonUtil.arrChargeMap(attr, attrMap);
				//神装洗练
				if (clearValues.containsKey(part)) {
					HashMap<Integer, Integer> hashMap = clearValues.get(part);
					if (hashMap!=null) {
						CommonUtil.mapPuslMapLong(hashMap, attrMap);
					}
				}
			}
		}
		long[][] arr=CommonUtil.mapToArr(attrMap);
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr fAttr = new FightAttr();
		FightCalcFunction.setFightValue(arr, fAttr);
		FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
		total = (int)finalAttr.getStrength();
		EquipData equipData = hero.getEquipData();
		if( equipData!=null){
			equipData.setStrengthGodEquip(total);
		}
		return total;
	}
	/***
	 * 装备总战力（包括神装）
	 * @param hero
	 * @return
	 */
	public int getAllEquipTotalStrength(Hero hero){
		int total = 0;
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		ShengEquipClear shengEquipClear = hero.getShengEquipClear();
		Map<Integer, HashMap<Integer, Integer>> clearValues = shengEquipClear.getClearValues();
		for (Equip equip:hero.getOnbodyEquip().values()) {
			int sysId = equip.getSysId();
			int part = getEquipPart(sysId);
			if( part >= GameConst.INDEX_EQUIP_0 && part <= GameConst.INDEX_SHEN_BING_9){
				int strength = getEquipStrength( sysId);
				total += strength;
			}
			if( part >= GameConst.INDEX_SHEN_BING_0 && part <= GameConst.INDEX_SHEN_BING_9){
				//神装洗练
				if (clearValues.containsKey(part)) {
					HashMap<Integer, Integer> hashMap = clearValues.get(part);
					if (hashMap!=null) {
						CommonUtil.mapPuslMapLong(hashMap, attrMap);
					}
				}
			}
		}
		
		
		
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			//锻造 
			//铸魂 
			if (hero.getForge().getForgeModelMap().get(i).getStrengthen()>0) {
				int strengthLv=hero.getForge().getForgeModelMap().get(i).getStrengthen();
				int zhuHunLv=hero.getForge().getForgeModelMap().get(i).getZhuHunLevel();
				int[][] attr=null;
				int[][] zhuHun=null;
				switch (i) {
				case 0:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr0();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr0();
					break;
				case 1:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr1();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr1();
					break;
				case 2:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr2();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr2();
					break;
				case 3:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr3();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr3();
					break;	
				case 4:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr4();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr4();
					break;
				case 5:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr5();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr5();
					break;
				case 6:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr6();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr6();
					break;
				case 7:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr7();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr7();
					break;
				case 8:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr8();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr8();
					break;	
				case 9:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr9();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr9();
					break;	
				default:
					break;
				}
				//强化
				CommonUtil.arrChargeMap(attr, attrMap);
				CommonUtil.arrChargeMap(zhuHun, attrMap);
			}
			//宝石
			for (int j = 0; j < 4; j++) {
				if(hero.getForge().getForgeModelMap().get(i).getGemLevel()[j]>0) {
					if(Config_dzgem_209.getIns().get(hero.getForge().getForgeModelMap().get(i).getGemLevel()[j])!=null) {
						Struct_dzgem_209 dzgem=	Config_dzgem_209.getIns().get(hero.getForge().getForgeModelMap().get(i).getGemLevel()[j]);
						CommonUtil.arrChargeMap(dzgem.getAttr(), attrMap);
					}else {
						LogTool.warn("calcHero has wrong:"+hero.getId()+" i:"+i+" j:"+j, ForgeFightEvent.class);
					}
				}
			}
			//升星
			if(hero.getForge().getForgeModelMap().get(i).getStarLevel()>0) {
				Equip equip=hero.getOnbodyEquip().get(i);
				if (equip!=null) {
					Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
					int[][] data = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
					int attrAdd=Config_dzstar_209.getIns().get(hero.getForge().getForgeModelMap().get(i).getStarLevel()).getAddition();
					if(attrAdd != 0){
						for(int[] d : data){
							d[1] = (int) Math.ceil(d[1]*attrAdd/100000d);
						}
					}
					//FightCalcFunction.setFightValue(data, allAttrs);
					CommonUtil.arrChargeMap(data, attrMap);
				}
			}
		}

		//大师加成
		int qiangHuaDaShiLv=hero.getForge().getDashi().get(0);
		int baoShiDaShi=hero.getForge().getDashi().get(1);
		int starDaShi=hero.getForge().getDashi().get(2);
		
		if (qiangHuaDaShiLv>0) {
			CommonUtil.arrChargeMap(Config_dzqianghuasuit_209.getIns().get(qiangHuaDaShiLv).getAttr(), attrMap);
		}
		//宝石大师
		if (baoShiDaShi>0) {
			CommonUtil.arrChargeMap(Config_dzgemsuit_209.getIns().get(baoShiDaShi).getAttr(), attrMap);
		}
		if (starDaShi>0) {
			CommonUtil.arrChargeMap(Config_dzstarsuit_209.getIns().get(starDaShi).getAttr(), attrMap);
		}
		//噬魂
		for (int j = 1; j <=Config_dzinsoul_209.getIns().getMap().size(); j++) {
			int num=hero.getForge().getHunLevels().get(j);
			if (num>0) {
				int[][] data = CommonUtil.copyDyadicArray(Config_dzinsoul_209.getIns().get(j).getAttr());
				for(int[] d : data){
					d[1] = d[1]*num;
				}
				CommonUtil.arrChargeMap(data, attrMap);
			}
		}
		//神装套装等级
		if (Config_godequipsuit_208.getIns().get(hero.getForge().getShenLv())!=null) {
			CommonUtil.arrChargeMap(Config_godequipsuit_208.getIns().get(hero.getForge().getShenLv()).getAttr(), attrMap);
		}
		long[][] allAttrs=CommonUtil.mapToArr(attrMap);
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		FightCalcFunction.setFightValue(allAttrs,attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr,0);
		int score = (int)finalAttr.getStrength();
		total=total+score;
		return total;
	}
	/**
	 * 神装红点检测
	 * @param hero
	 * @param islogin true登陆 false更新
	 */
	public boolean redPonint(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, EquipConst.SYS_ID)) {
			return false;
		}
		Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
		if(bodyEquip == null){
			return false;
		}
		Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
		//将未穿戴的装备分类
		int type = 0;
		ArrayList<Equip> typeList = null;
		HashMap<Integer, ArrayList<Equip>> typeMap = new HashMap<Integer, ArrayList<Equip>>();
		for(Equip e : notOnBodyEquip.values()){
			//判断在背包中
			if(e.getState() != EquipConst.IN_BAG){
				continue;
			}
			type = getEquipPart( e.getSysId());
			typeList = typeMap.get(type);
			if(typeList == null){
				typeList = new ArrayList<Equip>();
				typeMap.put(type, typeList);
			}
			typeList.add(e);
		}
		//从身上位置遍历
		ArrayList<Equip> list = null;
		Equip tempEquip = null;
		Equip equip = null;
		EquipScoreComparator comparator = new EquipScoreComparator();
		for(int i=GameConst.INDEX_SHEN_BING_0; i<=GameConst.INDEX_SHEN_BING_9; i++){
			type = i;
			list = typeMap.get(type);
			if(list == null){
				continue;
			}
			//排序，找到评分最高的未穿戴装备
			Collections.sort(list, comparator);
			tempEquip = null;
			for(int j=0; j<list.size(); j++){
				Equip temp = list.get(j);
				//判断穿戴转生 等级
				int[] equipZsLevel = EquipFunction.getEquipZsLevel(temp.getSysId());
				int rebornLv = equipZsLevel[0];
				int level = equipZsLevel[1];
				if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
					continue;
				}
				tempEquip = temp;
				break;
			}
			if(tempEquip == null){
				continue;
			}
			//穿戴装备
			equip = bodyEquip.get(i);
			if(equip != null){
				//身上有装备，替换
				int strength = EquipFunction.getIns().getEquipStrength( equip.getSysId());
				int strengthTemp = EquipFunction.getIns().getEquipStrength( tempEquip.getSysId());
				if( strength < strengthTemp){
					return true;
				}
			}
		}
		int lv=0;
		boolean isAllEquip=true;
		for (int i = GameConst.INDEX_SHEN_BING_0; i <=GameConst.INDEX_SHEN_BING_9; i++) {
			if (hero.getOnbodyEquip().get(i)==null) {
				isAllEquip=false;
				//是否能合成
				Struct_eqiuplv_204 struct_eqiuplv_204=	EquipCache.getGodEquipLvMap().get(i).get(0);
				//判断材料
				int[][] fenjie = struct_eqiuplv_204.getCompose();
				if(UseAddUtil.canUse(hero, fenjie)){
					return true;
				}
				break;
			}else {
				//神装升级
				Struct_eqiuplv_204 struct_eqiuplv_204=	EquipCache.getGodEquipLvMap().get(i).get(hero.getOnbodyEquip().get(i).getSysId());
				if (struct_eqiuplv_204==null) {
					continue;
				}
				int nextSysId = struct_eqiuplv_204.getId();
				//判断最高级
				if(struct_eqiuplv_204.getId() != struct_eqiuplv_204.getUp()){
					//判断升级等级
					int[] equipZsLevel = EquipFunction.getEquipZsLevel(nextSysId);
					int level = equipZsLevel[1];
					int rebornLv = equipZsLevel[0];
					if(level <= hero.getRealLevel() && rebornLv <= hero.getRebornlv()){
						//判断材料
						int[][] fenjie = struct_eqiuplv_204.getCompose();
						if(UseAddUtil.canUse(hero, fenjie)){
							return true;
						}
					}
				}
			}
			if (i == GameConst.INDEX_SHEN_BING_0) {
				lv=Config_zhuangbei_204.getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getJie();
			}else {
				if (lv>Config_zhuangbei_204.getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getJie()) {
					lv=Config_zhuangbei_204. getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getJie();
				}
			}
		}
		if (isAllEquip&&lv>0) {
			//已经是最高神装套装阶数了
			if (hero.getForge().getShenLv()<lv) {
				int goal=hero.getForge().getShenLv()+1;
				if (Config_godequipsuit_208.getIns().get(goal)!=null) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 神装洗练红点
	 * @param hero
	 * @return
	 */
	public boolean clearRedPonint(Hero hero) {
		for (int i = GameConst.INDEX_SHEN_BING_0; i <=GameConst.INDEX_SHEN_BING_9; i++) {
			if (hero.getOnbodyEquip().get(i)==null) {
				continue;
			}else {
				Equip equip = hero.getOnbodyEquip().get(i);
				Struct_zhuangbei_204 struct_zhuangbei_204 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				int jie = struct_zhuangbei_204.getJie();
				Struct_szxlsx_306 struct_szxlsx_306 = Config_szxlsx_306.getIns().get(jie);
				int max1=struct_szxlsx_306.getAtk();
				int max2=struct_szxlsx_306.getDef();
				int max3=struct_szxlsx_306.getHp();
				ShengEquipClear shengEquipClear = hero.getShengEquipClear();
				HashMap<Integer, Integer> hashMap = shengEquipClear.getClearValues().get(i);
				if (hashMap==null) {
					hashMap=new HashMap<>();
					shengEquipClear.getClearValues().put(i, hashMap);
					hashMap.put(GameConst.HP_EXT, 0);
					hashMap.put(GameConst.ATT_EXT,0);
					hashMap.put(GameConst.DEF_EXT,0);
				}
				int value1 = hashMap.get(GameConst.ATT_EXT);
				int value2 = hashMap.get(GameConst.DEF_EXT);
				int value3 = hashMap.get(GameConst.HP_EXT);
				if (value1!=max1||value2!=max2||value3!=max3) {
					//没有满级 能够洗练
					Struct_szxlsx_306 struct_szxlsx_3062 = Config_szxlsx_306.getIns().get(jie);
					if (UseAddUtil.canUse(hero, struct_szxlsx_3062.getCost())) {
						return true;
					}
				}
			}
		}
		return false;
		
	}
	
	/**
	 * 转生装备红点检测
	 * @param hero
	 * @param islogin true登陆 false更新
	 */
	public boolean resBornredPonint(Hero hero) {
		Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
		if(bodyEquip == null){
			return false;
		}
		Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
		//将未穿戴的装备分类
		int type = 0;
		ArrayList<Equip> typeList = null;
		HashMap<Integer, ArrayList<Equip>> typeMap = new HashMap<Integer, ArrayList<Equip>>();
		for(Equip e : notOnBodyEquip.values()){
			//判断在背包中
			if(e.getState() != EquipConst.IN_BAG){
				continue;
			}
			type = getEquipPart( e.getSysId());
			typeList = typeMap.get(type);
			if(typeList == null){
				typeList = new ArrayList<Equip>();
				typeMap.put(type, typeList);
			}
			typeList.add(e);
		}
		//从身上位置遍历
		ArrayList<Equip> list = null;
		Equip tempEquip = null;
		Equip equip = null;
		EquipScoreComparator comparator = new EquipScoreComparator();
		for(int i=GameConst.INDEX_REBORN_0; i<=GameConst.INDEX_REBORN_3; i++){
			type = i;
			list = typeMap.get(type);
			if(list == null){
				continue;
			}
			//排序，找到评分最高的未穿戴装备
			Collections.sort(list, comparator);
			tempEquip = null;
			for(int j=0; j<list.size(); j++){
				Equip temp = list.get(j);
				//判断穿戴转生 等级
				int[] equipZsLevel = EquipFunction.getEquipZsLevel(temp.getSysId());
				int rebornLv = equipZsLevel[0];
				int level = equipZsLevel[1];
				if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
					continue;
				}
				tempEquip = temp;
				break;
			}
			if(tempEquip == null){
				continue;
			}
			//穿戴装备
			equip = bodyEquip.get(i);
			if(equip != null){
				//身上有装备，替换
				int strength = EquipFunction.getIns().getEquipStrength( equip.getSysId());
				int strengthTemp = EquipFunction.getIns().getEquipStrength( tempEquip.getSysId());
				if( strength < strengthTemp){
					return true;
				}
			}
		}
		/*int lv=0;
		boolean isAllEquip=true;
		for (int i = GameConst.INDEX_REBORN_0; i <=GameConst.INDEX_REBORN_3; i++) {
			if (hero.getOnbodyEquip().get(i)==null) {
				isAllEquip=false;
			}
			if (i == GameConst.INDEX_REBORN_0) {
				lv=Config_zhuanshenglhds_256.getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getLv();
			}else {
				if (lv>Config_zhuanshenglhds_256.getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getLv()) {
					lv=Config_zhuanshenglhds_256. getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getLv();
				}
			}
		}
		if (isAllEquip&&lv>0) {
			//已经是最高神装套装阶数了
			if (hero.getForge().getDashi().get(3)<lv) {
				int goal=hero.getForge().getDashi().get(3)+1;
				if (Config_zhuanshenglhds_256.getIns().get(goal)!=null) {
					return true;
				}
			}
		}*/
		return false;
	}
	
	
	/**
	 * 获取部位
	 */
	public int getEquipPart( int sysId){
		Struct_zhuangbei_204 excel = Config_zhuangbei_204.getIns().get( sysId);
		int part = excel.getPart();
		return part;
	}
	/**
	 * 获取战力
	 */
	public int getEquipStrength( int sysId){
		Struct_zhuangbei_204 excel = Config_zhuangbei_204.getIns().get( sysId);
		int zhanli = excel.getZhanli();
		return zhanli;
	}
}
