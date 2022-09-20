package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y-217异宝表.xlsx
 */
public class Struct_yb_217 {
    /**id*/
    private int id;
    /**名字*/
    private String name;
    /**图标*/
    private int icon;
    /**原画*/
    private int pic;
    /**品质
	 * jingyu:
	 * 
	 * 123456
	 * 白绿蓝紫橙红*/
    private int pin;
    /**后端属性*/
    private int[][] attr;
    /**后端升星属性*/
    private int[][] starattr;
    /**战力*/
    private int power;
    /**升星战力*/
    private int starpower;
    /**激活（升星）道具*/
    private int[][] item;
    /**属性丹上限*/
    private int max;
    /**升星上限*/
    private int star;
    /**升星品质*/
    private int starid;
    /**图片特效
	 * Administrator:
	 * 
	 * 0：没有特效
	 * 其他数值为特效id，路径：*/
    private int tptx;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 名字
     */
    public String getName() {
        return name;
    }
    /**
     * 图标
     */
    public int getIcon() {
        return icon;
    }
    /**
     * 原画
     */
    public int getPic() {
        return pic;
    }
    /**
     * 品质
	 * jingyu:
	 * 
	 * 123456
	 * 白绿蓝紫橙红
     */
    public int getPin() {
        return pin;
    }
    /**
     * 后端属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 后端升星属性
     */
    public int[][] getStarattr() {
        return starattr;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 升星战力
     */
    public int getStarpower() {
        return starpower;
    }
    /**
     * 激活（升星）道具
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 属性丹上限
     */
    public int getMax() {
        return max;
    }
    /**
     * 升星上限
     */
    public int getStar() {
        return star;
    }
    /**
     * 升星品质
     */
    public int getStarid() {
        return starid;
    }
    /**
     * 图片特效
	 * Administrator:
	 * 
	 * 0：没有特效
	 * 其他数值为特效id，路径：
     */
    public int getTptx() {
        return tptx;
    }
    public Struct_yb_217(int id,String name,int icon,int pic,int pin,String attr,String starattr,int power,int starpower,String item,int max,int star,int starid,int tptx) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.pic = pic;
        this.pin = pin;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.starattr = ExcelJsonUtils.toObj(starattr,int[][].class);
        this.power = power;
        this.starpower = starpower;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.max = max;
        this.star = star;
        this.starid = starid;
        this.tptx = tptx;
    }
}