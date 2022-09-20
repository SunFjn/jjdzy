package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_010_BOSS战场.xlsx
 */
public class Struct_bosszc_010 {
    /**编号*/
    private int bianhao;
    /**类型
	 * 1.本服BOSS战场
	 * 2.跨服BOSS战场*/
    private int leixing;
    /**BOSS
	 * BOSS的ID，对应NPC表*/
    private int id;
    /**品质设定
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红*/
    private int pinzhi;
    /**入场条件
	 * [[转生下限,转生上限]]*/
    private int[][] tiaojian;
    /**奖励展示
	 * 前端用*/
    private int[][] zhanshi;
    /**首杀奖励
	 * 类型,ID,数量,概率*/
    private int[][] first;
    /**战败补偿*/
    private int[][] lose;
    /**实际掉落
	 * 格式规则同升阶秘境*/
    private String diaoluo;
    /**挑战地图*/
    private int ditu;
    /**刷新时间*/
    private int shuaxin;
    /**是否广播
	 * 0.不广播
	 * 1.广播*/
    private int guangbo;
    /**刷新时间（新）
	 * [[整点，分钟]]*/
    private int[][] shuaxin2;
    /**
     * 编号
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 类型
	 * 1.本服BOSS战场
	 * 2.跨服BOSS战场
     */
    public int getLeixing() {
        return leixing;
    }
    /**
     * BOSS
	 * BOSS的ID，对应NPC表
     */
    public int getId() {
        return id;
    }
    /**
     * 品质设定
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
     * 入场条件
	 * [[转生下限,转生上限]]
     */
    public int[][] getTiaojian() {
        return tiaojian;
    }
    /**
     * 奖励展示
	 * 前端用
     */
    public int[][] getZhanshi() {
        return zhanshi;
    }
    /**
     * 首杀奖励
	 * 类型,ID,数量,概率
     */
    public int[][] getFirst() {
        return first;
    }
    /**
     * 战败补偿
     */
    public int[][] getLose() {
        return lose;
    }
    /**
     * 实际掉落
	 * 格式规则同升阶秘境
     */
    public String getDiaoluo() {
        return diaoluo;
    }
    /**
     * 挑战地图
     */
    public int getDitu() {
        return ditu;
    }
    /**
     * 刷新时间
     */
    public int getShuaxin() {
        return shuaxin;
    }
    /**
     * 是否广播
	 * 0.不广播
	 * 1.广播
     */
    public int getGuangbo() {
        return guangbo;
    }
    /**
     * 刷新时间（新）
	 * [[整点，分钟]]
     */
    public int[][] getShuaxin2() {
        return shuaxin2;
    }
    public Struct_bosszc_010(int bianhao,int leixing,int id,int pinzhi,String tiaojian,String zhanshi,String first,String lose,String diaoluo,int ditu,int shuaxin,int guangbo,String shuaxin2) {
        this.bianhao = bianhao;
        this.leixing = leixing;
        this.id = id;
        this.pinzhi = pinzhi;
        this.tiaojian = ExcelJsonUtils.toObj(tiaojian,int[][].class);
        this.zhanshi = ExcelJsonUtils.toObj(zhanshi,int[][].class);
        this.first = ExcelJsonUtils.toObj(first,int[][].class);
        this.lose = ExcelJsonUtils.toObj(lose,int[][].class);
        this.diaoluo = diaoluo;
        this.ditu = ditu;
        this.shuaxin = shuaxin;
        this.guangbo = guangbo;
        this.shuaxin2 = ExcelJsonUtils.toObj(shuaxin2,int[][].class);
    }
}