package excel.struct;
/**
 * 100广告敏感字字库.xlsx
 */
public class Struct_minganzi_100 {
    /**编号*/
    private int bianhao;
    /**关键字*/
    private String guanjianzi;
    /**评分*/
    private int pingfen;
    /**
     * 编号
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 关键字
     */
    public String getGuanjianzi() {
        return guanjianzi;
    }
    /**
     * 评分
     */
    public int getPingfen() {
        return pingfen;
    }
    public Struct_minganzi_100(int bianhao,String guanjianzi,int pingfen) {
        this.bianhao = bianhao;
        this.guanjianzi = guanjianzi;
        this.pingfen = pingfen;
    }
}