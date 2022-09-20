package com.teamtop.util.excel.handler;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import com.teamtop.util.excel.cache.WorkBookCache;

/**
 * 读取excel里面的文件sharedString.xml，文档结构为：<si><t>xxx</t></si>.
 * 我们所需读取的为<t></t>之间的数据，<si></si>之间或许有N条<t>子元素，该情况多见于一条记录拥有不同样式
 * @author wujabon
 *
 */
public class Excel2007CacheHandler extends DefaultHandler {
	private String fileName;
	//当前读取的标签名
	private String target;
	//使用StringBuffer 是为了防止因过长或者空置而产生的换行导致读取不全
	private StringBuffer sb = new StringBuffer();
	//当前文档（sharedStrings.xml）的数据，必须保证数据的顺序
	private List<String> list;
	
	/**
	 * @param fileName excel名称，如a.xlsx
	 */
	public Excel2007CacheHandler(String fileName) {
		this.fileName = fileName;
	}
	
	/**
	 * 开始读取文档
	 */
	@Override
	public void startDocument() throws SAXException {
		list = new ArrayList<String>();
	}

	/**
	 * 开始读取一个元素
	 */
	@Override
	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		//记录当前元素的名称
		target = qName;
		if("si".equals(qName)){
			//清空sb里面的数据
			sb.delete(0, sb.length());
		}
	}
	
	/**
	 * 结束一个元素的读取
	 */
	@Override
	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		if("si".equals(qName)) {
			//list里面添加一条记录
			list.add(sb.toString());
		}
		target = null;
	}
	
	/**
	 * 使用sb的原因是传过来的数据或许不全，必须一条条连接
	 */
	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		if("t".equals(target)) {
			sb.append(ch, start, length);
		}
	}
	
	/**
	 * 结束读取，将数据放入缓存，excel名称为key
	 */
	@Override
	public void endDocument() throws SAXException {
		/*for(int i = 0; i < list.size(); i ++) {
			System.out.println(i + " : " + list.get(i));
		}*/
		WorkBookCache.setMapCache(fileName, list);
		//write();
	}
	
	/**
	 * 用于测试使用
	 */
	public void write() {
//		System.out.println(str);
		File file = new File("F:\\输出路径\\out1.txt");
		if(!file.exists()){
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		try {
			FileOutputStream out = new FileOutputStream(file);
			String str;
			for(int i = 0; i < list.size(); i ++) {
				str = i + " : " + list.get(i);
				byte [] b = str.getBytes();
				out.write(b);
				out.write("\n".getBytes());
				out.flush();
			}
			out.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
