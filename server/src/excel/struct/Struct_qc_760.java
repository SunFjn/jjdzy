package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_760_奇策表.xlsx
 */
public class Struct_qc_760 {
    /**id*/
    private int id;
    /**图标id*/
    private int icon;
    /**原画*/
    private int pic;
    /**名称*/
    private String name;
    /**奇策激活（升星）
	 * 1,道具ID,数量*/
    private int[][] sxxh;
    /**兵魂上限
	 * 每升1星+X百万兵魂上限*/
    private int max1;
    /**将魂上限
	 * 每升1星提升X千古将魂上限
	 * 填0的表示不可以吞噬将魂，不显示将魂吞噬入口*/
    private int max2;
    /**升星上限*/
    private int sx;
    /**品质*/
    private int pz;
    /**获取途径*/
    private String tj;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 图标id
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
     * 名称
     */
    public String getName() {
        return name;
    }
    /**
     * 奇策激活（升星）
	 * 1,道具ID,数量
     */
    public int[][] getSxxh() {
        return sxxh;
    }
    /**
     * 兵魂上限
	 * 每升1星+X百万兵魂上限
     */
    public int getMax1() {
        return max1;
    }
    /**
     * 将魂上限
	 * 每升1星提升X千古将魂上限
	 * 填0的表示不可以吞噬将魂，不显示将魂吞噬入口
     */
    public int getMax2() {
        return max2;
    }
    /**
     * 升星上限
     */
    public int getSx() {
        return sx;
    }
    /**
     * 品质
     */
    public int getPz() {
        return pz;
    }
    /**
     * 获取途径
     */
    public String getTj() {
        return tj;
    }
    public Struct_qc_760(int id,int icon,int pic,String name,String sxxh,int max1,int max2,int sx,int pz,String tj) {
        this.id = id;
        this.icon = icon;
        this.pic = pic;
        this.name = name;
        this.sxxh = ExcelJsonUtils.toObj(sxxh,int[][].class);
        this.max1 = max1;
        this.max2 = max2;
        this.sx = sx;
        this.pz = pz;
        this.tj = tj;
    }
}