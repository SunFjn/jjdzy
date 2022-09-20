package com.teamtop.system.event.useAddEvent.events;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.bag.GridTempData;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.event.useAddEvent.MailInfo;
import com.teamtop.system.hero.Hero;

public class BagUseAddEvent extends AbsUseAddEvent{

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return BagFunction.getIns().getGoodsNumBySysId(hero.getId(), id)>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		int[][] data = new int[1][];
		data[0] = new int[]{id,num};
		BagFunction.getIns().takeOutGoodsBySysId(hero.getId(), data, false, reason);
		return 0;
	}
	
	@Override
	public boolean canAdd(Hero hero, int[][] data, boolean sendMail) {
		if(sendMail) return true;
		GridTempData td[] = new GridTempData[data.length];
		for(int i=0;i<data.length;i++){
			int[] d = data[i];
			td[i] = new GridTempData(d[1],d[2],0,d[0]);
		}
		boolean rs = BagFunction.getIns().checkAddGood(hero.getId(),td);
		if(!rs){
			return false;
		}
		return true;
	}
	
	@Override
	public List<long[]> add(Hero hero, int[][] data,int reason, MailInfo sendMail,boolean notice) {
		List<GridTempData> gtds = new ArrayList<GridTempData>();
		for(int i=0;i<data.length;i++){
			int[] d = data[i];
			int num = d[2];
			if(num <= 0) continue;
			if(d[0] == GameConst.EQUIP && num > 1) {
				for(int j=0;j<num;j++) {
					GridTempData td = new GridTempData(d[1],1,0,d[0]);
					//如果装备加了附加属性的话
					/*if(d.length>4){
						td.setAttrAdd(d[4]);
					}*/
					gtds.add(td);
				}
			}else{
				GridTempData td = new GridTempData(d[1],num,0,d[0]);
				//如果装备加了附加属性的话
				/*if(d.length>4){
					td.setAttrAdd(d[4]);
				}*/
				gtds.add(td);
			}
		}
		if(gtds.isEmpty()) return null;
		GridTempData[] tds = new GridTempData[gtds.size()];
		gtds.toArray(tds);
		List<long[]> retList = null;
		if(sendMail!=null){
			BagFunction.getIns().storeGoodsToBagOrSendMail(tds, hero.getId(), reason, notice, sendMail);
		}else{
			List<Long> createIdList = new ArrayList<Long>();
			BagFunction.getIns().storeGoodsToBag(tds, hero.getId(), reason, notice, true, createIdList);
			if(!createIdList.isEmpty()){
				retList = new ArrayList<long[]>();
				Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
				for(Long id : createIdList){
					Equip equip = notOnBodyEquip.get(id);
					retList.add(new long[]{id, equip.getSysId(), 1});
				}
			}
		}
		return retList;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return false;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		return 0;
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add,
			int reason) {
		/*try {
			Struct_Item_501 item = Config_Item_501.getIns().get(id);
			int zoneid = hero.getZoneid();
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if(!add){
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			if(item != null) {
				FlowToolEvent.addFlow(hero.getId(), id, num, bind, addFlag, reason, zoneid);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}*/
		
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		
	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		
	}

	@Override
	public void addEquip(Hero hero, long[][] data, int reason,
			MailInfo sendMail, boolean notice) {
		List<GridTempData> gtds = new ArrayList<GridTempData>();
		for(int i=0;i<data.length;i++){
			long[] d = data[i];
			long uid = d[0];
			int sysId = (int) d[1];
			if(uid <= 0 || sysId <= 0) continue;
			GridTempData td = new GridTempData(sysId,1,uid,GameConst.EQUIP);
			gtds.add(td);
		}
		if(gtds.isEmpty()) return;
		GridTempData[] tds = new GridTempData[gtds.size()];
		gtds.toArray(tds);
		if(sendMail!=null){
			BagFunction.getIns().storeGoodsToBagOrSendMail(tds, hero.getId(), reason, notice, sendMail);
		}else{
			List<Long> createIdList = new ArrayList<Long>();
			BagFunction.getIns().storeGoodsToBag(tds, hero.getId(), reason, notice, true, createIdList);
		}
	}

	@Override
	public boolean canUseEquip(Hero hero, List<Long> ids, int reason) {
		return BagFunction.getIns().checkUseEquip(hero.getId(), ids, reason);
	}

	@Override
	public boolean useEquip(Hero hero, List<Long> ids, boolean canDel, int reason, boolean notice) {
		// TODO Auto-generated method stub
		return BagFunction.getIns().takeOutEquipByUintid(hero.getId(), ids, canDel, reason, notice);
	}

}
