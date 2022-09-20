package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hlggyb_323;
public class Config_hlggyb_323 extends ConfigBase<Struct_hlggyb_323> {
    private static Config_hlggyb_323 ins = null;
    public static Config_hlggyb_323 getIns(){
        if(ins==null){
            ins = new Config_hlggyb_323();
        }
        return ins;
    }
    private Config_hlggyb_323(){
        put(1,new Struct_hlggyb_323(1,"[[1,30000]]","[[4,0,1250]]"));
        put(2,new Struct_hlggyb_323(2,"[[30001,45000]]","[[4,0,2000]]"));
        put(3,new Struct_hlggyb_323(3,"[[45001,55000]]","[[4,0,2500]]"));
        put(4,new Struct_hlggyb_323(4,"[[55001,65000]]","[[4,0,3000]]"));
        put(5,new Struct_hlggyb_323(5,"[[65001,80000]]","[[4,0,3500]]"));
        put(6,new Struct_hlggyb_323(6,"[[80001,9999999]]","[[4,0,4000]]"));
    }
    public void reset(){
        ins = null;
    }
}