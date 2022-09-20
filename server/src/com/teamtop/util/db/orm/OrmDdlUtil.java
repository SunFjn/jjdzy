package com.teamtop.util.db.orm;

import java.io.File;
import java.lang.reflect.Field;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.common.CollectionUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.annotation.IndexEnum;
import com.teamtop.util.db.autoTable.AlterColumn;
import com.teamtop.util.db.autoTable.DDLDao;
import com.teamtop.util.db.autoTable.DDLUtil;
import com.teamtop.util.db.autoTable.FieldStru;
import com.teamtop.util.db.autoTable.KeyStru;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DataBaseProp;
import com.teamtop.util.mybatis.MybatisUtil;

public class OrmDdlUtil {
	private static Logger logger = LoggerFactory.getLogger(OrmDdlUtil.class);
	private static final String INT = "int";//对应的int类型
	private static final String BIGINT = "bigint";//对应的long类型
	private static final String VARCHAR = "varchar";//varchar类型
	private static final String MIDBLOB = "mediumblob";//midblob类型
	private static final String LONGBLOB = "longblob";// longblob类型
	private static final String TEXT = "text";//text类型
	private static final String TRUE = "true";
	private static final String FALSE = "false";
	private static final String PRIKEY = "prikey";//主键
	private static final String UNIQUE = "unique";//唯一索引
	private static final String NORMAL = "normal";//普通索引
	private static final String PF_ALL = "all";//所有平台
	private static final String PF_TX = "tx";//腾讯平台
	private static final String PF_360 = "360";//360开放平台
	private static List<String> pfList = new ArrayList<String>();
	static{
		pfList.add(PF_ALL);
		pfList.add(PF_TX);
		pfList.add(PF_360);
	}
	
