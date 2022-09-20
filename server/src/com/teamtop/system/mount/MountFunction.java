package com.teamtop.system.mount;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_changshu_101;
import excel.config.Config_horsepy_507;
import excel.config.Config_zq_773;
import excel.config.Config_zqsj_773;
import excel.config.Config_zqsx_773;
import excel.struct.Struct_changshu_101;
import excel.struct.Struct_horsepy_507;
import excel.struct.Struct_zq_773;
import excel.struct.Struct_zqsj_773;
import excel.struct.Struct_zqsx_773;

public class MountFunction {
	private static MountFunction ins;
	
	private MountFunction() {
		
	}
	
	public static synchronized MountFunction getIns() {
		if (ins == null) {
			ins = new MountFunction();
		}
		return ins;
	}
	
	public int getStarid(int pinZhi) {
		return pinZhi*MountConst.BASE_STAR+1;
	}
	
	public int getUpgradeLv(int pinZhi) {
		return pinZhi*MountConst.BASE_LV;
	}
	
	/**获得总速度*/
	public int getSpeed(Hero hero) {
		try {
			Struct_changshu_101 struct_changshu_101 = Config_changshu_101.getIns().get(MountConst.SPEED_CONST);
			if(struct_changshu_101 != null) {
				//基础速度
				int speed = struct_changshu_101.getNum();
				//坐骑速度
				int mountSpeed = getMountSpeed(hero);
				
				return speed+mountSpeed;
			}
		} catch (Exception e) {
			LogTool.error(e, MountFunction.class, "getSpeed has wrong");
		}
		return SceneConst.SPEED_INIT;
	}
	
