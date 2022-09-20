package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lbjl_250;
public class Config_lbjl_250 extends ConfigBase<Struct_lbjl_250> {
    private static Config_lbjl_250 ins = null;
    public static Config_lbjl_250 getIns(){
        if(ins==null){
            ins = new Config_lbjl_250();
        }
        return ins;
    }
    private Config_lbjl_250(){
        put(1,new Struct_lbjl_250(1,"[[1,1]]","[[1,410023,100],[1,412001,50],[1,440012,3]]","[[1,471004,1]]"));
        put(2,new Struct_lbjl_250(2,"[[2,2]]","[[1,410023,60],[1,412001,40],[1,440012,2]]","[[1,400177,1]]"));
        put(3,new Struct_lbjl_250(3,"[[3,3]]","[[1,410023,40],[1,412001,30],[1,440012,1]]","[[1,400177,1]]"));
        put(4,new Struct_lbjl_250(4,"[[4,10]]","[[1,410023,20],[1,412001,15]]","[[1,400173,1]]"));
    }
    public void reset(){
        ins = null;
    }
}