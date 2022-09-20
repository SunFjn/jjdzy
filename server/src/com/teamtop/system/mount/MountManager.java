package com.teamtop.system.mount;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActLC;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActLC;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActLC;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.country.CountryFunction;
import com.teamtop.system.country.kingship.KingShipFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankLC;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankLC;
import com.teamtop.util.log.LogTool;

import excel.config.Config_horsepy_507;
import excel.config.Config_zq_773;
import excel.config.Config_zqsj_773;
import excel.config.Config_zqsx_773;
import excel.struct.Struct_horsepy_507;
import excel.struct.Struct_zq_773;
import excel.struct.Struct_zqsj_773;
import excel.struct.Struct_zqsx_773;

public class MountManager {
	
	private static MountManager ins;
	
	private MountManager() {
		
	}
	
	public static synchronized MountManager getIns() {
		if (ins == null) {
			ins = new MountManager();
		}
		return ins;
	}

	public void openMountUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT)) {
				return;
			}
			Mount mount = hero.getMount();
			
			List<Object[]> mountList = new ArrayList<Object[]>();
			HashMap<Integer, MountModel> mounts = mount.getMountModels();
			if(mounts!=null && mounts.size()>0) {
				for(MountModel mountModel : mounts.values()) {
					int mountId = mountModel.getId();
					Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
					if(struct_zq_773.getType() == MountConst.MOUNT_BASE) {
						Object[] obj = new Object[] {mountModel.getId(),mountModel.getStarId(),mountModel.getUpgradeLv()};
						mountList.add(obj);
					}
				}
			}
			
			MountSender.sendCmd_11022(hero.getId(), mount.getRideId(), mountList.toArray());
		} catch (Exception e) {
			LogTool.error(e, MountManager.class, "openMountUI has wrong");
		}
	}
