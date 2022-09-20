package com.teamtop.util.db.autoTable;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.pf.PfConst;
import com.teamtop.util.db.annotation.ColumnBigInt;
import com.teamtop.util.db.annotation.ColumnInt;
import com.teamtop.util.db.annotation.ColumnLongBlob;
import com.teamtop.util.db.annotation.ColumnMidBlob;
import com.teamtop.util.db.annotation.ColumnMidText;
import com.teamtop.util.db.annotation.ColumnText;
import com.teamtop.util.db.annotation.ColumnVar;
import com.teamtop.util.db.annotation.Index;
import com.teamtop.util.db.annotation.IndexEnum;
import com.teamtop.util.db.orm.IndexProperty;

public class DDLUtil{
	private static DDLDao ddlDao = DDLDao.getInstance();
	private static final String BL = " ";
	private static final String QU = ",";
	private static Logger logger = LoggerFactory.getLogger(DDLUtil.class);
	private static List<Integer> zoneidSet = new ArrayList<Integer>();
	static{
		zoneidSet.add(1);
	}
	/**
	 * 创建表
	 * @param tbname
	 * @param alterTableList
	 * @throws SQLException
	 * @throws RunServerException
	 */
	public static void createTable(String tbname, List<AlterColumn> alterTableList,Map<String,List<IndexProperty>> indexMap,int zoneid) throws SQLException, RunServerException {
		String sql = getCreateTableSql(tbname, alterTableList,indexMap,zoneid);
//		String sql = createTableSql[0].toString();
//		AlterColumn increCol = (AlterColumn) createTableSql[1];
//		ddlDao.createTable(sql,zoneid);
//		ddlDao.makeOneRec(tbname, alterTableList.get(0).getField(), zoneid);
//		checkIncrement(increCol, tbname,zoneid);
	}
	/**
	 * 获取见表sql
	 * @param tbname
	 * @param alterTableList
	 * @param increCol
	 * @return
	 * @throws SQLException
	 * @throws RunServerException
	 */
	public static String getCreateTableSql(String tbname, List<AlterColumn> alterTableList,Map<String,List<IndexProperty>> indexMap,int zoneid) throws SQLException, RunServerException {
		String increStr = "";
		String primaryField = "";
		if(indexMap!=null){
			List<IndexProperty> list = indexMap.get(tbname);
			boolean found = false;
			for(IndexProperty ip:list){
				String[] field = ip.getField();
				if("prikey".equals(ip.getType())){
					String priField = field[0];
					logger.info("create table,prikey:"+priField+",tbname:"+tbname);
					for (AlterColumn col:alterTableList) {
						if(col.getField().equals(priField)){
							logger.info("create table,found col,tbname:"+tbname);
							primaryField = priField;
							if(col.getType().indexOf("bigint")>=0){
								logger.info("create table,is bigint,tbname:"+tbname);
								int maxZoneid = zoneid;
								if(CrossZone.crossZoneArr.contains((Integer)zoneid)){
									break;
								}else{
									if(maxZoneid>GameConst.MAX_ZONEID){
										throw new RunServerException(null,"zoneid is "+maxZoneid+",can't run server");
									}
								}
								int makeLen = GameConst.CANNUM_MAX - (maxZoneid+"").length();
								for(int i=0;i<makeLen;i++){
									increStr += "0";
								}
								increStr += maxZoneid;
							}
							found = true;
							break;
						}
					}
					if(found) break;
				}
			}
		}
		StringBuilder sb = new StringBuilder();
		sb.append(tbname).append(BL);
		sb.append("(");
		int tsize = alterTableList.size();
		for (int k=0;k<tsize;k++) {
			AlterColumn col = alterTableList.get(k);
			String type = col.getType();
			sb.append(col.getField()).append(BL).append(type).append(BL).append(col.getIsNull()).append(BL);
			if(col.getField().equals(primaryField)){
				if(type.indexOf("int")>=0){
					sb.append(" AUTO_INCREMENT ");
				}else if("varchar".equals(type) || "text".equals(type)){
					increStr = "str";
				}
			}
			sb.append("COMMENT \'").append(col.getComment()).append("\'");
			/*IndexEnum key = col.getKey();
			if (key == null || key != IndexEnum.PRIMARY) {
				if(col.getType().indexOf("text")>=0 ||col.getType().indexOf("blob")>=0){
					sb.append(BL);
				}else{
					sb.append("DEFAULT '").append(col.getDefVal()).append("'").append(BL);
				}
			}*/
			if(k<tsize-1){
				sb.append(QU);
			}
			/*if (key != null) {
				if (key == IndexEnum.PRIMARY) {
					increCol = col;
					sb.append(BL).append("AUTO_INCREMENT").append(QU);
					sb.append("PRIMARY KEY").append(BL).append("(").append(col.getField()).append(")").append(QU);
				} else if (key == IndexEnum.NORMAL) {
					sb.append(QU).append("KEY").append(BL).append(col.getKeyName()).append(BL).append("(").append(col.getField()).append(")").append(QU);
				} else if (key == IndexEnum.UNIQUE) {
					sb.append(QU).append("UNIQUE KEY").append(BL).append(col.getKeyName()).append(BL).append("(").append(col.getField()).append(")").append(QU);
				}
			} else {
				sb.append(QU);
			}*/
		}
//		String sql = sb.substring(0, sb.length() - 1);
		if(indexMap!=null){
			sb.append(QU);
			List<IndexProperty> list = indexMap.get(tbname);
			if(list!=null){
				int size = list.size();
				for(int j=0;j<size;j++){
					IndexProperty ip = list.get(j);
					String[] field = ip.getField();
					if("prikey".equals(ip.getType())){
						sb.append("PRIMARY KEY (`").append(ip.getField()[0]).append("`)");
					}else{
						sb.append("KEY `i_");
						for(int i=0;i<field.length;i++){
							sb.append(field[i]);
							if(i<field.length-1){
								sb.append("_");
							}
						}
						sb.append("` (");
						for(int i=0;i<field.length;i++){
							sb.append("`").append(field[i]).append("`");
							if(i<field.length-1){
								sb.append(QU);
							}
						}
						sb.append(") USING BTREE");
					}
					if(j<size-1){
						sb.append(QU);
					}
				}
			}
		}
		if("str".equals(increStr)){
			sb.append(")ENGINE=InnoDB DEFAULT CHARSET=utf8");
		}else if(!"".equals(increStr)){
			sb.append(")ENGINE=InnoDB AUTO_INCREMENT=1").append(increStr).append("00000000001 DEFAULT CHARSET=utf8");
		}else{
			sb.append(")ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8");
		}
		if(GameProperties.platform.contains(PfConst.PF_vietnamese)){
			sb.append(" COLLATE=utf8_bin");
		}
		logger.info(sb.toString());
		ddlDao.createTable(sb.toString(),zoneid);
		if("hero".equals(tbname)||"mail".equals(tbname)|| "account".equals(tbname) || "hid".equals(primaryField)){
			System.err.println("make rec tbname:"+tbname+",primaryField:"+primaryField);
			ddlDao.makeOneRec(tbname, primaryField, zoneid);
		}
		return sb.toString();
	}
	/**
	 * 检查自增长
	 * @param increCol
	 * @param tbname
	 * @throws RunServerException
	 * @throws SQLException
	 */
	public static void checkIncrement(AlterColumn increCol,String tbname,int zoneid) throws RunServerException, SQLException{
		//自增长id
		if(increCol !=null && increCol.getType().indexOf("bigint")>=0){
			StringBuilder sb = new StringBuilder();
			if(zoneidSet==null) return;
			int maxZoneid = zoneid;
			if(maxZoneid>GameConst.MAX_ZONEID){
				throw new RunServerException(null,"zoneid is "+maxZoneid+",can't run server");
			}
			int makeLen = GameConst.CANNUM_MAX - (maxZoneid+"").length();
			String increStr = "";
			for(int i=0;i<makeLen;i++){
				increStr += "0";
			}
			increStr += maxZoneid;
			sb.append("alter table ").append(tbname).append(" auto_increment 1").append(increStr).append("00000000001");
			ddlDao.alterIncrement(sb.toString(),zoneid);
		}
	}


