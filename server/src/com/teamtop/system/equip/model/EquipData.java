package com.teamtop.system.equip.model;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class EquipData {
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private List<Equip> equipAlllist = new ArrayList<Equip>();
	/**	 * 战力	 */
	@FieldOrder(order = 3)
	private int strength;
	/**	 * 神装战力	 */
	@FieldOrder(order = 4)
	private int strengthGodEquip;
	
	
	
	public long getHid() {
		return hid;
	}
	public int getStrength() {
		return strength;
	}
	public void setStrength(int strength) {
		this.strength = strength;
	}
	public int getStrengthGodEquip() {
		return strengthGodEquip;
	}
	public void setStrengthGodEquip(int strengthGodEquip) {
		this.strengthGodEquip = strengthGodEquip;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public List<Equip> getEquipAlllist() {
		return equipAlllist;
	}
	public void setEquipAlllist(List<Equip> equipAlllist) {
		this.equipAlllist = equipAlllist;
	}
	@Override
	public String toString() {
		StringBuffer equipAllliststr=new StringBuffer();
		if (!equipAlllist.isEmpty()) {
			for (int i = 0; i < equipAlllist.size(); i++) {
				Equip equip=equipAlllist.get(i);
				equipAllliststr.append(equip.toString());
			}
			
		}
		return "EquipData [hid=" + hid + ", equipAlllist=" + equipAllliststr.toString() + "]";
	}
	
	
}
