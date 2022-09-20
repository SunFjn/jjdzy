package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_005_图鉴表.xlsx
 */
public class Struct_picture_005 {
    /**图鉴ID*/
    private int ID;
    /**名称*/
    private String name;
    /**分类
	 * 1.猛将
	 * 2.谋士
	 * 3.佳人
	 * 4.君主*/
    private int type;
    /**品质
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红*/
    private int quality;
    /**图片ID*/
    private int pic;
    /**激活消耗*/
    private int[][] activation;
    /**属性附加*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**
     * 图鉴ID
     */
    public int getID() {
        return ID;
    }
    /**
     * 名称
     */
    public String getName() {
        return name;
    }
    /**
     * 分类
	 * 1.猛将
	 * 2.谋士
	 * 3.佳人
	 * 4.君主
     */
    public int getType() {
        return type;
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
    public int getQuality() {
        return quality;
    }
    /**
     * 图片ID
     */
    public int getPic() {
        return pic;
    }
    /**
     * 激活消耗
     */
    public int[][] getActivation() {
        return activation;
    }
    /**
     * 属性附加
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    public Struct_picture_005(int ID,String name,int type,int quality,int pic,String activation,String attr,int power) {
        this.ID = ID;
        this.name = name;
        this.type = type;
        this.quality = quality;
        this.pic = pic;
        this.activation = ExcelJsonUtils.toObj(activation,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}