	public static void init() throws RunServerException {
		Map<String,List<AlterColumn>> fieldMap = new HashMap<String, List<AlterColumn>>();
		Map<String,List<IndexProperty>> indexMap = new HashMap<String, List<IndexProperty>>();
		Map<String,PriColumn> prikeyMap = new HashMap<String, PriColumn>();
		List<String> tbnameList = new ArrayList<String>();
		File dir = new File(GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"orm");
		checkProperties(dir,tbnameList,fieldMap,indexMap,prikeyMap);
		List<FieldStru> globaldataDesc = DDLDao.getInstance().descTable("globaldata", GameProperties.getFirstZoneId());
		if(globaldataDesc!=null){
			boolean sameZoneProperties = true;
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ZONEID);
			String content = globalData.getContent();
			String properties = PropertiesTools.getProperties("zoneid");
			if(content != null && !"".equals(content)) {
				if(!properties.equals(content)){
					//与上一次区号不同
					sameZoneProperties = false;
				}
			}else{
				//与上一次区号不同
				sameZoneProperties = false;
			}
			for(int zoneid:GameProperties.zoneids){
				checkField(fieldMap,prikeyMap,indexMap,zoneid,null);
				checkIndex(indexMap,zoneid,null);
			}
			globalData.setContent(properties);
			/*if(sameZoneProperties){
				List<Integer> sameZoneidList = new ArrayList<Integer>();
				sameZoneidList.addAll(GameProperties.zoneids);
				sameZoneidList.remove(0);
				checkField(fieldMap,prikeyMap,indexMap,GameProperties.getFirstZoneId(),sameZoneidList);
				checkIndex(indexMap,GameProperties.getFirstZoneId(),sameZoneidList);
			}else{
				for(int zoneid:GameProperties.zoneids){
					checkField(fieldMap,prikeyMap,indexMap,zoneid,null);
					checkIndex(indexMap,zoneid,null);
				}
				globalData.setContent(properties);
			}*/
		}else{
			for(int zoneid:GameProperties.zoneids){
				checkField(fieldMap,prikeyMap,indexMap,zoneid,null);
				checkIndex(indexMap,zoneid,null);
			}
		}
		for(int zoneid:GameProperties.zoneids){
			checkIncrement(prikeyMap,zoneid);
		}
	}
	private static void checkProperties(File file,List<String> tbnameList,Map<String,List<AlterColumn>> fieldMap,Map<String,List<IndexProperty>> indexMap,Map<String,PriColumn> prikeyMap) throws RunServerException{
		try {
			if(file.isDirectory()){
				/*boolean go = false;
				String name = file.getName();
				if("orm".equals(name)){
					go = true;
				}else{
					if(GameProperties.serverId==GameConst.SERVER_ID_LOCAL || GameProperties.serverId==GameConst.SERVER_ID_TEST){
						//子服
						if(!"cross".equals(name)){
							go = true;
						}
					}else{
						//中央服
						if("cross".equals(name)){
							go = true;
						}
					}
				}
				if(go){
					File[] listFiles = file.listFiles();
					for(File lf:listFiles){
						if(file.getName().indexOf(".xml")<0)
						checkProperties(lf,tbnameList,fieldMap, indexMap, prikeyMap);
					}
				}*/
				
				File[] listFiles = file.listFiles();
				for(File lf:listFiles){
					if(file.getName().indexOf(".xml")<0)
					checkProperties(lf,tbnameList,fieldMap, indexMap, prikeyMap);
				}
			}else{
				SAXReader saxReader = new SAXReader();
				Document doc = saxReader.read(file);
				Element root = doc.getRootElement();
				String tbname = null;
				String serverid = null;
				List<AlterColumn> acList = new ArrayList<AlterColumn>();
				List<IndexProperty> indexList = new ArrayList<IndexProperty>();
				for (Iterator<?> it = root.elementIterator("tb"); it.hasNext();) {
					Element tb = (Element) it.next();
					String model = tb.attributeValue("model");
					tbname = tb.attributeValue("tbname");
					serverid = tb.attributeValue("serverid");
					if(CommonUtil.isNull(tbname) || CommonUtil.isNull(model)){
						throw new RunServerException(null, "tbname or model is null,tbname:"+tbname+",model:"+model);
					}
					//用于自动生成sql语句
					final List<FieldOrm> fieldList = new ArrayList<FieldOrm>();
					final List<Field> primaryList = new ArrayList<Field>();
					Map<String, Field> clazzFieldMap = new HashMap<String, Field>();
					Class<?> clazz = Class.forName(model);
//					System.err.println("model:"+model+",tbname:"+tbname);
					String priField = null;
					String autoIncrement = null;
					//索引
					for (Iterator<?> indexIt = tb.elementIterator("index"); indexIt.hasNext();) {
						Element index = (Element) indexIt.next();
						String field = index.attributeValue("field");
						String type = index.attributeValue("type");
						String source = index.attributeValue("source");
						String[] indexArr = field.split(",");
						IndexProperty indexProperty = new IndexProperty(indexArr,type);
						if(checkServer(serverid)){
							indexList.add(indexProperty);
						}
						/*if(uninIndex.length>1){
						//联合索引
						
					}*/
						if(PRIKEY.equals(type)){
							priField = field;
							Field pf = null;
							if("super".equals(source)){
								pf = clazz.getSuperclass().getDeclaredField(field);
							}else{
								pf = clazz.getDeclaredField(field);
							}
							primaryList.add(pf);
							autoIncrement = index.attributeValue("autoIncrement");
						}else if(NORMAL.equals(type) || UNIQUE.equals(type)){
							
						}else{
							throw new RunServerException(null, "tb index invalid,tbname:"+tbname+",index field:"+field+",type:"+type);
						}
//						System.err.println("index:"+field+",type:"+type);
					}
					//规定要有主键
					if(priField==null){
						throw new RunServerException(null, "tb not found prikey:"+tbname);
					}
					List<String> colList = new ArrayList<String>();
					Map<String, Integer> lenMap = null;//字段为字符串的长度记录
					//字段
					for (Iterator<?> colIt = tb.elementIterator("col"); colIt.hasNext();) {
						Element col = (Element) colIt.next();
						String field = col.attributeValue("field");
						String type = col.attributeValue("type");
						String len = col.attributeValue("len");
						String isnull = col.attributeValue("isnull");
						String pf = col.attributeValue("pf");
						String comment = col.attributeValue("comment");
						String source = col.attributeValue("source");
						String diyStr = col.attributeValue("diy");
						boolean diy = CommonUtil.isNull(diyStr)?false:true;
						String defVal = "";
						if(CommonUtil.isNull(field)|| CommonUtil.isNull(type)|| CommonUtil.isNull(pf) || CommonUtil.isNull(comment)){
							throw new RunServerException(null, "tb col need basic properties,tb:"+tbname+",col:"+field+",type:"+type+",pf:"+pf+",comment:"+comment);
						}
						//检查是否字段类型写错
						int ormUtilType = 0;
						if(INT.equals(type) || BIGINT.equals(type)){
							//int bigint 不需要定义len和isnull
							if(CommonUtil.isNull(len)){
								if(INT.equals(type)){
									len = "10";
								}else if(BIGINT.equals(type)){
									len = "20";
								}
								ormUtilType = OrmSqlUtil.TYPE_ZHENGXING;
							}
							defVal = "0";
						}else if(VARCHAR.equals(type) || TEXT.equals(type)){
							//检查是否有定义长度
							if(VARCHAR.equals(type)){
								if(CommonUtil.isNull(len)){
									throw new RunServerException(null, "tb col need define len,tb:"+tbname+",col:"+field);
								}else{
									if(lenMap == null) lenMap = new HashMap<String, Integer>();
									lenMap.put(field, Integer.parseInt(len));
								}
							} else if (TEXT.equals(type) || MIDBLOB.equals(type) || LONGBLOB.equals(type)) {
								if(lenMap == null) lenMap = new HashMap<String, Integer>();
								lenMap.put(field, 65535);
							}
							ormUtilType = OrmSqlUtil.TYPE_STR;
						}else if(MIDBLOB.equals(type)){
							ormUtilType = OrmSqlUtil.TYPE_STR;
						} else if (LONGBLOB.equals(type)) {
							ormUtilType = OrmSqlUtil.TYPE_STR;
						}else{
							throw new RunServerException(null, "tb col type invalid,tb:"+tbname+",col:"+field+",type:"+type);
						}
						if(!pfList.contains(pf)){
							throw new RunServerException(null, "tb col pf invalid,tb:"+tbname+",col:"+field+",pf:"+pf);
						}
						if(isnull!=null){
							if(TRUE.equals(isnull) || FALSE.equals(isnull)){
							}else{
								throw new RunServerException(null, "tb col isnull invalid,tb:"+tbname+",col:"+field+",isnull:"+isnull);
							}
						}
//						System.err.println("col:"+field+",type:"+type+",len:"+len+",isnull:"+isnull+",pf:"+pf+",comment:"+comment);
						//检查是否字段重复
						if(!colList.contains(field)){
							colList.add(field);
						}else{
							throw new RunServerException(null, "tb col found same field,tb:"+tbname+",col:"+field);
						}
						boolean isnullBol = CommonUtil.isNull(isnull)?true:TRUE.equals(isnull)?true:false;
						String mt = null;
						if (TEXT.equals(type) || MIDBLOB.equals(type) || LONGBLOB.equals(type)) {
							mt = type;
						}else{
							mt = type+"("+len+")";
						}
						AlterColumn alterColumn = new AlterColumn(tbname, field, mt, isnullBol, defVal, comment, null, null);
						if(priField.equals(field)){
							PriColumn priColumn = new PriColumn(tbname, field, type+"("+len+")", isnullBol, defVal, comment, null, null,null,FALSE.equals(autoIncrement)?false:true);
							prikeyMap.put(tbname, priColumn);
							alterColumn.setNull(false);
						}
						if(checkServer(serverid)){
							acList.add(alterColumn);
						}
						//用于自动生成sql语句
						Field declaredField = null;
						try {
							if("super".equals(source)){
								declaredField = clazz.getSuperclass().getDeclaredField(field);
							}else{
								declaredField = clazz.getDeclaredField(field);
							}
						} catch (Exception e) {
							throw new RunServerException(e, "not such field:"+tbname);
						}
						if(!diy){
							fieldList.add(new FieldOrm(declaredField, isnullBol, ormUtilType));
							clazzFieldMap.put(declaredField.getName(), declaredField);
						}else{
						}
					}
					FieldOrm[] fields = new FieldOrm[fieldList.size()];
					fieldList.toArray(fields);
					FieldXml fieldXml = new FieldXml(primaryList.get(0), fields,tbname);
					OrmSqlUtil.fieldXmlMap.put(clazz, fieldXml);
					OrmSqlUtil.fieldAutoTransObjMap.put(clazz, clazzFieldMap);
					if(lenMap!=null){
						AutoObjTableUtil.fieldLenMap.put(clazz, lenMap);
					}
				}
				if(checkServer(serverid)){
					//检查是否表明重复
					if(!tbnameList.contains(tbname)){
						tbnameList.add(tbname);
					}else{
						throw new RunServerException(null, "tbname found same tbname:"+tbname);
					}
					fieldMap.put(tbname, acList);
					indexMap.put(tbname, indexList);
				}
				
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
			throw new RunServerException(e, "ORMUtil.checkProperties");
		}
		
	}
	
	/**
	 * 建表时判断当前服务器是否需要建表
	 * @param serverid 服务器id
	 * @return true为是，false为否
	 */
	private static boolean checkServer(String serverid){
		boolean flag = true;
		if(serverid != null && !"all".equals(serverid)){
			int id = Integer.parseInt(serverid);
			if(GameProperties.serverId != id){
				flag = false;
			}
		}else if(serverid == null){
			if(GameProperties.serverId != GameConst.SERVER_ID_LOCAL){
				flag = false;
			}
		}
		return flag;
	}
	
	private static void checkField(Map<String,List<AlterColumn>> fieldMap,Map<String,PriColumn> prikeyMap,Map<String,List<IndexProperty>> indexMap,int zoneid,List<Integer> sameZoneidList) throws RunServerException {
		try {
			Iterator<Entry<String, List<AlterColumn>>> resIt = fieldMap.entrySet().iterator();
			DDLDao ddlDao = DDLDao.getInstance();
			while (resIt.hasNext()) {
				Entry<String, List<AlterColumn>> entry = resIt.next();
				String tbname = entry.getKey();
				List<AlterColumn> alterTableList = entry.getValue();
				List<FieldStru> descTable = ddlDao.descTable(tbname,zoneid);
				/*if(sameZoneidList!=null){
					//其他区单独检测是否要建立新表
					for(int z:sameZoneidList){
						List<FieldStru> descTable2 = ddlDao.descTable(tbname,z);
						if (descTable2 == null) {
							//其他区不存在 同时建表 
							DDLUtil.createTable(tbname, alterTableList,indexMap,z);
						}
						
					}
				}*/
				if (descTable == null) {
					// 新表
					DDLUtil.createTable(tbname, alterTableList,indexMap,zoneid);
					if(sameZoneidList!=null){
						//其他区同时建表
						for(int z:sameZoneidList){
							DDLUtil.createTable(tbname, alterTableList,indexMap,z);
						}
					}
				} else {
					PriColumn priColumn = prikeyMap.get(tbname);
					String field = priColumn.getField();
					Map<String, FieldStru> map = new HashMap<String, FieldStru>();
					for (FieldStru sqlStru : descTable) {
						if(sqlStru.getField().equals(field) && "PRI".equals(sqlStru.getKey())){
							//主键设Extra = auto_increment
							priColumn.setExtra(sqlStru.getExtra());
						}
						map.put(sqlStru.getField(), sqlStru);
						// System.err.println(sqlStru);
					}
					// 表字段和类字段对比
					for (AlterColumn alterColumn : alterTableList) {
						DDLUtil.compareField(alterColumn, map,zoneid,sameZoneidList);
					}
					if (map.size() > 0) {
						// 删除字段
						Iterator<Entry<String, FieldStru>> fieldIt = map.entrySet().iterator();
						while (fieldIt.hasNext()) {
							Entry<String, FieldStru> fieldEntry = fieldIt.next();
							String key = fieldEntry.getKey();
							ddlDao.dropColumn(tbname, key,zoneid);
							if(sameZoneidList!=null){
								//其他区同时删除字段
								for(int z:sameZoneidList){
									ddlDao.dropColumn(tbname, key,z);
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e,"");
		}
	}
	
	private static void checkIndex(Map<String,List<IndexProperty>> indexMap,int zoneid,List<Integer> sameZoneidList) throws RunServerException{
		try {
			DDLDao ddlDao = DDLDao.getInstance();
			Iterator<Entry<String, List<IndexProperty>>> it = indexMap.entrySet().iterator();
			while(it.hasNext()){
				Entry<String, List<IndexProperty>> next = it.next();
				String tbname = next.getKey();
				List<IndexProperty> indexList = next.getValue();
				List<KeyStru> showKeys = ddlDao.showKeys(tbname,zoneid);
				//处理联合索引，分开两个map临时保存数据做对比更加方便
				//以colName为key
				Map<String,List<KeyStru>> colNameMap = new HashMap<String,List<KeyStru>>();
				//以keyName为key
				Map<String,List<KeyStru>> keyNameMap = new HashMap<String,List<KeyStru>>();
				Map<String,KeyStru> colKeyMap = new HashMap<String,KeyStru>();
				for(KeyStru ks:showKeys){
					String column_name = ks.getColumn_name();
					String key_name = ks.getKey_name();
					List<KeyStru> colList = colNameMap.get(column_name);
					if(colList==null){
						colList = new ArrayList<KeyStru>();
						colNameMap.put(column_name, colList);
					}
					List<KeyStru> keyList = keyNameMap.get(key_name);
					if(keyList==null){
						keyList = new ArrayList<KeyStru>();
						keyNameMap.put(key_name, keyList);
					}
					colList.add(ks);
					keyList.add(ks);
				}
				
				Iterator<Entry<String, List<KeyStru>>> colIt = colNameMap.entrySet().iterator();
				while(colIt.hasNext()){
					Entry<String, List<KeyStru>> colNext = colIt.next();
					String key = colNext.getKey();
					List<KeyStru> value = colNext.getValue();
					if(value.size()>0){
//						if(value.size()==1){
//							colKeyMap.put(key, value.get(0));
//						}else{
							//union index
							for(KeyStru ks:value){
								List<KeyStru> list = keyNameMap.get(ks.getKey_name());
								if(list.size()==1){
									colKeyMap.put(key, list.get(0));
								}else{
									StringBuilder sb = new StringBuilder();
									int i=0;
									for(KeyStru ks2:list){
										if(i>0){
											sb.append(",");
										}
										String column_name = ks2.getColumn_name();
										sb.append(column_name);
										i++;
										if(key.equals(column_name)){
											
										}else{
											List<KeyStru> list2 = colNameMap.get(column_name);
											Iterator<KeyStru> it2 = list2.iterator();
											while(it2.hasNext()){
												KeyStru ks3 = it2.next();
												if(ks.getKey_name().equals(ks3.getKey_name())){
													it2.remove();
												}
											}
										}
									}
									ks.setColumn_name(sb.toString());
									colKeyMap.put(sb.toString(), ks);
								}
							}
//						}
					}
				}
				for(IndexProperty indexPro:indexList){
					String[] fieldArr = indexPro.getField();
					String type = indexPro.getType();
					KeyStru keyStru = null;
					String keyName = null;
					String fieldName = null;
					if(fieldArr.length==1){
						keyStru = colKeyMap.get(fieldArr[0]);
						keyName = fieldName = fieldArr[0];
					}else{
						String[] unionIndexStrKey = getUnionIndexStrKey(fieldArr);
						for(String str:unionIndexStrKey){
							keyStru = colKeyMap.get(str);
							if(keyStru!=null){
								break;
							}
						}
						fieldName = unionIndexStrKey[0];
						keyName = fieldName.replaceAll("\\,", "\\_");
					}
					if (keyStru == null) {
						// 新增key
						String addKey = getAddIndex(type, keyName,fieldName);
						addKey = tbname + " " + addKey;
						ddlDao.modifyIndex(addKey,zoneid);
						if(sameZoneidList!=null){
							//其他区同时 新增key
							for(int z:sameZoneidList){
								ddlDao.modifyIndex(addKey,z);
							}
						}
					} else {
						// 对比
						if ((NORMAL.equals(type) && keyStru.getNon_unique() == 0) || UNIQUE.equals(type) && keyStru.getNon_unique() == 1) {
							String addKey = getAddIndex(type, keyName,fieldName);
							addKey = tbname + " DROP INDEX " + keyStru.getKey_name() + "," + addKey;
							ddlDao.modifyIndex(addKey,zoneid);
							if(sameZoneidList!=null){
								//其他区同时对比
								for(int z:sameZoneidList){
									ddlDao.modifyIndex(addKey,z);
								}
							}
						}
						colKeyMap.remove(keyStru.getColumn_name());
						
					}
				}
				if (colKeyMap.size() > 0) {
					// 删除索引
					Iterator<Entry<String, KeyStru>> keyIt = colKeyMap.entrySet().iterator();
					while (keyIt.hasNext()) {
						Entry<String, KeyStru> keyEntry = keyIt.next();
						String key_name = keyEntry.getValue().getKey_name();
						ddlDao.dropIndex(tbname, key_name,zoneid);
						if(sameZoneidList!=null){
							//其他区同时删除索引
							for(int z:sameZoneidList){
								ddlDao.dropIndex(tbname, key_name,z);
							}
						}
					}
				}
			}
		} catch (SQLException e) {
			logger.error(LogTool.exception(e));
			throw new RunServerException(e, "ORMUtil.checkIndex");
		}
	}
	private static String getAddIndex(String type,String keyName,String field) throws RunServerException {
		StringBuilder sb = new StringBuilder();
		sb.append("ADD ");
		if(PRIKEY.equals(type)){
			//primary key
			//MODIFY COLUMN `id`  bigint(20) NULL AUTO_INCREMENT COMMENT '唯一id' FIRST ,ADD PRIMARY KEY (`id`)
			sb.append("PRIMARY KEY (").append(field).append(")");
		}else{
			String pre = "i_";
			if (UNIQUE.equals(type)) {
				sb.append("UNIQUE ");
				pre = "u_";
			}
			sb.append("INDEX ");
			sb.append(pre).append(keyName).append(" ").append("(").append(field).append(") USING BTREE");
		}
		return sb.toString();
	}
	
	private static void checkIncrement(Map<String,PriColumn> prikeyMap,int zoneid) throws RunServerException{
		try {
			if(CollectionUtil.isEmpty(GameProperties.zoneids)){
				throw new RunServerException(null, "checkIncrement add prikey found zoneids is null");
			}
			if(zoneid==CrossZone.rankraise || zoneid==CrossZone.houtai){
				return;
			}
			if(zoneid==CrossZone.central){
				zoneid = 1;
			}
			if(zoneid==CrossZone.central2) {
				zoneid = 1;
			}
			if(zoneid>GameConst.MAX_ZONEID){
				throw new RunServerException(null,"checkIncrement zoneid is "+zoneid+",can't run server");
			}
			DataBaseProp dataBaseProp = MybatisUtil.getDataBasePropMap().get(zoneid);
			Map<String, Long> map = new HashMap<String, Long>();
			if(dataBaseProp!=null){
				String dbname = dataBaseProp.getDbname();
				Map<String, Long> rsmap = DDLDao.getInstance().tbIncrement(dbname, zoneid);
				if(rsmap!=null){
					map.putAll(rsmap);
				}
			}
			int makeLen = GameConst.CANNUM_MAX - (zoneid+"").length();
			String increStr = "";
			for(int i=0;i<makeLen;i++){
				increStr += "0";
			}
			increStr += zoneid;
			Iterator<Entry<String, PriColumn>> it = prikeyMap.entrySet().iterator();
			StringBuilder sb = new  StringBuilder();
			StringBuilder sb2 = new StringBuilder();
			StringBuilder sb3 = new StringBuilder();
			DDLDao ddlDao = DDLDao.getInstance();
			while(it.hasNext()){
				Entry<String, PriColumn> next = it.next();
				String tbname = next.getKey();
				PriColumn value = next.getValue();
				//ALTER TABLE `hero` MODIFY COLUMN `id`  bigint(20) NOT NULL AUTO_INCREMENT 100010000001 COMMENT '唯一id' FIRST ;
				try {
					if(!value.isAutoIncrement()) continue;
					Long recIncrement = map.get(tbname.toLowerCase());
					if(recIncrement==null || recIncrement>1){
						continue;
					}
					if(value.getType().indexOf("bigint")<0){
						continue;
					}
//				if(!"auto_increment".equals(value.getExtra())){
//					sb.append("alter table ").append(tbname).append(" modify column ").append(value.getField()).append(" ").append(value.getType())
//					.append(" not null AUTO_INCREMENT COMMENT '").append(value.getComment()).append("'");
//					ddlDao.alterIncrement(sb.toString(),zoneid);
//				}
					long compareLong = Long.parseLong(1+increStr+"00000000001");
					sb2.append("alter table ").append(tbname).append(" auto_increment ").append(compareLong);
					ddlDao.alterIncrement(sb2.toString(),zoneid);
				} catch (SQLException e) {
					logger.error(LogTool.exception(e));
					throw new RunServerException(null,"alterIncrement err,tbname:"+tbname);
				}
				sb.setLength(0);
				sb2.setLength(0);
				sb3.setLength(0);
			}
		} catch (Exception e) {
			throw new RunServerException(e, "checkIncrement err");
		}
	}
	private static String[] getUnionIndexStrKey(String[] arr){
		int len = arr.length;
		int len2 = 1;
		int i = len;
		while(i>0){
			len2 = len2 * i;
			i--;
		}
		String[] newarr = new String[len2];
		int[] posarr = new int[len];
		for(int n=0;n<len;n++){
			posarr[n] = n;
		}
		StringBuilder sb = new StringBuilder();
		for(int k=0;k<len2;k++){
			for(int j=0;j<len;j++){
				if(j>0){
					sb.append(",");
				}
				int pos = posarr[j];
				sb.append(arr[pos]);
			}
			newarr[k] = sb.toString();
			sb.setLength(0);
			checkPos(posarr);
		}
		return newarr;
	}
	
	private static void checkPos(int[] posarr){
		int len = posarr.length;
		for(int i=len-1;i>=0;){
			int pos = posarr[i];
			pos++;
			posarr[i] = pos;
			if(pos==len){
				i--;//已经到达最大pos，向左移动一位
				continue;
			}
			boolean foundSame = false;
			for(int j=i-1;j>=0;j--){
				if(pos==posarr[j]){
					//左边已经有这个pos了，不能用
					foundSame = true;
					break;
				}
			}
			if(!foundSame){
				//修改右边的pos值
				for(int j=i+1;j<len;j++){
					int newpos = -1;
					for(int p=0;p<len;p++){
						newpos = p;
						for(int q=0;q<=j-1;q++){
							if(posarr[q]==p){
								newpos = -1;
								break;
							}
						}
						if(newpos!=-1){
							break;
						}
					}
					posarr[j] = newpos; 
				}
//				System.err.println(Arrays.toString(posarr));
				break;
			}else{
				//继续++
			}
		}
	}
}

class PriColumn extends AlterColumn{
	private String Extra;
	private boolean autoIncrement;
	public String getExtra() {
		return Extra;
	}

	public void setExtra(String extra) {
		Extra = extra;
	}

	public boolean isAutoIncrement() {
		return autoIncrement;
	}

	public void setAutoIncrement(boolean autoIncrement) {
		this.autoIncrement = autoIncrement;
	}

	public PriColumn(String tbname, String field, String type, boolean isNull, String defVal, String comment, IndexEnum key, String keyName, String extra,boolean autoIncrement) {
		super(tbname, field, type, isNull, defVal, comment, key, keyName);
		Extra = extra;
		this.autoIncrement = autoIncrement;
	}
	
}
