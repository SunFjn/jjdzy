package com.teamtop.util.ant;

import java.io.File;

import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;

import com.teamtop.gameCommon.GamePath;

public class AntService {
	private static AntService antService;
	private AntService(){}
	
	public static AntService getInstance() {
		if(antService == null) {
			antService = new AntService();
		}
		return antService;
	}
	
	public void compile() {
		try{
			AntLogger logger = new AntLogger();
			Project pj = new Project();
			pj.addBuildListener(logger);
			File file = new File(GamePath.CONFIG_DIR + "build.xml");
			pj.fireBuildStarted();
			pj.init();
			ProjectHelper helper = ProjectHelper.getProjectHelper();
			helper.parse(pj, file);
			//pj.executeTarget(pj.getDefaultTarget());
			pj.executeTarget("main");
			pj.fireBuildFinished(null);
		}catch(Exception e) {
			ShowMsgFunction.sendErrMsg(e.getMessage());
		}
		//System.err.println("finish....");
	}

	public static void main(String[] args) {
//		System.out.println(System.getProperty("sun.boot.class.path"));
//		System.out.println(new AntLogger().getClass().getResource(".").getPath());
		AntService.getInstance().compile();
	}
}
