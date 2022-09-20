package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_seven_223;
public class Config_seven_223 extends ConfigBase<Struct_seven_223> {
    private static Config_seven_223 ins = null;
    public static Config_seven_223 getIns(){
        if(ins==null){
            ins = new Config_seven_223();
        }
        return ins;
    }
    private Config_seven_223(){
        put(240001,new Struct_seven_223(240001,1,"[[1001,3003]]",360001,"[[1,400051,1]]","[[1,400056,1]]","[[1,410017,20],[1,410001,60],[3,0,280000]]","[[1,410017,15],[1,410001,45],[3,0,210000]]","[[1,410017,10],[1,410001,30],[3,0,140000]]","[[1,400126,3],[1,410017,230],[9,0,270000]]","[[1,400126,2],[1,410017,170],[9,0,200000]]","[[1,400126,1],[1,410017,120],[9,0,130000]]","[[1,400126,1],[1,410017,60],[9,0,70000]]",2,0,3000));
        put(240002,new Struct_seven_223(240002,2,"[[4001,6003]]",360002,"[[1,400052,1]]","[[1,400122,1]]","[[1,410017,30],[1,410001,120],[3,0,570000]]","[[1,410017,20],[1,410001,90],[3,0,430000]]","[[1,410017,15],[1,410001,60],[3,0,280000]]","[[1,400127,3],[1,410017,460],[9,0,530000]]","[[1,400127,2],[1,410017,350],[9,0,400000]]","[[1,400127,1],[1,410017,230],[9,0,270000]]","[[1,400127,1],[1,410017,120],[9,0,130000]]",2,0,3000));
        put(240003,new Struct_seven_223(240003,3,"[[7001,8003]]",360003,"[[1,400053,1]]","[[1,400123,1]]","[[1,410017,50],[1,410001,180],[3,0,850000]]","[[1,410017,35],[1,410001,135],[3,0,640000]]","[[1,410017,25],[1,410001,90],[3,0,430000]]","[[1,400128,3],[1,410017,700],[9,0,800000]]","[[1,400128,2],[1,410017,520],[9,0,600000]]","[[1,400128,1],[1,410017,350],[9,0,400000]]","[[1,400128,1],[1,410017,170],[9,0,200000]]",2,0,3000));
        put(240004,new Struct_seven_223(240004,4,"[[9001,10003]]",360004,"[[1,400054,1]]","[[1,400124,1]]","[[1,410017,70],[1,410001,240],[3,0,1140000]]","[[1,410017,50],[1,410001,180],[3,0,850000]]","[[1,410017,35],[1,410001,120],[3,0,570000]]","[[1,400129,3],[1,410017,930],[9,0,1070000]]","[[1,400129,2],[1,410017,700],[9,0,800000]]","[[1,400129,1],[1,410017,460],[9,0,530000]]","[[1,400129,1],[1,410017,230],[9,0,270000]]",2,0,3000));
        put(240005,new Struct_seven_223(240005,5,"[[11001,12003]]",360005,"[[1,400055,1]]","[[1,400125,1]]","[[1,410017,90],[1,410001,300],[3,0,1420000]]","[[1,410017,65],[1,410001,225],[3,0,1070000]]","[[1,410017,45],[1,410001,150],[3,0,710000]]","[[1,400130,3],[1,410017,1160],[9,0,1340000]]","[[1,400130,2],[1,410017,870],[9,0,1000000]]","[[1,400130,1],[1,410017,580],[9,0,670000]]","[[1,400130,1],[1,410017,290],[9,0,330000]]",2,0,3000));
    }
    public void reset(){
        ins = null;
    }
}