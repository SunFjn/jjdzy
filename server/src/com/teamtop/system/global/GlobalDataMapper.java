package com.teamtop.system.global;

import java.sql.SQLException;
import java.util.List;

import com.teamtop.util.mybatis.BaseMapper;

public interface GlobalDataMapper extends BaseMapper<GlobalData> {
	public List<GlobalData> findMany() throws SQLException;

	public GlobalData findData(String sql) throws SQLException;

	public void updateData(GlobalData data) throws SQLException;

	public void insertData(GlobalData data) throws SQLException;
}
