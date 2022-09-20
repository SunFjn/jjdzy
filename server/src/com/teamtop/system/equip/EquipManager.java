package com.teamtop.system.equip;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.equip.model.ShengEquipClear;
import com.teamtop.system.event.backstage.events.flowEquip.FlowEquipEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.monsterSpirit.MonsterSpiritManager;
import com.teamtop.system.monsterSpirit.MonsterSpiritSysCache;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.wujiang.WuJiangSender;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_decompose_204;
import excel.config.Config_godequipsuit_208;
import excel.config.Config_szxl_306;
import excel.config.Config_szxlsx_306;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_decompose_204;
import excel.struct.Struct_eqiuplv_204;
import excel.struct.Struct_szxl_306;
import excel.struct.Struct_szxlsx_306;
import excel.struct.Struct_zhuangbei_204;


/**
 * 装备系统逻辑处理类
 *
 */
public class EquipManager {

	private static EquipManager ins = null;
	
	public static EquipManager getIns(){
		if(ins == null){
			ins = new EquipManager();
		}
		return ins;
	}
	
	/**
	 * 获取装备
	 * @param hero
	 * @param state 装备状态 0不在身上1身上普通装备2神装3将印4转生装备
	 */
	public void getEquips(Hero hero, int state) {
		try {
			if (state==0) {
				EquipFunction.getIns().sendOffbodyEquip(hero);
				return;
			}else {
				EquipFunction.getIns().sendOnbodyEquip(hero,state);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "getEquips hid："+hero.getId());
		}
		
	}

