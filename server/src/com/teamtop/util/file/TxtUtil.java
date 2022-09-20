package com.teamtop.util.file;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

import com.teamtop.util.log.LogTool;

public class TxtUtil {

	/**
	 * 获取文本里面的信息，自动过滤#开头的注释信息
	 */
	public static String getText(String filePath){
		StringBuilder descsb = new StringBuilder();
		try {
			File file = new File(filePath);
			if(!file.exists())
				return descsb.toString();
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
			boolean godesc = true;
			String content = null;
			while ((content = br.readLine()) != null) {
				if (content.indexOf("#") >= 0) {
					// 注释
					godesc = false;
					continue;
				}
				if(godesc){
					if(!"".equals(content)){
						descsb.append(content);
					}
				}
			}
			br.close();
		}catch (Exception e) {
			LogTool.error(e, TxtUtil.class, "");
		}
		return descsb.toString();
	}
}
