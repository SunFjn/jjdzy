package excel.struct;
/**
 * S_310_三国一统击杀官职表.xlsx
 */
public class Struct_sgytjsgz_310 {
    /**索引*/
    private int id;
    /**官职*/
    private String name;
    /**称号id*/
    private int id2;
    /**本服胜利积分奖励*/
    private int jf;
    /**跨服胜利积分奖励*/
    private int jf1;
    /**
     * 索引
     */
    public int getId() {
        return id;
    }
    /**
     * 官职
     */
    public String getName() {
        return name;
    }
    /**
     * 称号id
     */
    public int getId2() {
        return id2;
    }
    /**
     * 本服胜利积分奖励
     */
    public int getJf() {
        return jf;
    }
    /**
     * 跨服胜利积分奖励
     */
    public int getJf1() {
        return jf1;
    }
    public Struct_sgytjsgz_310(int id,String name,int id2,int jf,int jf1) {
        this.id = id;
        this.name = name;
        this.id2 = id2;
        this.jf = jf;
        this.jf1 = jf1;
    }
}