	/**坐骑速度*/
	public int getMountSpeed(Hero hero) {
		try {
			Mount mount = hero.getMount();
			if(mount != null) {
				int rideid = mount.getRideId();
				if(rideid > 0) {
					Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(rideid);
					int type = struct_zq_773.getType();
					if(type == MountConst.MOUNT_BASE) {
						HashMap<Integer, MountModel> mountMap = mount.getMountModels();
						MountModel mountModel = mountMap.get(rideid);
						int starId = mountModel.getStarId();
						Struct_zqsx_773 struct_zqsx_773 = Config_zqsx_773.getIns().get(starId);
						if(struct_zqsx_773 != null) {
							return struct_zqsx_773.getYdsd();
						}
					}else {
						return struct_zq_773.getSpeed();
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MountFunction.class, "getMountSpeed has wrong");
		}
		return 0;
	}
	
	public long getMountStrenght(Hero hero,int id) {
		try {
			HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
			MountModel mountModel = hero.getMount().getMountModels().get(id);
			if (mountModel == null) {
				return 0;
			}
			//升星战力
			Struct_zqsx_773 struct_zqsx_773 = Config_zqsx_773.getIns().get(mountModel.getStarId());
			if (struct_zqsx_773 != null) {
				CommonUtil.arrChargeMap(struct_zqsx_773.getSx(), attrMap);
			}
			 
			//坐骑升级战力
			Struct_zqsj_773 struct_zqsj_773 = Config_zqsj_773.getIns().get(mountModel.getUpgradeLv());
			if(struct_zqsj_773 != null) {
				CommonUtil.arrChargeMap(struct_zqsj_773.getAttr(), attrMap);
			}
			
			//坐骑幻化战力
			Struct_horsepy_507 struct_horsepy_507 = Config_horsepy_507.getIns().get(mountModel.getUnrealId());
			if(struct_horsepy_507 != null) {
				CommonUtil.arrChargeMap(struct_horsepy_507.getAttr(), attrMap);
			}
			 
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr attr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, attr);
			FightCalcFunction.calcEquipAttr(finalAttr, attr, 0);
			return finalAttr.getStrength();
		} catch (Exception e) {
			LogTool.error(e, MountFunction.class, "getMountStrenght has wrong");
		}
		return 0;
	}
	
	/**
	 * 坐骑红点
	 * @param hero
	 * @param index
	 */
	public void mountRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT)) {
				return;
			}
			
			Mount mount = hero.getMount();
			HashMap<Integer, MountModel> mountMap = mount.getMountModels();
			List<Struct_zq_773> list = Config_zq_773.getIns().getSortList();
			boolean flag = false;
			for(Struct_zq_773 struct_zq_773 : list) {
				int type = struct_zq_773.getType();
				MountModel mountModel = mountMap.get(struct_zq_773.getId());
				if(type == MountConst.MOUNT_BASE) {
					if(flag) continue;
					int[][] consume = struct_zq_773.getActivation();
					if (UseAddUtil.canUse(hero, consume)) {
						if(mountModel != null) {
							Struct_zqsx_773 struct_zqsx_773 = Config_zqsx_773.getIns().get(mountModel.getStarId());
							int next = struct_zqsx_773.getNext();
							if(next > 0) {
								if(mountModel.getStar() < struct_zq_773.getMax()) {
									RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MOUNT, RedPointConst.RED_1, RedPointConst.HAS_RED);
									flag = true;
									//return;
								}
							}
						}else {
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MOUNT, RedPointConst.RED_1, RedPointConst.HAS_RED);
							flag = true;
							//return;
						}
					}
					//升级红点
					if(mountModel != null) {
						int upgradeLv = mountModel.getUpgradeLv();
						Struct_zqsj_773 struct_zqsj_773 = Config_zqsj_773.getIns().get(upgradeLv);
						int next = struct_zqsj_773.getNext();
						if(next > 0) {
							int[][] consume2 = struct_zqsj_773.getExp();
							if (UseAddUtil.canUse(hero, consume2)) {
								RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MOUNT, RedPointConst.RED_1, RedPointConst.HAS_RED);
								flag = true;
								//return;
							}
						}
					}
				}else {
					//幻化坐骑红点
					if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT_HH)) {
						return;
					}
					//可激活
					int[][] conditions = struct_zq_773.getActivation();//幻化条件
					boolean bool = MountFunction.getIns().condition(mount, conditions);
					if(bool) {
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MOUNT_HH, RedPointConst.RED_1, RedPointConst.HAS_RED);
						return;
					}
					//可升阶、升级
					if(mountModel != null) {
						int unrealId = mountModel.getUnrealId();
						Struct_horsepy_507 struct_horsepy_507 = Config_horsepy_507.getIns().get(unrealId);
						int next = struct_horsepy_507.getNext();
						if(next > 0) {
							boolean bool2 = MountFunction.getIns().condition(mount, struct_horsepy_507.getUp());
							if(bool2) {//可升阶
								int[][] consume = struct_horsepy_507.getConsume();
								if (UseAddUtil.canUse(hero, consume)) {//物品足够
									RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MOUNT_HH, RedPointConst.RED_1, RedPointConst.HAS_RED);
									return;
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MountFunction.class, "mountRedPoint has wrong");
		}
	}
	
	/**是否满足激活幻化坐骑或升级条件*/
	public boolean condition(Mount mount, int[][] conditions) {
		Map<Integer,Integer> map = new HashMap<Integer,Integer>();
		HashMap<Integer, MountModel> mounts = mount.getMountModels();
		if(mounts==null || mounts.size()==0) return false;
		for(MountModel mountModel : mounts.values()) {
			int mountId = mountModel.getId();
			Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
			if(struct_zq_773.getType() == MountConst.MOUNT_BASE) {
				map.put(mountId, mountModel.getStar());
			}
		}
		
		for(int i=0; i<conditions.length; i++) {
			int[] arr = conditions[i];
			int id = arr[0];
			int num = arr[1];
			
			Integer hasNum = map.get(id);
			if(hasNum == null) return false;
			if(hasNum < num) return false;
		}
		
		return true;
	}
}
