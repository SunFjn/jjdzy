package com.teamtop.system.crossAttackCity.model;

import java.util.List;

import com.teamtop.system.crossMine.model.CrossMine;
import com.teamtop.util.mybatis.BaseMapper;

public interface AttackCityMapper extends BaseMapper<AttackCity> {

	public List<Object> findAllData() throws Exception;

	public void insertData(CrossMine crossMine) throws Exception;

	public void truncate() throws Exception;

	public AttackCityLocal updateInfo() throws Exception;

	public Object findAttackCityLocal(long hid) throws Exception;
}
