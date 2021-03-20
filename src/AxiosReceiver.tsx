import axios from "axios";
import { DataFetcherBase, FetcherOptions} from "@autofiy/rac-core";

interface Options extends FetcherOptions{
    method?: any;
    url : string;
}

class AxiosReceiver extends  DataFetcherBase<Options>{
    protected async fetchData(): Promise<any> {
        const data = await axios({
            method: this.getOptions().method ?? 'get',
            url: this.getOptions().url
        });
        return data.data;
    }
}

export default AxiosReceiver
