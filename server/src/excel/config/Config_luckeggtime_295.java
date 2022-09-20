package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_luckeggtime_295;
public class Config_luckeggtime_295 extends ConfigBase<Struct_luckeggtime_295> {
    private static Config_luckeggtime_295 ins = null;
    public static Config_luckeggtime_295 getIns(){
        if(ins==null){
            ins = new Config_luckeggtime_295();
        }
        return ins;
    }
    private Config_luckeggtime_295(){
        put(1,new Struct_luckeggtime_295(1,"[[1,19]]","[[8,1,0,40000],[7,2,0,40000],[7,1,1,20000]]"));
        put(2,new Struct_luckeggtime_295(2,"[[20,20]]","[[7,1,1,30000],[6,2,1,40000],[5,2,2,30000]]"));
        put(3,new Struct_luckeggtime_295(3,"[[21,39]]","[[7,2,0,65000],[6,3,0,25000],[7,1,1,5000],[6,2,1,5000]]"));
        put(4,new Struct_luckeggtime_295(4,"[[40,59]]","[[7,2,0,66000],[6,3,0,25000],[7,1,1,3000],[6,2,1,3000],[5,3,1,3000]]"));
        put(5,new Struct_luckeggtime_295(5,"[[60,79]]","[[7,2,0,50000],[6,3,0,20000],[5,4,0,20000],[7,1,1,5000],[6,2,1,4000],[5,2,2,1000]]"));
    }
    public void reset(){
        ins = null;
    }
}