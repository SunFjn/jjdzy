package com.teamtop.redeploy.ui;

import java.awt.Component;
import java.awt.Image;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JTabbedPane;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import com.teamtop.redeploy.RedeployClientCache;
import com.teamtop.redeploy.RedeployConst;


public class MainFrame extends FrameExt {
	private static final long serialVersionUID = 1L;
	private static MainFrame mainFrame;
	/**
	 * 增加标签页
	 * @return
	 */
	private Component addTabb() {
		final JTabbedPane tab = new JTabbedPane();
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_QI_E_WEI_XIN), RedeployClientCache.getClients().get(RedeployConst.PF_QI_E_WEI_XIN).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_APK), RedeployClientCache.getClients().get(RedeployConst.PF_APK).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_TEST), RedeployClientCache.getClients().get(RedeployConst.PF_TEST).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_TEST_QI_E_WEI_XIN), RedeployClientCache.getClients().get(RedeployConst.PF_TEST_QI_E_WEI_XIN).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_TEST_APK), RedeployClientCache.getClients().get(RedeployConst.PF_TEST_APK).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_APK3), RedeployClientCache.getClients().get(RedeployConst.PF_APK3).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_APK4), RedeployClientCache.getClients().get(RedeployConst.PF_APK4).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_APK2), RedeployClientCache.getClients().get(RedeployConst.PF_APK2).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_APK6), RedeployClientCache.getClients().get(RedeployConst.PF_APK6).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_WANZI), RedeployClientCache.getClients().get(RedeployConst.PF_WANZI).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_TANWAN), RedeployClientCache.getClients().get(RedeployConst.PF_TANWAN).getPanel().mainExcelPanel());
		tab.addTab(RedeployConst.getPfName(RedeployConst.PF_NEWNEW), RedeployClientCache.getClients().get(RedeployConst.PF_NEWNEW).getPanel().mainExcelPanel());
		//		tab.addTab("360", RedeployClientCache.getClients().get(RedeployConst.PF_360).getPanel().mainExcelPanel());
		tab.addChangeListener(new ChangeListener() {
			
			@Override
			public void stateChanged(ChangeEvent e) {
				int selectIndex  = tab.getSelectedIndex();
				BanshuPanel.setZone(selectIndex+1);
			}
		});
		BanshuPanel.setZone(1);
		return tab;
	}
	/**
	 * 获取对象
	 * @return
	 */
	public static MainFrame getInstance(){
		if(mainFrame == null) {
			mainFrame = new MainFrame();
		}
		return mainFrame;
	}

	/**
	 * 初始化界面
	 */
	public void initFrame() { 
		this.setName("H5更新工具");
		this.setTitle("H5更新工具");
		this.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
		Image image = new ImageIcon(this.getClass().getResource("/").getFile()+ "yt.png").getImage();
		this.setIconImage(image);
		this.add(addTabb());
		this.setVisible(true);
		this.setSize(1020, 600);//最外层大小
		this.setLocationRelativeTo(null);
		this.setResizable(false);
		//关闭窗口操作
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				closeWindow();
			}
			
			public void windowClosed(WindowEvent e) {
				System.exit(0);
			}
		});
		//临时显示文字
		FrameFunction.updateInfoLabelRunable();
	}
	
	/**
	 * 运行时关闭窗口
	 */
	public void closeWindow() {
		int result = JOptionPane.showConfirmDialog(null,"正在运行中，确定要退出？","确认退出", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
		if(result == JOptionPane.YES_OPTION) {
			this.dispose();
		}
	}
	
	
	public static void info(String str,int zone){
		BanshuPanel panel = RedeployClientCache.getClients().get(zone).getPanel();
		panel.updateInfo(str);
	}
	
	public static void err(String str,int zone){
		BanshuPanel panel = RedeployClientCache.getClients().get(zone).getPanel();
		panel.updateErrInfo(str);
	}
	
	/**
	 * 更新面板上的文字
	 */
	public static void updateInfoLabel(String str,int zone){
		BanshuPanel panel = RedeployClientCache.getClients().get(zone).getPanel();
		panel.updateInfoLabel(str);
	}
}

