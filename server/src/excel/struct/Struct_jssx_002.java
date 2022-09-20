package excel.struct;
/**
 * J_002_角色属性表.xlsx
 */
public class Struct_jssx_002 {
    /**属性ID*/
    private int ID;
    /**属性类型
	 * 1.数值
	 * 2.百分比
	 * 3.毫秒
	 * */
    private int type;
    /**颜色
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红
	 * 7.金
	 * */
    private int color;
    /**图标
	 * 没有图标则填0*/
    private int icon;
    /**
     * 属性ID
     */
    public int getID() {
        return ID;
    }
    /**
     * 属性类型
	 * 1.数值
	 * 2.百分比
	 * 3.毫秒
	 * 
     */
    public int getType() {
        return type;
    }
    /**
     * 颜色
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红
	 * 7.金
	 * 
     */
    public int getColor() {
        return color;
    }
    /**
     * 图标
	 * 没有图标则填0
     */
    public int getIcon() {
        return icon;
    }
    public Struct_jssx_002(int ID,int type,int color,int icon) {
        this.ID = ID;
        this.type = type;
        this.color = color;
        this.icon = icon;
    }
}