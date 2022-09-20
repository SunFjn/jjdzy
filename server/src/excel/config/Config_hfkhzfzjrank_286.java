package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hfkhzfzjrank_286;
public class Config_hfkhzfzjrank_286 extends ConfigBase<Struct_hfkhzfzjrank_286> {
    private static Config_hfkhzfzjrank_286 ins = null;
    public static Config_hfkhzfzjrank_286 getIns(){
        if(ins==null){
            ins = new Config_hfkhzfzjrank_286();
        }
        return ins;
    }
    private Config_hfkhzfzjrank_286(){
        put(1,new Struct_hfkhzfzjrank_286(1,"[[1,1]]","[[1,440007,1],[1,412001,88],[1,410092,288]]"));
        put(2,new Struct_hfkhzfzjrank_286(2,"[[2,2]]","[[1,410107,120],[1,412001,58],[1,410092,188]]"));
        put(3,new Struct_hfkhzfzjrank_286(3,"[[3,3]]","[[1,410107,60],[1,412001,28],[1,410092,88]]"));
        put(4,new Struct_hfkhzfzjrank_286(4,"[[4,10]]","[[1,431218,1],[1,412001,18],[1,410092,50]]"));
        put(5,new Struct_hfkhzfzjrank_286(5,"[[11,20]]","[[1,431219,1],[1,412001,18],[1,410092,20]]"));
    }
    public void reset(){
        ins = null;
    }
}