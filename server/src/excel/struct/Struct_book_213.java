package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_213_兵法表.xlsx
 */
public class Struct_book_213 {
    /**兵法id*/
    private int id;
    /**图标*/
    private int icon;
    /**原画*/
    private int pic;
    /**道具名字*/
    private String name;
    /**激活（升阶）道具*/
    private int[][] item;
    /**属性*/
    private int[][] attr;
    /**升星属性*/
    private int[][] starattr;
    /**战力*/
    private int power;
    /**升星战力*/
    private int starpower;
    /**提升属性丹上限*/
    private int max;
    /**升星上限*/
    private int star;
    /**品质*/
    private int pin;
    /**图片特效
	 * Administrator:
	 * 
	 * 0：没有特效
	 * 其他数值为特效id，路径：*/
    private int tptx;
    /**
     * 兵法id
     */
    public int getId() {
        return id;
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
     * 道具名字
     */
    public String getName() {
        return name;
    }
    /**
     * 激活（升阶）道具
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 升星属性
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
     * 提升属性丹上限
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
     * 品质
     */
    public int getPin() {
        return pin;
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
    public Struct_book_213(int id,int icon,int pic,String name,String item,String attr,String starattr,int power,int starpower,int max,int star,int pin,int tptx) {
        this.id = id;
        this.icon = icon;
        this.pic = pic;
        this.name = name;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.starattr = ExcelJsonUtils.toObj(starattr,int[][].class);
        this.power = power;
        this.starpower = starpower;
        this.max = max;
        this.star = star;
        this.pin = pin;
        this.tptx = tptx;
    }
}