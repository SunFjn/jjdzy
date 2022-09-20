package excel.struct;
/**
 * G_701_将印激活表.xlsx
 */
public class Struct_jyjh_701 {
    /**序号*/
    private int ID;
    /**品质
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红*/
    private int pinzhi;
    /**图片*/
    private int tupian;
    /**激活
	 * 
	 * x为将衔阶级
	 * 
	 * 
	 * */
    private int jihuo;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 品质
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红
     */
    public int getPinzhi() {
        return pinzhi;
    }
    /**
     * 图片
     */
    public int getTupian() {
        return tupian;
    }
    /**
     * 激活
	 * 
	 * x为将衔阶级
	 * 
	 * 
	 * 
     */
    public int getJihuo() {
        return jihuo;
    }
    public Struct_jyjh_701(int ID,int pinzhi,int tupian,int jihuo) {
        this.ID = ID;
        this.pinzhi = pinzhi;
        this.tupian = tupian;
        this.jihuo = jihuo;
    }
}