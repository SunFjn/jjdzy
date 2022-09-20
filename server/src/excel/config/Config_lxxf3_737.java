package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lxxf3_737;
public class Config_lxxf3_737 extends ConfigBase<Struct_lxxf3_737> {
    private static Config_lxxf3_737 ins = null;
    public static Config_lxxf3_737 getIns(){
        if(ins==null){
            ins = new Config_lxxf3_737();
        }
        return ins;
    }
    private Config_lxxf3_737(){
        put(8,new Struct_lxxf3_737(8,15000,"[[4,0,12500]]","[[1,411003,20],[1,412005,2],[1,410001,188],[3,0,100000]]",18001,1));
        put(9,new Struct_lxxf3_737(9,20000,"[[4,0,12500]]","[[1,411008,20],[1,412013,2],[1,410001,188],[3,0,100000]]",18002,1));
        put(10,new Struct_lxxf3_737(10,30000,"[[4,0,25000]]","[[1,411002,20],[1,412003,2],[1,410001,188],[3,0,100000]]",18003,1));
        put(11,new Struct_lxxf3_737(11,40000,"[[4,0,25000]]","[[1,411006,20],[1,400083,1],[1,410001,188],[3,0,100000]]",18004,1));
        put(12,new Struct_lxxf3_737(12,50000,"[[4,0,50000]]","[[10,0,40],[1,412009,2],[1,410001,188],[3,0,100000]]",18005,1));
        put(13,new Struct_lxxf3_737(13,50000,"[[4,0,75000]]","[[1,410004,4],[1,410009,5],[1,410001,188],[3,0,100000]]",18006,1));
        put(14,new Struct_lxxf3_737(14,50000,"[[4,0,100000]]","[[1,411001,20],[1,412001,2],[1,410001,188],[3,0,100000]]",18007,1));
        put(15,new Struct_lxxf3_737(15,15000,"[[4,0,12500]]","[[1,411003,20],[1,412005,2],[1,410001,188],[3,0,100000]]",18008,2));
        put(16,new Struct_lxxf3_737(16,20000,"[[4,0,12500]]","[[1,411008,20],[1,412013,2],[1,410001,188],[3,0,100000]]",18009,2));
        put(17,new Struct_lxxf3_737(17,30000,"[[4,0,25000]]","[[1,411002,20],[1,412003,2],[1,410001,188],[3,0,100000]]",18010,2));
        put(18,new Struct_lxxf3_737(18,40000,"[[4,0,25000]]","[[1,411006,20],[1,400083,1],[1,410001,188],[3,0,100000]]",18011,2));
        put(19,new Struct_lxxf3_737(19,50000,"[[4,0,50000]]","[[10,0,40],[1,412009,2],[1,410001,188],[3,0,100000]]",18012,2));
        put(20,new Struct_lxxf3_737(20,50000,"[[4,0,75000]]","[[1,410004,4],[1,410009,5],[1,410001,188],[3,0,100000]]",18013,2));
        put(21,new Struct_lxxf3_737(21,50000,"[[4,0,100000]]","[[1,411001,20],[1,412001,2],[1,410001,188],[3,0,100000]]",18014,2));
        put(22,new Struct_lxxf3_737(22,15000,"[[4,0,12500]]","[[1,411003,20],[1,412005,2],[1,410001,188],[3,0,100000]]",18015,3));
        put(23,new Struct_lxxf3_737(23,20000,"[[4,0,12500]]","[[1,411008,20],[1,412013,2],[1,410001,188],[3,0,100000]]",18016,3));
        put(24,new Struct_lxxf3_737(24,30000,"[[4,0,25000]]","[[1,411002,20],[1,412003,2],[1,410001,188],[3,0,100000]]",18017,3));
        put(25,new Struct_lxxf3_737(25,40000,"[[4,0,25000]]","[[1,411006,20],[1,400083,1],[1,410001,188],[3,0,100000]]",18018,3));
        put(26,new Struct_lxxf3_737(26,50000,"[[4,0,50000]]","[[10,0,40],[1,412009,2],[1,410001,188],[3,0,100000]]",18019,3));
        put(27,new Struct_lxxf3_737(27,50000,"[[4,0,75000]]","[[1,410004,4],[1,410009,5],[1,410001,188],[3,0,100000]]",18020,3));
        put(28,new Struct_lxxf3_737(28,50000,"[[4,0,100000]]","[[1,411001,20],[1,412001,2],[1,410001,188],[3,0,100000]]",18021,3));
    }
    public void reset(){
        ins = null;
    }
}