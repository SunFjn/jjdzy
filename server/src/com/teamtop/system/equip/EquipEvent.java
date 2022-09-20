package com.teamtop.system.equip;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.equip.model.EquipData;
import com.teamtop.system.equip.model.ShengEquipClear;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;


/**
 * 装备系统事件处理类
 * @author hepl
 *
 */
public class EquipEvent extends AbsSystemEvent {
	
	private static EquipEvent ins = null;
	
	public static EquipEvent getIns(){
		if(ins == null){
			ins = new EquipEvent();
		}
		return ins;
	}
	/**
	 * 查找在身上的装备
	 * @param hero
	 */
	/*@Deprecated
	public void initForOffline(Hero hero) {
		//初始化装备缓存
		try {
			 Map<Integer, Equip> onbodyEquip = new ConcurrentHashMap<Integer, Equip>();
			//查询数据库里的装备
			List<Equip> list = EquipDao.getIns().findOnbodyEquip(hero.getId(), hero.getZoneid());
			if(list != null){
				for(Equip equip : list){
					//在身上的装备
					Map<Integer, Equip> map = onbodyEquip;
					map.put(equip.getBodyIndex(), equip);
				}
			}
			hero.setOnbodyEquip(onbodyEquip);
		} catch (Exception e) {
			LogTool.error(e, EquipEvent.class, hero.getId(), hero.getName(), "init equip error!");
		}
		
	}*/
	@Override
	public void init(Hero hero) {
		//初始化装备缓存
		try {
			EquipData equipData = hero.getEquipData();
			if(equipData==null){
				equipData = new EquipData();
				equipData.setHid(hero.getId());
				hero.setEquipData(equipData);
			}
			
			Map<Integer, Equip> onbodyEquip = new ConcurrentHashMap<Integer, Equip>();
			Map<Long, Equip> notOnBodyEquip = new ConcurrentHashMap<Long, Equip>();
			//查询数据库里的装备
//			List<Equip> list = EquipDao.getIns().findAllEquipByHid(hero.getId(), hero.getZoneid());
			List<Equip> list = equipData.getEquipAlllist();
			if(list != null){
				for(Equip equip : list){
					int state = equip.getState();
					if(state == EquipConst.ON_BODY){
						//在身上的装备
						onbodyEquip.put(equip.getBodyIndex(), equip);
					}else {
						//不在身上的装备
						notOnBodyEquip.put(equip.getId(), equip);
					}
				}
			}
			hero.setOnbodyEquip(onbodyEquip);
			hero.setNotOnBodyEquip(notOnBodyEquip);
			LogTool.info(hero.getId(), hero.getName(), "init equipData:"+equipData.toString(), EquipEvent.class);
		} catch (Exception e) {
			LogTool.error(e, EquipEvent.class, hero.getId(), hero.getName(), "init equip error!");
		}
		//神装洗练初始化
		ShengEquipClear shengEquipClear=hero.getShengEquipClear();
		if (shengEquipClear==null) {
			shengEquipClear=new ShengEquipClear();
			shengEquipClear.setHid(hero.getId());
			shengEquipClear.setClearValues(new HashMap<>());
			hero.setShengEquipClear(shengEquipClear);
		}
		
	}

	@Override
	public void login(Hero hero) {
		//登录发送在身上装备与不在身上装备
		EquipFunction.getIns().sendOnbodyEquip(hero,0);
		EquipFunction.getIns().sendOffbodyEquip(hero);
		//神装登陆红点
		boolean redPonint = EquipFunction.getIns().redPonint(hero);
		if (redPonint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, EquipConst.SYS_ID, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		//转生装备系统红点
		redPonint = EquipFunction.getIns().resBornredPonint(hero);
		if (redPonint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, EquipConst.SYS_RESBORN_ID, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		//神装洗练红点
		redPonint=EquipFunction.getIns().clearRedPonint(hero);
		if (redPonint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, EquipConst.SYS_ID, 2,
					RedPointConst.HAS_RED);
		}
	}
	
	@Override
	public void logout(Hero hero) {
		//登出时同步角色的装备数据
		ArrayList<Equip> list = new ArrayList<Equip>();
		Map<Integer, Equip> onbodyEquip = hero.getOnbodyEquip();
		
		if(onbodyEquip != null && !onbodyEquip.isEmpty()){
			list.addAll(onbodyEquip.values());
		}
		
		Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
		if(notOnBodyEquip != null && !notOnBodyEquip.isEmpty()){
			list.addAll(notOnBodyEquip.values());
		}
		if(!list.isEmpty()){
			try {
//				EquipDao.getIns().updateBatch(list, hero.getZoneid());
				EquipData equipData = hero.getEquipData();
				if(equipData==null){
					equipData = new EquipData();
					equipData.setHid(hero.getId());
					hero.setEquipData(equipData);
				}
				equipData.setEquipAlllist(list);
				LogTool.info(hero.getId(), hero.getName(), "logout equipData:"+equipData.toString(), EquipEvent.class);
			} catch (Exception e) {
				LogTool.error(e, EquipEvent.class, hero.getId(), hero.getName(), "equipEvent logoutSyncPub notOnBodyEquip error!");
			}
		}
		list = null;
	}

}
