package com.teamtop.util.db.orm;

import java.io.File;
import java.io.FileWriter;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import com.teamtop.gameCommon.GamePath;

/**
 * 生成select的xml文件
 * @author Administrator
 *
 */
public class MakeAutoSelXml {
	public static void makeXml(){
		Document document = DocumentHelper.createDocument(); 
        document.addDocType("sqlMap", "-//ibatis.apache.org//DTD SQL Map 2.0//EN", "http://ibatis.apache.org/dtd/sql-map-2.dtd");
		Element sqlMap = document.addElement("sqlMap");
		sqlMap.addAttribute("namespace", "CTUS");
		List<NewTb> newTbList = AutoObjTableUtil.newTbList;
		for(NewTb newTb:newTbList){
			Element select = sqlMap.addElement("select");
			select.addAttribute("id", "select_"+newTb.getTbName());
			select.addAttribute("parameterClass", "long");
			select.addAttribute("resultClass", "java.util.HashMap");
			select.addText("select * from "+newTb.getTbName()+" where rid=#value#");
		}
		doc2XmlFile(document,GamePath.USER_DIR+"/bin/com/game/system/CommonTableUtil/AutoObjTableSel.xml"); 
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	/** 
     * doc2XmlFile 
     * 将Document对象保存为一个xml文件到本地 
     * @return true:保存成功   flase:失败 
     * @param filename 保存的文件名 
     * @param document 需要保存的document对象 
     */ 
   public static boolean doc2XmlFile(Document document,String filename) 
    { 
      boolean flag = true; 
      try 
       { 
            /* 将document中的内容写入文件中 */ 
             OutputFormat format = OutputFormat.createPrettyPrint(); 
             format.setEncoding("UTF-8"); 
             XMLWriter writer = new XMLWriter(new FileWriter(new File(filename)),format); 
             writer.write(document); 
             writer.close();             
         }catch(Exception ex) 
         { 
             flag = false; 
             ex.printStackTrace(); 
         } 
        return flag;       
    }
}
