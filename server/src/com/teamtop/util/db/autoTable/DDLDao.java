package com.teamtop.util.db.autoTable;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.util.mybatis.MybatisUtil;

public class DDLDao{
	private static DDLDao ins;
	public static DDLDao getInstance(){
		if(ins==null){
			ins = new DDLDao();
		}
		return ins;
	}
	public void createTable(String sql,int zoneid) throws SQLException {
//		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				DDLMapper mapper = session.getMapper(DDLMapper.class);
				mapper.createTable(sql);
				session.commit();
			}finally{
				session.close();
			}
//		}
		
	}
	public void addColumn(AlterColumn alterTable,int zoneid) throws SQLException {
//		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				DDLMapper mapper = session.getMapper(DDLMapper.class);
				mapper.addColumn(alterTable);
				session.commit();
			}finally{
				session.close();
			}
//		}
		
	}
	public void modifyColumn(AlterColumn alterTable,int zoneid) throws SQLException {
//		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				DDLMapper mapper = session.getMapper(DDLMapper.class);
				mapper.modifyColumn(alterTable);
				session.commit();
			}finally{
				session.close();
			}
//		}
		
	}
	/**
	 * 插入一条默认记录
	 * @param tbname
	 * @param prikey
	 * @param zoneid
	 * @throws SQLException
	 */
	public void makeOneRec(String tbname, String prikey,int zoneid) throws SQLException {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			DDLMapper mapper = session.getMapper(DDLMapper.class);
			Map<String, String> map = new HashMap<String, String>();
			map.put("tbname", tbname);
			map.put("prikey", prikey);
			mapper.makeOneRec(map);
			session.commit();
		}finally{
			session.close();
		}
	}
	public void dropColumn(String tbname, String fieldName,int zoneid) throws SQLException {
//		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				DDLMapper mapper = session.getMapper(DDLMapper.class);
				Map<String, String> map = new HashMap<String, String>();
				map.put("tbname", tbname);
				map.put("fieldName", fieldName);
				mapper.dropColumn(map);
				session.commit();
			}finally{
				session.close();
			}
//		}
		
	}
	public List<FieldStru> descTable(String tableName,int zoneid) {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<FieldStru> list = null;
		try {
			DDLMapper mapper = session.getMapper(DDLMapper.class);
			list = mapper.descTable(tableName);
		}catch(Exception e){
			//报错不抛出
		}finally{
			session.close();
		}
		return list;
	}
	public Map<String,Long> tbIncrement(String dbName,int zoneid) throws SQLException {
		SqlSession session = MybatisUtil.getSession(zoneid);
		Map<String, Long> map = new HashMap<String, Long>();
		try {
			DDLMapper mapper = session.getMapper(DDLMapper.class);
			List<TableIncrement> list =  mapper.tbIncrement(dbName);
			if(list!=null){
				for(TableIncrement in:list){
					map.put(in.getTbname().toLowerCase(), in.getIncrement());
				}
			}
		}finally{
			session.close();
		}
		return map;
	}
	public List<KeyStru> showKeys(String tbname,int zoneid) throws SQLException {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<KeyStru> list = null;
		try {
			DDLMapper mapper = session.getMapper(DDLMapper.class);
			list = mapper.showKeys(tbname);
		}finally{
			session.close();
		}
		return list;
	}
	public void modifyIndex(String sql,int zoneid) throws SQLException {
//		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				DDLMapper mapper = session.getMapper(DDLMapper.class);
				mapper.modifyIndex(sql);
				session.commit();
			}finally{
				session.close();
			}
//		}
		
	}
	public void dropIndex(String tbname, String keyname,int zoneid) throws SQLException {
//		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				DDLMapper mapper = session.getMapper(DDLMapper.class);
				Map<String, String> map = new HashMap<String, String>();
				map.put("tbname", tbname);
				map.put("keyname", keyname);
				mapper.dropIndex(map);
				session.commit();
			}finally{
				session.close();
			}
//		}
		
	}
	public void alterIncrement(String sql,int zoneid) throws SQLException {
//		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				DDLMapper mapper = session.getMapper(DDLMapper.class);
				mapper.alterIncrement(sql);
				session.commit();
			}finally{
				session.close();
			}
//		}
		
	}
	public Object maxid(String sql,int zoneid) throws SQLException {
//		for(int zoneid:GameProperties.zoneids){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				DDLMapper mapper = session.getMapper(DDLMapper.class);
				return mapper.maxid(sql);
			}finally{
				session.close();
			}
//		}
	}
}