	/**
	 * 一键穿戴装备
	 * @param hero
	 * @param job
	 */
	public void wearEquip(Hero hero,Object[] ids) {
		try {
			if (ids.length>10) {
				LogTool.warn("ids.length>10 hero:"+hero.getNameZoneid(), EquipManager.class);
				return;
			}
			Map<Integer, Equip> bodyEquip =hero.getOnbodyEquip();
			if(bodyEquip == null){
				return;
			}
			ArrayList<Object[]> changeList = new ArrayList<Object[]>();
			Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
			boolean isChange = false;
			Equip tempEquip = null;
			Equip equip = null;
			
			//将未穿戴的装备分类
			for(int i=0; i<ids.length; i++){
				Long equipId = (Long) ids[i];
				if (!notOnBodyEquip.containsKey(equipId)) {
					continue;
				}
				tempEquip=notOnBodyEquip.get(equipId);
				int part=EquipFunction.getIns().getEquipPart(tempEquip.getSysId());
				//判断是否是普通装备位置
				if (part<GameConst.INDEX_EQUIP_0||part>GameConst.INDEX_EQUIP_9) {
					continue;
				}
				int[] equipZsLevel = EquipFunction.getEquipZsLevel(tempEquip.getSysId());
				int rebornLv = equipZsLevel[0];
				int level = equipZsLevel[1];
				if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
					continue;
				}
				equip = bodyEquip.get(part);
				if(equip != null){
					//身上有装备，替换
					int strength = EquipFunction.getIns().getEquipStrength( equip.getSysId());
					int strengthTemp = EquipFunction.getIns().getEquipStrength(tempEquip.getSysId());
					if( strength >= strengthTemp){
						continue;
					}
//					equip.setJob(0);
					equip.setState(EquipConst.IN_BAG);
					equip.setBodyIndex(0);
					notOnBodyEquip.put(equip.getId(), equip);
					//背包处理
					long[][] data = new long[1][];
					data[0] = new long[]{equip.getId(),equip.getSysId()};
					UseAddUtil.addEquip(hero, data, SourceGoodConst.EQUIP_UNWEAR, null, false);
				}
				//背包处理
				UseAddUtil.useEquip(hero, tempEquip.getId(), false, SourceGoodConst.EQUIP_WEAR, false);
				tempEquip.setState(EquipConst.ON_BODY);
				tempEquip.setBodyIndex(part);
				notOnBodyEquip.remove(tempEquip.getId());
				//更新身上缓存
				bodyEquip.put(part, tempEquip);
				//穿戴在身上的装备信息
				changeList.add(new Object[]{tempEquip.getId(), tempEquip.getSysId(), part});
				isChange = true;
			}
			if(isChange){
				//重新计算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEAREQUIP,SystemIdConst.EQUIP_SYSID);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEAREQUIP,SystemIdConst.FOGER_SYSID);
				EquipFunction.getIns().getSumEquipStar(hero);
				EquipSender.sendCmd_354(hero.getId(), 0,  changeList.toArray());
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_15, 0);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_20, 0);
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, this, "wearEquip hid:"+hero.getId());
		}
		
	}
	/**
	 * 穿神装
	 * @param hero
	 */
	public void wearShenEquip(Hero hero) {
		try {
			Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
			if(bodyEquip == null){
				return;
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
				type = EquipFunction.getIns().getEquipPart( e.getSysId());
				typeList = typeMap.get(type);
				if(typeList == null){
					typeList = new ArrayList<Equip>();
					typeMap.put(type, typeList);
				}
				typeList.add(e);
			}
			//从身上位置遍历
			ArrayList<Object[]> changeList = new ArrayList<Object[]>();
			boolean isChange = false;
			boolean replace = false;
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
				replace = false;
				equip = bodyEquip.get(i);
				if(equip != null){
					//身上有装备，替换
					int strength = EquipFunction.getIns().getEquipStrength( equip.getSysId());
					int strengthTemp = EquipFunction.getIns().getEquipStrength( tempEquip.getSysId());
					if( strength >= strengthTemp){
						continue;
					}
//					equip.setJob(0);
					equip.setState(EquipConst.IN_BAG);
					equip.setBodyIndex(0);
					notOnBodyEquip.put(equip.getId(), equip);
					replace = true;
					list.add(equip); //加入到待穿戴装备分类
				}
				list.remove(tempEquip); //移除穿戴的装备
				//背包处理
				UseAddUtil.useEquip(hero, tempEquip.getId(), false, SourceGoodConst.EQUIP_WEAR, false);
//				tempEquip.setJob(0);
				tempEquip.setState(EquipConst.ON_BODY);
				tempEquip.setBodyIndex(i);
				notOnBodyEquip.remove(tempEquip.getId());
				//更新身上缓存
				bodyEquip.put(i, tempEquip);
				//背包处理
				if(replace){
					long[][] data = new long[1][];
					data[0] = new long[]{equip.getId(),equip.getSysId()};
					UseAddUtil.addEquip(hero, data, SourceGoodConst.EQUIP_UNWEAR, null, false);
				}
				//穿戴在身上的装备信息
				changeList.add(new Object[]{tempEquip.getId(), tempEquip.getSysId(), i});
				isChange = true;
			}
			if(isChange){
				//重新计算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEARSHENGEQUIP,SystemIdConst.EQUIP_SYSID);
				EquipSender.sendCmd_354(hero.getId(), 0,  changeList.toArray());
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, this, "wearEquip hid:"+hero.getId());
		}
		
	}

	/**
	 * 神装升级
	 * @param hero
	 * @param job
	 * @param bodyIndex
	 */
	public void updateOrange(Hero hero,int bodyIndex) {
		try {
			//判断是否是神装位置
			if (bodyIndex<GameConst.INDEX_SHEN_BING_0||bodyIndex>GameConst.INDEX_SHEN_BING_9) {
				return;
			}
			Map<Integer, Equip> onbodyEquip = hero.getOnbodyEquip();
			if(onbodyEquip == null ){
				return;
			}
			Equip equip = onbodyEquip.get(bodyIndex);
			if (equip==null) {
				return;
			}
			//神装升级
			Struct_eqiuplv_204 struct_eqiuplv_204=	EquipCache.getGodEquipLvMap().get(bodyIndex).get(equip.getSysId());
			
			int nextSysId = struct_eqiuplv_204.getId();
			//判断最高级
			if(struct_eqiuplv_204.getId() == struct_eqiuplv_204.getUp()){
				EquipSender.sendCmd_362(hero.getId(), 3, bodyIndex, 0, 0);
				return;
			}
			//判断升级等级
			int[] equipZsLevel = EquipFunction.getEquipZsLevel(nextSysId);
			int level = equipZsLevel[1];
			int rebornLv = equipZsLevel[0];
			if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
				EquipSender.sendCmd_362(hero.getId(), 1, bodyIndex, 0, 0);
				return;
			}
			//判断材料
			int[][] fenjie = struct_eqiuplv_204.getCompose();
			if(!UseAddUtil.canUse(hero, fenjie)){
				EquipSender.sendCmd_362(hero.getId(), 2,bodyIndex, 0, 0);
				return;
			}
			UseAddUtil.use(hero, fenjie, SourceGoodConst.EQUIP_ORANGE_LV, true);
			//升级
			equip.setSysId(nextSysId);
			//计算装备评分
			//int score = EquipFunction.getIns().calcEquipScore(nextSysId, 0);
//			equip.setScore(zhuangbei_602.getZhanli());
			String pfcode="";
			String usesys="";
			if (hero.getTempData().getAccount()!=null) {
				pfcode=hero.getTempData().getAccount().getPfcode();
				usesys=hero.getTempData().getAccount().getUsesys();
			}
			//流水
			FlowEquipEvent.addEquipFlow(hero.getId(), 0, equip, SourceGoodConst.FLOW_OPER_ADD, SourceGoodConst.EQUIP_ORANGE_LV, hero.getZoneid(),pfcode,usesys);
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_ORANGE_LV,SystemIdConst.EQUIP_SYSID);
			//返回前端
			EquipSender.sendCmd_362(hero.getId(), 0,  bodyIndex, equip.getId(), equip.getSysId());
		} catch (Exception e) {
			LogTool.error(e, this, "updateOrange has wrong:"+hero.getId());
		}
		
	}

	/**
	 * 神装合成
	 * @param hero
	 * @param job
	 * @param bodyIndex
	 * @param sysId
	 */
	public void composeOrange(Hero hero,  int bodyIndex, int sysId) {
		try {
			//判断是否是神装位置
			if (bodyIndex<GameConst.INDEX_SHEN_BING_0||bodyIndex>GameConst.INDEX_SHEN_BING_9) {
				return;
			}
			Map<Integer, Equip> onbodyEquip = hero.getOnbodyEquip();
			if(onbodyEquip == null){
				return;
			}
			Equip equip = onbodyEquip.get(bodyIndex);
			if (equip!=null) {
				return;
			}
			//神装升级
			Struct_eqiuplv_204 struct_eqiuplv_204=	EquipCache.getGodEquipLvMap().get(bodyIndex).get(0);
			int nextSysId = struct_eqiuplv_204.getId();
			//判断材料
			int[][] fenjie = struct_eqiuplv_204.getCompose();
			if(!UseAddUtil.canUse(hero, fenjie)){
				EquipSender.sendCmd_364(hero.getId(), 2,bodyIndex, 0, nextSysId);
				return;
			}
			UseAddUtil.use(hero, fenjie, SourceGoodConst.EQUIP_ORANGE_COMPOSE, true);
			//生成装备
			long equipId = EquipFunction.getIns().createEquip(hero, nextSysId, EquipConst.ON_BODY, 0, bodyIndex);
			String pfcode="";
			String usesys="";
			if (hero.getTempData()!=null&&hero.getTempData().getAccount()!=null) {
				pfcode=hero.getTempData().getAccount().getPfcode();
				usesys=hero.getTempData().getAccount().getUsesys();
			}
			//流水
			equip = onbodyEquip.get(bodyIndex);
			FlowEquipEvent.addEquipFlow(hero.getId(), 0, equip, SourceGoodConst.FLOW_OPER_ADD, SourceGoodConst.EQUIP_ORANGE_COMPOSE, hero.getZoneid(),pfcode,usesys);
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_ORANGE_COMPOSE,SystemIdConst.EQUIP_SYSID);
			//返回前端
			EquipSender.sendCmd_364(hero.getId(), 0,  bodyIndex, equipId, nextSysId);
		} catch (Exception e) {
			LogTool.error(e, this, "composeOrange has wrong:"+hero.getId());
		}
		
	}

	/**
	 * 神装分解
	 * @param hero
	 * @param equipId
	 */
	public void decomposeOrange(Hero hero, long equipId) {
		try {
			//判断装备是否在缓存
			Equip equip = hero.getNotOnBodyEquip(equipId);
			if(equip == null){
				LogTool.warn("hid:"+hero.getId()+", decomposeOrange warn, equip not exists, equipId:"+equipId, EquipManager.class);
				return;
			}
			int sysId = equip.getSysId();
			Struct_decompose_204 excel = Config_decompose_204.getIns().get(sysId);
			if(excel == null){
				return;
			}
			int[][] hecheng = excel.getConsume();
			if (!UseAddUtil.canUse(hero, hecheng)) {
				EquipSender.sendCmd_366(hero.getId(), 1, equipId);
				return;
			}
			if (!UseAddUtil.canAdd(hero,excel.getReward(),false)) {
				//返回前端
				EquipSender.sendCmd_366(hero.getId(), 1, equipId);
				return;
			}
			UseAddUtil.use(hero, hecheng, SourceGoodConst.EQUIP_ORANGE_DECOMPOSE, true);
			UseAddUtil.add(hero, excel.getReward(), SourceGoodConst.EQUIP_ORANGE_DECOMPOSE, null, true);
			UseAddUtil.useEquip(hero, equip.getId(), true, SourceGoodConst.EQUIP_ORANGE_DECOMPOSE, false);
			//返回前端
			EquipSender.sendCmd_366(hero.getId(), 0, equipId);
			return;
		} catch (Exception e) {
			LogTool.error(e, this, "decomposeOrange has wrong:"+hero.getId());
		}
	}
	/**
	 * 获取神装套装id
	 * @param hero
	 */
	public void getJieOrange(Hero hero) {
		EquipSender.sendCmd_368(hero.getId(), hero.getForge().getShenLv());
		return;
	}
	/**
	 * 升阶神装套装等阶
	 * @param hero
	 */
	public void upJieOrange(Hero hero) {
		try {
			int lv=0;
			boolean isAllEquip=true;
			for (int i = GameConst.INDEX_SHEN_BING_0; i <=GameConst.INDEX_SHEN_BING_9; i++) {
				if (hero.getOnbodyEquip().get(i)==null) {
					isAllEquip=false;
					break;
				}
				if (i == GameConst.INDEX_SHEN_BING_0) {
					lv=Config_zhuangbei_204.getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getJie();
				}else {
					if (lv>Config_zhuangbei_204.getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getJie()) {
						lv=Config_zhuangbei_204.getIns().get(hero.getOnbodyEquip().get(i).getSysId()).getJie();
					}
				}
			}
			if (isAllEquip&&lv>0) {
				//已经是最高神装套装阶数了
				if (hero.getForge().getShenLv()>=lv) {
					
					return;
				}else {
					int goal=hero.getForge().getShenLv()+1;
					if (Config_godequipsuit_208.getIns().get(goal)!=null) {
						hero.getForge().setShenLv(goal);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_SHENG_UPJIE,SystemIdConst.FOGER_SYSID);
						EquipSender.sendCmd_370(hero.getId(), 0, hero.getForge().getShenLv());
						// 成就
						AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_3, 0);
						return;
					}else {
						EquipSender.sendCmd_370(hero.getId(), 3, hero.getForge().getShenLv());
						return;
					}
				}
			}else {
				EquipSender.sendCmd_370(hero.getId(), 1, hero.getForge().getShenLv());
			}
			
		} catch (Exception e) {
			LogTool.error(e, EquipManager.class, "upJieOrange has wrong");
		}
		
	}

	public void wearEquipByid(Hero hero, long eid) {
		try {
			Map<Integer, Equip> bodyEquip =hero.getOnbodyEquip();
			if(bodyEquip == null){
				return;
			}
			
			Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
			if (!notOnBodyEquip.containsKey(eid)) {
				EquipSender.sendCmd_372(hero.getId(), 1, eid);
				return;
			}
			Equip tempEquip=notOnBodyEquip.get(eid);
			if(tempEquip.getState() != EquipConst.IN_BAG){
				EquipSender.sendCmd_372(hero.getId(), 1, eid);
				return;
			}
			//将印穿戴判断
			int equipPartTemp = EquipFunction.getIns().getEquipPart( tempEquip.getSysId());
			if ( equipPartTemp>=GameConst.INDEX_WUJING_0&& equipPartTemp<=GameConst.INDEX_WUJING_9) {
				int index=equipPartTemp-20;
				int official = Config_xtcs_004.getIns().get(EquipConst.JIANGYINGPART).getOther()[index][1];
				if (hero.getOfficial()<official) {
					EquipSender.sendCmd_372(hero.getId(), 1, eid);
					return;
				}
			}
			Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(tempEquip.getSysId());
			int[] equipZsLevel =  zhuangbei_602.getLv()[0];
			if (equipZsLevel==null) {
				equipZsLevel=new int[]{0,0};
			}
			int rebornLv = equipZsLevel[0];
			int level = equipZsLevel[1];
			if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
				EquipSender.sendCmd_372(hero.getId(), 1, eid);
				return;
			}
			int jie=0;
			if (equipPartTemp>=GameConst.INDEX_40&& equipPartTemp<=GameConst.INDEX_43) {
				jie=hero.getWujiang().getJieLv();
			}else if (equipPartTemp>=GameConst.INDEX_50&& equipPartTemp<=GameConst.INDEX_53) {
				jie=hero.getZhanJia().getJieLv();
			}else if (equipPartTemp>=GameConst.INDEX_60&& equipPartTemp<=GameConst.INDEX_63) {
				jie=hero.getExcalibur().getJieLv();
			}else if (equipPartTemp>=GameConst.INDEX_70&& equipPartTemp<=GameConst.INDEX_73) {
				jie=hero.getSpecialTreasure().getJieLv();
			}else if (equipPartTemp>=GameConst.INDEX_80&& equipPartTemp<=GameConst.INDEX_83) {
				jie=hero.getBingfa().getJieLv();
			}else if (equipPartTemp>=GameConst.INDEX_90&& equipPartTemp<=GameConst.INDEX_93) {
				jie=hero.getTreasureData().getLevel();
			}else if (equipPartTemp>=GameConst.INDEX_100&& equipPartTemp<=GameConst.INDEX_103) {
				jie=hero.getGodbook().getLevel();
			} else if (MonsterSpiritSysCache.getSiteList().contains(equipPartTemp)) {
				int type = MonsterSpiritSysCache.getTypeByEquipPart(equipPartTemp);
				MonsterSpiritManager.getIns().wearEquip(hero, type, equipPartTemp);
				return;
			}
			if (equipPartTemp>=GameConst.INDEX_40) {
				int jie1 = zhuangbei_602.getJie();
				if (jie1>jie) {
					EquipSender.sendCmd_372(hero.getId(), 1, eid);
					return;
				}
			}
			
			ArrayList<Object[]> changeList = new ArrayList<Object[]>();
			Equip equip = bodyEquip.get(equipPartTemp);
			if(equip != null){
				//身上有装备，替换
//				equip.setJob(0);
				equip.setState(EquipConst.IN_BAG);
				equip.setBodyIndex(0);
				//背包处理
				long[][] data = new long[1][];
				data[0] = new long[]{equip.getId(),equip.getSysId()};
				UseAddUtil.addEquip(hero, data, SourceGoodConst.WEAREQUIP_BYID, null, false);
				notOnBodyEquip.put(equip.getId(), equip);
			}
			//背包处理
			if (UseAddUtil.useEquip(hero, tempEquip.getId(), false, SourceGoodConst.WEAREQUIP_BYID, false)) {
//				tempEquip.setJob(0);
				tempEquip.setState(EquipConst.ON_BODY);
				tempEquip.setBodyIndex( equipPartTemp);
				notOnBodyEquip.remove(tempEquip.getId());
				//更新身上缓存
				bodyEquip.put( equipPartTemp, tempEquip);
				//穿戴在身上的装备信息
				changeList.add(new Object[]{tempEquip.getId(), tempEquip.getSysId(), equipPartTemp});
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEAREQUIP_BYID,SystemIdConst.EQUIP_SYSID);
				if ( equipPartTemp>=GameConst.INDEX_EQUIP_0&&equipPartTemp<=GameConst.INDEX_EQUIP_9) {
					EquipSender.sendCmd_354(hero.getId(), 0,changeList.toArray());
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_15, 0);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_20, 0);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEAREQUIP_BYID,SystemIdConst.FOGER_SYSID);
					//
					EquipFunction.getIns().getSumEquipStar(hero);
				}else if (equipPartTemp>=GameConst.INDEX_SHEN_BING_0&& equipPartTemp<=GameConst.INDEX_SHEN_BING_9) {
					EquipSender.sendCmd_356(hero.getId(), 0,changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_WUJING_0&& equipPartTemp<=GameConst.INDEX_WUJING_9) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEAREQUIP_BYID,SystemIdConst.WUJIANG_SYSID);
					WuJiangSender.sendCmd_666(hero.getId(), 0,changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_REBORN_0&& equipPartTemp<=GameConst.INDEX_REBORN_3) {
					EquipSender.sendCmd_374(hero.getId(), 0,changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_40&& equipPartTemp<=GameConst.INDEX_43) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_WUJIANG,SystemIdConst.WUJIANG_SYSID);
					EquipSender.sendCmd_376(hero.getId(), 0, 1, changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_50&& equipPartTemp<=GameConst.INDEX_53) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_ZHANJIA,SystemIdConst.zhanjia_SYSID);
					EquipSender.sendCmd_376(hero.getId(), 0, 2, changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_60&& equipPartTemp<=GameConst.INDEX_63) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_EXCALIBUR,SystemIdConst.Excalibur_SYSID);
					EquipSender.sendCmd_376(hero.getId(), 0, 3, changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_70&& equipPartTemp<=GameConst.INDEX_73) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_SPECAILTREASUR,SystemIdConst.SpeTreasure_SYSID);
					EquipSender.sendCmd_376(hero.getId(), 0, 4, changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_80&& equipPartTemp<=GameConst.INDEX_83) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_BINGFA,SystemIdConst.BingFa_SYSID);
					EquipSender.sendCmd_376(hero.getId(), 0, 5, changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_90&& equipPartTemp<=GameConst.INDEX_93) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_TAREASURE,SystemIdConst.Treasure_SYSID);
					EquipSender.sendCmd_376(hero.getId(), 0, 6, changeList.toArray());
				}else if (equipPartTemp>=GameConst.INDEX_100&& equipPartTemp<=GameConst.INDEX_103) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_GODBOOK,SystemIdConst.GodBook_SYSID);
					EquipSender.sendCmd_376(hero.getId(), 0, 7, changeList.toArray());
				}
				EquipSender.sendCmd_372(hero.getId(), 0, eid);
			}
		
			return;
		} catch (Exception e) {
			LogTool.error(e, EquipManager.class, hero.getId(), hero.getName(), "wearEquipByid has wrong");
		}
		
	}
	/**
	 * 一键穿戴转生装备
	 * @param hero
	 * @param arrs
	 */
	public void wearReBornEquip(Hero hero, Object[] arrs) {
		try {
			if (arrs.length>4) {
				LogTool.warn("ids.length>4 hero:"+hero.getNameZoneid(), EquipManager.class);
				return;
			}
			Map<Integer, Equip> bodyEquip =hero.getOnbodyEquip();
			if(bodyEquip == null){
				return;
			}
			ArrayList<Object[]> changeList = new ArrayList<Object[]>();
			Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
			boolean isChange = false;
			Equip tempEquip = null;
			Equip equip = null;
			
			//将未穿戴的装备分类
			for(int i=0; i<arrs.length; i++){
				Long equipId = (Long) arrs[i];
				if (!notOnBodyEquip.containsKey(equipId)) {
					continue;
				}
				tempEquip=notOnBodyEquip.get(equipId);
				int part=EquipFunction.getIns().getEquipPart(tempEquip.getSysId());
				//判断是否是转生装备位置
				if (part<GameConst.INDEX_REBORN_0||part>GameConst.INDEX_REBORN_3) {
					continue;
				}
				int[] equipZsLevel = EquipFunction.getEquipZsLevel(tempEquip.getSysId());
				int rebornLv = equipZsLevel[0];
				int level = equipZsLevel[1];
				if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
					continue;
				}
				equip = bodyEquip.get(part);
				if(equip != null){
					//身上有装备，替换
					int strength = EquipFunction.getIns().getEquipStrength( equip.getSysId());
					int strengthTemp = EquipFunction.getIns().getEquipStrength(tempEquip.getSysId());
					if( strength >= strengthTemp){
						continue;
					}
//					equip.setJob(0);
					equip.setState(EquipConst.IN_BAG);
					equip.setBodyIndex(0);
					notOnBodyEquip.put(equip.getId(), equip);
					//背包处理
					long[][] data = new long[1][];
					data[0] = new long[]{equip.getId(),equip.getSysId()};
					UseAddUtil.addEquip(hero, data, SourceGoodConst.EQUIP_UNWEAR, null, false);
				}
				//背包处理
				UseAddUtil.useEquip(hero, tempEquip.getId(), false, SourceGoodConst.EQUIP_WEAR, false);
				tempEquip.setState(EquipConst.ON_BODY);
				tempEquip.setBodyIndex(part);
				notOnBodyEquip.remove(tempEquip.getId());
				//更新身上缓存
				bodyEquip.put(part, tempEquip);
				//穿戴在身上的装备信息
				changeList.add(new Object[]{tempEquip.getId(), tempEquip.getSysId(), part});
				isChange = true;
			}
			if(isChange){
				//重新计算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEAREQUIP,SystemIdConst.EQUIP_SYSID);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEAREQUIP,SystemIdConst.FOGER_SYSID);
				EquipSender.sendCmd_374(hero.getId(), 0,  changeList.toArray());
			}
		} catch (Exception e) {
			LogTool.error(e, EquipManager.class, hero.getId(), hero.getName(), "wearReBornEquip has wrong");
		}
		
	}

	public void wearbypart(Hero hero, int type, Object[] eids) {
		try {
			//1武将2战甲3神剑4异宝5兵法6宝物7天书
			if (type<1||type>7) {
				return;
			}
			if (eids.length>4) {
				LogTool.warn("wearbypart ids.length>4 hero:"+hero.getNameZoneid(), EquipManager.class);
				return;
			}
			int jie=0;
			int starteid=0;
			int endeid=0;
			boolean ischange=false;
			switch (type) {
			case 1:
				jie=hero.getWujiang().getJieLv();
				starteid=GameConst.INDEX_40;
				endeid=GameConst.INDEX_43;
				ischange=wearBySys(hero,type,jie,starteid,endeid,eids);
				if (ischange) {
					//计算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_WUJIANG,SystemIdConst.WUJIANG_SYSID);
					EquipSender.sendCmd_372(hero.getId(), 0, 0);
				}
				break;
			case 2:
				jie=hero.getZhanJia().getJieLv();
				starteid=GameConst.INDEX_50;
				endeid=GameConst.INDEX_53;
				ischange=wearBySys(hero,type,jie,starteid,endeid,eids);
				if (ischange) {
					//计算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_ZHANJIA,SystemIdConst.zhanjia_SYSID);
					EquipSender.sendCmd_372(hero.getId(), 0, 0);
				}
				break;
			case 3:
				jie=hero.getExcalibur().getJieLv();
				starteid=GameConst.INDEX_60;
				endeid=GameConst.INDEX_63;
				ischange=wearBySys(hero,type,jie,starteid,endeid,eids);
				if (ischange) {
					//计算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_EXCALIBUR,SystemIdConst.Excalibur_SYSID);
					EquipSender.sendCmd_372(hero.getId(), 0, 0);
				}
				break;
			case 4:
				jie=hero.getSpecialTreasure().getJieLv();
				starteid=GameConst.INDEX_70;
				endeid=GameConst.INDEX_73;
				ischange=wearBySys(hero,type,jie,starteid,endeid,eids);
				if (ischange) {
					//计算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_SPECAILTREASUR,SystemIdConst.SpeTreasure_SYSID);
					EquipSender.sendCmd_372(hero.getId(), 0, 0);
				}				
				break;
			case 5:
				jie=hero.getBingfa().getJieLv();
				starteid=GameConst.INDEX_80;
				endeid=GameConst.INDEX_83;
				ischange=wearBySys(hero,type,jie,starteid,endeid,eids);
				if (ischange) {
					//计算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_BINGFA,SystemIdConst.BingFa_SYSID);
					EquipSender.sendCmd_372(hero.getId(), 0, 0);
				}				
				break;
			case 6:
				jie=hero.getTreasureData().getLevel();
				starteid=GameConst.INDEX_90;
				endeid=GameConst.INDEX_93;
				ischange=wearBySys(hero,type,jie,starteid,endeid,eids);
				if (ischange) {
					//计算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_TAREASURE,SystemIdConst.Treasure_SYSID);
					EquipSender.sendCmd_372(hero.getId(), 0, 0);
				}
				break;
			case 7:
				jie=hero.getGodbook().getLevel();
				starteid=GameConst.INDEX_100;
				endeid=GameConst.INDEX_103;
				ischange=wearBySys(hero,type,jie,starteid,endeid,eids);
				if (ischange) {
					//计算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_GODBOOK,SystemIdConst.GodBook_SYSID);
					EquipSender.sendCmd_372(hero.getId(), 0, 0);
				}
				break;
			
			default:
				break;
			}
			
		} catch (Exception e) {
			LogTool.error(e, EquipManager.class, hero.getId(), hero.getName(), "wearbypart has wrong");
		}
		
	}

	private boolean wearBySys(Hero hero,int type, int jie, int starteid, int endeid, Object[] eids) {
		boolean isChange = false;
		try {
			Map<Integer, Equip> bodyEquip =hero.getOnbodyEquip();
			if(bodyEquip == null){
				return isChange;
			}
			ArrayList<Object[]> changeList = new ArrayList<Object[]>();
			Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
		
			Equip tempEquip = null;
			Equip equip = null;
			//将未穿戴的装备分类
			for(int i=0; i<eids.length; i++){
				Long equipId = (Long) eids[i];
				if (!notOnBodyEquip.containsKey(equipId)) {
					continue;
				}
				tempEquip=notOnBodyEquip.get(equipId);
				int part=EquipFunction.getIns().getEquipPart(tempEquip.getSysId());
				//判断是否是转生装备位置
				if (part<starteid||part>endeid) {
					continue;
				}
				Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(tempEquip.getSysId());
				int[] equipZsLevel = zhuangbei_602.getLv()[0];
				if (equipZsLevel==null) {
					equipZsLevel=new int[]{0,0};
				}
				int rebornLv = equipZsLevel[0];
				int level = equipZsLevel[1];
				if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
					continue;
				}
				int jie1 = zhuangbei_602.getJie();
				if (jie1>jie) {
					continue;
				}
				equip = bodyEquip.get(part);
				if(equip != null){
					//身上有装备，替换
					int strength = EquipFunction.getIns().getEquipStrength( equip.getSysId());
					int strengthTemp = EquipFunction.getIns().getEquipStrength(tempEquip.getSysId());
					if( strength >= strengthTemp){
						continue;
					}
//					equip.setJob(0);
					equip.setState(EquipConst.IN_BAG);
					equip.setBodyIndex(0);
					notOnBodyEquip.put(equip.getId(), equip);
					//背包处理
					long[][] data = new long[1][];
					data[0] = new long[]{equip.getId(),equip.getSysId()};
					UseAddUtil.addEquip(hero, data, SourceGoodConst.EQUIP_UNWEAR, null, false);
				}
				//背包处理
				UseAddUtil.useEquip(hero, tempEquip.getId(), false, SourceGoodConst.EQUIP_WEAR, false);
				tempEquip.setState(EquipConst.ON_BODY);
				tempEquip.setBodyIndex(part);
				notOnBodyEquip.remove(tempEquip.getId());
				//更新身上缓存
				bodyEquip.put(part, tempEquip);
				//穿戴在身上的装备信息
				changeList.add(new Object[]{tempEquip.getId(), tempEquip.getSysId(), part});
				isChange = true;
			}
			if (isChange) {
				EquipSender.sendCmd_376(hero.getId(), 0, type, changeList.toArray());
			}
		} catch (Exception e) {
			LogTool.error(e, EquipManager.class, hero.getId(), hero.getName(), "wearBySys");
		}
		return isChange;
		
	}
	/**
	 * 获取某件神装的洗练属性
	 * @param hero
	 * @param index
	 */
	public void clearSate(Hero hero) {
		try {
			Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
			if(bodyEquip == null){
				return;
			}
			Object[] arrs=new Object[10] ;
			int i=0;
			for (int index = GameConst.INDEX_SHEN_BING_0; index <= GameConst.INDEX_SHEN_BING_9; index++) {
				Equip equip = bodyEquip.get(index);
				if (equip==null) {
					LogTool.warn("equip==null:"+index, EquipManager.class);
					continue;
				}
				if (equip.getSysId()==0) {
					LogTool.warn("equip.getSysId()==0"+equip.getSysId(), EquipManager.class);
					continue;
				}
				ShengEquipClear shengEquipClear = hero.getShengEquipClear();
				if (shengEquipClear.getClearValues()==null) {
					shengEquipClear.setClearValues(new HashMap<>());
					shengEquipClear.getClearValues().put(index, new HashMap<>());
					HashMap<Integer, Integer> hashMap = shengEquipClear.getClearValues().get(index);
					hashMap.put(GameConst.HP_EXT, 0);
					hashMap.put(GameConst.ATT_EXT,0);
					hashMap.put(GameConst.DEF_EXT,0);
				}
				HashMap<Integer, Integer> hashMap = shengEquipClear.getClearValues().get(index);
				if (hashMap==null) {
					hashMap=new HashMap<>();
					shengEquipClear.getClearValues().put(index, hashMap);
					hashMap.put(GameConst.HP_EXT, 0);
					hashMap.put(GameConst.ATT_EXT,0);
					hashMap.put(GameConst.DEF_EXT,0);
				}
				
				Object[] arrs1=new Object[3];
				arrs1[0]=new Object[] {GameConst.ATT_EXT, hashMap.get(GameConst.ATT_EXT)};
				arrs1[1]=new Object[] {GameConst.DEF_EXT, hashMap.get(GameConst.DEF_EXT)};
				arrs1[2]=new Object[] {GameConst.HP_EXT,  hashMap.get(GameConst.HP_EXT)};
				arrs[i]=new Object[] {index,arrs1};
				i++; 
			}
			arrs=CommonUtil.removeNull(arrs);
			EquipSender.sendCmd_380(hero.getId(), arrs);
		} catch (Exception e) {
			LogTool.error(e, EquipManager.class, "clearSate has wrong");
		}
		
	}
	/**
	 * 神装洗练
	 * @param hero
	 * @param index
	 */
	public void clearEquip(Hero hero, int index) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHENG_EQUIP_WEAR)){
				return;
			}
			Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
			if(bodyEquip == null){
				return;
			}
			if (index<GameConst.INDEX_SHEN_BING_0||index>GameConst.INDEX_SHEN_BING_9) {
				LogTool.warn("index is wrong:"+index, EquipManager.class);
				return;
			}
			Equip equip = bodyEquip.get(index);
			if (equip==null) {
				LogTool.warn("equip==null:"+index, EquipManager.class);
				return;
			}
			if (equip.getSysId()==0) {
				LogTool.warn("equip.getSysId()==0"+equip.getSysId(), EquipManager.class);
				return;
			}

			Struct_zhuangbei_204 struct_zhuangbei_204 = Config_zhuangbei_204.getIns().get(equip.getSysId());
			int jie = struct_zhuangbei_204.getJie();
			Struct_szxlsx_306 struct_szxlsx_306 = Config_szxlsx_306.getIns().get(jie);
			if (struct_szxlsx_306.getXl()==0) {
				LogTool.warn("struct_szxlsx_306.getXl()==0"+jie, EquipManager.class);
				return;
			}
			int max1=struct_szxlsx_306.getAtk();
			int max2=struct_szxlsx_306.getDef();
			int max3=struct_szxlsx_306.getHp();
			ShengEquipClear shengEquipClear = hero.getShengEquipClear();
			HashMap<Integer, Integer> hashMap = shengEquipClear.getClearValues().get(index);
			if (hashMap==null) {
				hashMap=new HashMap<>();
				shengEquipClear.getClearValues().put(index, hashMap);
				hashMap.put(GameConst.HP_EXT, 0);
				hashMap.put(GameConst.ATT_EXT,0);
				hashMap.put(GameConst.DEF_EXT,0);
			}
			int value1 = hashMap.get(GameConst.ATT_EXT);
			int value2 = hashMap.get(GameConst.DEF_EXT);
			int value3 = hashMap.get(GameConst.HP_EXT);
			ArrayList<Integer> nochooseValue=new ArrayList<>();
			if (value1==max1) {
				nochooseValue.add(GameConst.ATT_EXT);
			}
			if(value2==max2) {
				nochooseValue.add(GameConst.DEF_EXT);
			}
			if(value3==max3) {
				nochooseValue.add(GameConst.HP_EXT);
			}
			ProbabilityEventModel pro=new ProbabilityEventModel();
			Struct_szxlsx_306 struct_szxlsx_3062 = Config_szxlsx_306.getIns().get(jie);
			if (!UseAddUtil.canUse(hero, struct_szxlsx_3062.getCost())) {
				return;
			}
			int[][] gl = struct_szxlsx_3062.getGl();
			pro.addProbabilityEvent(gl[0][1], gl[0][0]);
			pro.addProbabilityEvent(gl[1][1], gl[1][0]);
			pro.addProbabilityEvent(gl[2][1], gl[2][0]);
			
			int goalIndex=0;
			int maxNum=0;
			if (nochooseValue.size()==3) {
				LogTool.warn("nochooseValue.size()==3", EquipManager.class);
				return;
			}else if (nochooseValue.size()==1) {
				goalIndex=(int)ProbabilityEventUtil.getEventByProbabilityWithNotChoose(pro,new Object[] {nochooseValue.get(0)});
			}else if(nochooseValue.size()==2){
				if(!nochooseValue.contains(GameConst.ATT_EXT)) {
					goalIndex=GameConst.ATT_EXT;
				}else if(!nochooseValue.contains(GameConst.DEF_EXT)) {
					goalIndex=GameConst.DEF_EXT;
				}else if(!nochooseValue.contains(GameConst.HP_EXT)) {
					goalIndex=GameConst.HP_EXT;
				}
			}else if(nochooseValue.size()==0) {
				goalIndex=(int)ProbabilityEventUtil.getEventByProbability(pro);
			}
			if (goalIndex==0) {
				LogTool.warn("goalIndex==0 hid:"+hero.getId(), EquipManager.class);
				return;
			}
			if (goalIndex==GameConst.ATT_EXT) {
				maxNum=max1;
			}else if (goalIndex==GameConst.DEF_EXT) {
				maxNum=max2;
			}else if (goalIndex==GameConst.HP_EXT) {
				maxNum=max3;
			}
			int id=0;
			id=EquipConst.indexForId.get(goalIndex);
			int valueindex=jie*1000+id;
			Struct_szxl_306 struct_szxl_306 = Config_szxl_306.getIns().get(valueindex);
			if (struct_szxl_306==null) {
				LogTool.warn("struct_szxl_306==null hid:"+hero.getId()+" valueindex:"+valueindex, EquipManager.class);
				return;
			}
			
			int randomNum = RandomUtil.getRandomNumInAreas(struct_szxl_306.getMin(), struct_szxl_306.getMax());
			int num = hashMap.get(goalIndex);
			int sumNum=randomNum+num;
			if (sumNum>maxNum) {
				sumNum=maxNum;
			}
			hashMap.put(goalIndex, sumNum);
			UseAddUtil.use(hero, struct_szxlsx_3062.getCost(), SourceGoodConst.SHENEQUIPCLEAR, true, null);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SHENEQUIPCLEAR,SystemIdConst.EQUIP_SYSID);
			EquipSender.sendCmd_378(hero.getId(), 0,index, goalIndex, sumNum);
			return;
		} catch (Exception e) {
			LogTool.error(e, EquipManager.class, "clearEquip has wrong");
		}
		
	}
	



	
	
}
