package com.teamtop.util.mybatis;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
/**
 * 查mysql 库建表
 * @author jjjjyyy
 *
 */
public class CreateDataSource {

	/*** @param args
	 * @throws SQLException */
	public static void main(String[] args) throws SQLException { 
		// TODO Auto-generated method stub  
		String database = "test2";  
		String mysqlDriver = "com.mysql.jdbc.Driver";
		String url = "jdbc:mysql://localhost:3306/test";
		String newUrl = "jdbc:mysql://localhost:3306/";
		String username = "root";
		String password = "root";
		Connection conn = null;
		Connection newConn = null;

		try {
			Class.forName(mysqlDriver);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} 
		String tableSql = "create table t_user (username varchar(50) not null primary key,"+ "password varchar(20) not null ); ";  
		String databaseSql = "create database " + database;
		conn = DriverManager.getConnection(url, username, password);  
		Statement smt = conn.createStatement();  
		if (conn != null) {   
			System.out.println("数据库连接成功！");
			
			  List<String> list=new ArrayList<String>();
			  //String sql="SELECT SCHEMA_NAME FROM information_schema.SCHEMATA";
			  try{
			  //Statement st=(Statement) conn.createStatement();
			  DatabaseMetaData dmd=(DatabaseMetaData) conn.getMetaData();
			  ResultSet rs=dmd.getCatalogs();
			  while(rs.next()){
				  list.add(rs.getString("TABLE_CAT"));
			  }
			  }catch(SQLException e){
				  e.printStackTrace();
			  }
			if (list.contains(database)) {
				System.out.println("数据库中存在此表！");
			}else {
				smt.executeUpdate(databaseSql);
				newConn = DriverManager.getConnection(newUrl + database,username, password);
				if (newConn != null) {     
					System.out.println("已经连接到新创建的数据库：" + database);
					Statement newSmt = newConn.createStatement();     
					int i = newSmt.executeUpdate(tableSql);//DDL语句返回值为0;    
					if (i == 0) {      
						System.out.println(tableSql + "表已经创建成功！");    
					}
				}
			}
			
			

		}
	}
}