//	public void openMountUI(Hero hero) {
//		try {
//			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT)) {
//				return;
//			}
//			Mount mount = hero.getMount();
//			
//			Object[] mountList = null;
//			HashMap<Integer, MountModel> mounts = mount.getMountModels();
//			if(mounts!=null && mounts.size()>0) {
//				mountList = new Object[mounts.size()];
//				int i = 0;
//				for(MountModel mountModel : mounts.values()) {
//					mountList[i] = new Object[] {mountModel.getId(),mountModel.getStarId(),mountModel.getUpgradeLv()};
//					i++;
//				}
//			}
//			
//			MountSender.sendCmd_11022(hero.getId(), mount.getRideId(), mountList);
//		} catch (Exception e) {
//			LogTool.error(e, MountManager.class, "openMountUI has wrong");
//		}
//	}

	public void ride(Hero hero, int mountId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT)) {
				return;
			}
			
			Mount mount = hero.getMount();
			if(mountId != 0) {
				Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
				if(struct_zq_773 == null) {
					MountSender.sendCmd_11024(hero.getId(), 2, mountId);
					return;
				}
				
				if(struct_zq_773.getType() == MountConst.MOUNT_UNREAL) {
					return;
				}
				
				HashMap<Integer, MountModel> mountmap = mount.getMountModels();
				MountModel mountModel = mountmap.get(mountId);
				if(mountModel == null) {
					MountSender.sendCmd_11024(hero.getId(), 2, mountId);
					return;
				}
				if(mountModel.getStar() < struct_zq_773.getTiaojian()) {
					MountSender.sendCmd_11024(hero.getId(), 3, mountId);
					return;
				}
			}
			
			
			mount.setRideId(mountId);
			hero.setMountId(mountId);
			hero.getShowModel().setRideModel(mountId);
			
			CountryFunction.getIns().refreshCountryStrengthMap(hero, 0);
			KingShipFunction.getIns().refreshKingShipModelMap(hero, 0);
			KingShipFunction.getIns().updatekingShiplGuardName(hero);
			CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 3);
			CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 3);
			CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, 0, 2);
			RankingFunction.getIns().refreshAll(hero);
			
			MountSender.sendCmd_11024(hero.getId(), 1, mountId);
		} catch (Exception e) {
			LogTool.error(e, MountManager.class, "ride has wrong");
		}
	}

	public void upStar(Hero hero, int mountId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT)) {
				return;
			}
			
			Mount mount = hero.getMount();
			Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
			if(struct_zq_773 == null) {
				MountSender.sendCmd_11026(hero.getId(), 4, mountId, 0);
				return;
			}
			
			if(struct_zq_773.getType() == MountConst.MOUNT_UNREAL) {
				return;
			}
			
			int[][] consume = struct_zq_773.getActivation();
			if (!UseAddUtil.canUse(hero, consume)) {
				MountSender.sendCmd_11026(hero.getId(), 2, mountId, 0);
				return;
			}
			
			HashMap<Integer, MountModel> mountmap = mount.getMountModels();
			MountModel mountModel = mountmap.get(mountId);
			int next = 0;
			if(mountModel == null) {
				mountModel = new MountModel();
				mountModel.setId(mountId);
				int pinZhi = struct_zq_773.getQuality();
				mountModel.setPinZhi(pinZhi);
				int upgradeLv = MountFunction.getIns().getUpgradeLv(pinZhi);
				mountModel.setUpgradeLv(upgradeLv);
				mountmap.put(mountId, mountModel);
				next = MountFunction.getIns().getStarid(struct_zq_773.getQuality());
				
				if(pinZhi >= 5) {
					ChatManager.getIns().broadCast(ChatConst.MOUNT,new Object[] {hero.getNameZoneid(),mountId});
				}
			}else {
				if(mountModel.getStar() >= struct_zq_773.getMax()) {
					MountSender.sendCmd_11026(hero.getId(), 5, mountId, 0);
					return;
				}
				
				Struct_zqsx_773 struct_zqsx_773 = Config_zqsx_773.getIns().get(mountModel.getStarId());
				next = struct_zqsx_773.getNext();
				if(next <= 0) {
					MountSender.sendCmd_11026(hero.getId(), 3, mountId, 0);
					return;
				}
			}
			
			UseAddUtil.use(hero, consume, SourceGoodConst.MOUNT_STAR_COST, true);
			mountModel.setStarId(next);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MOUNT_STAR,SystemIdConst.MOUNT);
			
			MountSender.sendCmd_11026(hero.getId(), 1, mountId, next);
		} catch (Exception e) {
			LogTool.error(e, MountManager.class, "upStar has wrong");
		}
	}

	public void upMountLv(Hero hero, int mountId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT)) {
				return;
			}
			
			Mount mount = hero.getMount();
			Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
			if(struct_zq_773 == null) {
				MountSender.sendCmd_11028(hero.getId(), 2, mountId, 0);
				return;
			}
			
			if(struct_zq_773.getType() == MountConst.MOUNT_UNREAL) {
				return;
			}
			
			HashMap<Integer, MountModel> mountmap = mount.getMountModels();
			MountModel mountModel = mountmap.get(mountId);
			if(mountModel == null) {
				MountSender.sendCmd_11028(hero.getId(), 2, mountId, 0);
				return;
			}
			
			int upgradeLv = mountModel.getUpgradeLv();
			Struct_zqsj_773 struct_zqsj_773 = Config_zqsj_773.getIns().get(upgradeLv);
			int next = struct_zqsj_773.getNext();
			if(next <= 0) {
				MountSender.sendCmd_11028(hero.getId(), 4, mountId, 0);
				return;
			}
			
			int[][] consume = struct_zqsj_773.getExp();
			if (!UseAddUtil.canUse(hero, consume)) {
				MountSender.sendCmd_11028(hero.getId(), 3, mountId, 0);
				return;
			}
			
			UseAddUtil.use(hero, consume, SourceGoodConst.MOUNT_LEVEL_COST, true);
			mountModel.setUpgradeLv(next);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MOUNT_UP_LEVEL,SystemIdConst.MOUNT);
			
			MountSender.sendCmd_11028(hero.getId(), 1, mountId, next);
		} catch (Exception e) {
			LogTool.error(e, MountManager.class, "upMountLv has wrong");
		}
	}

	public void openMountUnrealUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT_HH)) {
				return;
			}
			Mount mount = hero.getMount();
			
			List<Object[]> mountList = new ArrayList<Object[]>();
			HashMap<Integer, MountModel> mounts = mount.getMountModels();
			if(mounts!=null && mounts.size()>0) {
				for(MountModel mountModel : mounts.values()) {
					int mountId = mountModel.getId();
					Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
					if(struct_zq_773.getType() == MountConst.MOUNT_UNREAL) {
						Object[] obj = new Object[] {mountModel.getId(),mountModel.getUnrealId()};
						mountList.add(obj);
					}
				}
			}
			
			MountSender.sendCmd_11030(hero.getId(), mount.getRideId(), mountList.toArray());
		} catch (Exception e) {
			LogTool.error(e, MountManager.class, "openMountUnrealUI has wrong");
		}
	}

	public void rideUnreal(Hero hero, int mountId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT_HH)) {
				return;
			}
			
			Mount mount = hero.getMount();
			if(mountId != 0) {
				Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
				if(struct_zq_773 == null) {
					MountSender.sendCmd_11032(hero.getId(), 2, mountId);
					return;
				}
				
				if(struct_zq_773.getType() == MountConst.MOUNT_BASE) {
					return;
				}
				
				HashMap<Integer, MountModel> mountmap = mount.getMountModels();
				MountModel mountModel = mountmap.get(mountId);
				if(mountModel == null) {
					MountSender.sendCmd_11032(hero.getId(), 2, mountId);
					return;
				}
				if(mountModel.getUnrealId() < struct_zq_773.getTiaojian()) {
					MountSender.sendCmd_11032(hero.getId(), 3, mountId);
					return;
				}
			}
			
			
			mount.setRideId(mountId);
			hero.setMountId(mountId);
			hero.getShowModel().setRideModel(mountId);
			
			CountryFunction.getIns().refreshCountryStrengthMap(hero, 0);
			KingShipFunction.getIns().refreshKingShipModelMap(hero, 0);
			KingShipFunction.getIns().updatekingShiplGuardName(hero);
			CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 3);
			CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 3);
			CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, 0, 2);
			RankingFunction.getIns().refreshAll(hero);
			
			MountSender.sendCmd_11032(hero.getId(), 1, mountId);
		} catch (Exception e) {
			LogTool.error(e, MountManager.class, "rideUnreal has wrong");
		}
	}

	public void activation(Hero hero, int mountId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT_HH)) {
				return;
			}
			
			Mount mount = hero.getMount();
			Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
			if(struct_zq_773 == null) {
				MountSender.sendCmd_11034(hero.getId(), 3, mountId, 0);
				return;
			}
			
			if(struct_zq_773.getType() == MountConst.MOUNT_BASE) {
				return;
			}
			
			int[][] conditions = struct_zq_773.getActivation();//幻化条件
			boolean bool = MountFunction.getIns().condition(mount, conditions);
			if(!bool) {
				MountSender.sendCmd_11034(hero.getId(), 2, mountId, 0);
				return;//激活条件不足
			}
			
			HashMap<Integer, MountModel> mountmap = mount.getMountModels();
			MountModel mountModel = mountmap.get(mountId);
			if(mountModel != null) {
				return;
			}
			
			int pinZhi = struct_zq_773.getQuality();
			int id = struct_zq_773.getId();
			
			mountModel = new MountModel();
			mountModel.setId(mountId);
			mountModel.setPinZhi(pinZhi);
			mountModel.setUnrealId(id*MountConst.BASE_UNREAL);
			mountmap.put(mountId, mountModel);
			
			ChatManager.getIns().broadCast(ChatConst.MOUNT_UNREAL,new Object[] {hero.getNameZoneid(),mountId});
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MOUNT_UNREAL,SystemIdConst.MOUNT);
			
			MountSender.sendCmd_11034(hero.getId(), 1, mountId, mountModel.getUnrealId());
		} catch (Exception e) {
			LogTool.error(e, MountManager.class, "activation has wrong");
		}
	}

	public void upMountUnrealLv(Hero hero, int mountId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MOUNT_HH)) {
				return;
			}
			
			Mount mount = hero.getMount();
			Struct_zq_773 struct_zq_773 = Config_zq_773.getIns().get(mountId);
			if(struct_zq_773 == null) {
				MountSender.sendCmd_11036(hero.getId(), 2, mountId, 0);
				return;
			}
			
			if(struct_zq_773.getType() == MountConst.MOUNT_BASE) {
				return;
			}
			
			HashMap<Integer, MountModel> mountmap = mount.getMountModels();
			MountModel mountModel = mountmap.get(mountId);
			if(mountModel == null) {
				MountSender.sendCmd_11036(hero.getId(), 2, mountId, 0);
				return;
			}
			
			
			
			int unrealId = mountModel.getUnrealId();
			Struct_horsepy_507 struct_horsepy_507 = Config_horsepy_507.getIns().get(unrealId);
			int next = struct_horsepy_507.getNext();
			if(next <= 0) {
				MountSender.sendCmd_11036(hero.getId(), 4, mountId, 0);
				return;
			}
			
			int[][] conditions = struct_horsepy_507.getUp();
			boolean bool = MountFunction.getIns().condition(mount, conditions);
			if(!bool) {
				MountSender.sendCmd_11036(hero.getId(), 5, mountId, 0);
				return;//升阶条件不足
			}
			
			int[][] consume = struct_horsepy_507.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				MountSender.sendCmd_11036(hero.getId(), 3, mountId, 0);
				return;
			}
			
			UseAddUtil.use(hero, consume, SourceGoodConst.MOUNT_LEVEL_COST, true);
			mountModel.setUnrealId(next);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MOUNT_UP_LEVEL,SystemIdConst.MOUNT);//MOUNTUNREAL_UP_LEVEL
			
			MountSender.sendCmd_11036(hero.getId(), 1, mountId, next);
		} catch (Exception e) {
			LogTool.error(e, MountManager.class, "upMountUnrealLv has wrong");
		}
	}

}
