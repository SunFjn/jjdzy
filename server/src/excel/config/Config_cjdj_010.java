package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cjdj_010;
public class Config_cjdj_010 extends ConfigBase<Struct_cjdj_010> {
    private static Config_cjdj_010 ins = null;
    public static Config_cjdj_010 getIns(){
        if(ins==null){
            ins = new Config_cjdj_010();
        }
        return ins;
    }
    private Config_cjdj_010(){
        put(1,new Struct_cjdj_010(1,1,30,"[[1,412001,10]]",4001));
        put(2,new Struct_cjdj_010(2,2,100,"[[1,400135,1]]",4002));
        put(3,new Struct_cjdj_010(3,3,188,"[[1,440008,1]]",4003));
        put(4,new Struct_cjdj_010(4,4,388,"[[1,400029,1]]",4004));
        put(5,new Struct_cjdj_010(5,5,588,"[[1,440004,1]]",4005));
        put(6,new Struct_cjdj_010(6,6,988,"[[1,400136,1]]",4006));
        put(7,new Struct_cjdj_010(7,7,1688,"[[1,400137,1]]",4007));
        put(8,new Struct_cjdj_010(8,8,2688,"[[1,440013,1]]",4008));
    }
    public void reset(){
        ins = null;
    }
}