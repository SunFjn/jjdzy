package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_209_锻造噬魂表.xlsx
 */
public class Struct_dzinsoul_209 {
    /**魂id*/
    private int id;
    /**名字*/
    private String name;
    /**开启阶数*/
    private int start;
    /**消耗道具*/
    private int[][] consume;
    /**可吞噬数量
	 * 
	 * [A,B]
	 * A=全身铸魂阶数
	 * B=可吞噬数量
	 * 
	 * 比如狼魂
	 * 1-5阶可吞10个
	 * 6-10阶上限+5，可吞15个
	 * 11-15阶上限+5，可吞20个
	 * 16-20阶上限+5，可吞25个
	 * 20阶之后不再增加*/
    private int[][] num;
    /**每个提升属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**
     * 魂id
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
     * 开启阶数
     */
    public int getStart() {
        return start;
    }
    /**
     * 消耗道具
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 可吞噬数量
	 * 
	 * [A,B]
	 * A=全身铸魂阶数
	 * B=可吞噬数量
	 * 
	 * 比如狼魂
	 * 1-5阶可吞10个
	 * 6-10阶上限+5，可吞15个
	 * 11-15阶上限+5，可吞20个
	 * 16-20阶上限+5，可吞25个
	 * 20阶之后不再增加
     */
    public int[][] getNum() {
        return num;
    }
    /**
     * 每个提升属性
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
    public Struct_dzinsoul_209(int id,String name,int start,String consume,String num,String attr,int power) {
        this.id = id;
        this.name = name;
        this.start = start;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.num = ExcelJsonUtils.toObj(num,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}