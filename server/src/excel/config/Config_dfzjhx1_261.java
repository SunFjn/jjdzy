package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dfzjhx1_261;
public class Config_dfzjhx1_261 extends ConfigBase<Struct_dfzjhx1_261> {
    private static Config_dfzjhx1_261 ins = null;
    public static Config_dfzjhx1_261 getIns(){
        if(ins==null){
            ins = new Config_dfzjhx1_261();
        }
        return ins;
    }
    private Config_dfzjhx1_261(){
        put(1,new Struct_dfzjhx1_261(1,"[[1,1]]","[[1,402006,1],[1,411010,2000],[1,412017,2888]]"));
        put(2,new Struct_dfzjhx1_261(2,"[[2,2]]","[[1,402005,2],[1,411010,1500],[1,412017,2288]]"));
        put(3,new Struct_dfzjhx1_261(3,"[[3,3]]","[[1,402005,2],[1,411010,1000],[1,412017,1888]]"));
        put(4,new Struct_dfzjhx1_261(4,"[[4,10]]","[[1,402005,1],[1,411010,1000],[1,410065,100]]"));
        put(5,new Struct_dfzjhx1_261(5,"[[11,20]]","[[1,402004,2],[1,411010,500],[1,410065,50]]"));
        put(6,new Struct_dfzjhx1_261(6,"[[21,50]]","[[1,402004,1],[1,411010,500],[1,410065,50]]"));
    }
    public void reset(){
        ins = null;
    }
}