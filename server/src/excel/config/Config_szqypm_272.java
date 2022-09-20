package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_szqypm_272;
public class Config_szqypm_272 extends ConfigBase<Struct_szqypm_272> {
    private static Config_szqypm_272 ins = null;
    public static Config_szqypm_272 getIns(){
        if(ins==null){
            ins = new Config_szqypm_272();
        }
        return ins;
    }
    private Config_szqypm_272(){
        put(1,new Struct_szqypm_272(1,"[[1,1]]","[[1,442003,1],[1,410019,100]]","[[1,410057,3],[1,410069,20],[1,410019,10]]"));
        put(2,new Struct_szqypm_272(2,"[[2,2]]","[[1,442003,1],[1,410019,80]]","[[1,410057,3],[1,410069,15]]"));
        put(3,new Struct_szqypm_272(3,"[[3,3]]","[[1,442003,1],[1,410019,40]]","[[1,410056,10],[1,410069,10]]"));
        put(4,new Struct_szqypm_272(4,"[[4,10]]","[[1,442003,1]]","[[1,410055,100],[1,410069,10],[1,410019,5]]"));
        put(5,new Struct_szqypm_272(5,"[[11,20]]","[[1,410019,20]]","[[1,410055,50],[1,410069,5],[1,410019,3]]"));
    }
    public void reset(){
        ins = null;
    }
}