package com.teamtop.system.equip;

import java.util.List;
import java.util.Map;

import com.teamtop.system.equip.model.Equip;
import com.teamtop.util.mybatis.BaseMapper;

public interface EquipMapper extends BaseMapper<Equip> {
	/**
	 * 根据多个装备的唯一id查找装备数据
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> findByIds(String ids) throws Exception;
	/**
	 * 查找在身上的装备
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> findOnbodyEquip(long hid) throws Exception;
	/**
	 * 根据装备唯一id批量删除装备数据
	 * @param ids
	 * @throws Exception
	 */
	public void delMany(List<Long> ids) throws Exception;
	/**
	 * 批量insert装备
	 * @param list
	 * @throws Exception
	 */
	public void insertIntoBatch(List<Equip> list) throws Exception;
}
