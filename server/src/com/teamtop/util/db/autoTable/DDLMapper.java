package com.teamtop.util.db.autoTable;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface DDLMapper {
	public void createTable(String sql) throws SQLException;
	public void addColumn(AlterColumn alterTable) throws SQLException;
	public void modifyColumn(AlterColumn alterTable) throws SQLException;
	public void dropColumn(Map<String,String> map) throws SQLException;
	public void makeOneRec(Map<String,String> map) throws SQLException;
	public List<FieldStru> descTable(String tableName) throws SQLException;
	public List<KeyStru> showKeys(String tbname) throws SQLException;
	public List<TableIncrement> tbIncrement(String dbname) throws SQLException;
	public void modifyIndex(String sql) throws SQLException;
	public void dropIndex(Map<String,String> map) throws SQLException;
	public void alterIncrement(String sql) throws SQLException;
	public Object maxid(String sql) throws SQLException;
}
