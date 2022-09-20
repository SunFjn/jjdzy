package com.teamtop.util.mybatis;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.SAXException;

import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;

public class XMLGen {
	private static Logger logger = LoggerFactory.getLogger(XMLGen.class);
	private static Map<String,String> modelMap = new HashMap<String,String>();
	public static void main(String[] args) throws Exception{
		init();
	}
	/**
	 * 初始化mybatis的xml
	 */
	public static void init() {
		try {
			// 读取sqlmap-config.xml
			SAXReader reader = new SAXReader();
			// 不验证dtd
			reader.setFeature(
					"http://apache.org/xml/features/nonvalidating/load-external-dtd",
					false);
			File file = new File(FileUtils.getAbsFilePath("mybatis-config.xml"));
			Document document = reader.read(file);
			Element root = document.getRootElement();
			Element typeAliases = root.element("typeAliases");
			for (Iterator<?> it = typeAliases.elementIterator("typeAlias"); it.hasNext();) {
				Element e = (Element) it.next();
				modelMap.put(e.attributeValue("alias"), e.attributeValue("type"));
			}
			Element mappers = root.element("mappers");
			for (Iterator<?> it = mappers.elementIterator("mapper"); it.hasNext();) {
				Element e = (Element) it.next();
				updateFile(new File(FileUtils.getAbsFilePath(e.attributeValue("resource"))));
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	/**
	 * 修改单个xml
	 * @param file
	 * @throws Exception
	 */
	private static void updateFile(File file) throws Exception{
		SAXReader reader = new SAXReader();
		// 不验证dtd
		try {
			reader.setFeature(
					"http://apache.org/xml/features/nonvalidating/load-external-dtd",
					false);
		} catch (SAXException e) {
			logger.error("加载文件出错:" + file.getName());
			logger.error(LogTool.exception(e));
			return;
		}
		// 读取更新数据库xml
		Document document;
		try {
			document = reader.read(file);
		} catch (DocumentException e) {
			logger.error("加载文件出错:" + file.getName());
			logger.error(LogTool.exception(e));
			return;
		}
//		Element rootElt = document.getRootElement(); // 获取根节点
		boolean isUpdate = false;
//		List<Element> list = rootElt.elements();
//		for (Element element : list) {
			/*if (element.getName().equals("insert")
					&& element.attribute("id").getValue().equals("insert")) {
				String modelStr = element.attribute("parameterType").getValue();
				modelStr = modelMap.get(modelStr);
				Class<?> clazz = Class.forName(modelStr);
				String makeInsert = AutoSqlUtil.makeInsert(clazz);
				String text = element.getText();
				if(!makeInsert.trim().equals(text.trim())){
					element.setText(makeInsert);
					isUpdate = true;
				}
			}
			if (element.getName().equals("update")
					&& element.attribute("id").getValue().equals("update")) {
				String modelStr = element.attribute("parameterType").getValue();
				modelStr = modelMap.get(modelStr);
				Class<?> clazz = Class.forName(modelStr);
				String makeUpdates = AutoSqlUtil.makeUpdates(clazz);
				String text = element.getText();
				if(!makeUpdates.trim().equals(text.trim())){
					element.setText(makeUpdates);
					isUpdate = true;
				}
			}*/
//		}
		if (isUpdate) {
			writeDocument(document, new FileOutputStream(file));
		}

	}

	/**
	 * 输出xml文件
	 * 
	 * @param document
	 * @param out
	 */
	private static void writeDocument(Document document, OutputStream out) {
		try {
			OutputFormat format = new OutputFormat();
			XMLWriter writer = new XMLWriter(new OutputStreamWriter(out,
					"utf-8"), format);
			writer.write(document);
			writer.close();
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
}
