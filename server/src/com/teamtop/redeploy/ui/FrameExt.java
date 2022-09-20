package com.teamtop.redeploy.ui;

import java.awt.Color;
import java.awt.Component;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.Border;

public class FrameExt extends JFrame {
	private static final long serialVersionUID = 1L;
	/**
	 * 复选框
	 */
	private JCheckBox[] box;
	/**
	 * 选择导入文件夹
	 */
	private JTextField importField;
	/**
	 * 提醒
	 */
	private JLabel prompt = new JLabel();
	/**
	 * 排版需要
	 */
	private String initStr = "　　";
	/**
	 * 大类型选择
	 */
//	private JComboBox<ProtoctType> bigType = new JComboBox<ProtoctType>();
	/**
	 * 边框
	 */
	private static final Border border = BorderFactory.createLineBorder(new Color(170,199,189));
	/**
	 * 错误边框
	 */
	private static final Border errorBorder = BorderFactory.createLineBorder(Color.RED);
	/**
	 * 执行按钮
	 */
	private JButton btn = new JButton("开始导入");
	/**
	 * 提醒面板
	 */
	private JPanel promptPanel ;
	/**
	 * 提醒文字板
	 */
	private JLabel promptLabel;
	/**
	 * 手型鼠标
	 */
	public static final Cursor HAND_CURSOR = new Cursor(Cursor.HAND_CURSOR);
	

	/**
	 * 增加协议面板
	 * @return
	 */
	protected JPanel addProtoPanel() {
//		SelectBigProtoct.getAllType(SelectBigProtoct.BIGTYPE_URL);
		GridLayout gridLayout = new GridLayout(8, 1);
		JPanel panel = new JPanel(gridLayout);
		panel.add(addFilePath(), 0);
		//gridLayout.setHgap(300);
		promptPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		promptPanel.add(new JLabel("　　请选择要执行的操作："));
		promptLabel = new JLabel();
		promptLabel.setForeground(Color.RED);
		promptPanel.add(promptLabel);
		panel.add(promptPanel);
		comboxPanel(panel);
		addExecuteBtn(panel);
		addPromtPanel(panel);
		addActionListener();
		return panel;
	}
	
	

