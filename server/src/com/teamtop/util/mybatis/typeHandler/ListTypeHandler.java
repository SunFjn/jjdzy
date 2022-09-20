package com.teamtop.util.mybatis.typeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

@SuppressWarnings("rawtypes")
public class ListTypeHandler implements TypeHandler<List>{
	private Logger logger = LoggerFactory.getLogger(ListTypeHandler.class);
	@Override
	public void setParameter(PreparedStatement ps, int i, List parameter, JdbcType jdbcType) throws SQLException {
		try {
			ps.setString(i, ObjStrTransUtil.toStr(parameter));
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}    
	}

	@Override
	public List getResult(ResultSet rs, String columnName) throws SQLException {
		return null;
	}

	@Override
	public List getResult(ResultSet rs, int columnIndex) throws SQLException {
		return null;
	}

	@Override
	public List getResult(CallableStatement cs, int columnIndex) throws SQLException {
		return null;
	}


}
