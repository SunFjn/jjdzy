package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lxxf1_737;
public class Config_lxxf1_737 extends ConfigBase<Struct_lxxf1_737> {
    private static Config_lxxf1_737 ins = null;
    public static Config_lxxf1_737 getIns(){
        if(ins==null){
            ins = new Config_lxxf1_737();
        }
        return ins;
    }
    private Config_lxxf1_737(){
        put(1,new Struct_lxxf1_737(1,15000,"[[4,0,12500]]","[[1,411001,20],[1,412001,2],[1,410001,188],[3,0,100000]]",18001));
        put(2,new Struct_lxxf1_737(2,20000,"[[4,0,12500]]","[[1,411003,20],[1,412005,2],[1,410001,188],[3,0,100000]]",18002));
        put(3,new Struct_lxxf1_737(3,30000,"[[4,0,25000]]","[[1,411008,20],[1,412013,2],[1,410001,188],[3,0,100000]]",18003));
        put(4,new Struct_lxxf1_737(4,40000,"[[4,0,25000]]","[[1,411007,20],[1,412009,2],[1,410001,188],[3,0,100000]]",18004));
        put(5,new Struct_lxxf1_737(5,50000,"[[4,0,50000]]","[[1,411005,20],[1,412011,2],[1,410001,188],[3,0,100000]]",18005));
        put(6,new Struct_lxxf1_737(6,50000,"[[4,0,75000]]","[[1,411002,20],[1,412003,2],[1,410001,188],[3,0,100000]]",18006));
        put(7,new Struct_lxxf1_737(7,50000,"[[4,0,100000]]","[[1,411004,20],[1,410009,10],[1,410001,188],[3,0,100000]]",18007));
    }
    public void reset(){
        ins = null;
    }
}