	/**
	 * 添加监听
	 */
	private void addActionListener() {
		btn.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {/*
				new Thread(new Runnable() {
					
					@Override
					public void run() {
						changeBtnState(false);
						setCheckPrompt("");
						setOperInfo(" ");
						importField.setBorder(border);
						importField.setForeground(Color.BLACK);
						
						String path = importField.getText();
						if("请选择需导入文件夹".equals(path) || "".equals(path)) {
							importField.setBorder(errorBorder);
							importField.setForeground(Color.RED);
							return;
						}
						boolean flag = false;
						for(JCheckBox jCheckBox : box) {
							flag = jCheckBox.isSelected();
							if(flag) break;
						}
						if(!flag) {
							setCheckPrompt("请至少选择以下一项");
							return;
						}
						String url= ((ProtoctType)bigType.getSelectedItem()).getZipUrl();
						SelectBigProtoct.downloadZip(url, "src_1");
						if(box[0].isSelected()) {
							List<ProtoctType> bigtypes = SelectBigProtoct.bigTypes;
							int len = bigtypes.size();
							//下载
							for(int i = 0; i < len; i ++) {
								ProtoctType type = bigtypes.get(i);
								String typeName = type.getName();
								String name = "src_" + typeName.substring(0, typeName.indexOf(":")) + ".zip";
								setOperInfo("正在下载：" + name);
								SelectBigProtoct.downloadZip(type.getZipUrl(), path + "\\" + name);
							}
							try {
								Thread.sleep(1000);
							} catch (InterruptedException e) {
								e.printStackTrace();
							}
							//解压
							for(int i = 0; i < len; i ++) {
								ProtoctType type = bigtypes.get(i);
								String typeName = type.getName();
								String name = "src_" + typeName.substring(0, typeName.indexOf(":")) + ".zip";
								setOperInfo("正在解压：" + name);
								SelectBigProtoct.unzip(path + "\\" + name, path + "\\");
							}
						}
						if(box[1].isSelected()) {
							ProtoctType type = (ProtoctType)bigType.getSelectedItem();
							String url= type.getZipUrl();
							String typeName = type.getName();
							String name = "src_" + typeName.substring(0, typeName.indexOf(":")) + ".zip";
							setOperInfo("正在下载：" + name);
							SelectBigProtoct.downloadZip(url, path + "\\" + name);
							setOperInfo("正在解压：" + name);
							SelectBigProtoct.unzip(path + "\\" + name, path + "\\");
							//CG类下载解压
							if(box[3].isSelected()) {
								url = type.getCgZipUrl();
								typeName = type.getName();
								name = "src_cg_" + typeName.substring(0, typeName.indexOf(":")) + ".zip";
								setOperInfo("正在下载：" + name);
								SelectBigProtoct.downloadZip(url, path + "\\" + name);
								setOperInfo("正在解压：" + name);
								SelectBigProtoct.unzip(path + "\\" + name, path + "\\");
							}
						}
						if(box[2].isSelected()) {
							setOperInfo("正在下载：protocol.pro");
							SelectBigProtoct.downloadPro(path);
						}
						//删除zip文件
						SelectBigProtoct.deleteZips(path);
						setOperInfo("执行完毕");
						changeBtnState(true);
					}
				}).start();
			*/}
		});
		box[0].addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(box[0].isSelected()) {
					//box[1].setEnabled(false);
					//bigType.setEnabled(false);
					box[1].setSelected(false);
					box[3].setSelected(false);
				}/*else{
					//box[1].setEnabled(true);
					//bigType.setEnabled(true);
				}*/
			}
		});
		box[1].addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(box[1].isSelected()) {
					//box[0].setEnabled(false);
					box[0].setSelected(false);
					return;
				}/*else{
				}*/
				box[3].setSelected(false);
			}
		});
		importField.addMouseListener(new MouseAdapter() {/*
			@Override
			public void mouseClicked(MouseEvent e) {
				String path = Setting.getPath("zipwp");
				JFileChooser jfc;
				if(path != null && !"".equals(path)) {
					jfc = new JFileChooser(path);
				}else{
					jfc = new JFileChooser();
				}
				
				jfc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
				jfc.setMultiSelectionEnabled(false);
				jfc.showOpenDialog(MainFrame.getInstance());
				File selectFile = jfc.getSelectedFile();
				if(selectFile == null) {
					return;
				}
				importField.setText(selectFile.getAbsolutePath());
				Setting.setValue("zipwp", selectFile.getAbsolutePath());
			}
		*/});
	}

	/**
	 * 添加提示面板
	 * @param panel
	 */
	private void addPromtPanel(JPanel panel) {
		JPanel p = new JPanel(new FlowLayout(FlowLayout.LEFT));
		p.setPreferredSize(new Dimension(20, 20));
		prompt.setText(initStr);
		prompt.setPreferredSize(new Dimension(450, 30));
		prompt.setForeground(Color.GRAY);
		p.add(prompt);
		panel.add(p);
	}

	/**
	 * 开始导入按钮
	 * @param panel
	 */
	private void addExecuteBtn(JPanel panel) {
		JPanel p = new JPanel(new FlowLayout());
		btn.setCursor(HAND_CURSOR);
		p.add(btn);
		panel.add(p);
	}

	/**
	 * 导入文件夹面板
	 * @return
	 */
	private Component addFilePath() {
		return null;/*
		JPanel panel = new JPanel(new FlowLayout());
		panel.add(new JLabel("选择导入地址："));
		importField = new JTextField(30);
//		String path = Setting.getPath("zipwp");
		if(path == null || "".equals(path))
			importField.setText("请选择需导入文件夹");
		else
			importField.setText(path);
		importField.setPreferredSize(new Dimension(20, 30));
		importField.setEditable(false);
		//textField.setText(read_path[0] + " " + read_path[1]);
		importField.setBackground(new Color(250, 250, 250));
		importField.setBorder(border);
		importField.setCursor(HAND_CURSOR);
		panel.add(importField);
		return panel;
	*/}

	/**
	 * 添加复选框
	 * @return
	 */
	private void comboxPanel(JPanel panel) {/*
		box = new JCheckBox[]{new JCheckBox("下载并解压全部后端源码"),new JCheckBox("下载并解压部分后端源码"), new JCheckBox("下载Pro文件"), new JCheckBox("下载CG类")};
		bigType.setPreferredSize(new Dimension(200, 30));
		bigType.setMaximumRowCount(5);
		String[] isSelect = new String[]{ Setting.getPath("box0"),
					Setting.getPath("box1"), Setting.getPath("box2")};
		int len = box.length - 1;
		for(int i = 0; i < len; i ++) {
			JPanel p = new JPanel(new FlowLayout(FlowLayout.LEFT));
			p.add(new JLabel("　　 　"));
			p.add(box[i]);
			if("1".equals(isSelect[i])){
				box[i].setSelected(true);
				if(i == 1) {
					box[0].setSelected(false);
					//box[0].setEnabled(false);
				}
			}
			if(i == 1) {
				for(ProtoctType type:SelectBigProtoct.bigTypes){
					bigType.addItem(type);
				}
				p.add(bigType);
				panel.add(p);
				JPanel p2 = new JPanel(new FlowLayout(FlowLayout.LEFT));
				p2.add(new JLabel("　　 　　　 　"));
				p2.add(box[len]);
				panel.add(p2);
				continue;
			}
			panel.add(p);
		}
		//bigType.setSelectedIndex(-1);
		String value = Setting.getPath("selectIndex");
		if(value != null && value.length() > 0) {
			int index = Integer.parseInt(value);
			bigType.setSelectedIndex(index);
		}
	*/}
	
	/**
	 * 报错提醒
	 * @param msg
	 */
	public void setCheckPrompt(String msg) {
		promptLabel.setText(msg);
		changeBtnState(true);
	}
	
	/**
	 * 保存状态
	 */
	public void saveState(){/*
		int index = bigType.getSelectedIndex();
		Setting.setValue("selectIndex", "" + index);
		Setting.setValue("box0", box[0].isSelected() ? "1":"0");
		Setting.setValue("box1", box[1].isSelected() ? "1":"0");
		Setting.setValue("box2", box[2].isSelected() ? "1":"0");
	*/}

	/**
	 * 信息提醒
	 * @param msg
	 */
	public void setOperInfo(String msg) {
		prompt.setText(initStr + msg);
	}
	
	/**
	 * 
	 * @param state
	 */
	private void changeBtnState(boolean state) {
		btn.setEnabled(state);
	}
}
