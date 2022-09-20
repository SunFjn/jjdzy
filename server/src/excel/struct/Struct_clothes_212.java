package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_212_战甲表.xlsx
 */
public class Struct_clothes_212 {
    /**战甲id*/
    private int id;
    /**战甲名字*/
    private String name;
    /**战甲图标*/
    private int icon;
    /**战甲原画*/
    private int pic;
    /**战甲基础属性*/
    private int[][] attr;
    /**战甲升星属性*/
    private int[][] starattr;
    /**战甲基础战力*/
    private int power;
    /**战甲升星战力*/
    private int starpower;
    /**战甲激活（升星）道具*/
    private int[][] item;
    /**属性丹上限*/
    private int max1;
    /**资质丹上限*/
    private int max2;
    /**获取途径*/
    private String way;
    /**品质*/
    private int pinzhi;
    /**升星上限*/
    private int star;
    /**图片特效
	 * Administrator:
	 * 
	 * 0：没有特效
	 * 其他数值为特效id，路径：*/
    private int tptx;
    /**
     * 战甲id
     */
    public int getId() {
        return id;
    }
    /**
     * 战甲名字
     */
    public String getName() {
        return name;
    }
    /**
     * 战甲图标
     */
    public int getIcon() {
        return icon;
    }
    /**
     * 战甲原画
     */
    public int getPic() {
        return pic;
    }
    /**
     * 战甲基础属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 战甲升星属性
     */
    public int[][] getStarattr() {
        return starattr;
    }
    /**
     * 战甲基础战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 战甲升星战力
     */
    public int getStarpower() {
        return starpower;
    }
    /**
     * 战甲激活（升星）道具
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 属性丹上限
     */
    public int getMax1() {
        return max1;
    }
    /**
     * 资质丹上限
     */
    public int getMax2() {
        return max2;
    }
    /**
     * 获取途径
     */
    public String getWay() {
        return way;
    }
    /**
     * 品质
     */
    public int getPinzhi() {
        return pinzhi;
    }
    /**
     * 升星上限
     */
    public int getStar() {
        return star;
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
    public Struct_clothes_212(int id,String name,int icon,int pic,String attr,String starattr,int power,int starpower,String item,int max1,int max2,String way,int pinzhi,int star,int tptx) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.pic = pic;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.starattr = ExcelJsonUtils.toObj(starattr,int[][].class);
        this.power = power;
        this.starpower = starpower;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.max1 = max1;
        this.max2 = max2;
        this.way = way;
        this.pinzhi = pinzhi;
        this.star = star;
        this.tptx = tptx;
    }
}