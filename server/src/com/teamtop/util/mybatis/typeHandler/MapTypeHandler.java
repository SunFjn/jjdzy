package com.teamtop.util.mybatis.typeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

@SuppressWarnings("rawtypes")
public class MapTypeHandler implements TypeHandler<Map>{
	private Logger logger = LoggerFactory.getLogger(MapTypeHandler.class);

	@Override
	public void setParameter(PreparedStatement ps, int i, Map parameter, JdbcType jdbcType) throws SQLException {
		try {
			ps.setString(i, ObjStrTransUtil.toStr(parameter));
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		} 
	}

	@Override
	public Map getResult(ResultSet rs, String columnName) throws SQLException {
		return null;
	}

	@Override
	public Map getResult(ResultSet rs, int columnIndex) throws SQLException {
		return null;
	}

	@Override
	public Map getResult(CallableStatement cs, int columnIndex) throws SQLException {
		return null;
	}


}
