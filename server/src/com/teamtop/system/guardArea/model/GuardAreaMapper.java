package com.teamtop.system.guardArea.model;

import java.util.List;

import com.teamtop.system.crossMine.model.CrossMine;
import com.teamtop.util.mybatis.BaseMapper;

public interface GuardAreaMapper extends BaseMapper<GuardArea> {

	public List<Object> findAllData() throws Exception;

	public void insertData(CrossMine crossMine) throws Exception;

	public void truncate() throws Exception;
}