	// 处理字段
	public static void compareField(AlterColumn col, Map<String, FieldStru> fieldMap,int zoneid,List<Integer> sameZoneidList) throws Exception {
		FieldStru sqlStru = fieldMap.get(col.getField());
		if (sqlStru == null) {
			// 新增字段
			ddlDao.addColumn(col,zoneid);
			if(sameZoneidList!=null){
				//其他区同时新增字段
				for(int z:sameZoneidList){
					ddlDao.addColumn(col,z);
				}
			}
		} else {
			boolean fieldSame = sqlStru.getField().equals(col.getField());
			boolean typeSame = sqlStru.getType().equals(col.getType());
			boolean nullSame = sqlStru.getNull().equals(col.isNullCompare());
			boolean defSame = true;
			if(col.getKey()!=null && col.getKey()!=IndexEnum.PRIMARY){
				if (sqlStru.getDefault() == null) {
					if (col.getDefVal() != null) {
						defSame = false;
					}
				}
				defSame = defSame && sqlStru.getDefault().equals(col.getDefVal());
			}
			if (fieldSame && typeSame && nullSame && defSame) {

			} else {
				ddlDao.modifyColumn(col,zoneid);
				if(sameZoneidList!=null){
					//其他区同时新增字段
					for(int z:sameZoneidList){
						ddlDao.modifyColumn(col,z);
					}
				}
			}
			fieldMap.remove(col.getField());
		}
	}

