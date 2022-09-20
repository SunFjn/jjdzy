package excel.struct;
/**
 * T_003_图标表.xlsx
 */
public class Struct_tubiao_003 {
    /**图标ID*/
    private int ID;
    /**区域
	 * 1.主界面-下方功能按钮
	 * 2.主界面-上方活动按钮
	 * 3.主界面-左侧按钮
	 * 4.主界面-右侧按钮
	 * 5.主城-功能建筑
	 * 6.主城-上方活动按钮
	 * 7.主城-下方活动按钮
	 * 8.主城-左侧按钮
	 * 9.主界面-左侧按钮第二栏*/
    private int area;
    /**位置
	 * 区域为1：
	 * 数字从小到大，从左到右
	 * 
	 * 区域为2：
	 * 数字从小到大，从左到右
	 * 
	 * 区域为3：
	 * 数字从小到大，从上到下
	 * 
	 * 区域为4：
	 * 数字从小到大，从上到下*/
    private int loc;
    /**显示等级*/
    private int lv;
    /**特效
	 * 0.无
	 * 1.有*/
    private int spe;
    /**
     * 图标ID
     */
    public int getID() {
        return ID;
    }
    /**
     * 区域
	 * 1.主界面-下方功能按钮
	 * 2.主界面-上方活动按钮
	 * 3.主界面-左侧按钮
	 * 4.主界面-右侧按钮
	 * 5.主城-功能建筑
	 * 6.主城-上方活动按钮
	 * 7.主城-下方活动按钮
	 * 8.主城-左侧按钮
	 * 9.主界面-左侧按钮第二栏
     */
    public int getArea() {
        return area;
    }
    /**
     * 位置
	 * 区域为1：
	 * 数字从小到大，从左到右
	 * 
	 * 区域为2：
	 * 数字从小到大，从左到右
	 * 
	 * 区域为3：
	 * 数字从小到大，从上到下
	 * 
	 * 区域为4：
	 * 数字从小到大，从上到下
     */
    public int getLoc() {
        return loc;
    }
    /**
     * 显示等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 特效
	 * 0.无
	 * 1.有
     */
    public int getSpe() {
        return spe;
    }
    public Struct_tubiao_003(int ID,int area,int loc,int lv,int spe) {
        this.ID = ID;
        this.area = area;
        this.loc = loc;
        this.lv = lv;
        this.spe = spe;
    }
}