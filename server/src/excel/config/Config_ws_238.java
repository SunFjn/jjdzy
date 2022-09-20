package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ws_238;
public class Config_ws_238 extends ConfigBase<Struct_ws_238> {
    private static Config_ws_238 ins = null;
    public static Config_ws_238 getIns(){
        if(ins==null){
            ins = new Config_ws_238();
        }
        return ins;
    }
    private Config_ws_238(){
        put(1,new Struct_ws_238(1,"[[1,1]]","[[1,412001,100,0],[1,410019,10,0],[1,460011,1,1],[1,440006,1,1]]","[[1,412001,80,0],[1,410019,8,0],[1,460061,1,1],[1,440008,1,1]]","[[1,412001,60,0],[1,410019,6,0],[1,460062,1,1],[1,440008,1,1]]","[[1,412001,40],[1,410019,4],[1,440005,1]]","[[1,412001,40],[1,410019,4]]","0","[[1,600000]]"));
        put(2,new Struct_ws_238(2,"[[1,1]]","[[1,412005,100,0],[1,410019,10,0],[1,460012,1,1],[1,431223,1,1]]","[[1,412005,80,0],[1,410019,8,0],[1,460063,1,1],[1,431220,1,1]]","[[1,412005,60,0],[1,410019,6,0],[1,460064,1,1],[1,431220,1,1]]","[[1,412005,40],[1,410019,4],[1,431203,1]]","[[1,412005,40],[1,410019,4]]","0","[[2,600000]]"));
        put(3,new Struct_ws_238(3,"[[1,1]]","[[1,412013,100,0],[1,410019,10,0],[1,460013,1,1],[1,432003,1,1]]","[[1,412013,80,0],[1,410019,8,0],[1,460065,1,1],[1,432002,1,1]]","[[1,412013,60,0],[1,410019,6,0],[1,460066,1,1],[1,432002,1,1]]","[[1,412013,40],[1,410019,4],[1,432001,1]]","[[1,412013,40],[1,410019,4]]","0","[[3,600000]]"));
        put(4,new Struct_ws_238(4,"[[1,1]]","[[1,412009,100,0],[1,410019,10,0],[1,460014,1,1],[1,430004,1,1]]","[[1,412009,80,0],[1,410019,8,0],[1,460067,1,1],[1,430002,1,1]]","[[1,412009,60,0],[1,410019,6,0],[1,460068,1,1],[1,430002,1,1]]","[[1,412009,40],[1,410019,4],[1,430001,1]]","[[1,412009,40],[1,410019,4]]","0","[[4,600000]]"));
        put(5,new Struct_ws_238(5,"[[1,1]]","[[1,412011,100,0],[1,410019,10,0],[1,460015,1,1],[1,434005,1,1]]","[[1,412011,80,0],[1,410019,8,0],[1,460069,1,1],[1,434006,1,1]]","[[1,412011,60,0],[1,410019,6,0],[1,460070,1,1],[1,434006,1,1]]","[[1,412011,40],[1,410019,4],[1,434002,1]]","[[1,412011,40],[1,410019,4]]","0","[[5,600000]]"));
        put(6,new Struct_ws_238(6,"[[1,1]]","[[1,412003,100,0],[1,410019,10,0],[1,460016,1,1],[1,441008,1,1]]","[[1,412003,80,0],[1,410019,8,0],[1,460071,1,1],[1,441003,1,1]]","[[1,412003,60,0],[1,410019,6,0],[1,460072,1,1],[1,441003,1,1]]","[[1,412003,40],[1,410019,4],[1,441001,1]]","[[1,412003,40],[1,410019,4]]","0","[[6,150]]"));
        put(7,new Struct_ws_238(7,"[[1,1]]","[[1,410005,100,0],[1,410019,10,0],[1,460017,1,1],[1,401001,1,1]]","[[1,410005,80,0],[1,410019,8,0],[1,460073,1,1],[1,440011,1,1]]","[[1,410005,60,0],[1,410019,6,0],[1,460074,1,1],[1,440011,1,1]]","[[1,410005,40],[1,410019,4],[1,440008,1]]","[[1,410005,40],[1,410019,4]]","0","[[7,4000000]]"));
    }
    public void reset(){
        ins = null;
    }
}