	// 处理索引
	public static void compareIndex(AlterColumn col, Map<String, KeyStru> keysMap,int zoneid) throws Exception {
		IndexEnum key = col.getKey();
		if (key != null) {
			// 有key
			KeyStru keyStru = keysMap.get(col.getField());
			if (keyStru == null) {
				// 新增key
				String addKey = getAddIndex(key, col);
				addKey = col.getTbname() + " " + addKey;
				ddlDao.modifyIndex(addKey,zoneid);
			} else {
				// 对比
				if ((key == IndexEnum.NORMAL && keyStru.getNon_unique() == 0) || key == IndexEnum.UNIQUE && keyStru.getNon_unique() == 1) {
					String addKey = getAddIndex(key, col);
					addKey = col.getTbname() + " DROP INDEX " + keyStru.getKey_name() + "," + addKey;
					ddlDao.modifyIndex(addKey,zoneid);
				}
				keysMap.remove(col.getField());
			}
		}
	}
	private static String getAddIndex(IndexEnum key, AlterColumn col) {
		StringBuilder sb = new StringBuilder();
		sb.append("ADD ");
		if (key == IndexEnum.UNIQUE) {
			// 暂时不支持primary key
			sb.append("UNIQUE ");
		}
		sb.append("INDEX ");
		sb.append(col.getKeyName()).append(BL).append("(").append(col.getField()).append(")");
		return sb.toString();
	}
	public static List<AlterColumn> getAlterTableList(String resClass, String tbname) throws Exception {
		List<AlterColumn> list = new ArrayList<AlterColumn>();
		Class<?> clazz = Class.forName(resClass);
		Field[] declaredFields = clazz.getDeclaredFields();
		Class<?> superclass = clazz.getSuperclass();
		Field[] superField = superclass.getDeclaredFields();
		List<Field> fieldList = new ArrayList<Field>();
		for(Field field:superField){
			fieldList.add(field);
		}
		for(Field field:declaredFields){
			fieldList.add(field);
		}
		for (Field field : fieldList) {
			Annotation[] annotations = field.getAnnotations();
			String fieldName = null;
			String fieldType = "";
			int len = 0;
			boolean isNull = false;
			Object defVal = null;
			String comment = "";
			IndexEnum key = null;
			String keyName = null;
			for (Annotation annotation : annotations) {
				if (annotation instanceof Index) {
					Index index = (Index) annotation;
					String indexName = index.name();
					if ("".equals(indexName)) {
						keyName = "i_" + field.getName();
					} else {
						keyName = indexName;
					}
					key = index.key();
				} else {
					if (annotation instanceof ColumnBigInt) {
						// bigint
						ColumnBigInt bigint = (ColumnBigInt) annotation;
						fieldName = bigint.field();
						if ("".equals(fieldName)) {
							fieldName = field.getName();
						}
						fieldType = "bigint";
						len = bigint.len();
						defVal = bigint.defVal();
						comment = bigint.comment();
						isNull = bigint.isNull();
					} else if (annotation instanceof ColumnInt) {
						// int
						ColumnInt colInt = (ColumnInt) annotation;
						fieldName = colInt.field();
						if ("".equals(fieldName)) {
							fieldName = field.getName();
						}
						fieldType = "int";
						len = colInt.len();
						defVal = colInt.defVal();
						comment = colInt.comment();
						isNull = colInt.isNull();
					} else if (annotation instanceof ColumnVar) {
						// varchar
						ColumnVar varchar = (ColumnVar) annotation;
						fieldName = varchar.field();
						if ("".equals(fieldName)) {
							fieldName = field.getName();
						}
						fieldType = "varchar";
						len = varchar.len();
						defVal = varchar.defVal();
						comment = varchar.comment();
						isNull = varchar.isNull();
					} else if (annotation instanceof ColumnText) {
						// text
						ColumnText colText = (ColumnText) annotation;
						fieldName = colText.field();
						if ("".equals(fieldName)) {
							fieldName = field.getName();
						}
						fieldType = "text";
						comment = colText.comment();
						isNull = colText.isNull();
					} else if (annotation instanceof ColumnMidText) {
						// mid text
						ColumnMidText colText = (ColumnMidText) annotation;
						fieldName = colText.field();
						if ("".equals(fieldName)) {
							fieldName = field.getName();
						}
						fieldType = "mediumtext";
						comment = colText.comment();
						isNull = colText.isNull();
					} else if (annotation instanceof ColumnMidBlob) {
						// mid blob
						ColumnMidBlob colBlob = (ColumnMidBlob) annotation;
						fieldName = colBlob.field();
						if ("".equals(fieldName)) {
							fieldName = field.getName();
						}
						fieldType = "mediumblob";
						comment = colBlob.comment();
						isNull = colBlob.isNull();
					} else if (annotation instanceof ColumnLongBlob) {
						// long blob
						ColumnLongBlob colBlob = (ColumnLongBlob) annotation;
						fieldName = colBlob.field();
						if ("".equals(fieldName)) {
							fieldName = field.getName();
						}
						fieldType = "longblob";
						comment = colBlob.comment();
						isNull = colBlob.isNull();
					}
				}
				// System.err.println("fieldName:" + fieldName + ",fieldType:" +
				// fieldType + ",len:" + len + ",isNull:" + isNull + ",defVal:"
				// + defVal + ",comment:" + comment);
			}
			if (fieldName != null) {
				AlterColumn column = null;
				if(fieldType.indexOf("text")>=0 || fieldType.indexOf("blob")>=0){
					column = new AlterColumn(tbname, fieldName, fieldType , isNull, null, comment, key, keyName);
				}else{
					column = new AlterColumn(tbname, fieldName, fieldType + "(" + len + ")", isNull, defVal.toString(), comment, key, keyName);
				}
				list.add(column);
				// compare(fieldMap, column,key);
			}
		}
		return list;
	}

}
